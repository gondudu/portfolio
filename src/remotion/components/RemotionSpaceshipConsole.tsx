import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { getTerminalStateAtFrame, TerminalAnimationStep } from '../utils/remotion-typewriter';
import { getLitPanelStateAtFrame, LitPanelEvent, LitPanelState } from '../utils/remotion-litpanel';

// Import Remotion-compatible child components
import { RemotionConsoleHeader } from './RemotionConsoleHeader';
import { RemotionLitPanel } from './RemotionLitPanel';
import { RemotionMUTHURTerminal } from './RemotionMUTHURTerminal';
import { RemotionPixelDecorations } from './RemotionPixelDecorations';
import { RemotionProjectMonitor } from './RemotionProjectMonitor';
import { RemotionCrewManifest } from './RemotionCrewManifest'; // Use the Remotion version

// Original components (will need Remotion-compatible versions or mocking)
import { RemotionControlPanel } from './RemotionControlPanel';

type ConsolePanel = 'terminal' | 'mission-logs' | 'crew-manifest';

interface RemotionSpaceshipConsoleProps {
  terminalTimeline: TerminalAnimationStep[];
  litPanelTimeline: LitPanelState[];
  projectMonitorSelectedLogId: string | null;
  selectedCrewMemberId: string | null;
  activeConsolePanel: ConsolePanel;
}

export const RemotionSpaceshipConsole: React.FC<RemotionSpaceshipConsoleProps> = ({
  terminalTimeline,
  litPanelTimeline,
  projectMonitorSelectedLogId,
  selectedCrewMemberId,
  activeConsolePanel,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Get current states from timelines
  const terminalState = getTerminalStateAtFrame(terminalTimeline, frame);
  const litPanelState = getLitPanelStateAtFrame(litPanelTimeline, frame);

  // Determine alertMode based on the timeline's events
  const alertMode: boolean = litPanelState.alertMode || terminalState.completedLines.some(line => line.includes('PROXIMITY ALERT'));

  return (
    <div
      className="fixed inset-0 bg-console-bg flex flex-col font-console overflow-hidden"
      style={{ color: '#33ff00' }}
    >
      <RemotionPixelDecorations />

      {/* Header bar — 48px */}
      <RemotionConsoleHeader alertMode={alertMode} />

      {/* Main content area */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[150px_1fr_150px] gap-2 p-2 min-h-0">
        {/* Left panel — lit indicators */}
        <div className="hidden md:block min-h-0">
          <RemotionLitPanel litPanelState={litPanelState} />
        </div>

        {/* Center monitor — main panel */}
        <div className="min-h-0 relative">
          <div className={activeConsolePanel === 'terminal' ? 'h-full' : 'hidden'}>
            <RemotionMUTHURTerminal alertMode={alertMode} terminalState={terminalState} />
          </div>
          <div className={activeConsolePanel === 'mission-logs' ? 'h-full' : 'hidden'}>
            <RemotionProjectMonitor alertMode={alertMode} selectedLogId={projectMonitorSelectedLogId} />
          </div>
          <div className={activeConsolePanel === 'crew-manifest' ? 'h-full' : 'hidden'}>
            <RemotionCrewManifest alertMode={alertMode} selectedCrewMemberId={selectedCrewMemberId} />
          </div>
        </div>

        {/* Right panel — lit indicators */}
        <div className="hidden md:block min-h-0">
          <RemotionLitPanel litPanelState={litPanelState} />
        </div>
      </div>

      {/* Control panel — 80px */}
      <div className="h-20">
        <RemotionControlPanel
          activePanel={activeConsolePanel}
          alertMode={alertMode}
        />
      </div>
    </div>
  );
};
