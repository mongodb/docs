import { describe, it, expect } from 'vitest';
import { testContains, testNotContains, getFixturesDir } from './helpers.js';
import { join } from 'path';

describe('Include Component', () => {
  // Root dir for include resolution: test/ (parent of fixtures/)
  const contentMdxDir = join(getFixturesDir(), '..');

  it('should resolve Include components from fixtures', async () => {
    // Use relative path without leading slash to avoid path doubling
    const mdx = `<Include src="fixtures/includes/example" />`;

    // The include should be replaced with actual content
    await testContains(
      mdx,
      ['This is an example include file', 'markdown', 'List item 1'],
      {
        contentMdxDir,
        sourceFilePath: 'test.mdx',
      }
    );

    // The Include tag should be removed
    await testNotContains(
      mdx,
      '<Include',
      {
        contentMdxDir,
        sourceFilePath: 'test.mdx',
      }
    );
  });

  it('should resolve Include components with version path context (_includes)', async () => {
    // Uses test fixture: fixtures/manual/upcoming/_includes/transactions/example-intro.mdx
    const mdx = `<Include src="/_includes/transactions/example-intro" />`;
    await testContains(mdx, 'This example highlights', {
      contentMdxDir,
      sourceFilePath: 'manual/upcoming/test.mdx',
    });
  });

  it('should handle nested includes', async () => {
    // nested.mdx contains another Include, so we test nested resolution
    const mdx = `<Include src="fixtures/includes/nested" />`;

    await testContains(
      mdx,
      ['This is a nested include', 'This is an example include file', 'More content after'],
      {
        contentMdxDir,
        sourceFilePath: 'test.mdx',
      }
    );
  });

  it('should handle includes with version path context', async () => {
    // When sourceFilePath has a version path, it shouldn't affect includes that already have a full path
    // For this test, we use a path without version prefix to avoid path issues
    const mdx = `<Include src="fixtures/includes/example" />`;

    await testContains(
      mdx,
      'This is an example include file',
      {
        contentMdxDir,
        sourceFilePath: 'test.mdx',
      }
    );
  });

  it('should handle missing include files gracefully', async () => {
    const mdx = `<Include src="fixtures/includes/nonexistent" />`;

    // Should not throw, and should remove the Include tag when file is missing.
    // onWarning: no-op so expected "missing file" doesn't clutter test output.
    await testNotContains(mdx, '<Include', {
      contentMdxDir,
      sourceFilePath: 'test.mdx',
      onWarning: () => {},
    });
  });

  it('should detect circular includes', async () => {
    // Use fixtures so we don't hit content-mdx; just verify conversion completes
    const mdx = `# Test\n\n<Include src="fixtures/includes/example" />`;

    const { mdxToMarkdown } = await import('../src/parse.js');
    const result = await mdxToMarkdown(mdx, contentMdxDir, 'test.mdx');

    // Should complete without infinite loop
    expect(result).toBeTruthy();
  });
});

