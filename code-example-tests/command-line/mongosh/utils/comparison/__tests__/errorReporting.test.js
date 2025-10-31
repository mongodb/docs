const {
  ComparisonError,
  ComparisonResult,
  PathTracker,
  ErrorMessageBuilder,
} = require('../errorReporting');

describe('errorReporting', () => {
  describe('ComparisonError', () => {
    test('should create error with all properties', () => {
      const error = new ComparisonError('user.name', 'Alice', 'Bob', 'Value mismatch');
      
      expect(error.keyPath).toBe('user.name');
      expect(error.expected).toBe('Alice');
      expect(error.actual).toBe('Bob');
      expect(error.message).toBe('Value mismatch');
    });

    test('should format error as string with path', () => {
      const error = new ComparisonError('user.age', 30, 25, 'Value mismatch');
      const str = error.toString();
      
      expect(str).toContain('Comparison failed at user.age');
      expect(str).toContain('Value mismatch');
      expect(str).toContain('Expected: 30');
      expect(str).toContain('Actual: 25');
    });

    test('should use "root" when keyPath is empty', () => {
      const error = new ComparisonError('', { a: 1 }, { b: 2 }, 'Object mismatch');
      const str = error.toString();
      
      expect(str).toContain('Comparison failed at root');
    });

    test('should use "root" when keyPath is null', () => {
      const error = new ComparisonError(null, { a: 1 }, { b: 2 }, 'Object mismatch');
      const str = error.toString();
      
      expect(str).toContain('Comparison failed at root');
    });

    test('should format objects as JSON', () => {
      const error = new ComparisonError('data', { name: 'Alice' }, { name: 'Bob' }, 'Mismatch');
      const str = error.toString();
      
      expect(str).toContain('"name": "Alice"');
      expect(str).toContain('"name": "Bob"');
    });

    test('should format arrays as JSON', () => {
      const error = new ComparisonError('items', [1, 2, 3], [4, 5, 6], 'Array mismatch');
      const str = error.toString();
      
      expect(str).toContain('[');
      expect(str).toContain('1');
      expect(str).toContain('4');
    });

    test('should handle null values', () => {
      const error = new ComparisonError('value', null, 'something', 'Null mismatch');
      const str = error.toString();
      
      expect(str).toContain('Expected: null');
      expect(str).toContain('Actual: "something"');
    });

    test('should handle undefined values', () => {
      const error = new ComparisonError('value', undefined, 'something', 'Undefined mismatch');
      const str = error.toString();
      
      expect(str).toContain('Expected: undefined');
      expect(str).toContain('Actual: "something"');
    });

    test('should truncate very long values', () => {
      const longValue = 'x'.repeat(300);
      const error = new ComparisonError('data', longValue, 'short', 'Length mismatch');
      const str = error.toString();
      
      expect(str).toContain('...');
      expect(str.length).toBeLessThan(500); // Should be truncated
    });

    test('should handle circular references gracefully', () => {
      const circular = { a: 1 };
      circular.self = circular;
      
      const error = new ComparisonError('data', circular, { b: 2 }, 'Circular ref');
      const str = error.toString();
      
      // Should not throw, should convert to string
      expect(str).toContain('Comparison failed');
    });
  });

  describe('ComparisonResult', () => {
    describe('success', () => {
      test('should create successful result', () => {
        const result = ComparisonResult.success();
        
        expect(result.isMatch).toBe(true);
        expect(result.errors).toEqual([]);
      });

      test('should return success message', () => {
        const result = ComparisonResult.success();
        const summary = result.getErrorSummary();
        
        expect(summary).toBe('Comparison succeeded');
      });
    });

    describe('failure', () => {
      test('should create failed result with error', () => {
        const result = ComparisonResult.failure('user.name', 'Alice', 'Bob', 'Value mismatch');
        
        expect(result.isMatch).toBe(false);
        expect(result.errors).toHaveLength(1);
        expect(result.errors[0]).toBeInstanceOf(ComparisonError);
      });

      test('should return formatted error for single error', () => {
        const result = ComparisonResult.failure('user.age', 30, 25, 'Value mismatch');
        const summary = result.getErrorSummary();
        
        expect(summary).toContain('Comparison failed at user.age');
        expect(summary).toContain('Value mismatch');
      });

      test('should handle multiple errors', () => {
        const result = new ComparisonResult(false, [
          new ComparisonError('user.name', 'Alice', 'Bob', 'Name mismatch'),
          new ComparisonError('user.age', 30, 25, 'Age mismatch'),
        ]);
        const summary = result.getErrorSummary();
        
        expect(summary).toContain('Comparison failed with 2 errors');
        expect(summary).toContain('1. Comparison failed at user.name');
        expect(summary).toContain('2. Comparison failed at user.age');
      });

      test('should handle failure with no errors', () => {
        const result = new ComparisonResult(false, []);
        const summary = result.getErrorSummary();
        
        expect(summary).toBe('Comparison failed (no details available)');
      });
    });
  });

  describe('PathTracker', () => {
    test('should create tracker with empty path', () => {
      const tracker = new PathTracker();
      
      expect(tracker.toString()).toBe('root');
    });

    test('should create tracker with base path', () => {
      const tracker = new PathTracker('user');
      
      expect(tracker.toString()).toBe('user');
    });

    test('should extend with property name', () => {
      const tracker = new PathTracker('user');
      const extended = tracker.extend('name');
      
      expect(extended.toString()).toBe('user.name');
    });

    test('should extend with array index', () => {
      const tracker = new PathTracker('users');
      const extended = tracker.extend(0);
      
      expect(extended.toString()).toBe('users[0]');
    });

    test('should extend from empty path with property', () => {
      const tracker = new PathTracker();
      const extended = tracker.extend('name');
      
      expect(extended.toString()).toBe('name');
    });

    test('should extend from empty path with index', () => {
      const tracker = new PathTracker();
      const extended = tracker.extend(0);

      expect(extended.toString()).toBe('0');
    });

    test('should chain multiple extensions', () => {
      const tracker = new PathTracker();
      const extended = tracker
        .extend('users')
        .extend(0)
        .extend('address')
        .extend('city');
      
      expect(extended.toString()).toBe('users[0].address.city');
    });

    test('should not mutate original tracker', () => {
      const tracker = new PathTracker('user');
      const extended = tracker.extend('name');
      
      expect(tracker.toString()).toBe('user');
      expect(extended.toString()).toBe('user.name');
    });
  });

  describe('ErrorMessageBuilder', () => {
    describe('typeMismatch', () => {
      test('should create message for object vs string', () => {
        const msg = ErrorMessageBuilder.typeMismatch({ a: 1 }, 'string');
        
        expect(msg).toBe('Type mismatch: expected object but got string');
      });

      test('should create message for array vs object', () => {
        const msg = ErrorMessageBuilder.typeMismatch([1, 2], { a: 1 });
        
        expect(msg).toBe('Type mismatch: expected array but got object');
      });

      test('should create message for number vs string', () => {
        const msg = ErrorMessageBuilder.typeMismatch(42, 'forty-two');
        
        expect(msg).toBe('Type mismatch: expected number but got string');
      });
    });

    describe('lengthMismatch', () => {
      test('should create message for array length mismatch', () => {
        const msg = ErrorMessageBuilder.lengthMismatch(3, 2);
        
        expect(msg).toBe('Array length mismatch: expected 3 elements but got 2');
      });

      test('should handle zero length', () => {
        const msg = ErrorMessageBuilder.lengthMismatch(0, 5);
        
        expect(msg).toBe('Array length mismatch: expected 0 elements but got 5');
      });
    });

    describe('missingKey', () => {
      test('should create message for missing key', () => {
        const msg = ErrorMessageBuilder.missingKey('username');
        
        expect(msg).toBe('Missing expected key: "username"');
      });
    });

    describe('extraKeys', () => {
      test('should create message for single extra key', () => {
        const msg = ErrorMessageBuilder.extraKeys(['extra']);
        
        expect(msg).toBe('Unexpected extra keys: "extra"');
      });

      test('should create message for multiple extra keys', () => {
        const msg = ErrorMessageBuilder.extraKeys(['extra1', 'extra2', 'extra3']);
        
        expect(msg).toBe('Unexpected extra keys: "extra1", "extra2", "extra3"');
      });
    });

    describe('valueMismatch', () => {
      test('should create generic value mismatch message', () => {
        const msg = ErrorMessageBuilder.valueMismatch('expected', 'actual');
        
        expect(msg).toBe('Value mismatch');
      });
    });

    describe('fileParseError', () => {
      test('should create message for file parse error', () => {
        const error = new Error('Unexpected token }');
        const msg = ErrorMessageBuilder.fileParseError('output.sh', error);
        
        expect(msg).toContain('Failed to parse expected output file "output.sh"');
        expect(msg).toContain('Unexpected token }');
      });
    });

    describe('patternMismatch', () => {
      test('should create message for pattern mismatch', () => {
        const msg = ErrorMessageBuilder.patternMismatch('user.*');
        
        expect(msg).toBe('Pattern "user.*" did not match');
      });
    });
  });
});

