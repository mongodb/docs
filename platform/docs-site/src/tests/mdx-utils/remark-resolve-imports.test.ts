import { remark } from 'remark';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import remarkStringify from 'remark-stringify';
import { getContentString } from '@/mdx-utils/get-content-string';
import { collectPageScope, extractDefines, remarkResolveImports } from '@/mdx-utils/remark-resolve-imports';

jest.mock('@/mdx-utils/get-content-string', () => ({
  getContentString: jest.fn(),
}));

const mockGetContentString = getContentString as jest.MockedFunction<typeof getContentString>;

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
    mockGetContentString.mockImplementation(async (rawPath: string) => {
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

describe('remarkResolveImports ref link path prefix', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetContentString.mockImplementation(async (rawPath: string) => {
      if (rawPath.endsWith('_references.json')) {
        return JSON.stringify({
          substitutions: {},
          refs: {
            'django-get-started-create-deployment':
              'get-started#std-label-django-get-started-create-deployment',
          },
        });
      }
      return null;
    });
  });

  async function resolveWithPrefix(
    pageMdx: string,
    projectPath: string,
    dirNameToPrefix: Record<string, string>,
  ): Promise<string> {
    const file = await remark()
      .use(remarkFrontmatter, ['yaml'])
      .use(remarkGfm)
      .use(remarkMdx)
      .use(remarkResolveImports, { projectPath, dirNameToPrefix })
      .use(remarkStringify)
      .process(pageMdx);
    return String(file);
  }

  const refPage =
    'See the <RefRole type="label" name="django-get-started-create-deployment">previous step</RefRole>.\n';

  it('prefixes ref links with the project URL path prefix, not the disk directory name', async () => {
    const resolved = await resolveWithPrefix(refPage, 'django-mongodb/current', {
      'django-mongodb': 'docs/languages/python/django-mongodb',
    });

    expect(resolved).toContain(
      '[previous step](/docs/languages/python/django-mongodb/current/get-started#std-label-django-get-started-create-deployment)',
    );
  });

  it('falls back to the disk project path when no prefix mapping exists', async () => {
    const resolved = await resolveWithPrefix(refPage, 'django-mongodb/current', {});

    expect(resolved).toContain(
      '[previous step](/docs/django-mongodb/current/get-started#std-label-django-get-started-create-deployment)',
    );
  });
});

describe('remarkResolveImports index.txt refs', () => {
  async function resolveWithRefs(
    pageMdx: string,
    projectPath: string,
    refs: Record<string, string>,
    dirNameToPrefix: Record<string, string> = {},
  ): Promise<string> {
    mockGetContentString.mockImplementation(async (rawPath: string) => {
      if (rawPath.endsWith('_references.json')) {
        return JSON.stringify({ substitutions: {}, refs });
      }
      return null;
    });

    const file = await remark()
      .use(remarkFrontmatter, ['yaml'])
      .use(remarkGfm)
      .use(remarkMdx)
      .use(remarkResolveImports, { projectPath, dirNameToPrefix })
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

  it('collapses index.txt refs after remapping the project URL prefix', async () => {
    const resolved = await resolveWithRefs(
      'See <Reference name="landing-label" title="Landing" />.\n',
      'django-mongodb/current',
      { 'landing-label': 'index#std-label-landing-label' },
      { 'django-mongodb': 'docs/languages/python/django-mongodb' },
    );

    expect(resolved).toContain(
      '[Landing](/docs/languages/python/django-mongodb/current/#std-label-landing-label)',
    );
    expect(resolved).not.toContain('/index#');
  });
});

describe('remarkResolveImports markdown export links', () => {
  async function resolveForMarkdownExport(
    pageMdx: string,
    projectPath: string,
    refs: Record<string, string>,
    dirNameToPrefix: Record<string, string> = {},
  ): Promise<string> {
    mockGetContentString.mockImplementation(async (rawPath: string) => {
      if (rawPath.endsWith('_references.json')) {
        return JSON.stringify({ substitutions: {}, refs });
      }
      return null;
    });

    const file = await remark()
      .use(remarkFrontmatter, ['yaml'])
      .use(remarkGfm)
      .use(remarkMdx)
      .use(remarkResolveImports, { projectPath, dirNameToPrefix, isMarkdownExport: true })
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

  it('appends .md after remapping the project URL prefix', async () => {
    const resolved = await resolveForMarkdownExport(
      'See <Reference name="landing-label" title="Landing" />.\n',
      'django-mongodb/current',
      { 'landing-label': 'get-started' },
      { 'django-mongodb': 'docs/languages/python/django-mongodb' },
    );

    expect(resolved).toContain(
      '[Landing](/docs/languages/python/django-mongodb/current/get-started.md)',
    );
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
      'atlas-architecture/current',
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
    dirNameToPrefix: Record<string, string> = {},
  ): Promise<string> {
    mockGetContentString.mockImplementation(async (rawPath: string) => {
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
        dirNameToPrefix,
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
      'atlas-architecture/current',
      { 'cross-org-billing': 'https://www.mongodb.com/docs/atlas/billing/#std-label-cross-org-billing' },
    );

    expect(resolved).toContain(
      '[Cross-Organization Billing](https://www.mongodb.com/docs/atlas/billing.md#std-label-cross-org-billing)',
    );
  });
});

describe('remarkResolveImports flow-context references (phrasing at flow position)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetContentString.mockImplementation(async (rawPath: string) => {
      if (rawPath.endsWith('_references.json')) {
        return JSON.stringify({
          substitutions: {},
          refs: {
            'core/backup-preparations': 'core/backup-preparations',
            'reference/api/hosts/get-all-hosts-in-group': 'reference/api/hosts/get-all-hosts-in-group',
          },
        });
      }
      return null;
    });
  });

  async function resolve(pageMdx: string): Promise<string> {
    const file = await remark()
      .use(remarkFrontmatter, ['yaml'])
      .use(remarkGfm)
      .use(remarkMdx)
      .use(remarkResolveImports, { projectPath: 'ops-manager/v7.0', dirNameToPrefix: {} })
      .use(remarkStringify)
      .process(pageMdx);
    return String(file);
  }

  it('wraps a block-position <Reference> link in a paragraph so the document stays separated', async () => {
    // A <Reference/> on its own line parses as a block (mdxJsxFlowElement) directly
    // under root. Replacing it with a bare link node (phrasing) at that flow position
    // makes remark-stringify glue every block together; the re-parse then fails with
    // "Expected a closing tag".
    const pageMdx = [
      '# Back up a Deployment',
      '',
      '<Reference name="core/backup-preparations" title="Decide how to back up the data." />',
      '',
      'More content.',
      '',
    ].join('\n');

    const resolved = await resolve(pageMdx);

    // Heading, link, and trailing paragraph must remain on separate blocks.
    expect(resolved).toMatch(/# Back up a Deployment\n\n\[Decide how to back up the data\.\]/);
    expect(resolved).toMatch(/\)\n\nMore content\./);
    await expect(reparseMdx(resolved)).resolves.toBeDefined();
  });

  it('does not wrap inline RefRole links inside a one-line DefinitionDescription', async () => {
    // Glossary terms emit a one-line <DefinitionDescription> with mid-sentence
    // <RefRole> children. DefinitionListItem is a flow parent, so the description
    // re-parses as mdxJsxFlowElement even though its children are inline. Wrapping
    // each resolved link in a paragraph produces <dd>text <p><a>…</a></p> text</dd>
    // and breaks glossary spacing.
    mockGetContentString.mockImplementation(async (rawPath: string) => {
      if (rawPath.endsWith('_references.json')) {
        return JSON.stringify({
          substitutions: {},
          refs: {
            collection: '#std-term-collection',
            'database-command': '#std-term-database-command',
          },
        });
      }
      return null;
    });

    const pageMdx = [
      '<DefinitionList>',
      '  <DefinitionListItem>',
      '    <DefinitionTerm>$cmd</DefinitionTerm>',
      "    <DefinitionDescription>A virtual <RefRole type=\"term\" name=\"collection\">collection</RefRole> that exposes MongoDB's <RefRole type=\"term\" name=\"database-command\">database commands</RefRole>.</DefinitionDescription>",
      '  </DefinitionListItem>',
      '</DefinitionList>',
      '',
    ].join('\n');

    const resolved = await resolve(pageMdx);

    expect(resolved).toContain('A virtual [collection](');
    expect(resolved).toContain("that exposes MongoDB's [database commands](");
    expect(resolved).not.toMatch(/A virtual\s*\n\n\[collection\]/);
    await expect(reparseMdx(resolved)).resolves.toBeDefined();
  });

  it('escapes braces in a block-position reference link (acorn crash)', async () => {
    // A block-position reference whose title contains `{...}` (e.g. an API path
    // template). When the link lands directly in a flow container it is stringified
    // with unescaped braces, so the re-parse reads `{PROJECT-ID}` as an MDX
    // expression and throws "Could not parse expression with acorn".
    const pageMdx = [
      '<TableCell>',
      '  <Reference name="reference/api/hosts/get-all-hosts-in-group" title="/groups/{PROJECT-ID}/hosts" />',
      '</TableCell>',
      '',
    ].join('\n');

    const resolved = await resolve(pageMdx);

    expect(resolved).toContain('\\{PROJECT-ID}');
    await expect(reparseMdx(resolved)).resolves.toBeDefined();
  });
});

describe('remarkResolveImports rich substitution references', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetContentString.mockImplementation(async (rawPath: string) => {
      if (rawPath.endsWith('_references.json')) {
        return JSON.stringify({
          substitutions: {
            // Rich value: markup the renderer splices in, plus a flattened string fallback.
            'ui-org-menu': {
              text: 'Organizations menu',
              nodes: [
                {
                  type: 'mdxJsxTextElement',
                  name: 'Icon',
                  attributes: [{ type: 'mdxJsxAttribute', name: 'name', value: 'icon-mms' }],
                  children: [{ type: 'text', value: 'office' }],
                },
                { type: 'text', value: ' ' },
                {
                  type: 'mdxJsxTextElement',
                  name: 'Guilabel',
                  attributes: [],
                  children: [{ type: 'text', value: 'Organizations' }],
                },
                { type: 'text', value: ' menu' },
              ],
            },
            mms: 'Ops Manager',
          },
          refs: {},
        });
      }
      return null;
    });
  });

  async function resolve(pageMdx: string): Promise<string> {
    const file = await remark()
      .use(remarkFrontmatter, ['yaml'])
      .use(remarkGfm)
      .use(remarkMdx)
      .use(remarkResolveImports, { projectPath: 'manual/manual', dirNameToPrefix: {} })
      .use(remarkStringify)
      .process(pageMdx);
    return String(file);
  }

  it('splices shared markup in at the reference site', async () => {
    const resolved = await resolve(
      'Select it from the <Reference refKey="ui-org-menu" type="substitution" /> in the navigation bar.\n',
    );

    expect(resolved).not.toContain('<Reference');
    expect(resolved).toContain('<Icon name="icon-mms">office</Icon>');
    expect(resolved).toContain('<Guilabel>Organizations</Guilabel>');
    expect(resolved).toContain('menu in the navigation bar.');
    await expect(reparseMdx(resolved)).resolves.toBeDefined();
  });

  it('gives every reference to the key its own copy of the markup', async () => {
    // One shared entry serves many call sites; splicing the same node objects into each would
    // let a later mutating plugin corrupt every other occurrence.
    const resolved = await resolve(
      'The <Reference refKey="ui-org-menu" type="substitution" /> and the <Reference refKey="ui-org-menu" type="substitution" />.\n',
    );

    expect(resolved.match(/<Guilabel>Organizations<\/Guilabel>/g)).toHaveLength(2);
  });

  it('still resolves plain string substitutions to text', async () => {
    const resolved = await resolve('Open <Reference refKey="mms" type="substitution" />.\n');

    expect(resolved).toContain('Open Ops Manager.');
  });
});

describe('remarkResolveImports leftover Include/Reference sweep', () => {
  // Include and Reference are not page components. If they survive resolve
  // (MDX still compiles), React throws — the Atlas Azure AD 500. Strip them.
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetContentString.mockImplementation(async (rawPath: string) => {
      if (rawPath.endsWith('_references.json')) return JSON.stringify({ substitutions: {}, refs: {} });
      return null;
    });
  });

  it('removes leftover Include/Reference nodes and keeps a substitution value fallback', async () => {
    const pageMdx = [
      '<Include />',
      '',
      'Hello <Reference refKey="missing" type="replacement" /> world.',
      '',
      'See <Reference refKey="also-missing" type="substitution" value="Fallback Text" />.',
      '',
    ].join('\n');

    const resolved = await resolveToMdx(pageMdx);

    expect(resolved).not.toMatch(/<Include(\s|\/|>)/);
    expect(resolved).not.toContain('<Reference');
    expect(resolved).toContain('Fallback Text');
    await expect(reparseMdx(resolved)).resolves.toBeDefined();
  });
});

describe('page-scoped <Define> collection', () => {
  const parse = (mdx: string) => remark().use(remarkFrontmatter, ['yaml']).use(remarkGfm).use(remarkMdx).parse(mdx);

  const textOf = (nodes: unknown[]): string =>
    nodes
      .map((n) => {
        const node = n as { value?: string; children?: unknown[] };
        return node.value ?? (node.children ? textOf(node.children) : '');
      })
      .join('');

  const files: Record<string, string> = {};

  beforeEach(() => {
    jest.clearAllMocks();
    for (const key of Object.keys(files)) delete files[key];
    mockGetContentString.mockImplementation(async (rawPath: string) => files[rawPath] ?? null);
  });

  const include = (name: string, body: string) => {
    files[`${PROJECT_PATH}/_includes/${name}.mdx`] = body;
  };

  describe('extractDefines', () => {
    it('returns each definition body by name and ignores other elements', () => {
      const tree = parse('<Define name="oldfcv">`"7.0"`</Define>\n\n<Define name="oldversion">7.0</Define>\n\n<Other name="x">y</Other>\n');

      const defs = extractDefines(tree);

      expect(Object.keys(defs).sort()).toEqual(['oldfcv', 'oldversion']);
      expect(textOf(defs.oldfcv)).toBe('"7.0"');
      expect(textOf(defs.oldversion)).toBe('7.0');
    });

    it('keeps a block-formatted body as its nodes', () => {
      const tree = parse('<Define name="note">\n\nFirst paragraph.\n\nSecond paragraph.\n\n</Define>\n');

      expect(extractDefines(tree).note).toHaveLength(2);
    });

    it('clones bodies so a caller cannot mutate the tree', () => {
      const tree = parse('<Define name="oldfcv">`"7.0"`</Define>\n');

      const defs = extractDefines(tree);
      (defs.oldfcv[0] as { value?: string }).value = 'changed';

      expect(textOf(extractDefines(tree).oldfcv)).toBe('"7.0"');
    });

    it('ignores a definition with no name', () => {
      expect(extractDefines(parse('<Define>orphan</Define>\n'))).toEqual({});
    });
  });

  describe('collectPageScope', () => {
    const collect = (pageMdx: string) => collectPageScope({ tree: parse(pageMdx), projectPath: PROJECT_PATH });

    it('collects definitions written on the page itself', async () => {
      const { defs } = await collect('<Define name="oldfcv">`"7.0"`</Define>\n');

      expect(textOf(defs.oldfcv)).toBe('"7.0"');
    });

    it("hoists a definition from a sibling include so the page body and other includes can use it", async () => {
      include('8.0-upgrade-replacements', '<Define name="oldfcv">`"7.0"`</Define>\n');
      include('shared', 'Uses <Reference refKey="oldfcv" type="substitution" />.\n');

      const { defs } = await collect(
        '<Include src="/_includes/8.0-upgrade-replacements" />\n\n<Include src="/_includes/shared" />\n',
      );

      expect(textOf(defs.oldfcv)).toBe('"7.0"');
    });

    it('follows nested includes', async () => {
      include('outer', '<Include src="/_includes/inner" />\n');
      include('inner', '<Define name="deep">found</Define>\n');

      const { defs } = await collect('<Include src="/_includes/outer" />\n');

      expect(textOf(defs.deep)).toBe('found');
    });

    it('finds includes passed inside another include\'s replacement slots', async () => {
      include('slotted', '<Define name="inslot">yes</Define>\n');

      const { defs } = await collect(
        '<Include src="/_includes/wrapper"><Replacement name="x"><Include src="/_includes/slotted" /></Replacement></Include>\n',
      );

      expect(textOf(defs.inslot)).toBe('yes');
    });

    it('lets the last definition in document order win', async () => {
      include('a', '<Define name="v">from-a</Define>\n');
      include('b', '<Define name="v">from-b</Define>\n');

      const first = await collect('<Include src="/_includes/a" />\n\n<Include src="/_includes/b" />\n');
      const second = await collect('<Include src="/_includes/b" />\n\n<Include src="/_includes/a" />\n');

      expect(textOf(first.defs.v)).toBe('from-b');
      expect(textOf(second.defs.v)).toBe('from-a');
    });

    it('lets a page definition that follows an include override it', async () => {
      include('a', '<Define name="v">from-include</Define>\n');

      const { defs } = await collect('<Include src="/_includes/a" />\n\n<Define name="v">from-page</Define>\n');

      expect(textOf(defs.v)).toBe('from-page');
    });

    it('flags an alias as ambiguous when definitions differ', async () => {
      include('a', '<Define name="v">from-a</Define>\n<Define name="same">equal</Define>\n');
      include('b', '<Define name="v">from-b</Define>\n<Define name="same">equal</Define>\n');

      const { ambiguous } = await collect('<Include src="/_includes/a" />\n\n<Include src="/_includes/b" />\n');

      expect([...ambiguous]).toEqual(['v']);
    });

    it('stops at a circular include instead of recursing forever', async () => {
      include('loop-a', '<Define name="a">a</Define>\n\n<Include src="/_includes/loop-b" />\n');
      include('loop-b', '<Define name="b">b</Define>\n\n<Include src="/_includes/loop-a" />\n');

      const { defs } = await collect('<Include src="/_includes/loop-a" />\n');

      expect(Object.keys(defs).sort()).toEqual(['a', 'b']);
    });

    it('skips an include that cannot be loaded', async () => {
      const { defs } = await collect('<Include src="/_includes/missing" />\n\n<Define name="ok">fine</Define>\n');

      expect(textOf(defs.ok)).toBe('fine');
    });

    it('fetches each include file once even when it is included repeatedly', async () => {
      include('repeat', '<Define name="r">x</Define>\n');

      await collect('<Include src="/_includes/repeat" />\n\n<Include src="/_includes/repeat" />\n');

      const fetched = mockGetContentString.mock.calls.filter(([p]) => p.endsWith('_includes/repeat.mdx'));
      expect(fetched).toHaveLength(1);
    });

    it('returns an empty scope for a page with no definitions', async () => {
      const { defs, ambiguous } = await collect('Just text.\n');

      expect(defs).toEqual({});
      expect(ambiguous.size).toBe(0);
    });
  });
});

describe('page-scoped <Define> resolution', () => {
  const GLOBAL_REFERENCES = JSON.stringify({
    substitutions: {
      oldfcv: { text: '"8.3"', nodes: [{ type: 'inlineCode', value: '"8.3"' }] },
      other: 'global-other',
    },
    refs: {},
  });

  const files: Record<string, string> = {};

  beforeEach(() => {
    jest.clearAllMocks();
    for (const key of Object.keys(files)) delete files[key];
    mockGetContentString.mockImplementation(async (rawPath: string) => {
      if (rawPath.endsWith('_references.json')) return GLOBAL_REFERENCES;
      return files[rawPath] ?? null;
    });
  });

  const include = (name: string, body: string) => {
    files[`${PROJECT_PATH}/_includes/${name}.mdx`] = body;
  };

  const sub = (key: string) => `<Reference refKey="${key}" type="substitution" />`;

  it("renders the page's own definition instead of the shared _references.json value", async () => {
    const mdx = await resolveToMdx(`<Define name="oldfcv">\`"7.0"\`</Define>\n\nSet to ${sub('oldfcv')}.\n`);

    expect(mdx).toContain('Set to `"7.0"`.');
    expect(mdx).not.toContain('8.3');
  });

  it('keeps a value baked into the reference ahead of the definition', async () => {
    const mdx = await resolveToMdx(
      '<Define name="oldfcv">defined</Define>\n\nSet to <Reference refKey="oldfcv" type="substitution" value="baked" />.\n',
    );

    expect(mdx).toContain('Set to baked.');
  });

  it('falls back to _references.json for an alias with no definition', async () => {
    const mdx = await resolveToMdx(`<Define name="oldfcv">x</Define>\n\nSee ${sub('other')}.\n`);

    expect(mdx).toContain('See global-other.');
  });

  it('resolves a reference on the page from a definition in a sibling include', async () => {
    include('8.0-upgrade-replacements', '<Define name="oldfcv">`"7.0"`</Define>\n');

    const mdx = await resolveToMdx(
      `<Include src="/_includes/8.0-upgrade-replacements" />\n\nSet to ${sub('oldfcv')}.\n`,
    );

    expect(mdx).toContain('Set to `"7.0"`.');
    expect(mdx).not.toContain('8.3');
  });

  it('resolves an alias used inside another definition', async () => {
    const mdx = await resolveToMdx(
      `<Define name="outer">see ${sub('inner')} here</Define>\n\n<Define name="inner">inner-value</Define>\n\nText: ${sub('outer')}.\n`,
    );

    expect(mdx).toContain('Text: see inner-value here.');
  });

  it('stops at a circular definition and falls back to _references.json', async () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    const error = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const mdx = await resolveToMdx(
      `<Define name="a">a then ${sub('b')}</Define>\n\n<Define name="b">b then ${sub('a')}</Define>\n\nText: ${sub('a')}.\n`,
    );

    expect(mdx).toContain('a then b then');
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('Circular'));
    warn.mockRestore();
    error.mockRestore();
  });

  it('keeps an inline definition inline rather than wrapping it in a paragraph', async () => {
    const mdx = await resolveToMdx(`<Define name="oldfcv">\`"7.0"\`</Define>\n\nSet to ${sub('oldfcv')} now.\n`);

    expect(mdx.trim()).toBe('Set to `"7.0"` now.');
  });

  it('removes <Define> elements from the output', async () => {
    include('defs', '<Define name="oldfcv">7.0</Define>\n');

    const mdx = await resolveToMdx(`<Define name="x">y</Define>\n\n<Include src="/_includes/defs" />\n\nText.\n`);

    expect(mdx).not.toContain('Define');
    expect(mdx.trim()).toBe('Text.');
  });

  it('warns when a reference resolves through an alias defined differently in several places', async () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    include('a', '<Define name="v">from-a</Define>\n');
    include('b', '<Define name="v">from-b</Define>\n');

    const mdx = await resolveToMdx(
      `<Include src="/_includes/a" />\n\n<Include src="/_includes/b" />\n\nValue: ${sub('v')}.\n`,
    );

    expect(mdx).toContain('Value: from-b.');
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('conflicting'));
    warn.mockRestore();
  });

  it('does not warn when every definition of an alias is identical', async () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    include('a', '<Define name="v">same</Define>\n');
    include('b', '<Define name="v">same</Define>\n');

    await resolveToMdx(`<Include src="/_includes/a" />\n\n<Include src="/_includes/b" />\n\nValue: ${sub('v')}.\n`);

    expect(warn).not.toHaveBeenCalledWith(expect.stringContaining('conflicting'));
    warn.mockRestore();
  });
});

describe('page-scoped <Define> inside includes', () => {
  const GLOBAL_REFERENCES = JSON.stringify({
    substitutions: {
      oldfcv: { text: '"8.3"', nodes: [{ type: 'inlineCode', value: '"8.3"' }] },
      'analyzer-name': 'global-analyzer',
    },
    refs: {},
  });

  const files: Record<string, string> = {};

  beforeEach(() => {
    jest.clearAllMocks();
    for (const key of Object.keys(files)) delete files[key];
    mockGetContentString.mockImplementation(async (rawPath: string) => {
      if (rawPath.endsWith('_references.json')) return GLOBAL_REFERENCES;
      return files[rawPath] ?? null;
    });
  });

  const include = (name: string, body: string) => {
    files[`${PROJECT_PATH}/_includes/${name}.mdx`] = body;
  };

  const sub = (key: string) => `<Reference refKey="${key}" type="substitution" />`;

  it('resolves a reference inside a shared include from the including page\'s definition', async () => {
    include('8.0-replacements', '<Define name="oldfcv">`"7.0"`</Define>\n');
    include('shared', `Set to ${sub('oldfcv')}.\n`);

    const mdx = await resolveToMdx(
      '<Include src="/_includes/8.0-replacements" />\n\n<Include src="/_includes/shared" />\n',
    );

    expect(mdx).toContain('Set to `"7.0"`.');
    expect(mdx).not.toContain('8.3');
  });

  it('gives each page its own value from the same shared include', async () => {
    include('shared', `Set to ${sub('oldfcv')}.\n`);

    const page80 = await resolveToMdx('<Define name="oldfcv">`"7.0"`</Define>\n\n<Include src="/_includes/shared" />\n');
    const page82 = await resolveToMdx('<Define name="oldfcv">`"8.0"`</Define>\n\n<Include src="/_includes/shared" />\n');

    expect(page80).toContain('Set to `"7.0"`.');
    expect(page82).toContain('Set to `"8.0"`.');
  });

  it('passes the page definition down through nested includes', async () => {
    include('outer', 'Outer.\n\n<Include src="/_includes/inner" />\n');
    include('inner', `Inner ${sub('oldfcv')}.\n`);

    const mdx = await resolveToMdx('<Define name="oldfcv">`"7.0"`</Define>\n\n<Include src="/_includes/outer" />\n');

    expect(mdx).toContain('Inner `"7.0"`.');
  });

  it("lets an include's own definition win for its own references", async () => {
    include('with-own', `<Define name="analyzer-name">own</Define>\n\nInside ${sub('analyzer-name')}.\n`);

    const mdx = await resolveToMdx(
      `<Define name="analyzer-name">page</Define>\n\n<Include src="/_includes/with-own" />\n\nBody ${sub('analyzer-name')}.\n`,
    );

    expect(mdx).toContain('Inside own.');
    expect(mdx).toContain('Body own.');
  });

  it('keeps each include\'s own value when several includes redefine the same alias', async () => {
    include('a_ui', `<Define name="analyzer-name">alpha</Define>\n\nA uses ${sub('analyzer-name')}.\n`);
    include('b_ui', `<Define name="analyzer-name">beta</Define>\n\nB uses ${sub('analyzer-name')}.\n`);

    const mdx = await resolveToMdx('<Include src="/_includes/a_ui" />\n\n<Include src="/_includes/b_ui" />\n');

    expect(mdx).toContain('A uses alpha.');
    expect(mdx).toContain('B uses beta.');
  });

  it('does not warn about conflicts that each include resolves with its own definition', async () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    include('a_ui', `<Define name="analyzer-name">alpha</Define>\n\n${sub('analyzer-name')}\n`);
    include('b_ui', `<Define name="analyzer-name">beta</Define>\n\n${sub('analyzer-name')}\n`);

    await resolveToMdx('<Include src="/_includes/a_ui" />\n\n<Include src="/_includes/b_ui" />\n');

    expect(warn).not.toHaveBeenCalledWith(expect.stringContaining('conflicting'));
    warn.mockRestore();
  });

  it('passes an include\'s own definition down to the includes nested inside it', async () => {
    include('outer', '<Define name="analyzer-name">outer-value</Define>\n\n<Include src="/_includes/inner" />\n');
    include('inner', `Inner ${sub('analyzer-name')}.\n`);

    const mdx = await resolveToMdx('<Include src="/_includes/outer" />\n');

    expect(mdx).toContain('Inner outer-value.');
  });

  it('keeps an explicit <Replacement> slot ahead of the page definition', async () => {
    include('shared', `Value: ${sub('oldfcv')}.\n`);

    const mdx = await resolveToMdx(
      '<Define name="oldfcv">page</Define>\n\n<Include src="/_includes/shared"><Replacement name="oldfcv">slot</Replacement></Include>\n',
    );

    expect(mdx).toContain('Value: slot.');
  });

  it('falls back to _references.json when no definition applies', async () => {
    include('shared', `Value: ${sub('analyzer-name')}.\n`);

    const mdx = await resolveToMdx('<Include src="/_includes/shared" />\n');

    expect(mdx).toContain('Value: global-analyzer.');
  });

  it('leaves no <Define> element behind from an include', async () => {
    include('defs', '<Define name="oldfcv">7.0</Define>\n\nText.\n');

    const mdx = await resolveToMdx('<Include src="/_includes/defs" />\n');

    expect(mdx).not.toContain('Define');
    expect(mdx.trim()).toBe('Text.');
  });
});

describe('page-scoped <Define> in the markdown export', () => {
  const resolveForMarkdownExport = async (pageMdx: string, files: Record<string, string> = {}): Promise<string> => {
    mockGetContentString.mockImplementation(async (rawPath: string) => {
      if (rawPath.endsWith('_references.json')) {
        return JSON.stringify({
          substitutions: { compatibility: 'global-text' },
          refs: { '8.0-compatibility': 'release-notes/8.0-compatibility' },
        });
      }
      return files[rawPath] ?? null;
    });

    const file = await remark()
      .use(remarkFrontmatter, ['yaml'])
      .use(remarkGfm)
      .use(remarkMdx)
      .use(remarkResolveImports, {
        projectPath: 'manual/upcoming',
        isMarkdownExport: true,
        docsBaseUrl: 'https://www.mongodb.com/docs',
      })
      .use(remarkStringify)
      .process(pageMdx);
    return String(file);
  };

  const sub = '<Reference refKey="compatibility" type="substitution" />';

  it('turns a link inside a definition into an absolute .md link at every use', async () => {
    const mdx = await resolveForMarkdownExport(
      `<Define name="compatibility"><Reference name="8.0-compatibility" title="Compatibility Changes in MongoDB 8.0" /></Define>\n\nSee ${sub} and again ${sub}.\n`,
    );

    const link = '[Compatibility Changes in MongoDB 8.0](https://www.mongodb.com/docs/manual/upcoming/release-notes/8.0-compatibility.md)';
    expect(mdx.split(link)).toHaveLength(3);
    expect(mdx).not.toContain('Define');
  });

  it('applies a definition to a shared include in the export too', async () => {
    const mdx = await resolveForMarkdownExport(
      `<Define name="compatibility">page-specific</Define>\n\n<Include src="/_includes/shared" />\n`,
      { 'manual/upcoming/_includes/shared.mdx': `Read ${sub}.\n` },
    );

    expect(mdx).toContain('Read page-specific.');
    expect(mdx).not.toContain('global-text');
  });
});

describe('collectPageScope contributions cache', () => {
  const parse = (mdx: string) => remark().use(remarkFrontmatter, ['yaml']).use(remarkGfm).use(remarkMdx).parse(mdx);
  const page = '<Include src="/_includes/cached" />\n';
  const filePath = `${PROJECT_PATH}/_includes/cached.mdx`;

  const textOf = (nodes: unknown[]): string =>
    nodes
      .map((n) => {
        const node = n as { value?: string; children?: unknown[] };
        return node.value ?? (node.children ? textOf(node.children) : '');
      })
      .join('');

  it('picks up a changed include instead of serving stale contributions', async () => {
    mockGetContentString.mockImplementation(async (rawPath: string) =>
      rawPath === filePath ? '<Define name="v">first</Define>\n' : null,
    );
    const before = await collectPageScope({ tree: parse(page), projectPath: PROJECT_PATH });

    mockGetContentString.mockImplementation(async (rawPath: string) =>
      rawPath === filePath ? '<Define name="v">second</Define>\n' : null,
    );
    const after = await collectPageScope({ tree: parse(page), projectPath: PROJECT_PATH });

    expect(textOf(before.defs.v)).toBe('first');
    expect(textOf(after.defs.v)).toBe('second');
  });

  it('serves the same include to a later page without changing the result', async () => {
    mockGetContentString.mockImplementation(async (rawPath: string) =>
      rawPath === filePath ? '<Define name="v">same</Define>\n' : null,
    );

    const first = await collectPageScope({ tree: parse(page), projectPath: PROJECT_PATH });
    const second = await collectPageScope({ tree: parse(page), projectPath: PROJECT_PATH });

    expect(textOf(second.defs.v)).toBe('same');
    expect(second.defs).toEqual(first.defs);
  });
});
