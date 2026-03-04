import './remotion.css';

import React from 'react';
import { Composition } from 'remotion';
import { RemotionAnimatedSection } from './components/RemotionAnimatedSection';
import { RemotionSpaceshipConsole } from './components/RemotionSpaceshipConsole';
import { precalculateTerminalTimeline, TerminalEvent } from './utils/remotion-typewriter';
import { precalculateLitPanelTimeline, LitPanelEvent } from './utils/remotion-litpanel';

export const RemotionRoot: React.FC = () => {
  const fps = 30;
  const durationInFrames = 900; // 30 seconds at 30 fps

  // Define the events for the terminal animation
  const terminalEvents: TerminalEvent[] = [
    { type: 'input', payload: { query: 'what is your purpose', responseKey: 'greeting' }, startFrame: Math.round(5 * fps) },
    { type: 'input', payload: { query: 'show me crew manifest', responseKey: 'crew' }, startFrame: Math.round(10 * fps) },
    { type: 'alert', startFrame: Math.round(15 * fps) },
    { type: 'secret_sequence', startFrame: Math.round(20 * fps) },
    { type: 'auto_destroy', startFrame: Math.round(25 * fps) },
  ];

  // Define the events for the lit panel animation
  const litPanelEvents: LitPanelEvent[] = [
    { type: 'alert_on', startFrame: Math.round(15 * fps) },
    { type: 'alert_off', startFrame: Math.round(15 * fps + 10 * fps) }, // Alert off after 10 seconds
    { type: 'system_status_change', startFrame: Math.round(5 * fps), payload: { systemIndex: 0, status: 'WARNING' } },
    { type: 'system_status_change', startFrame: Math.round(7 * fps), payload: { systemIndex: 0, status: 'NOMINAL' } },
  ];

  // Pre-calculate the entire terminal timeline once
  const terminalTimeline = precalculateTerminalTimeline(terminalEvents, fps, durationInFrames);
  // Pre-calculate the entire lit panel timeline once
  const litPanelTimeline = precalculateLitPanelTimeline(litPanelEvents, fps, durationInFrames);

  return (
    <>
      {/* Example Composition for AnimatedSection */}
      <Composition
        id="HelloWorld"
        component={RemotionAnimatedSection}
        durationInFrames={300}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{
          variant: 'fadeInUp',
          children: <h1>Hello, Remotion!</h1>,
        }}
      />

      {/* Composition for SpaceshipConsole */}
      <Composition
        id="HomePageVideo"
        component={RemotionSpaceshipConsole}
        durationInFrames={durationInFrames}
        fps={fps}
        width={1920}
        height={1080}
        defaultProps={{
          terminalTimeline: terminalTimeline,
          litPanelTimeline: litPanelTimeline,
          projectMonitorSelectedLogId: 'log-001', // Example: display the first mission log
          selectedCrewMemberId: 'nogueira', // Example: display Eduardo's profile
          activeConsolePanel: 'terminal', // Set the active panel for the video
        }}
      />
    </>
  );
};
