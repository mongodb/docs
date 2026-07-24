import { render } from '@testing-library/react';
import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import { Include } from '@/mdx-components/Include';
import { Replacement } from '@/mdx-components/Include/Replacement';
import { loadMDX } from '@/mdx-utils/load-mdx';
import { remarkResolveImports } from '@/mdx-utils/remark-resolve-imports';
import { getContentString } from '@/mdx-utils/get-content-string';

jest.mock('@/mdx-utils/load-mdx', () => ({
  loadMDX: jest.fn(),
}));

jest.mock('@/mdx-utils/get-content-string', () => ({
  getContentString: jest.fn(),
}));

const mockLoadMDX = loadMDX as jest.MockedFunction<typeof loadMDX>;
const mockGetContentString = getContentString as jest.MockedFunction<typeof getContentString>;

describe('Include', () => {
  beforeEach(() => jest.clearAllMocks());

  it('renders the loaded content', async () => {
    mockLoadMDX.mockResolvedValue({
      content: <p>Hello from include</p>,
      frontmatter: {},
    });

    const result = await Include({ projectPath: 'django-mongodb/current', src: '/_includes/test' });
    const { getByText } = render(result);

    expect(getByText('Hello from include')).toBeTruthy();
    expect(mockLoadMDX).toHaveBeenCalledWith(expect.arrayContaining(['_includes', 'test']), undefined);
  });

  it('extracts replacements from Replacement children and passes to loadMDX', async () => {
    mockLoadMDX.mockResolvedValue({
      content: <p>Content with replacement</p>,
      frontmatter: {},
    });

    const result = await Include({
      projectPath: 'django-mongodb/current',
      src: '/_includes/use-sample-data',
      children: [
        <Replacement key="model-classes" name="model-classes">
          <code>Movie</code> model includes
        </Replacement>,
        <Replacement key="model-imports" name="model-imports">
          <pre>
            <code>from app.models import Movie</code>
          </pre>
        </Replacement>,
      ],
    });

    render(result);

    const [, replacements] = mockLoadMDX.mock.calls[0];
    expect(replacements).toMatchObject({
      'model-classes': expect.anything(),
      'model-imports': expect.anything(),
    });
  });

  it('renders an error when the include file is not found', async () => {
    mockLoadMDX.mockResolvedValue(null);

    const result = await Include({ projectPath: 'django-mongodb/current', src: '/_includes/missing' });
    const { getByText } = render(result);

    expect(getByText(/Error: Could not load content/)).toBeTruthy();
  });
});

describe('remarkResolveImports — nested-include substitution propagation', () => {
  // Mirrors the reference/command.txt collision fix: a substitution (|fts-index|) is only used in a
  // shared description include nested inside a shared table include. The shared files carry a
  // `type="replacement"` placeholder (no baked value); each top page supplies its own value on its
  // <Include> slot. This verifies the value propagates down the chain at runtime so one page renders
  // a link and another renders plain text — from the exact same shared files.
  const PROJECT = 'test';
  const LINK_URL = 'https://www.mongodb.com/docs/atlas/atlas-search/atlas-search-overview/#fts-indexes';

  // Shared, caller-agnostic files (identical no matter which page includes them).
  const TABLE_MDX = [
    '<Include src="/_includes/desc">',
    '  <Replacement name="fts-index">',
    '    <Reference refKey="fts-index" type="replacement" />',
    '  </Replacement>',
    '</Include>',
    '',
  ].join('\n');
  const DESC_MDX = 'Updates an existing <Reference refKey="fts-index" type="substitution" />.\n';
  // A distinctive global fallback so we can prove the per-page slot wins (fallback is never used).
  const REFERENCES_JSON = JSON.stringify({ substitutions: { 'fts-index': 'GLOBAL FALLBACK' }, refs: {} });

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetContentString.mockImplementation(async (relativePath: string) => {
      const map: Record<string, string> = {
        [`${PROJECT}/_includes/table.mdx`]: TABLE_MDX,
        [`${PROJECT}/_includes/desc.mdx`]: DESC_MDX,
        [`${PROJECT}/_references.json`]: REFERENCES_JSON,
      };
      return map[relativePath] ?? null;
    });
  });

  const resolve = async (topPageMdx: string): Promise<string> => {
    const file = await remark()
      .use(remarkFrontmatter, ['yaml'])
      .use(remarkGfm)
      .use(remarkMdx)
      .use(remarkResolveImports, { projectPath: PROJECT })
      .process(topPageMdx);
    return String(file);
  };

  it('renders a link for a page that defines the substitution as a link', async () => {
    const linkPage = [
      '<Include src="/_includes/table">',
      '  <Replacement name="fts-index">',
      `    <>[MongoDB Search index](${LINK_URL})</>`,
      '  </Replacement>',
      '</Include>',
      '',
    ].join('\n');

    const output = await resolve(linkPage);

    expect(output).toContain(LINK_URL);
    expect(output).toContain('MongoDB Search index');
    expect(output).not.toContain('GLOBAL FALLBACK');
    // No leftover placeholders / unresolved references.
    expect(output).not.toContain('type="replacement"');
    expect(output).not.toContain('type="substitution"');
  });

  it('renders plain text for a page that defines the substitution as plain text', async () => {
    const plainPage = [
      '<Include src="/_includes/table">',
      '  <Replacement name="fts-index">',
      '    <>MongoDB Search index</>',
      '  </Replacement>',
      '</Include>',
      '',
    ].join('\n');

    const output = await resolve(plainPage);

    expect(output).toContain('MongoDB Search index');
    expect(output).not.toContain(LINK_URL);
    expect(output).not.toContain('GLOBAL FALLBACK');
    expect(output).not.toContain('type="replacement"');
    expect(output).not.toContain('type="substitution"');
  });
});

describe('remarkResolveImports — <Include> nodes inside <Replacement> slots', () => {
  // Regression test for the bug where <Include> nodes nested inside <Replacement> slots
  // were injected into the template AFTER the initial resolveIncludes pass, leaving raw
  // <Include> JSX in the compiled output and crashing React at render time.
  //
  // Real-world example: arrays.mdx supplies <Replacement name="positional-code-example-tabs">
  // which contains <Include src="/_includes/update-one/positional-operator-code-intro" />.
  const PROJECT = 'test';

  // The top-level page passes a Replacement slot that itself contains an <Include>.
  const PAGE_MDX = [
    '<Include src="/_includes/template">',
    '  <Replacement name="code-intro">',
    '    <Include src="/_includes/intro-snippet" />',
    '  </Replacement>',
    '</Include>',
    '',
  ].join('\n');

  // The template references the replacement slot where the include will land.
  const TEMPLATE_MDX = [
    '## Section',
    '',
    '<Reference refKey="code-intro" type="replacement" />',
    '',
    'Some template content.',
    '',
  ].join('\n');

  // The inner include that must be resolved from within the slot.
  const INTRO_SNIPPET_MDX = 'Before running this example, call `connect()`.\n';

  const REFERENCES_JSON = JSON.stringify({ substitutions: {}, refs: {} });

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetContentString.mockImplementation(async (relativePath: string) => {
      const map: Record<string, string> = {
        [`${PROJECT}/_includes/template.mdx`]: TEMPLATE_MDX,
        [`${PROJECT}/_includes/intro-snippet.mdx`]: INTRO_SNIPPET_MDX,
        [`${PROJECT}/_references.json`]: REFERENCES_JSON,
      };
      return map[relativePath] ?? null;
    });
  });

  const resolve = async (topPageMdx: string): Promise<string> => {
    const file = await remark()
      .use(remarkFrontmatter, ['yaml'])
      .use(remarkGfm)
      .use(remarkMdx)
      .use(remarkResolveImports, { projectPath: PROJECT })
      .process(topPageMdx);
    return String(file);
  };

  it('resolves an <Include> nested inside a <Replacement> slot', async () => {
    const output = await resolve(PAGE_MDX);

    // The inner include's content should appear in the output.
    expect(output).toContain('call `connect()`');
    // Template content should be present too.
    expect(output).toContain('Some template content');
    // No raw <Include> tags should remain in the output.
    expect(output).not.toContain('<Include');
  });

  it('does not leave raw <Include> components that would crash React at render time', async () => {
    const output = await resolve(PAGE_MDX);

    // A raw unresolved <Include> would look like `<Include src="..." />` in the serialised output.
    expect(output).not.toMatch(/<Include\s/);
  });
});
