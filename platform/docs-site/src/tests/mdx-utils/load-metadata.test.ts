import { getContentString } from '@/mdx-utils/get-content-string';
import { findProjectPathAndSiteJson } from '@/mdx-utils/load-metadata';

jest.mock('@/mdx-utils/get-content-string', () => ({
  getContentString: jest.fn(),
}));

const mockGetContentString = getContentString as jest.MockedFunction<typeof getContentString>;

const FAKE_METADATA = { project: 'test', url: 'https://example.com' };

describe('findProjectPathAndSiteJson', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns projectPath for a matching single-segment prefix', async () => {
    mockGetContentString.mockImplementation(async (path) => {
      if (path === 'atlas/_site.json') return JSON.stringify(FAKE_METADATA);
      return null;
    });

    const { projectPath } = await findProjectPathAndSiteJson(['atlas', 'page']);

    expect(projectPath).toBe('atlas');
    expect(mockGetContentString).toHaveBeenCalledWith('atlas/_site.json');
  });

  it('tries the 2-segment path before the 1-segment path for multi-segment paths', async () => {
    mockGetContentString.mockImplementation(async (path) => {
      if (path === 'languages/java/_site.json') return JSON.stringify(FAKE_METADATA);
      return null;
    });

    const { projectPath } = await findProjectPathAndSiteJson([
      'languages',
      'java',
      'reactive-streams-driver',
      'upcoming',
      'get-started',
    ]);

    expect(projectPath).toBe('languages/java');
    expect(mockGetContentString).toHaveBeenCalledWith('languages/java/_site.json');
  });

  it('throws when no prefix matches and the landing fallback also returns nothing', async () => {
    mockGetContentString.mockResolvedValue(null);

    await expect(findProjectPathAndSiteJson(['__test_landing_fallback__'])).rejects.toThrow('[findProjectPathAndSiteJson]');
  });

  it('parses and returns siteMetadata from the JSON blob', async () => {
    mockGetContentString.mockResolvedValue(JSON.stringify(FAKE_METADATA));

    const { siteMetadata } = await findProjectPathAndSiteJson(['atlas', 'page']);

    expect(siteMetadata).toEqual(FAKE_METADATA);
  });

  it('prefers atlas/app-services over atlas when both prefixes are present', async () => {
    mockGetContentString.mockImplementation(async (path) => {
      if (path === 'atlas/app-services/_site.json') return JSON.stringify(FAKE_METADATA);
      return null;
    });

    const { projectPath } = await findProjectPathAndSiteJson(['atlas', 'app-services', 'users']);

    expect(projectPath).toBe('atlas/app-services');
    expect(mockGetContentString).toHaveBeenCalledWith('atlas/app-services/_site.json');
  });

  it('falls back to landing for the docs homepage (params.path ?? ["index"])', async () => {
    mockGetContentString.mockImplementation(async (path) => {
      if (path === 'index/_site.json') return JSON.stringify(FAKE_METADATA);
      return null;
    });

    const { projectPath } = await findProjectPathAndSiteJson(['index']);

    expect(projectPath).toBe('index');
    expect(mockGetContentString).toHaveBeenCalledWith('index/_site.json');
  });

  it('falls back to 1-segment path for /docs/get-started when 2-segment _site.json is absent', async () => {
    mockGetContentString.mockImplementation(async (path) => {
      if (path === 'get-started/_site.json') return JSON.stringify(FAKE_METADATA);
      return null;
    });

    const { projectPath } = await findProjectPathAndSiteJson(['get-started', 'overview']);

    expect(projectPath).toBe('get-started');
    expect(mockGetContentString).toHaveBeenCalledWith('get-started/_site.json');
  });

  it('throws with "invalid JSON" message when the blob contains malformed JSON', async () => {
    mockGetContentString.mockResolvedValue('not valid json');

    await expect(findProjectPathAndSiteJson(['atlas', 'page'])).rejects.toThrow('blob not found or contains invalid JSON');
  });

  it('throws when getContentString throws for all candidate paths', async () => {
    mockGetContentString.mockRejectedValue(new Error('connection timeout'));

    await expect(findProjectPathAndSiteJson(['atlas', 'page'])).rejects.toThrow('[findProjectPathAndSiteJson]');
  });

  it('throws for an empty urlPath', async () => {
    await expect(findProjectPathAndSiteJson([])).rejects.toThrow('urlPath must have at least one segment');
  });
});
