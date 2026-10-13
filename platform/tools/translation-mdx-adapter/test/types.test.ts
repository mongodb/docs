import { describe, it, expect } from 'vitest';
import type { PlaceholderRecord, ManifestEntry, ContentObject } from '../src/types.js';
import {
  isWrapPlaceholder,
  isOpaquePlaceholder,
  isBlockEntry,
  isFrontmatterEntry,
  isPropEntry,
  isJsxElement,
} from '../src/types.js';

describe('placeholder guards', () => {
  const wrap: PlaceholderRecord = {
    kind: 'wrap',
    open: 'O0',
    close: 'C0',
    node: { type: 'emphasis', children: [] },
  };
  const opaque: PlaceholderRecord = {
    kind: 'opaque',
    token: 'S0',
    node: { type: 'inlineCode', value: 'x' },
  };

  it('discriminates wrap vs opaque', () => {
    expect(isWrapPlaceholder(wrap)).toBe(true);
    expect(isWrapPlaceholder(opaque)).toBe(false);
    expect(isOpaquePlaceholder(opaque)).toBe(true);
    expect(isOpaquePlaceholder(wrap)).toBe(false);
  });
});

describe('manifest entry guards', () => {
  const block: ManifestEntry = {
    kind: 'block',
    key: 'paragraph[0]',
    node: { type: 'paragraph', children: [] },
    placeholders: [],
  };
  const front: ManifestEntry = {
    kind: 'frontmatter',
    key: 'frontmatter.description',
    field: 'description',
  };
  const prop: ManifestEntry = {
    kind: 'prop',
    key: 'image[0].@alt',
    node: { type: 'mdxJsxFlowElement', name: 'Image', attributes: [], children: [] },
    attr: 'alt',
  };

  it('discriminates block, frontmatter, and prop', () => {
    expect(isBlockEntry(block)).toBe(true);
    expect(isBlockEntry(front)).toBe(false);
    expect(isFrontmatterEntry(front)).toBe(true);
    expect(isFrontmatterEntry(block)).toBe(false);
    expect(isPropEntry(prop)).toBe(true);
    expect(isPropEntry(block)).toBe(false);
  });
});

describe('isJsxElement', () => {
  it('is true for flow and text JSX elements, false otherwise', () => {
    expect(isJsxElement({ type: 'mdxJsxFlowElement', name: 'Note', attributes: [], children: [] })).toBe(true);
    expect(isJsxElement({ type: 'mdxJsxTextElement', name: 'Guilabel', attributes: [], children: [] })).toBe(true);
    expect(isJsxElement({ type: 'paragraph', children: [] })).toBe(false);
    expect(isJsxElement({ type: 'text', value: 'x' })).toBe(false);
  });
});

describe('content object shape', () => {
  it('assembles with an empty manifest', () => {
    const content: ContentObject = {
      payload: { 'paragraph[0]': 'Hello' },
      non_translatable_terms: [],
      manifest: { tree: { type: 'root', children: [] }, entries: new Map() },
    };
    expect(content.payload['paragraph[0]']).toBe('Hello');
    expect(content.manifest.entries.size).toBe(0);
  });
});
