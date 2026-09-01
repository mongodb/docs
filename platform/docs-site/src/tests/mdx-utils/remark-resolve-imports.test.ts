import { remark } from 'remark';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import remarkStringify from 'remark-stringify';
import { getContentString } from '@/mdx-utils/get-content-string';
import { remarkResolveImports } from '@/mdx-utils/remark-resolve-imports';

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
