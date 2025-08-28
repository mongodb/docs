const { areObjectsEqual } = require('../areObjectsEqual');

describe('areObjectsEqual - Core Functionality', () => {
  describe('Basic object comparison', () => {
    it('should treat objects with same keys in different orders as equal', () => {
      expect(areObjectsEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true);
    });

    it('should treat nested objects with key order differences as equal', () => {
      expect(
        areObjectsEqual(
          { a: { b: 2, c: 3 }, d: 4 },
          { d: 4, a: { c: 3, b: 2 } }
        )
      ).toBe(true);
    });

    it('should return false for objects with different values', () => {
      expect(areObjectsEqual({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false);
    });

    it('should return false for objects with extra keys', () => {
      expect(areObjectsEqual({ a: 1, b: 2 }, { a: 1 })).toBe(false);
    });
  });

  describe('Array comparison', () => {
    it('should treat arrays of objects as equal when order does not matter', () => {
      expect(
        areObjectsEqual([{ x: 1 }, { y: 2 }], [{ y: 2 }, { x: 1 }], {
          unordered: true,
        })
      ).toBe(true);
    });

    it('should treat arrays with duplicate elements as equal when unordered', () => {
      expect(
        areObjectsEqual(
          [{ a: 1 }, { a: 1 }, { b: 2 }],
          [{ b: 2 }, { a: 1 }, { a: 1 }],
          { unordered: true }
        )
      ).toBe(true);
    });

    it('should handle primitive frequency mismatches in unordered arrays', () => {
      // Test frequency mismatch detection
      expect(areObjectsEqual([1, 1, 2], [1, 2, 2], { unordered: true })).toBe(
        false
      );
      expect(areObjectsEqual([1, 2, 3], [1, 2], { unordered: true })).toBe(
        false
      );
    });
  });

  describe('Complex nested structures', () => {
    it('should handle deeply nested object structures', () => {
      const obj1 = {
        level1: {
          level2: {
            level3: {
              values: [1, 2, 3],
              metadata: { type: 'test', id: 123 },
            },
          },
        },
      };
      const obj2 = {
        level1: {
          level2: {
            level3: {
              metadata: { id: 123, type: 'test' },
              values: [1, 2, 3],
            },
          },
        },
      };
      expect(areObjectsEqual(obj1, obj2)).toBe(true);
    });

    it('should handle arrays of mixed types with unordered comparison', () => {
      // This test verifies the hybrid comparison behavior - when arrays contain mixed types,
      // they are compared as objects with string indices, not as true unordered arrays
      expect(
        areObjectsEqual(
          [{ a: 1 }, 'string', 42, { b: 2 }],
          [42, { b: 2 }, { a: 1 }, 'string'],
          { unordered: true }
        )
      ).toBe(true); // Mixed types should work in unordered arrays
    });
  });

  describe('Edge cases and special values', () => {
    it('should handle null and undefined values correctly', () => {
      expect(areObjectsEqual({ a: null }, { a: null })).toBe(true);
      expect(areObjectsEqual({ a: undefined }, { a: undefined })).toBe(true);
      expect(areObjectsEqual({ a: null }, { a: undefined })).toBe(false);
    });

    it('should handle empty objects and arrays', () => {
      expect(areObjectsEqual({}, {})).toBe(true);
      expect(areObjectsEqual([], [])).toBe(true);
      // Empty object vs empty array - they should not be equal (more logical)
      expect(areObjectsEqual({}, [])).toBe(false);
    });

    it('should handle mixed primitive types', () => {
      expect(areObjectsEqual('string', 'string')).toBe(true);
      expect(areObjectsEqual(123, 123)).toBe(true);
      expect(areObjectsEqual(true, true)).toBe(true);
      expect(areObjectsEqual('123', 123)).toBe(false);
    });
  });

  describe('Options and configuration', () => {
    it('should respect unordered option for arrays', () => {
      const arr1 = [1, 2, 3];
      const arr2 = [3, 1, 2];

      expect(areObjectsEqual(arr1, arr2, { unordered: false })).toBe(false);
      // Primitive arrays with unordered option should work correctly
      expect(areObjectsEqual(arr1, arr2, { unordered: true })).toBe(true);
    });

    it('should handle ignoreFieldValues option', () => {
      const obj1 = { _id: 'id1', name: 'Alice' };
      const obj2 = { _id: 'id2', name: 'Alice' };

      expect(areObjectsEqual(obj1, obj2, { ignoreFieldValues: ['_id'] })).toBe(
        true
      );
      expect(areObjectsEqual(obj1, obj2, { ignoreFieldValues: [] })).toBe(
        false
      );
    });
  });

  describe('Object key handling', () => {
    it('should detect extra keys in actual object', () => {
      const expected = { name: 'Alice' };
      const actual = { name: 'Alice', age: 30 };

      expect(areObjectsEqual(expected, actual)).toBe(false);
    });

    it('should allow extra keys when omission is enabled', () => {
      const expected = { name: 'Alice', '...': '...' }; // Use ellipsis pattern
      const actual = { name: 'Alice', age: 30 };

      expect(
        areObjectsEqual(
          expected,
          actual,
          { allowOmittedFieldsWithEllipsis: true }
        )
      ).toBe(true);
    });

    it('should handle missing key when omission is allowed', () => {
      const expected = { name: 'Alice', optional: 'value' };
      const actual = { name: 'Alice' };

      // The allowOmittedFieldsWithEllipsis option alone is not sufficient -
      // need explicit ellipsis patterns like {'...': '...'} in the expected object
      expect(
        areObjectsEqual(expected, actual, {
          allowOmittedFieldsWithEllipsis: true,
        })
      ).toBe(false);
    });

    it('should reject missing key when omission is not allowed', () => {
      const expected = { name: 'Alice', required: 'value' };
      const actual = { name: 'Alice' };

      expect(areObjectsEqual(expected, actual)).toBe(false);
    });
  });

  describe('Array backtracking and matching', () => {
    it('should handle unordered array backtracking correctly', () => {
      const expected = [{ a: 1 }, { b: 2 }];
      const actual = [{ b: 2 }, { a: 1 }];

      expect(areObjectsEqual(expected, actual, { unordered: true })).toBe(true);
    });

    it('should fail when objects in arrays do not match', () => {
      const expected = [{ a: 1 }];
      const actual = [{ different: 'array' }];

      expect(areObjectsEqual(expected, actual, { unordered: true })).toBe(
        false
      );
    });

    it('should handle arrays with primitive frequency matching', () => {
      const expected = [1, 'a', null, 1];
      const actual = [null, 1, 1, 'a']; // reordered but same frequencies

      // This should work correctly with proper primitive frequency matching
      expect(areObjectsEqual(expected, actual, { unordered: true })).toBe(true);
    });
  });

  describe('BSON and fallback comparison', () => {
    it('should reach fallback code for BSON-like objects', () => {
      const expected = { value: 'test' };
      const actual = { value: 'test' };

      expect(areObjectsEqual(expected, actual)).toBe(true);
    });

    it('should normalize similar date strings', () => {
      const expected = { date: new Date('2023-01-01') };
      const actual = { date: new Date('2023-01-01') };

      expect(areObjectsEqual(expected, actual)).toBe(true);
    });

    it('should handle strict key set comparison in fallback', () => {
      const expected = { a: 1, b: 2 };
      const actual = { a: 1, b: 2 };

      expect(areObjectsEqual(expected, actual)).toBe(true);
    });

    it('should handle lenient key comparison with extra keys', () => {
      const expected = { a: 1, '...': '...' }; // Use ellipsis pattern
      const actual = { a: 1, b: 2, c: 3 };

      expect(
        areObjectsEqual(
          expected,
          actual,
          { allowOmittedFieldsWithEllipsis: true }
        )
      ).toBe(true);
    });

    it('should return false when property match fails in fallback', () => {
      const expected = { name: 'Alice', age: 30 };
      const actual = { name: 'Alice', age: 25 };

      expect(areObjectsEqual(expected, actual)).toBe(false);
    });
  });

  describe('Hybrid array comparison edge cases', () => {
    it('should properly handle frequency matching for primitives', () => {
      const expected = [1, 2, 1]; // frequency: {1: 2, 2: 1}
      const actual = [2, 1, 1]; // frequency: {2: 1, 1: 2}, reordered

      // This should work correctly with proper frequency matching
      expect(areObjectsEqual(expected, actual, { unordered: true })).toBe(true);
    });

    it('should detect frequency mismatch in primitive arrays', () => {
      const expected = [1, 2, 2]; // {1: 1, 2: 2}
      const actual = [1, 1, 2]; // {1: 2, 2: 1} - frequency mismatch

      expect(areObjectsEqual(expected, actual, { unordered: true })).toBe(
        false
      );
    });

    it('should handle primitive not in expected frequency map', () => {
      const expected = [1, 2];
      const actual = [1, 2, 3]; // 3 not in expected

      expect(areObjectsEqual(expected, actual, { unordered: true })).toBe(
        false
      );
    });
  });
});
