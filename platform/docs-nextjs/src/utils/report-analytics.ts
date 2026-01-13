interface SegmentWindow extends Window {
  segment?: {
    track: (eventName: string, data?: object) => void;
  };
}

export const reportAnalytics = (eventName: string, data?: object) => {
  if (typeof window === 'undefined' || typeof (window as SegmentWindow).segment === 'undefined') {
    return;
  }
  try {
    (window as SegmentWindow).segment!.track(eventName, data ?? {});
  } catch (err) {
    console.error(`Error reporting analytics: ${eventName}`, err);
  }
};
