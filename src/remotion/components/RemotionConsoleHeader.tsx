import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';

interface RemotionConsoleHeaderProps {
  alertMode: boolean;
}

export const RemotionConsoleHeader: React.FC<RemotionConsoleHeaderProps> = ({
  alertMode,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Calculate stardate based on frame and fps
  // Assuming the video starts at a specific date, e.g., 2026-03-04 (current date)
  const startDate = new Date('2026-03-04T00:00:00Z');
  const millisecondsPerFrame = 1000 / fps;
  const currentVideoTimeMs = frame * millisecondsPerFrame;
  const currentDateTime = new Date(startDate.getTime() + currentVideoTimeMs);

  const stardate = `${currentDateTime.getFullYear()}.${String(currentDateTime.getMonth() + 1).padStart(2, '0')}${String(currentDateTime.getDate()).padStart(2, '0')}.${String(currentDateTime.getHours()).padStart(2, '0')}${String(currentDateTime.getMinutes()).padStart(2, '0')}`;

  const textColor = alertMode ? 'text-console-red' : 'text-console-phosphor';
  const borderColor = alertMode ? 'border-console-red' : 'border-console-border';

  return (
    <header
      className={`h-12 flex items-center justify-between px-4 border-b ${borderColor} font-console text-sm transition-colors duration-300 ${alertMode ? 'alert-pulse' : ''}`}
    >
      <div className={`flex items-center gap-4 ${textColor}`}>
        <span className="text-console-phosphor-dim text-xs">USS</span>
        <span>MU-TH-UR 6000</span>
        <span className="text-console-phosphor-dim">■</span>
        <span>USCSS NOSTROMO</span>
        <span className="text-console-phosphor-dim">■</span>
        <span>WEYLAND-YUTANI CORP</span>
      </div>

      <div className={`flex items-center gap-4 ${textColor}`}>
        {alertMode && (
          <span className="text-console-red text-xs tracking-widest alert-pulse">
            ⚠ XENOMORPH CONFIRMED ⚠
          </span>
        )}
        <span className="text-console-phosphor-dim text-xs">STARDATE</span>
        <span className="text-xs">{stardate || '-----.------'}</span>
      </div>
    </header>
  );
};
