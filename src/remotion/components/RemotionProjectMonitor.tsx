
import React from 'react';
import { MISSION_LOGS, MissionLog } from '@/lib/console-data';

interface RemotionProjectMonitorProps {
  alertMode: boolean;
  selectedLogId: string | null;
}

export const RemotionProjectMonitor: React.FC<RemotionProjectMonitorProps> = ({
  alertMode,
  selectedLogId,
}) => {
  const selected = selectedLogId ? MISSION_LOGS.find(log => log.id === selectedLogId) : null;

  const borderColor = alertMode ? 'border-console-red' : 'border-console-border';
  const dimColor = alertMode ? 'text-console-red opacity-60' : 'text-console-phosphor-dim';
  const textColor = alertMode ? 'text-console-red' : 'text-console-phosphor';

  if (selected) {
    return (
      <div
        className={`crt-monitor crt-screen-glow h-full border ${borderColor} bg-console-panel flex flex-col font-console transition-colors duration-300`}
      >
        <div className={`flex items-center gap-2 px-3 py-2 border-b ${borderColor} ${dimColor} text-xs`}>
          <span className={`${textColor}`}>← BACK</span> {/* No actual back functionality */}
          <span>■</span>
          <span>{selected.classification}</span>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4" style={{ scrollbarWidth: 'none' }}>
          <div className={`${dimColor} text-xs mb-1`}>{selected.classification}</div>
          <div className={`${textColor} text-lg mb-1`}>{selected.title}</div>
          <div className={`${dimColor} text-xs mb-4`}>{selected.year} ■ {selected.category}</div>

          <div className={`${dimColor} text-xs mb-1`}>MISSION SUMMARY</div>
          <div className={`${textColor} text-sm mb-4 leading-relaxed`}>{selected.summary}</div>

          <div className={`${dimColor} text-xs mb-2`}>KEY OUTCOMES</div>
          <div className="flex flex-col gap-1 mb-6">
            {selected.results.map((r, i) => (
              <div key={i} className={`${textColor} text-xs`}>
                ▸ {r}
              </div>
            ))}
          </div>

          <button
            className={`border ${borderColor} ${textColor} px-4 py-2 text-sm transition-colors tracking-widest`}
            disabled // Disable actual navigation
          >
            ACCESS FULL MISSION REPORT →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`crt-monitor crt-screen-glow h-full border ${borderColor} bg-console-panel flex flex-col font-console transition-colors duration-300`}
    >
      <div className={`flex items-center gap-2 px-3 py-2 border-b ${borderColor} ${dimColor} text-xs`}>
        <span>MISSION LOGS</span>
        <span>■</span>
        <span>{MISSION_LOGS.length} RECORDS ON FILE</span>
        <span className="ml-auto">CLASSIFIED: LEVEL 2</span>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        {MISSION_LOGS.map((log, i) => (
          <div
            key={log.id}
            className={`w-full text-left px-4 py-3 border-b ${borderColor} transition-colors group`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className={`${dimColor} text-[10px] mb-0.5`}>
                  {String(i + 1).padStart(2, '0')} ■ {log.classification}
                </div>
                <div className={`${textColor} text-sm transition-colors`}>
                  {log.title}
                </div>
                <div className={`${dimColor} text-xs mt-0.5`}>{log.year} ■ {log.category}</div>
              </div>
              <span className={`text-xs mt-1 transition-colors ${alertMode ? 'text-console-red/60' : 'text-console-phosphor-dim'}`}>→</span>
            </div>
          </div>
        ))}
      </div>

      <div className={`px-3 py-2 border-t ${borderColor} ${dimColor} font-console text-[10px]`}>
        CLICK LOG TO ACCESS MISSION SUMMARY
      </div>
    </div>
  );
};
