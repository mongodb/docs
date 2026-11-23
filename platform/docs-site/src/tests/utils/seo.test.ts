import { DOTCOM_BASE_URL } from '@/constants';
import type { MDXFrontmatter } from '@/types/ast';
import type { Docset } from '@/types/data';
import { getPageMetadata } from '@/utils/seo';
import { createMockMetadata } from './mock-snooty-metadata';

const makeDocset = (versionNames: string[], prefix = 'docs'): Docset => ({
  project: 'manual',
  displayName: 'MongoDB Manual',
  prefix,
  internalOnly: false,
  versions: versionNames.map((versionName) => ({
    versionName,
    versionSelectorLabel: versionName,
    active: true,
    stable: false,
    noIndexing: false,
  })),
});

const manualDocset = makeDocset(['manual', 'v8.0']);

const getMetadata = ({
  fileId,
  frontmatter = {},
  branch = 'manual',
  metadata = {},
  docset = manualDocset,
}: {
  fileId: string;
  frontmatter?: MDXFrontmatter;
  branch?: string;
  metadata?: Parameters<typeof createMockMetadata>[0];
  docset?: Docset;
}) =>
  getPageMetadata({
    frontmatter: { fileId, ...frontmatter },
    snootyMetadata: createMockMetadata({ branch, ...metadata }),
    docset,
  });

describe('getPageMetadata', () => {
  const originalDbEnv = process.env.DB_ENV;

  beforeEach(() => {
    process.env.DB_ENV = 'dotcomprd';
  });

  afterEach(() => {
    if (originalDbEnv === undefined) delete process.env.DB_ENV;
    else process.env.DB_ENV = originalDbEnv;
  });

  describe('openGraph.url', () => {
    it('is the canonical URL of a normal page', () => {
      const result = getMetadata({ fileId: 'data-modeling.txt' });

      expect(result.openGraph.url).toBe(`${DOTCOM_BASE_URL}/docs/manual/data-modeling/`);
      expect(result.openGraph.url).toBe(result.alternates.canonical);
    });

    it('includes the version for a versioned page', () => {
      const result = getMetadata({ fileId: 'data-modeling.txt', branch: 'v8.0' });

      expect(result.openGraph.url).toBe(`${DOTCOM_BASE_URL}/docs/v8.0/data-modeling/`);
      expect(result.openGraph.url).toBe(result.alternates.canonical);
    });

    it('uses an explicit canonical override from frontmatter', () => {
      const canonical = `${DOTCOM_BASE_URL}/docs/atlas/some-other-page/`;
      const result = getMetadata({ fileId: 'data-modeling.txt', frontmatter: { canonical } });

      expect(result.openGraph.url).toBe(canonical);
      expect(result.openGraph.url).toBe(result.alternates.canonical);
    });

    it('is the docs landing URL, not the site root, for the index page', () => {
      // Mirrors the real `landing` docset: prefix "docs", one version named
      // "main", published at /docs/ with no version segment.
      const result = getMetadata({
        fileId: 'index.txt',
        branch: 'main',
        docset: makeDocset(['main']),
      });

      expect(result.openGraph.url).toBe(`${DOTCOM_BASE_URL}/docs/`);
      expect(result.openGraph.url).not.toBe(new URL(DOTCOM_BASE_URL).toString());
    });

    it('strips a trailing index segment but keeps slugs that start with index', () => {
      const nested = getMetadata({ fileId: 'indexes/index.txt' });
      const prefixed = getMetadata({ fileId: 'index-management.txt' });

      expect(nested.openGraph.url).toBe(`${DOTCOM_BASE_URL}/docs/manual/indexes/`);
      expect(prefixed.openGraph.url).toBe(`${DOTCOM_BASE_URL}/docs/manual/index-management/`);
    });

    it('lowercases a mixed-case slug', () => {
      const result = getMetadata({ fileId: 'changeStreams.txt' });

      expect(result.openGraph.url).toBe(`${DOTCOM_BASE_URL}/docs/manual/changestreams/`);
    });

    it('uses the writer-provided canonical for an EOL version', () => {
      const eolCanonical = `${DOTCOM_BASE_URL}/docs/manual/data-modeling/`;
      const result = getMetadata({
        fileId: 'data-modeling.txt',
        branch: 'v8.0',
        metadata: { eol: true, canonical: eolCanonical },
      });

      expect(result.openGraph.url).toBe(eolCanonical);
      expect(result.openGraph.url).toBe(result.alternates.canonical);
    });
  });

  describe('fields that stay the same', () => {
    it('keeps metadataBase on the production origin, separate from openGraph.url', () => {
      const result = getMetadata({ fileId: 'data-modeling.txt', branch: 'v8.0' });

      expect(result.metadataBase.toString()).toBe(new URL(DOTCOM_BASE_URL).toString());
      expect(result.openGraph.url).not.toBe(result.metadataBase.toString());
    });

    it('leaves the other Open Graph fields unchanged', () => {
      const result = getMetadata({
        fileId: 'data-modeling.txt',
        frontmatter: { description: 'Model your data.' },
      });

      expect(result.openGraph.title).toBe(result.title);
      expect(result.openGraph.description).toBe('Model your data.');
      expect(result.openGraph.type).toBe('website');
      expect(result.openGraph.images).toEqual([
        expect.objectContaining({ url: 'https://www.mongodb.com/docs/assets/meta_generic.png' }),
      ]);
    });
  });

  describe('robots', () => {
    const originalAllowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING;
    const originalBuildLocale = process.env.NEXT_PUBLIC_DOCS_LOCALE;

    afterEach(() => {
      if (originalAllowIndexing === undefined) delete process.env.NEXT_PUBLIC_ALLOW_INDEXING;
      else process.env.NEXT_PUBLIC_ALLOW_INDEXING = originalAllowIndexing;
      if (originalBuildLocale === undefined) delete process.env.NEXT_PUBLIC_DOCS_LOCALE;
      else process.env.NEXT_PUBLIC_DOCS_LOCALE = originalBuildLocale;
    });

    it('emits noindex for a locale build even in a production environment', () => {
      // A locale site is cloned from English, so it inherits DB_ENV, and it shares
      // netlify.toml's production context with every other site. The locale is the
      // only signal that can keep it out of the index.
      process.env.NEXT_PUBLIC_ALLOW_INDEXING = 'true';
      process.env.NEXT_PUBLIC_DOCS_LOCALE = 'es';

      const result = getMetadata({ fileId: 'data-modeling.txt' });

      expect(result.robots.index).toBe(false);
    });

    it('indexes a production English build with no locale configured', () => {
      process.env.NEXT_PUBLIC_ALLOW_INDEXING = 'true';
      delete process.env.NEXT_PUBLIC_DOCS_LOCALE;

      const result = getMetadata({ fileId: 'data-modeling.txt' });

      expect(result.robots.index).toBe(true);
    });

    it('indexes a production build that explicitly configures en-us', () => {
      process.env.NEXT_PUBLIC_ALLOW_INDEXING = 'true';
      process.env.NEXT_PUBLIC_DOCS_LOCALE = 'en-us';

      const result = getMetadata({ fileId: 'data-modeling.txt' });

      expect(result.robots.index).toBe(true);
    });

    it('emits noindex for a locale value the app does not recognise', () => {
      // next.config.mjs rejects an unsupported DOCS_LOCALE before the app runs, so
      // this should not be reachable in a real build. The gate reads the raw value
      // rather than getBuildLocale(), which falls back to en-us, so that a locale
      // next.config accepts but locale.ts does not still fails closed.
      process.env.NEXT_PUBLIC_ALLOW_INDEXING = 'true';
      process.env.NEXT_PUBLIC_DOCS_LOCALE = 'fr';

      const result = getMetadata({ fileId: 'data-modeling.txt' });

      expect(result.robots.index).toBe(false);
    });
  });
});
