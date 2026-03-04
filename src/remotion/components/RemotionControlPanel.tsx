
import React from 'react';

type ConsolePanel = 'terminal' | 'mission-logs' | 'crew-manifest';

interface RemotionControlPanelProps {
  activePanel: ConsolePanel;
  alertMode: boolean;
  // Add props to indicate button presses for visual feedback if needed
}

interface PanelButton {
  id: string;
  label: string;
  panel?: ConsolePanel;
  special?: 'xenomorph' | 'auto-destroy';
}

export const RemotionControlPanel: React.FC<RemotionControlPanelProps> = ({
  activePanel,
  alertMode,
}) => {
  const buttons: PanelButton[] = [
    { id: 'mission-logs', label: 'MISSION LOGS', panel: 'mission-logs' },
    { id: 'crew-manifest', label: 'CREW MANIFEST', panel: 'crew-manifest' },
    { id: 'comm-link', label: 'COMM LINK' }, // No action
    {
      id: 'xenomorph',
      label: 'XENOMORPH FOUND!',
      special: 'xenomorph',
    },
    {
      id: 'auto-destroy',
      label: 'AUTO-DESTROY',
      special: 'auto-destroy',
    },
  ];

  const borderColor = alertMode ? 'border-console-red' : 'border-console-border';
  const dimColor = alertMode ? 'text-console-red opacity-60' : 'text-console-phosphor-dim';

  const isActive = (btn: PanelButton) =>
    btn.panel && btn.panel === activePanel && btn.panel !== 'terminal';

  const getButtonClass = (btn: PanelButton) => {
    if (btn.special === 'xenomorph') {
      return alertMode
        ? 'border-console-red bg-console-red/20 text-console-red alert-pulse'
        : 'border-console-amber text-console-amber';
    }
    if (btn.special === 'auto-destroy') {
      return alertMode
        ? 'border-console-red bg-console-red/30 text-console-red alert-pulse'
        : 'border-console-red text-console-red';
    }
    if (isActive(btn)) {
      return alertMode
        ? 'border-console-red bg-console-red/20 text-console-red alert-pulse'
        : 'border-console-phosphor bg-console-phosphor/10 text-console-phosphor-bright';
    }
    return alertMode
      ? 'border-console-red/40 text-console-red'
      : 'border-console-border text-console-phosphor-dim';
  };

  return (
    <div
      className={`h-full border-t ${borderColor} bg-console-bg flex items-center px-4 gap-3 transition-colors duration-300`}
    >
      <div className={`${dimColor} font-console text-xs mr-2 whitespace-nowrap`}>
        CONTROL
      </div>

      <div className="flex items-center gap-2 flex-1 flex-wrap">
        {buttons.map(btn => (
          <div
            key={btn.id}
            className={`font-console text-xs px-3 py-2 border transition-all duration-200 tracking-widest ${getButtonClass(btn)}`}
          >
            {btn.label}
          </div>
        ))}

        {(activePanel === 'mission-logs' || activePanel === 'crew-manifest') && (
          <div
            className={`font-console text-xs px-3 py-2 border transition-colors tracking-widest ml-auto ${alertMode ? 'border-console-red text-console-red/60' : 'border-console-border text-console-phosphor-dim'}`}
          >
            ← MOTHER
          </div>
        )}
      </div>

      <div className={`${dimColor} font-console text-[10px] ml-auto whitespace-nowrap`}>
        USCSS NOSTROMO
      </div>
    </div>
  );
};
