import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { getPageSlugsFromSiteDir } from '@/utils/scan-mdx-files';

describe('getPageSlugsFromSiteDir', () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'scan-mdx-sitemap-'));
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  const writeMdx = async (relativePath: string) => {
    const full = path.join(tmpDir, relativePath);
    await fs.mkdir(path.dirname(full), { recursive: true });
    await fs.writeFile(full, '# page\n', 'utf-8');
  };

  it('returns slugs relative to the site dir, collapsing index.mdx', async () => {
    await writeMdx('index.mdx');
    await writeMdx('get-started.mdx');
    await writeMdx('index/analyzers/keyword.mdx');
    await writeMdx('tutorial/index.mdx');

    const slugs = (await getPageSlugsFromSiteDir(tmpDir)).sort();
    expect(slugs).toEqual(['', 'get-started', 'index/analyzers/keyword', 'tutorial']);
  });

  it('skips include-only directories', async () => {
    await writeMdx('real.mdx');
    await writeMdx('_includes/snippet.mdx');
    await writeMdx('includes/shared.mdx');
    await writeMdx('sharedinclude/fragment.mdx');

    expect(await getPageSlugsFromSiteDir(tmpDir)).toEqual(['real']);
  });
});
