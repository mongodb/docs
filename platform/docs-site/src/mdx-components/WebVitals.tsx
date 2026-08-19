'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { reportWebVital } from '@/utils/report-web-vitals';

/**
 * Reports LCP, INP, and CLS to Segment. Renders nothing.
 *
 * Mount once, in the persistent layout — never per page, and never with an
 * inline callback. Next keys the registration effect on callback identity and
 * registers the web-vitals listeners with no cleanup, so anything that changes
 * identity or remounts adds a second set of listeners and every metric is then
 * reported twice under different metric ids. Route dimensions come from
 * `setWebVitalRoute` (see WebVitalsRoute) rather than props for the same reason.
 */
export const WebVitals = () => {
  useReportWebVitals(reportWebVital);

  return null;
};
