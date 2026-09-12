import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { getContentString } from '@/mdx-utils/get-content-string';
import { fetchMdxString } from '@/mdx-utils/fetch-mdx-string';

let mockContentDir = '';

// Read through a getter: the factory is hoisted above the tmpdir creation, so
// the directory is only known by the time a test calls fetchMdxString.
jest.mock('@/mdx-utils/content-constants', () => ({
  get CONTENT_MDX_DIR() {
    return mockContentDir;
  },
}));

// Case-sensitive on purpose. macOS is case-insensitive by default, so reading
// through the real fs would resolve a mixed-case file from a lowercase path
// even without resolveMdxRelativePath and the test would pass vacuously.
jest.mock('@/mdx-utils/get-content-string', () => ({
  getContentString: jest.fn(),
}));

const mockGetContentString = getContentString as jest.MockedFunction<typeof getContentString>;

describe('fetchMdxString', () => {
  beforeEach(async () => {
    mockContentDir = await fs.mkdtemp(path.join(os.tmpdir(), 'fetch-mdx-string-'));
    mockGetContentString.mockReset();
  });

  afterEach(async () => {
    await fs.rm(mockContentDir, { recursive: true, force: true });
  });

  /** Create the file so the path index sees it, and serve it by exact name. */
  async function publishMdx(relativePath: string, contents: string): Promise<void> {
    const full = path.join(mockContentDir, relativePath);
    await fs.mkdir(path.dirname(full), { recursive: true });
    await fs.writeFile(full, contents, 'utf-8');
    mockGetContentString.mockImplementation(async (requested: string) =>
      requested === relativePath ? contents : null,
    );
  }

  it('resolves a lowercase route to a mixed-case file on disk', async () => {
    await publishMdx('manual/changeStreams.mdx', '# change streams\n');

    await expect(fetchMdxString('manual/changestreams')).resolves.toBe('# change streams\n');
  });

  it('resolves a lowercase route to a mixed-case index file on disk', async () => {
    await publishMdx('manual/changeStreams/index.mdx', '# change streams\n');

    await expect(fetchMdxString('manual/changestreams')).resolves.toBe('# change streams\n');
  });

  it('returns null when no file matches', async () => {
    mockGetContentString.mockResolvedValue(null);

    await expect(fetchMdxString('manual/missing')).resolves.toBeNull();
  });
});
