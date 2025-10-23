const Expect = require('../Expect');
const fs = require('fs');
const path = require('path');

describe('Expect API', () => {
  describe('Basic fluent API', () => {
    it('should create an Expect instance using that()', () => {
      const expectInstance = Expect.that([1, 2, 3]);
      expect(expectInstance).toBeInstanceOf(Expect);
    });

    it('should allow method chaining', () => {
      const expectInstance = Expect.that([1, 2, 3])
        .withUnorderedSort()
        .withIgnoredFields('_id');
      expect(expectInstance).toBeInstanceOf(Expect);
    });
  });

  describe('shouldMatch - direct object comparison', () => {
    it('should match identical objects', () => {
      const actual = { a: 1, b: 2 };
      const expected = { a: 1, b: 2 };

      expect(() => {
        Expect.that(actual).shouldMatch(expected);
      }).not.toThrow();
    });

    it('should match objects with different key order', () => {
      const actual = { a: 1, b: 2 };
      const expected = { b: 2, a: 1 };

      expect(() => {
        Expect.that(actual).shouldMatch(expected);
      }).not.toThrow();
    });

    it('should throw error when objects do not match', () => {
      const actual = { a: 1, b: 2 };
      const expected = { a: 1, b: 3 };

      expect(() => {
        Expect.that(actual).shouldMatch(expected);
      }).toThrow(/Values do not match/);
    });

    it('should match nested objects', () => {
      const actual = { outer: { inner: { value: 42 } } };
      const expected = { outer: { inner: { value: 42 } } };

      expect(() => {
        Expect.that(actual).shouldMatch(expected);
      }).not.toThrow();
    });
  });

  describe('shouldMatch - array comparison', () => {
    it('should match arrays with unordered comparison (default)', () => {
      const actual = [{ a: 1 }, { b: 2 }, { c: 3 }];
      const expected = [{ b: 2 }, { a: 1 }, { c: 3 }];

      expect(() => {
        Expect.that(actual).shouldMatch(expected);
      }).not.toThrow();
    });

    it('should match arrays with explicit unordered sort', () => {
      const actual = [{ a: 1 }, { b: 2 }];
      const expected = [{ b: 2 }, { a: 1 }];

      expect(() => {
        Expect.that(actual).withUnorderedSort().shouldMatch(expected);
      }).not.toThrow();
    });

    it('should enforce order with ordered sort', () => {
      const actual = [{ a: 1 }, { b: 2 }];
      const expected = [{ a: 1 }, { b: 2 }];

      expect(() => {
        Expect.that(actual).withOrderedSort().shouldMatch(expected);
      }).not.toThrow();
    });

    it('should fail when order does not match with ordered sort', () => {
      const actual = [{ a: 1 }, { b: 2 }];
      const expected = [{ b: 2 }, { a: 1 }];

      expect(() => {
        Expect.that(actual).withOrderedSort().shouldMatch(expected);
      }).toThrow();
    });

    it('should match arrays of primitives', () => {
      const actual = [1, 2, 3];
      const expected = [3, 2, 1];

      expect(() => {
        Expect.that(actual).withUnorderedSort().shouldMatch(expected);
      }).not.toThrow();
    });
  });

  describe('shouldMatch - pattern matching', () => {
    it('should match ellipsis patterns in objects with wildcard values', () => {
      const actual = { _id: 'abc123', name: 'test' };
      const expected = { _id: '...', name: 'test' };

      expect(() => {
        Expect.that(actual).shouldMatch(expected);
      }).not.toThrow();
    });

    it('should match truncated string patterns', () => {
      const actual = { message: 'Hello World!' };
      const expected = { message: 'Hello...' };

      expect(() => {
        Expect.that(actual).shouldMatch(expected);
      }).not.toThrow();
    });

    it('should match global ellipsis in objects', () => {
      const actual = { a: 1, b: 2, c: 3, d: 4 };
      const expected = { a: 1, '...': '...' };

      expect(() => {
        Expect.that(actual).shouldMatch(expected);
      }).not.toThrow();
    });

    it('should match ellipsis in arrays', () => {
      const actual = [1, 2, 3, 4, 5];
      const expected = [1, '...', 5];

      expect(() => {
        Expect.that(actual).shouldMatch(expected);
      }).not.toThrow();
    });
  });

  describe('shouldMatch - ignored fields', () => {
    it('should ignore specified fields during comparison', () => {
      const actual = { _id: 'abc123', name: 'test', timestamp: '2023-01-01' };
      const expected = { _id: '...', name: 'test', timestamp: '...', '...': '...' };

      expect(() => {
        Expect.that(actual)
          .withIgnoredFields('_id', 'timestamp')
          .shouldMatch(expected);
      }).not.toThrow();
    });

    it('should still compare non-ignored fields', () => {
      const actual = { _id: 'abc123', name: 'test', value: 42 };
      const expected = { name: 'wrong', value: 42 };

      expect(() => {
        Expect.that(actual)
          .withIgnoredFields('_id')
          .shouldMatch(expected);
      }).toThrow();
    });
  });

  describe('shouldMatch - text comparison', () => {
    it('should match plain text strings', () => {
      const actual = 'Hello World';
      const expected = 'Hello World';

      expect(() => {
        Expect.that(actual).shouldMatch(expected);
      }).not.toThrow();
    });

    it('should normalize whitespace in text comparison', () => {
      const actual = 'Line 1\nLine 2\nLine 3';
      const expected = 'Line 1\r\nLine 2\r\nLine 3';

      expect(() => {
        Expect.that(actual).shouldMatch(expected);
      }).not.toThrow();
    });

    it('should trim trailing whitespace', () => {
      const actual = 'Line 1   \nLine 2   ';
      const expected = 'Line 1\nLine 2';

      expect(() => {
        Expect.that(actual).shouldMatch(expected);
      }).not.toThrow();
    });
  });

  describe('shouldMatch - MongoDB types', () => {
    const { ObjectId, Decimal128 } = require('mongodb');

    it('should normalize ObjectId types', () => {
      const id = new ObjectId();
      const actual = { _id: id };
      const expected = { _id: id.toString() };

      expect(() => {
        Expect.that(actual).shouldMatch(expected);
      }).not.toThrow();
    });

    it('should normalize Decimal128 types', () => {
      const decimal = new Decimal128('123.45');
      const actual = { price: decimal };
      const expected = { price: '123.45' };

      expect(() => {
        Expect.that(actual).shouldMatch(expected);
      }).not.toThrow();
    });

    it('should normalize Date objects', () => {
      const date = new Date('2023-01-01T00:00:00Z');
      const actual = { created: date };
      const expected = { created: '2023-01-01T00:00:00.000Z' };

      expect(() => {
        Expect.that(actual).shouldMatch(expected);
      }).not.toThrow();
    });
  });

  describe('shouldMatch - file comparison', () => {
    const examplesDir = path.resolve(__dirname, '../../examples');
    const testFile = path.join(examplesDir, 'test-expect-api.txt');

    beforeAll(() => {
      // Create test directory and file
      if (!fs.existsSync(examplesDir)) {
        fs.mkdirSync(examplesDir, { recursive: true });
      }
      fs.writeFileSync(
        testFile,
        `{name: 'John', age: 30}\n{name: 'Jane', age: 25}`
      );
    });

    afterAll(() => {
      // Clean up test file
      if (fs.existsSync(testFile)) {
        fs.unlinkSync(testFile);
      }
    });

    it('should match data from file', () => {
      const actual = [
        { name: 'John', age: 30 },
        { name: 'Jane', age: 25 },
      ];

      expect(() => {
        Expect.that(actual).shouldMatch('test-expect-api.txt');
      }).not.toThrow();
    });

    it('should match data from file with unordered comparison', () => {
      const actual = [
        { name: 'Jane', age: 25 },
        { name: 'John', age: 30 },
      ];

      expect(() => {
        Expect.that(actual)
          .withUnorderedSort()
          .shouldMatch('test-expect-api.txt');
      }).not.toThrow();
    });
  });

  describe('error messages', () => {
    it('should provide detailed error message on failure', () => {
      const actual = { a: 1, b: 2 };
      const expected = { a: 1, b: 3 };

      expect(() => {
        Expect.that(actual).shouldMatch(expected);
      }).toThrow(/Comparison failed/);
    });

    it('should include expected and actual values in error', () => {
      const actual = { value: 42 };
      const expected = { value: 100 };

      try {
        Expect.that(actual).shouldMatch(expected);
        fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).toContain('Expected');
        expect(error.message).toContain('Actual');
      }
    });
  });

  describe('complex real-world scenarios', () => {
    it('should handle movie query results', () => {
      const actual = [
        {
          _id: new (require('mongodb').ObjectId)(),
          title: 'The Shawshank Redemption',
          year: 1994,
          runtime: 142,
          rated: 'R',
        },
        {
          _id: new (require('mongodb').ObjectId)(),
          title: 'The Godfather',
          year: 1972,
          runtime: 175,
          rated: 'R',
        },
      ];

      const expected = [
        {
          _id: '...',
          title: 'The Shawshank Redemption',
          year: 1994,
          runtime: 142,
          rated: 'R',
        },
        {
          _id: '...',
          title: 'The Godfather',
          year: 1972,
          runtime: 175,
          rated: 'R',
        },
      ];

      expect(() => {
        Expect.that(actual)
          .shouldMatch(expected);
      }).not.toThrow();
    });

    it('should handle aggregation pipeline results with ellipsis', () => {
      const actual = [
        {
          _id: 'Action',
          count: 1234,
          avgRating: 6.5,
          updatedAt: '2023-01-01T00:00:00Z',
        },
        {
          _id: 'Drama',
          count: 2345,
          avgRating: 7.2,
          updatedAt: '2023-01-01T00:00:00Z',
        },
      ];

      const expected = [
        { _id: 'Action', count: '...', avgRating: '...', updatedAt: '...', '...': '...' },
        { _id: 'Drama', count: '...', avgRating: '...', updatedAt: '...', '...': '...' },
      ];

      expect(() => {
        Expect.that(actual)
          .shouldMatch(expected);
      }).not.toThrow();
    });
  });
});

