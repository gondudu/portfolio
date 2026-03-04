import { MOTHER_RESPONSES, BOOT_SEQUENCE } from "@/lib/console-data";

export interface TerminalEvent {
  type: 'enqueue' | 'input' | 'alert' | 'secret_sequence' | 'auto_destroy';
  payload?: {
    lines?: string[];
    query?: string;
    responseKey?: string;
    delayPerChar?: number;
  };
  startFrame: number; // Frame at which this event is triggered
}

export interface TerminalAnimationStep {
  frame: number;
  completedLines: string[];
  currentDisplay: string | null;
  inputLine: string | null;
}

export const precalculateTerminalTimeline = (
  events: TerminalEvent[],
  fps: number,
  totalDurationFrames: number
): TerminalAnimationStep[] => {
  const timeline: TerminalAnimationStep[] = [];

  let currentCompletedLines: string[] = [];
  let currentTypingText: string | null = null;
  let currentTypedCharIdx = 0;
  let lastCharTypedFrame = 0;
  let queue: { text: string; delayPerChar: number; isInput?: boolean }[] = [];

  // Initial boot sequence
  BOOT_SEQUENCE.forEach(line => {
    queue.push({ text: line, delayPerChar: 18, isInput: false });
  });

  // Sort custom events by their start frame
  events.sort((a, b) => a.startFrame - b.startFrame);

  let eventIndex = 0;

  // Simulate frame by frame
  for (let frame = 0; frame <= totalDurationFrames; frame++) {
    // Process custom events for the current frame
    while (eventIndex < events.length && events[eventIndex].startFrame === frame) {
      const event = events[eventIndex];
      if (event.type === 'enqueue') {
        event.payload?.lines?.forEach(line => {
          queue.push({ text: line, delayPerChar: event.payload?.delayPerChar || 25, isInput: false });
        });
      } else if (event.type === 'input' && event.payload?.query) {
        queue.push({ text: `> ${event.payload.query.toUpperCase()}`, delayPerChar: 0, isInput: true });
        const responseKey = event.payload.responseKey || 'default';
        const responses = (MOTHER_RESPONSES as any)[responseKey];
        const delay = responseKey === 'special_order_937' ? 70 : 25;
        responses.forEach((line: string) => {
          queue.push({ text: line, delayPerChar: delay, isInput: false });
        });
      } else if (event.type === 'alert') {
         queue.push({ text: '⚠ ⚠ ⚠ PROXIMITY ALERT ⚠ ⚠ ⚠', delayPerChar: 30, isInput: false });
         queue.push({ text: 'HOSTILE ENTITY DETECTED.', delayPerChar: 30, isInput: false });
         queue.push({ text: 'ALL PERSONNEL TO EMERGENCY STATIONS.', delayPerChar: 30, isInput: false });
         queue.push({ text: 'INITIATING CONTAINMENT PROTOCOL...', delayPerChar: 30, isInput: false });
      } else if (event.type === 'secret_sequence') {
        MOTHER_RESPONSES.secret_sequence.forEach(line => {
          queue.push({ text: line, delayPerChar: 50, isInput: false });
        });
      } else if (event.type === 'auto_destroy') {
        MOTHER_RESPONSES.auto_destroy.forEach(line => {
          queue.push({ text: line, delayPerChar: 60, isInput: false });
        });
      }
      eventIndex++;
    }

    // Handle typing animation
    if (currentTypingText === null && queue.length > 0) {
      // Start typing next item in queue
      const nextItem = queue.shift()!;
      currentTypingText = nextItem.text;
      currentTypedCharIdx = 0;
      lastCharTypedFrame = frame;
    }

    if (currentTypingText !== null) {
      const charDelayMs = (queue[0]?.delayPerChar !== undefined ? queue[0]?.delayPerChar : 25);
      const charDelayFrames = Math.max(1, Math.round(charDelayMs / 1000 * fps));

      if (frame >= lastCharTypedFrame + charDelayFrames) {
        if (currentTypedCharIdx < currentTypingText.length) {
          currentTypedCharIdx++;
          lastCharTypedFrame = frame;
        } else {
          // Line completed
          currentCompletedLines.push(currentTypingText);
          if (currentCompletedLines.length > 50) { // Keep last 50 lines, similar to original component
            currentCompletedLines.shift();
          }
          currentTypingText = null;
          currentTypedCharIdx = 0;
        }
      }
    }

    // Capture the state at the current frame
    timeline.push({
      frame: frame,
      completedLines: [...currentCompletedLines],
      currentDisplay: currentTypingText ? currentTypingText.slice(0, currentTypedCharIdx) : null,
      inputLine: null, // Input line will be part of the currentDisplay when typed
    });
  }

  return timeline;
};

export const getTerminalStateAtFrame = (
  timeline: TerminalAnimationStep[],
  frame: number,
): RemotionTerminalState => {
  if (frame < 0 || frame >= timeline.length) {
    // Return a default or error state if frame is out of bounds
    return { completedLines: [], currentDisplay: null, inputLine: null };
  }
  return timeline[frame];
};

export interface RemotionTerminalState {
  completedLines: string[];
  currentDisplay: string | null;
  inputLine: string | null;
}
