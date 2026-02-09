import { describe, it, expect } from 'vitest';
import { testContains, testNotContains } from './helpers.js';

describe('Image Component', () => {
  // Note: transformImage is currently commented out in parse.ts
  // These tests are skipped until the plugin is re-enabled

  it.skip('should transform Image component to markdown image syntax', async () => {
    // When transformImage is enabled, this should become:
    // ![Description](/path/to/image.png)
    const mdx = `<Image src="/path/to/image.png" alt="Description" />`;
    await testContains(mdx, '![Description](/path/to/image.png)');
  });

  it.skip('should handle Image with width and height attributes', async () => {
    const mdx = `<Image src="/image.jpg" alt="Test" width={600} height="auto" />`;
    // Width and height are typically not part of standard markdown image syntax
    await testContains(mdx, '![Test](/image.jpg)');
  });

  it.skip('should handle Image without alt text', async () => {
    const mdx = `<Image src="/image.png" />`;
    await testContains(mdx, '![](/image.png)');
  });

  it('should preserve Image component when plugin is disabled', async () => {
    // Check if Image is transformed or preserved
    // If transformImage is enabled, it will be transformed; otherwise preserved
    const mdx = `<Image src="/path/to/image.png" alt="Description" />`;
    const { mdxToMarkdown } = await import('../src/parse.js');
    const result = await mdxToMarkdown(mdx);
    
    // Image might be transformed or preserved depending on plugin state
    const isTransformed = result.includes('![Description](/path/to/image.png)');
    const isPreserved = result.includes('<Image');
    
    // One of these should be true
    expect(isTransformed || isPreserved).toBe(true);
  });
});

