import { TrackJS } from 'trackjs';

// TrackJS configuration
const trackjsConfig = {
  token: 'c3fccd861d9b4238bfe1af83ebdec219',
  application: 'nextjs',
  dependencies: false,
  // Add any additional configuration options here
  // See https://docs.trackjs.com for more options
};

// Initialize TrackJS
export const initializeTrackJS = () => {
  // Only initialize on client side
  if (typeof window !== 'undefined') {
    try {
      TrackJS.install(trackjsConfig);
    } catch (error) {
      console.error('Failed to initialize TrackJS:', error);
    }
  }
};

// Report a caught error to TrackJS. Guarded so a failed/absent TrackJS install
// never turns one crash into two.
export const reportError = (error: unknown) => {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    if (!TrackJS.isInstalled()) {
      initializeTrackJS();
    }
    TrackJS.track(error as Error | string);
  } catch (e) {
    console.error('Failed to report error to TrackJS:', e);
  }
};
