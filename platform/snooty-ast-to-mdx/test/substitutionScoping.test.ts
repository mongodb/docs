import fs from 'node:fs/promises';
import path from 'node:path';
import type { SnootyNode, SubstitutionRefXrefInfo } from '../src/core/convertSnootyAstToMdast/types';
import { convertJsonAstToMdxFiles } from '../src/core/convertJsonAstToMdxFiles/convertJsonAstToMdxFiles';
import {
  buildSubstitutionDefinitionLiteralMap,
  buildSubstitutionRefXrefMap,
} from '../src/core/convertSnootyAstToMdast/convertSnootyAstToMdast';

/**
 * DOCSP-65097: a versioned docset defines the same substitution alias (|oldfcv|, |compatibility|)
 * once per upgrade page. Each page must render its *own* definition, not the docset-wide
 * last-writer-wins value.
 *
 * The converter's job is to emit each definition as a `<Define>` where it is written, and to leave
 * references to those aliases bare, so the renderer resolves them against the page's own scope.
 *
 * The fixtures mimic what Snooty emits: every substitution_reference carries the value Snooty
 * resolved for that page, and shared plain includes are parsed once against the global value.
 */

const ROOT = './test/__snapshots__/scoping';

const files = new Map<string, string>();
jest.spyOn(fs, 'mkdir').mockImplementation(() => Promise.resolve(undefined));
jest.spyOn(fs, 'writeFile').mockImplementation((file, data) => {
  files.set(path.resolve(String(file)), String(data));
  return Promise.resolve();
});
jest.spyOn(fs, 'readFile').mockImplementation((file) => {
  const hit = files.get(path.resolve(String(file)));
  return hit === undefined ? Promise.reject(new Error('ENOENT')) : Promise.resolve(hit);
});

const literal = (value: string): SnootyNode => ({
  type: 'literal',
  children: [{ type: 'text', value }],
});

const refRole = (label: string, title: string): SnootyNode => ({
  type: 'ref_role',
  name: 'ref',
  target: label,
  fileid: [`release-notes/${label.replace('-compatibility', '')}-compatibility`, `std-label-${label}`],
  children: [{ type: 'text', value: title }],
});

const subDef = (name: string, children: SnootyNode[]): SnootyNode => ({
  type: 'substitution_definition',
  name,
  children,
});

const subRef = (name: string, children: SnootyNode[]): SnootyNode => ({
  type: 'substitution_reference',
  name,
  children,
});

const text = (value: string): SnootyNode => ({ type: 'text', value });

interface UpgradeValues {
  fcv: string;
  version: string;
  compatLabel: string;
  compatTitle: string;
}

const GLOBAL: UpgradeValues = {
  fcv: '"8.2"',
  version: '8.2',
  compatLabel: '8.2-compatibility',
  compatTitle: 'Compatibility Changes in MongoDB 8.2',
};

/**
 * An upgrade page: includes its own `*-upgrade-replacements.rst` (which defines the aliases),
 * references them directly, and pulls in a shared plain include that also references them.
 * The shared include body holds `GLOBAL` values because Snooty parses it once for the whole docset.
 */
const upgradePage = (version: string, own: UpgradeValues): SnootyNode => ({
  type: 'root',
  children: [
    {
      type: 'directive',
      name: 'include',
      argument: `/includes/${version}-upgrade-replacements.rst`,
      children: [
        subDef('oldfcv', [literal(own.fcv)]),
        subDef('oldversion', [text(own.version)]),
        subDef('compatibility', [refRole(own.compatLabel, own.compatTitle)]),
      ],
    },
    {
      type: 'paragraph',
      children: [
        text('set to '),
        subRef('oldfcv', [literal(own.fcv)]),
        text(' on '),
        subRef('oldversion', [text(own.version)]),
        text('; see '),
        subRef('compatibility', [refRole(own.compatLabel, own.compatTitle)]),
      ],
    },
    {
      type: 'directive',
      name: 'include',
      argument: '/includes/upgrade-shared.rst',
      children: [
        {
          type: 'paragraph',
          children: [
            subRef('oldfcv', [literal(GLOBAL.fcv)]),
            text('; see '),
            subRef('compatibility', [refRole(GLOBAL.compatLabel, GLOBAL.compatTitle)]),
          ],
        },
      ],
    },
  ],
});

const PAGE_80 = upgradePage('8.0', {
  fcv: '"7.0"',
  version: '7.0',
  compatLabel: '8.0-compatibility',
  compatTitle: 'Compatibility Changes in MongoDB 8.0',
});
const PAGE_82 = upgradePage('8.2', { ...GLOBAL, fcv: '"8.0"', version: '8.0' });
const PAGE_83 = upgradePage('8.3', GLOBAL);

/** Convert pages in order with docset-wide maps built the way convertZipFileToMdxFiles builds them. */
const convertDocset = async (pages: Array<[string, SnootyNode]>) => {
  files.clear();
  const xref = new Map<string, SubstitutionRefXrefInfo>();
  const literals = new Map<string, string>();
  for (const [, ast] of pages) {
    for (const [k, v] of buildSubstitutionRefXrefMap(ast)) xref.set(k, v);
    for (const [k, v] of buildSubstitutionDefinitionLiteralMap(ast)) literals.set(k, v);
  }
  for (const [slug, ast] of pages) {
    await convertJsonAstToMdxFiles({
      ast,
      outputPath: path.join(ROOT, `${slug}.mdx`),
      outputRootDir: ROOT,
      substitutionRefXref: xref,
      substitutionDefLiterals: literals,
    });
  }
};

const read = (rel: string): string => {
  const content = files.get(path.resolve(ROOT, rel));
  if (content === undefined) throw new Error(`not emitted: ${rel}\nemitted: ${[...files.keys()].join('\n')}`);
  return content;
};

/** The body of `<Define name="alias">…</Define>` in a file, or undefined when there isn't one. */
const defineBody = (mdx: string, alias: string): string | undefined =>
  mdx.match(new RegExp(`<Define name="${alias}">([\\s\\S]*?)</Define>`))?.[1];

const expectDefine = (mdx: string, alias: string): string => {
  const body = defineBody(mdx, alias);
  if (body === undefined) throw new Error(`no <Define name="${alias}"> in:\n${mdx}`);
  return body;
};

describe('page-scoped substitutions are emitted as <Define> (DOCSP-65097)', () => {
  // 8.0 is converted before 8.2 and 8.3, so the docset-wide maps end up holding a later page's value.
  const docset: Array<[string, SnootyNode]> = [
    ['release-notes/8.0-upgrade-replica-set', PAGE_80],
    ['release-notes/8.2-upgrade-replica-set', PAGE_82],
    ['release-notes/8.3-upgrade-replica-set', PAGE_83],
  ];

  beforeEach(async () => {
    await convertDocset(docset);
  });

  describe('definitions are emitted where they are written', () => {
    it("emits a rich definition in the file that defines it, with that file's own value", () => {
      expect(expectDefine(read('_includes/8.0-upgrade-replacements.mdx'), 'oldfcv')).toContain('7.0');
      expect(expectDefine(read('_includes/8.2-upgrade-replacements.mdx'), 'oldfcv')).toContain('8.0');
      expect(expectDefine(read('_includes/8.3-upgrade-replacements.mdx'), 'oldfcv')).toContain('8.2');
    });

    it("keeps formatting in a rich definition's body", () => {
      expect(expectDefine(read('_includes/8.0-upgrade-replacements.mdx'), 'oldfcv')).toContain('`"7.0"`');
    });

    it('emits a plain-text definition too', () => {
      expect(expectDefine(read('_includes/8.0-upgrade-replacements.mdx'), 'oldversion')).toContain('7.0');
      expect(expectDefine(read('_includes/8.2-upgrade-replacements.mdx'), 'oldversion')).toContain('8.0');
    });

    it('emits a :ref: definition with its own link', () => {
      const body = expectDefine(read('_includes/8.0-upgrade-replacements.mdx'), 'compatibility');

      expect(body).toContain('8.0-compatibility');
      expect(body).not.toContain('8.2');
    });

    it('never prints a definition as page text', () => {
      const page = read('release-notes/8.0-upgrade-replica-set.mdx');

      expect(defineBody(page, 'oldfcv')).toBeUndefined();
    });
  });

  describe('references stay resolvable from the definition', () => {
    it('leaves a rich alias on the page bare, with no baked value', () => {
      const page = read('release-notes/8.0-upgrade-replica-set.mdx');

      expect(page).toContain('<Reference refKey="oldfcv" type="substitution" />');
    });

    it('references both aliases in the shared include body by name only', () => {
      const body = read('_includes/upgrade-shared.mdx');

      expect(body).toContain('<Reference refKey="oldfcv" type="substitution" />');
      expect(body).toContain('<Reference refKey="compatibility" type="substitution" />');
    });

    it('does not bake a docset-global value into the shared include body', () => {
      const body = read('_includes/upgrade-shared.mdx');

      expect(body).not.toContain('8.2');
      expect(body).not.toContain('8.3');
    });
  });

  describe('what must not change', () => {
    it('keeps a baked value for an alias that no page defines', async () => {
      await convertDocset([
        [
          'page',
          {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [text('Use '), subRef('mdb-shell', [text('mongosh')]), text('.')],
              },
            ],
          },
        ],
      ]);

      expect(read('page.mdx')).toContain('<Reference refKey="mdb-shell" type="substitution" value="mongosh" />');
    });

    it('keeps an explicit .. replacement:: as a <Replacement> slot', async () => {
      await convertDocset([
        [
          'page',
          {
            type: 'root',
            children: [
              {
                type: 'directive',
                name: 'include',
                argument: '/includes/chunk.rst',
                children: [
                  {
                    type: 'directive',
                    name: 'replacement',
                    argument: 'field',
                    children: [{ type: 'paragraph', children: [text('MyType')] }],
                  },
                  {
                    type: 'paragraph',
                    children: [text('Use '), { type: 'substitution_reference', name: 'field', children: [] }],
                  },
                ],
              },
            ],
          },
        ],
      ]);

      expect(read('page.mdx')).toMatch(/<Replacement name="field">[\s\S]*MyType[\s\S]*<\/Replacement>/);
    });
  });
});

describe('shared include bodies when a page does not define the alias', () => {
  const definingPage: SnootyNode = upgradePage('8.0', {
    fcv: '"7.0"',
    version: '7.0',
    compatLabel: '8.0-compatibility',
    compatTitle: 'Compatibility Changes in MongoDB 8.0',
  });

  const pageWithoutDefinitions: SnootyNode = {
    type: 'root',
    children: [
      {
        type: 'directive',
        name: 'include',
        argument: '/includes/upgrade-shared.rst',
        children: [
          {
            type: 'paragraph',
            children: [
              subRef('oldfcv', [literal(GLOBAL.fcv)]),
              text('; see '),
              subRef('compatibility', [refRole(GLOBAL.compatLabel, GLOBAL.compatTitle)]),
            ],
          },
        ],
      },
    ],
  };

  it('keeps a docset fallback value for the alias in _references.json', async () => {
    await convertDocset([
      ['release-notes/8.0-upgrade-replica-set', definingPage],
      ['release-notes/other', pageWithoutDefinitions],
    ]);

    const refs = read('_references.json');

    expect(refs).toContain('"compatibility"');
    expect(refs).toContain('Compatibility Changes in MongoDB');
  });

  it('keeps the link target in the fallback so the reference still renders as a link', async () => {
    await convertDocset([
      ['release-notes/8.0-upgrade-replica-set', definingPage],
      ['release-notes/other', pageWithoutDefinitions],
    ]);

    const substitutions = JSON.parse(read('_references.json')).substitutions;

    expect(substitutions.compatibility).toEqual(
      expect.objectContaining({ url: expect.stringContaining('compatibility') }),
    );
  });

  it('emits a bare reference for a typed-role alias defined by a page', async () => {
    const typedDef = (name: string, title: string): SnootyNode => ({
      type: 'substitution_definition',
      name,
      children: [{ type: 'role', name: 'binary', target: `bin.${title}`, children: [{ type: 'text', value: title }] }],
    });
    await convertDocset([
      [
        'page',
        {
          type: 'root',
          children: [
            {
              type: 'directive',
              name: 'include',
              argument: '/includes/tool.rst',
              children: [
                typedDef('tool-binary', 'mongofiles'),
                { type: 'paragraph', children: [subRef('tool-binary', [text('mongofiles')])] },
              ],
            },
          ],
        },
      ],
    ]);

    expect(read('_includes/tool.mdx')).toContain('<Reference refKey="tool-binary" type="substitution" />');
  });
});

describe('aliases intentionally defined per page inside includes', () => {
  /** Mirrors |analyzer-name| in composable tutorials: each *_ui.rst include defines its own value. */
  const tutorialPage = (name: string, fieldType: string): SnootyNode => ({
    type: 'root',
    children: [
      {
        type: 'directive',
        name: 'include',
        argument: `/includes/${name}_ui.rst`,
        children: [
          subDef('fts-field-type', [text(fieldType)]),
          {
            type: 'paragraph',
            children: [subRef('fts-field-type', [text(fieldType)])],
          },
        ],
      },
    ],
  });

  it("gives each include file its own definition and never another include's value", async () => {
    await convertDocset([
      ['tutorials/a', tutorialPage('a', 'autocomplete')],
      ['tutorials/b', tutorialPage('b', 'string')],
    ]);

    const a = read('_includes/a_ui.mdx');
    const b = read('_includes/b_ui.mdx');

    expect(expectDefine(a, 'fts-field-type')).toContain('autocomplete');
    expect(expectDefine(b, 'fts-field-type')).toContain('string');
    expect(a).not.toContain('string');
    expect(b).not.toContain('autocomplete');
  });
});
