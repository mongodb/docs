interface SegmentWindow extends Window {
  segment?: {
    track: (eventName: string, data?: object) => void;
  };
}

/**
 * Whether the Pathway loader has assigned `window.segment` yet. Exported
 * because `reportAnalytics` drops events silently until it has, so callers that
 * can't afford to lose one check first (see report-web-vitals.ts).
 */
export const isSegmentReady = () =>
  typeof window !== 'undefined' && typeof (window as SegmentWindow).segment !== 'undefined';

export const reportAnalytics = (eventName: string, data?: object) => {
  if (!isSegmentReady()) {
    return;
  }
  try {
    (window as SegmentWindow).segment!.track(eventName, data ?? {});
  } catch (err) {
    console.error(`Error reporting analytics: ${eventName}`, err);
  }
};
