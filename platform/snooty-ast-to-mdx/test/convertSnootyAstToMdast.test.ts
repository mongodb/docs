/**
 * This test suite should be used for tests that
 * require more granularity than simple snapshots.
 */

import yaml from 'yaml';
import { convertSnootyAst } from './utils';
import type { SnootyNode } from '../src/core/convertSnootyAstToMdast/types';
import type { ReferencesArtifact } from '../src/core/convertJsonAstToMdxFiles/buildReferencesArtifacts';

describe('convertSnootyAstToMdast', () => {
  it('converts plain text paragraph', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [{ type: 'text', value: 'Hello world' }],
        },
      ],
    };
    const { mdx } = convertSnootyAst({ ast });

    expect(mdx).toBe('Hello world');
  });

  it('converts rubric directive', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [{ type: 'directive', name: 'rubric', argument: [{ type: 'text', value: 'Hey Rubric' }] }],
    };
    const { mdx } = convertSnootyAst({ ast });
    expect(mdx).toBe('**Hey Rubric**');
  });

  it('collects meta directives into frontmatter', () => {
    const ast: SnootyNode = {
      type: 'root',
      options: { page: 'opts' },
      children: [
        { type: 'directive', name: 'meta', options: { foo: 'bar' } },
        { type: 'paragraph', children: [{ type: 'text', value: 'Body' }] },
      ],
    };
    const { mdx } = convertSnootyAst({ ast });

    const frontmatter = mdx.split('---')[1];
    const frontmatterObject = yaml.parse(frontmatter);

    expect(frontmatterObject).toEqual({ options: { page: 'opts' }, foo: 'bar' });
  });

  it('extracts image path from child nodes and handles alt/width/height numeric attributes', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'directive',
          name: 'image',
          // Provide no argument – path is nested in child nodes instead
          children: [{ type: 'text', value: 'images/example.png' }],
          options: { alt: 'Alt text', width: '300', height: 'abc' },
        },
      ],
    };
    const { mdx } = convertSnootyAst({ ast });

    expect(mdx).toEqual(`<Image src="/images/example.png" alt="Alt text" width={300} height="abc" />`);
  });

  it('registers image import and renders Image component', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [{ type: 'directive', name: 'image', argument: 'images/example.png' }],
    };
    const { mdx } = convertSnootyAst({ ast });

    expect(mdx).toEqual(`<Image src="/images/example.png" />`);
  });

  it('converts include directive and calls onEmitMdxFile', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'directive',
          name: 'include',
          argument: 'included-file.rst',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', value: 'Hello from included file' }],
            },
          ],
        },
      ],
    };
    const onEmitMdxFile = jest.fn();
    const { mdx } = convertSnootyAst({ ast, onEmitMdxFile });

    expect(onEmitMdxFile).toHaveBeenCalledTimes(1);

    const [{ outfilePath, mdastRoot }] = onEmitMdxFile.mock.calls[0];
    expect(outfilePath).toBe('included-file.mdx');
    expect(mdastRoot).toHaveProperty('type', 'root');

    expect(mdx).toBe(`<Include src="/included-file" />`);
  });

  it('collects substitutions and refs into root.__references', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            { type: 'substitution_reference', refname: 'prod', children: [{ type: 'text', value: 'MongoDB' }] },
            { type: 'doc', url: '/docs/page', children: [{ type: 'text', value: 'Doc' }] },
          ],
        },
      ],
    };
    const { mdast } = convertSnootyAst({ ast });

    const refs = mdast.__references as ReferencesArtifact;

    expect(refs).toBeDefined();
    expect(refs.substitutions).toHaveProperty('prod', 'MongoDB');
    expect(refs.refs['/docs/page'].title).toBe('Doc');
  });

  it('injects tabs-selector-position: main into frontmatter when tabs-selector directive is present', () => {
    const ast: SnootyNode = {
      type: 'root',
      options: { selectors: { drivers: { nodejs: [{ type: 'text', value: 'Node.js' }] } } },
      children: [
        { type: 'directive', name: 'tabs-selector', argument: 'drivers' },
        { type: 'paragraph', children: [{ type: 'text', value: 'Content' }] },
      ],
    };
    const { mdx } = convertSnootyAst({ ast });
    const frontmatter = yaml.parse(mdx.split('---')[1]);

    expect(frontmatter.options?.['tabs-selector-position']).toBe('main');
  });

  it('does not inject tabs-selector-position when no tabs-selector directive is present', () => {
    const ast: SnootyNode = {
      type: 'root',
      options: { selectors: { drivers: { nodejs: [{ type: 'text', value: 'Node.js' }] } } },
      children: [{ type: 'paragraph', children: [{ type: 'text', value: 'Content' }] }],
    };
    const { mdx } = convertSnootyAst({ ast });
    const frontmatter = yaml.parse(mdx.split('---')[1]);

    expect(frontmatter.options?.['tabs-selector-position']).toBeUndefined();
  });

  it('adds composable_tutorial (validSelections, refToSelection) to frontmatter when page has composable-tutorial', () => {
    const ast: SnootyNode = {
      type: 'root',
      fileid: 'composable-page',
      children: [
        {
          type: 'directive',
          name: 'composable-tutorial',
          children: [
            {
              type: 'directive',
              name: 'selected-content',
              selections: { language: 'nodejs', interface: 'drivers' },
              children: [
                {
                  type: 'section',
                  id: 'intro',
                  children: [{ type: 'paragraph', children: [{ type: 'text', value: 'Intro' }] }],
                },
              ],
            },
            {
              type: 'directive',
              name: 'selected-content',
              selections: { language: 'python', interface: 'drivers' },
              children: [{ type: 'section', html_id: 'setup', children: [] }],
            },
          ],
        },
      ],
    };
    const { mdx } = convertSnootyAst({ ast });
    const frontmatter = mdx.split('---')[1];
    const parsed = yaml.parse(frontmatter);

    expect(parsed.options?.composable_tutorial).toBeDefined();
    expect(parsed.options.composable_tutorial.validSelections).toEqual(
      expect.arrayContaining(['interface=drivers**language=nodejs', 'interface=drivers**language=python']),
    );
    expect(parsed.options.composable_tutorial.refToSelection).toMatchObject({
      intro: { language: 'nodejs', interface: 'drivers' },
      setup: { language: 'python', interface: 'drivers' },
    });
  });
});

describe('DefinitionTerm inline content rendering', () => {
  it('renders an inline_target anchor inline with the term text — no blank line before the span', () => {
    // Reproduces the blank-line bug where <span id="..."/> was a separate block sibling
    // of the term text inside <DefinitionTerm>, causing a blank line between them.
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'definitionList',
          children: [
            {
              type: 'definitionListItem',
              term: [
                { type: 'text', value: 'mongot' },
                {
                  type: 'inline_target',
                  domain: 'std',
                  name: 'term',
                  html_id: 'std-term-mongot',
                  children: [
                    { type: 'target_identifier', children: [{ type: 'text', value: 'mongot' }], ids: ['mongot'] },
                  ],
                },
              ],
              children: [{ type: 'paragraph', children: [{ type: 'text', value: 'A search daemon.' }] }],
            },
          ],
        },
      ],
    };
    const { mdx } = convertSnootyAst({ ast });

    expect(mdx).toContain('mongot');
    expect(mdx).toContain('std-term-mongot');
    expect(mdx).not.toMatch(/<DefinitionTerm>[\s\S]*?\n[ \t]*\n[\s\S]*?<\/DefinitionTerm>/);
  });

  it('renders a term with text + inline code + text inline — no blank lines between parts', () => {
    // e.g. "Sort on ``{ field: 1 }`` uses an index" — three inline siblings that previously
    // rendered with blank lines between each one.
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'definitionList',
          children: [
            {
              type: 'definitionListItem',
              term: [
                { type: 'text', value: 'Sort on ' },
                { type: 'literal', children: [{ type: 'text', value: '{ field: 1 }' }] },
                { type: 'text', value: ' uses an index' },
              ],
              children: [{ type: 'paragraph', children: [{ type: 'text', value: 'Index used.' }] }],
            },
          ],
        },
      ],
    };
    const { mdx } = convertSnootyAst({ ast });

    expect(mdx).toContain('Sort on');
    expect(mdx).toContain('`{ field: 1 }`');
    expect(mdx).toContain('uses an index');
    expect(mdx).not.toMatch(/<DefinitionTerm>[\s\S]*?\n[ \t]*\n[\s\S]*?<\/DefinitionTerm>/);
  });

  it('renders a term with bold text mixed with plain text inline — no blank lines between parts', () => {
    // e.g. "Field does **not** exist" from wildcard-query-restrictions.rst
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'definitionList',
          children: [
            {
              type: 'definitionListItem',
              term: [
                { type: 'text', value: 'Field does ' },
                { type: 'strong', children: [{ type: 'text', value: 'not' }] },
                { type: 'text', value: ' exist' },
              ],
              children: [{ type: 'paragraph', children: [{ type: 'text', value: 'Unsupported.' }] }],
            },
          ],
        },
      ],
    };
    const { mdx } = convertSnootyAst({ ast });

    expect(mdx).toContain('Field does');
    expect(mdx).toContain('**not**');
    expect(mdx).toContain('exist');
    expect(mdx).not.toMatch(/<DefinitionTerm>[\s\S]*?\n[ \t]*\n[\s\S]*?<\/DefinitionTerm>/);
  });
});
