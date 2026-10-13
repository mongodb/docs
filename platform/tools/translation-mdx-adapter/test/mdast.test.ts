import { describe, it, expect } from 'vitest';
import { parseMdx, stringifyMdx } from '../src/mdast.js';

const SOURCE = `---
title: Stable API
description: Learn about the Stable API.
---

# Introduction

See the *guide* for \`mongosh\` details.

<Note>
  Back up first.
</Note>

- First item
- Second item

\`\`\`js
const x = 1;
\`\`\`
`;

describe('parseMdx', () => {
  it('parses frontmatter, JSX, and markdown into one tree', () => {
    const tree = parseMdx(SOURCE);
    expect(tree.type).toBe('root');
    const types = tree.children.map((c) => c.type);
    expect(types).toContain('yaml');
    expect(types).toContain('heading');
    expect(types).toContain('mdxJsxFlowElement');
    expect(types).toContain('list');
    expect(types).toContain('code');
  });
});

describe('stringifyMdx', () => {
  it('preserves JSX components, frontmatter, and code fences', () => {
    const out = stringifyMdx(parseMdx(SOURCE));
    expect(out).toContain('<Note>');
    expect(out).toContain('title: Stable API');
    expect(out).toContain('const x = 1;');
    expect(out).toContain('mongosh');
  });

  it('is idempotent — the normalization baseline is stable', () => {
    const once = stringifyMdx(parseMdx(SOURCE));
    const twice = stringifyMdx(parseMdx(once));
    expect(twice).toBe(once);
  });
});
