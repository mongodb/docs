/**
 * Integration tests for truncation/ellipsis functionality.
 *
 * These tests verify that truncation patterns documented for writers work correctly
 * end-to-end through the full comparison pipeline using the Expect API.
 *
 * Documented patterns tested:
 * 1. Truncated strings: `'prefix...'` matches strings starting with prefix
 * 2. Property-level ellipsis: `'...'` as a value matches any value
 * 3. Object-level ellipsis: `{ '...': '...' }` allows extra fields
 * 4. Array-level ellipsis: `'...'` in arrays matches any elements
 *
 * @see content/meta/source/grove/mark-up-code-examples.txt "Handle Verbosity and Variable Values"
 */

const Expect = require('../Expect');

describe('Truncation Integration Tests', () => {
  describe('Truncated string matching (prefix...)', () => {
    test('should match truncated string with full string - simple case', () => {
      // Expected output contains truncated string
      // Actual output contains full string
      const actualOutput = `{ plot: 'A young man is accidentally sent 30 years into the past in a time-traveling DeLorean.' }`;
      const expected = [{ plot: 'A young man is accidentally sent 30 years...' }];

      expect(() => {
        Expect.that(actualOutput).shouldMatch(expected);
      }).not.toThrow();
    });

    test('should NOT match when prefix does not match', () => {
      const actualOutput = `{ plot: 'A young man is accidentally sent 30 years into the past.' }`;
      const expected = [{ plot: 'A young woman...' }];

      expect(() => {
        Expect.that(actualOutput).shouldMatch(expected);
      }).toThrow();
    });

    test('should match truncated string in nested object', () => {
      const actualOutput = `{
  title: 'Back to the Future',
  details: { plot: 'A young man is accidentally sent 30 years into the past.' }
}`;
      const expected = [{
        title: 'Back to the Future',
        details: { plot: 'A young man...' }
      }];

      expect(() => {
        Expect.that(actualOutput).shouldMatch(expected);
      }).not.toThrow();
    });
  });

  describe('Property-level ellipsis (value: "...")', () => {
    test('should match ellipsis with any string value', () => {
      const actualOutput = `{ _id: '507f1f77bcf86cd799439011', name: 'Carl' }`;
      const expected = [{ _id: '...', name: 'Carl' }];

      expect(() => {
        Expect.that(actualOutput).shouldMatch(expected);
      }).not.toThrow();
    });

    test('should match ellipsis with any number value', () => {
      const actualOutput = `{ _id: 12345, count: 42 }`;
      const expected = [{ _id: '...', count: 42 }];

      expect(() => {
        Expect.that(actualOutput).shouldMatch(expected);
      }).not.toThrow();
    });

    test('should match ellipsis with ObjectId value', () => {
      const actualOutput = `{ _id: ObjectId('507f1f77bcf86cd799439011') }`;
      const expected = [{ _id: '...' }];

      expect(() => {
        Expect.that(actualOutput).shouldMatch(expected);
      }).not.toThrow();
    });

    test('should match multiple ellipsis values in same object', () => {
      const actualOutput = `{ _id: ObjectId('507f1f77bcf86cd799439011'), createdAt: ISODate('2024-01-01'), name: 'Test' }`;
      const expected = [{ _id: '...', createdAt: '...', name: 'Test' }];

      expect(() => {
        Expect.that(actualOutput).shouldMatch(expected);
      }).not.toThrow();
    });
  });

  describe('Object-level ellipsis for extra fields', () => {
    test('should allow extra fields when object-level ellipsis is present', () => {
      // Expected output uses { '...': '...' } to indicate more fields may exist
      const actualOutput = `{
  name: 'Carl',
  age: 30,
  city: 'New York'
}`;
      const expected = [{ name: 'Carl', '...': '...' }];

      expect(() => {
        Expect.that(actualOutput).shouldMatch(expected);
      }).not.toThrow();
    });

    test('should fail without ellipsis when extra fields exist', () => {
      // Expected output does NOT have ellipsis marker
      const actualOutput = `{
  name: 'Carl',
  age: 30
}`;
      const expected = [{ name: 'Carl' }];

      expect(() => {
        Expect.that(actualOutput).shouldMatch(expected);
      }).toThrow();
    });
  });

  describe('Unquoted ellipsis in output files', () => {
    // Tests the format used in actual output files like:
    // examples/aggregation/pipelines/project-unwind-group/output.sh
    // which uses: { _id: ... , count: ... }

    test('should parse unquoted ellipsis as property value', () => {
      // Unquoted ellipsis like { _id: ... } is consistent with mongosh output
      // format where keys and non-string values are also unquoted
      const { MongoshOutputParser } = require('../MongoshOutputParser');

      const expectedContent = `[
  { _id: ... , count: ... },
  { _id: ... , count: ... }
]`;
      const result = MongoshOutputParser.parseExpectedOutput(expectedContent);

      expect(result.success).toBe(true);
      expect(result.data[0]._id).toBe('...');
      expect(result.data[0].count).toBe('...');
    });

    test('quoted ellipsis as property value also works', () => {
      // Quoted '...' is also supported for consistency
      const { MongoshOutputParser } = require('../MongoshOutputParser');

      const expectedContent = `[
  { _id: '...' , count: '...' },
  { _id: '...' , count: '...' }
]`;
      const result = MongoshOutputParser.parseExpectedOutput(expectedContent);

      expect(result.success).toBe(true);
      expect(result.data[0]._id).toBe('...');
      expect(result.data[0].count).toBe('...');
    });
  });

  describe('Array-level ellipsis', () => {
    test('should parse standalone ellipsis in array as element', () => {
      // This is the pattern from project-unwind-group/output.sh:
      // [ { _id: ..., count: ... }, { _id: ..., count: ... }, ... ]
      const { MongoshOutputParser } = require('../MongoshOutputParser');

      const content = `[
  { _id: ... , count: ... },
  { _id: ... , count: ... },
  ...
]`;
      const result = MongoshOutputParser.parseExpectedOutput(content);

      expect(result.success).toBe(true);
      // Should have 3 elements: two objects and the ellipsis string
      expect(result.data).toHaveLength(3);
      expect(result.data[0]._id).toBe('...');
      expect(result.data[0].count).toBe('...');
      expect(result.data[2]).toBe('...');
      // Objects should NOT have '...' key added - the ellipsis is an array element
      expect(result.data[0]).not.toHaveProperty('...');
      expect(result.data[1]).not.toHaveProperty('...');
    });

    test('should match array with ellipsis for middle elements', () => {
      const actualOutput = `[
  { name: 'first' },
  { name: 'second' },
  { name: 'third' },
  { name: 'last' }
]`;
      // For arrays, the expected should directly be the array structure
      const expected = [
        { name: 'first' },
        '...',
        { name: 'last' }
      ];

      expect(() => {
        Expect.that(actualOutput).shouldMatch(expected);
      }).not.toThrow();
    });

    test('should match array with ellipsis at the end', () => {
      const actualOutput = `[
  { name: 'first' },
  { name: 'second' },
  { name: 'third' }
]`;
      const expected = [
        { name: 'first' },
        '...'
      ];

      expect(() => {
        Expect.that(actualOutput).shouldMatch(expected);
      }).not.toThrow();
    });
  });

  describe('Combined patterns', () => {
    test('should handle truncated string + property ellipsis together', () => {
      const actualOutput = `{
  _id: ObjectId('507f1f77bcf86cd799439011'),
  title: 'Back to the Future',
  plot: 'A young man is accidentally sent 30 years into the past in a time-traveling DeLorean.'
}`;
      const expected = [{
        _id: '...',
        title: 'Back to the Future',
        plot: 'A young man is accidentally...'
      }];

      expect(() => {
        Expect.that(actualOutput).shouldMatch(expected);
      }).not.toThrow();
    });

    test('should handle property ellipsis + object ellipsis for extra fields', () => {
      const actualOutput = `{
  _id: ObjectId('507f1f77bcf86cd799439011'),
  name: 'Carl',
  email: 'carl@example.com',
  createdAt: ISODate('2024-01-01')
}`;
      const expected = [{
        _id: '...',
        name: 'Carl',
        '...': '...'
      }];

      expect(() => {
        Expect.that(actualOutput).shouldMatch(expected);
      }).not.toThrow();
    });
  });
});

