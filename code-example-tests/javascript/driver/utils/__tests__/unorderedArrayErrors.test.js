/**
 * Tests to verify detailed error reporting in unordered array comparisons.
 * We provide element-by-element analysis with field-level error details.
 */

const Expect = require('../Expect');

describe('Unordered Array Error Messages', () => {
  describe('Detailed error reporting for single mismatches', () => {
    it('shows which element and field failed with detailed path', () => {
      const actual = [
        { id: 1, title: 'Casablanca', year: 1942 },
        { id: 2, title: 'The Godfather', year: 1972 },
        { id: 3, title: 'Pulp Fiction', year: 1995 },
      ];

      const expected = [
        { id: 1, title: 'Casablanca', year: 1942 },
        { id: 2, title: 'The Godfather', year: 1972 },
        { id: 3, title: 'Pulp Fiction', year: 1994 }, // Wrong year
      ];

      try {
        Expect.that(actual).shouldMatch(expected);
        fail('Should have thrown');
      } catch (error) {
        // Verify we get detailed error information:
        expect(error.message).toContain('Comparison failed');

        // ✅ Shows summary of what failed
        expect(error.message).toContain('1 of 3 elements don\'t match');

        // ✅ Shows which elements matched
        expect(error.message).toContain('matches actual[0] ✓');
        expect(error.message).toContain('matches actual[1] ✓');

        // ✅ Shows which element failed and what was closest
        expect(error.message).toContain('root[2]');
        expect(error.message).toContain('closest to actual[2]');
        expect(error.message).toContain('1 mismatch');

        // ✅ Shows the specific field that differed
        expect(error.message).toContain('root[2].year');
        expect(error.message).toContain('expected 1994, got 1995');
      }
    });

    it('shows clear error when element is completely missing', () => {
      const actual = [
        { id: 1, title: 'Casablanca', year: 1942 },
        { id: 2, title: 'The Godfather', year: 1972 },
      ];

      const expected = [
        { id: 1, title: 'Casablanca', year: 1942 },
        { id: 2, title: 'The Godfather', year: 1972 },
        { id: 3, title: 'Pulp Fiction', year: 1994 },
      ];

      try {
        Expect.that(actual).shouldMatch(expected);
        fail('Should have thrown');
      } catch (error) {
        console.log('\n=== Array Length Mismatch Error ===');
        console.log(error.message);
        console.log('=== End Error Message ===\n');

        // ✅ Clear array length mismatch message
        expect(error.message).toContain('Array length mismatch');
        expect(error.message).toContain('expected 3 elements, got 2');
      }
    });

    it('shows detailed analysis for multiple mismatches', () => {
      const actual = [
        { id: 1, title: 'Casablanca', year: 1942 },
        { id: 2, title: 'The Godfather', year: 1973 }, // Wrong year
        { id: 3, title: 'Pulp Fiction', year: 1995 },   // Wrong year
      ];

      const expected = [
        { id: 1, title: 'Casablanca', year: 1942 },
        { id: 2, title: 'The Godfather', year: 1972 },
        { id: 3, title: 'Pulp Fiction', year: 1994 },
      ];

      try {
        Expect.that(actual).shouldMatch(expected);
        fail('Should have thrown');
      } catch (error) {
        console.log('\n=== Multiple Mismatches Error ===');
        console.log(error.message);
        console.log('=== End Error Message ===\n');

        // ✅ Shows summary
        expect(error.message).toContain('2 of 3 elements don\'t match');

        // ✅ Shows which element matched
        expect(error.message).toContain('matches actual[0] ✓');

        // ✅ Shows both failed elements with details
        expect(error.message).toContain('root[1]');
        expect(error.message).toContain('closest to actual[1]');
        expect(error.message).toContain('root[1].year');
        expect(error.message).toContain('expected 1972, got 1973');

        expect(error.message).toContain('root[2]');
        expect(error.message).toContain('closest to actual[2]');
        expect(error.message).toContain('root[2].year');
        expect(error.message).toContain('expected 1994, got 1995');
      }
    });

    it('identifies field name typos with missing/extra key details', () => {
      const actual = [
        { id: 1, titel: 'Casablanca', year: 1942 }, // Typo: "titel" instead of "title"
      ];

      const expected = [
        { id: 1, title: 'Casablanca', year: 1942 },
      ];

      try {
        Expect.that(actual).shouldMatch(expected);
        fail('Should have thrown');
      } catch (error) {
        console.log('\n=== Field Name Typo Error ===');
        console.log(error.message);
        console.log('=== End Error Message ===\n');

        // ✅ Shows element has no exact match
        expect(error.message).toContain('No matching arrangement found');
        expect(error.message).toContain('root[0]');
        expect(error.message).toContain('closest to actual[0]');
        expect(error.message).toContain('2 mismatches');

        // ✅ Shows missing key
        expect(error.message).toContain('root[0].title');
        expect(error.message).toContain('Missing expected key: "title"');

        // ✅ Shows extra key
        expect(error.message).toContain('root[0].titel');
        expect(error.message).toContain('Unexpected extra key: "titel"');
      }
    });

    it('works equally well for ordered comparison', () => {
      const actual = [
        { id: 1, title: 'Casablanca', year: 1942 },
        { id: 2, title: 'The Godfather', year: 1973 }, // Wrong year
      ];

      const expected = [
        { id: 1, title: 'Casablanca', year: 1942 },
        { id: 2, title: 'The Godfather', year: 1972 },
      ];

      try {
        Expect.that(actual).withOrderedSort().shouldMatch(expected);
        fail('Should have thrown');
      } catch (error) {
        console.log('\n=== Ordered Comparison Error ===');
        console.log(error.message);
        console.log('=== End Error Message ===\n');

        // ✅ Ordered comparison provides clear error message with structured output
        expect(error.message).toContain('Comparison failed at root');
        expect(error.message).toContain('Values do not match');
        expect(error.message).toContain('Expected:');
        expect(error.message).toContain('Actual:');

        // ✅ Shows the differing values in the arrays
        expect(error.message).toContain('"year": 1972'); // expected value
        expect(error.message).toContain('"year": 1973'); // actual value
      }
    });
  });

  describe('Benefits for technical writers', () => {
    it('enables quick debugging even with large arrays', () => {
      // Simulate a realistic scenario with multiple movies
      const actual = [
        { title: 'Casablanca', year: 1942, rating: 8.5 },
        { title: 'The Godfather', year: 1972, rating: 9.2 },
        { title: 'The Dark Knight', year: 2008, rating: 9.0 },
        { title: 'Pulp Fiction', year: 1994, rating: 8.9 },
        { title: 'Schindler\'s List', year: 1993, rating: 8.9 },
        { title: 'The Shawshank Redemption', year: 1995, rating: 9.3 }, // Wrong year (should be 1994)
      ];

      const expected = [
        { title: 'Casablanca', year: 1942, rating: 8.5 },
        { title: 'The Godfather', year: 1972, rating: 9.2 },
        { title: 'The Dark Knight', year: 2008, rating: 9.0 },
        { title: 'Pulp Fiction', year: 1994, rating: 8.9 },
        { title: 'Schindler\'s List', year: 1993, rating: 8.9 },
        { title: 'The Shawshank Redemption', year: 1994, rating: 9.3 },
      ];

      try {
        Expect.that(actual).shouldMatch(expected);
        fail('Should have thrown');
      } catch (error) {
        console.log('\n=== Large Array (6 elements) Error ===');
        console.log(error.message);
        console.log('=== End Error Message ===\n');

        // ✅ Even with 6 movies, we immediately know:
        // - Exactly which element failed (element 5)
        // - Exactly which field is wrong (year)
        // - Exactly what the difference is (1995 vs 1994)

        // Verify the detailed error reporting works for large arrays
        expect(error.message).toContain('1 of 6 elements don\'t match');

        // Shows which 5 matched
        expect(error.message).toContain('matches actual[0] ✓');
        expect(error.message).toContain('matches actual[1] ✓');
        expect(error.message).toContain('matches actual[2] ✓');
        expect(error.message).toContain('matches actual[3] ✓');
        expect(error.message).toContain('matches actual[4] ✓');

        // Shows which one failed with details
        expect(error.message).toContain('root[5]');
        expect(error.message).toContain('closest to actual[5]');
        expect(error.message).toContain('1 mismatch');
        expect(error.message).toContain('root[5].year');
        expect(error.message).toContain('expected 1994, got 1995');
      }
    });
  });
});

