import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import {
  buildMdxRelativePathIndex,
  lookupMdxRelativePath,
} from '@/mdx-utils/resolve-mdx-relative-path';

describe('mdx relative path index', () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'mdx-path-index-'));
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  it('maps a lowercase lookup to the mixed-case on-disk path', async () => {
    const mixed = path.join(tmpDir, 'manual', 'changeStreams.mdx');
    const dotted = path.join(
      tmpDir,
      'manual',
      'reference',
      'method',
      'db.collection.findOneAndUpdate.mdx',
    );
    await fs.mkdir(path.dirname(mixed), { recursive: true });
    await fs.mkdir(path.dirname(dotted), { recursive: true });
    await fs.writeFile(mixed, '# page\n', 'utf-8');
    await fs.writeFile(dotted, '# page\n', 'utf-8');

    const index = await buildMdxRelativePathIndex(tmpDir);
    expect(lookupMdxRelativePath(index, 'manual/changestreams.mdx')).toBe(
      'manual/changeStreams.mdx',
    );
    expect(
      lookupMdxRelativePath(
        index,
        'manual/reference/method/db.collection.findoneandupdate.mdx',
      ),
    ).toBe('manual/reference/method/db.collection.findOneAndUpdate.mdx');
  });
});
