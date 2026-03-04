// Pure CSS VHS overlay — scanlines, grain, tracking glitch, vignette
// No dependencies, pointer-events: none throughout

export default function VHSOverlay({ opacity = 1 }: { opacity?: number }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ opacity, transition: 'opacity 1s ease-out', zIndex: 10 }}
    >
      {/* Scanlines */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.13) 3px, rgba(0,0,0,0.13) 4px)',
        }}
      />

      {/* Animated grain */}
      <div
        className="vhs-grain absolute inset-0"
        style={{ opacity: 0.07, mixBlendMode: 'screen' }}
      />

      {/* Tracking glitch strip */}
      <div
        className="vhs-track absolute inset-x-0"
        style={{
          height: '3px',
          background:
            'linear-gradient(to right, transparent, rgba(255,255,255,0.12) 20%, rgba(255,255,255,0.08) 80%, transparent)',
          top: 0,
        }}
      />

      {/* Chromatic fringe on left/right edges */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow:
            'inset 3px 0 6px rgba(255,0,60,0.04), inset -3px 0 6px rgba(0,80,255,0.04)',
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 85% 85% at 50% 50%, transparent 55%, rgba(0,0,0,0.45) 100%)',
        }}
      />
    </div>
  )
}
