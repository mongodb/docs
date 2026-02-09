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

