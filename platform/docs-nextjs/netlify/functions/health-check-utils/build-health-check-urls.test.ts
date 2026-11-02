import { docsets } from 'versioning';
import type { Docset, Version } from 'versioning';
import { buildHealthCheckUrls } from './build-health-check-urls';

const BASE = 'https://www.mongodb.com/docs/';

const version = (versionName: string, overrides: Partial<Version> = {}): Version => ({
  versionName,
  active: true,
  versionSelectorLabel: versionName,
  stable: false,
  noIndexing: false,
  ...overrides,
});

const docset = (project: string, prefix: string, versions: Version[], overrides: Partial<Docset> = {}): Docset => ({
  project,
  displayName: project,
  prefix,
  internalOnly: false,
  versions,
  ...overrides,
});

const ROOT_URLS = [`${BASE}sitemap-0.xml`, `${BASE}sitemap-index-full.xml`];

describe('buildHealthCheckUrls', () => {
  it('adds an index page and sitemap for each active version of a multi-version site', () => {
    const urls = buildHealthCheckUrls([
      docset('atlas-cli', 'docs/atlas/cli', [version('upcoming'), version('current'), version('v1.57')]),
    ]);

    expect(urls).toEqual([
      `${BASE}atlas/cli/current/`,
      `${BASE}atlas/cli/current/sitemap-0.xml`,
      `${BASE}atlas/cli/v1.57/`,
      `${BASE}atlas/cli/v1.57/sitemap-0.xml`,
      ...ROOT_URLS,
    ]);
  });

  it.each([['eol download', 'download' as const], ['no eol type', undefined]])(
    'skips an inactive version with %s',
    (_label, eolType) => {
      const urls = buildHealthCheckUrls([
        docset('atlas-cli', 'docs/atlas/cli', [version('current'), version('v1.52', { active: false, eolType })]),
      ]);

      expect(urls.some((url) => url.includes('v1.52'))).toBe(false);
    },
  );

  it('includes an inactive version whose eol type is link', () => {
    const urls = buildHealthCheckUrls([
      docset('kafka-connector', 'docs/kafka-connector', [
        version('current'),
        version('v1.13', { active: false, eolType: 'link' }),
        version('v1.2', { active: false, eolType: 'download' }),
      ]),
    ]);

    expect(urls).toEqual([
      `${BASE}kafka-connector/current/`,
      `${BASE}kafka-connector/current/sitemap-0.xml`,
      `${BASE}kafka-connector/v1.13/`,
      `${BASE}kafka-connector/v1.13/sitemap-0.xml`,
      ...ROOT_URLS,
    ]);
  });

  it('still skips upcoming when its eol type is link', () => {
    const urls = buildHealthCheckUrls([
      docset('docs', 'docs/example', [version('upcoming', { active: false, eolType: 'link' }), version('current')]),
    ]);

    expect(urls.some((url) => url.includes('/upcoming/'))).toBe(false);
  });

  it('uses the prefix alone for a single-version site', () => {
    const urls = buildHealthCheckUrls([docset('compass', 'docs/compass', [version('main')])]);

    expect(urls).toEqual([`${BASE}compass/`, `${BASE}compass/sitemap-0.xml`, ...ROOT_URLS]);
  });

  it('skips a single-version site whose version is inactive', () => {
    const urls = buildHealthCheckUrls([
      docset('datalake', 'docs/datalake', [version('main', { active: false, eolType: 'download' })]),
      docset('legacy', 'docs/legacy', [version('main', { active: false })]),
    ]);

    expect(urls).toEqual(ROOT_URLS);
  });

  it('includes a single-version site whose inactive version has an eol type of link', () => {
    const urls = buildHealthCheckUrls([
      docset('realm', 'docs/atlas/device-sdks', [version('main', { active: false, eolType: 'link' })]),
    ]);

    expect(urls).toEqual([`${BASE}atlas/device-sdks/`, `${BASE}atlas/device-sdks/sitemap-0.xml`, ...ROOT_URLS]);
  });

  it('puts version-only paths at the docs root when the prefix is bare `docs`', () => {
    const urls = buildHealthCheckUrls([docset('docs', 'docs', [version('upcoming'), version('manual'), version('v8.0')])]);

    expect(urls).toEqual([
      `${BASE}manual/`,
      `${BASE}manual/sitemap-0.xml`,
      `${BASE}v8.0/`,
      `${BASE}v8.0/sitemap-0.xml`,
      ...ROOT_URLS,
    ]);
  });

  it('skips internalOnly sites', () => {
    const urls = buildHealthCheckUrls([docset('internal', 'docs/internal', [version('main')], { internalOnly: true })]);

    expect(urls).toEqual(ROOT_URLS);
  });

  it('skips the landing project but still adds the root sitemaps', () => {
    const urls = buildHealthCheckUrls([docset('landing', 'docs', [version('main')])]);

    expect(urls).toEqual(ROOT_URLS);
  });

  it.each(['docs/404', 'docs/csfle-merge', 'docs/docs-platform', 'docs/meta', 'docs/standby-clusters'])(
    'skips the denylisted prefix %s and anything nested under it',
    (prefix) => {
      const urls = buildHealthCheckUrls([
        docset('denied', prefix, [version('main')]),
        docset('denied-child', `${prefix}/child`, [version('main')]),
      ]);

      expect(urls).toEqual(ROOT_URLS);
    },
  );

  it('does not treat a prefix that merely starts with a denylisted word as denied', () => {
    const urls = buildHealthCheckUrls([docset('metadata', 'docs/metadata', [version('main')])]);

    expect(urls).toContain(`${BASE}metadata/`);
  });

  it('does not repeat a URL', () => {
    const urls = buildHealthCheckUrls([
      docset('a', 'docs/shared', [version('main')]),
      docset('b', 'docs/shared', [version('main')]),
    ]);

    expect(new Set(urls).size).toBe(urls.length);
  });
});

describe('buildHealthCheckUrls with the real catalog', () => {
  const urls = buildHealthCheckUrls(docsets);

  it('returns unique docs URLs', () => {
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls.every((url) => url.startsWith(BASE))).toBe(true);
  });

  it('includes the root sitemaps and the Manual index', () => {
    expect(urls).toEqual(expect.arrayContaining([...ROOT_URLS, `${BASE}manual/`]));
  });

  it('never includes upcoming, inactive or denylisted sites', () => {
    expect(urls.some((url) => url.includes('/upcoming/'))).toBe(false);
    expect(urls.some((url) => /\/docs\/(404|meta|standby-clusters|docs-platform|csfle-merge)\//.test(url))).toBe(false);
    expect(urls.some((url) => url.startsWith(`${BASE}datalake/`))).toBe(false);
  });
});
