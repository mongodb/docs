const {
  handlePropertyLevelEllipsis,
  handleArrayLevelEllipsis,
  handleObjectLevelEllipsis,
} = require('../ellipsisHandlers');

describe('ellipsisHandlers', () => {
  describe('handlePropertyLevelEllipsis', () => {
    test('should match when expected is ellipsis string', () => {
      const result = handlePropertyLevelEllipsis('...', 'any-value');
      expect(result.isHandled).toBe(true);
      expect(result.matches).toBe(true);
    });

    test('should match ellipsis with any type', () => {
      expect(handlePropertyLevelEllipsis('...', 123).matches).toBe(true);
      expect(handlePropertyLevelEllipsis('...', true).matches).toBe(true);
      expect(handlePropertyLevelEllipsis('...', null).matches).toBe(true);
      expect(handlePropertyLevelEllipsis('...', { nested: 'object' }).matches).toBe(true);
      expect(handlePropertyLevelEllipsis('...', [1, 2, 3]).matches).toBe(true);
    });

    test('should not handle when expected is not ellipsis', () => {
      const result = handlePropertyLevelEllipsis('normal-string', 'value');
      expect(result.isHandled).toBe(false);
    });

    test('should not handle when expected is object', () => {
      const result = handlePropertyLevelEllipsis({ key: '...' }, { key: 'value' });
      expect(result.isHandled).toBe(false);
    });

    test('should not handle when expected is array', () => {
      const result = handlePropertyLevelEllipsis(['...'], ['value']);
      expect(result.isHandled).toBe(false);
    });

    test('should handle ellipsis at any nesting level', () => {
      expect(handlePropertyLevelEllipsis('...', undefined).matches).toBe(true);
      expect(handlePropertyLevelEllipsis('...', '').matches).toBe(true);
      expect(handlePropertyLevelEllipsis('...', 0).matches).toBe(true);
    });
  });

  describe('handleArrayLevelEllipsis', () => {
    test('should detect ellipsis in array', () => {
      const result = handleArrayLevelEllipsis([1, '...', 3], [1, 2, 3]);
      expect(result.isHandled).toBe(true);
      expect(result.requiresEllipsisMatching).toBe(true);
    });

    test('should not handle when no ellipsis in array', () => {
      const result = handleArrayLevelEllipsis([1, 2, 3], [1, 2, 3]);
      expect(result.isHandled).toBe(false);
    });

    test('should handle when expected is not array (returns wildcard match)', () => {
      // The function doesn't check if expected is an array, it just checks for ellipsis
      const result = handleArrayLevelEllipsis('...', [1, 2, 3]);
      // String doesn't have .includes() for arrays, so this will be handled differently
      expect(result.isHandled).toBe(true);
    });

    test('should handle when actual is not array (returns requiresEllipsisMatching)', () => {
      const result = handleArrayLevelEllipsis([1, '...', 3], 'not-array');
      expect(result.isHandled).toBe(true);
      expect(result.requiresEllipsisMatching).toBe(true);
    });

    test('should handle multiple ellipsis in array', () => {
      const result = handleArrayLevelEllipsis([1, '...', 5, '...', 9], [1, 2, 3, 4, 5, 6, 7, 8, 9]);
      expect(result.isHandled).toBe(true);
    });

    test('should handle ellipsis at start of array', () => {
      const result = handleArrayLevelEllipsis(['...', 3], [1, 2, 3]);
      expect(result.isHandled).toBe(true);
    });

    test('should handle ellipsis at end of array', () => {
      const result = handleArrayLevelEllipsis([1, '...'], [1, 2, 3]);
      expect(result.isHandled).toBe(true);
    });

    test('should handle array with only ellipsis', () => {
      const result = handleArrayLevelEllipsis(['...'], [1, 2, 3]);
      expect(result.isHandled).toBe(true);
    });
  });

  describe('handleObjectLevelEllipsis', () => {
    test('should only handle when ONLY ellipsis marker present', () => {
      // The function only handles { '...': '...' } with no other keys
      const result = handleObjectLevelEllipsis(
        { name: 'test', '...': '...' },
        { name: 'test', age: 30, city: 'NYC' }
      );
      expect(result.isHandled).toBe(false); // Has other keys, so not handled
    });

    test('should match when only ellipsis marker present', () => {
      const result = handleObjectLevelEllipsis(
        { '...': '...' },
        { any: 'fields', can: 'exist' }
      );
      expect(result.isHandled).toBe(true);
      expect(result.matches).toBe(true);
    });

    test('should not handle when no ellipsis marker', () => {
      const result = handleObjectLevelEllipsis(
        { name: 'test' },
        { name: 'test', age: 30 }
      );
      expect(result.isHandled).toBe(false);
    });

    test('should not handle when expected is not object', () => {
      const result = handleObjectLevelEllipsis('...', { name: 'test' });
      expect(result.isHandled).toBe(false);
    });

    test('should handle when actual is not object (returns false match)', () => {
      const result = handleObjectLevelEllipsis({ '...': '...' }, 'not-object');
      expect(result.isHandled).toBe(true);
      expect(result.matches).toBe(false);
    });

    test('should not handle when expected is array', () => {
      const result = handleObjectLevelEllipsis([{ '...': '...' }], [{ name: 'test' }]);
      expect(result.isHandled).toBe(false);
    });

    test('should handle when actual is array (returns false match)', () => {
      const result = handleObjectLevelEllipsis({ '...': '...' }, [{ name: 'test' }]);
      expect(result.isHandled).toBe(true);
      expect(result.matches).toBe(false);
    });

    test('should not handle ellipsis marker with other properties', () => {
      // Only handles when ONLY '...' key is present
      const result = handleObjectLevelEllipsis(
        { required: 'value', '...': '...' },
        { required: 'value', extra1: 'data', extra2: 'more' }
      );
      expect(result.isHandled).toBe(false);
    });

    test('should not match when ellipsis value is not ellipsis string', () => {
      const result = handleObjectLevelEllipsis(
        { '...': 'wrong' },
        { name: 'test' }
      );
      expect(result.isHandled).toBe(false);
    });

    test('should handle null actual object', () => {
      const result = handleObjectLevelEllipsis({ '...': '...' }, null);
      expect(result.isHandled).toBe(true);
      expect(result.matches).toBe(false);
    });
  });

  describe('integration - combined ellipsis patterns', () => {
    test('should handle property ellipsis within object with global ellipsis', () => {
      // This would be handled by property-level first
      const propResult = handlePropertyLevelEllipsis('...', 'any-value');
      expect(propResult.isHandled).toBe(true);
      expect(propResult.matches).toBe(true);
    });

    test('should handle array ellipsis within object with global ellipsis', () => {
      const arrayResult = handleArrayLevelEllipsis(
        [1, '...', 5],
        [1, 2, 3, 4, 5]
      );
      expect(arrayResult.isHandled).toBe(true);
    });

    test('should prioritize property-level ellipsis over object-level', () => {
      // Property-level should be checked first in the comparison flow
      const propResult = handlePropertyLevelEllipsis('...', { nested: 'object' });
      expect(propResult.isHandled).toBe(true);
      expect(propResult.matches).toBe(true);
    });
  });

  describe('edge cases', () => {
    test('should handle empty objects with ellipsis', () => {
      const result = handleObjectLevelEllipsis({ '...': '...' }, {});
      expect(result.isHandled).toBe(true);
      expect(result.matches).toBe(true);
    });

    test('should handle empty arrays with ellipsis', () => {
      const result = handleArrayLevelEllipsis(['...'], []);
      expect(result.isHandled).toBe(true);
    });

    test('should handle undefined values', () => {
      expect(handlePropertyLevelEllipsis('...', undefined).matches).toBe(true);
    });

    test('should handle nested ellipsis patterns', () => {
      // Nested patterns would be handled recursively in the main comparison
      const result = handlePropertyLevelEllipsis('...', { nested: { deep: '...' } });
      expect(result.isHandled).toBe(true);
      expect(result.matches).toBe(true);
    });

    test('should not handle when ellipsis is in wrong position', () => {
      const result = handleObjectLevelEllipsis(
        { name: '...' }, // This is property-level, not object-level
        { name: 'test' }
      );
      expect(result.isHandled).toBe(false);
    });
  });

  describe('real-world scenarios', () => {
    test('should handle MongoDB query results with dynamic _id', () => {
      const result = handlePropertyLevelEllipsis('...', '507f1f77bcf86cd799439011');
      expect(result.isHandled).toBe(true);
      expect(result.matches).toBe(true);
    });

    test('should not handle aggregation results with extra fields (needs only ellipsis)', () => {
      // Object-level ellipsis only works with { '...': '...' } alone
      const result = handleObjectLevelEllipsis(
        { _id: 'group1', count: 10, '...': '...' },
        { _id: 'group1', count: 10, avgValue: 25.5, maxValue: 100 }
      );
      expect(result.isHandled).toBe(false); // Has other keys
    });

    test('should handle paginated results with ellipsis', () => {
      const result = handleArrayLevelEllipsis(
        [{ id: 1 }, '...', { id: 100 }],
        [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 100 }]
      );
      expect(result.isHandled).toBe(true);
    });

    test('should handle timestamps and dates with ellipsis', () => {
      const result = handlePropertyLevelEllipsis('...', '2023-01-01T00:00:00.000Z');
      expect(result.isHandled).toBe(true);
      expect(result.matches).toBe(true);
    });
  });
});

