// Web Audio API engine for live keyboard playback — client-only
// Import via dynamic import() in hooks; no module-level Web Audio references.

// Extend Window to satisfy TypeScript on Safari's prefixed constructor
declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext
  }
}

interface ActiveNote {
  id: number
  oscillators: OscillatorNode[]
  envGain: GainNode
  filter: BiquadFilterNode
  voiceGain: GainNode
  noteBus: GainNode
}

export class KeyboardEngine {
  private ctx: AudioContext | null = null
  private masterGain: GainNode | null = null
  private convolver: ConvolverNode | null = null
  private wetGain: GainNode | null = null
  private dryGain: GainNode | null = null
  private activeNotes = new Map<number, ActiveNote>()
  private nextId = 1
  private _isReady = false

  get isReady(): boolean {
    return this._isReady
  }

  // Call inside a user-gesture handler so browsers allow AudioContext creation
  async initialize(): Promise<void> {
    if (this._isReady) return

    // Safari guard: prefer standard, fall back to webkit prefix
    const AudioContextClass = window.AudioContext ?? window.webkitAudioContext
    if (!AudioContextClass) {
      throw new Error('Web Audio API is not supported in this browser')
    }

    this.ctx = new AudioContextClass()

    // Some browsers start the context suspended; resume immediately
    if (this.ctx.state === 'suspended') {
      await this.ctx.resume()
    }

    // Master output chain
    this.masterGain = this.ctx.createGain()
    this.masterGain.gain.value = 0.7
    this.masterGain.connect(this.ctx.destination)

    // Wet path: synthetic reverb → wetGain → master
    this.convolver = this.ctx.createConvolver()
    this.convolver.buffer = this.buildReverbIR(2)

    this.wetGain = this.ctx.createGain()
    this.wetGain.gain.value = 0.4
    this.convolver.connect(this.wetGain)
    this.wetGain.connect(this.masterGain)

    // Dry path: straight to master
    this.dryGain = this.ctx.createGain()
    this.dryGain.gain.value = 0.6
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
    const preDelaySamples = Math.floor(0.02 * sampleRate)
    const irLength = Math.floor(sampleRate * duration)
    const buffer = ctx.createBuffer(2, preDelaySamples + irLength, sampleRate)

    for (let ch = 0; ch < 2; ch++) {
      const data = buffer.getChannelData(ch)
      for (let i = 0; i < preDelaySamples; i++) {
        data[i] = 0
      }
      for (let i = 0; i < irLength; i++) {
        const decay = Math.pow(1 - i / irLength, 2)
        data[preDelaySamples + i] = (Math.random() * 2 - 1) * decay
      }
    }
    return buffer
  }

  // ---------------------------------------------------------------------------
  // playNote
  //
  // Audio graph per note:
  //   Osc (tri, 0ct)  ─┐
  //   Osc (tri, +8ct) ─┤─ envGain ─► filter ─► voiceGain ─► noteBus ──┬──► dryGain(0.6) ─┐
  //   Osc (tri, -8ct) ─┘                                               │                   ├──► masterGain ──► destination
  //                                                          convolver ──► wetGain(0.4) ──────┘
  //
  // ADSR modes:
  //   'live' (held key): attack 0.05 s, decay 0.1 s, sustain 0.7
  //   'seq'  (sequencer): attack 0.03 s, decay 0.05 s, sustain 0.6
  // ---------------------------------------------------------------------------
  playNote(freq: number, mode: 'live' | 'seq'): number {
    if (!this.ctx || !this.masterGain || !this.dryGain || !this.convolver || !this._isReady) {
      return -1
    }

    const now = this.ctx.currentTime
    const isLive = mode === 'live'
    const attack  = isLive ? 0.05 : 0.03
    const decay   = isLive ? 0.1  : 0.05
    const sustain = isLive ? 0.7  : 0.6

    // noteBus splits signal to dry and wet paths
    const noteBus = this.ctx.createGain()
    noteBus.gain.value = 1
    noteBus.connect(this.dryGain)
    noteBus.connect(this.convolver)

    const voiceGain = this.ctx.createGain()
    voiceGain.gain.value = 0.35
    voiceGain.connect(noteBus)

    // Lowpass filter — default 2500 Hz, Q 2.0
    const filter = this.ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 2500
    filter.Q.value = 2.0
    filter.connect(voiceGain)

    // Envelope: attack → decay → sustain hold
    const envGain = this.ctx.createGain()
    envGain.gain.setValueAtTime(0, now)
    envGain.gain.linearRampToValueAtTime(1, now + attack)
    envGain.gain.linearRampToValueAtTime(sustain, now + attack + decay)
    envGain.connect(filter)

    // Three triangle-wave oscillators at 0, +8, −8 cents for chorus shimmer
    const oscillators: OscillatorNode[] = []
    for (const cents of [0, 8, -8]) {
      const osc = this.ctx.createOscillator()
      osc.type = 'triangle'
      osc.frequency.value = freq
      osc.detune.value = cents
      osc.connect(envGain)
      osc.start(now)
      oscillators.push(osc)
    }

    const id = this.nextId++
    this.activeNotes.set(id, { id, oscillators, envGain, filter, voiceGain, noteBus })
    return id
  }

  // Update pitch bend (±200 ¢) and filter frequency (300–8000 Hz) for a live note
  updateNote(id: number, pitchBendCents: number, filterHz: number): void {
    const note = this.activeNotes.get(id)
    if (!note || !this.ctx) return

    const clampedPitch  = Math.max(-200, Math.min(200, pitchBendCents))
    const clampedFilter = Math.max(300,  Math.min(8000, filterHz))
    const baseDetunes   = [0, 8, -8]
    const now           = this.ctx.currentTime

    note.oscillators.forEach((osc, i) => {
      osc.detune.setValueAtTime(baseDetunes[i] + clampedPitch, now)
    })
    note.filter.frequency.setValueAtTime(clampedFilter, now)
  }

  // Schedule a gain ramp to silence then stop oscillators
  stopNote(id: number, fadeTime = 0.5): void {
    const note = this.activeNotes.get(id)
    if (!note || !this.ctx) return

    this.activeNotes.delete(id)

    const now          = this.ctx.currentTime
    const currentValue = note.envGain.gain.value
    note.envGain.gain.cancelScheduledValues(now)
    note.envGain.gain.setValueAtTime(Math.max(0, currentValue), now)
    note.envGain.gain.linearRampToValueAtTime(0, now + fadeTime)

    const stopAt = now + fadeTime
    for (const osc of note.oscillators) {
      try { osc.stop(stopAt) } catch { /* already stopped */ }
    }

    // Disconnect graph nodes after oscillators have stopped
    const cleanupDelay = (fadeTime + 0.2) * 1000
    setTimeout(() => {
      for (const osc of note.oscillators) {
        try { osc.disconnect() } catch { /* ignore */ }
      }
      try { note.envGain.disconnect()  } catch { /* ignore */ }
      try { note.filter.disconnect()   } catch { /* ignore */ }
      try { note.voiceGain.disconnect() } catch { /* ignore */ }
      try { note.noteBus.disconnect()  } catch { /* ignore */ }
    }, cleanupDelay)
  }

  // Stop all active notes with a configurable fade
  stopAll(fadeTime = 0.5): void {
    const ids = Array.from(this.activeNotes.keys())
    for (const id of ids) {
      this.stopNote(id, fadeTime)
    }
  }

  // Tear down the engine; call on component unmount
  dispose(): void {
    this.stopAll(0.1)

    setTimeout(() => {
      try { this.ctx?.close() } catch { /* ignore */ }
      this.ctx        = null
      this.masterGain = null
      this.convolver  = null
      this.wetGain    = null
      this.dryGain    = null
      this._isReady   = false
    }, 400)
  }
}
