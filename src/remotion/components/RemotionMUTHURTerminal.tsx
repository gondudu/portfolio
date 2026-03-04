
import React from 'react';
import { RemotionTerminalState } from '../utils/remotion-typewriter';

interface RemotionMUTHURTerminalProps {
  alertMode: boolean;
  terminalState: RemotionTerminalState;
}

export const RemotionMUTHURTerminal: React.FC<RemotionMUTHURTerminalProps> = ({
  alertMode,
  terminalState: { completedLines, currentDisplay },
}) => {
  const borderColor = alertMode ? 'border-console-red' : 'border-console-border';
  const textColor = alertMode ? 'text-console-red' : 'text-console-phosphor';
  const dimColor = alertMode ? 'text-console-red opacity-60' : 'text-console-phosphor-dim';

  return (
    <div
      className={`crt-monitor crt-screen-glow crt-flicker h-full border ${borderColor} bg-console-panel flex flex-col transition-colors duration-300`}
    >
      {/* Terminal header */}
      <div className={`flex items-center gap-2 px-3 py-2 border-b ${borderColor} ${dimColor} font-console text-xs`}>
        <span>MU-TH-UR 6000</span>
        <span>■</span>
        <span>MAIN INTERFACE</span>
        <span className="ml-auto">ONLINE</span>
      </div>

      {/* Output area */}
      <div
        className="flex-1 overflow-y-auto px-3 py-2 font-console text-sm leading-relaxed"
        style={{ scrollbarWidth: 'none' }} // Remotion doesn't scroll, so this is just for styling consistency
      >
        {completedLines.map((line, i) => (
          <div key={i} className={line.startsWith('>') ? 'text-console-phosphor-bright' : textColor}>
            {line || '\u00A0'}
          </div>
        ))}
        {currentDisplay !== null && (
          <div className={`${textColor} cursor-blink`}>{currentDisplay}</div>
        )}
      </div>

      {/* Input area - Removed interactive elements for Remotion */}
      <div className={`border-t ${borderColor} px-3 py-2 flex items-center gap-2`}>
        <span className={`font-console text-sm ${textColor}`}>{'>'}</span>
        <span className={`flex-1 bg-transparent font-console text-sm outline-none ${textColor} placeholder-console-phosphor-dim`}>
          ENTER QUERY...
        </span>
        <button
          className={`font-console text-xs transition-colors px-2 py-0.5 border ${borderColor} ${alertMode ? 'text-console-red/60' : 'text-console-phosphor-dim'}`}
        >
          SEND
        </button>
      </div>
    </div>
  );
};
