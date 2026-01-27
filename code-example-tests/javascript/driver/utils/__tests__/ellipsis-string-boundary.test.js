/**
 * Tests to verify that ellipsis inside quoted strings are preserved correctly.
 * This validates that the JavaScript Driver does NOT have the string boundary bug
 * that was fixed in mongosh commit fbccfb5c64bb.
 *
 * The JavaScript Driver handles this correctly by converting single quotes to
 * double quotes BEFORE processing ellipsis transformations.
 */

const { parseExpectedOutput } = require('../comparison/fileParser');
const Expect = require('../Expect');

describe('Ellipsis String Boundary Tests', () => {
  describe('Ellipsis inside quoted strings should be preserved', () => {
    test('should preserve ellipsis at end of single-quoted string', () => {
      const input = `{ plot: 'Story ends...', title: 'Test Movie' }`;
      const result = parseExpectedOutput(input);

      expect(result.success).toBe(true);
      expect(result.data[0].plot).toBe('Story ends...');
      expect(result.data[0].title).toBe('Test Movie');
    });

    test('should preserve ellipsis in double-quoted strings', () => {
      const input = `{ plot: "Story ends...", title: "Test Movie" }`;
      const result = parseExpectedOutput(input);

      expect(result.success).toBe(true);
      expect(result.data[0].plot).toBe('Story ends...');
      expect(result.data[0].title).toBe('Test Movie');
    });

    test('should handle multiple ellipsis patterns in one document', () => {
      const input = `{ plot: 'What do you love the most?", "What scares you the most?",...', title: 'Test Movie', year: 2024 }`;
      const result = parseExpectedOutput(input);

      expect(result.success).toBe(true);
      expect(result.data[0].plot).toBe(
        'What do you love the most?", "What scares you the most?",...'
      );
      expect(result.data[0].title).toBe('Test Movie');
      expect(result.data[0].year).toBe(2024);
    });

    test('should distinguish between ellipsis in strings vs unquoted ellipsis', () => {
      const input = `
{ plot: 'Story continues...', _id: ... }
...
{ title: 'Test' }
`;
      const result = parseExpectedOutput(input);

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(2);

      // First document: ellipsis in string should be preserved, unquoted ellipsis should be quoted
      expect(result.data[0].plot).toBe('Story continues...');
      expect(result.data[0]._id).toBe('...');
      expect(result.data[0]['...']).toBe('...');

      // Second document: should have global ellipsis marker
      expect(result.data[1].title).toBe('Test');
      expect(result.data[1]['...']).toBe('...');
    });

    test('should handle ellipsis in array element strings', () => {
      const input = `[
  { plot: 'Story continues...', title: 'Movie 1' },
  { plot: 'Another story...', title: 'Movie 2' }
]`;
      const result = parseExpectedOutput(input);

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(2);
      expect(result.data[0].plot).toBe('Story continues...');
      expect(result.data[0].title).toBe('Movie 1');
      expect(result.data[1].plot).toBe('Another story...');
      expect(result.data[1].title).toBe('Movie 2');
    });
  });

  describe('Property-level unquoted ellipsis', () => {
    test('should parse unquoted ellipsis as property value', () => {
      const input = `[
  { _id: ... , count: ... },
  { _id: ... , count: ... }
]`;

      const result = parseExpectedOutput(input);

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(2);
      expect(result.data[0]._id).toBe('...');
      expect(result.data[0].count).toBe('...');
      expect(result.data[1]._id).toBe('...');
      expect(result.data[1].count).toBe('...');
    });

    test('should handle both quoted and unquoted ellipsis equivalently', () => {
      const unquotedInput = `{ _id: ... , count: ... }`;
      const quotedInput = `{ _id: '...' , count: '...' }`;

      const unquotedResult = parseExpectedOutput(unquotedInput);
      const quotedResult = parseExpectedOutput(quotedInput);

      expect(unquotedResult.success).toBe(true);
      expect(quotedResult.success).toBe(true);
      expect(unquotedResult.data[0]._id).toBe(quotedResult.data[0]._id);
      expect(unquotedResult.data[0].count).toBe(quotedResult.data[0].count);
    });
  });

  describe('Array-level unquoted ellipsis', () => {
    test('should parse standalone ellipsis in array', () => {
      const input = `[
  { _id: ... , count: ... },
  { _id: ... , count: ... },
  ...
]`;

      const result = parseExpectedOutput(input);

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(3);
      expect(result.data[0]._id).toBe('...');
      expect(result.data[0].count).toBe('...');
      expect(result.data[1]._id).toBe('...');
      expect(result.data[1].count).toBe('...');
      expect(result.data[2]).toBe('...');
    });

    test('should handle array with only ellipsis elements', () => {
      const input = `[..., ..., ...]`;

      const result = parseExpectedOutput(input);

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(3);
      expect(result.data[0]).toBe('...');
      expect(result.data[1]).toBe('...');
      expect(result.data[2]).toBe('...');
    });

    test('should handle mixed quoted and unquoted ellipsis in array', () => {
      const input = `['...', ..., '...']`;

      const result = parseExpectedOutput(input);

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(3);
      expect(result.data[0]).toBe('...');
      expect(result.data[1]).toBe('...');
      expect(result.data[2]).toBe('...');
    });

    test('should handle ellipsis at start of array', () => {
      const input = `[..., { name: 'last' }]`;

      const result = parseExpectedOutput(input);

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(2);
      expect(result.data[0]).toBe('...');
      expect(result.data[1].name).toBe('last');
    });

    test('should handle ellipsis in middle of array', () => {
      const input = `[{ name: 'first' }, ..., { name: 'last' }]`;

      const result = parseExpectedOutput(input);

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(3);
      expect(result.data[0].name).toBe('first');
      expect(result.data[1]).toBe('...');
      expect(result.data[2].name).toBe('last');
    });

    test('should handle complex mixing in arrays', () => {
      const input = `[
  { _id: ... , count: 42 },
  { _id: ... , count: 17 },
  ...
]`;

      const result = parseExpectedOutput(input);

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(3);
      expect(result.data[0]._id).toBe('...');
      expect(result.data[0].count).toBe(42);
      expect(result.data[1]._id).toBe('...');
      expect(result.data[1].count).toBe(17);
      expect(result.data[2]).toBe('...');
    });
  });
});
