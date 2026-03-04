'use client'

interface Props {
  alertMode: boolean
  onButtonPress: (id: string) => void
  onXenomorph: () => void
}

export default function ControlPanel({ alertMode, onButtonPress, onXenomorph }: Props) {
  const borderColor = alertMode ? 'border-console-red' : 'border-console-border'
  const dimColor = alertMode ? 'text-console-red opacity-60' : 'text-console-phosphor-dim'

  const handleXenomorph = () => {
    onButtonPress('xenomorph')
    onXenomorph()
  }

  const handleAutoDestroy = () => {
    onButtonPress('auto-destroy')
    window.dispatchEvent(new CustomEvent('mother-auto-destroy'))
  }

  return (
    <div
      className={`h-full border-t ${borderColor} bg-console-bg flex items-center px-4 gap-3 transition-colors duration-300`}
    >
      <div className={`${dimColor} font-console text-xs mr-2 whitespace-nowrap`}>CONTROL</div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleXenomorph}
          className={`font-console text-xs px-3 py-2 border transition-all duration-200 tracking-widest ${
            alertMode
              ? 'border-console-red bg-console-red/20 text-console-red alert-pulse'
              : 'border-console-amber text-console-amber hover:bg-console-amber/10'
          }`}
        >
          XENOMORPH FOUND!
        </button>

        <button
          onClick={handleAutoDestroy}
          className={`font-console text-xs px-3 py-2 border transition-all duration-200 tracking-widest ${
            alertMode
              ? 'border-console-red bg-console-red/30 text-console-red alert-pulse'
              : 'border-console-red text-console-red hover:bg-console-red/10'
          }`}
        >
          AUTO-DESTROY
        </button>
      </div>

      <div className={`${dimColor} font-console text-[10px] ml-auto whitespace-nowrap`}>
        USCSS NOSTROMO
      </div>
    </div>
  )
}
