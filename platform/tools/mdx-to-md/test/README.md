# Test Suite

This test suite is designed to be easily extensible as new MDX component plugins are added.

## Structure

- `helpers.ts` - Shared test utilities and helpers
- `basic.test.ts` - Tests for basic MDX to Markdown conversion
- `include.test.ts` - Tests for the Include component plugin
- `image.test.ts` - Tests for the Image component plugin
- `plugins.test.ts` - Template and tests for other plugins

## Adding Tests for New Components

When you add a new component plugin (e.g., `transform-tabs.ts`), follow these steps:

1. **Create a new test file** (e.g., `tabs.test.ts`):

```typescript
import { describe, it } from 'vitest';
import { testContains, testNotContains, testConversion } from './helpers.js';

describe('Tabs Component', () => {
  it('should transform Tabs to expected markdown', async () => {
    const mdx = `<Tabs>
  <Tab tabid="js">JavaScript</Tab>
  <Tab tabid="py">Python</Tab>
</Tabs>`;

    // Test the expected output
    await testContains(mdx, 'expected markdown output');
  });
});
```

2. **Or add to existing test file** if it's related (e.g., add Tab tests to `plugins.test.ts`)

3. **Use the helper functions**:
   - `testConversion(mdx, expected)` - Test exact output
   - `testContains(mdx, text)` - Test that output contains text
   - `testNotContains(mdx, text)` - Test that output doesn't contain text

## Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run specific test file
pnpm test tabs.test.ts
```

## Test Helpers

### `testConversion(mdx, expected, options?)`
Tests that MDX input produces exact expected output.

### `testContains(mdx, text, options?)`
Tests that the output contains the specified text(s).

### `testNotContains(mdx, text, options?)`
Tests that the output does NOT contain the specified text(s).

### Options
- `contentMdxDir` - Directory for resolving includes
- `sourceFilePath` - Source file path for version context

