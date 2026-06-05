import { GET } from '@/app/api/sitemap/[...path]/route';
import { getSiteMetadata } from '@/mdx-utils/load-metadata';
import { getAllDocsetsWithVersionsCached } from '@/services/db/docsets';
import type { Docset } from '@/types/data';
import { createMockMetadata } from '../utils/mock-snooty-metadata';

jest.mock('@/mdx-utils/load-metadata', () => ({
  getSiteMetadata: jest.fn(),
}));

jest.mock('@/services/db/docsets', () => ({
  getAllDocsetsWithVersionsCached: jest.fn().mockResolvedValue([]),
}));

const mockFindOne = jest.fn();
jest.mock('@/services/db/client', () => ({
  getClient: jest.fn(() => ({
    db: jest.fn(() => ({
      collection: jest.fn(() => ({ findOne: mockFindOne })),
    })),
  })),
  getPoolDbName: jest.fn(() => 'pool_test'),
}));

jest.mock('@/utils/env-config', () => ({
  default: { DB_ENV: 'dev' },
}));

const mockGetSiteMetadata = getSiteMetadata as jest.MockedFunction<typeof getSiteMetadata>;

// The handler ignores the request object (_req), so a plain stub suffices.
const stubRequest = {} as Request;

function mockRepo(noIndexing = false) {
  mockFindOne.mockResolvedValue({
    branches: [{ gitBranchName: 'master', noIndexing }],
  });
}

describe('GET /api/sitemap/[...path]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRepo(false);
  });

  describe('sitemap-0.xml', () => {
    it('returns application/xml with 200 and all sitemap namespaces', async () => {
      mockGetSiteMetadata.mockResolvedValue({
        projectPath: 'drivers/node/current',
        siteMetadata: createMockMetadata({ toctreeOrder: ['index'] }),
      });

      const res = await GET(stubRequest, {
        params: { path: ['drivers', 'node', 'current', 'sitemap-0.xml'] },
      });
      const body = await res.text();

      expect(res.status).toBe(200);
      expect(res.headers.get('Content-Type')).toBe('application/xml; charset=utf-8');
      expect(body).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
      expect(body).toContain('xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"');
      expect(body).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"');
      expect(body).toContain('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"');
      expect(body).toContain('xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"');
    });

    it('includes page URLs from toctreeOrder', async () => {
      mockGetSiteMetadata.mockResolvedValue({
        projectPath: 'drivers/node/current',
        siteMetadata: createMockMetadata({
          toctreeOrder: ['index', 'get-started', 'connect/overview'],
        }),
      });

      const res = await GET(stubRequest, {
        params: { path: ['drivers', 'node', 'current', 'sitemap-0.xml'] },
      });
      const body = await res.text();

      expect(body).toContain('<loc>https://www.mongodb.com/docs/drivers/node/current/</loc>');
      expect(body).toContain(
        '<loc>https://www.mongodb.com/docs/drivers/node/current/get-started/</loc>',
      );
      expect(body).toContain(
        '<loc>https://www.mongodb.com/docs/drivers/node/current/connect/overview/</loc>',
      );
    });

    it('includes changefreq and priority for each URL', async () => {
      mockGetSiteMetadata.mockResolvedValue({
        projectPath: 'atlas',
        siteMetadata: createMockMetadata({ toctreeOrder: ['get-started'] }),
      });

      const res = await GET(stubRequest, {
        params: { path: ['atlas', 'sitemap-0.xml'] },
      });
      const body = await res.text();

      expect(body).toContain('<changefreq>daily</changefreq>');
      expect(body).toContain('<priority>0.7</priority>');
    });

    it('normalizes index slug to base URL', async () => {
      mockGetSiteMetadata.mockResolvedValue({
        projectPath: 'atlas',
        siteMetadata: createMockMetadata({ toctreeOrder: ['index'] }),
      });

      const res = await GET(stubRequest, {
        params: { path: ['atlas', 'sitemap-0.xml'] },
      });
      const body = await res.text();

      expect(body).toContain('<loc>https://www.mongodb.com/docs/atlas/</loc>');
      expect(body).not.toContain('/atlas/index/');
    });

    it('deduplicates URLs (e.g. / and index both map to base URL)', async () => {
      mockGetSiteMetadata.mockResolvedValue({
        projectPath: 'atlas',
        siteMetadata: createMockMetadata({ toctreeOrder: ['/', 'index'] }),
      });

      const res = await GET(stubRequest, {
        params: { path: ['atlas', 'sitemap-0.xml'] },
      });
      const body = await res.text();

      const matches = [
        ...body.matchAll(/<loc>https:\/\/www\.mongodb\.com\/docs\/atlas\/<\/loc>/g),
      ];
      expect(matches).toHaveLength(1);
    });
  });

  describe('composable tutorial pages', () => {
    it('appends query-string variants for each selection set', async () => {
      mockGetSiteMetadata.mockResolvedValue({
        projectPath: 'atlas',
        siteMetadata: createMockMetadata({
          toctreeOrder: ['get-started'],
          composablePages: {
            'get-started': [
              { cloud: 'atlas', interface: 'driver' },
              { cloud: 'atlas', interface: 'shell' },
            ],
          },
        }),
      });

      const res = await GET(stubRequest, {
        params: { path: ['atlas', 'sitemap-0.xml'] },
      });
      const body = await res.text();

      expect(body).toContain(
        '<loc>https://www.mongodb.com/docs/atlas/get-started/?cloud=atlas&amp;interface=driver</loc>',
      );
      expect(body).toContain(
        '<loc>https://www.mongodb.com/docs/atlas/get-started/?cloud=atlas&amp;interface=shell</loc>',
      );
    });
  });

  describe('noIndexing', () => {
    it('returns 404 when the branch is marked noIndexing', async () => {
      mockGetSiteMetadata.mockResolvedValue({
        projectPath: 'atlas',
        siteMetadata: createMockMetadata({ project: 'atlas', branch: 'master', toctreeOrder: ['index'] }),
      });
      mockRepo(true);

      const res = await GET(stubRequest, {
        params: { path: ['atlas', 'sitemap-0.xml'] },
      });

      expect(res.status).toBe(404);
    });

    it('serves the sitemap when noIndexing is false', async () => {
      mockGetSiteMetadata.mockResolvedValue({
        projectPath: 'atlas',
        siteMetadata: createMockMetadata({ project: 'atlas', branch: 'master', toctreeOrder: ['index'] }),
      });
      mockRepo(false);

      const res = await GET(stubRequest, {
        params: { path: ['atlas', 'sitemap-0.xml'] },
      });

      expect(res.status).toBe(200);
    });

    it('fails open (serves sitemap) when the DB call throws', async () => {
      mockGetSiteMetadata.mockResolvedValue({
        projectPath: 'atlas',
        siteMetadata: createMockMetadata({ toctreeOrder: ['index'] }),
      });
      mockFindOne.mockRejectedValue(new Error('connection refused'));

      const res = await GET(stubRequest, {
        params: { path: ['atlas', 'sitemap-0.xml'] },
      });

      expect(res.status).toBe(200);
    });
  });

  describe('sitemap-index-full.xml', () => {
    const mockGetAllDocsets = getAllDocsetsWithVersionsCached as jest.MockedFunction<
      typeof getAllDocsetsWithVersionsCached
    >;

    it('returns a cross-project sitemap index from docsets, applying hapley filters', async () => {
      mockGetAllDocsets.mockResolvedValue([
        {
          project: 'atlas',
          internalOnly: false,
          prodDeployable: true,
          prefix: { dotcomprd: 'docs/atlas', dotcomstg: '', prd: '', stg: '' },
          branches: [
            { gitBranchName: 'master', active: true, urlSlug: 'current', noIndexing: false, versionSelectorLabel: 'Current', offlineUrl: '', buildsWithSnooty: true },
            { gitBranchName: 'master', active: false, urlSlug: 'old', noIndexing: false, versionSelectorLabel: 'Old', offlineUrl: '' },     // inactive — excluded
            { gitBranchName: 'master', active: true, urlSlug: 'upcoming', noIndexing: false, versionSelectorLabel: 'Upcoming', offlineUrl: '' }, // upcoming — excluded
            { gitBranchName: 'master', active: true, urlSlug: 'beta', noIndexing: false, versionSelectorLabel: 'Beta', offlineUrl: '' },    // beta — excluded
            { gitBranchName: 'master', active: true, urlSlug: '', eol_type: 'link', noIndexing: false, versionSelectorLabel: 'EOL', offlineUrl: '' }, // eol — excluded
          ],
        },
        {
          project: 'internal',
          internalOnly: true,   // excluded
          prodDeployable: true,
          prefix: { dotcomprd: 'docs/internal', dotcomstg: '', prd: '', stg: '' },
          branches: [],
        },
      ] as Docset[]);

      const res = await GET(stubRequest, {
        params: { path: ['sitemap-index-full.xml'] },
      });

      expect(res.status).toBe(200);
      const body = await res.text();
      expect(body).toContain('<sitemapindex');
      expect(body).toContain('<loc>https://www.mongodb.com/docs/atlas/current/sitemap-0.xml</loc>');
      expect(body).not.toContain('/old/');
      expect(body).not.toContain('/upcoming/');
      expect(body).not.toContain('/beta/');
      expect(body).not.toContain('/internal/');
    });

    it('uses sitemap.xml.gz for non-snooty branches', async () => {
      mockGetAllDocsets.mockResolvedValue([
        {
          project: 'legacy',
          internalOnly: false,
          prodDeployable: true,
          prefix: { dotcomprd: 'docs/legacy', dotcomstg: '', prd: '', stg: '' },
          branches: [
            { gitBranchName: 'master', active: true, urlSlug: 'v1', noIndexing: false, versionSelectorLabel: 'v1', offlineUrl: '', buildsWithSnooty: false },
          ],
        },
      ] as Docset[]);

      const res = await GET(stubRequest, { params: { path: ['sitemap-index-full.xml'] } });
      const body = await res.text();
      expect(body).toContain('sitemap.xml.gz');
    });
  });

  describe('invalid filename', () => {
    it('returns 404 for an unrecognized sitemap filename', async () => {
      const res = await GET(stubRequest, {
        params: { path: ['atlas', 'sitemap-01asdf.xml'] },
      });
      expect(res.status).toBe(404);
    });

    it('returns 404 for a numeric-looking but invalid filename', async () => {
      const res = await GET(stubRequest, {
        params: { path: ['atlas', 'sitemap-0asdf.xml'] },
      });
      expect(res.status).toBe(404);
    });

    it('returns 200 for sitemap-0.xml', async () => {
      mockGetSiteMetadata.mockResolvedValue({
        projectPath: 'atlas',
        siteMetadata: createMockMetadata({ toctreeOrder: ['index'] }),
      });

      const res = await GET(stubRequest, {
        params: { path: ['atlas', 'sitemap-0.xml'] },
      });
      expect(res.status).toBe(200);
    });

    it('returns 404 for sitemap-1.xml', async () => {
      const res = await GET(stubRequest, {
        params: { path: ['atlas', 'sitemap-1.xml'] },
      });
      expect(res.status).toBe(404);
    });

    it('returns 404 for sitemap-index.xml', async () => {
      const res = await GET(stubRequest, {
        params: { path: ['atlas', 'sitemap-index.xml'] },
      });
      expect(res.status).toBe(404);
    });
  });

  it('returns 404 when getSiteMetadata throws', async () => {
    mockGetSiteMetadata.mockRejectedValue(new Error('blob not found'));

    const res = await GET(stubRequest, {
      params: { path: ['unknown', 'sitemap-0.xml'] },
    });

    expect(res.status).toBe(404);
  });
});
