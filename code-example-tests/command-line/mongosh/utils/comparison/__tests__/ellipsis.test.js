const {
  isTruncatedValue,
  matchWithEllipsis,
} = require('../ellipsis');

describe('ellipsis', () => {
  describe('isTruncatedValue', () => {
    test('should return true for exact ellipsis', () => {
      expect(isTruncatedValue('...')).toBe(true);
    });

    test('should return true for trimmed ellipsis', () => {
      expect(isTruncatedValue('  ...  ')).toBe(true);
    });

    test('should return "truncated" for strings ending with ellipsis', () => {
      expect(isTruncatedValue('Hello...')).toBe('truncated');
      expect(isTruncatedValue('prefix...')).toBe('truncated');
      expect(isTruncatedValue('test123...')).toBe('truncated');
    });

    test('should return false for normal strings', () => {
      expect(isTruncatedValue('Hello')).toBe(false);
      expect(isTruncatedValue('test')).toBe(false);
      expect(isTruncatedValue('')).toBe(false);
    });

    test('should return false for non-string values', () => {
      expect(isTruncatedValue(123)).toBe(false);
      expect(isTruncatedValue(null)).toBe(false);
      expect(isTruncatedValue(undefined)).toBe(false);
      expect(isTruncatedValue({})).toBe(false);
      expect(isTruncatedValue([])).toBe(false);
    });

    test('should return false for strings containing but not ending with ellipsis', () => {
      expect(isTruncatedValue('...Hello')).toBe(false);
      expect(isTruncatedValue('Hello...World')).toBe(false); // Contains ... but doesn't end with it
    });
  });

  describe('matchWithEllipsis', () => {
    describe('basic ellipsis matching', () => {
      test('should match empty arrays', () => {
        expect(matchWithEllipsis([], [])).toBe(true);
      });

      test('should match single ellipsis with any array', () => {
        expect(matchWithEllipsis(['...'], [])).toBe(true);
        expect(matchWithEllipsis(['...'], [1])).toBe(true);
        expect(matchWithEllipsis(['...'], [1, 2, 3])).toBe(true);
        expect(matchWithEllipsis(['...'], [{ a: 1 }, { b: 2 }])).toBe(true);
      });

      test('should match ellipsis at start', () => {
        expect(matchWithEllipsis(['...', 3], [1, 2, 3])).toBe(true);
        expect(matchWithEllipsis(['...', 3], [3])).toBe(true);
      });

      test('should match ellipsis at end', () => {
        expect(matchWithEllipsis([1, '...'], [1])).toBe(true);
        expect(matchWithEllipsis([1, '...'], [1, 2, 3])).toBe(true);
      });

      test('should match ellipsis in middle', () => {
        expect(matchWithEllipsis([1, '...', 4], [1, 2, 3, 4])).toBe(true);
        expect(matchWithEllipsis([1, '...', 4], [1, 4])).toBe(true);
      });

      test('should match multiple ellipsis', () => {
        expect(matchWithEllipsis([1, '...', 5, '...', 9], [1, 2, 3, 4, 5, 6, 7, 8, 9])).toBe(true);
        expect(matchWithEllipsis([1, '...', 5, '...', 9], [1, 5, 9])).toBe(true);
      });

      test('should not match when required elements are missing', () => {
        expect(matchWithEllipsis([1, '...', 5], [1, 2, 3, 4])).toBe(false);
        expect(matchWithEllipsis([1, 2, 3], [1, 2])).toBe(false);
      });

      test('should not match when elements are in wrong order', () => {
        expect(matchWithEllipsis([1, 2, 3], [3, 2, 1])).toBe(false);
      });
    });

    describe('truncated string matching', () => {
      test('should match truncated strings', () => {
        expect(matchWithEllipsis(['Hello...'], ['Hello World'])).toBe(true);
        expect(matchWithEllipsis(['Test...'], ['Test message'])).toBe(true);
      });

      test('should not match non-matching prefixes', () => {
        expect(matchWithEllipsis(['Hello...'], ['Goodbye'])).toBe(false);
      });

      test('should not match truncated string with non-string', () => {
        expect(matchWithEllipsis(['Hello...'], [123])).toBe(false);
      });

      test('should match truncated strings with ellipsis', () => {
        expect(matchWithEllipsis(['Hello...', '...', 'End'], ['Hello World', 'Middle', 'End'])).toBe(true);
      });
    });

    describe('nested object matching', () => {
      test('should match nested objects with ellipsis', () => {
        expect(matchWithEllipsis(
          [{ _id: '...', name: 'test' }],
          [{ _id: 'abc123', name: 'test' }]
        )).toBe(true);
      });

      test('should match arrays of objects', () => {
        expect(matchWithEllipsis(
          [{ a: 1 }, { b: 2 }],
          [{ a: 1 }, { b: 2 }]
        )).toBe(true);
      });

      test('should not match different nested objects', () => {
        expect(matchWithEllipsis(
          [{ a: 1 }],
          [{ a: 2 }]
        )).toBe(false);
      });
    });

    describe('complex patterns', () => {
      test('should handle empty expected with non-empty actual', () => {
        expect(matchWithEllipsis([], [1, 2, 3])).toBe(false);
      });

      test('should handle non-empty expected with empty actual', () => {
        expect(matchWithEllipsis([1, 2, 3], [])).toBe(false);
      });

      test('should handle trailing ellipsis with empty actual', () => {
        expect(matchWithEllipsis(['...'], [])).toBe(true);
        expect(matchWithEllipsis(['...', '...'], [])).toBe(true);
      });

      test('should handle complex nested patterns', () => {
        expect(matchWithEllipsis(
          [{ _id: '...', name: 'test1' }, '...', { _id: '...', name: 'test3' }],
          [
            { _id: 'abc', name: 'test1' },
            { _id: 'def', name: 'test2' },
            { _id: 'ghi', name: 'test3' }
          ]
        )).toBe(true);
      });
    });

    describe('edge cases', () => {
      test('should handle single element arrays', () => {
        expect(matchWithEllipsis([1], [1])).toBe(true);
        expect(matchWithEllipsis([1], [2])).toBe(false);
      });

      test('should handle arrays with null and undefined', () => {
        expect(matchWithEllipsis([null], [null])).toBe(true);
        expect(matchWithEllipsis([undefined], [undefined])).toBe(true);
        expect(matchWithEllipsis([null], [undefined])).toBe(false);
      });

      test('should handle mixed types', () => {
        expect(matchWithEllipsis(
          [1, 'string', { a: 1 }, null],
          [1, 'string', { a: 1 }, null]
        )).toBe(true);
      });
    });

    describe('real-world scenarios', () => {
      test('should match MongoDB query results with dynamic IDs', () => {
        expect(matchWithEllipsis(
          [
            { _id: '...', name: 'Alice' },
            { _id: '...', name: 'Bob' }
          ],
          [
            { _id: '507f1f77bcf86cd799439011', name: 'Alice' },
            { _id: '507f1f77bcf86cd799439012', name: 'Bob' }
          ]
        )).toBe(true);
      });

      test('should match paginated results', () => {
        expect(matchWithEllipsis(
          [{ id: 1 }, '...', { id: 100 }],
          [
            { id: 1 },
            { id: 2 },
            { id: 3 },
            { id: 100 }
          ]
        )).toBe(true);
      });

      test('should match log messages with truncated text', () => {
        expect(matchWithEllipsis(
          ['Starting...', '...', 'Complete'],
          ['Starting server on port 3000', 'Processing requests', 'Complete']
        )).toBe(true);
      });
    });
  });
});

