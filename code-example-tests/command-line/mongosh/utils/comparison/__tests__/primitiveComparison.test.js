const {
  comparePrimitives,
  isPrimitive,
} = require('../primitiveComparison');
const { ObjectId, Decimal128 } = require('mongodb');

describe('primitiveComparison', () => {
  describe('isPrimitive', () => {
    test('should identify strings as primitives', () => {
      expect(isPrimitive('hello')).toBe(true);
      expect(isPrimitive('')).toBe(true);
    });

    test('should identify numbers as primitives', () => {
      expect(isPrimitive(123)).toBe(true);
      expect(isPrimitive(0)).toBe(true);
      expect(isPrimitive(-42)).toBe(true);
      expect(isPrimitive(3.14)).toBe(true);
      expect(isPrimitive(NaN)).toBe(true);
      expect(isPrimitive(Infinity)).toBe(true);
    });

    test('should identify booleans as primitives', () => {
      expect(isPrimitive(true)).toBe(true);
      expect(isPrimitive(false)).toBe(true);
    });

    test('should identify null as primitive', () => {
      expect(isPrimitive(null)).toBe(true);
    });

    test('should identify undefined as primitive', () => {
      expect(isPrimitive(undefined)).toBe(true);
    });

    test('should not identify objects as primitives', () => {
      expect(isPrimitive({})).toBe(false);
      expect(isPrimitive({ a: 1 })).toBe(false);
    });

    test('should not identify arrays as primitives', () => {
      expect(isPrimitive([])).toBe(false);
      expect(isPrimitive([1, 2, 3])).toBe(false);
    });

    test('should not identify functions as primitives', () => {
      expect(isPrimitive(() => {})).toBe(false);
      expect(isPrimitive(function() {})).toBe(false);
    });

    test('should not identify Date objects as primitives', () => {
      expect(isPrimitive(new Date())).toBe(false);
    });

    test('should not identify MongoDB types as primitives', () => {
      expect(isPrimitive(new ObjectId())).toBe(false);
      expect(isPrimitive(new Decimal128('123.45'))).toBe(false);
    });
  });

  describe('comparePrimitives', () => {
    test('should match identical strings', () => {
      expect(comparePrimitives('hello', 'hello')).toBe(true);
    });

    test('should not match different strings', () => {
      expect(comparePrimitives('hello', 'world')).toBe(false);
    });

    test('should match identical numbers', () => {
      expect(comparePrimitives(123, 123)).toBe(true);
      expect(comparePrimitives(0, 0)).toBe(true);
      expect(comparePrimitives(-42, -42)).toBe(true);
    });

    test('should not match different numbers', () => {
      expect(comparePrimitives(123, 456)).toBe(false);
    });

    test('should match identical booleans', () => {
      expect(comparePrimitives(true, true)).toBe(true);
      expect(comparePrimitives(false, false)).toBe(true);
    });

    test('should not match different booleans', () => {
      expect(comparePrimitives(true, false)).toBe(false);
    });

    test('should match null values', () => {
      expect(comparePrimitives(null, null)).toBe(true);
    });

    test('should match undefined values', () => {
      expect(comparePrimitives(undefined, undefined)).toBe(true);
    });

    test('should not match null and undefined', () => {
      expect(comparePrimitives(null, undefined)).toBe(false);
    });

    test('should not perform type coercion', () => {
      expect(comparePrimitives(1, '1')).toBe(false);
      expect(comparePrimitives(0, false)).toBe(false);
      expect(comparePrimitives('', false)).toBe(false);
    });

    test('should compare ObjectIds after normalization', () => {
      const id1 = new ObjectId('507f1f77bcf86cd799439011');
      const id2 = new ObjectId('507f1f77bcf86cd799439011');
      expect(comparePrimitives(id1, id2)).toBe(true);
    });

    test('should compare ObjectId with string', () => {
      const id = new ObjectId('507f1f77bcf86cd799439011');
      expect(comparePrimitives(id, '507f1f77bcf86cd799439011')).toBe(true);
    });

    test('should compare Decimal128 values', () => {
      const dec1 = new Decimal128('123.45');
      const dec2 = new Decimal128('123.45');
      expect(comparePrimitives(dec1, dec2)).toBe(true);
    });

    test('should compare Decimal128 with string', () => {
      const decimal = new Decimal128('123.45');
      expect(comparePrimitives(decimal, '123.45')).toBe(true);
    });

    test('should compare Date objects', () => {
      const date1 = new Date('2023-01-01T00:00:00.000Z');
      const date2 = new Date('2023-01-01T00:00:00.000Z');
      expect(comparePrimitives(date1, date2)).toBe(true);
    });

    test('should compare Date with ISO string', () => {
      const date = new Date('2023-01-01T00:00:00.000Z');
      expect(comparePrimitives(date, '2023-01-01T00:00:00.000Z')).toBe(true);
    });

    test('should compare ISO date strings', () => {
      expect(comparePrimitives('2023-01-01T00:00:00Z', '2023-01-01T00:00:00.000Z')).toBe(true);
    });

    test('should not match different ObjectIds', () => {
      const id1 = new ObjectId('507f1f77bcf86cd799439011');
      const id2 = new ObjectId('507f1f77bcf86cd799439012');
      expect(comparePrimitives(id1, id2)).toBe(false);
    });

    test('should not match different Decimal128 values', () => {
      const dec1 = new Decimal128('123.45');
      const dec2 = new Decimal128('678.90');
      expect(comparePrimitives(dec1, dec2)).toBe(false);
    });

    test('should not match different dates', () => {
      const date1 = new Date('2023-01-01T00:00:00.000Z');
      const date2 = new Date('2023-12-31T23:59:59.999Z');
      expect(comparePrimitives(date1, date2)).toBe(false);
    });

    test('should handle NaN correctly', () => {
      // NaN !== NaN in JavaScript
      expect(comparePrimitives(NaN, NaN)).toBe(false);
    });

    test('should handle Infinity', () => {
      expect(comparePrimitives(Infinity, Infinity)).toBe(true);
      expect(comparePrimitives(-Infinity, -Infinity)).toBe(true);
      expect(comparePrimitives(Infinity, -Infinity)).toBe(false);
    });
  });

  describe('integration - real-world scenarios', () => {
    test('should compare MongoDB document _id fields', () => {
      const id1 = new ObjectId('507f1f77bcf86cd799439011');
      const id2 = '507f1f77bcf86cd799439011';
      expect(comparePrimitives(id1, id2)).toBe(true);
    });

    test('should compare monetary values as Decimal128', () => {
      const price1 = new Decimal128('99.99');
      const price2 = '99.99';
      expect(comparePrimitives(price1, price2)).toBe(true);
    });

    test('should compare timestamps', () => {
      const timestamp1 = new Date('2023-01-01T12:00:00.000Z');
      const timestamp2 = '2023-01-01T12:00:00.000Z';
      expect(comparePrimitives(timestamp1, timestamp2)).toBe(true);
    });

    test('should handle mixed primitive types in comparisons', () => {
      expect(comparePrimitives('123', 123)).toBe(false);
      expect(comparePrimitives('true', true)).toBe(false);
      expect(comparePrimitives('null', null)).toBe(false);
    });
  });
});

