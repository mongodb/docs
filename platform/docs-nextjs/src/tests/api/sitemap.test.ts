import { GET } from '@/app/api/sitemap/[...path]/route';
import { getAllDocsetsWithVersionsCached } from '@/services/db/docsets';
import type { Docset } from '@/types/data';

jest.mock('@/services/db/docsets', () => ({
  getAllDocsetsWithVersionsCached: jest.fn().mockResolvedValue([]),
}));

// The handler ignores the request object (_req), so a plain stub suffices.
const stubRequest = {} as Request;

describe('GET /api/sitemap/[...path]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('sitemap-index-full.xml', () => {
    const mockGetAllDocsets = getAllDocsetsWithVersionsCached as jest.MockedFunction<
      typeof getAllDocsetsWithVersionsCached
    >;

    it('returns a cross-project sitemap index from docsets, applying hapley filters', async () => {
      mockGetAllDocsets.mockResolvedValue([
        {
          project: 'atlas',
          displayName: 'Atlas',
          internalOnly: false,
          prefix: 'docs/atlas',
          versions: [
            { versionName: 'current', active: true, noIndexing: false, stable: true, versionSelectorLabel: 'Current', offlineUrl: '' },
            { versionName: 'old', active: false, noIndexing: false, stable: false, versionSelectorLabel: 'Old', offlineUrl: '' }, // inactive — excluded
            { versionName: 'upcoming', active: true, noIndexing: false, stable: false, versionSelectorLabel: 'Upcoming', offlineUrl: '' }, // upcoming — excluded
            { versionName: 'beta', active: true, noIndexing: false, stable: false, versionSelectorLabel: 'Beta', offlineUrl: '' }, // beta — excluded
            { versionName: 'eol', active: true, eolType: 'link', noIndexing: false, stable: false, versionSelectorLabel: 'EOL', offlineUrl: '' }, // eol — excluded
          ],
        },
        {
          project: 'internal',
          displayName: 'Internal',
          internalOnly: true, // excluded
          prefix: 'docs/internal',
          versions: [],
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

    it('omits the version segment for a single-version docset', async () => {
      mockGetAllDocsets.mockResolvedValue([
        {
          project: 'cloud-docs',
          displayName: 'MongoDB Atlas',
          internalOnly: false,
          prefix: 'docs/atlas',
          versions: [
            { versionName: 'main', active: true, noIndexing: false, stable: true, versionSelectorLabel: 'main', offlineUrl: '' },
          ],
        },
      ] as Docset[]);

      const res = await GET(stubRequest, {
        params: { path: ['sitemap-index-full.xml'] },
      });

      const body = await res.text();
      expect(body).toContain('<loc>https://www.mongodb.com/docs/atlas/sitemap-0.xml</loc>');
      expect(body).not.toContain('/main/');
    });
  });

  describe('invalid filename', () => {
    it('returns 404 for a per-project sitemap, now served by the product sites', async () => {
      const res = await GET(stubRequest, {
        params: { path: ['atlas', 'sitemap-0.xml'] },
      });
      expect(res.status).toBe(404);
    });

    it('returns 404 for an unrecognized sitemap filename', async () => {
      const res = await GET(stubRequest, {
        params: { path: ['atlas', 'sitemap-01asdf.xml'] },
      });
      expect(res.status).toBe(404);
    });
  });
});
