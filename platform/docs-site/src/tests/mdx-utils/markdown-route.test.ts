import { generateMarkdownStaticParams } from '@/mdx-utils/markdown-route';
import { generateDocsStaticPaths } from '@/utils/generate-docs-paths';

jest.mock('@/utils/generate-docs-paths');
// Pulls in mdx-to-md, which this test does not exercise.
jest.mock('@/mdx-utils/render-page-markdown', () => ({ renderPageMarkdown: jest.fn() }));

describe('generateMarkdownStaticParams', () => {
  // The export routes are optional catch-alls, so a non-versioned docset's root
  // page (an empty path) must be prerendered alongside its subpages.
  it('keeps the empty root path, matching the HTML page route', async () => {
    const paths = [{ path: [] }, { path: ['security'] }, { path: ['clusters', 'foo'] }];
    jest.mocked(generateDocsStaticPaths).mockResolvedValue(paths);

    await expect(generateMarkdownStaticParams()).resolves.toEqual(paths);
  });
});
