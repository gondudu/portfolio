import { interpolate } from 'remotion';

export const STATUS_ROWS = [3, 9, 15, 21, 27, 33];
export const TOTAL_ROWS = 38;

type SystemStatus = 'NOMINAL' | 'WARNING' | 'CRITICAL';

interface PanelSystem {
  name: string;
  status: SystemStatus;
}

const INITIAL_SYSTEMS: PanelSystem[] = [
  { name: 'LIFE SUPP', status: 'NOMINAL' },
  { name: 'HULL INT', status: 'NOMINAL' },
  { name: 'ENGINE', status: 'NOMINAL' },
  { name: 'NAV SYS', status: 'NOMINAL' },
  { name: 'COMM ARR', status: 'WARNING' },
  { name: 'PWR CORE', status: 'NOMINAL' },
];

export interface LitPanelState {
  systems: PanelSystem[];
  alertMode: boolean;
}

export interface LitPanelEvent {
  type: 'alert_on' | 'alert_off' | 'system_status_change';
  startFrame: number;
  payload?: { systemIndex: number; status: SystemStatus };
}

export const precalculateLitPanelTimeline = (
  events: LitPanelEvent[],
  fps: number,
  totalDurationFrames: number
): LitPanelState[] => {
  const timeline: LitPanelState[] = [];
  let currentSystems = [...INITIAL_SYSTEMS];
  let currentAlertMode = false;

  events.sort((a, b) => a.startFrame - b.startFrame);
  let eventIndex = 0;

  for (let frame = 0; frame <= totalDurationFrames; frame++) {
    // Process events for the current frame
    while (eventIndex < events.length && events[eventIndex].startFrame === frame) {
      const event = events[eventIndex];
      if (event.type === 'alert_on') {
        currentAlertMode = true;
      } else if (event.type === 'alert_off') {
        currentAlertMode = false;
      } else if (event.type === 'system_status_change' && event.payload) {
        currentSystems[event.payload.systemIndex].status = event.payload.status;
      }
      eventIndex++;
    }

    // Simulate the drifting status
    // This part is complex to make deterministic and frame-based while mimicking randomness.
    // A simple approach is to use `interpolate` with a seeded random function or a sine wave.

    // For now, let's just update the alert mode and systems based on explicit events.
    // A more advanced version would use interpolate to smoothly transition statuses
    // or pre-seed random numbers for each system at intervals.

    timeline.push({
      systems: JSON.parse(JSON.stringify(currentSystems)), // Deep copy
      alertMode: currentAlertMode,
    });
  }

  return timeline;
};

export const getLitPanelStateAtFrame = (
  timeline: LitPanelState[],
  frame: number
): LitPanelState => {
  if (frame < 0 || frame >= timeline.length) {
    return { systems: INITIAL_SYSTEMS, alertMode: false };
  }
  return timeline[frame];
};

export function dotOpacity(i: number, frame: number): number {
  // Make dot opacity deterministic but still appear random over time
  // Using sine wave with frame dependency for subtle animation
  return 0.2 + (Math.abs(Math.sin(i * 127.1 + frame * 0.05) * 43758) % 1) * 0.8;
}
