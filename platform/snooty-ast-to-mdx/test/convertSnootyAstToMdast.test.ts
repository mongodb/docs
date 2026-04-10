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

  it('extracts image path from argument and caption from children', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'directive',
          name: 'image',
          argument: [{ type: 'text', value: 'images/example.png' }],
          children: [{ type: 'paragraph', children: [{ type: 'text', value: 'This is the caption' }] }],
          options: { alt: 'Alt text', width: '300', height: 'abc' },
        },
      ],
    };
    const { mdx } = convertSnootyAst({ ast });
    expect(mdx).toEqual(
      `<Image src="/images/example.png" alt="Alt text" width={300} height="abc" caption="This is the caption" />`,
    );
  });

  it('extracts image path from argument and caption and lightbox from children', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'directive',
          name: 'image',
          argument: [{ type: 'text', value: 'images/example.png' }],
          children: [{ type: 'paragraph', children: [{ type: 'text', value: 'This is the caption' }] }],
          options: { alt: 'Alt text', width: '300', height: 'abc', lightbox: true },
        },
      ],
    };
    const { mdx } = convertSnootyAst({ ast });
    expect(mdx).toEqual(
      `<Image src="/images/example.png" alt="Alt text" width={300} height="abc" lightbox caption="This is the caption" />`,
    );
  });

  it('registers figure import and renders Image component', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'directive',
          name: 'figure',
          argument: [{ type: 'text', value: 'images/example.png' }],
          children: [{ type: 'paragraph', children: [{ type: 'text', value: 'This is another caption' }] }],
          options: { alt: 'Alt text', figwidth: '333', height: '0', lightbox: true },
        },
      ],
    };
    const { mdx } = convertSnootyAst({ ast });

    expect(mdx).toEqual(
      `<Image src="/images/example.png" alt="Alt text" figwidth={333} height={0} lightbox caption="This is another caption" />`,
    );
  });

  it('registers figure import and renders Image component', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [{ type: 'directive', name: 'figure', argument: 'images/example.png' }],
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
    expect(refs.refs['/docs/page']).toBe('/docs/page');
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

  describe('angle bracket escaping in text nodes', () => {
    it('escapes < followed by a digit to prevent MDX parse errors', () => {
      // Reproduces: "Unexpected character `1` (U+0031) before name"
      // e.g. "Low Write Rate (<100 operations per second)"
      const ast: SnootyNode = {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [{ type: 'text', value: 'Low Write Rate (<100 operations per second)' }],
          },
        ],
      };
      const { mdx } = convertSnootyAst({ ast });

      expect(mdx).toContain('\\<100');
    });

    it('escapes < followed by a non-name-starting character (e.g. pipe)', () => {
      // Reproduces: "Unexpected character `|` (U+007C) in name"
      const ast: SnootyNode = {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [{ type: 'text', value: 'bitwise OR: a <| b' }],
          },
        ],
      };
      const { mdx } = convertSnootyAst({ ast });

      expect(mdx).toContain('\\<|');
    });

    it('does not add extra escaping for < followed by a letter (valid tag name start)', () => {
      // <Letter is a valid JSX tag start — the stringifier handles it; we must not double-escape.
      const ast: SnootyNode = {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [{ type: 'text', value: 'Application ID URI (<Application ID>)' }],
          },
        ],
      };
      const { mdx } = convertSnootyAst({ ast });

      expect(mdx).toContain('Application ID URI');
      // Our function must not have added a second backslash on top of the stringifier's own escape
      expect(mdx).not.toMatch(/\\\\</);
    });

    it('does not escape < inside inline code — backticks protect the content', () => {
      const ast: SnootyNode = {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text', value: 'Replace ' },
              { type: 'literal', value: '<your_admin_username>' },
              { type: 'text', value: ' with your username' },
            ],
          },
        ],
      };
      const { mdx } = convertSnootyAst({ ast });

      // Inline code is wrapped in backticks — < is safe there and must not be escaped
      expect(mdx).toContain('`<your_admin_username>`');
    });

    it('does not escape < inside a fenced code block — the fence protects the content', () => {
      const ast: SnootyNode = {
        type: 'root',
        children: [
          {
            type: 'literal_block',
            value: 'from <your application name>.models import Movie',
            language: 'python',
          },
        ],
      };
      const { mdx } = convertSnootyAst({ ast });

      // Content inside a fenced block is not parsed as MDX — < is safe as-is
      expect(mdx).toContain('from <your application name>.models import Movie');
      expect(mdx).not.toContain('\\<your');
    });

    it('escapes < followed by a digit inside a JSX element (stringifier does not handle this context)', () => {
      // In JSX element children the stringifier does NOT escape `<` to `\<`.
      // Our injectJsxAngleBracketEscapes pass inserts html nodes so that `\<`
      // appears verbatim in the output without the stringifier doubling the backslash.
      const ast: SnootyNode = {
        type: 'root',
        children: [
          {
            type: 'directive',
            name: 'note',
            children: [
              {
                type: 'paragraph',
                children: [{ type: 'text', value: 'Low Write Rate (<100 operations per second)' }],
              },
            ],
          },
        ],
      };
      const { mdx } = convertSnootyAst({ ast });

      // Exactly one backslash before `<` — not two or three
      expect(mdx).toMatch(/\\<100/);
      expect(mdx).not.toMatch(/\\\\<100/);
    });

    it('escapes < in DefinitionTerm text without adding blank lines around it', () => {
      // Regression: the html-node-split approach inserted block-level siblings inside the
      // DefinitionTerm JSX element, which remark-mdx serialized with blank lines between them.
      const ast: SnootyNode = {
        type: 'root',
        children: [
          {
            type: 'definitionList',
            children: [
              {
                type: 'definitionListItem',
                term: [{ type: 'text', value: 'Low Write Rate (<100 operations per second)' }],
                children: [
                  {
                    type: 'paragraph',
                    children: [{ type: 'text', value: 'Standard hardware configurations are usually sufficient.' }],
                  },
                ],
              },
            ],
          },
        ],
      };
      const { mdx } = convertSnootyAst({ ast });

      // Exactly one backslash before `<` — not two or three
      expect(mdx).toMatch(/\\<100/);
      expect(mdx).not.toMatch(/\\\\<100/);
      // No blank lines around the escaped bracket (all on one line inside DefinitionTerm)
      expect(mdx).not.toMatch(/\(\s*\n\s*\n\s*\\</);
    });

    it('does not produce extra backslashes for <= in a flow list item (the triple-backslash regression)', () => {
      // Before the fix, escapeInvalidTagOpeners added `\` to the text node value,
      // then the stringifier added its own `\<` AND escaped our `\` → `\\\<`.
      const ast: SnootyNode = {
        type: 'root',
        children: [
          {
            type: 'bullet_list',
            children: [
              {
                type: 'list_item',
                children: [
                  {
                    type: 'paragraph',
                    children: [{ type: 'text', value: 'MongoDB version <= 6.0' }],
                  },
                ],
              },
            ],
          },
        ],
      };
      const { mdx } = convertSnootyAst({ ast });

      // Exactly one backslash — the stringifier's own escape for flow text
      expect(mdx).toMatch(/\\<=/);
      expect(mdx).not.toMatch(/\\\\<=/);
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

  // Flow-element-in-paragraph hoisting tests
  const FLOW_DIRECTIVE_CASES: Array<[string, string]> = [
    ['note', 'Note'],
    ['warning', 'Warning'],
    ['important', 'Important'],
    ['example', 'Example'],
    ['banner', 'Banner'],
    ['contents', 'Contents'],
  ];

  it.each(FLOW_DIRECTIVE_CASES)(
    'hoists <%s> out of paragraph when directive is nested in a paragraph',
    (directiveName, componentName) => {
      const ast: SnootyNode = {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'directive',
                name: directiveName,
                children: [{ type: 'paragraph', children: [{ type: 'text', value: 'Content' }] }],
              },
            ],
          },
        ],
      };
      const { mdx } = convertSnootyAst({ ast });
      // Component must not be serialised inline inside a paragraph
      expect(mdx).not.toMatch(new RegExp(`\\(.*<${componentName}`, 's'));
      // Component must appear at block level (start of a line)
      expect(mdx).toMatch(new RegExp(`^<${componentName}`, 'm'));
    },
  );

  it('hoists <See> out of paragraph (mapped via DIRECTIVE_TO_COMPONENT)', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'directive',
              name: 'see',
              children: [{ type: 'paragraph', children: [{ type: 'text', value: 'See also' }] }],
            },
          ],
        },
      ],
    };
    const { mdx } = convertSnootyAst({ ast });
    expect(mdx).toMatch(/^<See/m);
  });

  it('hoists <DefinitionList> out of paragraph when nested in a paragraph', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'definitionList',
              children: [
                {
                  type: 'definitionListItem',
                  term: [{ type: 'text', value: 'Term' }],
                  children: [{ type: 'paragraph', children: [{ type: 'text', value: 'Desc' }] }],
                },
              ],
            },
          ],
        },
      ],
    };
    const { mdx } = convertSnootyAst({ ast });
    expect(mdx).toMatch(/^<DefinitionList/m);
  });

  it('hoists <Table> out of paragraph when nested in a paragraph', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'table',
              children: [
                {
                  type: 'table_body',
                  children: [
                    {
                      type: 'table_row',
                      children: [{ type: 'table_cell', children: [{ type: 'text', value: 'Cell' }] }],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
    const { mdx } = convertSnootyAst({ ast });
    expect(mdx).toMatch(/^<Table/m);
  });

  it('hoists <Footnote> out of paragraph when nested in a paragraph', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'footnote',
              id: '1',
              name: 'fn1',
              children: [{ type: 'paragraph', children: [{ type: 'text', value: 'Footnote text' }] }],
            },
          ],
        },
      ],
    };
    const { mdx } = convertSnootyAst({ ast });
    expect(mdx).toMatch(/^<Footnote/m);
  });

  it('preserves surrounding text when hoisting a flow element out of a paragraph', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            { type: 'text', value: 'Before.' },
            {
              type: 'directive',
              name: 'note',
              children: [{ type: 'paragraph', children: [{ type: 'text', value: 'Note body' }] }],
            },
            { type: 'text', value: 'After.' },
          ],
        },
      ],
    };
    const { mdx } = convertSnootyAst({ ast });
    expect(mdx).toMatch(/^<Note/m);
    expect(mdx).toContain('Before.');
    expect(mdx).toContain('After.');
  });

  it('suppresses default_domain directive (produces no output)', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [{ type: 'directive', name: 'default_domain', argument: 'mongodb', children: [] }],
    };
    const { mdx } = convertSnootyAst({ ast });
    expect(mdx).toBe('');
  });

  describe('code node', () => {
    it('emits a fenced code block with lang', () => {
      const ast: SnootyNode = {
        type: 'root',
        children: [{ type: 'code', lang: 'javascript', value: 'console.log("hi")' }],
      };
      const { mdx } = convertSnootyAst({ ast });
      expect(mdx).toMatch(/^```javascript$/m);
      expect(mdx).toContain('console.log("hi")');
    });

    it('emits a fenced code block without lang when lang is null', () => {
      const ast: SnootyNode = {
        type: 'root',
        children: [{ type: 'code', lang: undefined, value: 'some code' }],
      };
      const { mdx } = convertSnootyAst({ ast });
      expect(mdx).toContain('some code');
      expect(mdx).not.toContain('lang=');
    });

    it('puts copyable in the fence info string', () => {
      const ast: SnootyNode = {
        type: 'root',
        children: [{ type: 'code', lang: 'python', copyable: true, value: 'x = 1' }],
      };
      const { mdx } = convertSnootyAst({ ast });
      expect(mdx).toMatch(/^```python copyable={true}/m);
    });

    it('omits emphasize_lines from meta when array is empty', () => {
      const ast: SnootyNode = {
        type: 'root',
        children: [{ type: 'code', lang: 'js', emphasize_lines: [], value: 'x = 1' }],
      };
      const { mdx } = convertSnootyAst({ ast });
      expect(mdx).not.toContain('emphasize_lines');
    });

    it('puts non-empty emphasize_lines in the fence info string', () => {
      const ast: SnootyNode = {
        type: 'root',
        children: [{ type: 'code', lang: 'js', emphasize_lines: [1, 3], value: 'a\nb\nc' }],
      };
      const { mdx } = convertSnootyAst({ ast });
      expect(mdx).toContain('emphasize_lines={[1,3]}');
    });

    it('puts linenos=true in the fence info string', () => {
      const ast: SnootyNode = {
        type: 'root',
        children: [{ type: 'code', lang: 'sh', linenos: true, value: 'echo hi' }],
      };
      const { mdx } = convertSnootyAst({ ast });
      expect(mdx).toContain('linenos={true}');
    });

    it('puts caption in the fence info string as a single-quoted JSX expression', () => {
      const ast: SnootyNode = {
        type: 'root',
        children: [{ type: 'code', lang: 'js', caption: 'My caption', value: 'x = 1' }],
      };
      const { mdx } = convertSnootyAst({ ast });
      expect(mdx).toContain("caption={'My caption'}");
    });

    it('handles double quotes inside caption without backslash-escaping', () => {
      const ast: SnootyNode = {
        type: 'root',
        children: [{ type: 'code', lang: 'js', caption: 'Say "hello"', value: 'x = 1' }],
      };
      const { mdx } = convertSnootyAst({ ast });
      expect(mdx).toContain(`caption={'Say "hello"'}`);
    });

    it('puts source in the fence info string as a single-quoted JSX expression', () => {
      const ast: SnootyNode = {
        type: 'root',
        children: [{ type: 'code', lang: 'js', source: 'https://example.com/file.js', value: 'x = 1' }],
      };
      const { mdx } = convertSnootyAst({ ast });
      expect(mdx).toContain("source={'https://example.com/file.js'}");
    });

    it('puts lineno_start in the fence info string', () => {
      const ast: SnootyNode = {
        type: 'root',
        children: [{ type: 'code', lang: 'js', linenos: true, lineno_start: 5, value: 'x = 1' }],
      };
      const { mdx } = convertSnootyAst({ ast });
      expect(mdx).toContain('lineno_start={5}');
    });

    it('preserves multi-line content verbatim in the fenced block', () => {
      const ast: SnootyNode = {
        type: 'root',
        children: [{ type: 'code', lang: 'sh', value: 'line one\nline two' }],
      };
      const { mdx } = convertSnootyAst({ ast });
      expect(mdx).toContain('line one\nline two');
      expect(mdx).not.toContain('\\n');
    });

    it('preserves quotes and backslashes in the fenced block verbatim', () => {
      const ast: SnootyNode = {
        type: 'root',
        children: [{ type: 'code', lang: 'sh', value: 'echo "hello" && cat C:\\file.txt' }],
      };
      const { mdx } = convertSnootyAst({ ast });
      expect(mdx).toContain('echo "hello" && cat C:\\file.txt');
    });

    it('handles a realistic multi-line code block with all attributes', () => {
      const ast: SnootyNode = {
        type: 'root',
        children: [
          {
            type: 'code',
            lang: 'javascript',
            copyable: true,
            emphasize_lines: [2],
            linenos: true,
            lineno_start: 10,
            caption: 'Example',
            source: 'https://example.com/src.js',
            value: 'const x = 1;\nconst y = 2;\nreturn x + y;',
          },
        ],
      };
      const { mdx } = convertSnootyAst({ ast });
      expect(mdx).toMatch(/^```javascript/m);
      expect(mdx).toContain('copyable={true}');
      expect(mdx).toContain('emphasize_lines={[2]}');
      expect(mdx).toContain('linenos={true}');
      expect(mdx).toContain('lineno_start={10}');
      expect(mdx).toContain("caption={'Example'}");
      expect(mdx).toContain("source={'https://example.com/src.js'}");
      expect(mdx).toContain('const x = 1;\nconst y = 2;\nreturn x + y;');
    });

    it('handles literal_block node type the same as code', () => {
      const ast: SnootyNode = {
        type: 'root',
        children: [{ type: 'literal_block', lang: 'json', value: '{"key": "val"}' }],
      };
      const { mdx } = convertSnootyAst({ ast });
      expect(mdx).toMatch(/^```json$/m);
      expect(mdx).toContain('{"key": "val"}');
    });

    it('falls back to children text when value is empty', () => {
      const ast: SnootyNode = {
        type: 'root',
        children: [
          {
            type: 'code',
            lang: 'js',
            value: '',
            children: [{ type: 'text', value: 'fallback content' }],
          },
        ],
      };
      const { mdx } = convertSnootyAst({ ast });
      expect(mdx).toContain('fallback content');
    });
  });

  describe('io-code-block directive', () => {
    // Minimal helper to build an input or output child directive for these tests.
    const makeIoChild = (
      name: 'input' | 'output',
      codeNode: Record<string, unknown>,
      options?: Record<string, unknown>,
    ): SnootyNode => ({
      type: 'directive',
      name,
      options: { language: codeNode.lang ?? 'javascript', linenos: false, ...options },
      children: [{ type: 'code', copyable: true, emphasize_lines: [], linenos: false, ...codeNode } as SnootyNode],
    });

    it('emits an IoCodeBlock with a single Input child', () => {
      const ast: SnootyNode = {
        type: 'root',
        children: [
          {
            type: 'directive',
            name: 'io-code-block',
            options: { copyable: true },
            children: [makeIoChild('input', { lang: 'javascript', value: 'db.find()' })],
          },
        ],
      };
      const { mdx } = convertSnootyAst({ ast });

      expect(mdx).toContain('<IoCodeBlock>');
      expect(mdx).toContain('<Input>');
      expect(mdx).toContain('```javascript');
      expect(mdx).toContain('db.find()');
      expect(mdx).not.toContain('<Output');
      expect(mdx).toContain('</IoCodeBlock>');
    });

    it('emits an IoCodeBlock with Input and Output children', () => {
      const ast: SnootyNode = {
        type: 'root',
        children: [
          {
            type: 'directive',
            name: 'io-code-block',
            options: { copyable: true },
            children: [
              makeIoChild('input', { lang: 'javascript', value: 'db.find()' }),
              makeIoChild('output', { lang: 'shell', value: '[{ _id: 1 }]' }),
            ],
          },
        ],
      };
      const { mdx } = convertSnootyAst({ ast });

      expect(mdx).toContain('<IoCodeBlock>');
      expect(mdx).toContain('<Input>');
      expect(mdx).toContain('```javascript');
      expect(mdx).toContain('db.find()');
      expect(mdx).toContain('<Output>');
      expect(mdx).toContain('```shell');
      expect(mdx).toContain('[{ _id: 1 }]');
    });

    it('always emits copyable={false} on the Output code block regardless of source AST', () => {
      const ast: SnootyNode = {
        type: 'root',
        children: [
          {
            type: 'directive',
            name: 'io-code-block',
            options: { copyable: true },
            children: [
              makeIoChild('input', { lang: 'javascript', value: 'db.find()', copyable: true }),
              // Source AST says copyable: true — conversion must override it to false.
              makeIoChild('output', { lang: 'shell', value: '[{ _id: 1 }]', copyable: true }),
            ],
          },
        ],
      };
      const { mdx } = convertSnootyAst({ ast });

      // Split on the Output block opening so we can assert only within that block.
      const outputSection = mdx.split('<Output>')[1];
      expect(outputSection).toContain('copyable={false}');
      expect(outputSection).not.toContain('copyable={true}');
    });

    it('emits copyable={false} on Output even when the code block has no language', () => {
      // remark only serializes the info string when lang is present — without a lang
      // fallback, copyable={false} would be silently dropped.
      const ast: SnootyNode = {
        type: 'root',
        children: [
          {
            type: 'directive',
            name: 'io-code-block',
            children: [
              makeIoChild('input', { lang: 'javascript', value: 'db.find()' }),
              // No lang on the output code node — the converter must supply one so
              // remark does not discard the meta string entirely.
              makeIoChild('output', { value: '[{ _id: 1 }]' }),
            ],
          },
        ],
      };
      const { mdx } = convertSnootyAst({ ast });

      const outputSection = mdx.split('<Output>')[1];
      expect(outputSection).toContain('copyable={false}');
    });

    it('passes visible={false} on Output when the option is false', () => {
      const ast: SnootyNode = {
        type: 'root',
        children: [
          {
            type: 'directive',
            name: 'io-code-block',
            options: { copyable: true },
            children: [
              makeIoChild('input', { lang: 'javascript', value: 'db.find()' }),
              makeIoChild('output', { lang: 'shell', value: '[]' }, { visible: false }),
            ],
          },
        ],
      };
      const { mdx } = convertSnootyAst({ ast });

      expect(mdx).toContain('<Output visible={false}>');
    });

    it('omits visible attribute on Output when the option is true (true is the default)', () => {
      const ast: SnootyNode = {
        type: 'root',
        children: [
          {
            type: 'directive',
            name: 'io-code-block',
            options: { copyable: true },
            children: [
              makeIoChild('input', { lang: 'javascript', value: 'db.find()' }),
              makeIoChild('output', { lang: 'shell', value: '[]' }, { visible: true }),
            ],
          },
        ],
      };
      const { mdx } = convertSnootyAst({ ast });

      expect(mdx).toContain('<Output>');
      expect(mdx).not.toContain('visible={true}');
    });

    it('passes code-block meta props (copyable, linenos, emphasize_lines) through to the fenced block', () => {
      const ast: SnootyNode = {
        type: 'root',
        children: [
          {
            type: 'directive',
            name: 'io-code-block',
            options: { copyable: true },
            children: [
              makeIoChild('input', {
                lang: 'python',
                value: 'x = 1',
                copyable: true,
                linenos: true,
                emphasize_lines: [1],
              }),
            ],
          },
        ],
      };
      const { mdx } = convertSnootyAst({ ast });

      expect(mdx).toContain('```python');
      expect(mdx).toContain('copyable={true}');
      expect(mdx).toContain('linenos={true}');
      expect(mdx).toContain('emphasize_lines={[1]}');
    });

    it('falls back to options.language when the code node has no lang', () => {
      const ast: SnootyNode = {
        type: 'root',
        children: [
          {
            type: 'directive',
            name: 'io-code-block',
            options: { copyable: true },
            children: [
              {
                type: 'directive',
                name: 'input',
                options: { language: 'ruby', linenos: false },
                children: [{ type: 'code', value: 'puts "hi"', copyable: true } as SnootyNode],
              },
            ],
          },
        ],
      };
      const { mdx } = convertSnootyAst({ ast });

      expect(mdx).toContain('```ruby');
      expect(mdx).toContain('puts "hi"');
    });

    it('does not emit visible attribute on Input', () => {
      const ast: SnootyNode = {
        type: 'root',
        children: [
          {
            type: 'directive',
            name: 'io-code-block',
            options: { copyable: true },
            children: [makeIoChild('input', { lang: 'javascript', value: 'db.find()' }, { visible: false })],
          },
        ],
      };
      const { mdx } = convertSnootyAst({ ast });

      // visible is only meaningful on Output; Input must not carry it
      expect(mdx).toContain('<Input>');
      expect(mdx).not.toContain('<Input visible');
    });

    it('skips unknown child directive names inside io-code-block', () => {
      const ast: SnootyNode = {
        type: 'root',
        children: [
          {
            type: 'directive',
            name: 'io-code-block',
            options: { copyable: true },
            children: [
              makeIoChild('input', { lang: 'javascript', value: 'db.find()' }),
              { type: 'directive', name: 'unexpected', children: [] },
            ],
          },
        ],
      };
      const { mdx } = convertSnootyAst({ ast });

      expect(mdx).toContain('<IoCodeBlock>');
      expect(mdx).toContain('<Input>');
      expect(mdx).not.toContain('<Unexpected');
    });
  });

  describe('step directive', () => {
    it('produces StepHeading from argument and removes duplicate heading', () => {
      const ast: SnootyNode = {
        type: 'directive',
        name: 'step',
        argument: [{ type: 'text', value: 'Do the thing' }],
        children: [
          { type: 'directive_argument', children: [{ type: 'text', value: 'Do the thing' }] },
          { type: 'heading', depth: 4, children: [{ type: 'text', value: 'Do the thing' }] },
          { type: 'paragraph', children: [{ type: 'text', value: 'Body text.' }] },
        ],
      };
      const { mdx } = convertSnootyAst({ ast });

      expect(mdx).toContain('<StepHeading>');
      expect(mdx).toContain('Do the thing');
      expect(mdx).toContain('Body text.');
      expect(mdx).not.toMatch(/^#{1,6}\s/m);
    });

    it('preserves body headings that are not the step title', () => {
      const ast: SnootyNode = {
        type: 'directive',
        name: 'step',
        argument: [{ type: 'text', value: 'Step title' }],
        children: [
          { type: 'directive_argument', children: [{ type: 'text', value: 'Step title' }] },
          { type: 'heading', depth: 4, children: [{ type: 'text', value: 'Step title' }] },
          { type: 'paragraph', children: [{ type: 'text', value: 'Intro.' }] },
          { type: 'heading', depth: 5, children: [{ type: 'text', value: 'Sub-section' }] },
          { type: 'paragraph', children: [{ type: 'text', value: 'More content.' }] },
        ],
      };
      const { mdx } = convertSnootyAst({ ast });

      expect(mdx).toContain('<StepHeading>');
      expect(mdx).not.toMatch(/^\s*#{1,6}\s+Step title/m);
      expect(mdx).toMatch(/^\s*#{1,6}\s+Sub-section/m);
    });

    it('omits StepHeading when step has no argument', () => {
      const ast: SnootyNode = {
        type: 'directive',
        name: 'step',
        children: [{ type: 'paragraph', children: [{ type: 'text', value: 'Just body.' }] }],
      };
      const { mdx } = convertSnootyAst({ ast });

      expect(mdx).not.toContain('StepHeading');
      expect(mdx).toContain('Just body.');
    });

    it('handles rich inline content in the argument', () => {
      const ast: SnootyNode = {
        type: 'directive',
        name: 'step',
        argument: [
          { type: 'text', value: 'Go to ' },
          { type: 'role', name: 'guilabel', children: [{ type: 'text', value: 'Settings' }] },
        ],
        children: [
          {
            type: 'directive_argument',
            children: [
              { type: 'text', value: 'Go to ' },
              { type: 'role', name: 'guilabel', children: [{ type: 'text', value: 'Settings' }] },
            ],
          },
          {
            type: 'heading',
            depth: 4,
            children: [
              { type: 'text', value: 'Go to ' },
              { type: 'role', name: 'guilabel', children: [{ type: 'text', value: 'Settings' }] },
            ],
          },
          { type: 'paragraph', children: [{ type: 'text', value: 'Configure options.' }] },
        ],
      };
      const { mdx } = convertSnootyAst({ ast });

      expect(mdx).toContain('<StepHeading>');
      expect(mdx).toContain('<Guilabel>Settings</Guilabel>');
      expect(mdx).not.toMatch(/^#{1,6}\s/m);
    });
  });

  describe('procedure directive with steps', () => {
    it('wraps steps in Procedure and produces StepHeading for each', () => {
      const ast: SnootyNode = {
        type: 'directive',
        name: 'procedure',
        children: [
          {
            type: 'directive',
            name: 'step',
            argument: [{ type: 'text', value: 'Step one' }],
            children: [
              { type: 'directive_argument', children: [{ type: 'text', value: 'Step one' }] },
              { type: 'heading', depth: 4, children: [{ type: 'text', value: 'Step one' }] },
              { type: 'paragraph', children: [{ type: 'text', value: 'First body.' }] },
            ],
          },
          {
            type: 'directive',
            name: 'step',
            argument: [{ type: 'text', value: 'Step two' }],
            children: [
              { type: 'directive_argument', children: [{ type: 'text', value: 'Step two' }] },
              { type: 'heading', depth: 4, children: [{ type: 'text', value: 'Step two' }] },
              { type: 'paragraph', children: [{ type: 'text', value: 'Second body.' }] },
            ],
          },
        ],
      };
      const { mdx } = convertSnootyAst({ ast });

      expect(mdx).toContain('<Procedure');
      expect(mdx).toContain('<StepHeading>');
      expect(mdx).toContain('Step one');
      expect(mdx).toContain('Step two');
      expect(mdx).not.toMatch(/^#{1,6}\s/m);
    });
  });
});
