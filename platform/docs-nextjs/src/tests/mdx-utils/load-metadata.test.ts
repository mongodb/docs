import { getBlobString } from '@/mdx-utils/blob-read';
import { getSiteMetadata } from '@/mdx-utils/load-metadata';

jest.mock('@/mdx-utils/blob-read', () => ({
  getBlobString: jest.fn(),
  BlobStoreReadError: class BlobStoreReadError extends Error {},
}));

// IMPORTANT: order is longest-prefix-first, mirroring how prefix-map.json is sorted in
// production. Tests that verify prefix precedence (e.g. atlas/app-services over atlas)
// depend on this ordering — do not reorder.
jest.mock('@/generated/prefix-map.json', () => [
  'languages/java/reactive-streams-driver/upcoming',
  'atlas/app-services',
  'atlas',
  'manual',
]);

const mockGetBlobString = getBlobString as jest.MockedFunction<typeof getBlobString>;

const FAKE_METADATA = { project: 'test', url: 'https://example.com' };

describe('getSiteMetadata', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns projectPath for a matching single-segment prefix', async () => {
    mockGetBlobString.mockResolvedValue(JSON.stringify(FAKE_METADATA));

    const { projectPath } = await getSiteMetadata(['atlas', 'page']);

    expect(projectPath).toBe('atlas');
    expect(mockGetBlobString).toHaveBeenCalledWith('reference/atlas/_site.json');
  });

  it('matches the longest prefix first for multi-segment paths', async () => {
    mockGetBlobString.mockResolvedValue(JSON.stringify(FAKE_METADATA));

    const { projectPath } = await getSiteMetadata([
      'languages',
      'java',
      'reactive-streams-driver',
      'upcoming',
      'get-started',
    ]);

    expect(projectPath).toBe('languages/java/reactive-streams-driver/upcoming');
    expect(mockGetBlobString).toHaveBeenCalledWith(
      'reference/languages/java/reactive-streams-driver/upcoming/_site.json',
    );
  });

  it('throws when no prefix matches and the landing fallback also returns nothing', async () => {
    mockGetBlobString.mockResolvedValue(null);

    await expect(getSiteMetadata(['__test_landing_fallback__'])).rejects.toThrow('[getSiteMetadata]');
  });

  it('parses and returns siteMetadata from the JSON blob', async () => {
    mockGetBlobString.mockResolvedValue(JSON.stringify(FAKE_METADATA));

    const { siteMetadata } = await getSiteMetadata(['atlas', 'page']);

    expect(siteMetadata).toEqual(FAKE_METADATA);
  });

  it('prefers atlas/app-services over atlas when both prefixes are present', async () => {
    mockGetBlobString.mockResolvedValue(JSON.stringify(FAKE_METADATA));

    const { projectPath } = await getSiteMetadata(['atlas', 'app-services', 'users']);

    expect(projectPath).toBe('atlas/app-services');
    expect(mockGetBlobString).toHaveBeenCalledWith('reference/atlas/app-services/_site.json');
  });

  it('falls back to landing for the docs homepage (params.path ?? ["index"])', async () => {
    mockGetBlobString.mockResolvedValue(JSON.stringify(FAKE_METADATA));

    const { projectPath } = await getSiteMetadata(['index']);

    expect(projectPath).toBe('');
    expect(mockGetBlobString).toHaveBeenCalledWith('reference/_site.json');
  });

  it('falls back to landing for /docs/get-started (not a known prefix)', async () => {
    mockGetBlobString.mockResolvedValue(JSON.stringify(FAKE_METADATA));

    const { projectPath } = await getSiteMetadata(['get-started', 'overview']);

    expect(projectPath).toBe('');
    expect(mockGetBlobString).toHaveBeenCalledWith('reference/_site.json');
  });

  it('throws with "invalid JSON" message when the blob contains malformed JSON', async () => {
    mockGetBlobString.mockResolvedValue('not valid json');

    await expect(getSiteMetadata(['atlas', 'page'])).rejects.toThrow('blob not found or contains invalid JSON');
  });

  it('rethrows a non-SyntaxError from getBlobString as an unexpected error', async () => {
    mockGetBlobString.mockRejectedValue(new Error('connection timeout'));

    await expect(getSiteMetadata(['atlas', 'page'])).rejects.toThrow('Unexpected error reading blob');
  });

  it('throws for an empty urlPath', async () => {
    await expect(getSiteMetadata([])).rejects.toThrow('urlPath must have at least one segment');
  });
});
