import type { ParentNode, TextNode } from '@/types/ast';
import { findKeyValuePair } from '@/utils/find-key-value-pair';

const headingTextNode: TextNode = {
  type: 'text',
  position: {
    start: {
      line: 0,
    },
  },
  value: 'Heading This Way',
};

const testNode: ParentNode = {
  type: 'section',
  position: {
    start: {
      line: 0,
    },
  },
  children: [
    {
      type: 'heading',
      position: {
        start: {
          line: 0,
        },
      },
      children: [headingTextNode],
    },
    {
      type: 'paragraph',
      position: {
        start: {
          line: 0,
        },
      },
      children: [
        {
          type: 'text',
          position: {
            start: {
              line: 0,
            },
          },
          value: 'Find your purpose.',
        },
      ],
    },
  ],
};

describe('findKeyValuePair', () => {
  it('finds correct top level node', () => {
    const result = findKeyValuePair([testNode], 'type', 'section');
    expect(result).toEqual(testNode);
  });

  it('finds correct nested node', () => {
    const result = findKeyValuePair([testNode], 'value', 'Heading This Way');
    expect(result).toEqual(headingTextNode);
  });

  it('returns undefined if includes no matching pair', () => {
    const result = findKeyValuePair([testNode], 'reference', 'I thought it was in here');
    expect(result).toEqual(undefined);
  });
});
