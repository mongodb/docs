import { afterAll, describe, expect, it } from 'vitest';
import { mkdir, mkdtemp, rm, writeFile } from 'fs/promises';
import { tmpdir } from 'os';
import { dirname, join } from 'path';
import { mdxToMarkdown } from '../src/parse.js';

const refRole = { type: 'mdxJsxTextElement', name: 'RefRole', attributes: [
  { type: 'mdxJsxAttribute', name: 'type', value: 'binary' },
  { type: 'mdxJsxAttribute', name: 'name', value: 'bin.mongod' },
], children: [{ type: 'inlineCode', value: 'mongod' }] };

const SUBSTITUTIONS = {
  oldversion: '8.3',
  jira: { text: 'Jira', url: 'https://jira.mongodb.org' },
  mongod: { text: 'mongod', nodes: [refRole] },
  vendor: 'Microsoft Entra ID',
  idp: {
    text: 'Microsoft Entra ID',
    nodes: [
      { type: 'mdxJsxTextElement', name: 'Reference', attributes: [
        { type: 'mdxJsxAttribute', name: 'refKey', value: 'vendor' },
        { type: 'mdxJsxAttribute', name: 'type', value: 'substitution' },
      ], children: [] },
    ],
  },
  loop: {
    text: 'loop',
    nodes: [
      { type: 'mdxJsxTextElement', name: 'Reference', attributes: [
        { type: 'mdxJsxAttribute', name: 'refKey', value: 'loop' },
        { type: 'mdxJsxAttribute', name: 'type', value: 'substitution' },
      ], children: [] },
    ],
  },
  service: { text: 'Atlas', nodes: [{ type: 'paragraph', children: [{ type: 'text', value: 'Atlas' }] }] },
  menu: {
    text: 'Organizations menu',
    nodes: [
      { type: 'mdxJsxTextElement', name: 'Guilabel', attributes: [], children: [{ type: 'text', value: 'Organizations' }] },
      { type: 'text', value: ' menu' },
    ],
  },
};

const REFERENCES_TS = `export const substitutions = {
  "oldversion": "8.3",
  "jira": { "text": "Jira", "url": "https://jira.mongodb.org" },
  "mongod": { "text": "mongod", "nodes": [] },
  "vendor": "Microsoft Entra ID",
  "idp": { "text": "Microsoft Entra ID", "nodes": [] },
  "loop": { "text": "loop", "nodes": [] },
  "service": { "text": "Atlas", "nodes": [] },
  "menu": { "text": "Organizations menu", "nodes": [] },
} as const;
`;

const REFERENCES_JSON = JSON.stringify({
  substitutions: SUBSTITUTIONS,
  refs: { 'bin.mongod': 'reference/program/mongod' },
});

const tempDirs: string[] = [];

async function convert(
  page: string,
  includes: Record<string, string> = {},
  options: { baseUrl?: string } = {},
): Promise<string> {
  const root = await mkdtemp(join(tmpdir(), 'mdx-to-md-fallback-'));
  tempDirs.push(root);
  const files: Record<string, string> = {
    '_references.ts': REFERENCES_TS,
    '_references.json': REFERENCES_JSON,
  };
  for (const [name, body] of Object.entries(includes)) files[`_includes/${name}.mdx`] = body;

  for (const [rel, content] of Object.entries(files)) {
    const full = join(root, 'proj/ver', rel);
    await mkdir(dirname(full), { recursive: true });
    await writeFile(full, content);
  }
  return (await mdxToMarkdown(page, root, 'proj/ver/page.mdx', options)).trim();
}

afterAll(async () => {
  await Promise.all(tempDirs.map((dir) => rm(dir, { recursive: true, force: true })));
});

const ref = (key: string) => `<Reference refKey="${key}" type="substitution" />`;

describe('a bare substitution reference with a global value that carries markup', () => {
  it('keeps the link of a link-valued substitution', async () => {
    const result = await convert(`Open ${ref('jira')} now.\n`);

    expect(result).toBe('Open [Jira](https://jira.mongodb.org) now.');
  });

  it('keeps the link of a typed role, resolved through the refs map', async () => {
    const result = await convert(`Run ${ref('mongod')} now.\n`);

    expect(result).toBe('Run [`mongod`](reference/program/mongod) now.');
  });

  it('makes a relative link absolute with the base URL', async () => {
    const result = await convert(`Run ${ref('mongod')} now.\n`, {}, { baseUrl: 'https://www.mongodb.com/docs/proj/ver' });

    expect(result).toBe('Run [`mongod`](https://www.mongodb.com/docs/proj/ver/reference/program/mongod) now.');
  });

  it('keeps a value Snooty wrapped in a paragraph inside the sentence', async () => {
    const result = await convert(`In ${ref('service')}, go to the page.\n`);

    expect(result).toBe('In Atlas, go to the page.');
  });

  it('keeps the text of inline markup', async () => {
    const result = await convert(`From the ${ref('menu')} in the navigation bar.\n`);

    expect(result).toBe('From the Organizations menu in the navigation bar.');
  });

  it('resolves several markup values that share a parent', async () => {
    const result = await convert(`${ref('mongod')} and ${ref('jira')} and ${ref('menu')}.\n`);

    expect(result).toBe('[`mongod`](reference/program/mongod) and [Jira](https://jira.mongodb.org) and Organizations menu.');
  });

  it('resolves a reference that sits inside a markup value', async () => {
    const result = await convert(`Configure ${ref('idp')} as a provider.\n`);

    expect(result).toBe('Configure Microsoft Entra ID as a provider.');
  });

  it('stops expanding a value that refers back to itself', async () => {
    const result = await convert(`Use ${ref('loop')} here.\n`);

    expect(result).toMatch(/^Use .* here\.$/);
  });

  it('resolves inside a shared include', async () => {
    const result = await convert('<Include src="/_includes/shared" />\n', {
      shared: `Run ${ref('mongod')} now.\n`,
    });

    expect(result).toBe('Run [`mongod`](reference/program/mongod) now.');
  });
});

describe('precedence is unchanged', () => {
  it('a value baked into the reference wins', async () => {
    const result = await convert('Open <Reference refKey="jira" type="substitution" value="Tracker" /> now.\n');

    expect(result).toBe('Open [Tracker](https://jira.mongodb.org) now.');
  });

  it('a page <Define> wins', async () => {
    const result = await convert(`<Define name="mongod">the server</Define>\n\nRun ${ref('mongod')} now.\n`);

    expect(result).toBe('Run the server now.');
  });

  it('a plain text substitution still resolves', async () => {
    const result = await convert(`Version ${ref('oldversion')}.\n`);

    expect(result).toBe('Version 8.3.');
  });
});
