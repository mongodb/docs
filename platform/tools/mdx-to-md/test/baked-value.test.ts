import { afterAll, describe, expect, it } from 'vitest';
import { mkdir, mkdtemp, rm, writeFile } from 'fs/promises';
import { tmpdir } from 'os';
import { dirname, join } from 'path';
import { mdxToMarkdown } from '../src/parse.js';

const GLOBAL_REFERENCES_TS = `export const substitutions = {
  "oldversion": "8.3",
  "vercel": "Vercel",
} as const;
`;

const GLOBAL_REFERENCES_JSON = JSON.stringify({
  substitutions: {
    oldversion: '8.3',
    vercel: { text: 'Vercel', url: 'https://vercel.com/docs' },
  },
  refs: {},
});

const tempDirs: string[] = [];

async function convert(page: string, includes: Record<string, string> = {}): Promise<string> {
  const root = await mkdtemp(join(tmpdir(), 'mdx-to-md-baked-'));
  tempDirs.push(root);
  const files: Record<string, string> = {
    '_references.ts': GLOBAL_REFERENCES_TS,
    '_references.json': GLOBAL_REFERENCES_JSON,
  };
  for (const [name, body] of Object.entries(includes)) files[`_includes/${name}.mdx`] = body;

  for (const [rel, content] of Object.entries(files)) {
    const full = join(root, 'proj/ver', rel);
    await mkdir(dirname(full), { recursive: true });
    await writeFile(full, content);
  }
  return (await mdxToMarkdown(page, root, 'proj/ver/page.mdx')).trim();
}

afterAll(async () => {
  await Promise.all(tempDirs.map((dir) => rm(dir, { recursive: true, force: true })));
});

describe('value baked into a substitution reference', () => {
  it('wins over the global substitution', async () => {
    const result = await convert('The <Reference refKey="oldversion" type="substitution" value="7.0" /> release.\n');

    expect(result).toBe('The 7.0 release.');
  });

  it('wins over a page <Define>', async () => {
    const result = await convert(
      '<Define name="oldversion">defined</Define>\n\nThe <Reference refKey="oldversion" type="substitution" value="7.0" /> release.\n',
    );

    expect(result).toBe('The 7.0 release.');
  });

  it("wins over an include's own <Define>", async () => {
    const result = await convert('<Include src="/_includes/shared" />\n', {
      shared:
        '<Define name="oldversion">defined</Define>\n\nThe <Reference refKey="oldversion" type="substitution" value="7.0" /> release.\n',
    });

    expect(result).toBe('The 7.0 release.');
  });

  it('applies inside a shared include', async () => {
    const result = await convert('<Include src="/_includes/shared" />\n', {
      shared: 'The <Reference refKey="oldversion" type="substitution" value="7.0" /> release.\n',
    });

    expect(result).toBe('The 7.0 release.');
  });

  it('keeps the link when the global substitution is a link', async () => {
    const result = await convert('Deploy on <Reference refKey="vercel" type="substitution" value="Vercel Pro" />.\n');

    expect(result).toBe('Deploy on [Vercel Pro](https://vercel.com/docs).');
  });

  it('still uses the global substitution when nothing is baked in', async () => {
    const result = await convert('The <Reference refKey="oldversion" type="substitution" /> release.\n');

    expect(result).toBe('The 8.3 release.');
  });
});
