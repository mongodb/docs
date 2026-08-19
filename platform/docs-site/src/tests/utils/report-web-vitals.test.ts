import type * as ReportWebVitals from '@/utils/report-web-vitals';
import {
  buildWebVitalPayload,
  getWebVitalRoute,
  isReportedWebVital,
  reportWebVital,
  resetWebVitalsBuffer,
  SAMPLE_RATE,
  setWebVitalRoute,
  WEB_VITAL_EVENT_NAME,
  type WebVitalMetric,
} from '@/utils/report-web-vitals';

type ReportWebVitalsModule = typeof ReportWebVitals;

const track = jest.fn();

const makeMetric = (overrides: Partial<WebVitalMetric> = {}): WebVitalMetric => ({
  name: 'LCP',
  value: 1234.56,
  id: 'v4-1700000000000-1',
  rating: 'good',
  navigationType: 'navigate',
  ...overrides,
});

const context = { routeTemplate: 'document', slug: 'docs/atlas/getting-started' };

const setSegment = () => {
  (window as unknown as { segment?: unknown }).segment = { track };
};

const clearSegment = () => {
  delete (window as unknown as { segment?: unknown }).segment;
};

describe('isReportedWebVital', () => {
  it.each(['LCP', 'INP', 'CLS'])('reports %s', (name) => {
    expect(isReportedWebVital(name)).toBe(true);
  });

  it.each(['FCP', 'TTFB', 'Next.js-hydration'])('drops %s', (name) => {
    expect(isReportedWebVital(name)).toBe(false);
  });
});

describe('buildWebVitalPayload', () => {
  it('rounds millisecond metrics to whole milliseconds', () => {
    expect(buildWebVitalPayload(makeMetric({ name: 'LCP', value: 1234.56 }), context)).toMatchObject({
      metric: 'LCP',
      value: 1235,
    });
  });

  it('keeps four decimals of precision for the unitless CLS ratio', () => {
    expect(buildWebVitalPayload(makeMetric({ name: 'CLS', value: 0.123456 }), context)).toMatchObject({
      metric: 'CLS',
      value: 0.1235,
    });
  });

  it('dimensions the event by docset, route template, slug, branch, and commit', () => {
    // The build-time values are unset under jest, so they take their fallbacks.
    expect(buildWebVitalPayload(makeMetric(), context)).toMatchObject({
      docsProject: 'unknown',
      docsBasePath: '/docs',
      inactiveManual: false,
      routeTemplate: 'document',
      slug: 'docs/atlas/getting-started',
      branch: 'unknown',
      commit: 'unknown',
    });
  });

  it('records the sample rate so rate changes are visible in the data', () => {
    expect(buildWebVitalPayload(makeMetric(), context)).toMatchObject({ sampleRate: SAMPLE_RATE });
  });

  it('passes through the rating, metric id, and navigation type', () => {
    expect(buildWebVitalPayload(makeMetric(), context)).toMatchObject({
      rating: 'good',
      metricId: 'v4-1700000000000-1',
      navigationType: 'navigate',
    });
  });
});

describe('reportWebVital', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    track.mockClear();
    resetWebVitalsBuffer();
    clearSegment();
  });

  afterEach(() => {
    resetWebVitalsBuffer();
    clearSegment();
    jest.useRealTimers();
  });

  it('tracks a reported vital immediately when Segment is ready', () => {
    setSegment();
    reportWebVital(makeMetric(), context);

    expect(track).toHaveBeenCalledTimes(1);
    expect(track).toHaveBeenCalledWith(WEB_VITAL_EVENT_NAME, expect.objectContaining({ metric: 'LCP' }));
  });

  it('ignores metrics outside LCP/INP/CLS', () => {
    setSegment();
    reportWebVital(makeMetric({ name: 'TTFB' }), context);

    expect(track).not.toHaveBeenCalled();
  });

  it('buffers events reported before Segment loads and flushes them in order', () => {
    reportWebVital(makeMetric({ name: 'LCP' }), context);
    reportWebVital(makeMetric({ name: 'CLS', value: 0.05 }), context);
    expect(track).not.toHaveBeenCalled();

    setSegment();
    jest.advanceTimersByTime(500);

    expect(track).toHaveBeenCalledTimes(2);
    expect(track.mock.calls[0][1]).toMatchObject({ metric: 'LCP' });
    expect(track.mock.calls[1][1]).toMatchObject({ metric: 'CLS' });
  });

  it('falls back to the route published by setWebVitalRoute when no context is passed', () => {
    setSegment();
    setWebVitalRoute({ routeTemplate: 'landing', slug: 'docs/atlas' });

    reportWebVital(makeMetric());

    expect(track).toHaveBeenCalledWith(
      WEB_VITAL_EVENT_NAME,
      expect.objectContaining({ routeTemplate: 'landing', slug: 'docs/atlas' }),
    );
  });

  it('reports the route current at flush time, not the one that registered the listener', () => {
    setWebVitalRoute({ routeTemplate: 'landing', slug: 'docs/atlas' });
    setWebVitalRoute({ routeTemplate: 'document', slug: 'docs/atlas/tutorial' });
    expect(getWebVitalRoute()).toEqual({ routeTemplate: 'document', slug: 'docs/atlas/tutorial' });

    setSegment();
    reportWebVital(makeMetric({ name: 'CLS', value: 0.02 }));

    expect(track).toHaveBeenCalledWith(WEB_VITAL_EVENT_NAME, expect.objectContaining({ slug: 'docs/atlas/tutorial' }));
  });

  it('reports every page view when no sample rate is configured', () => {
    expect(SAMPLE_RATE).toBe(1);

    setSegment();
    reportWebVital(makeMetric(), context);

    expect(track).toHaveBeenCalledTimes(1);
  });

  it('gives up after Segment fails to appear, warning once instead of buffering forever', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});

    reportWebVital(makeMetric(), context);
    jest.advanceTimersByTime(500 * 20);

    expect(track).not.toHaveBeenCalled();
    expect(warn).toHaveBeenCalledTimes(1);

    // The timer is cleared, so later ticks do not warn again.
    jest.advanceTimersByTime(500 * 20);
    expect(warn).toHaveBeenCalledTimes(1);

    warn.mockRestore();
  });
});

/**
 * SAMPLE_RATE is read from the environment when the module is first evaluated,
 * so each rate needs a fresh module instance.
 */
describe('sampling', () => {
  const loadWithRate = (rate: string) => {
    process.env.NEXT_PUBLIC_WEB_VITALS_SAMPLE_RATE = rate;
    let loaded!: ReportWebVitalsModule;
    jest.isolateModules(() => {
      loaded = jest.requireActual<ReportWebVitalsModule>('@/utils/report-web-vitals');
    });
    return loaded;
  };

  beforeEach(() => {
    track.mockClear();
    setSegment();
  });

  afterEach(() => {
    delete process.env.NEXT_PUBLIC_WEB_VITALS_SAMPLE_RATE;
    clearSegment();
    jest.restoreAllMocks();
  });

  it('reports nothing at a rate of 0', () => {
    const { reportWebVital: report } = loadWithRate('0');

    report(makeMetric(), context);

    expect(track).not.toHaveBeenCalled();
  });

  it('falls back to reporting everything when the rate is unparseable or out of range', () => {
    expect(loadWithRate('not-a-number').SAMPLE_RATE).toBe(1);
    expect(loadWithRate('1.5').SAMPLE_RATE).toBe(1);
    expect(loadWithRate('-0.2').SAMPLE_RATE).toBe(1);
  });

  it('drops the whole document when the sample roll misses', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.9);
    const { reportWebVital: report } = loadWithRate('0.5');

    report(makeMetric({ name: 'LCP' }), context);
    report(makeMetric({ name: 'CLS', value: 0.05 }), context);

    expect(track).not.toHaveBeenCalled();
  });

  it('keeps all of a document’s metrics on a single roll, not one per metric', () => {
    // Only the first roll is under the rate. If the decision were made per
    // metric, INP and CLS would both be dropped here.
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.1).mockReturnValue(0.9);
    const { reportWebVital: report } = loadWithRate('0.5');

    report(makeMetric({ name: 'LCP' }), context);
    report(makeMetric({ name: 'INP', value: 40 }), context);
    report(makeMetric({ name: 'CLS', value: 0.05 }), context);

    expect(track).toHaveBeenCalledTimes(3);
    expect(track.mock.calls.map((call) => (call[1] as { metric: string }).metric)).toEqual(['LCP', 'INP', 'CLS']);
  });

  it('stamps the configured rate on the event', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.1);
    const { reportWebVital: report } = loadWithRate('0.5');

    report(makeMetric(), context);

    expect(track).toHaveBeenCalledWith(WEB_VITAL_EVENT_NAME, expect.objectContaining({ sampleRate: 0.5 }));
  });
});
