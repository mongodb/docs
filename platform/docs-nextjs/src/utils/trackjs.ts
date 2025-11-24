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
      console.log('TrackJS initialized successfully');
    } catch (error) {
      console.error('Failed to initialize TrackJS:', error);
    }
  }
};

// Export TrackJS instance for manual error tracking if needed
export { TrackJS };
