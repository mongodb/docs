import { describe, it, expect } from 'vitest';
import { testContains, testNotContains } from './helpers.js';

/**
 * This file serves as a template for testing new component plugins.
 * 
 * To add a test for a new component:
 * 1. Copy one of the describe blocks below
 * 2. Replace "ComponentName" with your component name
 * 3. Add test cases for your component's transformation
 * 4. Update the expected output based on how your plugin transforms the component
 * 
 * Example:
 * 
 * describe('Tabs Component', () => {
 *   it('should transform Tabs to expected markdown', async () => {
 *     const mdx = `<Tabs><Tab tabid="js">JS</Tab></Tabs>`;
 *     await testContains(mdx, 'expected markdown output');
 *   });
 * });
 */

describe('ESM Import Stripping', () => {
  it('should remove ESM imports', async () => {
    const mdx = `import { Component } from './component.mdx';

# Content`;

    await testNotContains(mdx, "import { Component }");
    await testContains(mdx, '# Content');
  });

  it('should remove multiple ESM imports', async () => {
    const mdx = `import { A } from './a.mdx';
import { B } from './b.mdx';

# Content`;

    await testNotContains(mdx, ['import { A }', "import { B }"]);
    await testContains(mdx, '# Content');
  });
});

describe('Strip custom MDX (after other plugins)', () => {
  it('should replace unhandled flow components with plain text', async () => {
    const mdx = `<Admonition title="Note">Inner content here.</Admonition>`;
    await testContains(mdx, 'Inner content here.');
    await testNotContains(mdx, '<Admonition');
  });

  it('should replace unhandled inline components with plain text', async () => {
    const mdx = `Before <Badge>beta</Badge> after`;
    await testContains(mdx, 'Before beta after');
    await testNotContains(mdx, '<Badge');
  });

  it('should not strip known components that other plugins handle', async () => {
    // Image is handled by transformImage before stripCustomMdx
    const mdx = `<Image src="/logo.png" alt="Logo" />`;
    await testContains(mdx, '![Logo](/logo.png)');
    await testNotContains(mdx, '<Image');
  });

  it('should preserve spaces and line breaks when unwrapping', async () => {
    const mdx = `<Wrap>
First paragraph.

Second paragraph with **bold**.
</Wrap>`;
    await testContains(mdx, 'First paragraph.');
    await testContains(mdx, 'Second paragraph with **bold**.');
    await testContains(mdx, 'First paragraph.\n\nSecond paragraph');
    await testNotContains(mdx, '<Wrap');
  });
});

describe('Headings (Section/Heading → markdown # levels)', () => {
  it('should convert root-level Heading to h1 (# )', async () => {
    const mdx = `<Heading>Document Title</Heading>`;
    await testContains(mdx, '# Document Title');
    await testNotContains(mdx, '<Heading>');
  });

  it('should convert Section > Heading to h1 (# )', async () => {
    const mdx = `<Section><Heading>Section Title</Heading>Body</Section>`;
    await testContains(mdx, '# Section Title');
    await testNotContains(mdx, '<Section>');
    await testNotContains(mdx, '<Heading>');
  });

  it('should convert nested Section > Section > Heading to h1 and h2', async () => {
    const mdx = `<Section>
  <Heading>Level 1</Heading>
  <Section>
    <Heading>Level 2</Heading>
    Content
  </Section>
</Section>`;
    await testContains(mdx, '# Level 1');
    await testContains(mdx, '## Level 2');
  });

  it('should use explicit depth attribute when present', async () => {
    const mdx = `<Heading depth={3}>Explicit H3</Heading>`;
    await testContains(mdx, '### Explicit H3');
  });
});

