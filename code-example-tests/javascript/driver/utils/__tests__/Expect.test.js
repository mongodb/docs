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
      const expected = {
        _id: '...',
        name: 'test',
        timestamp: '...',
        '...': '...',
      };

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
        Expect.that(actual).withIgnoredFields('_id').shouldMatch(expected);
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
        Expect.that(actual).shouldMatch(expected);
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
        {
          _id: 'Action',
          count: '...',
          avgRating: '...',
          updatedAt: '...',
          '...': '...',
        },
        {
          _id: 'Drama',
          count: '...',
          avgRating: '...',
          updatedAt: '...',
          '...': '...',
        },
      ];

      expect(() => {
        Expect.that(actual).shouldMatch(expected);
      }).not.toThrow();
    });
  });

  describe('shouldResemble and withSchema - schema-based validation', () => {
    describe('basic functionality', () => {
      it('should validate when both expected and actual match schema', () => {
        const actual = [
          { _id: 'abc123', title: 'Movie A', year: 2012 },
          { _id: 'def456', title: 'Movie B', year: 2012 },
        ];
        const expected = [
          { _id: 'xyz789', title: 'Movie X', year: 2012 },
          { _id: 'uvw012', title: 'Movie Y', year: 2012 },
        ];

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({
              count: 2,
              requiredFields: ['_id', 'title', 'year'],
              fieldValues: { year: 2012 },
            });
        }).not.toThrow();
      });

      it('should pass with only count specified', () => {
        const actual = [{ a: 1 }, { b: 2 }, { c: 3 }];
        const expected = [{ x: 10 }, { y: 20 }, { z: 30 }];

        expect(() => {
          Expect.that(actual).shouldResemble(expected).withSchema({ count: 3 });
        }).not.toThrow();
      });

      it('should pass with empty arrays when count is 0', () => {
        const actual = [];
        const expected = [];

        expect(() => {
          Expect.that(actual).shouldResemble(expected).withSchema({ count: 0 });
        }).not.toThrow();
      });

      it('should work with empty requiredFields and fieldValues', () => {
        const actual = [{ a: 1, b: 2 }];
        const expected = [{ x: 10, y: 20 }];

        expect(() => {
          Expect.that(actual).shouldResemble(expected).withSchema({
            count: 1,
            requiredFields: [],
            fieldValues: {},
          });
        }).not.toThrow();
      });
    });

    describe('count validation', () => {
      it('should fail when actual count does not match', () => {
        const actual = [{ a: 1 }, { b: 2 }];
        const expected = [{ x: 1 }, { y: 2 }, { z: 3 }];

        expect(() => {
          Expect.that(actual).shouldResemble(expected).withSchema({ count: 3 });
        }).toThrow(/actual output has 2 documents, expected 3/);
      });

      it('should fail when expected count does not match', () => {
        const actual = [{ a: 1 }, { b: 2 }, { c: 3 }];
        const expected = [{ x: 1 }];

        expect(() => {
          Expect.that(actual).shouldResemble(expected).withSchema({ count: 3 });
        }).toThrow(/expected output has 1 documents, expected 3/);
      });
    });

    describe('requiredFields validation', () => {
      it('should pass when all required fields are present', () => {
        const actual = [{ _id: '1', name: 'Test', extra: 'field' }];
        const expected = [{ _id: '2', name: 'Other', different: 'value' }];

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({
              count: 1,
              requiredFields: ['_id', 'name'],
            });
        }).not.toThrow();
      });

      it('should fail when actual is missing required field', () => {
        const actual = [{ _id: '1' }];
        const expected = [{ _id: '2', name: 'Test' }];

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({
              count: 1,
              requiredFields: ['_id', 'name'],
            });
        }).toThrow(/actual\[0\] is missing required field 'name'/);
      });

      it('should fail when expected is missing required field', () => {
        const actual = [{ _id: '1', name: 'Test' }];
        const expected = [{ _id: '2' }];

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({
              count: 1,
              requiredFields: ['_id', 'name'],
            });
        }).toThrow(/expected\[0\] is missing required field 'name'/);
      });
    });

    describe('fieldValues validation', () => {
      it('should pass when all field values match', () => {
        const actual = [
          { genre: 'Action', year: 2020 },
          { genre: 'Action', year: 2020 },
        ];
        const expected = [
          { genre: 'Action', year: 2020 },
          { genre: 'Action', year: 2020 },
        ];

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({
              count: 2,
              fieldValues: { genre: 'Action', year: 2020 },
            });
        }).not.toThrow();
      });

      it('should fail when actual has wrong field value', () => {
        const actual = [{ year: 2019 }];
        const expected = [{ year: 2020 }];

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({
              count: 1,
              fieldValues: { year: 2020 },
            });
        }).toThrow(/actual\[0\].year has value 2019, expected 2020/);
      });

      it('should fail when expected has wrong field value', () => {
        const actual = [{ year: 2020 }];
        const expected = [{ year: 2019 }];

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({
              count: 1,
              fieldValues: { year: 2020 },
            });
        }).toThrow(/expected\[0\].year has value 2019, expected 2020/);
      });

      it('should fail when field is missing for fieldValues check', () => {
        const actual = [{ name: 'Test' }];
        const expected = [{ year: 2020 }];

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({
              count: 1,
              fieldValues: { year: 2020 },
            });
        }).toThrow(
          /actual\[0\] is missing field 'year' required by fieldValues/
        );
      });
    });

    describe('complex scenarios', () => {
      it('should handle nested field values', () => {
        const actual = [
          { id: 1, metadata: { category: 'movie', source: 'imdb' } },
          { id: 2, metadata: { category: 'movie', source: 'imdb' } },
        ];
        const expected = [
          { id: 10, metadata: { category: 'movie', source: 'imdb' } },
          { id: 20, metadata: { category: 'movie', source: 'imdb' } },
        ];

        // All documents must have the same nested metadata object
        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({
              count: 2,
              requiredFields: ['id', 'metadata'],
              fieldValues: { metadata: { category: 'movie', source: 'imdb' } },
            });
        }).not.toThrow();
      });

      it('should fail with mismatched nested field values', () => {
        const actual = [
          { id: 1, metadata: { category: 'book', source: 'library' } },
        ];
        const expected = [
          { id: 10, metadata: { category: 'movie', source: 'imdb' } },
        ];

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({
              count: 1,
              fieldValues: { metadata: { category: 'movie', source: 'imdb' } },
            });
        }).toThrow(/metadata.*has value/);
      });

      it('should validate with all schema options together', () => {
        const actual = [
          { _id: 'a1', title: 'Doc 1', status: 'active', year: 2023 },
          { _id: 'a2', title: 'Doc 2', status: 'active', year: 2023 },
          { _id: 'a3', title: 'Doc 3', status: 'active', year: 2023 },
        ];
        const expected = [
          { _id: 'b1', title: 'Other 1', status: 'active', year: 2023 },
          { _id: 'b2', title: 'Other 2', status: 'active', year: 2023 },
          { _id: 'b3', title: 'Other 3', status: 'active', year: 2023 },
        ];

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({
              count: 3,
              requiredFields: ['_id', 'title', 'status', 'year'],
              fieldValues: { status: 'active', year: 2023 },
            });
        }).not.toThrow();
      });
    });

    describe('withIgnoredFields incompatibility', () => {
      it('should throw error when withIgnoredFields is used with shouldResemble', () => {
        const actual = [{ _id: '1', name: 'Test' }];
        const expected = [{ _id: '2', name: 'Other' }];

        expect(() => {
          Expect.that(actual)
            .withIgnoredFields('_id')
            .shouldResemble(expected)
            .withSchema({
              count: 1,
              requiredFields: ['_id', 'name'],
            });
        }).toThrow(
          /withIgnoredFields\(\) cannot be used with shouldResemble\(\)/
        );
      });

      it('should throw error when multiple fields are ignored with shouldResemble', () => {
        const actual = [{ _id: '1', name: 'Test', timestamp: '2023-01-01' }];
        const expected = [{ _id: '2', name: 'Other', timestamp: '2023-06-15' }];

        expect(() => {
          Expect.that(actual)
            .withIgnoredFields('_id', 'timestamp')
            .shouldResemble(expected)
            .withSchema({
              count: 1,
              requiredFields: ['_id', 'name'],
            });
        }).toThrow(
          /withIgnoredFields\(\) cannot be used with shouldResemble\(\)/
        );
      });
    });

    describe('sort option incompatibility', () => {
      it('should throw error when withOrderedSort is used with shouldResemble', () => {
        const actual = [{ a: 1 }];
        const expected = [{ a: 1 }];

        expect(() => {
          Expect.that(actual)
            .withOrderedSort()
            .shouldResemble(expected)
            .withSchema({
              count: 1,
              requiredFields: ['a'],
            });
        }).toThrow(
          /withOrderedSort\(\)\/withUnorderedSort\(\) cannot be used with shouldResemble\(\)/
        );
      });

      it('should throw error when withUnorderedSort is used with shouldResemble', () => {
        const actual = [{ a: 1 }];
        const expected = [{ a: 1 }];

        expect(() => {
          Expect.that(actual)
            .withUnorderedSort()
            .shouldResemble(expected)
            .withSchema({
              count: 1,
              requiredFields: ['a'],
            });
        }).toThrow(
          /withOrderedSort\(\)\/withUnorderedSort\(\) cannot be used with shouldResemble\(\)/
        );
      });
    });

    describe('mutual exclusivity', () => {
      it('should throw error when shouldMatch is called after shouldResemble', () => {
        const actual = [{ a: 1 }];
        const expected = [{ a: 1 }];

        expect(() => {
          Expect.that(actual).shouldResemble(expected).shouldMatch(expected);
        }).toThrow(/shouldMatch\(\) cannot be used with shouldResemble\(\)/);
      });

      it('should throw error when shouldResemble is called after shouldMatch', () => {
        const actual = [{ a: 1 }];
        const expected = [{ a: 1 }];

        expect(() => {
          const e = Expect.that(actual);
          e.shouldMatch(expected);
          e.shouldResemble(expected);
        }).toThrow(/shouldResemble\(\) cannot be used with shouldMatch\(\)/);
      });

      it('should throw error when withSchema is called without shouldResemble', () => {
        const actual = [{ a: 1 }];

        expect(() => {
          Expect.that(actual).withSchema({ count: 1 });
        }).toThrow(
          /withSchema\(\) requires shouldResemble\(\) to be called first/
        );
      });
    });

    describe('schema configuration validation', () => {
      it('should throw error when count is not provided', () => {
        const actual = [{ a: 1 }];
        const expected = [{ b: 2 }];

        expect(() => {
          Expect.that(actual).shouldResemble(expected).withSchema({});
        }).toThrow(/requires a non-negative count number/);
      });

      it('should throw error when count is negative', () => {
        const actual = [{ a: 1 }];
        const expected = [{ b: 2 }];

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({ count: -1 });
        }).toThrow(/requires a non-negative count number/);
      });

      it('should throw error when count is not an integer', () => {
        const actual = [{ a: 1 }];
        const expected = [{ b: 2 }];

        // Note: mongosh implementation allows floats, validates at schema level
        // JavaScript implementation also allows floats (count validation happens at schema level)
        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({ count: 1.5 });
        }).toThrow(/expected 1\.5/);
      });

      it('should throw error when requiredFields is not an array', () => {
        const actual = [{ a: 1 }];
        const expected = [{ b: 2 }];

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({ count: 1, requiredFields: 'name' });
        }).toThrow(/requiredFields must be an array/);
      });

      it('should throw error when fieldValues is not an object', () => {
        const actual = [{ a: 1 }];
        const expected = [{ b: 2 }];

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({ count: 1, fieldValues: 'invalid' });
        }).toThrow(/fieldValues must be an object/);
      });

      it('should throw error when fieldValues is null', () => {
        const actual = [{ a: 1 }];
        const expected = [{ b: 2 }];

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({ count: 1, fieldValues: null });
        }).toThrow(/fieldValues must be an object/);
      });

      it('should throw error when fieldValues is an array', () => {
        const actual = [{ a: 1 }];
        const expected = [{ b: 2 }];

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({ count: 1, fieldValues: ['year'] });
        }).toThrow(/fieldValues must be an object/);
      });

      it('should auto-wrap single document actual into array', () => {
        const actual = { _id: '1', title: 'Movie A', year: 2012 };
        const expected = [{ _id: '2', title: 'Movie B', year: 2012 }];

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({
              count: 1,
              requiredFields: ['_id', 'title', 'year'],
              fieldValues: { year: 2012 },
            });
        }).not.toThrow();
      });

      it('should auto-wrap single document expected into array', () => {
        const actual = [{ _id: '1', title: 'Movie A', year: 2012 }];
        const expected = { _id: '2', title: 'Movie B', year: 2012 };

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({
              count: 1,
              requiredFields: ['_id', 'title', 'year'],
              fieldValues: { year: 2012 },
            });
        }).not.toThrow();
      });

      it('should work with both actual and expected as single documents', () => {
        const actual = { _id: '1', title: 'Movie A', year: 2012 };
        const expected = { _id: '2', title: 'Movie B', year: 2012 };

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({
              count: 1,
              requiredFields: ['_id', 'title', 'year'],
              fieldValues: { year: 2012 },
            });
        }).not.toThrow();
      });

      it('should throw error when data is a primitive type', () => {
        const actual = 'not a document';
        const expected = [{ b: 2 }];

        expect(() => {
          Expect.that(actual).shouldResemble(expected).withSchema({ count: 1 });
        }).toThrow(/actual output must be an array or document/);
      });

      it('should throw error when data is null', () => {
        const actual = null;
        const expected = [{ b: 2 }];

        expect(() => {
          Expect.that(actual).shouldResemble(expected).withSchema({ count: 1 });
        }).toThrow(/actual output is null/);
      });
    });

    describe('MongoDB types handling', () => {
      const { ObjectId, Decimal128 } = require('mongodb');

      it('should handle ObjectId comparison in fieldValues', () => {
        const id = new ObjectId();
        const actual = [{ _id: id, type: 'movie' }];
        const expected = [{ _id: new ObjectId(), type: 'movie' }];

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({
              count: 1,
              requiredFields: ['_id'],
              fieldValues: { type: 'movie' },
            });
        }).not.toThrow();
      });

      it('should handle Date comparison in fieldValues', () => {
        const date = new Date('2023-01-01T00:00:00Z');
        const actual = [{ created: date, status: 'active' }];
        const expected = [
          { created: new Date('2023-06-15'), status: 'active' },
        ];

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({
              count: 1,
              requiredFields: ['created'],
              fieldValues: { status: 'active' },
            });
        }).not.toThrow();
      });

      it('should compare Date values correctly in fieldValues', () => {
        const date = new Date('2023-01-01T00:00:00Z');
        const actual = [{ created: date }];
        const expected = [{ created: date }];

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({
              count: 1,
              fieldValues: { created: date },
            });
        }).not.toThrow();
      });
    });

    describe('real-world Vector Search scenario', () => {
      it('should validate Vector Search results with schema-based validation', () => {
        // Simulating Vector Search where specific documents may vary
        // but we know the structure and some constant values
        // Note: Use requiredFields to validate field presence, not withIgnoredFields
        const actual = [
          { _id: 'doc1', title: 'Inception', genre: 'Sci-Fi', score: 0.95 },
          { _id: 'doc2', title: 'Interstellar', genre: 'Sci-Fi', score: 0.88 },
          {
            _id: 'doc3',
            title: 'The Dark Knight',
            genre: 'Sci-Fi',
            score: 0.82,
          },
        ];

        const expected = [
          { _id: 'docA', title: 'The Matrix', genre: 'Sci-Fi', score: 0.91 },
          { _id: 'docB', title: 'Blade Runner', genre: 'Sci-Fi', score: 0.85 },
          { _id: 'docC', title: 'Alien', genre: 'Sci-Fi', score: 0.79 },
        ];

        // Both have the right structure, count, required fields, and matching genre
        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({
              count: 3,
              requiredFields: ['_id', 'title', 'genre', 'score'],
              fieldValues: { genre: 'Sci-Fi' },
            });
        }).not.toThrow();
      });

      it('should validate results where all documents share a common field value', () => {
        const actual = [
          { _id: 'a', title: 'Movie 1', genre: 'Sci-Fi', year: 2020 },
          { _id: 'b', title: 'Movie 2', genre: 'Sci-Fi', year: 2020 },
          { _id: 'c', title: 'Movie 3', genre: 'Sci-Fi', year: 2020 },
        ];

        const expected = [
          { _id: 'x', title: 'Other 1', genre: 'Sci-Fi', year: 2020 },
          { _id: 'y', title: 'Other 2', genre: 'Sci-Fi', year: 2020 },
          { _id: 'z', title: 'Other 3', genre: 'Sci-Fi', year: 2020 },
        ];

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({
              count: 3,
              requiredFields: ['_id', 'title', 'genre', 'year'],
              fieldValues: { genre: 'Sci-Fi', year: 2020 },
            });
        }).not.toThrow();
      });
    });
  });
});
