import { DOTCOM_BASE_URL } from '@/constants';
import type { MDXFrontmatter } from '@/types/ast';
import type { Docset } from '@/types/data';
import { getPageMetadata } from '@/utils/seo';
import { createMockMetadata } from './mock-snooty-metadata';

const makeDocset = (urlSlugByBranch: Record<string, string>, prefix = 'docs'): Docset =>
  ({
    project: 'manual',
    prefix: { dotcomprd: prefix, dotcomstg: prefix, prd: prefix, stg: prefix },
    branches: Object.entries(urlSlugByBranch).map(([gitBranchName, urlSlug]) => ({
      gitBranchName,
      urlSlug,
      active: true,
      noIndexing: false,
    })),
  } as unknown as Docset);

const manualDocset = makeDocset({ master: 'manual', 'v8.0': 'v8.0' });

const getMetadata = ({
  fileId,
  frontmatter = {},
  branch = 'master',
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
      const result = getMetadata({ fileId: 'index.txt', docset: makeDocset({ master: '' }) });

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
});
