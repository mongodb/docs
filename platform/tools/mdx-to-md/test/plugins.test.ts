import { describe, it, expect } from 'vitest';
import { testContains, testNotContains, getFixturesDir } from './helpers.js';
import { join } from 'path';

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

describe('Code Block Info Cleanup', () => {
  it('should strip props from fenced code block info strings', async () => {
    const mdx = `\`\`\`sh copyable={true} linenos={false}
echo hello
\`\`\``;
    // Language is kept, props are stripped
    await testContains(mdx, '```sh');
    await testNotContains(mdx, 'copyable');
    await testNotContains(mdx, 'linenos');
  });

  it('should leave plain language identifiers unchanged', async () => {
    const mdx = `\`\`\`python
print("hi")
\`\`\``;
    await testContains(mdx, '```python');
  });
});

describe('Tabs Component', () => {
  it('should render each Tab as an H3 heading followed by its content', async () => {
    const mdx = `<Tabs>
  <Tab tabid="cli" name="Atlas CLI">

    CLI content here.

  </Tab>
  <Tab tabid="ui" name="Atlas UI">

    UI content here.

  </Tab>
</Tabs>`;
    await testContains(mdx, ['### Atlas CLI', 'CLI content here', '### Atlas UI', 'UI content here']);
    await testNotContains(mdx, ['<Tabs', '<Tab', 'tabid']);
  });

  it('should preserve content order across multiple tabs', async () => {
    const mdx = `<Tabs>
  <Tab name="First">

    First tab content.

  </Tab>
  <Tab name="Second">

    Second tab content.

  </Tab>
  <Tab name="Third">

    Third tab content.

  </Tab>
</Tabs>`;
    const { mdxToMarkdown } = await import('../src/parse.js');
    const result = await mdxToMarkdown(mdx);
    const firstIdx = result.indexOf('### First');
    const secondIdx = result.indexOf('### Second');
    const thirdIdx = result.indexOf('### Third');
    expect(firstIdx).toBeLessThan(secondIdx);
    expect(secondIdx).toBeLessThan(thirdIdx);
  });
});

describe('Procedure / Step Components', () => {
  it('should convert <Procedure>/<Step> with <StepHeading> to an ordered list', async () => {
    const mdx = `<Procedure style="normal">
  <Step>
    <StepHeading>

      First step title.

    </StepHeading>
  </Step>

  <Step>
    <StepHeading>

      Second step title.

    </StepHeading>
  </Step>
</Procedure>`;

    await testContains(mdx, ['1.', 'First step title', '2.', 'Second step title']);
    await testNotContains(mdx, ['<Procedure', '<Step', '<StepHeading']);
  });

  it('should convert <Procedure>/<Step> with markdown headings to an ordered list', async () => {
    const mdx = `<Procedure style="normal">
  <Step>

    #### View all of your organizations.

    - Sub-item A.
    - Sub-item B.

  </Step>

  <Step>

    #### Click Next.

  </Step>
</Procedure>`;

    const { mdxToMarkdown } = await import('../src/parse.js');
    const result = await mdxToMarkdown(mdx);

    expect(result).toContain('1.');
    expect(result).toContain('View all of your organizations');
    expect(result).toContain('Sub-item A');
    expect(result).toContain('2.');
    expect(result).toContain('Click Next');
    expect(result).not.toContain('<Procedure');
    expect(result).not.toContain('<Step');
  });

  it('should nest sub-content (bullets, paragraphs) inside the numbered step', async () => {
    const mdx = `<Procedure style="normal">
  <Step>
    <StepHeading>

      Configure the settings.

    </StepHeading>

    - Enable option A.
    - Enable option B.

    See the documentation for details.

  </Step>
</Procedure>`;

    const { mdxToMarkdown } = await import('../src/parse.js');
    const result = await mdxToMarkdown(mdx);

    // Step title as item 1
    expect(result).toContain('1.');
    expect(result).toContain('Configure the settings');
    // Sub-bullets and body paragraph present
    expect(result).toContain('Enable option A');
    expect(result).toContain('Enable option B');
    expect(result).toContain('See the documentation for details');
    // No raw MDX tags
    expect(result).not.toContain('<Step');
  });
});

describe('Substitution References from _references.ts', () => {
  // Fixture project has _references.ts with "service": "Atlas", "product": "MongoDB"
  const contentMdxDir = join(getFixturesDir(), '..');
  const sourceFilePath = 'fixtures/project/page.mdx';

  it('should replace <Reference type="substitution" refKey="..."> with the value from _references.ts', async () => {
    const mdx = `Use <Reference refKey="service" type="substitution" /> to manage data.`;
    await testContains(mdx, 'Use Atlas to manage data.', { contentMdxDir, sourceFilePath });
  });

  it('should handle multiple substitution references in one file', async () => {
    const mdx = `<Reference refKey="service" type="substitution" /> and <Reference refKey="product" type="substitution" />.`;
    await testContains(mdx, ['Atlas', 'MongoDB'], { contentMdxDir, sourceFilePath });
  });

  it('should remove unresolved substitution references gracefully', async () => {
    const mdx = `Before <Reference refKey="unknown-key" type="substitution" /> after.`;
    // Unresolved refs are stripped; surrounding text remains
    await testContains(mdx, 'Before', { contentMdxDir, sourceFilePath });
    await testNotContains(mdx, '<Reference', { contentMdxDir, sourceFilePath });
  });
});

