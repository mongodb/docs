import { useEffect } from 'react';
import { render } from '@testing-library/react';

import { WebVitals } from '@/mdx-components/WebVitals';
import { WebVitalsRoute } from '@/mdx-components/WebVitalsRoute';
import { getWebVitalRoute, resetWebVitalsBuffer } from '@/utils/report-web-vitals';

const registrations: Array<(metric: unknown) => void> = [];

// Mirrors Next's own useReportWebVitals: an effect keyed on callback identity
// that registers listeners and never cleans them up. Registering twice is the
// bug these tests exist to catch — it double-reports every metric.
jest.mock('next/web-vitals', () => ({
  useReportWebVitals: (fn: (metric: unknown) => void) => {
    useEffect(() => {
      registrations.push(fn);
    }, [fn]);
  },
}));

describe('WebVitals', () => {
  beforeEach(() => {
    registrations.length = 0;
    resetWebVitalsBuffer();
  });

  it('registers the metric listeners exactly once', () => {
    render(<WebVitals />);

    expect(registrations).toHaveLength(1);
  });

  it('does not re-register on re-render', () => {
    const { rerender } = render(<WebVitals />);
    rerender(<WebVitals />);
    rerender(<WebVitals />);

    expect(registrations).toHaveLength(1);
  });
});

describe('WebVitalsRoute', () => {
  beforeEach(() => {
    resetWebVitalsBuffer();
  });

  it('publishes the current page route to the reporter', () => {
    render(<WebVitalsRoute template="document" slug="docs/atlas/getting-started" />);

    expect(getWebVitalRoute()).toEqual({
      routeTemplate: 'document',
      slug: 'docs/atlas/getting-started',
    });
  });

  it('republishes when the page changes', () => {
    const { rerender } = render(<WebVitalsRoute template="document" slug="docs/atlas/getting-started" />);
    rerender(<WebVitalsRoute template="landing" slug="docs/atlas" />);

    expect(getWebVitalRoute()).toEqual({ routeTemplate: 'landing', slug: 'docs/atlas' });
  });
});
