'use client';

import { useEffect } from 'react';
import { setWebVitalRoute } from '@/utils/report-web-vitals';

interface WebVitalsRouteProps {
  /** Snooty page template, reported as the route-template dimension. */
  template: string;
  slug: string;
}

/**
 * Publishes this page's route dimensions to the reporter. Renders nothing.
 *
 * Rendered per page, unlike WebVitals, which mounts once in the layout and so
 * can't read the current page from props.
 */
export const WebVitalsRoute = ({ template, slug }: WebVitalsRouteProps) => {
  useEffect(() => {
    setWebVitalRoute({ routeTemplate: template, slug });
  }, [template, slug]);

  return null;
};
