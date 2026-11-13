import { afterAll, describe, expect, it } from 'vitest';
import { mkdir, mkdtemp, rm, writeFile } from 'fs/promises';
import { tmpdir } from 'os';
import { dirname, join } from 'path';
import { mdxToMarkdown } from '../src/parse.js';

const GLOBAL_REFERENCES = `export const substitutions = {
  "oldfcv": "8.3",
  "analyzer-name": "global-analyzer",
} as const;
`;

const tempDirs: string[] = [];

async function makeProject(includes: Record<string, string> = {}): Promise<string> {
  const root = await mkdtemp(join(tmpdir(), 'mdx-to-md-define-'));
  tempDirs.push(root);
  const files: Record<string, string> = {
    '_references.ts': GLOBAL_REFERENCES,
    '_references.json': JSON.stringify({ substitutions: {}, refs: {} }),
  };
  for (const [name, body] of Object.entries(includes)) files[`_includes/${name}.mdx`] = body;

  for (const [rel, content] of Object.entries(files)) {
    const full = join(root, 'proj/ver', rel);
    await mkdir(dirname(full), { recursive: true });
    await writeFile(full, content);
  }
  return root;
}

async function convert(page: string, includes: Record<string, string> = {}): Promise<string> {
  const contentMdxDir = await makeProject(includes);
  return (await mdxToMarkdown(page, contentMdxDir, 'proj/ver/page.mdx')).trim();
}

const sub = (key: string) => `<Reference refKey="${key}" type="substitution" />`;

afterAll(async () => {
  await Promise.all(tempDirs.map((dir) => rm(dir, { recursive: true, force: true })));
});

describe('page-scoped <Define>', () => {
  it("renders the page's own definition instead of the global substitution", async () => {
    const result = await convert(`<Define name="oldfcv">\`"7.0"\`</Define>\n\nSet to ${sub('oldfcv')}.\n`);

    expect(result).toBe('Set to `"7.0"`.');
  });

  it('keeps an inline definition on the same line as the sentence', async () => {
    const result = await convert(`<Define name="oldfcv">\`"7.0"\`</Define>\n\nSet to ${sub('oldfcv')} now.\n`);

    expect(result).toBe('Set to `"7.0"` now.');
  });

  it('resolves definitions on a page that has no content directory', async () => {
    const result = (await mdxToMarkdown(`<Define name="v">local</Define>\n\nValue ${sub('v')}.\n`)).trim();

    expect(result).toBe('Value local.');
  });

  it('never prints the body of a definition on its own', async () => {
    const result = await convert('<Define name="oldfcv">7.0</Define>\n\nText.\n');

    expect(result).toBe('Text.');
  });

  it('falls back to the global substitution when no definition applies', async () => {
    const result = await convert(`<Define name="other">x</Define>\n\nSee ${sub('analyzer-name')}.\n`);

    expect(result).toBe('See global-analyzer.');
  });

  it('resolves a reference on the page from a definition in a sibling include', async () => {
    const result = await convert(
      `<Include src="/_includes/replacements" />\n\nSet to ${sub('oldfcv')}.\n`,
      { replacements: '<Define name="oldfcv">`"7.0"`</Define>\n' },
    );

    expect(result).toBe('Set to `"7.0"`.');
  });

  it('resolves an alias used inside another definition', async () => {
    const result = await convert(
      `<Define name="outer">see ${sub('inner')} here</Define>\n\n<Define name="inner">inner-value</Define>\n\nText: ${sub('outer')}.\n`,
    );

    expect(result).toBe('Text: see inner-value here.');
  });

  it('stops at a circular definition instead of recursing forever', async () => {
    const result = await convert(
      `<Define name="a">a then ${sub('b')}</Define>\n\n<Define name="b">b then ${sub('a')}</Define>\n\nText: ${sub('a')}.\n`,
    );

    expect(result).toContain('a then b then');
  });
});

describe('page-scoped <Define> inside includes', () => {
  it("resolves a reference inside a shared include from the including page's definition", async () => {
    const result = await convert(
      `<Define name="oldfcv">\`"7.0"\`</Define>\n\n<Include src="/_includes/shared" />\n`,
      { shared: `Set to ${sub('oldfcv')}.\n` },
    );

    expect(result).toBe('Set to `"7.0"`.');
  });

  it('gives each page its own value from the same shared include', async () => {
    const includes = { shared: `Set to ${sub('oldfcv')}.\n` };

    const page80 = await convert('<Define name="oldfcv">`"7.0"`</Define>\n\n<Include src="/_includes/shared" />\n', includes);
    const page82 = await convert('<Define name="oldfcv">`"8.0"`</Define>\n\n<Include src="/_includes/shared" />\n', includes);

    expect(page80).toBe('Set to `"7.0"`.');
    expect(page82).toBe('Set to `"8.0"`.');
  });

  it('passes the page definition down through nested includes', async () => {
    const result = await convert(
      '<Define name="oldfcv">`"7.0"`</Define>\n\n<Include src="/_includes/outer" />\n',
      {
        outer: 'Outer.\n\n<Include src="/_includes/inner" />\n',
        inner: `Inner ${sub('oldfcv')}.\n`,
      },
    );

    expect(result).toContain('Inner `"7.0"`.');
  });

  it("lets an include's own definition win for its own references", async () => {
    const result = await convert(
      `<Define name="analyzer-name">page</Define>\n\n<Include src="/_includes/with-own" />\n\nBody ${sub('analyzer-name')}.\n`,
      { 'with-own': `<Define name="analyzer-name">own</Define>\n\nInside ${sub('analyzer-name')}.\n` },
    );

    expect(result).toContain('Inside own.');
    expect(result).toContain('Body own.');
  });

  it("keeps each include's own value when several includes redefine the same alias", async () => {
    const result = await convert('<Include src="/_includes/a_ui" />\n\n<Include src="/_includes/b_ui" />\n', {
      a_ui: `<Define name="analyzer-name">alpha</Define>\n\nA uses ${sub('analyzer-name')}.\n`,
      b_ui: `<Define name="analyzer-name">beta</Define>\n\nB uses ${sub('analyzer-name')}.\n`,
    });

    expect(result).toContain('A uses alpha.');
    expect(result).toContain('B uses beta.');
  });

  it("passes an include's own definition down to the includes nested inside it", async () => {
    const result = await convert('<Include src="/_includes/outer" />\n', {
      outer: '<Define name="analyzer-name">outer-value</Define>\n\n<Include src="/_includes/inner" />\n',
      inner: `Inner ${sub('analyzer-name')}.\n`,
    });

    expect(result).toContain('Inner outer-value.');
  });

  it('keeps an explicit <Replacement> slot ahead of the page definition', async () => {
    const result = await convert(
      '<Define name="oldfcv">page</Define>\n\n<Include src="/_includes/shared"><Replacement name="oldfcv">slot</Replacement></Include>\n',
      { shared: `Value: ${sub('oldfcv')}.\n` },
    );

    expect(result).toBe('Value: slot.');
  });

  it('leaves no definition text behind from an include', async () => {
    const result = await convert('<Include src="/_includes/defs" />\n', {
      defs: '<Define name="oldfcv">7.0</Define>\n\nText.\n',
    });

    expect(result).toBe('Text.');
  });
});
