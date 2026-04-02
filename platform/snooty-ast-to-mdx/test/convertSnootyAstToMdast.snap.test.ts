import type { SnootyNode } from '../src/core/convertSnootyAstToMdast/types';
import { convertSnootyAst } from './utils';

/** Minimal Snooty AST objects to snapshot test the MDX conversion against */
const cases: Array<[string, SnootyNode]> = [
  ['simple text node', { type: 'text', value: 'Just text' }],
  [
    'paragraph',
    {
      type: 'paragraph',
      children: [{ type: 'text', value: 'Hello world' }],
    },
  ],
  [
    'emphasis',
    {
      type: 'paragraph',
      children: [
        {
          type: 'emphasis',
          children: [{ type: 'text', value: 'em' }],
        },
      ],
    },
  ],
  [
    'strong',
    {
      type: 'paragraph',
      children: [
        {
          type: 'strong',
          children: [{ type: 'text', value: 'bold' }],
        },
      ],
    },
  ],
  [
    'inline literal → inline code',
    {
      type: 'paragraph',
      children: [{ type: 'literal', value: 'code' }],
    },
  ],
  [
    'code block',
    {
      type: 'code',
      lang: 'js',
      value: 'console.log("hi")',
    },
  ],
  [
    'code block — full attributes',
    {
      type: 'code',
      lang: 'javascript',
      copyable: true,
      emphasize_lines: [1, 3],
      linenos: true,
      lineno_start: 5,
      caption: 'My caption',
      source: 'https://example.com/src.js',
      value: 'const x = 1;\nconst y = 2;\nreturn x + y;',
    },
  ],
  [
    'code block — multi-line with quotes and backslashes',
    {
      type: 'code',
      lang: 'sh',
      copyable: true,
      value:
        'mongoimport --db test --collection inventory ^\n          --authenticationDatabase admin --username <user> --password <password> ^\n          --drop --file ~\\downloads\\inventory.crud.json',
    },
  ],
  [
    'code block — caption with inner double quotes',
    {
      type: 'code',
      lang: 'js',
      caption: 'Say "hello" world',
      value: 'x = 1',
    },
  ],
  [
    'bullet_list',
    {
      type: 'bullet_list',
      children: [
        {
          type: 'list_item',
          children: [{ type: 'paragraph', children: [{ type: 'text', value: 'Item' }] }],
        },
      ],
    },
  ],
  [
    'ordered_list',
    {
      type: 'ordered_list',
      start: 1,
      children: [
        {
          type: 'list_item',
          children: [{ type: 'paragraph', children: [{ type: 'text', value: 'First' }] }],
        },
      ],
    },
  ],
  [
    'link reference',
    {
      type: 'reference',
      refuri: 'https://example.com',
      children: [{ type: 'text', value: 'link' }],
    },
  ],
  [
    'heading',
    {
      type: 'heading',
      depth: 2,
      children: [{ type: 'text', value: 'Heading' }],
    },
  ],
  [
    'blockquote',
    {
      type: 'block_quote',
      children: [
        {
          type: 'paragraph',
          children: [{ type: 'text', value: 'quote' }],
        },
      ],
    },
  ],
  [
    'field list',
    {
      type: 'field_list',
      children: [
        {
          type: 'field',
          name: 'foo',
          label: 'Foo',
          children: [{ type: 'paragraph', children: [{ type: 'text', value: 'Field content' }] }],
        },
      ],
    },
  ],
  [
    'superscript and subscript',
    {
      type: 'paragraph',
      children: [
        { type: 'superscript', children: [{ type: 'text', value: 'sup' }] },
        { type: 'text', value: ' and ' },
        { type: 'subscript', children: [{ type: 'text', value: 'sub' }] },
      ],
    },
  ],
  [
    'definition list',
    {
      type: 'definitionList',
      children: [
        {
          type: 'definitionListItem',
          term: [{ type: 'text', value: 'Term' }],
          children: [{ type: 'paragraph', children: [{ type: 'text', value: 'Definition' }] }],
        },
      ],
    },
  ],
  [
    'definition list with inline_target term',
    {
      type: 'definitionList',
      children: [
        {
          type: 'definitionListItem',
          term: [
            { type: 'text', value: 'agent ' },
            {
              type: 'inline_target',
              domain: 'std',
              name: 'term',
              html_id: 'std-term-agent',
              children: [
                {
                  type: 'target_identifier',
                  children: [{ type: 'text', value: 'agent' }],
                  ids: ['agent'],
                },
              ],
            },
          ],
          children: [{ type: 'paragraph', children: [{ type: 'text', value: 'A lightweight monitoring program.' }] }],
        },
        {
          type: 'definitionListItem',
          term: [{ type: 'literal', children: [{ type: 'text', value: 'MongoClient' }] }],
          children: [{ type: 'paragraph', children: [{ type: 'text', value: 'The primary client class.' }] }],
        },
      ],
    },
  ],
  [
    'table',
    {
      type: 'table',
      children: [
        {
          type: 'table_row',
          children: [{ type: 'table_cell', children: [{ type: 'text', value: 'Cell' }] }],
        },
      ],
    },
  ],
  [
    'directive image',
    {
      type: 'directive',
      name: 'image',
      argument: '/images/test.png',
    },
  ],
  [
    'directive literalinclude',
    {
      type: 'directive',
      name: 'literalinclude',
      options: { language: 'js' },
      argument: 'src/code.js',
    },
  ],
  [
    'directive include',
    {
      type: 'directive',
      name: 'include',
      argument: 'included-file',
      children: [{ type: 'paragraph', children: [{ type: 'text', value: 'Included' }] }],
    },
  ],
  [
    'only directive',
    {
      type: 'directive',
      name: 'only',
      argument: 'target == "mytarget"',
      children: [{ type: 'paragraph', children: [{ type: 'text', value: 'Only content' }] }],
    },
  ],
  [
    'role abbr',
    {
      type: 'role',
      name: 'abbr',
      value: 'abbr',
      children: [],
    },
  ],
  [
    'admonition note',
    {
      type: 'admonition',
      name: 'note',
      children: [{ type: 'paragraph', children: [{ type: 'text', value: 'Note text' }] }],
    },
  ],
  [
    'tabs container',
    {
      type: 'tabs',
      children: [
        {
          type: 'paragraph',
          children: [{ type: 'text', value: 'Tab content' }],
        },
      ],
    },
  ],
  [
    'tab with nested argument title',
    {
      type: 'tabs',
      children: [
        {
          type: 'tab',
          options: { tabid: 'mac-linux' },
          // Snooty puts the tab title (e.g. `.. tab:: macOS / Linux`) in node.argument as a
          // (possibly nested) node tree. A flat isValueNode filter misses nested text — we recurse.
          argument: [{ type: 'text', value: 'macOS / Linux' }],
          children: [{ type: 'paragraph', children: [{ type: 'text', value: 'Some content' }] }],
        },
      ],
    },
  ],
  [
    'target node',
    {
      type: 'target',
      ids: ['my-target'],
    },
  ],
  [
    'thematic break',
    {
      type: 'transition',
    },
  ],
  [
    'line block',
    {
      type: 'line_block',
      children: [
        { type: 'line', value: 'First line' },
        { type: 'line', value: 'Second line' },
      ],
    },
  ],
  [
    'footnote definition and reference',
    {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            { type: 'text', value: 'See note' },
            { type: 'footnote_reference', id: 1 },
          ],
        },
        {
          type: 'footnote',
          id: 1,
          children: [{ type: 'paragraph', children: [{ type: 'text', value: 'Footnote text' }] }],
        },
      ],
    },
  ],
  [
    'substitution reference',
    {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            { type: 'text', value: 'Hello ' },
            { type: 'substitution_reference', refname: 'product', children: [{ type: 'text', value: 'MongoDB' }] },
          ],
        },
      ],
    },
  ],
  [
    'card-group',
    {
      type: 'card-group',
      options: { cols: 3 },
      children: [{ type: 'paragraph', children: [{ type: 'text', value: 'Card' }] }],
    },
  ],
  [
    'cta-banner',
    {
      type: 'directive',
      name: 'cta-banner',
      options: { color: 'green' },
      children: [{ type: 'paragraph', children: [{ type: 'text', value: 'CTA' }] }],
    },
  ],
  [
    'method-selector',
    {
      type: 'method-selector',
      children: [{ type: 'paragraph', children: [{ type: 'text', value: 'Methods' }] }],
    },
  ],
  [
    'section with title',
    {
      type: 'section',
      children: [
        { type: 'title', children: [{ type: 'text', value: 'Section Title' }] },
        { type: 'paragraph', children: [{ type: 'text', value: 'Section body' }] },
      ],
    },
  ],
  [
    'generic ordered list',
    {
      type: 'list',
      enumtype: 'ordered',
      startat: 3,
      children: [{ type: 'listItem', children: [{ type: 'paragraph', children: [{ type: 'text', value: 'Third' }] }] }],
    },
  ],
  [
    'doc link',
    {
      type: 'doc',
      url: '/docs/page',
      children: [{ type: 'text', value: 'Doc Page' }],
    },
  ],
  [
    'ref_role link',
    {
      type: 'ref_role',
      url: '/ref/link',
      children: [{ type: 'text', value: 'Ref Link' }],
    },
  ],
  [
    'inline_target',
    {
      type: 'inline_target',
      ids: ['inline-id'],
    },
  ],
  [
    'enumerated_list',
    {
      type: 'enumerated_list',
      start: 5,
      children: [{ type: 'list_item', children: [{ type: 'paragraph', children: [{ type: 'text', value: 'Five' }] }] }],
    },
  ],
  [
    'standalone list_item',
    {
      type: 'list_item',
      children: [{ type: 'paragraph', children: [{ type: 'text', value: 'Alone item' }] }],
    },
  ],
  [
    'table head',
    {
      type: 'table_head',
      children: [
        {
          type: 'table_row',
          children: [
            {
              type: 'table_cell',
              children: [{ type: 'text', value: 'Header' }],
            },
          ],
        },
      ],
    },
  ],
  [
    'title reference',
    {
      type: 'title_reference',
      children: [{ type: 'text', value: 'Titled' }],
    },
  ],
  [
    'substitution node',
    {
      type: 'substitution',
      refname: 'product',
      children: [{ type: 'text', value: 'MongoDB' }],
    },
  ],
  [
    'directive collapsible',
    {
      type: 'directive',
      name: 'collapsible',
      options: { heading: 'Details', sub_heading: 'Click to expand', expanded: false },
      children: [{ type: 'paragraph', children: [{ type: 'text', value: 'Collapsible body' }] }],
    },
  ],
  [
    'directive facet genre',
    {
      type: 'root',
      children: [
        {
          type: 'directive',
          name: 'facet',
          options: { name: 'genre', values: 'reference' },
        },
      ],
    },
  ],
  [
    'directive facet genre and programming_language',
    {
      type: 'root',
      children: [
        {
          type: 'directive',
          name: 'facet',
          options: { name: 'genre', values: 'reference' },
        },
        {
          type: 'directive',
          name: 'facet',
          options: { name: 'programming_language', values: 'shell, python' },
        },
      ],
    },
  ],
  [
    'tabs-selector directive',
    {
      type: 'directive',
      name: 'tabs-selector',
      argument: 'drivers',
    },
  ],
  ['hidden directive (toctree)', { type: 'directive', name: 'toctree' }],
  ['unknown node type', { type: 'mystery' }],
  ['title node', { type: 'title', children: [{ type: 'text', value: 'A Title' }] }],
  ['directive figure', { type: 'directive', name: 'figure', argument: 'images/figure.png' }],
  ['directive sharedinclude', { type: 'directive', name: 'sharedinclude', argument: 'shared-file.rst' }],
  [
    'directive text (unwrapped)',
    {
      type: 'directive',
      name: 'text',
      argument: 'Plain content',
      children: [{ type: 'paragraph', children: [{ type: 'text', value: ' from children' }] }],
    },
  ],
  ['directive_argument node', { type: 'directive_argument', children: [{ type: 'text', value: 'Arg text' }] }],
  ['comment node skipped', { type: 'comment', value: 'This is a comment' }],
  ['comment_block node skipped', { type: 'comment_block', value: 'Block comment' }],
  [
    'named_reference node',
    { type: 'named_reference', refname: 'named', children: [{ type: 'text', value: 'NamedRef' }] },
  ],
  [
    'substitution_definition node',
    { type: 'substitution_definition', refname: 'prod', children: [{ type: 'text', value: 'MongoDB' }] },
  ],
  ['target_identifier', { type: 'target_identifier', ids: ['ident'] }],
  [
    'directive list-table',
    {
      type: 'directive',
      name: 'list-table',
      options: { 'header-rows': 1 },
      children: [
        {
          type: 'bullet_list',
          children: [
            {
              type: 'list_item',
              children: [
                {
                  type: 'bullet_list',
                  children: [
                    {
                      type: 'list_item',
                      children: [
                        {
                          type: 'paragraph',
                          children: [{ type: 'text', value: 'Version' }],
                        },
                      ],
                    },
                    {
                      type: 'list_item',
                      children: [
                        {
                          type: 'paragraph',
                          children: [{ type: 'text', value: 'client 1.0' }],
                        },
                      ],
                    },
                    {
                      type: 'list_item',
                      children: [
                        {
                          type: 'paragraph',
                          children: [{ type: 'text', value: 'client 2.0' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'list_item',
              children: [
                {
                  type: 'bullet_list',
                  children: [
                    {
                      type: 'list_item',
                      children: [
                        {
                          type: 'paragraph',
                          children: [{ type: 'text', value: 'DB 7.0' }],
                        },
                      ],
                    },
                    {
                      type: 'list_item',
                      children: [
                        {
                          type: 'paragraph',
                          children: [{ type: 'text', value: '✓' }],
                        },
                      ],
                    },
                    {
                      type: 'list_item',
                      children: [
                        {
                          type: 'paragraph',
                          children: [{ type: 'text', value: '✓' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'list_item',
              children: [
                {
                  type: 'bullet_list',
                  children: [
                    {
                      type: 'list_item',
                      children: [
                        {
                          type: 'paragraph',
                          children: [{ type: 'text', value: 'DB 8.0' }],
                        },
                      ],
                    },
                    {
                      type: 'list_item',
                      children: [
                        {
                          type: 'paragraph',
                          children: [{ type: 'text', value: '✓' }],
                        },
                      ],
                    },
                    {
                      type: 'list_item',
                      children: [
                        {
                          type: 'paragraph',
                          children: [{ type: 'text', value: '-' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
];

describe('convertSnootyAstToMdast - node snapshots', () => {
  test.each(cases)('| %s', (_, ast) => {
    const { mdx } = convertSnootyAst({ ast });
    expect(mdx).toMatchSnapshot();
  });
});
