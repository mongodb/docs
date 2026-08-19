import { isSegmentReady, reportAnalytics } from '@/utils/report-analytics';
import { BUILD_BRANCH, BUILD_COMMIT, BUILD_DOCS_PROJECT, BUILD_INACTIVE_MANUAL } from '@/utils/build-info';
import { getBasePath } from '@/utils/base-path';
import { isOfflineBuild } from '@/utils/isOfflineBuild';

/**
 * The three Core Web Vitals. `useReportWebVitals` also emits FCP, TTFB, and
 * Next-internal timings, so anything not listed here is dropped before it
 * reaches Segment.
 */
export const REPORTED_WEB_VITALS = ['LCP', 'INP', 'CLS'] as const;

export const WEB_VITAL_EVENT_NAME = 'Web Vital';

/** Structural subset of web-vitals' `Metric`, so callers don't import from `next/dist`. */
export interface WebVitalMetric {
  name: string;
  value: number;
  id: string;
  rating?: string;
  navigationType?: string;
}

export interface WebVitalContext {
  /** Snooty page template: `document`, `landing`, `changelog`, … */
  routeTemplate: string;
  slug: string;
}

const UNKNOWN_ROUTE: WebVitalContext = { routeTemplate: 'unknown', slug: 'unknown' };

/**
 * The route the user is on now, held outside React. The listeners are
 * registered once per document (see WebVitals.tsx) but CLS and INP don't flush
 * until page-hide, so the page that registered them is often long gone by then
 * and can't supply the dimensions via props.
 */
let currentRoute: WebVitalContext = UNKNOWN_ROUTE;

export const setWebVitalRoute = (context: WebVitalContext) => {
  currentRoute = context;
};

export const getWebVitalRoute = (): WebVitalContext => currentRoute;

export const isReportedWebVital = (name: string): boolean => (REPORTED_WEB_VITALS as readonly string[]).includes(name);

/**
 * Fraction of visits that report, from WEB_VITALS_SAMPLE_RATE at build time.
 * Defaults to reporting everything: over-sampling can be thinned during
 * analysis, but an under-sampled LeafyGreen-era baseline can't be refilled once
 * the migration starts landing.
 */
export const SAMPLE_RATE = (() => {
  const raw = Number.parseFloat(process.env.NEXT_PUBLIC_WEB_VITALS_SAMPLE_RATE ?? '');
  if (!Number.isFinite(raw) || raw < 0 || raw > 1) return 1;
  return raw;
})();

let sampled: boolean | null = null;

/**
 * One roll per document, memoized — never per metric. A per-metric roll would
 * let a visit report LCP but not its CLS, leaving the two uncorrelatable, and
 * would bias the page-hide-flushed metrics against LCP.
 */
const isSampledDocument = (): boolean => {
  if (sampled === null) {
    sampled = SAMPLE_RATE >= 1 || Math.random() < SAMPLE_RATE;
  }
  return sampled;
};

/** CLS is a 0–1 ratio, so it keeps decimals; LCP and INP are ms, where they'd be noise. */
const roundValue = (name: string, value: number): number =>
  name === 'CLS' ? Math.round(value * 10000) / 10000 : Math.round(value);

export const buildWebVitalPayload = (metric: WebVitalMetric, context: WebVitalContext) => ({
  metric: metric.name,
  value: roundValue(metric.name, metric.value),
  rating: metric.rating,
  metricId: metric.id,
  navigationType: metric.navigationType,
  // Identifies the docset, which is what the dashboard groups by. Base path is
  // redundant with project except for manual and landing, which share `/docs`;
  // `inactiveManual` splits EOL manual from active, which match on both.
  docsProject: BUILD_DOCS_PROJECT,
  docsBasePath: getBasePath(),
  inactiveManual: BUILD_INACTIVE_MANUAL,
  routeTemplate: context.routeTemplate,
  slug: context.slug,
  branch: BUILD_BRANCH,
  // Netlify reports BRANCH as the production branch on every prod build, so the
  // commit is what distinguishes one merge from the next.
  commit: BUILD_COMMIT,
  // Stamped on every event so a rate change reads as a rate change rather than
  // as a drop in traffic.
  sampleRate: SAMPLE_RATE,
});

/**
 * The Pathway loader is `afterInteractive`, so LCP often fires before
 * `window.segment` exists — and `reportAnalytics` drops silently when it's
 * missing. Queue those events and flush once Segment appears, giving up after
 * MAX_FLUSH_ATTEMPTS so a page that never loads Pathway doesn't poll forever.
 */
const FLUSH_INTERVAL_MS = 500;
const MAX_FLUSH_ATTEMPTS = 20;

let pending: object[] = [];
let flushTimer: ReturnType<typeof setInterval> | null = null;
let flushAttempts = 0;

const flushPending = () => {
  const queued = pending;
  pending = [];
  queued.forEach((payload) => reportAnalytics(WEB_VITAL_EVENT_NAME, payload));
};

const stopFlushing = () => {
  if (flushTimer !== null) {
    clearInterval(flushTimer);
    flushTimer = null;
  }
  flushAttempts = 0;
};

const scheduleFlush = () => {
  // Reset so a late arrival gets the full window instead of inheriting the
  // attempts already spent waiting on the events ahead of it.
  flushAttempts = 0;
  if (flushTimer !== null) return;
  flushTimer = setInterval(() => {
    flushAttempts += 1;
    if (isSegmentReady()) {
      stopFlushing();
      flushPending();
      return;
    }
    if (flushAttempts >= MAX_FLUSH_ATTEMPTS) {
      const dropped = pending.length;
      pending = [];
      stopFlushing();
      console.warn(`Dropped ${dropped} web vital event(s): window.segment never became available`);
    }
  }, FLUSH_INTERVAL_MS);
};

/** Test-only: clears the module state this file accumulates per document. */
export const resetWebVitalsBuffer = () => {
  pending = [];
  currentRoute = UNKNOWN_ROUTE;
  sampled = null;
  stopFlushing();
};

/**
 * Reports one metric. Defined at module level so its identity is stable —
 * `useReportWebVitals` re-registers every listener when the callback changes.
 */
export const reportWebVital = (metric: WebVitalMetric, context: WebVitalContext = getWebVitalRoute()) => {
  // Offline bundles have no network, so there's no pipeline to report into.
  if (isOfflineBuild || !isReportedWebVital(metric.name) || !isSampledDocument()) return;

  const payload = buildWebVitalPayload(metric, context);

  if (isSegmentReady()) {
    reportAnalytics(WEB_VITAL_EVENT_NAME, payload);
    return;
  }

  pending.push(payload);
  scheduleFlush();
};
