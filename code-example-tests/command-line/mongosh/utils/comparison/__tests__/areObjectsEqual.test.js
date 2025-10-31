const { areObjectsEqual } = require('../areObjectsEqual');

describe('areObjectsEqual', () => {
  describe('primitive comparison', () => {
    test('should match identical primitives', () => {
      expect(areObjectsEqual(1, 1)).toBe(true);
      expect(areObjectsEqual('hello', 'hello')).toBe(true);
      expect(areObjectsEqual(true, true)).toBe(true);
      expect(areObjectsEqual(null, null)).toBe(true);
    });

    test('should not match different primitives', () => {
      expect(areObjectsEqual(1, 2)).toBe(false);
      expect(areObjectsEqual('hello', 'world')).toBe(false);
      expect(areObjectsEqual(true, false)).toBe(false);
      expect(areObjectsEqual(null, undefined)).toBe(false);
    });

    test('should handle type coercion correctly', () => {
      expect(areObjectsEqual(1, '1')).toBe(false);
      expect(areObjectsEqual(0, false)).toBe(false);
      expect(areObjectsEqual('', false)).toBe(false);
    });
  });

  describe('object comparison', () => {
    test('should match identical objects', () => {
      expect(areObjectsEqual({ a: 1 }, { a: 1 })).toBe(true);
      expect(areObjectsEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    });

    test('should match objects with different key order', () => {
      expect(areObjectsEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true);
    });

    test('should not match objects with different values', () => {
      expect(areObjectsEqual({ a: 1 }, { a: 2 })).toBe(false);
    });

    test('should not match objects with different keys', () => {
      expect(areObjectsEqual({ a: 1 }, { b: 1 })).toBe(false);
    });

    test('should not match objects with missing keys', () => {
      expect(areObjectsEqual({ a: 1, b: 2 }, { a: 1 })).toBe(false);
    });

    test('should handle nested objects', () => {
      expect(areObjectsEqual(
        { a: { b: { c: 1 } } },
        { a: { b: { c: 1 } } }
      )).toBe(true);

      expect(areObjectsEqual(
        { a: { b: { c: 1 } } },
        { a: { b: { c: 2 } } }
      )).toBe(false);
    });
  });

  describe('array comparison - unordered', () => {
    test('should match arrays with same elements in different order', () => {
      expect(areObjectsEqual(
        [1, 2, 3],
        [3, 2, 1],
        { comparisonType: 'unordered' }
      )).toBe(true);
      expect(areObjectsEqual(
        [{ a: 1 }, { b: 2 }],
        [{ b: 2 }, { a: 1 }],
        { comparisonType: 'unordered' }
      )).toBe(true);
    });

    test('should match arrays with duplicates', () => {
      expect(areObjectsEqual(
        [1, 2, 2, 3],
        [3, 2, 1, 2],
        { comparisonType: 'unordered' }
      )).toBe(true);
    });

    test('should not match arrays with different lengths', () => {
      expect(areObjectsEqual([1, 2], [1, 2, 3], { comparisonType: 'unordered' })).toBe(false);
    });

    test('should not match arrays with different elements', () => {
      expect(areObjectsEqual([1, 2, 3], [1, 2, 4], { comparisonType: 'unordered' })).toBe(false);
    });

    test('should handle mixed primitive and object arrays', () => {
      expect(areObjectsEqual(
        [1, { a: 1 }, 2],
        [{ a: 1 }, 2, 1],
        { comparisonType: 'unordered' }
      )).toBe(true);
    });
  });

  describe('array comparison - ordered', () => {
    test('should match arrays with same order', () => {
      expect(areObjectsEqual(
        [1, 2, 3],
        [1, 2, 3],
        { comparisonType: 'ordered' }
      )).toBe(true);
    });

    test('should not match arrays with different order', () => {
      expect(areObjectsEqual(
        [1, 2, 3],
        [3, 2, 1],
        { comparisonType: 'ordered' }
      )).toBe(false);
    });

    test('should match ordered object arrays', () => {
      expect(areObjectsEqual(
        [{ a: 1 }, { b: 2 }],
        [{ a: 1 }, { b: 2 }],
        { comparisonType: 'ordered' }
      )).toBe(true);
    });
  });

  describe('ellipsis patterns - property level', () => {
    test('should match any value with ellipsis', () => {
      expect(areObjectsEqual('...', 'any-value')).toBe(true);
      expect(areObjectsEqual('...', 123)).toBe(true);
      expect(areObjectsEqual('...', { nested: 'object' })).toBe(true);
    });

    test('should match object properties with ellipsis', () => {
      expect(areObjectsEqual(
        { _id: '...', name: 'test' },
        { _id: 'abc123', name: 'test' }
      )).toBe(true);
    });

    test('should match all properties with ellipsis', () => {
      expect(areObjectsEqual(
        { _id: '...', timestamp: '...' },
        { _id: 'abc123', timestamp: '2023-01-01' }
      )).toBe(true);
    });
  });

  describe('ellipsis patterns - object level', () => {
    test('should match objects with extra fields using global ellipsis', () => {
      expect(areObjectsEqual(
        { name: 'test', '...': '...' },
        { name: 'test', age: 30, city: 'NYC' }
      )).toBe(true);
    });

    test('should still validate specified fields with global ellipsis', () => {
      expect(areObjectsEqual(
        { name: 'test', '...': '...' },
        { name: 'wrong', age: 30 }
      )).toBe(false);
    });

    test('should match empty object with only ellipsis marker', () => {
      expect(areObjectsEqual(
        { '...': '...' },
        { any: 'fields', can: 'exist' }
      )).toBe(true);
    });
  });

  describe('ellipsis patterns - array level', () => {
    test('should match arrays with ellipsis wildcard', () => {
      expect(areObjectsEqual(
        [1, '...', 4],
        [1, 2, 3, 4]
      )).toBe(true);
    });

    test('should match arrays with multiple ellipsis', () => {
      expect(areObjectsEqual(
        [1, '...', 5, '...', 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9]
      )).toBe(true);
    });

    test('should match empty middle section with ellipsis', () => {
      expect(areObjectsEqual(
        [1, '...', 2],
        [1, 2]
      )).toBe(true);
    });
  });

  describe('truncated string matching', () => {
    test('should match truncated strings', () => {
      expect(areObjectsEqual('Hello...', 'Hello World')).toBe(true);
      expect(areObjectsEqual('Test...', 'Test message here')).toBe(true);
    });

    test('should not match non-matching prefixes', () => {
      expect(areObjectsEqual('Hello...', 'Goodbye World')).toBe(false);
    });

    test('should match exact string without ellipsis', () => {
      expect(areObjectsEqual('Hello', 'Hello')).toBe(true);
    });
  });

  describe('ignored fields', () => {
    test('should ignore specified field values', () => {
      expect(areObjectsEqual(
        { _id: 'any', name: 'test' },
        { _id: 'different', name: 'test' },
        { ignoreFieldValues: ['_id'] }
      )).toBe(true);
    });

    test('should ignore multiple fields', () => {
      expect(areObjectsEqual(
        { _id: 'any', timestamp: 'any', name: 'test' },
        { _id: 'different', timestamp: 'different', name: 'test' },
        { ignoreFieldValues: ['_id', 'timestamp'] }
      )).toBe(true);
    });

    test('should still compare non-ignored fields', () => {
      expect(areObjectsEqual(
        { _id: 'any', name: 'test' },
        { _id: 'different', name: 'wrong' },
        { ignoreFieldValues: ['_id'] }
      )).toBe(false);
    });

    test('should ignore fields in nested objects', () => {
      expect(areObjectsEqual(
        { user: { _id: 'any', name: 'test' } },
        { user: { _id: 'different', name: 'test' } },
        { ignoreFieldValues: ['_id'] }
      )).toBe(true);
    });
  });

  describe('complex nested structures', () => {
    test('should handle deeply nested objects with arrays', () => {
      const expected = {
        users: [
          { name: 'Alice', scores: [1, 2, 3] },
          { name: 'Bob', scores: [4, 5, 6] }
        ]
      };
      const actual = {
        users: [
          { name: 'Bob', scores: [4, 5, 6] },
          { name: 'Alice', scores: [1, 2, 3] }
        ]
      };
      expect(areObjectsEqual(expected, actual, { comparisonType: 'unordered' })).toBe(true);
    });

    test('should handle arrays of nested objects with ellipsis', () => {
      expect(areObjectsEqual(
        [{ _id: '...', name: 'test1' }, { _id: '...', name: 'test2' }],
        [{ _id: 'abc', name: 'test1' }, { _id: 'def', name: 'test2' }]
      )).toBe(true);
    });
  });

  describe('edge cases', () => {
    test('should handle empty objects', () => {
      expect(areObjectsEqual({}, {})).toBe(true);
    });

    test('should handle empty arrays', () => {
      expect(areObjectsEqual([], [])).toBe(true);
    });

    test('should not match empty object with non-empty', () => {
      expect(areObjectsEqual({}, { a: 1 })).toBe(false);
    });

    test('should handle undefined values', () => {
      expect(areObjectsEqual(undefined, undefined)).toBe(true);
      expect(areObjectsEqual(undefined, null)).toBe(false);
    });

    test('should handle NaN values', () => {
      expect(areObjectsEqual(NaN, NaN)).toBe(false); // NaN !== NaN in JavaScript
    });
  });
});

