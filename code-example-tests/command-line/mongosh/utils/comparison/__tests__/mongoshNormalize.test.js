const {
  normalizeMongoTypes,
  normalizeDateValue,
  normalizeItem,
  normalizeForComparison,
  ensureComparableFormat,
} = require('../mongoshNormalize');
const { ObjectId, Decimal128, Long, Int32, Double } = require('mongodb');

describe('mongoshNormalize', () => {
  describe('normalizeMongoTypes', () => {
    test('should normalize ObjectId to string', () => {
      const id = new ObjectId('507f1f77bcf86cd799439011');
      expect(normalizeMongoTypes(id)).toBe('507f1f77bcf86cd799439011');
    });

    test('should normalize Decimal128 to string', () => {
      const decimal = new Decimal128('123.45');
      expect(normalizeMongoTypes(decimal)).toBe('123.45');
    });

    test('should normalize Long to string', () => {
      const long = Long.fromString('9223372036854775807');
      expect(normalizeMongoTypes(long)).toBe('9223372036854775807');
    });

    test('should normalize Int32 to string', () => {
      const int32 = new Int32(42);
      expect(normalizeMongoTypes(int32)).toBe('42');
    });

    test('should normalize Double to string', () => {
      const double = new Double(3.14159);
      expect(normalizeMongoTypes(double)).toBe('3.14159');
    });

    test('should return non-MongoDB types unchanged', () => {
      expect(normalizeMongoTypes('string')).toBe('string');
      expect(normalizeMongoTypes(123)).toBe(123);
      expect(normalizeMongoTypes(true)).toBe(true);
      expect(normalizeMongoTypes(null)).toBe(null);
    });
  });

  describe('normalizeDateValue', () => {
    test('should normalize Date objects to ISO string', () => {
      const date = new Date('2023-01-01T00:00:00.000Z');
      expect(normalizeDateValue(date)).toBe('2023-01-01T00:00:00.000Z');
    });

    test('should normalize ISO date strings consistently', () => {
      expect(normalizeDateValue('2023-01-01T00:00:00Z')).toBe('2023-01-01T00:00:00.000Z');
      expect(normalizeDateValue('2023-01-01T00:00:00.000Z')).toBe('2023-01-01T00:00:00.000Z');
    });

    test('should return non-date values unchanged', () => {
      expect(normalizeDateValue('not a date')).toBe('not a date');
      expect(normalizeDateValue(123)).toBe(123);
      expect(normalizeDateValue(null)).toBe(null);
    });
  });

  describe('normalizeItem', () => {
    test('should preserve ellipsis wildcard', () => {
      expect(normalizeItem('...')).toBe('...');
    });

    test('should normalize MongoDB types in objects', () => {
      const id = new ObjectId('507f1f77bcf86cd799439011');
      const result = normalizeItem({ _id: id, name: 'test' });
      expect(result._id).toBe('507f1f77bcf86cd799439011');
      expect(result.name).toBe('test');
    });

    test('should normalize dates in objects', () => {
      const date = new Date('2023-01-01T00:00:00.000Z');
      const result = normalizeItem({ created: date, name: 'test' });
      expect(result.created).toBe('2023-01-01T00:00:00.000Z');
      expect(result.name).toBe('test');
    });

    test('should normalize arrays recursively', () => {
      const id1 = new ObjectId('507f1f77bcf86cd799439011');
      const id2 = new ObjectId('507f1f77bcf86cd799439012');
      const result = normalizeItem([
        { _id: id1, name: 'test1' },
        { _id: id2, name: 'test2' }
      ]);
      expect(result[0]._id).toBe('507f1f77bcf86cd799439011');
      expect(result[1]._id).toBe('507f1f77bcf86cd799439012');
    });

    test('should preserve object ellipsis marker', () => {
      const result = normalizeItem({ '...': '...' });
      expect(result).toEqual({ '...': '...' });
    });

    test('should handle nested structures', () => {
      const id = new ObjectId('507f1f77bcf86cd799439011');
      const date = new Date('2023-01-01T00:00:00.000Z');
      const result = normalizeItem({
        user: {
          _id: id,
          created: date,
          scores: [1, 2, 3]
        }
      });
      expect(result.user._id).toBe('507f1f77bcf86cd799439011');
      expect(result.user.created).toBe('2023-01-01T00:00:00.000Z');
      expect(result.user.scores).toEqual([1, 2, 3]);
    });
  });

  describe('normalizeForComparison', () => {
    test('should normalize array of objects', () => {
      const id1 = new ObjectId('507f1f77bcf86cd799439011');
      const id2 = new ObjectId('507f1f77bcf86cd799439012');
      const result = normalizeForComparison([
        { _id: id1, name: 'test1' },
        { _id: id2, name: 'test2' }
      ]);
      expect(result[0]._id).toBe('507f1f77bcf86cd799439011');
      expect(result[1]._id).toBe('507f1f77bcf86cd799439012');
    });

    test('should normalize single object', () => {
      const id = new ObjectId('507f1f77bcf86cd799439011');
      const result = normalizeForComparison({ _id: id, name: 'test' });
      expect(result._id).toBe('507f1f77bcf86cd799439011');
      expect(result.name).toBe('test');
    });

    test('should handle primitive values', () => {
      expect(normalizeForComparison('string')).toBe('string');
      expect(normalizeForComparison(123)).toBe(123);
      expect(normalizeForComparison(null)).toBe(null);
    });

    test('should normalize all MongoDB types', () => {
      const result = normalizeForComparison([{
        objectId: new ObjectId('507f1f77bcf86cd799439011'),
        decimal: new Decimal128('123.45'),
        long: Long.fromString('9223372036854775807'),
        int32: new Int32(42),
        double: new Double(3.14159),
        date: new Date('2023-01-01T00:00:00.000Z')
      }]);

      expect(result[0].objectId).toBe('507f1f77bcf86cd799439011');
      expect(result[0].decimal).toBe('123.45');
      expect(result[0].long).toBe('9223372036854775807');
      expect(result[0].int32).toBe('42');
      expect(result[0].double).toBe('3.14159');
      expect(result[0].date).toBe('2023-01-01T00:00:00.000Z');
    });
  });

  describe('ensureComparableFormat', () => {
    test('should wrap single object in array when expected is array', () => {
      const result = ensureComparableFormat(
        [{ name: 'test' }],
        { name: 'test' }
      );
      expect(result.expected).toEqual([{ name: 'test' }]);
      expect(result.actual).toEqual([{ name: 'test' }]);
    });

    test('should wrap expected in array when actual is array', () => {
      const result = ensureComparableFormat(
        { name: 'test' },
        [{ name: 'test' }]
      );
      expect(result.expected).toEqual([{ name: 'test' }]);
      expect(result.actual).toEqual([{ name: 'test' }]);
    });

    test('should not wrap when both are arrays', () => {
      const result = ensureComparableFormat(
        [{ name: 'test1' }],
        [{ name: 'test2' }]
      );
      expect(result.expected).toEqual([{ name: 'test1' }]);
      expect(result.actual).toEqual([{ name: 'test2' }]);
    });

    test('should not wrap when both are objects', () => {
      const result = ensureComparableFormat(
        { name: 'test1' },
        { name: 'test2' }
      );
      expect(result.expected).toEqual({ name: 'test1' });
      expect(result.actual).toEqual({ name: 'test2' });
    });

    test('should not wrap primitives', () => {
      const result = ensureComparableFormat('string1', 'string2');
      expect(result.expected).toBe('string1');
      expect(result.actual).toBe('string2');
    });
  });

  describe('integration - complex scenarios', () => {
    test('should handle mongosh output with all types', () => {
      const input = [{
        _id: new ObjectId('507f1f77bcf86cd799439011'),
        name: 'Product',
        price: new Decimal128('99.99'),
        quantity: new Int32(100),
        rating: new Double(4.5),
        created: new Date('2023-01-01T00:00:00.000Z'),
        views: Long.fromString('1000000'),
        metadata: {
          tags: ['electronics', 'gadgets'],
          '...': '...'
        }
      }];

      const result = normalizeForComparison(input);

      expect(result[0]._id).toBe('507f1f77bcf86cd799439011');
      expect(result[0].price).toBe('99.99');
      expect(result[0].quantity).toBe('100');
      expect(result[0].rating).toBe('4.5');
      expect(result[0].created).toBe('2023-01-01T00:00:00.000Z');
      expect(result[0].views).toBe('1000000');
      expect(result[0].metadata.tags).toEqual(['electronics', 'gadgets']);
      expect(result[0].metadata['...']).toBe('...');
    });

    test('should preserve ellipsis patterns during normalization', () => {
      const input = [
        { _id: '...', name: 'test', '...': '...' },
        { _id: new ObjectId('507f1f77bcf86cd799439011'), name: 'test2' }
      ];

      const result = normalizeForComparison(input);

      expect(result[0]._id).toBe('...');
      expect(result[0]['...']).toBe('...');
      expect(result[1]._id).toBe('507f1f77bcf86cd799439011');
    });

    test('should handle arrays with mixed types', () => {
      const input = [
        new ObjectId('507f1f77bcf86cd799439011'),
        new Decimal128('123.45'),
        new Date('2023-01-01T00:00:00.000Z'),
        'string',
        123,
        '...'
      ];

      const result = normalizeForComparison(input);

      expect(result[0]).toBe('507f1f77bcf86cd799439011');
      expect(result[1]).toBe('123.45');
      expect(result[2]).toBe('2023-01-01T00:00:00.000Z');
      expect(result[3]).toBe('string');
      expect(result[4]).toBe(123);
      expect(result[5]).toBe('...');
    });
  });
});

