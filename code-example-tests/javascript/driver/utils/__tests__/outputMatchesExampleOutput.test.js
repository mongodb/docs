const { outputMatchesExampleOutput } = require('../outputMatchesExampleOutput');
const { areObjectsEqual } = require('../areObjectsEqual');
const fs = require('fs');
const path = require('path');
const { Decimal128, ObjectId } = require('mongodb');

describe('outputMatchesExampleOutput', () => {
  const tempExamplesDir = path.join(__dirname, '../../examples');
  const tempFile = path.join(tempExamplesDir, 'temp-output.json');

  beforeAll(() => {
    if (!fs.existsSync(tempExamplesDir)) {
      fs.mkdirSync(tempExamplesDir, { recursive: true });
    }
  });

  afterEach(() => {
    if (fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile);
    }
  });

  describe('ordered/unordered comparison works as expected', () => {
    it('matches identical arrays of objects (unordered)', () => {
      const expected = `
{ a: 1, b: 'foo' }
{ a: 2, b: 'bar' }
`;
      fs.writeFileSync(tempFile, expected);
      const actual = [
        { b: 'bar', a: 2 },
        { b: 'foo', a: 1 },
      ];
      expect(outputMatchesExampleOutput('temp-output.json', actual)).toBe(true);
    });

    it('does not match arrays with different objects (unordered)', () => {
      const expected = `
{ a: 1, b: 'foo' }
{ a: 2, b: 'bar' }
`;
      fs.writeFileSync(tempFile, expected);
      const actual = [
        { a: 1, b: 'foo' },
        { a: 3, b: 'baz' },
      ];
      expect(outputMatchesExampleOutput('temp-output.json', actual)).toBe(
        false
      );
    });

    it('matches arrays in order when comparisonType is ordered', () => {
      const expected = `
{
  a: 1
}
{
  a: 2
}
`;
      fs.writeFileSync(tempFile, expected);
      const actual = [{ a: 1 }, { a: 2 }];
      expect(
        outputMatchesExampleOutput('temp-output.json', actual, {
          comparisonType: 'ordered',
        })
      ).toBe(true);
    });

    it('does not match arrays out of order when comparisonType is ordered', () => {
      const expected = `
{
  a: 1
}
{
  a: 2
}
`;
      fs.writeFileSync(tempFile, expected);
      const actual = [{ a: 2 }, { a: 1 }];
      expect(
        outputMatchesExampleOutput('temp-output.json', actual, {
          comparisonType: 'ordered',
        })
      ).toBe(false);
    });

    it('matches arrays of objects with different key order in nested objects', () => {
      const a = [{ foo: { x: 1, y: 2 }, bar: 3 }];
      const b = [{ bar: 3, foo: { y: 2, x: 1 } }];
      expect(areObjectsEqual(a, b, { comparisonType: 'unordered' })).toBe(true);
    });

    it('matches arrays of objects with different key order at top level', () => {
      const a = [
        { a: 1, b: 2 },
        { c: 3, d: 4 },
      ];
      const b = [
        { b: 2, a: 1 },
        { d: 4, c: 3 },
      ];
      expect(areObjectsEqual(a, b, { comparisonType: 'unordered' })).toBe(true);
    });

    it('matches deeply nested arrays and objects with key order differences', () => {
      const a = [{ arr: [{ foo: 1, bar: 2 }, { baz: 3 }] }];
      const b = [{ arr: [{ bar: 2, foo: 1 }, { baz: 3 }] }];
      expect(areObjectsEqual(a, b, { comparisonType: 'unordered' })).toBe(true);
    });

    it('matches arrays with duplicate objects in unordered comparison', () => {
      const a = [{ x: 1 }, { x: 1 }, { y: 2 }];
      const b = [{ y: 2 }, { x: 1 }, { x: 1 }];
      expect(areObjectsEqual(a, b, { comparisonType: 'unordered' })).toBe(true);
    });
  });

  describe('handles types as expected', () => {
    it('matches objects with ISO date strings, unquoted keys, and single quotes', () => {
      const expected = `
{
  value: 1.23,
  id: '507f1f77bcf86cd799439011',
  date: 2020-01-01T00:00:00.000Z
}
`;
      fs.writeFileSync(tempFile, expected);
      const actual = [
        {
          value: 1.23,
          id: '507f1f77bcf86cd799439011',
          date: '2020-01-01T00:00:00.000Z',
        },
      ];
      expect(outputMatchesExampleOutput('temp-output.json', actual)).toBe(true);
    });

    it('treats _id: ... as a wildcard and matches any value', () => {
      const expected = `
{
  _id: ...,
  name: 'Alice'
}
`;
      fs.writeFileSync(tempFile, expected);
      const actual = [{ _id: '507f1f77bcf86cd799439011', name: 'Alice' }];
      expect(outputMatchesExampleOutput('temp-output.json', actual)).toBe(true);
    });

    it('matches nested objects and arrays', () => {
      const expected = `
{
  a: 1,
  b: { c: 2, d: [3, 4] }
}
`;
      fs.writeFileSync(tempFile, expected);
      const actual = [{ a: 1, b: { c: 2, d: [3, 4] } }];
      expect(outputMatchesExampleOutput('temp-output.json', actual)).toBe(true);
    });

    it('returns false if expected and actual types do not match', () => {
      const expected = `
{
  a: 1
}
`;
      fs.writeFileSync(tempFile, expected);
      const actual = [{ a: 1 }, { a: 2 }];
      expect(outputMatchesExampleOutput('temp-output.json', actual)).toBe(
        false
      );
    });

    it('normalizes and matches date strings in different formats', () => {
      const a = [{ date: '2021-12-18T15:55:00.000Z' }];
      const b = [{ date: new Date('2021-12-18T15:55:00Z').toISOString() }];
      expect(areObjectsEqual(a, b, { comparisonType: 'unordered' })).toBe(true);
    });

    it('normalizes and matches ObjectId as string and as ObjectId instance', () => {
      const oid = new ObjectId('507f1f77bcf86cd799439011');
      const a = [{ _id: oid }];
      const b = [{ _id: '507f1f77bcf86cd799439011' }];
      expect(
        areObjectsEqual(a, b, {
          comparisonType: 'unordered',
          ignoreFieldValues: ['_id'],
        })
      ).toBe(true);
    });

    it('matches empty arrays', () => {
      const expected = ``; // No objects in file
      fs.writeFileSync(tempFile, expected);
      const actual = [];
      expect(outputMatchesExampleOutput('temp-output.json', actual)).toBe(true);
    });
  });

  describe('handles options properly', () => {
    it('treats _id fields as equal if ignoreFieldValues is set', () => {
      const expected = `
{
  _id: '507f1f77bcf86cd799439011',
  name: 'Alice'
}
`;
      fs.writeFileSync(tempFile, expected);
      const actual = [{ _id: 'aaaaaaaaaaaaaaaaaaaaaaaa', name: 'Alice' }];
      expect(
        outputMatchesExampleOutput('temp-output.json', actual, {
          ignoreFieldValues: ['_id'],
        })
      ).toBe(true);
    });

    it('does not treat _id fields as equal if ignoreFieldValues is not set', () => {
      const expected = `
{
  _id: '507f1f77bcf86cd799439011',
  name: 'Alice'
}
`;
      fs.writeFileSync(tempFile, expected);
      const actual = [{ _id: 'aaaaaaaaaaaaaaaaaaaaaaaa', name: 'Alice' }];
      expect(outputMatchesExampleOutput('temp-output.json', actual)).toBe(
        false
      );
    });

    it('handles various dynamic field types with ignoreFieldValues', () => {
      const expected = `
{
  _id: '507f1f77bcf86cd799439011',
  uuid: 'uuid-value-123',
  timestamp: '2023-01-01T00:00:00Z',
  sessionId: 'session-abc',
  name: 'Alice',
  status: 'active'
}
`;
      fs.writeFileSync(tempFile, expected);
      const actual = [
        {
          _id: 'completely-different-id',
          uuid: 'uuid-value-xyz',
          timestamp: '2025-08-26T10:30:00Z',
          sessionId: 'session-def',
          name: 'Alice',
          status: 'active',
        },
      ];
      expect(
        outputMatchesExampleOutput('temp-output.json', actual, {
          ignoreFieldValues: ['_id', 'uuid', 'timestamp', 'sessionId'],
        })
      ).toBe(true);
    });

    it('ignoreFieldValues works with nested objects', () => {
      const expected = `
{
  user: {
    _id: 'user123',
    name: 'Alice',
    profile: {
      sessionId: 'session-abc',
      lastLogin: '2023-01-01T00:00:00Z'
    }
  },
  data: { value: 42 }
}
`;
      fs.writeFileSync(tempFile, expected);
      const actual = [
        {
          user: {
            _id: 'different-user-id',
            name: 'Alice',
            profile: {
              sessionId: 'different-session',
              lastLogin: '2025-08-26T10:30:00Z',
            },
          },
          data: { value: 42 },
        },
      ];
      expect(
        outputMatchesExampleOutput('temp-output.json', actual, {
          ignoreFieldValues: ['_id', 'sessionId', 'lastLogin'],
        })
      ).toBe(true);
    });
  });

  describe('handles unacceptable structure by returning false', () => {
    it('returns false and logs if expected output file is invalid', () => {
      fs.writeFileSync(tempFile, '{ invalid json }');
      const actual = [{ a: 1 }];
      expect(outputMatchesExampleOutput('temp-output.json', actual)).toBe(
        false
      );
    });

    it('handles single object correctly (treats as array of one)', () => {
      const expected = `{ a: 1 }`;
      fs.writeFileSync(tempFile, expected);
      expect(outputMatchesExampleOutput('temp-output.json', { a: 1 })).toBe(
        true
      );
    });

    it('returns false for malformed object syntax', () => {
      fs.writeFileSync(tempFile, '({ unclosed: "object" ');
      const actual = [{ test: true }];
      expect(outputMatchesExampleOutput('temp-output.json', actual)).toBe(
        false
      );
    });
  });

  describe('object-to-object comparison', () => {
    it('should compare two objects directly when both are objects', () => {
      fs.writeFileSync(tempFile, '{ "name": "test", "value": 42 }');
      const actual = { name: 'test', value: 42 };
      expect(outputMatchesExampleOutput('temp-output.json', actual)).toBe(true);
    });

    it('should handle object comparison with mismatches', () => {
      fs.writeFileSync(tempFile, '{ "a": 1, "b": 2 }');
      const actual = { a: 1, b: 3 };
      expect(outputMatchesExampleOutput('temp-output.json', actual)).toBe(
        false
      );
    });

    it('should handle object-to-object comparison with automatic ellipsis detection', () => {
      fs.writeFileSync(tempFile, '{ "_id": "...", "name": "Alice" }');
      const actual = { _id: 'some-random-id', name: 'Alice' };
      expect(outputMatchesExampleOutput('temp-output.json', actual)).toBe(true);
    });

    it('should automatically enable ellipsis matching when standalone ... is detected', () => {
      const expected = `{
  _id: ...,
  name: 'Alice'
}

{
  _id: ...,
  name: 'Bob'
}

...`;
      fs.writeFileSync(tempFile, expected);
      const actual = [
        { _id: 'id1', name: 'Alice' },
        { _id: 'id2', name: 'Bob' },
      ];
      expect(outputMatchesExampleOutput('temp-output.json', actual)).toBe(true);
    });

    it('should allow extra fields and documents when standalone ... is detected', () => {
      const expected = `{
  name: 'Alice'
}

...`;
      fs.writeFileSync(tempFile, expected);
      const actual = [
        { name: 'Alice', extra: 'field1', anotherField: 'value1' },
      ];
      expect(outputMatchesExampleOutput('temp-output.json', actual)).toBe(true);
    });

    it('should not match ellipsis patterns when not detected in output file', () => {
      fs.writeFileSync(
        tempFile,
        '{ "_id": "507f1f77bcf86cd799439011", "name": "Alice" }'
      );
      const actual = { _id: 'some-different-id', name: 'Alice' };
      expect(outputMatchesExampleOutput('temp-output.json', actual)).toBe(
        false
      );
    });
  });

  describe('error handling for non-comparable types', () => {
    it('should handle undefined actual output', () => {
      fs.writeFileSync(tempFile, '{ "test": true }');
      expect(outputMatchesExampleOutput('temp-output.json', undefined)).toBe(
        false
      );
    });

    it('should handle null actual output', () => {
      fs.writeFileSync(tempFile, '{ "test": true }');
      expect(outputMatchesExampleOutput('temp-output.json', null)).toBe(false);
    });

    it('should handle primitive actual output vs object expected', () => {
      fs.writeFileSync(tempFile, '{ "key": "value" }');
      expect(
        outputMatchesExampleOutput('temp-output.json', 'string primitive')
      ).toBe(false);
    });

    it('should handle array vs object mismatch', () => {
      fs.writeFileSync(tempFile, '{ "single": "object" }');
      expect(
        outputMatchesExampleOutput('temp-output.json', [{ different: 'array' }])
      ).toBe(false);
    });
  });

  describe('edge cases for expected output handling', () => {
    it('should handle empty expected output file', () => {
      fs.writeFileSync(tempFile, '');
      expect(outputMatchesExampleOutput('temp-output.json', [])).toBe(true);
    });

    it('should properly handle single object conversion to array', () => {
      fs.writeFileSync(tempFile, '{ "convert": "me" }');
      const actual = { convert: 'me' };
      expect(outputMatchesExampleOutput('temp-output.json', actual)).toBe(true);
    });
  });
});
