const {
  compareArraysByBacktracking,
  compareArraysHybrid,
  compareArraysOrdered,
} = require('../arrayComparison');

describe('arrayComparison', () => {
  describe('compareArraysByBacktracking', () => {
    const simpleCompare = (a, b) => JSON.stringify(a) === JSON.stringify(b);

    test('should match arrays with same objects in different order', () => {
      const arr1 = [{ a: 1 }, { b: 2 }, { c: 3 }];
      const arr2 = [{ c: 3 }, { a: 1 }, { b: 2 }];
      expect(compareArraysByBacktracking(arr1, arr2, simpleCompare)).toBe(true);
    });

    test('should match arrays with duplicate objects', () => {
      const arr1 = [{ a: 1 }, { a: 1 }, { b: 2 }];
      const arr2 = [{ b: 2 }, { a: 1 }, { a: 1 }];
      expect(compareArraysByBacktracking(arr1, arr2, simpleCompare)).toBe(true);
    });

    test('should not match arrays with different lengths', () => {
      const arr1 = [{ a: 1 }, { b: 2 }];
      const arr2 = [{ a: 1 }, { b: 2 }, { c: 3 }];
      expect(compareArraysByBacktracking(arr1, arr2, simpleCompare)).toBe(false);
    });

    test('should not match arrays with different objects', () => {
      const arr1 = [{ a: 1 }, { b: 2 }];
      const arr2 = [{ a: 1 }, { c: 3 }];
      expect(compareArraysByBacktracking(arr1, arr2, simpleCompare)).toBe(false);
    });

    test('should handle empty arrays', () => {
      expect(compareArraysByBacktracking([], [], simpleCompare)).toBe(true);
    });

    test('should handle single element arrays', () => {
      expect(compareArraysByBacktracking([{ a: 1 }], [{ a: 1 }], simpleCompare)).toBe(true);
    });

    test('should use custom comparison function', () => {
      const customCompare = (a, b) => a.id === b.id;
      const arr1 = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
      const arr2 = [{ id: 2, name: 'Robert' }, { id: 1, name: 'Alicia' }];
      expect(compareArraysByBacktracking(arr1, arr2, customCompare)).toBe(true);
    });

    test('should handle complex nested objects', () => {
      const arr1 = [
        { user: { name: 'Alice', scores: [1, 2, 3] } },
        { user: { name: 'Bob', scores: [4, 5, 6] } }
      ];
      const arr2 = [
        { user: { name: 'Bob', scores: [4, 5, 6] } },
        { user: { name: 'Alice', scores: [1, 2, 3] } }
      ];
      expect(compareArraysByBacktracking(arr1, arr2, simpleCompare)).toBe(true);
    });
  });

  describe('compareArraysHybrid', () => {
    const deepCompare = (a, b) => JSON.stringify(a) === JSON.stringify(b);

    test('should match arrays with mixed primitives and objects', () => {
      const arr1 = [1, 2, { a: 1 }, { b: 2 }, 3];
      const arr2 = [{ b: 2 }, 3, 1, { a: 1 }, 2];
      expect(compareArraysHybrid(arr1, arr2, deepCompare)).toBe(true);
    });

    test('should match arrays with only primitives', () => {
      const arr1 = [1, 2, 3, 4, 5];
      const arr2 = [5, 4, 3, 2, 1];
      expect(compareArraysHybrid(arr1, arr2, deepCompare)).toBe(true);
    });

    test('should match arrays with only objects', () => {
      const arr1 = [{ a: 1 }, { b: 2 }];
      const arr2 = [{ b: 2 }, { a: 1 }];
      expect(compareArraysHybrid(arr1, arr2, deepCompare)).toBe(true);
    });

    test('should handle duplicate primitives', () => {
      const arr1 = [1, 2, 2, 3, { a: 1 }];
      const arr2 = [{ a: 1 }, 3, 2, 1, 2];
      expect(compareArraysHybrid(arr1, arr2, deepCompare)).toBe(true);
    });

    test('should not match when primitive counts differ', () => {
      const arr1 = [1, 2, 3, { a: 1 }];
      const arr2 = [1, 2, 2, { a: 1 }];
      expect(compareArraysHybrid(arr1, arr2, deepCompare)).toBe(false);
    });

    test('should not match when object counts differ', () => {
      const arr1 = [1, 2, { a: 1 }];
      const arr2 = [1, 2, { a: 1 }, { b: 2 }];
      expect(compareArraysHybrid(arr1, arr2, deepCompare)).toBe(false);
    });

    test('should handle null and undefined as primitives', () => {
      const arr1 = [null, undefined, { a: 1 }];
      const arr2 = [{ a: 1 }, undefined, null];
      expect(compareArraysHybrid(arr1, arr2, deepCompare)).toBe(true);
    });

    test('should handle strings and numbers', () => {
      const arr1 = ['hello', 123, { a: 1 }, 'world'];
      const arr2 = [{ a: 1 }, 'world', 123, 'hello'];
      expect(compareArraysHybrid(arr1, arr2, deepCompare)).toBe(true);
    });

    test('should handle empty arrays', () => {
      expect(compareArraysHybrid([], [], deepCompare)).toBe(true);
    });

    test('should not match arrays with different primitive values', () => {
      const arr1 = [1, 2, { a: 1 }];
      const arr2 = [1, 3, { a: 1 }];
      expect(compareArraysHybrid(arr1, arr2, deepCompare)).toBe(false);
    });
  });

  describe('compareArraysOrdered', () => {
    const simpleCompare = (a, b) => a === b;

    test('should match arrays with same order', () => {
      const arr1 = [1, 2, 3, 4, 5];
      const arr2 = [1, 2, 3, 4, 5];
      expect(compareArraysOrdered(arr1, arr2, simpleCompare)).toBe(true);
    });

    test('should not match arrays with different order', () => {
      const arr1 = [1, 2, 3, 4, 5];
      const arr2 = [5, 4, 3, 2, 1];
      expect(compareArraysOrdered(arr1, arr2, simpleCompare)).toBe(false);
    });

    test('should not match arrays with different lengths', () => {
      const arr1 = [1, 2, 3];
      const arr2 = [1, 2, 3, 4];
      expect(compareArraysOrdered(arr1, arr2, simpleCompare)).toBe(false);
    });

    test('should match arrays with objects in same order', () => {
      const objCompare = (a, b) => JSON.stringify(a) === JSON.stringify(b);
      const arr1 = [{ a: 1 }, { b: 2 }, { c: 3 }];
      const arr2 = [{ a: 1 }, { b: 2 }, { c: 3 }];
      expect(compareArraysOrdered(arr1, arr2, objCompare)).toBe(true);
    });

    test('should not match arrays with objects in different order', () => {
      const objCompare = (a, b) => JSON.stringify(a) === JSON.stringify(b);
      const arr1 = [{ a: 1 }, { b: 2 }];
      const arr2 = [{ b: 2 }, { a: 1 }];
      expect(compareArraysOrdered(arr1, arr2, objCompare)).toBe(false);
    });

    test('should handle empty arrays', () => {
      expect(compareArraysOrdered([], [], simpleCompare)).toBe(true);
    });

    test('should handle single element arrays', () => {
      expect(compareArraysOrdered([1], [1], simpleCompare)).toBe(true);
      expect(compareArraysOrdered([1], [2], simpleCompare)).toBe(false);
    });

    test('should use custom comparison function', () => {
      const customCompare = (a, b) => a.id === b.id;
      const arr1 = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
      const arr2 = [{ id: 1, name: 'Alicia' }, { id: 2, name: 'Robert' }];
      expect(compareArraysOrdered(arr1, arr2, customCompare)).toBe(true);
    });

    test('should fail when custom comparison fails', () => {
      const customCompare = (a, b) => a.id === b.id;
      const arr1 = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
      const arr2 = [{ id: 2, name: 'Bob' }, { id: 1, name: 'Alice' }];
      expect(compareArraysOrdered(arr1, arr2, customCompare)).toBe(false);
    });
  });

  describe('integration - real-world scenarios', () => {
    test('should handle MongoDB query results (unordered)', () => {
      const deepCompare = (a, b) => JSON.stringify(a) === JSON.stringify(b);
      const results1 = [
        { _id: '1', name: 'Alice', age: 30 },
        { _id: '2', name: 'Bob', age: 25 },
        { _id: '3', name: 'Charlie', age: 35 }
      ];
      const results2 = [
        { _id: '3', name: 'Charlie', age: 35 },
        { _id: '1', name: 'Alice', age: 30 },
        { _id: '2', name: 'Bob', age: 25 }
      ];
      expect(compareArraysByBacktracking(results1, results2, deepCompare)).toBe(true);
    });

    test('should handle sorted query results (ordered)', () => {
      const deepCompare = (a, b) => JSON.stringify(a) === JSON.stringify(b);
      const results1 = [
        { _id: '1', name: 'Alice', age: 25 },
        { _id: '2', name: 'Bob', age: 30 },
        { _id: '3', name: 'Charlie', age: 35 }
      ];
      const results2 = [
        { _id: '1', name: 'Alice', age: 25 },
        { _id: '2', name: 'Bob', age: 30 },
        { _id: '3', name: 'Charlie', age: 35 }
      ];
      expect(compareArraysOrdered(results1, results2, deepCompare)).toBe(true);
    });

    test('should handle aggregation pipeline results with mixed types', () => {
      const deepCompare = (a, b) => JSON.stringify(a) === JSON.stringify(b);
      const results1 = [
        { _id: 'group1', count: 10, items: [1, 2, 3] },
        { _id: 'group2', count: 20, items: [4, 5, 6] }
      ];
      const results2 = [
        { _id: 'group2', count: 20, items: [4, 5, 6] },
        { _id: 'group1', count: 10, items: [1, 2, 3] }
      ];
      expect(compareArraysByBacktracking(results1, results2, deepCompare)).toBe(true);
    });
  });
});

