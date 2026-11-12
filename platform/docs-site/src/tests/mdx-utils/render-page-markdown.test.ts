import { renderPageMarkdown } from '@/mdx-utils/render-page-markdown';
import { findProjectPathAndSiteJson } from '@/mdx-utils/load-metadata';
import { buildPageLocation } from '@/mdx-utils/page-location';

jest.mock('mdx-to-md', () => ({ mdxToMarkdown: jest.fn().mockResolvedValue('# Shards') }), { virtual: true });
jest.mock('@/mdx-utils/fetch-mdx-string', () => ({ fetchMdxString: jest.fn().mockResolvedValue('# Shards') }));
jest.mock('@/mdx-utils/load-metadata');
jest.mock('@/mdx-utils/page-location');
jest.mock('@/mdx-utils/remark-pre-resolve-imports-for-markdown', () => ({
  preResolveImportsForMarkdownExport: jest.fn().mockResolvedValue('# Shards'),
}));
jest.mock('@/mdx-utils/mdx-has-tabs', () => ({ mdxHasTabs: jest.fn().mockReturnValue(false) }));
jest.mock('@/mdx-utils/resolve-tab-defaults', () => ({ resolveTabDefaults: jest.fn().mockReturnValue({}) }));
jest.mock('@/mdx-utils/load-mdx', () => ({ isVersionPlaceholder: () => false }));
jest.mock('@/mdx-utils/blob-path-remap', () => ({
  loadDirNameToPrefixMap: jest.fn().mockResolvedValue({}),
  blobRelativeToDiskCandidates: (path: string) => [path],
}));

const LOCATION = '> This page location: /docs.md > /docs/manual/sharding.md';
const PAGE = ['manual', 'core', 'sharded-cluster-shards'];

const mockSiteJson = (eol: boolean) =>
  jest.mocked(findProjectPathAndSiteJson).mockResolvedValue({
    projectPath: 'manual/manual',
    siteMetadata: { eol } as Awaited<ReturnType<typeof findProjectPathAndSiteJson>>['siteMetadata'],
  });

describe('renderPageMarkdown page location', () => {
  beforeEach(() => {
    jest.mocked(buildPageLocation).mockReset().mockReturnValue(LOCATION);
  });

  it('puts the page location first, above the llms.txt directive', async () => {
    mockSiteJson(false);

    const markdown = await renderPageMarkdown(PAGE, 'default');

    expect(buildPageLocation).toHaveBeenCalledWith('/docs/manual/core/sharded-cluster-shards', 'manual');
    expect(markdown).toBe(
      `${LOCATION}\n\n> For the complete MongoDB documentation index, see www.mongodb.com/docs/llms.txt\n\n# Shards`,
    );
  });

  it('leaves the page location off EOL pages', async () => {
    mockSiteJson(true);

    const markdown = await renderPageMarkdown(PAGE, 'default');

    expect(buildPageLocation).not.toHaveBeenCalled();
    expect(markdown).toBe('> For the complete MongoDB documentation index, see www.mongodb.com/docs/llms.txt\n\n# Shards');
  });

  it('leaves the page location off when the site metadata cannot be found', async () => {
    jest.mocked(findProjectPathAndSiteJson).mockRejectedValue(new Error('not found'));

    const markdown = await renderPageMarkdown(PAGE, 'default');

    expect(buildPageLocation).not.toHaveBeenCalled();
    expect(markdown).not.toContain('This page location');
  });

  it('leaves out the line when the page is not in the TOC', async () => {
    mockSiteJson(false);
    jest.mocked(buildPageLocation).mockReturnValue(null);

    const markdown = await renderPageMarkdown(PAGE, 'default');

    expect(markdown).toBe('> For the complete MongoDB documentation index, see www.mongodb.com/docs/llms.txt\n\n# Shards');
  });
});
