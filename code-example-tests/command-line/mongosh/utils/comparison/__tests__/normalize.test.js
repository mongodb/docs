const { ObjectId, Decimal128 } = require('mongodb');
const {
  isObjectIdLike,
  normalizeItem,
  preprocessFileContents,
} = require('../normalize');

describe('normalize', () => {
  describe('isObjectIdLike', () => {
    test('should return true for valid 24-char hex string', () => {
      expect(isObjectIdLike('507f1f77bcf86cd799439011')).toBe(true);
      expect(isObjectIdLike('000000000000000000000000')).toBe(true);
      expect(isObjectIdLike('ffffffffffffffffffffffff')).toBe(true);
    });

    test('should return true for ObjectId instance', () => {
      const oid = new ObjectId();
      expect(isObjectIdLike(oid)).toBe(true);
    });

    test('should return false for invalid hex strings', () => {
      expect(isObjectIdLike('not-an-objectid')).toBe(false);
      expect(isObjectIdLike('507f1f77bcf86cd79943901')).toBe(false); // 23 chars
      expect(isObjectIdLike('507f1f77bcf86cd7994390111')).toBe(false); // 25 chars
      expect(isObjectIdLike('507f1f77bcf86cd79943901g')).toBe(false); // Invalid char 'g'
    });

    test('should return false for null and undefined', () => {
      expect(isObjectIdLike(null)).toBe(false);
      expect(isObjectIdLike(undefined)).toBe(false);
    });

    test('should return false for non-string primitives', () => {
      expect(isObjectIdLike(123)).toBe(false);
      expect(isObjectIdLike(true)).toBe(false);
      expect(isObjectIdLike({})).toBe(false);
    });

    test('should handle objects with toHexString method', () => {
      const mockObjectId = {
        toHexString: () => '507f1f77bcf86cd799439011',
      };
      expect(isObjectIdLike(mockObjectId)).toBe(true);
    });
  });

  describe('normalizeItem', () => {
    describe('primitives', () => {
      test('should preserve ellipsis marker', () => {
        expect(normalizeItem('...')).toBe('...');
      });

      test('should preserve strings', () => {
        expect(normalizeItem('hello')).toBe('hello');
      });

      test('should preserve numbers', () => {
        expect(normalizeItem(42)).toBe(42);
        expect(normalizeItem(3.14)).toBe(3.14);
      });

      test('should preserve booleans', () => {
        expect(normalizeItem(true)).toBe(true);
        expect(normalizeItem(false)).toBe(false);
      });

      test('should preserve null', () => {
        expect(normalizeItem(null)).toBe(null);
      });
    });

    describe('MongoDB types', () => {
      test('should normalize ObjectId to string', () => {
        const oid = new ObjectId('507f1f77bcf86cd799439011');
        const result = normalizeItem(oid);
        
        expect(result).toBe('507f1f77bcf86cd799439011');
      });

      test('should normalize Decimal128 to string', () => {
        const decimal = new Decimal128('123.45');
        const result = normalizeItem(decimal);
        
        expect(result).toBe('123.45');
      });
    });

    describe('dates', () => {
      test('should normalize Date object to ISO string', () => {
        const date = new Date('2023-01-01T12:00:00.000Z');
        const result = normalizeItem(date);
        
        expect(result).toBe('2023-01-01T12:00:00.000Z');
      });

      test('should normalize ISO date string to consistent format', () => {
        const result = normalizeItem('2023-01-01T12:00:00Z');
        
        expect(result).toBe('2023-01-01T12:00:00.000Z');
      });

      test('should preserve non-date strings', () => {
        expect(normalizeItem('not-a-date')).toBe('not-a-date');
        expect(normalizeItem('2023-01-01')).toBe('2023-01-01'); // Not full ISO format
      });
    });

    describe('arrays', () => {
      test('should normalize array elements', () => {
        const result = normalizeItem([1, 'hello', true]);
        
        expect(result).toEqual([1, 'hello', true]);
      });

      test('should preserve ellipsis in arrays', () => {
        const result = normalizeItem([1, '...', 3]);
        
        expect(result).toEqual([1, '...', 3]);
      });

      test('should normalize nested arrays', () => {
        const result = normalizeItem([[1, 2], [3, 4]]);
        
        expect(result).toEqual([[1, 2], [3, 4]]);
      });

      test('should normalize MongoDB types in arrays', () => {
        const oid = new ObjectId('507f1f77bcf86cd799439011');
        const result = normalizeItem([oid, 'text']);
        
        expect(result).toEqual(['507f1f77bcf86cd799439011', 'text']);
      });

      test('should normalize dates in arrays', () => {
        const date = new Date('2023-01-01T12:00:00.000Z');
        const result = normalizeItem([date, 'text']);
        
        expect(result).toEqual(['2023-01-01T12:00:00.000Z', 'text']);
      });
    });

    describe('objects', () => {
      test('should normalize object properties', () => {
        const result = normalizeItem({ name: 'Alice', age: 30 });
        
        expect(result).toEqual({ name: 'Alice', age: 30 });
      });

      test('should preserve object-level ellipsis', () => {
        const result = normalizeItem({ '...': '...' });
        
        expect(result).toEqual({ '...': '...' });
      });

      test('should normalize MongoDB types in objects', () => {
        const oid = new ObjectId('507f1f77bcf86cd799439011');
        const result = normalizeItem({ _id: oid, name: 'Alice' });
        
        expect(result).toEqual({ _id: '507f1f77bcf86cd799439011', name: 'Alice' });
      });

      test('should normalize dates in objects', () => {
        const date = new Date('2023-01-01T12:00:00.000Z');
        const result = normalizeItem({ created: date, name: 'Alice' });
        
        expect(result).toEqual({ created: '2023-01-01T12:00:00.000Z', name: 'Alice' });
      });

      test('should normalize nested objects', () => {
        const result = normalizeItem({
          user: { name: 'Alice', age: 30 },
          metadata: { version: 1 },
        });
        
        expect(result).toEqual({
          user: { name: 'Alice', age: 30 },
          metadata: { version: 1 },
        });
      });

      test('should normalize objects with ellipsis properties', () => {
        const result = normalizeItem({
          name: 'Alice',
          _id: '...',
          age: 30,
        });
        
        expect(result).toEqual({
          name: 'Alice',
          _id: '...',
          age: 30,
        });
      });
    });

    describe('complex nested structures', () => {
      test('should normalize deeply nested structure', () => {
        const oid = new ObjectId('507f1f77bcf86cd799439011');
        const date = new Date('2023-01-01T12:00:00.000Z');
        
        const result = normalizeItem({
          users: [
            { _id: oid, name: 'Alice', created: date },
            { _id: '...', name: 'Bob', created: '...' },
          ],
          metadata: {
            count: 2,
            timestamp: date,
          },
        });
        
        expect(result).toEqual({
          users: [
            { _id: '507f1f77bcf86cd799439011', name: 'Alice', created: '2023-01-01T12:00:00.000Z' },
            { _id: '...', name: 'Bob', created: '...' },
          ],
          metadata: {
            count: 2,
            timestamp: '2023-01-01T12:00:00.000Z',
          },
        });
      });

      test('should handle arrays of arrays with mixed types', () => {
        const oid = new ObjectId('507f1f77bcf86cd799439011');
        const result = normalizeItem([[oid, 'text'], ['...', 123]]);
        
        expect(result).toEqual([['507f1f77bcf86cd799439011', 'text'], ['...', 123]]);
      });
    });
  });

  describe('preprocessFileContents', () => {
    test('should parse single object', () => {
      const contents = `{ name: 'Alice', age: 30 }`;
      const result = preprocessFileContents(contents);
      
      expect(result).toHaveLength(1);
      expect(result[0]).toContain('"name"');
      expect(result[0]).toContain('"Alice"');
    });

    test('should parse multiple objects', () => {
      const contents = `{ name: 'Alice' }
{ name: 'Bob' }`;
      const result = preprocessFileContents(contents);
      
      expect(result).toHaveLength(2);
      expect(result[0]).toContain('"Alice"');
      expect(result[1]).toContain('"Bob"');
    });

    test('should handle trailing commas', () => {
      const contents = `{ name: 'Alice', age: 30, }`;
      const result = preprocessFileContents(contents);
      
      expect(result[0]).not.toContain(',}');
      expect(result[0]).toContain('}');
    });

    test('should quote unquoted keys', () => {
      const contents = `{ name: 'Alice', age: 30 }`;
      const result = preprocessFileContents(contents);
      
      expect(result[0]).toContain('"name"');
      expect(result[0]).toContain('"age"');
    });

    test('should handle ellipsis values', () => {
      const contents = `{ _id: ..., name: 'Alice' }`;
      const result = preprocessFileContents(contents);
      
      expect(result[0]).toContain('"..."');
    });

    test('should skip standalone ellipsis lines', () => {
      const contents = `{ name: 'Alice' }
...
{ name: 'Bob' }`;
      const result = preprocessFileContents(contents);
      
      expect(result).toHaveLength(2);
      expect(result[0]).toContain('"Alice"');
      expect(result[1]).toContain('"Bob"');
    });

    test('should handle multi-line objects', () => {
      const contents = `{
  name: 'Alice',
  age: 30,
  address: {
    city: 'NYC'
  }
}`;
      const result = preprocessFileContents(contents);
      
      expect(result).toHaveLength(1);
      expect(result[0]).toContain('"name"');
      expect(result[0]).toContain('"address"');
      expect(result[0]).toContain('"city"');
    });

    test('should handle arrays', () => {
      const contents = `[
  { name: 'Alice' },
  { name: 'Bob' }
]`;
      const result = preprocessFileContents(contents);
      
      expect(result).toHaveLength(1);
      expect(result[0]).toContain('[');
      expect(result[0]).toContain('"Alice"');
      expect(result[0]).toContain('"Bob"');
    });

    test('should handle empty lines', () => {
      const contents = `{ name: 'Alice' }

{ name: 'Bob' }`;
      const result = preprocessFileContents(contents);
      
      expect(result).toHaveLength(2);
    });

    test('should handle ISO date strings', () => {
      const contents = `{ created: 2023-01-01T12:00:00Z }`;
      const result = preprocessFileContents(contents);
      
      expect(result[0]).toContain('Date("2023-01-01T12:00:00Z")');
    });

    test('should escape double quotes in single-quoted strings', () => {
      const contents = `{ message: 'She said "hello"' }`;
      const result = preprocessFileContents(contents);
      
      expect(result[0]).toContain('\\"hello\\"');
    });

    test('should handle nested objects with trailing commas', () => {
      const contents = `{
  user: {
    name: 'Alice',
  },
}`;
      const result = preprocessFileContents(contents);
      
      expect(result[0]).not.toContain(',}');
    });
  });
});

