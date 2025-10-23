const Expect = require('../Expect');
const { areObjectsEqual } = require('../comparison/areObjectsEqual');
const fs = require('fs');
const path = require('path');
const { Decimal128, ObjectId } = require('mongodb');

describe('Expect API (file-based comparison tests)', () => {
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
      expect(() => {
        Expect.that(actual).shouldMatch('temp-output.json');
      }).not.toThrow();
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
      expect(() => {
        Expect.that(actual).shouldMatch('temp-output.json');
      }).toThrow();
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
      expect(() => {
        Expect.that(actual)
          .withOrderedSort()
          .shouldMatch('temp-output.json');
      }).not.toThrow();
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
      expect(() => {
        Expect.that(actual)
          .withOrderedSort()
          .shouldMatch('temp-output.json');
      }).toThrow();
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
      expect(() => {
        Expect.that(actual).shouldMatch('temp-output.json');
      }).not.toThrow();
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
      expect(() => {
        Expect.that(actual).shouldMatch('temp-output.json');
      }).not.toThrow();
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
      expect(() => {
        Expect.that(actual).shouldMatch('temp-output.json');
      }).not.toThrow();
    });

    it('returns false if expected and actual types do not match', () => {
      const expected = `
{
  a: 1
}
`;
      fs.writeFileSync(tempFile, expected);
      const actual = [{ a: 1 }, { a: 2 }];
      expect(() => {
        Expect.that(actual).shouldMatch('temp-output.json');
      }).toThrow();
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
      expect(() => {
        Expect.that(actual).shouldMatch('temp-output.json');
      }).not.toThrow();
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
      expect(() => {
        Expect.that(actual)
          .withIgnoredFields('_id')
          .shouldMatch('temp-output.json');
      }).not.toThrow();
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
      expect(() => {
        Expect.that(actual).shouldMatch('temp-output.json');
      }).toThrow();
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
      expect(() => {
        Expect.that(actual)
          .withIgnoredFields('_id', 'uuid', 'timestamp', 'sessionId')
          .shouldMatch('temp-output.json');
      }).not.toThrow();
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
      expect(() => {
        Expect.that(actual)
          .withIgnoredFields('_id', 'sessionId', 'lastLogin')
          .shouldMatch('temp-output.json');
      }).not.toThrow();
    });
  });

  describe('handles unacceptable structure by returning false', () => {
    it('returns false and logs if expected output file is invalid', () => {
      fs.writeFileSync(tempFile, '{ invalid json }');
      const actual = [{ a: 1 }];
      expect(() => {
        Expect.that(actual).shouldMatch('temp-output.json');
      }).toThrow();
    });

    it('handles single object correctly (treats as array of one)', () => {
      const expected = `{ a: 1 }`;
      fs.writeFileSync(tempFile, expected);
      expect(() => {
        Expect.that({ a: 1 }).shouldMatch('temp-output.json');
      }).not.toThrow();
    });

    it('returns false for malformed object syntax', () => {
      fs.writeFileSync(tempFile, '({ unclosed: "object" ');
      const actual = [{ test: true }];
      expect(() => {
        Expect.that(actual).shouldMatch('temp-output.json');
      }).toThrow();
    });
  });

  describe('object-to-object comparison', () => {
    it('should compare two objects directly when both are objects', () => {
      fs.writeFileSync(tempFile, '{ "name": "test", "value": 42 }');
      const actual = { name: 'test', value: 42 };
      expect(() => {
        Expect.that(actual).shouldMatch('temp-output.json');
      }).not.toThrow();
    });

    it('should handle object comparison with mismatches', () => {
      fs.writeFileSync(tempFile, '{ "a": 1, "b": 2 }');
      const actual = { a: 1, b: 3 };
      expect(() => {
        Expect.that(actual).shouldMatch('temp-output.json');
      }).toThrow();
    });

    it('should handle object-to-object comparison with automatic ellipsis detection', () => {
      fs.writeFileSync(tempFile, '{ "_id": "...", "name": "Alice" }');
      const actual = { _id: 'some-random-id', name: 'Alice' };
      expect(() => {
        Expect.that(actual).shouldMatch('temp-output.json');
      }).not.toThrow();
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
      expect(() => {
        Expect.that(actual).shouldMatch('temp-output.json');
      }).not.toThrow();
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
      expect(() => {
        Expect.that(actual).shouldMatch('temp-output.json');
      }).not.toThrow();
    });

    it('should not match ellipsis patterns when not detected in output file', () => {
      fs.writeFileSync(
        tempFile,
        '{ "_id": "507f1f77bcf86cd799439011", "name": "Alice" }'
      );
      const actual = { _id: 'some-different-id', name: 'Alice' };
      expect(() => {
        Expect.that(actual).shouldMatch('temp-output.json');
      }).toThrow();
    });
  });

  describe('error handling for non-comparable types', () => {
    it('should handle undefined actual output', () => {
      fs.writeFileSync(tempFile, '{ "test": true }');
      expect(() => {
        Expect.that(undefined).shouldMatch('temp-output.json');
      }).toThrow();
    });

    it('should handle null actual output', () => {
      fs.writeFileSync(tempFile, '{ "test": true }');
      expect(() => {
        Expect.that(null).shouldMatch('temp-output.json');
      }).toThrow();
    });

    it('should handle primitive actual output vs object expected', () => {
      fs.writeFileSync(tempFile, '{ "key": "value" }');
      expect(() => {
        Expect.that('string primitive').shouldMatch('temp-output.json');
      }).toThrow();
    });

    it('should handle array vs object mismatch', () => {
      fs.writeFileSync(tempFile, '{ "single": "object" }');
      expect(() => {
        Expect.that([{ different: 'array' }]).shouldMatch('temp-output.json');
      }).toThrow();
    });
  });

  describe('edge cases for expected output handling', () => {
    it('should handle empty expected output file', () => {
      fs.writeFileSync(tempFile, '');
      expect(() => {
        Expect.that([]).shouldMatch('temp-output.json');
      }).not.toThrow();
    });

    it('should properly handle single object conversion to array', () => {
      fs.writeFileSync(tempFile, '{ "convert": "me" }');
      const actual = { convert: 'me' };
      expect(() => {
        Expect.that(actual).shouldMatch('temp-output.json');
      }).not.toThrow();
    });
  });

  describe('handles new Date expressions correctly', () => {
    it('matches objects with new Date expressions in expected output', () => {
      const expected = `[
  {
    time: new Date('2021-12-18T00:00:00.000Z'),
    sensor: { sensorId: 5578, type: 'temperature' },
    temp: 45.2
  },
  {
    time: new Date('2021-12-18T06:00:00.000Z'),
    sensor: { sensorId: 5578, type: 'temperature' },
    temp: 47.3
  }
]`;
      fs.writeFileSync(tempFile, expected);

      const actual = [
        {
          time: new Date('2021-12-18T00:00:00.000Z'),
          sensor: { sensorId: 5578, type: 'temperature' },
          temp: 45.2,
        },
        {
          time: new Date('2021-12-18T06:00:00.000Z'),
          sensor: { sensorId: 5578, type: 'temperature' },
          temp: 47.3,
        },
      ];

      expect(() => {
        Expect.that(actual)
          .withOrderedSort()
          .shouldMatch('temp-output.json');
      }).not.toThrow();
    });

    it('matches single objects with new Date expressions', () => {
      const expected = `{
  time: new Date('2021-12-19T18:00:00.000Z'),
  sensor: { sensorId: 5578, type: 'temperature' },
  temp: 48.2
}`;
      fs.writeFileSync(tempFile, expected);

      const actual = {
        time: new Date('2021-12-19T18:00:00.000Z'),
        sensor: { sensorId: 5578, type: 'temperature' },
        temp: 48.2,
      };

      expect(() => {
        Expect.that(actual).shouldMatch('temp-output.json');
      }).not.toThrow();
    });

    it('matches objects with mixed new Date and bare date expressions', () => {
      const expected = `[
  {
    time: 2021-12-18T00:00:00.000Z,
    sensor: { sensorId: 5578, type: 'temperature' },
    temp: 45.2
  },
  {
    time: new Date('2021-12-18T06:00:00.000Z'),
    sensor: { sensorId: 5578, type: 'temperature' },
    temp: 47.3
  }
]`;
      fs.writeFileSync(tempFile, expected);

      const actual = [
        {
          time: new Date('2021-12-18T00:00:00.000Z'),
          sensor: { sensorId: 5578, type: 'temperature' },
          temp: 45.2,
        },
        {
          time: new Date('2021-12-18T06:00:00.000Z'),
          sensor: { sensorId: 5578, type: 'temperature' },
          temp: 47.3,
        },
      ];

      expect(() => {
        Expect.that(actual)
          .withOrderedSort()
          .shouldMatch('temp-output.json');
      }).not.toThrow();
    });

    it('does not double-wrap new Date expressions', () => {
      // This test ensures we don't create Date(Date("...")) constructions
      const expected = `{
  time: new Date('2021-12-18T00:00:00.000Z'),
  value: 123
}`;
      fs.writeFileSync(tempFile, expected);

      const actual = {
        time: new Date('2021-12-18T00:00:00.000Z'),
        value: 123,
      };

      expect(() => {
        Expect.that(actual).shouldMatch('temp-output.json');
      }).not.toThrow();
    });
  });

  describe('handles new ObjectId expressions correctly', () => {
    it('matches objects with new ObjectId expressions in expected output', () => {
      const expected = `{
  _id: new ObjectId('507f1f77bcf86cd799439011'),
  name: 'Alice',
  age: 30
}`;
      fs.writeFileSync(tempFile, expected);

      const actual = {
        _id: new ObjectId('507f1f77bcf86cd799439011'),
        name: 'Alice',
        age: 30,
      };

      expect(() => {
        Expect.that(actual).shouldMatch('temp-output.json');
      }).not.toThrow();
    });

    it('matches arrays with new ObjectId expressions', () => {
      const expected = `[
  {
    _id: new ObjectId('507f1f77bcf86cd799439011'),
    name: 'Alice'
  },
  {
    _id: new ObjectId('507f1f77bcf86cd799439012'),
    name: 'Bob'
  }
]`;
      fs.writeFileSync(tempFile, expected);

      const actual = [
        {
          _id: new ObjectId('507f1f77bcf86cd799439011'),
          name: 'Alice',
        },
        {
          _id: new ObjectId('507f1f77bcf86cd799439012'),
          name: 'Bob',
        },
      ];

      expect(() => {
        Expect.that(actual)
          .withOrderedSort()
          .shouldMatch('temp-output.json');
      }).not.toThrow();
    });

    it('works with ObjectId constructor without new keyword', () => {
      const expected = `{
  _id: ObjectId('507f1f77bcf86cd799439011'),
  name: 'Test'
}`;
      fs.writeFileSync(tempFile, expected);

      const actual = {
        _id: new ObjectId('507f1f77bcf86cd799439011'),
        name: 'Test',
      };

      expect(() => {
        Expect.that(actual).shouldMatch('temp-output.json');
      }).not.toThrow();
    });
  });

  describe('handles Decimal128 expressions correctly', () => {
    it('matches objects with new Decimal128 expressions in expected output', () => {
      const expected = `{
  price: new Decimal128('123.45'),
  product: 'Widget',
  quantity: 10
}`;
      fs.writeFileSync(tempFile, expected);

      const actual = {
        price: new Decimal128('123.45'),
        product: 'Widget',
        quantity: 10,
      };

      expect(() => {
        Expect.that(actual).shouldMatch('temp-output.json');
      }).not.toThrow();
    });

    it('matches arrays with Decimal128 values', () => {
      const expected = `[
  {
    amount: new Decimal128('99.99'),
    currency: 'USD'
  },
  {
    amount: new Decimal128('149.50'),
    currency: 'EUR'
  }
]`;
      fs.writeFileSync(tempFile, expected);

      const actual = [
        {
          amount: new Decimal128('99.99'),
          currency: 'USD',
        },
        {
          amount: new Decimal128('149.50'),
          currency: 'EUR',
        },
      ];

      expect(() => {
        Expect.that(actual)
          .withOrderedSort()
          .shouldMatch('temp-output.json');
      }).not.toThrow();
    });

    it('works with Decimal128 constructor without new keyword', () => {
      const expected = `{
  value: Decimal128('456.78'),
  label: 'Test'
}`;
      fs.writeFileSync(tempFile, expected);

      const actual = {
        value: new Decimal128('456.78'),
        label: 'Test',
      };

      expect(() => {
        Expect.that(actual).shouldMatch('temp-output.json');
      }).not.toThrow();
    });
  });

  describe('handles strings with special characters', () => {
    it('matches strings containing double quotes', () => {
      const expected = `{
  title: 'Back to the Future',
  description: 'A movie about a "time machine" and adventure'
}`;
      fs.writeFileSync(tempFile, expected);

      const actual = {
        title: 'Back to the Future',
        description: 'A movie about a "time machine" and adventure',
      };

      expect(() => {
        Expect.that(actual).shouldMatch('temp-output.json');
      }).not.toThrow();
    });

    it('matches strings containing URLs with colons', () => {
      const expected = `{
  poster: 'https://example.com/image.jpg',
  website: 'http://test.org'
}`;
      fs.writeFileSync(tempFile, expected);

      const actual = {
        poster: 'https://example.com/image.jpg',
        website: 'http://test.org',
      };

      expect(() => {
        Expect.that(actual).shouldMatch('temp-output.json');
      }).not.toThrow();
    });

    it('matches complex strings with multiple special characters', () => {
      const expected = `{
  text: 'He said: "Hello, world!" and left.',
  url: 'https://example.com:8080/path?query=value'
}`;
      fs.writeFileSync(tempFile, expected);

      const actual = {
        text: 'He said: "Hello, world!" and left.',
        url: 'https://example.com:8080/path?query=value',
      };

      expect(() => {
        Expect.that(actual).shouldMatch('temp-output.json');
      }).not.toThrow();
    });
  });

  describe('handles standalone ellipsis for field omission', () => {
    it('matches objects with standalone ellipsis lines for omitted fields', () => {
      const expected = `{
  _id: ...,
  title: 'Back to the Future',
  genres: ['Adventure', 'Comedy', 'Sci-Fi'],
  ...
  year: 1985,
  ...
}`;
      fs.writeFileSync(tempFile, expected);

      const actual = {
        _id: new ObjectId('507f1f77bcf86cd799439011'),
        title: 'Back to the Future',
        genres: ['Adventure', 'Comedy', 'Sci-Fi'],
        runtime: 116,
        cast: ['Michael J. Fox', 'Christopher Lloyd'],
        year: 1985,
        director: 'Robert Zemeckis',
        plot: 'A teenager travels back in time...',
      };

      expect(() => {
        Expect.that(actual).shouldMatch('temp-output.json');
      }).not.toThrow();
    });

    it('matches with truncated string values using ellipsis', () => {
      const expected = `{
  _id: ...,
  plot: 'A young man is accidentally sent 30 years into the past...',
  title: 'Back to the Future',
  ...
}`;
      fs.writeFileSync(tempFile, expected);

      const actual = {
        _id: new ObjectId('507f1f77bcf86cd799439011'),
        plot: 'A young man is accidentally sent 30 years into the past in a time-traveling DeLorean invented by his friend, Dr. Emmett Brown, and must make sure his high-school-age parents unite in order to save his own existence.',
        title: 'Back to the Future',
        year: 1985,
        runtime: 116,
        cast: ['Michael J. Fox', 'Christopher Lloyd'],
      };

      expect(() => {
        Expect.that(actual).shouldMatch('temp-output.json');
      }).not.toThrow();
    });

    it('allows missing fields when global ellipsis is present', () => {
      const expected = `{
  _id: ...,
  title: 'Back to the Future',
  year: 1985,
  ...
}`;
      fs.writeFileSync(tempFile, expected);

      const actual = {
        _id: new ObjectId('507f1f77bcf86cd799439011'),
        title: 'Back to the Future',
        // year is missing, but global ellipsis allows it
        runtime: 116,
      };

      expect(() => {
        Expect.that(actual).shouldMatch('temp-output.json');
      }).not.toThrow();
    });

    it('does not match when required fields are missing and no global ellipsis', () => {
      const expected = `{
  _id: ...,
  title: 'Back to the Future',
  year: 1985
}`;
      fs.writeFileSync(tempFile, expected);

      const actual = {
        _id: new ObjectId('507f1f77bcf86cd799439011'),
        title: 'Back to the Future',
        // year is missing and no global ellipsis
        runtime: 116,
      };

      expect(() => {
        Expect.that(actual).shouldMatch('temp-output.json');
      }).toThrow();
    });
  });
});
