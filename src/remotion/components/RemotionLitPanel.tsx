
import React from 'react';
import { LitPanelState, dotOpacity, TOTAL_ROWS, STATUS_ROWS } from '../utils/remotion-litpanel';
import { useCurrentFrame } from 'remotion';

interface RemotionLitPanelProps {
  litPanelState: LitPanelState;
}

export const RemotionLitPanel: React.FC<RemotionLitPanelProps> = ({
  litPanelState: { systems, alertMode },
}) => {
  const frame = useCurrentFrame();

  return (
    <div className="h-full border border-console-border bg-console-panel p-1.5 flex flex-col gap-1 overflow-hidden">
      {Array.from({ length: TOTAL_ROWS }, (_, row) => {
        const statusIdx = STATUS_ROWS.indexOf(row);

        if (statusIdx !== -1) {
          const sys = systems[statusIdx];
          const dotClass = alertMode
            ? 'bg-console-red animate-pulse'
            : sys.status === 'NOMINAL'
            ? 'bg-console-phosphor'
            : sys.status === 'WARNING'
            ? 'bg-console-amber animate-pulse'
            : 'bg-console-red animate-pulse';
          const borderClass = alertMode
            ? 'border-console-red/30'
            : sys.status === 'NOMINAL'
            ? 'border-console-border'
            : sys.status === 'WARNING'
            ? 'border-console-amber/40'
            : 'border-console-red/40';

          return (
            <div
              key={row}
              className={`border ${borderClass} bg-console-bg px-1 py-0.5 flex items-center justify-between flex-shrink-0 transition-colors duration-500`}
            >
              <span
                className={`font-console text-[8px] leading-none ${
                  alertMode ? 'text-console-red/50' : 'text-console-phosphor-dim'
                }`}
              >
                {sys.name}
              </span>
              <div className={`w-1.5 h-1.5 rounded-full ${dotClass} transition-colors duration-300`} />
            </div>
          );
        }

        return (
          <div key={row} className="flex gap-1 flex-shrink-0">
            {[0, 1].map(col => {
              const cellIdx = row * 2 + col;
              const opacity = alertMode ? 1 : dotOpacity(cellIdx, frame); // Pass frame to dotOpacity
              return (
                <div
                  key={col}
                  className="flex-1 border border-console-border/30 bg-console-bg flex items-center justify-center py-1"
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                      alertMode ? 'bg-console-red animate-pulse' : 'bg-console-phosphor'
                    }`}
                    style={{ opacity }}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
