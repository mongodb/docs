const Expect = require('../Expect');

describe('Expect API', () => {
  describe('basic comparison', () => {
    test('should match identical single objects', () => {
      const actual = `{ name: 'Carl', vocation: 'ENGINEER' }`;
      const expected = [{ name: 'Carl', vocation: 'ENGINEER' }];

      expect(() => {
        Expect.that(actual).shouldMatch(expected);
      }).not.toThrow();
    });

    test('should match multiple objects', () => {
      const actual = `{ name: 'Carl' }
{ name: 'Olive' }`;
      const expected = [
        { name: 'Carl' },
        { name: 'Olive' }
      ];

      expect(() => {
        Expect.that(actual).shouldMatch(expected);
      }).not.toThrow();
    });

    test('should throw on mismatch', () => {
      const actual = `{ name: 'Carl' }`;
      const expected = [{ name: 'Olive' }];

      expect(() => {
        Expect.that(actual).shouldMatch(expected);
      }).toThrow();
    });
  });

  describe('ellipsis patterns', () => {
    test('should match with property-level ellipsis', () => {
      const actual = `{ _id: '507f1f77bcf86cd799439011', name: 'Carl' }`;
      const expected = [{ _id: '...', name: 'Carl' }];

      expect(() => {
        Expect.that(actual).shouldMatch(expected);
      }).not.toThrow();
    });

    test('should match with object-level ellipsis', () => {
      const actual = `{ name: 'Carl', age: 30, city: 'NYC' }`;
      const expected = [{ name: 'Carl', '...': '...' }];

      expect(() => {
        Expect.that(actual).shouldMatch(expected);
      }).not.toThrow();
    });
  });

  describe('ignored fields', () => {
    test('should ignore specified fields', () => {
      const actual = `{ _id: '507f1f77bcf86cd799439011', name: 'Carl' }`;
      const expected = [{ _id: 'different-id', name: 'Carl' }];

      expect(() => {
        Expect.that(actual)
          .withIgnoredFields('_id')
          .shouldMatch(expected);
      }).not.toThrow();
    });
  });

  describe('array comparison modes', () => {
    test('should use unordered comparison by default', () => {
      const actual = `{ name: 'Carl' }
{ name: 'Olive' }`;
      const expected = [
        { name: 'Olive' },
        { name: 'Carl' }
      ];

      expect(() => {
        Expect.that(actual).shouldMatch(expected);
      }).not.toThrow();
    });

    test('should enforce order with withOrderedSort', () => {
      const actual = `{ name: 'Carl' }
{ name: 'Olive' }`;
      const expected = [
        { name: 'Olive' },
        { name: 'Carl' }
      ];

      expect(() => {
        Expect.that(actual)
          .withOrderedSort()
          .shouldMatch(expected);
      }).toThrow();
    });

    test('should match ordered arrays correctly', () => {
      const actual = `{ name: 'Carl' }
{ name: 'Olive' }`;
      const expected = [
        { name: 'Carl' },
        { name: 'Olive' }
      ];

      expect(() => {
        Expect.that(actual)
          .withOrderedSort()
          .shouldMatch(expected);
      }).not.toThrow();
    });
  });

  describe('MongoDB types', () => {
    test('should handle ISODate', () => {
      const actual = `{ date: ISODate("2023-01-01T00:00:00.000Z") }`;
      const expected = [{ date: new Date("2023-01-01T00:00:00.000Z") }];

      expect(() => {
        Expect.that(actual).shouldMatch(expected);
      }).not.toThrow();
    });

    test('should handle ObjectId', () => {
      const actual = `{ _id: ObjectId("507f1f77bcf86cd799439011") }`;
      // Use ellipsis for ObjectId comparison
      const expected = [{ _id: '...' }];

      expect(() => {
        Expect.that(actual).shouldMatch(expected);
      }).not.toThrow();
    });
  });

  describe('method chaining', () => {
    test('should chain multiple options', () => {
      const actual = `{ _id: '123', name: 'Carl', age: 30 }
{ _id: '456', name: 'Olive', age: 25 }`;
      const expected = [
        { _id: 'ignored', name: 'Olive', '...': '...' },
        { _id: 'ignored', name: 'Carl', '...': '...' }
      ];

      expect(() => {
        Expect.that(actual)
          .withIgnoredFields('_id')
          .withUnorderedSort()
          .shouldMatch(expected);
      }).not.toThrow();
    });
  });

  describe('shouldResemble and withSchema', () => {
    describe('basic schema validation', () => {
      test('should validate matching document count', () => {
        const actual = `{ _id: '1', title: 'Movie 1', year: 2012 }
{ _id: '2', title: 'Movie 2', year: 2012 }
{ _id: '3', title: 'Movie 3', year: 2012 }`;
        const expected = [
          { _id: 'a', title: 'Different Movie', year: 2012 },
          { _id: 'b', title: 'Another Movie', year: 2012 },
          { _id: 'c', title: 'Yet Another', year: 2012 }
        ];

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({
              count: 3,
              requiredFields: ['_id', 'title', 'year'],
              fieldValues: { year: 2012 }
            });
        }).not.toThrow();
      });

      test('should fail when actual count does not match', () => {
        const actual = `{ _id: '1', title: 'Movie 1', year: 2012 }
{ _id: '2', title: 'Movie 2', year: 2012 }`;
        const expected = [
          { _id: 'a', title: 'Movie A', year: 2012 },
          { _id: 'b', title: 'Movie B', year: 2012 }
        ];

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({
              count: 3,
              requiredFields: ['_id', 'title']
            });
        }).toThrow(/Expected 3 documents but got 2/);
      });

      test('should fail when expected count does not match', () => {
        const actual = `{ _id: '1', title: 'Movie 1', year: 2012 }
{ _id: '2', title: 'Movie 2', year: 2012 }
{ _id: '3', title: 'Movie 3', year: 2012 }`;
        const expected = [
          { _id: 'a', title: 'Movie A', year: 2012 },
          { _id: 'b', title: 'Movie B', year: 2012 }
        ];

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({
              count: 3,
              requiredFields: ['_id', 'title']
            });
        }).toThrow(/expected output.*Expected 3 documents but got 2/);
      });
    });

    describe('required fields validation', () => {
      test('should pass when all required fields present', () => {
        const actual = `{ _id: '1', title: 'Movie', year: 2012, rating: 8.5 }`;
        const expected = [{ _id: 'a', title: 'Other Movie', year: 2012, rating: 9.0 }];

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({
              count: 1,
              requiredFields: ['_id', 'title', 'year']
            });
        }).not.toThrow();
      });

      test('should fail when required field missing in actual', () => {
        const actual = `{ _id: '1', title: 'Movie' }`;
        const expected = [{ _id: 'a', title: 'Other', year: 2012 }];

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({
              count: 1,
              requiredFields: ['_id', 'title', 'year']
            });
        }).toThrow(/actual output.*Missing required field "year"/);
      });

      test('should fail when required field missing in expected', () => {
        const actual = `{ _id: '1', title: 'Movie', year: 2012 }`;
        const expected = [{ _id: 'a', title: 'Other' }];

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({
              count: 1,
              requiredFields: ['_id', 'title', 'year']
            });
        }).toThrow(/expected output.*Missing required field "year"/);
      });
    });

    describe('field values validation', () => {
      test('should pass when all field values match', () => {
        const actual = `{ _id: '1', title: 'Movie 1', year: 2012, genre: 'Action' }
{ _id: '2', title: 'Movie 2', year: 2012, genre: 'Action' }`;
        const expected = [
          { _id: 'a', title: 'Other 1', year: 2012, genre: 'Action' },
          { _id: 'b', title: 'Other 2', year: 2012, genre: 'Action' }
        ];

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({
              count: 2,
              fieldValues: { year: 2012, genre: 'Action' }
            });
        }).not.toThrow();
      });

      test('should fail when field value does not match in actual', () => {
        const actual = `{ _id: '1', title: 'Movie', year: 2013 }`;
        const expected = [{ _id: 'a', title: 'Other', year: 2012 }];

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({
              count: 1,
              fieldValues: { year: 2012 }
            });
        }).toThrow(/actual output.*Field "year" has value 2013 but expected 2012/);
      });

      test('should fail when field for fieldValues is missing', () => {
        const actual = `{ _id: '1', title: 'Movie' }`;
        const expected = [{ _id: 'a', title: 'Other', year: 2012 }];

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({
              count: 1,
              fieldValues: { year: 2012 }
            });
        }).toThrow(/actual output.*Missing field "year"/);
      });
    });

    describe('API error handling', () => {
      test('should throw when withSchema called without shouldResemble', () => {
        const actual = `{ name: 'Test' }`;

        expect(() => {
          Expect.that(actual)
            .withSchema({ count: 1 });
        }).toThrow(/withSchema\(\) requires shouldResemble\(\) to be called first/);
      });

      test('should throw when shouldResemble called after shouldMatch', () => {
        const actual = `{ name: 'Test' }`;
        const expected = [{ name: 'Test' }];

        expect(() => {
          const e = Expect.that(actual);
          e.shouldMatch(expected);
          e.shouldResemble(expected);
        }).toThrow(/shouldResemble\(\) cannot be used with shouldMatch\(\)/);
      });

      test('should throw when shouldMatch called after shouldResemble', () => {
        const actual = `{ name: 'Test' }`;
        const expected = [{ name: 'Test' }];

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({ count: 1 }); // This executes first
        }).not.toThrow();

        // Calling shouldMatch on a new instance that already has shouldResemble
        expect(() => {
          const e = Expect.that(actual);
          e.shouldResemble(expected);
          e.shouldMatch(expected);
        }).toThrow(/shouldMatch\(\) cannot be used with shouldResemble\(\)/);
      });

      test('should throw when schema is missing count', () => {
        const actual = `{ name: 'Test' }`;
        const expected = [{ name: 'Test' }];

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({ requiredFields: ['name'] });
        }).toThrow(/requires a non-negative count number/);
      });

      test('should throw when schema has invalid count', () => {
        const actual = `{ name: 'Test' }`;
        const expected = [{ name: 'Test' }];

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({ count: -1 });
        }).toThrow(/requires a non-negative count number/);
      });

      test('should throw when requiredFields is not an array', () => {
        const actual = `{ name: 'Test' }`;
        const expected = [{ name: 'Test' }];

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({ count: 1, requiredFields: 'name' });
        }).toThrow(/requiredFields must be an array/);
      });

      test('should throw when fieldValues is not an object', () => {
        const actual = `{ name: 'Test' }`;
        const expected = [{ name: 'Test' }];

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({ count: 1, fieldValues: 'invalid' });
        }).toThrow(/fieldValues must be an object/);
      });
    });

    describe('single document auto-wrapping', () => {
      test('should auto-wrap single document expected into array', () => {
        const actual = `{ _id: '1', title: 'Movie A', year: 2012 }`;
        const expected = { _id: '2', title: 'Movie B', year: 2012 };

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({
              count: 1,
              requiredFields: ['_id', 'title', 'year'],
              fieldValues: { year: 2012 }
            });
        }).not.toThrow();
      });

      test('should auto-wrap single document actual into array', () => {
        const actual = { _id: '1', title: 'Movie A', year: 2012 };
        const expected = [{ _id: '2', title: 'Movie B', year: 2012 }];

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({
              count: 1,
              requiredFields: ['_id', 'title', 'year'],
              fieldValues: { year: 2012 }
            });
        }).not.toThrow();
      });

      test('should work with both actual and expected as single documents', () => {
        const actual = { _id: '1', title: 'Movie A', year: 2012 };
        const expected = { _id: '2', title: 'Movie B', year: 2012 };

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({
              count: 1,
              requiredFields: ['_id', 'title', 'year'],
              fieldValues: { year: 2012 }
            });
        }).not.toThrow();
      });

      test('should reject null expected', () => {
        const actual = `{ name: 'Test' }`;

        expect(() => {
          Expect.that(actual)
            .shouldResemble(null)
            .withSchema({ count: 1 });
        }).toThrow(/must be a file path, array, document, or mongosh output string/);
      });

      test('should reject primitive expected types', () => {
        const actual = `{ name: 'Test' }`;

        expect(() => {
          Expect.that(actual)
            .shouldResemble(42)
            .withSchema({ count: 1 });
        }).toThrow(/must be a file path, array, document, or mongosh output string/);
      });
    });

    describe('complex scenarios', () => {
      test('should validate with all schema options together', () => {
        const actual = `{ _id: '1', title: 'Inception', year: 2010, director: 'Nolan' }
{ _id: '2', title: 'Interstellar', year: 2010, director: 'Nolan' }
{ _id: '3', title: 'Dunkirk', year: 2010, director: 'Nolan' }`;
        const expected = [
          { _id: 'x', title: 'Movie A', year: 2010, director: 'Nolan' },
          { _id: 'y', title: 'Movie B', year: 2010, director: 'Nolan' },
          { _id: 'z', title: 'Movie C', year: 2010, director: 'Nolan' }
        ];

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({
              count: 3,
              requiredFields: ['_id', 'title', 'year', 'director'],
              fieldValues: { year: 2010, director: 'Nolan' }
            });
        }).not.toThrow();
      });

      test('should work with empty requiredFields and fieldValues', () => {
        const actual = `{ a: 1 }
{ b: 2 }`;
        const expected = [{ x: 10 }, { y: 20 }];

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({
              count: 2,
              requiredFields: [],
              fieldValues: {}
            });
        }).not.toThrow();
      });

      test('should work with only count specified', () => {
        const actual = `{ anything: 'goes' }
{ completely: 'different' }
{ third: 'document' }`;
        const expected = [{ x: 1 }, { y: 2 }, { z: 3 }];

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({ count: 3 });
        }).not.toThrow();
      });

      test('should handle nested field values', () => {
        const actual = `{ _id: '1', meta: { category: 'film', status: 'active' } }`;
        const expected = [{ _id: 'a', meta: { category: 'film', status: 'active' } }];

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({
              count: 1,
              requiredFields: ['_id', 'meta'],
              fieldValues: { meta: { category: 'film', status: 'active' } }
            });
        }).not.toThrow();
      });

      test('should fail with mismatched nested field values', () => {
        const actual = `{ _id: '1', meta: { category: 'book' } }`;
        const expected = [{ _id: 'a', meta: { category: 'film' } }];

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({
              count: 1,
              fieldValues: { meta: { category: 'film' } }
            });
        }).toThrow(/actual output.*Field "meta"/);
      });
    });

    describe('expected output formats', () => {
      test('should accept array as expected output', () => {
        const actual = `{ name: 'Test', value: 42 }`;
        const expected = [{ name: 'Different', value: 42 }];

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({
              count: 1,
              requiredFields: ['name', 'value'],
              fieldValues: { value: 42 }
            });
        }).not.toThrow();
      });

      test('should accept mongosh string as expected output', () => {
        const actual = `{ name: 'Test', value: 42 }`;
        const expected = `{ name: 'Different', value: 42 }`;

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({
              count: 1,
              requiredFields: ['name', 'value'],
              fieldValues: { value: 42 }
            });
        }).not.toThrow();
      });
    });

    describe('parsing and ellipsis handling', () => {
      test('should parse property-level ellipsis in expected output', () => {
        // Property-level ellipsis like _id: "..." should be parsed correctly
        // The ellipsis placeholder is a valid value, and _id is present as a field
        const actual = `{ _id: '507f1f77bcf86cd799439011', title: 'Movie', year: 2012 }`;
        const expected = `{ _id: '...', title: 'Another Movie', year: 2012 }`;

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({
              count: 1,
              requiredFields: ['_id', 'title', 'year'],
              fieldValues: { year: 2012 }
            });
        }).not.toThrow();
      });

      test('should parse object-level ellipsis in expected output', () => {
        // Object-level ellipsis like "...": "..." should be parsed correctly
        const actual = `{ name: 'Carl', age: 30, city: 'NYC' }`;
        const expected = `{ name: 'Different', '...': '...' }`;

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({
              count: 1,
              requiredFields: ['name']
            });
        }).not.toThrow();
      });

      test('should handle MongoDB types in expected output', () => {
        const actual = `{ _id: ObjectId("507f1f77bcf86cd799439011"), date: ISODate("2023-01-15T00:00:00.000Z") }`;
        const expected = `{ _id: ObjectId("607f1f77bcf86cd799439022"), date: ISODate("2023-01-15T00:00:00.000Z") }`;

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({
              count: 1,
              requiredFields: ['_id', 'date']
            });
        }).not.toThrow();
      });

      test('should detect file-like paths even when file does not exist', () => {
        // If the expected looks like a file path but doesn't exist, it should give a file error
        // not try to parse it as mongosh output
        const actual = `{ name: 'Test' }`;

        expect(() => {
          Expect.that(actual)
            .shouldResemble('non-existent-file.sh')
            .withSchema({ count: 1 });
        }).toThrow(/File not found|Failed to read/);
      });

      test('should parse multiple documents from mongosh string', () => {
        const actual = `{ name: 'Alice', role: 'admin' }
{ name: 'Bob', role: 'user' }
{ name: 'Carol', role: 'user' }`;
        const expected = `{ name: 'X', role: 'admin' }
{ name: 'Y', role: 'user' }
{ name: 'Z', role: 'user' }`;

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({
              count: 3,
              requiredFields: ['name', 'role']
            });
        }).not.toThrow();
      });

      test('should handle standalone ellipsis line in expected string', () => {
        // Standalone "..." on its own line in expected output is treated as ellipsis marker
        // which adds {"...": "..."} to all objects (allowing extra fields)
        const actual = `{ _id: '1', name: 'Test', extraField: 'value' }`;
        const expected = `{ _id: '2', name: 'Different' }
...`;

        expect(() => {
          Expect.that(actual)
            .shouldResemble(expected)
            .withSchema({
              count: 1,
              requiredFields: ['_id', 'name']
            });
        }).not.toThrow();
      });
    });

    describe('withIgnoredFields interaction', () => {
      test('should throw when withIgnoredFields called before shouldResemble', () => {
        // withIgnoredFields is not supported with shouldResemble
        // The schema-based comparison validates structure/count, not exact values
        const actual = `{ _id: '1', title: 'Movie' }`;
        const expected = [{ _id: 'a', title: 'Other' }];

        expect(() => {
          Expect.that(actual)
            .withIgnoredFields('_id')
            .shouldResemble(expected)
            .withSchema({
              count: 1,
              requiredFields: ['_id', 'title']
            });
        }).toThrow(/withIgnoredFields\(\) cannot be used with shouldResemble\(\)/);
      });

      test('should throw when withIgnoredFields called after shouldResemble', () => {
        // Order shouldn't matter - combination is not allowed
        const actual = `{ _id: '1', title: 'Movie' }`;
        const expected = [{ _id: 'a', title: 'Other' }];

        expect(() => {
          const e = Expect.that(actual).shouldResemble(expected);
          e.withIgnoredFields('_id');
        }).toThrow(/withIgnoredFields\(\) cannot be used with shouldResemble\(\)/);
      });

      test('should provide helpful error message explaining the restriction', () => {
        const actual = `{ _id: '1', title: 'Movie' }`;
        const expected = [{ _id: 'a', title: 'Other' }];

        expect(() => {
          Expect.that(actual)
            .withIgnoredFields('_id')
            .shouldResemble(expected);
        }).toThrow(/Use shouldMatch\(\) if you need to ignore specific field values/);
      });

      test('should allow withIgnoredFields with shouldMatch (not shouldResemble)', () => {
        // Verify withIgnoredFields still works correctly with shouldMatch
        const actual = `{ _id: '507f1f77bcf86cd799439011', name: 'Carl' }`;
        const expected = [{ _id: 'different-id', name: 'Carl' }];

        expect(() => {
          Expect.that(actual)
            .withIgnoredFields('_id')
            .shouldMatch(expected);
        }).not.toThrow();
      });
    });

    describe('sort order options interaction', () => {
      test('should throw when withOrderedSort called before shouldResemble', () => {
        const actual = `{ _id: '1', title: 'Movie' }`;
        const expected = [{ _id: 'a', title: 'Other' }];

        expect(() => {
          Expect.that(actual)
            .withOrderedSort()
            .shouldResemble(expected)
            .withSchema({ count: 1 });
        }).toThrow(/withOrderedSort\(\)\/withUnorderedSort\(\) cannot be used with shouldResemble\(\)/);
      });

      test('should throw when withUnorderedSort called before shouldResemble', () => {
        const actual = `{ _id: '1', title: 'Movie' }`;
        const expected = [{ _id: 'a', title: 'Other' }];

        expect(() => {
          Expect.that(actual)
            .withUnorderedSort()
            .shouldResemble(expected)
            .withSchema({ count: 1 });
        }).toThrow(/withOrderedSort\(\)\/withUnorderedSort\(\) cannot be used with shouldResemble\(\)/);
      });

      test('should throw when withOrderedSort called after shouldResemble', () => {
        const actual = `{ _id: '1', title: 'Movie' }`;
        const expected = [{ _id: 'a', title: 'Other' }];

        expect(() => {
          const e = Expect.that(actual).shouldResemble(expected);
          e.withOrderedSort();
        }).toThrow(/withOrderedSort\(\) cannot be used with shouldResemble\(\)/);
      });

      test('should throw when withUnorderedSort called after shouldResemble', () => {
        const actual = `{ _id: '1', title: 'Movie' }`;
        const expected = [{ _id: 'a', title: 'Other' }];

        expect(() => {
          const e = Expect.that(actual).shouldResemble(expected);
          e.withUnorderedSort();
        }).toThrow(/withUnorderedSort\(\) cannot be used with shouldResemble\(\)/);
      });

      test('should provide helpful error message explaining the restriction', () => {
        const actual = `{ _id: '1', title: 'Movie' }`;
        const expected = [{ _id: 'a', title: 'Other' }];

        expect(() => {
          Expect.that(actual)
            .withOrderedSort()
            .shouldResemble(expected);
        }).toThrow(/ordering is not applicable/);
      });

      test('should allow withOrderedSort with shouldMatch (not shouldResemble)', () => {
        const actual = `{ _id: '1', name: 'Carl' }
{ _id: '2', name: 'Dana' }`;
        const expected = [
          { _id: '1', name: 'Carl' },
          { _id: '2', name: 'Dana' }
        ];

        expect(() => {
          Expect.that(actual)
            .withOrderedSort()
            .shouldMatch(expected);
        }).not.toThrow();
      });
    });
  });
});


