'use client';

import { useEffect } from 'react';
import { initializeTrackJS } from '@/utils/trackjs';

/**
 * TrackJS Provider Component
 *
 * This component initializes TrackJS as early as possible in the client-side lifecycle.
 * It uses useEffect with an empty dependency array to ensure it runs once when the component mounts.
 */
export default function TrackJSProvider() {
  useEffect(() => {
    initializeTrackJS();
  }, []);

  // This component doesn't render anything
  return null;
}
