const {
  isObjectIdLike,
  normalizeItem,
  preprocessFileContents,
} = require('../normalize');
const { Decimal128, ObjectId } = require('mongodb');

describe('normalize.js', () => {
  describe('isObjectIdLike', () => {
    it('returns true for 24-char hex string', () => {
      expect(isObjectIdLike('507f1f77bcf86cd799439011')).toBe(true);
    });
    it('returns true for ObjectId instance', () => {
      expect(isObjectIdLike(new ObjectId('507f1f77bcf86cd799439011'))).toBe(
        true
      );
    });
    it('returns false for non-ObjectId string', () => {
      expect(isObjectIdLike('notanobjectid')).toBe(false);
    });
    it('returns false for null/undefined', () => {
      expect(isObjectIdLike(null)).toBe(false);
      expect(isObjectIdLike(undefined)).toBe(false);
    });
  });

  describe('normalizeItem', () => {
    it('preserves ellipsis wildcard', () => {
      expect(normalizeItem({ foo: '...' })).toEqual({ foo: '...' });
    });
    it('normalizes Decimal128 and ObjectId', () => {
      const d = Decimal128.fromString('1.23');
      const o = new ObjectId('507f1f77bcf86cd799439011');
      expect(normalizeItem({ d, o })).toEqual({
        d: d.toString(),
        o: o.toString(),
      });
    });
    it('normalizes Date and ISO string', () => {
      const date = new Date('2021-01-01T00:00:00Z');
      expect(normalizeItem({ d: date })).toEqual({ d: date.toISOString() });
      expect(normalizeItem({ d: '2021-01-01T00:00:00Z' })).toEqual({
        d: date.toISOString(),
      });
    });
    it('normalizes nested arrays and objects', () => {
      const o = new ObjectId('507f1f77bcf86cd799439011');
      expect(normalizeItem({ arr: [o, { foo: '...' }] })).toEqual({
        arr: [o.toString(), { foo: '...' }],
      });
    });
    it('preserves object ellipsis', () => {
      expect(normalizeItem({ foo: { '...': '...' } })).toEqual({
        foo: { '...': '...' },
      });
    });
    it('handles non-object primitives', () => {
      expect(normalizeItem({ n: 1, s: 'a', b: true })).toEqual({
        n: 1,
        s: 'a',
        b: true,
      });
    });
  });

  describe('preprocessFileContents', () => {
    it('wraps single object in array', () => {
      const input = '{ a: 1 }';
      const result = preprocessFileContents(input);
      expect(result).toHaveLength(1);
      expect(result[0]).toContain('{');
      expect(result[0]).toContain('}');
    });
    it('converts single to double quotes', () => {
      const input = "{ foo: 'bar' }";
      const result = preprocessFileContents(input);
      expect(result[0]).toContain('"bar"');
    });
    it('wraps keys in double quotes', () => {
      const input = '{ foo: 1 }';
      const result = preprocessFileContents(input);
      expect(result[0]).toContain('"foo":');
    });
    it('normalizes ISO date strings', () => {
      const input = '{ d: 2021-01-01T00:00:00Z }';
      const result = preprocessFileContents(input);
      expect(result[0]).toContain('Date("2021-01-01T00:00:00Z")');
    });
    it('handles multiple concatenated objects', () => {
      const input = '{ a: 1 }\n{ b: 2 }';
      const processed = preprocessFileContents(input);
      expect(processed).toHaveLength(2);
      expect(processed[0]).toContain('"a": 1');
      expect(processed[1]).toContain('"b": 2');
    });
    it('preserves ellipsis as string', () => {
      const input = '{ foo: ... }';
      const result = preprocessFileContents(input);
      expect(result[0]).toContain('"..."');
    });

    it('handles unquoted ISO date strings correctly', () => {
      const input = '{ date: 2020-01-01T00:00:00.000Z }';
      const result = preprocessFileContents(input);
      expect(result).toHaveLength(1);
      expect(result[0]).toContain('Date("2020-01-01T00:00:00.000Z")');
    });

    it('normalizes ISO date strings with and without milliseconds', () => {
      // With milliseconds
      const input1 = '{ d: 2021-01-01T00:00:00.123Z }';
      const result1 = preprocessFileContents(input1);
      expect(result1).toHaveLength(1);
      expect(result1[0]).toContain('Date("2021-01-01T00:00:00.123Z")');

      // Without milliseconds
      const input2 = '{ d: 2021-01-01T00:00:00Z }';
      const result2 = preprocessFileContents(input2);
      expect(result2).toHaveLength(1);
      expect(result2[0]).toContain('Date("2021-01-01T00:00:00Z")');
    });

    it('returns unchanged for non-date values (else branch)', () => {
      const input = '{ foo: bar }';
      // Should not wrap bar in quotes or change it, just wrap key
      const processed = preprocessFileContents(input);
      expect(processed[0]).toContain('"foo": bar');
    });

    it('handles invalid date strings in date normalization regex (branch coverage)', () => {
      // This string matches the regex but is not a valid date
      const input = '{ d: 2021-13-99T99:99:99Z }';
      const processed = preprocessFileContents(input);
      // The parser wraps it as Date() constructor which creates "Invalid Date" when evaluated
      expect(processed[0]).toContain('Date("2021-13-99T99:99:99Z")');
    });

    it('covers else branch for date normalization regex with non-date string', () => {
      // This string matches the regex but is not a valid date, and triggers the else branch
      const input = '{ d: 2021-99-99T99:99:99Z }';
      const processed = preprocessFileContents(input);
      // The parser wraps it as Date() constructor
      expect(processed[0]).toContain('Date("2021-99-99T99:99:99Z")');
    });
  });
});
