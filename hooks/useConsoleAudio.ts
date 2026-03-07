'use client'

import { useRef, useCallback, useEffect } from 'react'

export function useConsoleAudio() {
  const ctxRef = useRef<AudioContext | null>(null)
  const humOscRef = useRef<OscillatorNode | null>(null)
  const humGainRef = useRef<GainNode | null>(null)
  const alertIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const humStartedRef = useRef(false)

  const getCtx = useCallback((): AudioContext => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext()
    }
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume()
    }
    return ctxRef.current
  }, [])

  // ── Ambient electrical hum (Nostromo engine drone) ──────────────────────
  const startAmbientHum = useCallback(() => {
    if (humStartedRef.current) return
    humStartedRef.current = true

    const ctx = getCtx()

    // Sub-bass drone at 55Hz
    const osc1 = ctx.createOscillator()
    osc1.type = 'sine'
    osc1.frequency.value = 55

    // Slight harmonic at 110Hz for "electrical" character
    const osc2 = ctx.createOscillator()
    osc2.type = 'sine'
    osc2.frequency.value = 110

    // Very slow LFO to make hum "breathe"
    const lfo = ctx.createOscillator()
    lfo.type = 'sine'
    lfo.frequency.value = 0.15
    const lfoGain = ctx.createGain()
    lfoGain.gain.value = 0.008

    const masterGain = ctx.createGain()
    masterGain.gain.value = 0.018

    const g1 = ctx.createGain()
    g1.gain.value = 1.0
    const g2 = ctx.createGain()
    g2.gain.value = 0.35

    lfo.connect(lfoGain)
    lfoGain.connect(masterGain.gain)

    osc1.connect(g1)
    osc2.connect(g2)
    g1.connect(masterGain)
    g2.connect(masterGain)
    masterGain.connect(ctx.destination)

    osc1.start()
    osc2.start()
    lfo.start()

    humOscRef.current = osc1
    humGainRef.current = masterGain
  }, [getCtx])

  // ── Terminal typewriter click (soft tick) ────────────────────────────────
  const playKeyClick = useCallback(() => {
    const ctx = getCtx()
    const t = ctx.currentTime

    // Short noise burst
    const bufLen = Math.floor(ctx.sampleRate * 0.018)
    const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate)
    const data = buf.getChannelData(0)
    for (let i = 0; i < bufLen; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufLen)
    }

    const src = ctx.createBufferSource()
    src.buffer = buf

    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.value = 2800
    filter.Q.value = 1.0

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.05, t)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.018)

    src.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    src.start(t)
  }, [getCtx])

  // ── Button blip ──────────────────────────────────────────────────────────
  const playButtonPress = useCallback(() => {
    const ctx = getCtx()
    const t = ctx.currentTime

    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(880, t)
    osc.frequency.exponentialRampToValueAtTime(660, t + 0.03)

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.025, t)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(t)
    osc.stop(t + 0.05)
  }, [getCtx])

  // ── Single alert beep (Alien-style pulsing alarm) ────────────────────────
  const playAlertBeep = useCallback(() => {
    const ctx = getCtx()
    const t = ctx.currentTime

    const osc1 = ctx.createOscillator()
    const osc2 = ctx.createOscillator()
    osc1.type = 'sawtooth'
    osc2.type = 'sawtooth'
    osc1.frequency.value = 880
    osc2.frequency.value = 659

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0, t)
    gain.gain.linearRampToValueAtTime(0.18, t + 0.04)
    gain.gain.setValueAtTime(0.18, t + 0.14)
    gain.gain.linearRampToValueAtTime(0, t + 0.22)

    // Slight distortion via wave shaper
    const ws = ctx.createWaveShaper()
    const curve = new Float32Array(256)
    for (let i = 0; i < 256; i++) {
      const x = (i * 2) / 256 - 1
      curve[i] = (Math.PI + 200) * x / (Math.PI + 200 * Math.abs(x))
    }
    ws.curve = curve

    osc1.connect(gain)
    osc2.connect(gain)
    gain.connect(ws)
    ws.connect(ctx.destination)

    osc1.start(t)
    osc1.stop(t + 0.25)
    osc2.start(t)
    osc2.stop(t + 0.25)
  }, [getCtx])

  const startAlertAlarm = useCallback(() => {
    playAlertBeep()
    if (alertIntervalRef.current) clearInterval(alertIntervalRef.current)
    alertIntervalRef.current = setInterval(playAlertBeep, 550)
  }, [playAlertBeep])

  const stopAlertAlarm = useCallback(() => {
    if (alertIntervalRef.current) {
      clearInterval(alertIntervalRef.current)
      alertIntervalRef.current = null
    }
  }, [])

  // ── Classic sonar ping (sweep hits a blip) ──────────────────────────────
  const playSonarPing = useCallback((large = false) => {
    const ctx = getCtx()
    const t = ctx.currentTime
    const freq = large ? 980 : 1150
    const vol = large ? 0.22 : 0.14

    // Primary ping — sine decay
    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, t)
    osc.frequency.exponentialRampToValueAtTime(freq * 0.88, t + 0.35)

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(vol, t)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(t)
    osc.stop(t + 0.38)

    // Echo — delayed, quieter, slightly lower pitch
    const echoDelay = large ? 0.18 : 0.14
    const osc2 = ctx.createOscillator()
    osc2.type = 'sine'
    osc2.frequency.value = freq * 0.82

    const gain2 = ctx.createGain()
    gain2.gain.setValueAtTime(0, t)
    gain2.gain.setValueAtTime(vol * 0.28, t + echoDelay)
    gain2.gain.exponentialRampToValueAtTime(0.001, t + echoDelay + 0.28)

    osc2.connect(gain2)
    gain2.connect(ctx.destination)
    osc2.start(t)
    osc2.stop(t + echoDelay + 0.32)
  }, [getCtx])

  // ── Boot beep (ascending tones during splash) ────────────────────────────
  const playBootBeep = useCallback((index: number) => {
    const ctx = getCtx()
    const t = ctx.currentTime
    const freq = 220 + index * 55

    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = freq

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.1, t)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(t)
    osc.stop(t + 0.2)
  }, [getCtx])

  useEffect(() => {
    return () => {
      stopAlertAlarm()
      humOscRef.current?.stop()
      ctxRef.current?.close()
    }
  }, [stopAlertAlarm])

  return {
    startAmbientHum,
    playKeyClick,
    playButtonPress,
    startAlertAlarm,
    stopAlertAlarm,
    playBootBeep,
    playSonarPing,
  }
}
