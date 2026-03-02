// Web Audio API engine — client-only, import via dynamic import() in hooks
// No module-level AudioContext references; all Web Audio code lives inside class methods.

export interface PlayChordOptions {
  gain?: number
  detune?: number
  attackTime?: number
  decayTime?: number
  sustainLevel?: number
}

interface ActiveVoice {
  id: number
  oscillators: OscillatorNode[]
  envGains: GainNode[]
  chordMixGain: GainNode
}

// Extend Window to satisfy TypeScript on Safari's prefixed constructor
declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext
  }
}

export class SynthEngine {
  private ctx: AudioContext | null = null
  private masterGain: GainNode | null = null
  private convolver: ConvolverNode | null = null
  private wetGain: GainNode | null = null
  private dryGain: GainNode | null = null
  private activeVoices: ActiveVoice[] = []
  private _isReady = false

  get isReady(): boolean {
    return this._isReady
  }

  // Call inside a user-gesture handler so browsers allow AudioContext creation
  async initialize(): Promise<void> {
    if (this._isReady) return

    // Safari guard: prefer standard, fall back to webkit prefix
    const AudioContextClass =
      window.AudioContext ?? window.webkitAudioContext
    if (!AudioContextClass) {
      throw new Error('Web Audio API is not supported in this browser')
    }

    this.ctx = new AudioContextClass()

    // Some browsers start the context suspended; resume immediately
    if (this.ctx.state === 'suspended') {
      await this.ctx.resume()
    }

    // Build the master output chain
    this.masterGain = this.ctx.createGain()
    this.masterGain.gain.value = 0.7
    this.masterGain.connect(this.ctx.destination)

    // Wet path: synthetic reverb → wetGain → master
    this.convolver = this.ctx.createConvolver()
    this.convolver.buffer = this.buildReverbIR(3)

    this.wetGain = this.ctx.createGain()
    this.wetGain.gain.value = 0.45
    this.convolver.connect(this.wetGain)
    this.wetGain.connect(this.masterGain)

    // Dry path: straight to master
    this.dryGain = this.ctx.createGain()
    this.dryGain.gain.value = 0.55
    this.dryGain.connect(this.masterGain)

    this._isReady = true
  }

  // Safari fix: resume a suspended context after tab switch
  async resume(): Promise<void> {
    if (this.ctx && this.ctx.state === 'suspended') {
      await this.ctx.resume()
    }
  }

  // Synthetic reverb impulse response: white noise × quadratic decay
  // 20 ms pre-delay + `duration` seconds of tail — no external files needed
  private buildReverbIR(duration: number): AudioBuffer {
    const ctx = this.ctx!
    const sampleRate = ctx.sampleRate
    const preDelaySamples = Math.floor(0.02 * sampleRate) // 20 ms
    const irLength = Math.floor(sampleRate * duration)
    const buffer = ctx.createBuffer(2, preDelaySamples + irLength, sampleRate)

    for (let ch = 0; ch < 2; ch++) {
      const data = buffer.getChannelData(ch)
      // pre-delay: silence
      for (let i = 0; i < preDelaySamples; i++) {
        data[i] = 0
      }
      // tail: noise * (1 - i/N)^2  — smooth quadratic decay
      for (let i = 0; i < irLength; i++) {
        const decay = Math.pow(1 - i / irLength, 2)
        data[preDelaySamples + i] = (Math.random() * 2 - 1) * decay
      }
    }
    return buffer
  }

  // ---------------------------------------------------------------------------
  // playChord
  //
  // Audio graph per note (× frequencies.length):
  //   Osc(0ct) ─┐
  //   Osc(+8ct) ─┤─ envGain (ADSR) ─► voiceGain ─┐
  //   Osc(-8ct) ─┘                                 ├─ chordMixGain ──► dryGain
  //                                                                 └──► convolver
  //
  // Three detuned triangle-wave oscillators per note create an organic
  // "analog string machine" chorus shimmer.
  // ---------------------------------------------------------------------------
  playChord(frequencies: readonly number[], options?: PlayChordOptions): number {
    if (!this.ctx || !this.masterGain || !this.dryGain || !this.convolver || !this._isReady) {
      return -1
    }
    if (frequencies.length === 0) return -1

    const now = this.ctx.currentTime
    const {
      gain = 0.3,
      detune = 0,
      attackTime = 0.4,
      decayTime = 0.2,
      sustainLevel = 0.7,
    } = options ?? {}

    // Cross-fade out any voices currently playing (0.08 s — scheduled via AudioParam)
    this.releaseActiveVoices(0.08)

    // One mix bus per chord; feeds both dry and wet paths
    const chordMixGain = this.ctx.createGain()
    chordMixGain.gain.value = gain
    chordMixGain.connect(this.dryGain)
    chordMixGain.connect(this.convolver)

    const oscillators: OscillatorNode[] = []
    const envGains: GainNode[] = []
    const noteNorm = 1 / frequencies.length // prevent inter-note clipping

    for (const freq of frequencies) {
      // Envelope: attack → decay → sustain hold
      const envGain = this.ctx.createGain()
      envGain.gain.setValueAtTime(0, now)
      envGain.gain.linearRampToValueAtTime(1, now + attackTime)
      envGain.gain.linearRampToValueAtTime(sustainLevel, now + attackTime + decayTime)
      envGains.push(envGain)

      const voiceGain = this.ctx.createGain()
      voiceGain.gain.value = noteNorm
      envGain.connect(voiceGain)
      voiceGain.connect(chordMixGain)

      // Three triangle-wave oscillators at 0, +8, −8 cents for chorus shimmer
      for (const cents of [0, 8, -8]) {
        const osc = this.ctx.createOscillator()
        osc.type = 'triangle'
        osc.frequency.value = freq
        osc.detune.value = detune + cents
        osc.connect(envGain)
        osc.start(now)
        oscillators.push(osc)
      }
    }

    const voiceId = Date.now()
    this.activeVoices.push({ id: voiceId, oscillators, envGains, chordMixGain })
    return voiceId
  }

  // Schedule a gain ramp to silence then stop oscillators.
  // Uses AudioParam scheduling only — no setTimeout for the audio itself.
  private releaseActiveVoices(fadeTime: number): void {
    if (!this.ctx) return

    const now = this.ctx.currentTime
    const voices = this.activeVoices.splice(0)

    for (const voice of voices) {
      for (const envGain of voice.envGains) {
        // Smoothly interrupt any in-progress automation
        const currentValue = envGain.gain.value
        envGain.gain.cancelScheduledValues(now)
        envGain.gain.setValueAtTime(Math.max(0, currentValue), now)
        envGain.gain.linearRampToValueAtTime(0, now + fadeTime)
      }

      const stopAt = now + fadeTime
      for (const osc of voice.oscillators) {
        try { osc.stop(stopAt) } catch { /* already stopped */ }
      }

      // Disconnect graph nodes after oscillators have stopped
      const cleanupDelay = (fadeTime + 0.2) * 1000
      setTimeout(() => {
        for (const osc of voice.oscillators) {
          try { osc.disconnect() } catch { /* ignore */ }
        }
        for (const eg of voice.envGains) {
          try { eg.disconnect() } catch { /* ignore */ }
        }
        try { voice.chordMixGain.disconnect() } catch { /* ignore */ }
      }, cleanupDelay)
    }
  }

  // Stop all active voices with a configurable fade (default = ADSR release time)
  stopAll(fadeTime = 1.5): void {
    this.releaseActiveVoices(fadeTime)
  }

  // Tear down the engine; call on component unmount
  dispose(): void {
    this.releaseActiveVoices(0.1)

    setTimeout(() => {
      try { this.ctx?.close() } catch { /* ignore */ }
      this.ctx = null
      this.masterGain = null
      this.convolver = null
      this.wetGain = null
      this.dryGain = null
      this._isReady = false
    }, 400)
  }
}
