const {
  compareObjectKeys,
  compareObjectProperties,
} = require('../objectComparison');

describe('objectComparison', () => {
  describe('compareObjectKeys', () => {
    test('should allow matching keys', () => {
      const result = compareObjectKeys({ a: 1, b: 2 }, { a: 1, b: 2 });
      expect(result.canProceed).toBe(true);
      expect(result.keysA).toEqual(['a', 'b']);
      expect(result.keysB).toEqual(['a', 'b']);
      expect(result.allowOmittedFields).toBe(false);
      expect(result.hasGlobalOmission).toBe(false);
    });

    test('should detect global ellipsis marker', () => {
      const result = compareObjectKeys(
        { a: 1, '...': '...' },
        { a: 1, b: 2, c: 3 }
      );
      expect(result.canProceed).toBe(true);
      expect(result.allowOmittedFields).toBe(true);
      expect(result.hasGlobalOmission).toBe(true);
    });

    test('should detect all properties as ellipsis', () => {
      const result = compareObjectKeys(
        { a: '...', b: '...' },
        { a: 1, b: 2 }
      );
      expect(result.canProceed).toBe(true);
      expect(result.allowOmittedFields).toBe(true);
      expect(result.hasGlobalOmission).toBe(false);
    });

    test('should fail when keys do not match (no ellipsis)', () => {
      const result = compareObjectKeys({ a: 1 }, { a: 1, b: 2 });
      expect(result.canProceed).toBe(false);
    });

    test('should fail when expected has extra keys', () => {
      const result = compareObjectKeys({ a: 1, b: 2 }, { a: 1 });
      expect(result.canProceed).toBe(false);
    });

    test('should fail when keys are completely different', () => {
      const result = compareObjectKeys({ a: 1 }, { b: 2 });
      expect(result.canProceed).toBe(false);
    });

    test('should handle empty objects', () => {
      const result = compareObjectKeys({}, {});
      expect(result.canProceed).toBe(true);
      expect(result.keysA).toEqual([]);
      expect(result.keysB).toEqual([]);
    });

    test('should handle only ellipsis marker', () => {
      const result = compareObjectKeys({ '...': '...' }, { a: 1, b: 2 });
      expect(result.canProceed).toBe(true);
      expect(result.allowOmittedFields).toBe(true);
      expect(result.hasGlobalOmission).toBe(true);
    });

    test('should not treat wrong ellipsis value as global omission', () => {
      const result = compareObjectKeys({ '...': 'wrong' }, { a: 1 });
      // When keys don't match and no valid ellipsis, canProceed is false
      expect(result.canProceed).toBe(false);
    });
  });

  describe('compareObjectProperties', () => {
    const simpleCompare = (a, b) => a === b;

    test('should compare all properties successfully', () => {
      const analysis = compareObjectKeys({ a: 1, b: 2 }, { a: 1, b: 2 });
      const result = compareObjectProperties(
        { a: 1, b: 2 },
        { a: 1, b: 2 },
        simpleCompare,
        analysis
      );
      expect(result).toBe(true);
    });

    test('should fail when property values differ', () => {
      const analysis = compareObjectKeys({ a: 1, b: 2 }, { a: 1, b: 3 });
      const result = compareObjectProperties(
        { a: 1, b: 2 },
        { a: 1, b: 3 },
        simpleCompare,
        analysis
      );
      expect(result).toBe(false);
    });

    test('should skip ellipsis marker key', () => {
      const analysis = compareObjectKeys(
        { a: 1, '...': '...' },
        { a: 1, b: 2 }
      );
      const result = compareObjectProperties(
        { a: 1, '...': '...' },
        { a: 1, b: 2 },
        simpleCompare,
        analysis
      );
      expect(result).toBe(true);
    });

    test('should skip property-level ellipsis', () => {
      const analysis = compareObjectKeys({ a: '...', b: 2 }, { a: 1, b: 2 });
      const result = compareObjectProperties(
        { a: '...', b: 2 },
        { a: 1, b: 2 },
        simpleCompare,
        analysis
      );
      expect(result).toBe(true);
    });

    test('should allow missing keys when allowOmittedFields is true', () => {
      const analysis = compareObjectKeys(
        { a: 1, b: 2, '...': '...' },
        { a: 1 }
      );
      const result = compareObjectProperties(
        { a: 1, b: 2, '...': '...' },
        { a: 1 },
        simpleCompare,
        analysis
      );
      expect(result).toBe(true);
    });

    test('should fail on missing keys when allowOmittedFields is false', () => {
      const analysis = compareObjectKeys({ a: 1, b: 2 }, { a: 1 });
      // This will fail in compareObjectKeys, but let's test the property comparison
      const manualAnalysis = {
        keysA: ['a', 'b'],
        keysB: ['a'],
        allowOmittedFields: false,
        hasGlobalOmission: false,
        canProceed: true,
      };
      const result = compareObjectProperties(
        { a: 1, b: 2 },
        { a: 1 },
        simpleCompare,
        manualAnalysis
      );
      expect(result).toBe(false);
    });

    test('should ignore fields in ignoreFieldValues option', () => {
      const analysis = compareObjectKeys({ _id: 1, name: 'test' }, { _id: 2, name: 'test' });
      const result = compareObjectProperties(
        { _id: 1, name: 'test' },
        { _id: 2, name: 'test' },
        simpleCompare,
        analysis,
        { ignoreFieldValues: ['_id'] }
      );
      expect(result).toBe(true);
    });

    test('should ignore multiple fields', () => {
      const analysis = compareObjectKeys(
        { _id: 1, timestamp: 'old', name: 'test' },
        { _id: 2, timestamp: 'new', name: 'test' }
      );
      const result = compareObjectProperties(
        { _id: 1, timestamp: 'old', name: 'test' },
        { _id: 2, timestamp: 'new', name: 'test' },
        simpleCompare,
        analysis,
        { ignoreFieldValues: ['_id', 'timestamp'] }
      );
      expect(result).toBe(true);
    });

    test('should still compare non-ignored fields', () => {
      const analysis = compareObjectKeys({ _id: 1, name: 'test' }, { _id: 2, name: 'wrong' });
      const result = compareObjectProperties(
        { _id: 1, name: 'test' },
        { _id: 2, name: 'wrong' },
        simpleCompare,
        analysis,
        { ignoreFieldValues: ['_id'] }
      );
      expect(result).toBe(false);
    });

    test('should handle empty objects', () => {
      const analysis = compareObjectKeys({}, {});
      const result = compareObjectProperties({}, {}, simpleCompare, analysis);
      expect(result).toBe(true);
    });

    test('should use custom comparison function', () => {
      const customCompare = (a, b) => a.toLowerCase() === b.toLowerCase();
      const analysis = compareObjectKeys({ name: 'TEST' }, { name: 'test' });
      const result = compareObjectProperties(
        { name: 'TEST' },
        { name: 'test' },
        customCompare,
        analysis
      );
      expect(result).toBe(true);
    });
  });

  describe('integration - combined key and property comparison', () => {
    const deepCompare = (a, b) => JSON.stringify(a) === JSON.stringify(b);

    test('should handle complete object comparison workflow', () => {
      const objA = { a: 1, b: { nested: 'value' }, '...': '...' };
      const objB = { a: 1, b: { nested: 'value' }, c: 'extra' };

      const keyAnalysis = compareObjectKeys(objA, objB);
      expect(keyAnalysis.canProceed).toBe(true);

      const result = compareObjectProperties(objA, objB, deepCompare, keyAnalysis);
      expect(result).toBe(true);
    });

    test('should fail when nested values differ', () => {
      const objA = { a: 1, b: { nested: 'value' } };
      const objB = { a: 1, b: { nested: 'different' } };

      const keyAnalysis = compareObjectKeys(objA, objB);
      expect(keyAnalysis.canProceed).toBe(true);

      const result = compareObjectProperties(objA, objB, deepCompare, keyAnalysis);
      expect(result).toBe(false);
    });

    test('should handle all properties as ellipsis', () => {
      const objA = { a: '...', b: '...', c: '...' };
      const objB = { a: 1, b: 'string', c: { nested: true } };

      const keyAnalysis = compareObjectKeys(objA, objB);
      expect(keyAnalysis.canProceed).toBe(true);
      expect(keyAnalysis.allowOmittedFields).toBe(true);

      const result = compareObjectProperties(objA, objB, deepCompare, keyAnalysis);
      expect(result).toBe(true);
    });
  });

  describe('real-world scenarios', () => {
    const deepCompare = (a, b) => JSON.stringify(a) === JSON.stringify(b);

    test('should handle MongoDB documents with dynamic _id', () => {
      const expected = { _id: '...', name: 'test', age: 30 };
      const actual = { _id: '507f1f77bcf86cd799439011', name: 'test', age: 30 };

      const keyAnalysis = compareObjectKeys(expected, actual);
      const result = compareObjectProperties(expected, actual, deepCompare, keyAnalysis);
      expect(result).toBe(true);
    });

    test('should handle aggregation results with extra fields', () => {
      const expected = { _id: 'group1', count: 10, '...': '...' };
      const actual = { _id: 'group1', count: 10, avgValue: 25.5, maxValue: 100 };

      const keyAnalysis = compareObjectKeys(expected, actual);
      expect(keyAnalysis.allowOmittedFields).toBe(true);

      const result = compareObjectProperties(expected, actual, deepCompare, keyAnalysis);
      expect(result).toBe(true);
    });

    test('should handle documents with ignored timestamp fields', () => {
      const expected = { _id: 1, createdAt: 'old', updatedAt: 'old', data: 'test' };
      const actual = { _id: 1, createdAt: 'new', updatedAt: 'new', data: 'test' };

      const keyAnalysis = compareObjectKeys(expected, actual);
      const result = compareObjectProperties(
        expected,
        actual,
        deepCompare,
        keyAnalysis,
        { ignoreFieldValues: ['createdAt', 'updatedAt'] }
      );
      expect(result).toBe(true);
    });
  });
});

