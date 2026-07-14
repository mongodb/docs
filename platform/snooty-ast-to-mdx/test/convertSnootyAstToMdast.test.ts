/**
 * This test suite should be used for tests that
 * require more granularity than simple snapshots.
 */

import yaml from 'yaml';
import { convertSnootyAst } from './utils';
import { convertMdastToMdx } from '../src/core/convertMdastToMdx';
import { buildSubstitutionRefXrefMap } from '../src/core/convertSnootyAstToMdast/convertSnootyAstToMdast';
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

  it('converts instruqt directive to Instruqt with embedValue prop (not children)', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'directive',
          name: 'instruqt',
          argument: [{ type: 'text', value: '/mongodb-docs/tracks/getting-started-with-mongodb-v2?token=em_abc' }],
          options: { title: 'Getting Started Lab', drawer: true },
        },
      ],
    };
    const { mdx } = convertSnootyAst({ ast });
    expect(mdx).toContain('embedValue="/mongodb-docs/tracks/getting-started-with-mongodb-v2?token=em_abc"');
    expect(mdx).toContain('title="Getting Started Lab"');
    expect(mdx).toMatch(/drawer=\{true\}/);
    // Embed path must not be emitted as a paragraph / loose text
    expect(mdx).not.toMatch(/<p>\s*\/mongodb-docs\/tracks/);
  });

  it('emits community-driver label as inline text so MDX does not wrap it in <p>', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'directive',
          name: 'community-driver',
          argument: [{ type: 'text', value: 'MongoEngine for Flask' }],
          options: { url: 'https://mongoengine.org/' },
        },
      ],
    };
    const { mdx } = convertSnootyAst({ ast });
    expect(mdx).toContain('url="https://mongoengine.org/"');
    // Label must be inline — no newline between the opening tag and the text
    expect(mdx).toMatch(/<CommunityDriver[^>]*>MongoEngine for Flask<\/CommunityDriver>/);
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

  it('collects meta directive inside a section into frontmatter', () => {
    // .. meta:: can appear below the page heading (inside the first section)
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'section',
          children: [
            { type: 'title', children: [{ type: 'text', value: 'Page Title' }] },
            {
              type: 'directive',
              name: 'meta',
              options: { description: 'Section-level description', robots: 'noindex' },
            },
            { type: 'paragraph', children: [{ type: 'text', value: 'Body content.' }] },
          ],
        },
      ],
    };
    const { mdx } = convertSnootyAst({ ast });

    const frontmatter = yaml.parse(mdx.split('---')[1]);

    expect(frontmatter.description).toBe('Section-level description');
    expect(frontmatter.robots).toBe('noindex');
    // The meta directive must not appear as rendered content
    expect(mdx).not.toContain('<Meta');
  });

  it('collects twitter directive into a nested twitter frontmatter object and excludes it from content', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'directive',
          name: 'twitter',
          options: {
            creator: '@mongodb',
            image: 'https://example.com/og.png',
            'image-alt': 'MongoDB logo',
            site: '@mongodb',
            title: 'Twitter card title',
          },
        },
        { type: 'paragraph', children: [{ type: 'text', value: 'Page body.' }] },
      ],
    };
    const { mdx } = convertSnootyAst({ ast });

    const frontmatter = yaml.parse(mdx.split('---')[1]);

    expect(frontmatter.twitter).toEqual({
      creator: '@mongodb',
      image: 'https://example.com/og.png',
      'image-alt': 'MongoDB logo',
      site: '@mongodb',
      title: 'Twitter card title',
    });
    // The directive must not bleed into rendered content
    expect(mdx).not.toContain('<Twitter');
    expect(mdx).toContain('Page body.');
  });

  it('collects partial twitter options and omits undefined fields from frontmatter', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'directive',
          name: 'twitter',
          options: { creator: '@mongodb', title: 'Card title' },
        },
      ],
    };
    const { mdx } = convertSnootyAst({ ast });

    const frontmatter = yaml.parse(mdx.split('---')[1]);

    expect(frontmatter.twitter).toEqual({ creator: '@mongodb', title: 'Card title' });
    expect(frontmatter.twitter.image).toBeUndefined();
    expect(frontmatter.twitter['image-alt']).toBeUndefined();
  });

  it('collects twitter directive from inside a section into frontmatter', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'section',
          children: [
            { type: 'title', children: [{ type: 'text', value: 'Page Title' }] },
            {
              type: 'directive',
              name: 'twitter',
              options: { site: '@mongodb', title: 'Section twitter' },
            },
          ],
        },
      ],
    };
    const { mdx } = convertSnootyAst({ ast });

    const frontmatter = yaml.parse(mdx.split('---')[1]);

    expect(frontmatter.twitter?.site).toBe('@mongodb');
    expect(frontmatter.twitter?.title).toBe('Section twitter');
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
    expect(outfilePath).toBe('_includes/included-file.mdx');
    expect(mdastRoot).toHaveProperty('type', 'root');

    expect(mdx).toBe(`<Include src="/_includes/included-file" />`);
  });

  it('inlines a sliced include instead of emitting a shared file (multi-slice collision)', () => {
    // mapReduce.txt includes parameters-map-reduce.rst multiple ways. The parser resolves each
    // slice into node.children. Emitting a shared _includes/parameters-map-reduce.mdx keyed only
    // by source path would collide (dedupe keeps the first, so reduce/finalize render "map").
    // Sliced includes must be inlined directly, like literalinclude — no file, no <Include>.
    const makeSlicedInclude = (startAfter: string, endBefore: string, body: string): SnootyNode => ({
      type: 'directive',
      name: 'include',
      argument: '/includes/parameters-map-reduce.rst',
      options: { 'start-after': startAfter, 'end-before': endBefore },
      children: [{ type: 'paragraph', children: [{ type: 'text', value: body }] }],
    });
    const ast: SnootyNode = {
      type: 'root',
      children: [
        makeSlicedInclude('start-map', 'end-map', 'map slice content'),
        makeSlicedInclude('start-reduce', 'end-reduce', 'reduce slice content'),
        makeSlicedInclude('start-finalize', 'end-finalize', 'finalize slice content'),
      ],
    };
    const onEmitMdxFile = jest.fn();
    const { mdx } = convertSnootyAst({ ast, onEmitMdxFile });

    // No include file emitted and no <Include> reference for sliced includes.
    expect(onEmitMdxFile).not.toHaveBeenCalled();
    expect(mdx).not.toContain('<Include');
    // Each slice is inlined with its own distinct content (not a duplicate of the first).
    expect(mdx).toContain('map slice content');
    expect(mdx).toContain('reduce slice content');
    expect(mdx).toContain('finalize slice content');
  });

  it('buildSubstitutionRefXrefMap records ref_role with name label (Snooty std :ref: for .. |alias| replace:: :ref:)', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'substitution_definition',
          refname: 'area-of-query-ref',
          children: [
            {
              type: 'ref_role',
              name: 'label',
              domain: 'std',
              target: 'avs-areas-of-query',
              fileid: ['query/explain', 'std-label-avs-areas-of-query'],
              children: [{ type: 'text', value: 'areas of query' }],
            },
          ],
        },
      ],
    };
    expect(buildSubstitutionRefXrefMap(ast).get('area-of-query-ref')).toEqual({
      refTargetKey: 'avs-areas-of-query',
      title: 'areas of query',
      href: 'query/explain#std-label-avs-areas-of-query',
    });
  });

  it('buildSubstitutionRefXrefMap records substitution_definition whose body is a reference node (ids)', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'substitution_definition',
          refname: 'area-of-query-ref',
          children: [
            {
              type: 'reference',
              ids: ['avs-areas-of-query'],
              children: [{ type: 'text', value: 'areas of query' }],
            },
          ],
        },
      ],
    };
    expect(buildSubstitutionRefXrefMap(ast).get('area-of-query-ref')).toEqual({
      refTargetKey: 'avs-areas-of-query',
      title: 'areas of query',
    });
  });

  it('page-local literal substitution wins over a same-named xref catalog entry from elsewhere', () => {
    // Reproduces the autocomplete-type heading bug: |fts-field-type| is defined globally as an xref
    // (:ref:`dateFacet`) — which lands in the name-keyed xref catalog — but THIS page redefines it
    // locally as ``autocomplete``. The page-content occurrence (here, a heading) resolves to the
    // local literal in Snooty, and the converter must emit that, not the cross-scope catalog xref.
    const ast: SnootyNode = {
      type: 'root',
      children: [
        // Cross-scope xref definition that populates the catalog (e.g. from the facet page).
        {
          type: 'substitution_definition',
          refname: 'fts-field-type',
          children: [
            {
              type: 'ref_role',
              name: 'label',
              domain: 'std',
              target: 'bson-data-types-date-facet',
              fileid: ['atlas-search/field-types/date-facet-type', 'std-label-bson-data-types-date-facet'],
              children: [{ type: 'text', value: 'dateFacet' }],
            },
          ],
        },
        // Page-local override as a plain literal.
        {
          type: 'substitution_definition',
          refname: 'fts-field-type',
          children: [{ type: 'literal', children: [{ type: 'text', value: 'autocomplete' }] }],
        },
        // Heading using the alias; Snooty resolved it to the local literal.
        {
          type: 'heading',
          depth: 2,
          children: [
            { type: 'text', value: 'Define the Index for the ' },
            {
              type: 'substitution_reference',
              name: 'fts-field-type',
              children: [{ type: 'literal', children: [{ type: 'text', value: 'autocomplete' }] }],
            },
            { type: 'text', value: ' Type' },
          ],
        },
      ],
    };
    const { mdx } = convertSnootyAst({ ast });

    // The heading must carry the local value, not the cross-scope catalog xref.
    expect(mdx).toContain('autocomplete');
    expect(mdx).not.toContain('bson-data-types-date-facet');
    expect(mdx).not.toContain('dateFacet');
    // The local definition is inline code (``autocomplete``), so the heading must preserve that
    // formatting by inlining the resolved children — not flatten it to a plain `value` string
    // (which the runtime renders as unstyled text).
    expect(mdx).toContain('Define the Index for the `autocomplete` Type');
    expect(mdx).not.toContain('value="autocomplete"');
  });

  it('substitution_reference with expanded reference node emits Reference name + title (not type substitution)', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'substitution_reference',
              refname: 'area-of-query-ref',
              children: [
                {
                  type: 'reference',
                  ids: ['avs-areas-of-query'],
                  fileid: ['query/explain', 'std-label-avs-areas-of-query'],
                  children: [{ type: 'text', value: 'areas of query' }],
                },
              ],
            },
          ],
        },
      ],
    };
    const { mdx } = convertSnootyAst({ ast });
    expect(mdx).toContain('name="avs-areas-of-query"');
    expect(mdx).toContain('title="areas of query"');
    expect(mdx).not.toContain('type="substitution"');
  });

  it('substitution_reference with expanded external reference (refuri) emits markdown link, not Reference substitution', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            { type: 'text', value: 'See the ' },
            {
              type: 'substitution_reference',
              refname: 'hnsw',
              children: [
                {
                  type: 'reference',
                  refuri: 'https://arxiv.org/abs/1603.09320',
                  children: [{ type: 'text', value: 'Hierarchical Navigable Small Worlds' }],
                },
              ],
            },
            { type: 'text', value: ' graph.' },
          ],
        },
      ],
    };
    const { mdast, mdx } = convertSnootyAst({ ast });
    expect(mdx).toContain('[Hierarchical Navigable Small Worlds](https://arxiv.org/abs/1603.09320)');
    expect(mdx).not.toContain('type="substitution"');
    expect(mdx).not.toContain('refKey="hnsw"');
    const refs = mdast.__references as ReferencesArtifact;
    expect(refs?.substitutions?.['hnsw']).toEqual({
      text: 'Hierarchical Navigable Small Worlds',
      url: 'https://arxiv.org/abs/1603.09320',
    });
  });

  it('snooty.toml external link substitution (name field, no refname) emits link and stores { text, url } in refs', () => {
    // snooty.toml: vercel = "`Vercel <https://www.vercel.com/>`__"
    // Snooty postprocessor sets substitution_reference.children to the parsed Reference node
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            { type: 'text', value: 'Deploy using ' },
            {
              type: 'substitution_reference',
              name: 'vercel',
              children: [
                {
                  type: 'reference',
                  refuri: 'https://www.vercel.com/',
                  children: [{ type: 'text', value: 'Vercel' }],
                },
              ],
            },
            { type: 'text', value: '.' },
          ],
        },
      ],
    };
    const { mdast, mdx } = convertSnootyAst({ ast });
    expect(mdx).toContain('[Vercel](https://www.vercel.com/)');
    expect(mdx).not.toContain('type="substitution"');
    expect(mdx).not.toContain('refKey="vercel"');
    const refs = mdast.__references as ReferencesArtifact;
    expect(refs?.substitutions?.['vercel']).toEqual({ text: 'Vercel', url: 'https://www.vercel.com/' });
  });

  it('catalog resolves xref when substitution_definition ref_role has target but no fileid (no href yet)', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'substitution_definition',
          refname: 'area-ref',
          children: [
            {
              type: 'ref_role',
              name: 'ref',
              target: 'avs-areas-of-query',
              children: [{ type: 'text', value: 'area' }],
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'substitution_reference',
              refname: 'area-ref',
              children: [{ type: 'text', value: 'area' }],
            },
          ],
        },
      ],
    };
    const { mdast } = convertSnootyAst({ ast });
    expect(convertMdastToMdx(mdast)).toContain('name="avs-areas-of-query"');
    expect(convertMdastToMdx(mdast)).toContain('title="area"');
  });

  it('passes :pipeline: substitution_definition into Include body as linked Reference (empty substitution_reference)', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'substitution_definition',
          refname: 'search-stage',
          children: [
            {
              type: 'ref_role',
              name: 'pipeline',
              target: 'pipe.$vectorSearch',
              fileid: ['query/aggregation-stages/vector-search-stage', 'mongodb-pipeline-pipe.-vectorSearch'],
              children: [{ type: 'literal', value: '$vectorSearch' }],
            },
          ],
        },
        {
          type: 'directive',
          name: 'include',
          argument: [{ type: 'text', value: '/_includes/quick-start/facts/prereqs.txt' }],
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'substitution_reference',
                  refname: 'search-stage',
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    };
    const onEmitMdxFile = jest.fn();
    const { mdx } = convertSnootyAst({ ast, onEmitMdxFile });
    expect(onEmitMdxFile).toHaveBeenCalledTimes(1);
    const [{ mdastRoot }] = onEmitMdxFile.mock.calls[0];
    const includedMdx = convertMdastToMdx(mdastRoot as Parameters<typeof convertMdastToMdx>[0]).trim();
    expect(includedMdx).toContain('name="pipe.$vectorSearch"');
    expect(includedMdx).toContain('title="$vectorSearch"');
    expect(includedMdx).not.toContain('type="substitution"');
    expect(mdx).toBe(`<Include src="/_includes/quick-start/facts/prereqs" />`);
    const refs = (mdastRoot as { __references?: ReferencesArtifact }).__references;
    expect(refs?.substitutions?.['search-stage']).toBe('$vectorSearch');
    expect(refs?.refs?.['pipe.$vectorSearch']).toBe(
      'query/aggregation-stages/vector-search-stage#mongodb-pipeline-pipe.-vectorSearch',
    );
  });

  it('resolves substitution_reference with empty children using :pipeline: substitution_definition (linked catalog)', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'substitution_definition',
          refname: 'search-stage',
          children: [
            {
              type: 'ref_role',
              name: 'pipeline',
              target: 'pipe.$vectorSearch',
              fileid: ['query/aggregation-stages/vector-search-stage', 'mongodb-pipeline-pipe.-vectorSearch'],
              children: [{ type: 'literal', value: '$vectorSearch' }],
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'substitution_reference',
              refname: 'search-stage',
              children: [],
            },
          ],
        },
      ],
    };
    const { mdast } = convertSnootyAst({ ast });
    const mdx = convertMdastToMdx(mdast);
    expect(mdx).toContain('name="pipe.$vectorSearch"');
    expect(mdx).toContain('title="$vectorSearch"');
    expect(mdx).not.toContain('type="substitution"');
    const refs = mdast.__references as ReferencesArtifact;
    expect(refs?.substitutions?.['search-stage']).toBe('$vectorSearch');
    expect(refs?.refs?.['pipe.$vectorSearch']).toBe(
      'query/aggregation-stages/vector-search-stage#mongodb-pipeline-pipe.-vectorSearch',
    );
  });

  it('resolves :pipeline: without target as plain type="substitution" (literal fallback)', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'substitution_definition',
          refname: 'search-stage',
          children: [
            {
              type: 'role',
              name: 'pipeline',
              children: [{ type: 'literal', value: '$vectorSearch' }],
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'substitution_reference',
              refname: 'search-stage',
              children: [],
            },
          ],
        },
      ],
    };
    const { mdast } = convertSnootyAst({ ast });
    const mdx = convertMdastToMdx(mdast);
    expect(mdx).toContain('refKey="search-stage"');
    expect(mdx).toContain('type="substitution"');
    const refs = mdast.__references as ReferencesArtifact;
    expect(refs?.substitutions?.['search-stage']).toBe('$vectorSearch');
  });

  it('resolves text-only substitution_reference using catalog from substitution_definition (include-file shape)', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'substitution_definition',
          refname: 'area-ref',
          children: [
            {
              type: 'ref_role',
              name: 'ref',
              target: 'avs-areas-of-query',
              fileid: ['query/explain', 'std-label-avs-areas-of-query'],
              children: [{ type: 'text', value: 'area' }],
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'substitution_reference',
              refname: 'area-ref',
              children: [{ type: 'text', value: 'area' }],
            },
          ],
        },
      ],
    };
    const { mdast } = convertSnootyAst({ ast });
    const mdx = convertMdastToMdx(mdast);
    expect(mdx).toContain('name="avs-areas-of-query"');
    expect(mdx).toContain('title="area"');
    expect(mdx).not.toContain('type="substitution"');
    const refs = mdast.__references as ReferencesArtifact;
    expect(refs?.refs['avs-areas-of-query']).toBe('query/explain#std-label-avs-areas-of-query');
  });

  it('emits canonical Reference name/title when substitution_reference expands to :ref:', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'substitution_reference',
              refname: 'area-ref',
              children: [
                {
                  type: 'ref_role',
                  name: 'ref',
                  target: 'avs-areas-of-query',
                  fileid: ['query/explain', 'std-label-avs-areas-of-query'],
                  children: [{ type: 'text', value: 'area' }],
                },
              ],
            },
          ],
        },
      ],
    };
    const { mdast } = convertSnootyAst({ ast });
    const emittedMdx = convertMdastToMdx(mdast);
    expect(emittedMdx).toContain('name="avs-areas-of-query"');
    expect(emittedMdx).toContain('title="area"');
    expect(emittedMdx).not.toContain('refTarget=');
    expect(emittedMdx).not.toContain('refKey=');
    expect(emittedMdx).not.toContain('type="substitution"');
    const refs = mdast.__references as ReferencesArtifact;
    expect(refs?.substitutions).toHaveProperty('area-ref', 'area');
    expect(refs?.refs).toHaveProperty('avs-areas-of-query', 'query/explain#std-label-avs-areas-of-query');
  });

  it('emits RefRole when substitution_reference expands to a typed role (:binary:, :authrole:, etc.)', () => {
    // Verifies |mongos| / |mongod| style substitutions that expand to :binary:`…`
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'substitution_reference',
              refname: 'mongos',
              children: [
                {
                  type: 'ref_role',
                  name: 'binary',
                  target: 'bin.mongos',
                  url: 'https://www.mongodb.com/docs/manual/reference/program/mongos/#mongodb-binary-bin.mongos',
                  children: [{ type: 'literal', value: 'mongos' }],
                },
              ],
            },
          ],
        },
      ],
    };
    const { mdx, mdast } = convertSnootyAst({ ast });
    expect(mdx).toContain('<RefRole');
    expect(mdx).toContain('type="binary"');
    expect(mdx).toContain('name="bin.mongos"');
    expect(mdx).not.toContain('type="substitution"');
    expect(mdx).not.toContain('refKey=');
    // The URL must be collected into _references.json so the link resolves at render time.
    const refs = (mdast.__references as ReferencesArtifact)?.refs;
    expect(refs).toHaveProperty(
      ['bin.mongos'],
      'https://www.mongodb.com/docs/manual/reference/program/mongos/#mongodb-binary-bin.mongos',
    );
  });

  it('resolves typed-role substitution_reference via catalog when children are empty (include file)', () => {
    // Verifies |mongos| in a plain include resolves via the xref catalog built from the page's definitions.
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'substitution_definition',
          name: 'mongos',
          children: [
            {
              type: 'ref_role',
              name: 'binary',
              target: 'bin.mongos',
              children: [{ type: 'literal', value: 'mongos' }],
            },
          ],
        },
        {
          type: 'directive',
          name: 'include',
          argument: 'some-include.rst',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'substitution_reference',
                  refname: 'mongos',
                  children: [], // empty in include body — definition lives on parent page
                },
              ],
            },
          ],
        },
      ],
    };
    const onEmitMdxFile = jest.fn();
    convertSnootyAst({ ast, onEmitMdxFile });

    expect(onEmitMdxFile).toHaveBeenCalledTimes(1);
    const [{ mdastRoot }] = onEmitMdxFile.mock.calls[0];
    const emittedMdx = convertMdastToMdx(mdastRoot);
    expect(emittedMdx).toContain('<RefRole');
    expect(emittedMdx).toContain('type="binary"');
    expect(emittedMdx).toContain('name="bin.mongos"');
    expect(emittedMdx).not.toContain('type="substitution"');
  });

  it('emits refKey + refTarget + replacement when substitution_reference is :ref: inside replacement-slot include body', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'substitution_reference',
              refname: 'area-ref',
              children: [
                {
                  type: 'ref_role',
                  name: 'ref',
                  target: 'areas-of-query',
                  fileid: ['atlas-search/explain', 'std-label-areas-of-query'],
                  children: [{ type: 'text', value: 'area' }],
                },
              ],
            },
          ],
        },
      ],
    };
    const { mdast } = convertSnootyAst({ ast, emitSubstitutionReferencesAsReplacement: true });
    const emittedMdx = convertMdastToMdx(mdast);
    expect(emittedMdx).toContain('refTarget="areas-of-query"');
    expect(emittedMdx).toContain('refKey="area-ref"');
    expect(emittedMdx).toContain('type="replacement"');
    expect(emittedMdx).not.toContain('name="areas-of-query"');
  });

  it('emits substitution_reference in plain include body as type substitution (for _references.json)', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'directive',
          name: 'include',
          argument: 'nav/steps.rst',
          children: [
            {
              type: 'paragraph',
              children: [
                { type: 'text', value: 'In ' },
                {
                  type: 'substitution_reference',
                  refname: 'service',
                  children: [{ type: 'text', value: 'Atlas' }],
                },
              ],
            },
          ],
        },
      ],
    };
    const onEmitMdxFile = jest.fn();
    const { mdx } = convertSnootyAst({ ast, onEmitMdxFile });

    // Include file: type="substitution", no baked-in value (suppressed so slots take precedence)
    expect(onEmitMdxFile).toHaveBeenCalledTimes(1);
    const [{ mdastRoot }] = onEmitMdxFile.mock.calls[0];
    const emittedMdx = convertMdastToMdx(mdastRoot);
    expect(emittedMdx).toContain('type="substitution"');
    expect(emittedMdx).not.toContain('type="replacement"');
    expect(emittedMdx).not.toContain('value="Atlas"');
    const refs = (mdastRoot as { __references?: ReferencesArtifact }).__references;
    expect(refs?.substitutions).toHaveProperty('service', 'Atlas');

    // Calling page: <Include> carries a <Replacement> slot with the page-specific value
    expect(mdx).toContain('<Include src="/_includes/nav/steps"');
    expect(mdx).toContain('<Replacement name="service">');
    expect(mdx).toContain('Atlas');
  });

  it('plain include <Replacement> slot uses page-level substitution_definition, not Snooty-resolved global default', () => {
    // Reproduces the Search docs issue: |fts-field-type| is defined per-page (e.g. ``geo``) but
    // Snooty resolves it inside includes against the global references file (e.g. "dateFacet").
    // The <Replacement> slot on the <Include> must carry the page-level value, not the global one.
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'substitution_definition',
          refname: 'fts-field-type',
          children: [{ type: 'literal', value: 'geo' }],
        },
        {
          type: 'directive',
          name: 'include',
          argument: 'search/field-types.rst',
          children: [
            {
              type: 'paragraph',
              children: [
                { type: 'text', value: 'Field type: ' },
                {
                  type: 'substitution_reference',
                  refname: 'fts-field-type',
                  // Snooty resolved this against the global default, not the page definition
                  children: [{ type: 'text', value: 'dateFacet' }],
                },
              ],
            },
          ],
        },
      ],
    };
    const onEmitMdxFile = jest.fn();
    const { mdx } = convertSnootyAst({ ast, onEmitMdxFile });

    // The <Replacement> slot should carry the page-level value (geo as inline code)
    expect(mdx).toContain('<Include src="/_includes/search/field-types"');
    expect(mdx).toContain('<Replacement name="fts-field-type">');
    expect(mdx).toContain('`geo`');
    // Must NOT carry the global default
    expect(mdx).not.toContain('dateFacet');
  });

  it('plain include <Replacement> slot uses page-level literal even when Snooty resolved a :ref: xref globally', () => {
    // Same scenario as above, but the global Snooty definition is a :ref: cross-reference
    // (ref_role node) rather than plain text. The include body must emit
    // <Reference refKey="fts-field-type" type="substitution" /> so the page's <Replacement>
    // can override the baked xref target.
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'substitution_definition',
          refname: 'fts-field-type',
          children: [{ type: 'literal', value: 'geo' }],
        },
        {
          type: 'directive',
          name: 'include',
          argument: 'search/field-types.rst',
          children: [
            {
              type: 'paragraph',
              children: [
                { type: 'text', value: 'Field type: ' },
                {
                  type: 'substitution_reference',
                  refname: 'fts-field-type',
                  // Snooty resolved this as a :ref: xref (ref_role), not the page's literal
                  children: [
                    {
                      type: 'ref_role',
                      target: 'bson-data-types-date-facet',
                      children: [{ type: 'text', value: 'dateFacet' }],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
    const onEmitMdxFile = jest.fn();
    const { mdx } = convertSnootyAst({ ast, onEmitMdxFile });

    // Include file should use substitution placeholder, not the baked xref
    expect(onEmitMdxFile).toHaveBeenCalledTimes(1);
    const [{ mdastRoot }] = onEmitMdxFile.mock.calls[0];
    const includeMdx = convertMdastToMdx(mdastRoot);
    expect(includeMdx).toContain('refKey="fts-field-type"');
    expect(includeMdx).toContain('type="substitution"');
    expect(includeMdx).not.toContain('bson-data-types-date-facet');
    expect(includeMdx).not.toContain('dateFacet');

    // Calling page: <Replacement> slot carries the page-specific literal value
    expect(mdx).toContain('<Include src="/_includes/search/field-types"');
    expect(mdx).toContain('<Replacement name="fts-field-type">');
    expect(mdx).toContain('`geo`');
    expect(mdx).not.toContain('dateFacet');
  });

  it('plain include suppresses typed-role substitution and emits substitution placeholder (YAML extract case)', () => {
    // Reproduces the aggregate.txt / 4.2-changes-disconnect.rst bug.
    // |operation| is defined on the page as :dbcommand:`aggregate` (a typed ref role).
    // Snooty resolves the include body against the current page, so subChildren are correct here.
    // But the _includes file is shared: if another page processes the same include last, it
    // overwrites the file with its own |operation| value. The fix: always emit a substitution
    // placeholder in the _includes file so the per-page <Replacement> slot provides the value.
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'substitution_definition',
          refname: 'operation',
          children: [
            {
              type: 'ref_role',
              name: 'dbcommand',
              target: 'dbcmd.aggregate',
              children: [{ type: 'literal', value: 'aggregate' }],
            },
          ],
        },
        {
          type: 'directive',
          name: 'include',
          argument: 'includes/extracts/4.2-changes-disconnect.rst',
          children: [
            {
              type: 'paragraph',
              children: [
                { type: 'text', value: 'If the client that issued ' },
                {
                  type: 'substitution_reference',
                  refname: 'operation',
                  // Snooty resolved this for the current page: :dbcommand:`aggregate`
                  children: [
                    {
                      type: 'ref_role',
                      name: 'dbcommand',
                      target: 'dbcmd.aggregate',
                      children: [{ type: 'literal', value: 'aggregate' }],
                    },
                  ],
                },
                { type: 'text', value: ' disconnects.' },
              ],
            },
          ],
        },
      ],
    };
    const onEmitMdxFile = jest.fn();
    const { mdx } = convertSnootyAst({ ast, onEmitMdxFile });

    // _includes file: substitution placeholder — never bake the typed ref role
    expect(onEmitMdxFile).toHaveBeenCalledTimes(1);
    const [{ mdastRoot }] = onEmitMdxFile.mock.calls[0];
    const includeMdx = convertMdastToMdx(mdastRoot);
    expect(includeMdx).toContain('refKey="operation"');
    expect(includeMdx).toContain('type="substitution"');
    expect(includeMdx).not.toContain('<RefRole');

    // Calling page: <Replacement> slot carries the page's typed ref role value
    expect(mdx).toContain('<Include src="/_includes/extracts/4.2-changes-disconnect"');
    expect(mdx).toContain('<Replacement name="operation">');
    expect(mdx).toContain('dbcmd.aggregate');
  });

  it('emits substitution_reference in include body as Reference type replacement (not _references)', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'directive',
          name: 'include',
          argument: 'chunk.rst',
          children: [
            {
              type: 'directive',
              name: 'replacement',
              argument: 'field',
              children: [{ type: 'paragraph', children: [{ type: 'text', value: 'MyType' }] }],
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', value: 'Use ' },
                {
                  type: 'substitution_reference',
                  refname: 'field',
                  children: [{ type: 'text', value: 'PLACEHOLDER' }],
                },
              ],
            },
          ],
        },
      ],
    };
    const onEmitMdxFile = jest.fn();
    const { mdx } = convertSnootyAst({ ast, onEmitMdxFile });

    expect(onEmitMdxFile).toHaveBeenCalledTimes(1);
    const [{ mdastRoot }] = onEmitMdxFile.mock.calls[0];
    const emittedMdx = convertMdastToMdx(mdastRoot);
    expect(emittedMdx).toContain('type="replacement"');
    expect(emittedMdx).not.toContain('type="substitution"');
    expect((mdastRoot as { __references?: ReferencesArtifact }).__references).toBeUndefined();

    expect(mdx).toContain('<Replacement name="field">');
    expect(mdx).toContain('<Include src="/_includes/chunk"');
  });

  it('bakes resolved substitution text into value attribute so per-page values are preserved', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'substitution_reference',
              refname: 'idp-provider',
              children: [{ type: 'text', value: 'Google Workspace' }],
            },
          ],
        },
      ],
    };
    const { mdx } = convertSnootyAst({ ast });

    expect(mdx).toContain('refKey="idp-provider"');
    expect(mdx).toContain('type="substitution"');
    expect(mdx).toContain('value="Google Workspace"');
  });

  it('does not emit value attribute on replacement-type references (slot bodies)', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'directive',
          name: 'include',
          argument: 'chunk.rst',
          children: [
            {
              type: 'directive',
              name: 'replacement',
              argument: 'field',
              children: [{ type: 'paragraph', children: [{ type: 'text', value: 'MyType' }] }],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'substitution_reference',
                  refname: 'field',
                  children: [{ type: 'text', value: 'PLACEHOLDER' }],
                },
              ],
            },
          ],
        },
      ],
    };
    const onEmitMdxFile = jest.fn();
    convertSnootyAst({ ast, onEmitMdxFile });

    const [{ mdastRoot }] = onEmitMdxFile.mock.calls[0];
    const emittedMdx = convertMdastToMdx(mdastRoot);
    expect(emittedMdx).toContain('type="replacement"');
    expect(emittedMdx).not.toContain('value="PLACEHOLDER"');
  });

  it('emits Replacement slots for link-valued substitutions in plain include content', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'directive',
          name: 'include',
          argument: 'shared/provider.rst',
          children: [
            {
              type: 'paragraph',
              children: [
                { type: 'text', value: 'See ' },
                {
                  type: 'substitution_reference',
                  refname: 'ldap-provider-link',
                  children: [
                    {
                      type: 'reference',
                      refuri: 'https://okta.com',
                      children: [{ type: 'text', value: 'Okta' }],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
    const onEmitMdxFile = jest.fn();
    const { mdx } = convertSnootyAst({ ast, onEmitMdxFile });

    // Include file: type="substitution", no baked-in value
    const [{ mdastRoot }] = onEmitMdxFile.mock.calls[0];
    const emittedMdx = convertMdastToMdx(mdastRoot);
    expect(emittedMdx).toContain('type="substitution"');
    expect(emittedMdx).not.toContain('value=');

    // Calling page: <Replacement> slot carries the link, not stripped text
    expect(mdx).toContain('<Replacement name="ldap-provider-link">');
    expect(mdx).toContain('Okta');
    expect(mdx).toContain('https://okta.com');
  });

  it('propagates per-page substitution values through nested shared includes via placeholder slots', () => {
    // Reproduces the reference/command.txt collision: |fts-index| is only *used* inside a
    // description include that is itself nested inside a shared table include. Multiple pages
    // include that same table with different |fts-index| definitions, so the shared table.mdx must
    // NOT bake a single value (last-writer-wins on disk). Instead the shared file emits a
    // `<Reference type="replacement">` placeholder and each top page carries its own value on its
    // `<Include>` slot, which propagates down to the placeholder at runtime.
    const LINK_URL = 'https://www.mongodb.com/docs/atlas/atlas-search/atlas-search-overview/#fts-indexes';

    // The description include is shared; it is the same regardless of which page includes it.
    const descriptionInclude = (resolvedChildren: SnootyNode[]): SnootyNode => ({
      // Outer include (the table) — carries no substitution refs of its own.
      type: 'directive',
      name: 'include',
      argument: 'atlas-search-commands/atlas-search-command-table.rst',
      children: [
        {
          // Inner include (the row description) — this is where |fts-index| is actually used.
          type: 'directive',
          name: 'include',
          argument: 'atlas-search-commands/command-descriptions/updateSearchIndex-description.rst',
          children: [
            {
              type: 'paragraph',
              children: [
                { type: 'text', value: 'Updates an existing ' },
                { type: 'substitution_reference', refname: 'fts-index', children: resolvedChildren },
                { type: 'text', value: '.' },
              ],
            },
          ],
        },
      ],
    });

    // Page A defines |fts-index| as a link (mirrors :atlas:`MongoDB Search index </.../#fts-indexes>`).
    const linkPage: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'substitution_definition',
          refname: 'fts-index',
          children: [{ type: 'reference', refuri: LINK_URL, children: [{ type: 'text', value: 'MongoDB Search index' }] }],
        },
        descriptionInclude([
          { type: 'reference', refuri: LINK_URL, children: [{ type: 'text', value: 'MongoDB Search index' }] },
        ]),
      ],
    };

    // Page B defines |fts-index| as plain text (mirrors release-notes/7.0.txt).
    const plainPage: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'substitution_definition',
          refname: 'fts-index',
          children: [{ type: 'text', value: 'MongoDB Search index' }],
        },
        descriptionInclude([{ type: 'text', value: 'MongoDB Search index' }]),
      ],
    };

    const linkEmit = jest.fn();
    const { mdx: linkPageMdx } = convertSnootyAst({ ast: linkPage, onEmitMdxFile: linkEmit });

    const plainEmit = jest.fn();
    const { mdx: plainPageMdx } = convertSnootyAst({ ast: plainPage, onEmitMdxFile: plainEmit });

    // The shared table.mdx must be caller-agnostic: a placeholder, NOT a baked value.
    const getTableMdx = (emit: jest.Mock) => {
      const call = emit.mock.calls.find(([{ outfilePath }]) =>
        String(outfilePath).includes('atlas-search-command-table'),
      );
      expect(call).toBeDefined();
      return convertMdastToMdx(call![0].mdastRoot);
    };
    for (const tableMdx of [getTableMdx(linkEmit), getTableMdx(plainEmit)]) {
      expect(tableMdx).toContain('<Replacement name="fts-index">');
      expect(tableMdx).toContain('refKey="fts-index"');
      expect(tableMdx).toContain('type="replacement"');
      // Caller-agnostic: no baked value (neither the link nor inline `value=`).
      expect(tableMdx).not.toContain(LINK_URL);
      expect(tableMdx).not.toContain('value=');
    }

    // The shared description.mdx stays a plain substitution reference (no baked value).
    const descCall = linkEmit.mock.calls.find(([{ outfilePath }]) =>
      String(outfilePath).includes('updateSearchIndex-description'),
    );
    expect(descCall).toBeDefined();
    const descMdx = convertMdastToMdx(descCall![0].mdastRoot);
    expect(descMdx).toContain('type="substitution"');
    expect(descMdx).not.toContain('value=');

    // Each top page carries its OWN value on its <Include table> slot.
    expect(linkPageMdx).toContain('<Replacement name="fts-index">');
    expect(linkPageMdx).toContain(LINK_URL);

    expect(plainPageMdx).toContain('<Replacement name="fts-index">');
    expect(plainPageMdx).toContain('MongoDB Search index');
    expect(plainPageMdx).not.toContain(LINK_URL);
  });

  it('wraps inline role nodes (icon, guilabel) in a fragment inside Replacement slot', () => {
    // |ui-org-menu| = ":icon-mms:`office` :guilabel:`Organizations` menu"
    // The children of the substitution_reference are inline role nodes (not wrapped in a paragraph).
    // Without the fragment wrap the MDX serializer emits each inline element on its own line
    // with blank lines between them, causing remark to re-parse them as mdxJsxFlowElement
    // (block-level) — which cannot replace an inline <Reference> at render time.
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'directive',
          name: 'include',
          argument: 'nav/steps.rst',
          children: [
            {
              type: 'paragraph',
              children: [
                { type: 'text', value: 'From the ' },
                {
                  type: 'substitution_reference',
                  refname: 'ui-org-menu',
                  children: [
                    { type: 'role', name: 'icon-mms', children: [{ type: 'text', value: 'office' }] },
                    { type: 'text', value: ' ' },
                    {
                      type: 'role',
                      name: 'guilabel',
                      children: [{ type: 'text', value: 'Organizations' }],
                    },
                    { type: 'text', value: ' menu' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
    const onEmitMdxFile = jest.fn();
    const { mdx } = convertSnootyAst({ ast, onEmitMdxFile });

    // Include file: type="substitution", no baked-in value
    const [{ mdastRoot }] = onEmitMdxFile.mock.calls[0];
    const emittedMdx = convertMdastToMdx(mdastRoot);
    expect(emittedMdx).toContain('type="substitution"');

    // Calling page: <Replacement> slot contains icon and guilabel
    expect(mdx).toContain('<Replacement name="ui-org-menu">');
    expect(mdx).toContain('<Icon');
    expect(mdx).toContain('<Guilabel>Organizations</Guilabel>');

    // The slot content must NOT have blank lines between Icon and Guilabel.
    // Blank lines would cause remark to re-parse them as block-level (mdxJsxFlowElement),
    // which cannot replace an inline <Reference> at render time.
    const replacementBlock = mdx.slice(
      mdx.indexOf('<Replacement name="ui-org-menu">'),
      mdx.indexOf('</Replacement>', mdx.indexOf('<Replacement name="ui-org-menu">')) + '</Replacement>'.length,
    );
    expect(replacementBlock).not.toMatch(/<Icon[^>]*\/>\s*\n\s*\n/);
    expect(replacementBlock).not.toMatch(/<\/Guilabel>\s*\n\s*\n/);
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

  it('ref_role doc with fileid stores path in collectedRefs without leading slash', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'ref_role',
              domain: 'std',
              name: 'doc',
              fileid: ['/configure-api-access', ''],
              children: [{ type: 'text', value: 'Get Started' }],
            },
          ],
        },
      ],
    };
    const { mdast } = convertSnootyAst({ ast });
    const refs = mdast.__references as ReferencesArtifact;
    expect(refs?.refs['configure-api-access']).toBe('configure-api-access');
  });

  it('strips the abbr expansion out of options.headings titles and recomputes matching ids', () => {
    // Mirrors the shape Snooty produces for `### :abbr:`AWS (Amazon Web Services)` Kinesis Data Stream`,
    // where the raw AST keeps the full "term (expansion)" text and a stale id derived from it.
    const ast: SnootyNode = {
      type: 'root',
      options: {
        headings: [
          {
            depth: 3,
            id: 'aws--amazon-web-services--kinesis-data-stream',
            selector_ids: {},
            title: [
              {
                type: 'role',
                name: 'abbr',
                domain: '',
                target: '',
                children: [{ type: 'text', value: 'AWS (Amazon Web Services)' }],
              },
              { type: 'text', value: ' Kinesis Data Stream' },
            ],
          },
        ],
      },
      children: [{ type: 'paragraph', children: [{ type: 'text', value: 'Body' }] }],
    };
    const { mdx } = convertSnootyAst({ ast });
    const frontmatter = yaml.parse(mdx.split('---')[1]);
    const [heading] = frontmatter.options.headings;

    // The heading title node no longer carries the parenthetical expansion...
    expect(heading.title).toEqual([{ type: 'text', value: 'AWS' }, { type: 'text', value: ' Kinesis Data Stream' }]);
    // ...and the id is derived from that corrected text, matching the rendered <Abbr> heading's anchor.
    expect(heading.id).toBe('aws-kinesis-data-stream');
  });

  it('leaves options.headings without an abbr role completely untouched, ids included', () => {
    const ast: SnootyNode = {
      type: 'root',
      options: {
        headings: [
          { depth: 2, id: 'anything', selector_ids: {}, title: [{ type: 'text', value: 'Overview' }] },
          { depth: 2, id: 'anything-2', selector_ids: {}, title: [{ type: 'text', value: 'Overview' }] },
        ],
      },
      children: [{ type: 'paragraph', children: [{ type: 'text', value: 'Body' }] }],
    };
    const { mdx } = convertSnootyAst({ ast });
    const frontmatter = yaml.parse(mdx.split('---')[1]);
    const [first, second] = frontmatter.options.headings;

    // No abbr role present, so both headings pass through with their original ids as-is.
    expect(first.id).toBe('anything');
    expect(second.id).toBe('anything-2');
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

    it('escapes < followed by a letter (e.g. generics like <T>) so MDX does not treat it as a JSX tag', () => {
      // Regression: `<T>` in link text inside a DefinitionDescription was left unescaped,
      // so MDX parsed `<T>` as an unclosed JSX element and failed to compile.
      const ast: SnootyNode = {
        type: 'root',
        children: [
          {
            type: 'definitionList',
            children: [
              {
                type: 'definitionListItem',
                term: [{ type: 'text', value: 'ObservableSubscriber' }],
                children: [
                  {
                    type: 'paragraph',
                    children: [
                      { type: 'text', value: 'The base subscriber class is the ' },
                      {
                        type: 'reference',
                        refuri: 'https://example.com/SubscriberHelpers.java',
                        children: [{ type: 'text', value: 'ObservableSubscriber<T>' }],
                      },
                      { type: 'text', value: ' that stores results.' },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      };
      const { mdx } = convertSnootyAst({ ast });

      // `<` in the link text is escaped; no raw `<T>` tag remains
      expect(mdx).toContain('ObservableSubscriber\\<T>');
      expect(mdx).not.toMatch(/ObservableSubscriber<T>/);
    });

    it('escapes a standalone < followed by a letter in plain JSX-element text', () => {
      const ast: SnootyNode = {
        type: 'root',
        children: [
          {
            type: 'directive',
            name: 'note',
            children: [{ type: 'paragraph', children: [{ type: 'text', value: 'Type is List<String> here.' }] }],
          },
        ],
      };
      const { mdx } = convertSnootyAst({ ast });

      expect(mdx).toContain('List\\<String>');
      expect(mdx).not.toMatch(/List<String>/);
    });

    it('does not double-escape < followed by whitespace (left to the stringifier)', () => {
      // Our pass skips `< ` (the negative lookahead excludes whitespace); the remark-mdx
      // stringifier escapes it to a single `\<`. The important guarantee is no doubling.
      const ast: SnootyNode = {
        type: 'root',
        children: [
          {
            type: 'directive',
            name: 'note',
            children: [{ type: 'paragraph', children: [{ type: 'text', value: 'a < b comparison' }] }],
          },
        ],
      };
      const { mdx } = convertSnootyAst({ ast });

      expect(mdx).toContain('comparison');
      expect(mdx).not.toMatch(/\\\\</);
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

  it('banner: merges mixed inline/paragraph siblings into a single inline paragraph', () => {
    // Simulates the snooty.toml [[banners]] case where inline elements (text, ref_role)
    // appear as direct siblings of paragraph nodes in the directive body.
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'directive',
          name: 'banner',
          options: { variant: 'warning' },
          children: [
            { type: 'paragraph', children: [{ type: 'text', value: 'dateFacet is outdated. Use ' }] },
            {
              type: 'ref_role',
              name: 'label',
              fileid: ['atlas-search/field-types/date-type', 'bson-data-types-date'],
              children: [{ type: 'text', value: 'date' }],
            },
            { type: 'paragraph', children: [{ type: 'text', value: ' instead.' }] },
          ],
        },
      ],
    };
    const { mdx } = convertSnootyAst({ ast });
    // Must not have blank lines between the text segments inside Banner
    expect(mdx).not.toMatch(/<Banner[\s\S]*?\n[ \t]*\n[\s\S]*?<\/Banner>/);
    // All content must be on a single logical line inside the Banner
    expect(mdx).toMatch(/dateFacet is outdated\. Use <RefRole[^>]*>date<\/RefRole> instead\./);
  });

  it('banner: preserves separate paragraphs when all children are block paragraphs', () => {
    // Simulates a banner with multiple real prose paragraphs (e.g. the python.txt pattern).
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'directive',
          name: 'banner',
          options: { variant: 'warning' },
          children: [
            { type: 'paragraph', children: [{ type: 'text', value: 'Motor is deprecated.' }] },
            {
              type: 'paragraph',
              children: [{ type: 'text', value: 'For more information, see the migration guide.' }],
            },
          ],
        },
      ],
    };
    const { mdx } = convertSnootyAst({ ast });
    // Both paragraphs must appear in the output
    expect(mdx).toMatch(/Motor is deprecated\./);
    expect(mdx).toMatch(/For more information/);
    // The two paragraphs should be separated by a blank line
    expect(mdx).toMatch(/Motor is deprecated\.\n\n[\s\S]*?For more information/);
  });

  it('banner: keeps intro text and a following list as separate blocks', () => {
    // Mirrors the real snooty.toml [[banners]] AST where an intro line is a bare text
    // node sibling of a bullet list (e.g. atlas-resource-policies). The list must NOT be
    // nested inside the intro paragraph, otherwise its first item glues onto the intro
    // sentence ("...to:- Require ...").
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'directive',
          name: 'banner',
          options: { variant: 'info' },
          children: [
            { type: 'text', value: 'As of May 2026, you can now use Atlas Resource Policies to:' },
            {
              type: 'list',
              enumtype: 'unordered',
              children: [
                { type: 'listItem', children: [{ type: 'text', value: 'Require dedicated config servers.' }] },
                { type: 'listItem', children: [{ type: 'text', value: 'Require CMK encryption at rest.' }] },
                { type: 'listItem', children: [{ type: 'text', value: 'Require database auditing.' }] },
              ],
            },
          ],
        },
      ],
    };
    const { mdx } = convertSnootyAst({ ast });
    // The intro text must not be glued to the first list item on the same line.
    // (Use [ \t] rather than \s so the check does not span the newline.)
    expect(mdx).not.toMatch(/to:[ \t]*[*-]\s*Require/);
    // The intro text ends its own line; the list follows on a later line.
    expect(mdx).toMatch(/to:[ \t]*\n[\s\S]*Require dedicated config servers\./);
    // All three list items render as proper bullets.
    expect(mdx).toMatch(/[*-]\s*Require dedicated config servers\./);
    expect(mdx).toMatch(/[*-]\s*Require CMK encryption at rest\./);
    expect(mdx).toMatch(/[*-]\s*Require database auditing\./);
  });

  it('banner: emits a lone block child as a single node (no wrapping empty paragraph)', () => {
    // When the banner body is only a block-level node (a list with no surrounding intro
    // text), hoisting collapses to a single node rather than an array. The list must
    // still render as bullets and must not be preceded by a stray empty paragraph.
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'directive',
          name: 'banner',
          options: { variant: 'info' },
          children: [
            {
              type: 'list',
              enumtype: 'unordered',
              children: [{ type: 'listItem', children: [{ type: 'text', value: 'First option.' }] }],
            },
          ],
        },
      ],
    };
    const { mdx } = convertSnootyAst({ ast });
    // The item renders as a bullet.
    expect(mdx).toMatch(/[*-]\s*First option\./);
    // The list is the first content inside the Banner, no empty line/paragraph before it.
    expect(mdx).toMatch(/<Banner variant="info">\s*[*-]\s*First option\./);
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

  it('renders footnote with inline JSX children (e.g. guilabel) without blank lines', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'footnote',
          id: '1',
          name: 'user-settings',
          children: [
            {
              type: 'paragraph',
              children: [
                { type: 'text', value: 'Click ' },
                { type: 'role', name: 'guilabel', children: [{ type: 'text', value: 'Account' }] },
                { type: 'text', value: '.' },
              ],
            },
          ],
        },
      ],
    };
    const { mdx } = convertSnootyAst({ ast });
    // All inline content must be on one line — no blank lines between text and
    // the guilabel element, which would cause unwanted <p> wrapping at runtime.
    expect(mdx).not.toMatch(/<Guilabel[\s\S]*?\n\n/);
    expect(mdx).toContain('<Guilabel>Account</Guilabel>');
    expect(mdx).toMatch(/Click <Guilabel>Account<\/Guilabel>\./);
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

  it('suppresses default-domain directive (produces no output)', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [{ type: 'directive', name: 'default-domain', argument: 'mongodb', children: [] }],
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

    it('preserves meta on no-language code block by falling back to lang "text"', () => {
      // `.. code-block::` without a language argument has no lang in the AST.
      // remark drops the meta/info string when lang is null, so we must fall back to 'text'.
      const ast: SnootyNode = {
        type: 'root',
        children: [{ type: 'code', copyable: true, emphasize_lines: [[5, 5]], value: '{\n  "key": "value"\n}' }],
      };
      const { mdx } = convertSnootyAst({ ast });
      expect(mdx).toMatch(/^```text copyable=\{true\}/m);
      expect(mdx).toContain('emphasize_lines={[5]}');
    });

    it('emits plain fenced block (no lang) when no-language code block has no meta', () => {
      const ast: SnootyNode = {
        type: 'root',
        children: [{ type: 'code', value: 'some plain text' }],
      };
      const { mdx } = convertSnootyAst({ ast });
      expect(mdx).toMatch(/^```\n/m);
      expect(mdx).not.toContain('```text');
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

    it('collapses newlines in a wrapped caption to a single space', () => {
      // A `:caption:` wrapped across multiple lines in RST arrives with embedded
      // newlines. These must collapse to spaces so the single-line fence meta does
      // not serialize a newline as `&#xA;`, which breaks acorn on re-parse.
      const ast: SnootyNode = {
        type: 'root',
        children: [{ type: 'code', lang: 'yaml', caption: 'Example: a long\n   wrapped caption', value: 'x: 1' }],
      };
      const { mdx } = convertSnootyAst({ ast });
      expect(mdx).toContain("caption={'Example: a long wrapped caption'}");
      expect(mdx).not.toContain('&#xA;');
      expect(mdx).not.toMatch(/caption=\{'[^']*\n/);
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

  describe('button directive', () => {
    it('converts button directive to flow element so it does not collapse page into a single line', () => {
      // Regression: button was emitted as mdxJsxTextElement (phrasing), which caused
      // mdast-util-to-markdown to use containerPhrasing for the root node and serialize
      // the entire page onto one line with no separators.
      const ast: SnootyNode = {
        type: 'root',
        children: [
          {
            type: 'section',
            html_id: 'overview',
            children: [
              { type: 'title', children: [{ type: 'text', value: 'Overview' }] },
              { type: 'paragraph', children: [{ type: 'text', value: 'Intro text.' }] },
              {
                type: 'directive',
                name: 'button',
                argument: [{ type: 'text', value: 'Get Started' }],
                options: { uri: 'https://example.com' },
                children: [],
              },
              { type: 'paragraph', children: [{ type: 'text', value: 'Following paragraph.' }] },
            ],
          },
        ],
      };
      const { mdx } = convertSnootyAst({ ast });

      // Button must be emitted as a flow element so content stays on separate lines
      expect(mdx).toContain('<Button');
      expect(mdx).toContain('Get Started');
      // Heading and paragraphs must be on separate lines (not collapsed onto one line)
      expect(mdx).toMatch(/^# Overview$/m);
      expect(mdx).toMatch(/^Intro text\.$/m);
      expect(mdx).toMatch(/^Following paragraph\.$/m);
    });

    it('serializes button children inline with no blank lines between text and inline JSX', () => {
      // Regression: loose phrasing children inside a flow element get \n\n separators from
      // containerFlow, causing MDX to wrap each child in <p> and break Button styling.
      const ast: SnootyNode = {
        type: 'root',
        children: [
          {
            type: 'directive',
            name: 'button',
            argument: [
              { type: 'text', value: 'Get Started with ' },
              {
                type: 'substitution_reference',
                refname: 'fts',
                children: [{ type: 'text', value: 'MongoDB Search' }],
              },
            ],
            options: { uri: 'https://example.com' },
            children: [],
          },
        ],
      };
      const { mdx } = convertSnootyAst({ ast });

      // The text and Reference must appear on the same line inside <Button> with no blank line
      expect(mdx).toMatch(/Get Started with\s+<Reference[^>]*>/);
      // No blank line between the text and the Reference inside the button
      expect(mdx).not.toMatch(/Get Started with\s*\n\s*\n/);
    });
  });
});
