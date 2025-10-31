const { MongoshComparisonEngine } = require('../MongoshComparisonEngine');

describe('Comparison Error Messages for Technical Writers', () => {
  describe('Unordered Array Comparison', () => {
    it('should provide detailed analysis when elements dont match', () => {
      const expected = [
        { name: 'Alice', age: 30 },
        { name: 'Bob', age: 25 },
        { name: 'Charlie', age: 35 }
      ];

      const actual = [
        { name: 'Alice', age: 30 },
        { name: 'Bob', age: 26 },  // age differs
        { name: 'Charlie', age: 35 }
      ];

      const result = MongoshComparisonEngine.compare(expected, actual);

      expect(result.isMatch).toBe(false);
      const errorMessage = result.getErrorSummary();
      
      // Should show which elements matched
      expect(errorMessage).toContain('✓ matches actual[0]');
      expect(errorMessage).toContain('✓ matches actual[2]');
      
      // Should show which element didn't match and why
      expect(errorMessage).toContain('❌ closest to actual[1]');
      expect(errorMessage).toContain('1 mismatch');
      expect(errorMessage).toContain('age');
    });

    it('should show perfect matches and mismatches clearly', () => {
      const expected = [
        { id: 1, status: 'active' },
        { id: 2, status: 'inactive' },
        { id: 3, status: 'pending' }
      ];

      const actual = [
        { id: 3, status: 'pending' },   // matches expected[2]
        { id: 1, status: 'active' },    // matches expected[0]
        { id: 2, status: 'active' }     // close to expected[1] but status differs
      ];

      const result = MongoshComparisonEngine.compare(expected, actual);

      expect(result.isMatch).toBe(false);
      const errorMessage = result.getErrorSummary();
      
      // Should indicate 2 of 3 matched
      expect(errorMessage).toContain("1 of 3 elements don't match");
      
      // Should show the matches
      expect(errorMessage).toContain('✓');
      
      // Should show the mismatch with details
      expect(errorMessage).toContain('❌');
      expect(errorMessage).toContain('status');
    });

    it('should handle completely mismatched arrays', () => {
      const expected = [
        { type: 'user', name: 'Alice' },
        { type: 'user', name: 'Bob' }
      ];

      const actual = [
        { type: 'admin', name: 'Charlie' },
        { type: 'admin', name: 'David' }
      ];

      const result = MongoshComparisonEngine.compare(expected, actual);

      expect(result.isMatch).toBe(false);
      const errorMessage = result.getErrorSummary();
      
      // Should indicate no matches found
      expect(errorMessage).toContain('No matching arrangement found');
      
      // Should show closest matches with differences
      expect(errorMessage).toContain('❌ closest to actual');
      expect(errorMessage).toContain('type');
      expect(errorMessage).toContain('name');
    });

    it('should handle array length mismatches', () => {
      const expected = [
        { id: 1 },
        { id: 2 },
        { id: 3 }
      ];

      const actual = [
        { id: 1 },
        { id: 2 }
      ];

      const result = MongoshComparisonEngine.compare(expected, actual);

      expect(result.isMatch).toBe(false);
      const errorMessage = result.getErrorSummary();
      
      // Should clearly state length mismatch
      expect(errorMessage).toContain('Array length mismatch');
      expect(errorMessage).toContain('expected 3 elements');
      expect(errorMessage).toContain('got 2');
    });
  });

  describe('Object Comparison', () => {
    it('should identify missing fields', () => {
      const expected = {
        name: 'Alice',
        age: 30,
        email: 'alice@example.com'
      };

      const actual = {
        name: 'Alice',
        age: 30
      };

      const result = MongoshComparisonEngine.compare(expected, actual);

      expect(result.isMatch).toBe(false);
      const errorMessage = result.getErrorSummary();
      
      // Should explicitly state missing field
      expect(errorMessage).toContain("Missing expected field 'email'");
    });

    it('should identify extra fields', () => {
      const expected = {
        name: 'Alice',
        age: 30
      };

      const actual = {
        name: 'Alice',
        age: 30,
        timestamp: '2024-01-01'
      };

      const result = MongoshComparisonEngine.compare(expected, actual);

      expect(result.isMatch).toBe(false);
      const errorMessage = result.getErrorSummary();
      
      // Should explicitly state extra field
      expect(errorMessage).toContain("Unexpected extra field 'timestamp'");
    });

    it('should identify value mismatches', () => {
      const expected = {
        name: 'Alice',
        age: 30
      };

      const actual = {
        name: 'Alice',
        age: 25
      };

      const result = MongoshComparisonEngine.compare(expected, actual);

      expect(result.isMatch).toBe(false);
      const errorMessage = result.getErrorSummary();
      
      // Should show value mismatch
      expect(errorMessage).toContain('Value mismatch');
      expect(errorMessage).toContain('age');
      expect(errorMessage).toContain('30');
      expect(errorMessage).toContain('25');
    });

    it('should identify type mismatches', () => {
      const expected = {
        count: 5
      };

      const actual = {
        count: '5'
      };

      const result = MongoshComparisonEngine.compare(expected, actual);

      expect(result.isMatch).toBe(false);
      const errorMessage = result.getErrorSummary();
      
      // Should show type/value mismatch
      expect(errorMessage).toContain('mismatch');
      expect(errorMessage).toContain('count');
    });
  });

  describe('Nested Structure Comparison', () => {
    it('should provide path information for nested mismatches', () => {
      const expected = {
        user: {
          profile: {
            name: 'Alice',
            age: 30
          }
        }
      };

      const actual = {
        user: {
          profile: {
            name: 'Alice',
            age: 25
          }
        }
      };

      const result = MongoshComparisonEngine.compare(expected, actual);

      expect(result.isMatch).toBe(false);
      const errorMessage = result.getErrorSummary();
      
      // Should show the path to the mismatch
      expect(errorMessage).toContain('user.profile.age');
    });

    it('should handle arrays of objects with nested differences', () => {
      const expected = [
        {
          user: { name: 'Alice', settings: { theme: 'dark' } }
        }
      ];

      const actual = [
        {
          user: { name: 'Alice', settings: { theme: 'light' } }
        }
      ];

      const result = MongoshComparisonEngine.compare(expected, actual);

      expect(result.isMatch).toBe(false);
      const errorMessage = result.getErrorSummary();
      
      // Should show nested path
      expect(errorMessage).toContain('settings.theme');
    });
  });

  describe('Real-world Technical Writer Scenarios', () => {
    it('should help debug aggregation pipeline output mismatches', () => {
      const expected = [
        { _id: 'active', count: 10 },
        { _id: 'inactive', count: 5 },
        { _id: 'pending', count: 3 }
      ];

      const actual = [
        { _id: 'pending', count: 3 },
        { _id: 'active', count: 10 },
        { _id: 'inactive', count: 6 }  // count is wrong
      ];

      const result = MongoshComparisonEngine.compare(expected, actual);

      expect(result.isMatch).toBe(false);
      const errorMessage = result.getErrorSummary();

      // Should show which groups matched and which didn't
      expect(errorMessage).toContain('✓');  // for matches
      expect(errorMessage).toContain('❌'); // for mismatch
      expect(errorMessage).toContain('count');
      expect(errorMessage).toContain('1 mismatch');
    });

    it('should help debug find query output with missing fields', () => {
      const expected = [
        { name: 'Alice', email: 'alice@example.com', age: 30 }
      ];

      const actual = [
        { name: 'Alice', age: 30 }  // forgot to project email
      ];

      const result = MongoshComparisonEngine.compare(expected, actual);

      expect(result.isMatch).toBe(false);
      const errorMessage = result.getErrorSummary();

      // Should clearly state the missing field
      expect(errorMessage).toContain("Missing expected field 'email'");
    });
  });

  describe('Helpful Tips in Error Messages', () => {
    it('should include tips for missing fields', () => {
      const expected = { name: 'Alice', email: 'alice@example.com' };
      const actual = { name: 'Alice' };

      const result = MongoshComparisonEngine.compare(expected, actual);
      const errorMessage = result.getErrorSummary();

      expect(errorMessage).toContain('💡 Tip');
      expect(errorMessage).toContain("includes the 'email' field");
    });

    it('should include tips for extra fields', () => {
      const expected = { name: 'Alice' };
      const actual = { name: 'Alice', timestamp: '2024-01-01' };

      const result = MongoshComparisonEngine.compare(expected, actual);
      const errorMessage = result.getErrorSummary();

      expect(errorMessage).toContain('💡 Tip');
      expect(errorMessage).toContain('ignoreFields');
    });

    it('should include tips for value mismatches', () => {
      const expected = { age: 30 };
      const actual = { age: 25 };

      const result = MongoshComparisonEngine.compare(expected, actual);
      const errorMessage = result.getErrorSummary();

      expect(errorMessage).toContain('💡 Tip');
      expect(errorMessage).toContain('test database');
    });

    it('should include tips for type mismatches', () => {
      const expected = { count: 5 };
      const actual = { count: '5' };

      const result = MongoshComparisonEngine.compare(expected, actual);
      const errorMessage = result.getErrorSummary();

      expect(errorMessage).toContain('💡 Tip');
      expect(errorMessage).toContain('convert');
    });

    it('should include tips for array length mismatches', () => {
      const expected = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const actual = [{ id: 1 }, { id: 2 }];

      const result = MongoshComparisonEngine.compare(expected, actual);
      const errorMessage = result.getErrorSummary();

      expect(errorMessage).toContain('💡 Tip');
      expect(errorMessage).toContain('expected items');
    });

    it('should include tips for unordered array mismatches', () => {
      const expected = [{ id: 1 }, { id: 2 }];
      const actual = [{ id: 1 }, { id: 3 }];

      const result = MongoshComparisonEngine.compare(expected, actual);
      const errorMessage = result.getErrorSummary();

      expect(errorMessage).toContain('💡 Tip');
    });
  });
});

