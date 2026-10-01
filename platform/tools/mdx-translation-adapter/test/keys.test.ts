import { describe, it, expect } from 'vitest';
import { labelOf, segmentsFor, joinKey } from '../src/keys.js';

// Minimal stand-in nodes; only `type`/`name` matter to the key logic.
const heading = { type: 'heading' };
const paragraph = { type: 'paragraph' };
const list = { type: 'list' };
const item = { type: 'listItem' };
const banner = { type: 'mdxJsxFlowElement', name: 'Banner' };

describe('labelOf', () => {
  it('uses node type for standard nodes', () => {
    expect(labelOf(heading)).toBe('heading');
    expect(labelOf(paragraph)).toBe('paragraph');
    expect(labelOf(list)).toBe('list');
  });
  it('maps listItem to "item"', () => {
    expect(labelOf(item)).toBe('item');
  });
  it('uses the lowercased JSX name for components', () => {
    expect(labelOf(banner)).toBe('banner');
  });
});

describe('segmentsFor', () => {
  it('numbers per-type among preceding siblings, in one pass', () => {
    const siblings = [heading, paragraph, paragraph, list];
    expect(segmentsFor(siblings)).toEqual(['heading[0]', 'paragraph[0]', 'paragraph[1]', 'list[0]']);
  });
});

describe('full disciplined key example', () => {
  it('matches the design-doc example', () => {
    // root children: heading, paragraph, banner(2 paragraphs), list(2 items)
    const p1 = { type: 'paragraph' };
    const p2 = { type: 'paragraph' };
    const i1 = { type: 'listItem' };
    const i2 = { type: 'listItem' };
    const bannerNode = { type: 'mdxJsxFlowElement', name: 'Banner', children: [p1, p2] };
    const listNode = { type: 'list', children: [i1, i2] };
    const root = { type: 'root', children: [heading, paragraph, bannerNode, listNode] };

    const keys: string[] = [];
    // walk one level then into containers, threading segments
    const topSegs = segmentsFor(root.children);
    root.children.forEach((child, ci) => {
      const seg = topSegs[ci];
      const container = child as { children?: unknown[] };
      if (Array.isArray(container.children)) {
        const childSegs = segmentsFor(container.children);
        container.children.forEach((gc, gi) => {
          keys.push(joinKey([seg, childSegs[gi]]));
        });
      } else {
        keys.push(joinKey([seg]));
      }
    });

    expect(keys).toEqual([
      'heading[0]',
      'paragraph[0]',
      'banner[0].paragraph[0]',
      'banner[0].paragraph[1]',
      'list[0].item[0]',
      'list[0].item[1]',
    ]);
  });
});
