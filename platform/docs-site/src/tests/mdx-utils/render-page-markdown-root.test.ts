import { renderPageMarkdown } from '@/mdx-utils/render-page-markdown';
import { fetchMdxString } from '@/mdx-utils/fetch-mdx-string';

// mdx-to-md is ESM-only, which Jest cannot load.
jest.mock('mdx-to-md', () => ({ mdxToMarkdown: jest.fn(async (mdx: string) => `converted: ${mdx}`) }), {
  virtual: true,
});
jest.mock('@/mdx-utils/fetch-mdx-string');
jest.mock('@/mdx-utils/load-metadata', () => ({
  findProjectPathAndSiteJson: jest.fn(async () => ({ projectPath: 'landing', siteMetadata: {} })),
}));
jest.mock('@/mdx-utils/remark-pre-resolve-imports-for-markdown', () => ({
  preResolveImportsForMarkdownExport: jest.fn(async (mdx: string) => mdx),
}));
// Pulls in the React component tree, which the markdown export does not use.
jest.mock('@/mdx-utils/load-mdx', () => ({ isVersionPlaceholder: (seg: string) => seg === ':version' }));
jest.mock('@/utils/extract-mdx-routes-from-toc', () => ({ getStaticVersion: () => 'current' }));
jest.mock('@/mdx-utils/blob-path-remap', () => ({
  ...jest.requireActual('@/mdx-utils/blob-path-remap'),
  loadDirNameToPrefixMap: jest.fn(async () => ({
    landing: 'docs',
    manual: 'docs',
    'mongodb-intellij': 'docs/mongodb-intellij',
  })),
}));

const mockFetchMdxString = jest.mocked(fetchMdxString);

describe('renderPageMarkdown at the basePath root', () => {
  const originalBasePath = process.env.NEXT_PUBLIC_DOCS_BASE_PATH;

  afterEach(() => {
    process.env.NEXT_PUBLIC_DOCS_BASE_PATH = originalBasePath;
    mockFetchMdxString.mockReset();
  });

  // Landing has no docset prefix, so its root route has no segments at all. The
  // HTML route loads that root as `index`; the export has to find the same file.
  it("renders landing's root from its index page", async () => {
    process.env.NEXT_PUBLIC_DOCS_BASE_PATH = '/docs';
    mockFetchMdxString.mockImplementation(async (path) => (path === 'landing/index' ? '# Welcome' : null));

    const markdown = await renderPageMarkdown([], 'default');

    expect(markdown).toContain('converted: # Welcome');
  });

  it('returns null when landing has no index page', async () => {
    process.env.NEXT_PUBLIC_DOCS_BASE_PATH = '/docs';
    mockFetchMdxString.mockResolvedValue(null);

    await expect(renderPageMarkdown([], 'default')).resolves.toBeNull();
  });

  it("keeps resolving a prefixed docset's root by its own name, not `index`", async () => {
    process.env.NEXT_PUBLIC_DOCS_BASE_PATH = '/docs/mongodb-intellij';
    mockFetchMdxString.mockImplementation(async (path) => (path === 'mongodb-intellij' ? '# IntelliJ' : null));

    const markdown = await renderPageMarkdown([], 'default');

    expect(markdown).toContain('converted: # IntelliJ');
    expect(mockFetchMdxString).not.toHaveBeenCalledWith(expect.stringMatching(/(^|\/)index$/));
  });
});
