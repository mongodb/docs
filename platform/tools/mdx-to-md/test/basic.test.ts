import { describe, it } from 'vitest';
import { testConversion, testContains, testNotContains } from './helpers.js';

describe('Basic MDX to Markdown Conversion', () => {
  it('should convert simple markdown', async () => {
    await testConversion(
      '# Hello World\n\nThis is a test.',
      '# Hello World\n\nThis is a test.'
    );
  });

  it('should preserve code blocks', async () => {
    await testConversion(
      '```javascript\nconst x = 1;\n```',
      '```javascript\nconst x = 1;\n```'
    );
  });

  it('should preserve lists', async () => {
    await testConversion(
      '- Item 1\n- Item 2\n- Item 3',
      '- Item 1\n- Item 2\n- Item 3'
    );
  });

  it('should preserve links', async () => {
    await testConversion(
      '[Link text](https://example.com)',
      '[Link text](https://example.com)'
    );
  });
});

describe('Frontmatter', () => {
  it('should not include YAML frontmatter in output', async () => {
    const mdx = `---
title: Test Page
description: A test page
---

# Content`;
    await testContains(mdx, '# Content');
    await testNotContains(mdx, ['---', 'title:', 'description:']);
  });

  it('should omit complex frontmatter from output', async () => {
    const mdx = `---
selectors:
  drivers:
    nodejs:
      - type: text
        value: Node.js
---

# Content`;

    await testNotContains(mdx, ['---', 'selectors:', 'drivers:', 'Node.js']);
    await testContains(mdx, '# Content');
  });
});

