import { remark } from 'remark';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import remarkStringify from 'remark-stringify';
import { getBlobString } from '@/mdx-utils/blob-read';
import { remarkResolveImports } from '@/mdx-utils/remark-resolve-imports';

jest.mock('@/mdx-utils/blob-read', () => ({
  getBlobString: jest.fn(),
}));

const mockGetBlob = getBlobString as jest.MockedFunction<typeof getBlobString>;

const PROJECT_PATH = 'csharp/current';

/**
 * Mirrors the markdown export route: resolve includes/replacements, stringify to
 * MDX, then re-parse that MDX (the step that crashed in production when a block
 * <Tabs> replacement was collapsed into an inline element).
 */
async function resolveToMdx(pageMdx: string): Promise<string> {
  const file = await remark()
    .use(remarkFrontmatter, ['yaml'])
    .use(remarkGfm)
    .use(remarkMdx)
    .use(remarkResolveImports, { projectPath: PROJECT_PATH })
    .use(remarkStringify)
    .process(pageMdx);
  return String(file);
}

function reparseMdx(mdx: string): Promise<unknown> {
  return remark().use(remarkFrontmatter, ['yaml']).use(remarkMdx).use(remarkStringify).process(mdx);
}

describe('remarkResolveImports replacement slots', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetBlob.mockImplementation(async (rawPath: string) => {
      if (rawPath.endsWith('_references.json')) return '{}';
      if (rawPath.includes('code-example-template')) {
        return [
          'The following code example demonstrates the operation:',
          '',
          '<Reference refKey="code-tabs" type="replacement" />',
          '',
        ].join('\n');
      }
      if (rawPath.includes('inline-template')) {
        // Reference embedded in an inline (sentence) context.
        return 'Click <Reference refKey="ui-target" type="replacement" /> to continue.\n';
      }
      if (rawPath.includes('selfclosing-template')) {
        // A `public class` code block, then a block-position reference whose slot is a
        // self-closing element. This mirrors the real csharp pages (sample-data code +
        // an <Instruqt>/<Target> replacement).
        return [
          '### Sample Data',
          '',
          '```csharp copyable={true} linenos={false}',
          'public class Restaurant',
          '{',
          '    public ObjectId Id { get; set; }',
          '}',
          '```',
          '',
          '<Reference refKey="lab" type="replacement" />',
          '',
          '## Next',
          '',
          'More content here.',
          '',
        ].join('\n');
      }
      return null;
    });
  });

  it('keeps a block <Tabs> replacement (with nested code) parseable after a round-trip', async () => {
    const pageMdx = [
      '# Update Many',
      '',
      '<Include src="/_includes/code-example-template">',
      '  <Replacement name="code-tabs">',
      '    <Tabs>',
      '      <Tab tabid="sync" name="UpdateMany (Sync)">',
      '        ```csharp copyable={true} linenos={false}',
      '        var filter = Builders<Restaurant>.Filter.Eq("cuisine", "Pizza");',
      '        _restaurantsCollection.UpdateMany(filter, combinedUpdate);',
      '        ```',
      '      </Tab>',
      '    </Tabs>',
      '  </Replacement>',
      '</Include>',
      '',
    ].join('\n');

    const resolved = await resolveToMdx(pageMdx);

    // The Tabs must remain a block element wrapping a fenced code block, not be
    // collapsed onto a single inline line.
    expect(resolved).toContain('```csharp');
    expect(resolved).toContain('_restaurantsCollection.UpdateMany(filter, combinedUpdate);');
    expect(resolved).toMatch(/<Tabs>\n/);

    // Production then re-parses the stringified MDX; this previously threw
    // "Could not parse expression with acorn" / "Expected a closing tag".
    await expect(reparseMdx(resolved)).resolves.toBeDefined();
  });

  it('keeps a block self-closing replacement from collapsing the document (public-class crash)', async () => {
    const pageMdx = [
      '# Update Many',
      '',
      '<Include src="/_includes/selfclosing-template">',
      '  <Replacement name="lab">',
      '    <Instruqt drawer={true} title="Lesson" embedValue="/x" />',
      '  </Replacement>',
      '</Include>',
      '',
    ].join('\n');

    const resolved = await resolveToMdx(pageMdx);

    // Blocks must stay separated: the csharp fence must start its own line so it is
    // recognized as a code fence (otherwise `public` is parsed as a JS expression).
    expect(resolved).toMatch(/\n```csharp/);
    expect(resolved).toMatch(/\n## Next/);
    await expect(reparseMdx(resolved)).resolves.toBeDefined();
  });

  it('still inlines genuinely inline replacement content split across blank lines', async () => {
    const pageMdx = [
      '# Heading',
      '',
      '<Include src="/_includes/inline-template">',
      '  <Replacement name="ui-target">',
      '    <Icon name="mms" />',
      '',
      '    <Guilabel>Clusters</Guilabel>',
      '  </Replacement>',
      '</Include>',
      '',
    ].join('\n');

    const resolved = await resolveToMdx(pageMdx);

    // Inline content collapses into the surrounding sentence rather than breaking
    // out into block-level lines.
    expect(resolved).toContain('Click <Icon name="mms" /><Guilabel>Clusters</Guilabel> to continue.');
    await expect(reparseMdx(resolved)).resolves.toBeDefined();
  });
});

describe('remarkResolveImports landing refs', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetBlob.mockImplementation(async (rawPath: string) => {
      if (rawPath.endsWith('_references.json')) {
        return JSON.stringify({
          substitutions: {},
          refs: {
            'codex-plugin-install': 'codex#std-label-codex-plugin-install',
          },
        });
      }
      return null;
    });
  });

  it('does not insert a double slash when projectPath is empty', async () => {
    const file = await remark()
      .use(remarkFrontmatter, ['yaml'])
      .use(remarkGfm)
      .use(remarkMdx)
      .use(remarkResolveImports, { projectPath: '' })
      .use(remarkStringify)
      .process('See the <RefRole type="label" name="codex-plugin-install">Codex plugin</RefRole>.\n');

    const resolved = String(file);
    expect(resolved).toContain('[Codex plugin](/docs/codex#std-label-codex-plugin-install)');
    expect(resolved).not.toContain('/docs//');
  });
});

describe('remarkResolveImports index.txt refs', () => {
  async function resolveWithRefs(
    pageMdx: string,
    projectPath: string,
    refs: Record<string, string>,
  ): Promise<string> {
    mockGetBlob.mockImplementation(async (rawPath: string) => {
      if (rawPath.endsWith('_references.json')) {
        return JSON.stringify({ substitutions: {}, refs });
      }
      return null;
    });

    const file = await remark()
      .use(remarkFrontmatter, ['yaml'])
      .use(remarkGfm)
      .use(remarkMdx)
      .use(remarkResolveImports, { projectPath })
      .use(remarkStringify)
      .process(pageMdx);
    return String(file);
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('collapses a root index.txt fileid so :ref: links omit /index/', async () => {
    const resolved = await resolveWithRefs(
      'See <Reference name="atlas-editions" title="Database Editions" />.\n',
      'atlas',
      { 'atlas-editions': 'index#std-label-atlas-editions' },
    );

    expect(resolved).toContain('[Database Editions](/docs/atlas/#std-label-atlas-editions)');
    expect(resolved).not.toContain('/atlas/index');
  });

  it('collapses a nested index.txt fileid', async () => {
    const resolved = await resolveWithRefs(
      'See <Reference name="core-overview" title="Overview" />.\n',
      'atlas',
      { 'core-overview': 'core/index#std-label-core-overview' },
    );

    expect(resolved).toContain('[Overview](/docs/atlas/core#std-label-core-overview)');
    expect(resolved).not.toContain('/core/index');
  });

  it('does not collapse pages whose last segment only contains the word index', async () => {
    const resolved = await resolveWithRefs(
      'See <Reference name="indexes" title="Indexes" />.\n',
      'atlas',
      { indexes: 'indexes#std-label-indexes' },
    );

    expect(resolved).toContain('[Indexes](/docs/atlas/indexes#std-label-indexes)');
  });

  it('does not collapse a mid-path index segment', async () => {
    const resolved = await resolveWithRefs(
      'See <Reference name="analyzers" title="Analyzers" />.\n',
      'atlas',
      { analyzers: 'search/index/analyzers#std-label-analyzers' },
    );

    expect(resolved).toContain('[Analyzers](/docs/atlas/search/index/analyzers#std-label-analyzers)');
  });
});

describe('remarkResolveImports markdown export links', () => {
  async function resolveForMarkdownExport(
    pageMdx: string,
    projectPath: string,
    refs: Record<string, string>,
  ): Promise<string> {
    mockGetBlob.mockImplementation(async (rawPath: string) => {
      if (rawPath.endsWith('_references.json')) {
        return JSON.stringify({ substitutions: {}, refs });
      }
      return null;
    });

    const file = await remark()
      .use(remarkFrontmatter, ['yaml'])
      .use(remarkGfm)
      .use(remarkMdx)
      .use(remarkResolveImports, { projectPath, isMarkdownExport: true })
      .use(remarkStringify)
      .process(pageMdx);
    return String(file);
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('appends .md to a plain page link', async () => {
    const resolved = await resolveForMarkdownExport(
      'See <Reference name="billing-data" title="Billing Data" />.\n',
      'atlas/architecture/current',
      { 'billing-data': 'billing-data' },
    );

    expect(resolved).toContain('[Billing Data](/docs/atlas/architecture/current/billing-data.md)');
  });

  it('inserts .md before a #hash fragment', async () => {
    const resolved = await resolveForMarkdownExport(
      'See <Reference name="atlas-editions" title="Database Editions" />.\n',
      'atlas',
      { 'atlas-editions': 'billing-data#std-label-atlas-editions' },
    );

    expect(resolved).toContain('[Database Editions](/docs/atlas/billing-data.md#std-label-atlas-editions)');
  });

  it('resolves a root index.txt target to index.md, not a bare .md', async () => {
    const resolved = await resolveForMarkdownExport(
      'See <Reference name="atlas-editions" title="Database Editions" />.\n',
      'atlas',
      { 'atlas-editions': 'index#std-label-atlas-editions' },
    );

    expect(resolved).toContain('[Database Editions](/docs/atlas/index.md#std-label-atlas-editions)');
    expect(resolved).not.toContain('//index.md');
  });

  it('resolves a nested index.txt target to a plain .md (its index segment already collapsed)', async () => {
    const resolved = await resolveForMarkdownExport(
      'See <Reference name="core-overview" title="Overview" />.\n',
      'atlas',
      { 'core-overview': 'core/index#std-label-core-overview' },
    );

    expect(resolved).toContain('[Overview](/docs/atlas/core.md#std-label-core-overview)');
  });

  it('leaves external links untouched', async () => {
    const resolved = await resolveForMarkdownExport(
      'See <RefRole type="url" name="ext">External</RefRole>.\n',
      'atlas',
      { ext: 'https://example.com/page' },
    );

    expect(resolved).toContain('[External](https://example.com/page)');
  });

  it('appends .md to a cross-project reference already baked to an absolute docs URL', async () => {
    const resolved = await resolveForMarkdownExport(
      'See <Reference name="cross-org-billing" title="Cross-Organization Billing" />.\n',
      'atlas/architecture/current',
      { 'cross-org-billing': 'https://www.mongodb.com/docs/atlas/billing/#std-label-cross-org-billing' },
    );

    expect(resolved).toContain(
      '[Cross-Organization Billing](https://www.mongodb.com/docs/atlas/billing.md#std-label-cross-org-billing)',
    );
  });

  it('leaves an absolute non-docs mongodb.com link untouched', async () => {
    const resolved = await resolveForMarkdownExport(
      'See <RefRole type="url" name="pricing">Pricing</RefRole>.\n',
      'atlas',
      { pricing: 'https://www.mongodb.com/pricing' },
    );

    expect(resolved).toContain('[Pricing](https://www.mongodb.com/pricing)');
  });
});

describe('remarkResolveImports markdown export with docsBaseUrl (matches preResolveImportsForMarkdownExport)', () => {
  async function resolveWithBaseUrl(
    pageMdx: string,
    projectPath: string,
    refs: Record<string, string>,
  ): Promise<string> {
    mockGetBlob.mockImplementation(async (rawPath: string) => {
      if (rawPath.endsWith('_references.json')) {
        return JSON.stringify({ substitutions: {}, refs });
      }
      return null;
    });

    const file = await remark()
      .use(remarkFrontmatter, ['yaml'])
      .use(remarkGfm)
      .use(remarkMdx)
      .use(remarkResolveImports, {
        projectPath,
        isMarkdownExport: true,
        docsBaseUrl: 'https://www.mongodb.com/docs',
      })
      .use(remarkStringify)
      .process(pageMdx);
    return String(file);
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('emits an absolute, .md-suffixed link for a same-project reference', async () => {
    const resolved = await resolveWithBaseUrl(
      'See <Reference name="core-overview" title="Overview" />.\n',
      'atlas',
      { 'core-overview': 'core/index#std-label-core-overview' },
    );

    expect(resolved).toContain('[Overview](https://www.mongodb.com/docs/atlas/core.md#std-label-core-overview)');
  });

  it('emits an absolute, .md-suffixed link for a root docset target', async () => {
    const resolved = await resolveWithBaseUrl(
      'See <Reference name="atlas-editions" title="Database Editions" />.\n',
      'atlas',
      { 'atlas-editions': 'index#std-label-atlas-editions' },
    );

    expect(resolved).toContain(
      '[Database Editions](https://www.mongodb.com/docs/atlas/index.md#std-label-atlas-editions)',
    );
    expect(resolved).not.toContain('//index.md');
  });

  it('appends .md to a cross-project reference already baked to an absolute URL', async () => {
    const resolved = await resolveWithBaseUrl(
      'See <Reference name="cross-org-billing" title="Cross-Organization Billing" />.\n',
      'atlas/architecture/current',
      { 'cross-org-billing': 'https://www.mongodb.com/docs/atlas/billing/#std-label-cross-org-billing' },
    );

    expect(resolved).toContain(
      '[Cross-Organization Billing](https://www.mongodb.com/docs/atlas/billing.md#std-label-cross-org-billing)',
    );
  });
});
