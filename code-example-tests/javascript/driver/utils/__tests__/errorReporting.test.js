const {
  ComparisonError,
  ComparisonResult,
  PathTracker,
  ErrorMessageBuilder,
} = require('../comparison/errorReporting');

describe('Error Reporting for Technical Writers', () => {
  describe('ComparisonError', () => {
    it('should provide human-readable error messages', () => {
      const error = new ComparisonError(
        'results[0].name',
        'John',
        'Jane',
        'Value mismatch'
      );

      const message = error.toString();

      expect(message).toContain('results[0].name');
      expect(message).toContain('John');
      expect(message).toContain('Jane');
      expect(message).toContain('Value mismatch');
    });

    it('should show root path for top-level failures', () => {
      const error = new ComparisonError(
        '',
        { a: 1 },
        { a: 2 },
        'Values do not match'
      );

      const message = error.toString();

      expect(message).toContain('root');
      expect(message).toContain('Expected:');
      expect(message).toContain('Actual:');
    });

    it('should format objects in error messages', () => {
      const expected = { _id: 'abc', name: 'John', age: 30 };
      const actual = { _id: 'xyz', name: 'Jane', age: 25 };
      const error = new ComparisonError('user', expected, actual, 'User data mismatch');

      const message = error.toString();

      expect(message).toContain('"name": "John"');
      expect(message).toContain('"name": "Jane"');
    });

    it('should truncate very long values for readability', () => {
      const longString = 'x'.repeat(300);
      const error = new ComparisonError('field', longString, 'short', 'Length mismatch');

      const message = error.toString();

      // Should be truncated
      expect(message.length).toBeLessThan(500);
      expect(message).toContain('...');
    });

    it('should handle null and undefined values', () => {
      const error1 = new ComparisonError('field', null, undefined, 'Null vs undefined');
      const error2 = new ComparisonError('field', undefined, null, 'Undefined vs null');

      expect(error1.toString()).toContain('null');
      expect(error1.toString()).toContain('undefined');
      expect(error2.toString()).toContain('undefined');
      expect(error2.toString()).toContain('null');
    });

    it('should handle arrays in error messages', () => {
      const expected = [1, 2, 3];
      const actual = [1, 2, 4];
      const error = new ComparisonError('results', expected, actual, 'Array mismatch');

      const message = error.toString();

      // Arrays should be formatted for readability
      expect(message).toContain('1');
      expect(message).toContain('2');
      expect(message).toContain('3');
      expect(message).toContain('4');
      expect(message).toContain('results');
    });
  });

  describe('ComparisonResult', () => {
    it('should create successful results', () => {
      const result = ComparisonResult.success();

      expect(result.isMatch).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.getErrorSummary()).toContain('succeeded');
    });

    it('should create failure results with detailed information', () => {
      const result = ComparisonResult.failure(
        'movies[0].title',
        'The Godfather',
        'The Godfathe',
        'Value mismatch'
      );

      expect(result.isMatch).toBe(false);
      expect(result.errors).toHaveLength(1);

      const summary = result.getErrorSummary();
      expect(summary).toContain('movies[0].title');
      expect(summary).toContain('The Godfather');
      expect(summary).toContain('The Godfathe');
    });

    it('should handle multiple errors', () => {
      const result = new ComparisonResult(false, [
        new ComparisonError('field1', 'a', 'b', 'Mismatch 1'),
        new ComparisonError('field2', 'c', 'd', 'Mismatch 2'),
        new ComparisonError('field3', 'e', 'f', 'Mismatch 3'),
      ]);

      const summary = result.getErrorSummary();

      expect(summary).toContain('3 errors');
      expect(summary).toContain('field1');
      expect(summary).toContain('field2');
      expect(summary).toContain('field3');
    });

    it('should provide clear summary for single error', () => {
      const result = ComparisonResult.failure(
        'year',
        1994,
        1993,
        'Year does not match'
      );

      const summary = result.getErrorSummary();

      expect(summary).not.toContain('errors:'); // Should not say "1 errors"
      expect(summary).toContain('year');
      expect(summary).toContain('1994');
      expect(summary).toContain('1993');
    });

    it('should handle failure with no error details', () => {
      const result = new ComparisonResult(false, []);

      const summary = result.getErrorSummary();

      expect(summary).toContain('failed');
      expect(summary).toContain('no details available');
    });
  });

  describe('PathTracker', () => {
    it('should track nested property paths', () => {
      const tracker = new PathTracker('user');
      const nested = tracker.extend('profile').extend('name');

      expect(nested.toString()).toBe('user.profile.name');
    });

    it('should track array indices', () => {
      const tracker = new PathTracker('movies');
      const indexed = tracker.extend(0).extend('title');

      expect(indexed.toString()).toBe('movies[0].title');
    });

    it('should handle root path', () => {
      const tracker = new PathTracker();

      expect(tracker.toString()).toBe('root');
    });

    it('should handle empty string path as root', () => {
      const tracker = new PathTracker('');

      expect(tracker.toString()).toBe('root');
    });

    it('should build complex nested paths', () => {
      const tracker = new PathTracker('results');
      const path = tracker
        .extend(0)
        .extend('nested')
        .extend('array')
        .extend(2)
        .extend('value');

      expect(path.toString()).toBe('results[0].nested.array[2].value');
    });

    it('should handle property names with special characters', () => {
      const tracker = new PathTracker('data');
      const nested = tracker.extend('field-name').extend('sub_field');

      expect(nested.toString()).toBe('data.field-name.sub_field');
    });
  });

  describe('ErrorMessageBuilder', () => {
    describe('typeMismatch', () => {
      it('should report array vs object mismatch', () => {
        const message = ErrorMessageBuilder.typeMismatch([1, 2], { a: 1 });

        expect(message).toContain('Type mismatch');
        expect(message).toContain('array');
        expect(message).toContain('object');
      });

      it('should report string vs number mismatch', () => {
        const message = ErrorMessageBuilder.typeMismatch('123', 123);

        expect(message).toContain('string');
        expect(message).toContain('number');
      });

      it('should handle null types', () => {
        const message = ErrorMessageBuilder.typeMismatch(null, {});

        expect(message).toContain('Type mismatch');
      });
    });

    describe('lengthMismatch', () => {
      it('should report array length differences clearly', () => {
        const message = ErrorMessageBuilder.lengthMismatch(3, 5);

        expect(message).toContain('Array length mismatch');
        expect(message).toContain('3');
        expect(message).toContain('5');
      });

      it('should use correct singular/plural', () => {
        const message1 = ErrorMessageBuilder.lengthMismatch(1, 2);
        const message2 = ErrorMessageBuilder.lengthMismatch(2, 1);

        expect(message1).toContain('1');
        expect(message1).toContain('elements');
        expect(message2).toContain('2');
      });
    });

    describe('missingKey', () => {
      it('should clearly indicate missing keys', () => {
        const message = ErrorMessageBuilder.missingKey('title');

        expect(message).toContain('Missing');
        expect(message).toContain('title');
      });

      it('should handle keys with special characters', () => {
        const message = ErrorMessageBuilder.missingKey('_id');

        expect(message).toContain('_id');
      });
    });

    describe('extraKeys', () => {
      it('should list unexpected extra keys', () => {
        const message = ErrorMessageBuilder.extraKeys(['extra1', 'extra2']);

        expect(message).toContain('Unexpected');
        expect(message).toContain('extra1');
        expect(message).toContain('extra2');
      });

      it('should handle single extra key', () => {
        const message = ErrorMessageBuilder.extraKeys(['timestamp']);

        expect(message).toContain('timestamp');
      });
    });

    describe('valueMismatch', () => {
      it('should create generic value mismatch message', () => {
        const message = ErrorMessageBuilder.valueMismatch('expected', 'actual');

        expect(message).toContain('Value mismatch');
      });
    });

    describe('fileParseError', () => {
      it('should provide helpful file parsing error messages', () => {
        const error = new Error('Unexpected token');
        const message = ErrorMessageBuilder.fileParseError('movies/expected.txt', error);

        expect(message).toContain('Failed to parse');
        expect(message).toContain('movies/expected.txt');
        expect(message).toContain('Unexpected token');
      });

      it('should help writers identify syntax errors', () => {
        const error = new Error('Invalid JSON syntax');
        const message = ErrorMessageBuilder.fileParseError('results.txt', error);

        expect(message).toContain('results.txt');
        expect(message).toContain('Invalid JSON syntax');
      });
    });

    describe('patternMismatch', () => {
      it('should indicate pattern matching failures', () => {
        const message = ErrorMessageBuilder.patternMismatch('Hello...');

        expect(message).toContain('Pattern');
        expect(message).toContain('Hello...');
        expect(message).toContain('did not match');
      });
    });
  });

  describe('Real-world error scenarios for technical writers', () => {
    it('should help debug field name typos', () => {
      const result = ComparisonResult.failure(
        'movies[0]',
        { title: 'Casablanca' },
        { titel: 'Casablanca' },
        ErrorMessageBuilder.missingKey('title')
      );

      const summary = result.getErrorSummary();

      // Should clearly show the missing key
      expect(summary).toContain('Missing');
      expect(summary).toContain('title');
      // Should show the path where the error occurred
      expect(summary).toContain('movies[0]');
    });

    it('should help debug wrong array length', () => {
      const result = ComparisonResult.failure(
        'results',
        [1, 2, 3],
        [1, 2],
        ErrorMessageBuilder.lengthMismatch(3, 2)
      );

      const summary = result.getErrorSummary();

      expect(summary).toContain('Array length mismatch');
      expect(summary).toContain('3');
      expect(summary).toContain('2');
    });

    it('should help debug type confusion', () => {
      const result = ComparisonResult.failure(
        'year',
        '1994',
        1994,
        ErrorMessageBuilder.typeMismatch('1994', 1994)
      );

      const summary = result.getErrorSummary();

      expect(summary).toContain('Type mismatch');
      expect(summary).toContain('string');
      expect(summary).toContain('number');
    });

    it('should help debug file parsing errors', () => {
      const parseError = new Error('Unexpected identifier at line 5');
      const result = ComparisonResult.failure(
        'root',
        'movies/expected.txt',
        [],
        ErrorMessageBuilder.fileParseError('movies/expected.txt', parseError)
      );

      const summary = result.getErrorSummary();

      expect(summary).toContain('Failed to parse');
      expect(summary).toContain('movies/expected.txt');
      expect(summary).toContain('line 5');
    });

    it('should help debug value mismatches with clear before/after', () => {
      const result = ComparisonResult.failure(
        'movies[2].rating',
        8.5,
        8.6,
        'Value mismatch'
      );

      const summary = result.getErrorSummary();

      // Should show exact path
      expect(summary).toContain('movies[2].rating');
      // Should show both values
      expect(summary).toContain('8.5');
      expect(summary).toContain('8.6');
    });

    it('should help debug extra fields in actual output', () => {
      const result = ComparisonResult.failure(
        'movie',
        { title: 'Casablanca' },
        { title: 'Casablanca', extraField: 'unexpected' },
        ErrorMessageBuilder.extraKeys(['extraField'])
      );

      const summary = result.getErrorSummary();

      expect(summary).toContain('Unexpected');
      expect(summary).toContain('extraField');
    });

    it('should provide actionable error for MongoDB ObjectId comparison', () => {
      const result = ComparisonResult.failure(
        '_id',
        '507f1f77bcf86cd799439011',
        'abc123',
        'Value mismatch'
      );

      const summary = result.getErrorSummary();

      // Should clearly show both values so writer can see the format difference
      expect(summary).toContain('507f1f77bcf86cd799439011');
      expect(summary).toContain('abc123');
      expect(summary).toContain('_id');
    });

    it('should handle nested object comparison failures', () => {
      const expected = { user: { name: 'John', email: 'john@example.com' } };
      const actual = { user: { name: 'John', email: 'jon@example.com' } };

      const result = ComparisonResult.failure(
        'user.email',
        'john@example.com',
        'jon@example.com',
        'Value mismatch'
      );

      const summary = result.getErrorSummary();

      // Should show nested path
      expect(summary).toContain('user.email');
      // Should show the subtle difference
      expect(summary).toContain('john@');
      expect(summary).toContain('jon@');
    });

    it('should help debug array element order issues', () => {
      const expected = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const actual = [{ id: 1 }, { id: 3 }, { id: 2 }];

      const result = ComparisonResult.failure(
        'results[1].id',
        2,
        3,
        'Value mismatch - consider using withUnorderedSort()'
      );

      const summary = result.getErrorSummary();

      // Should suggest using unordered comparison
      expect(summary).toContain('results[1].id');
      expect(summary).toMatch(/2/);
      expect(summary).toMatch(/3/);
    });
  });

  describe('Error message readability for non-developers', () => {
    it('should avoid technical jargon', () => {
      const result = ComparisonResult.failure(
        'title',
        'Expected Title',
        'Actual Title',
        'Value mismatch'
      );

      const summary = result.getErrorSummary();

      // Should use clear language
      expect(summary).not.toContain('AssertionError');
      expect(summary).not.toContain('TypeError');
      expect(summary).not.toContain('undefined is not a function');
    });

    it('should provide context about what failed', () => {
      const result = ComparisonResult.failure(
        'movies[0].year',
        1994,
        1993,
        'Value mismatch'
      );

      const summary = result.getErrorSummary();

      // Should include:
      // 1. What failed (the comparison)
      expect(summary).toContain('Comparison failed');
      // 2. Where it failed (the path)
      expect(summary).toContain('movies[0].year');
      // 3. What was expected
      expect(summary).toContain('Expected:');
      expect(summary).toContain('1994');
      // 4. What was actual
      expect(summary).toContain('Actual:');
      expect(summary).toContain('1993');
    });

    it('should format JSON readably', () => {
      const expected = { title: 'Test', year: 2020, rating: 8.5 };
      const actual = { title: 'Test', year: 2020, rating: 8.6 };

      const result = ComparisonResult.failure('movie', expected, actual, 'Value mismatch');
      const summary = result.getErrorSummary();

      // Should be formatted JSON, not [object Object]
      expect(summary).not.toContain('[object Object]');
      expect(summary).toContain('"title"');
      expect(summary).toContain('"rating"');
    });
  });
});

