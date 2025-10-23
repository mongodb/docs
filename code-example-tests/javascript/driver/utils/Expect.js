const { ComparisonEngine } = require('./comparison/comparisonEngine');
const path = require('path');

/**
 * Expect provides a fluent API for comparing MongoDB documentation example outputs.
 * It automatically detects content types and selects the optimal comparison strategy.
 *
 * @example
 * // Basic file comparison
 * Expect.that(actualResults).shouldMatch('expected-output.txt');
 *
 * // With options
 * Expect.that(actualResults)
 *   .withOrderedSort()
 *   .withIgnoredFields('_id', 'timestamp')
 *   .shouldMatch('expected-output.txt');
 *
 * // Direct object comparison
 * Expect.that(actualResults).shouldMatch([{ name: 'test' }]);
 *
 * // Pattern matching
 * Expect.that(actualResults).shouldMatch('{_id: "...", name: "test"}');
 */
class Expect {
  /**
   * Creates a new Expect instance for the given actual value.
   *
   * @param {*} actual - The actual value from test execution
   * @returns {Expect} A new Expect instance
   */
  constructor(actual) {
    this._actual = actual;
    this._options = {
      arrayComparison: 'unordered', // Default to unordered
      ignoreFields: [],
    };
  }

  /**
   * Static factory method to create an Expect instance.
   * This provides the fluent API entry point: Expect.that(value)
   *
   * @param {*} actual - The actual value from test execution
   * @returns {Expect} A new Expect instance
   *
   * @example
   * Expect.that(results).shouldMatch('expected.txt');
   */
  static that(actual) {
    return new Expect(actual);
  }

  /**
   * Configures the comparison to use unordered array matching (default behavior).
   * Arrays will be compared without regard to element order.
   *
   * @returns {Expect} This instance for method chaining
   *
   * @example
   * Expect.that([{a: 1}, {b: 2}])
   *   .withUnorderedSort()
   *   .shouldMatch([{b: 2}, {a: 1}]); // Passes
   */
  withUnorderedSort() {
    this._options.arrayComparison = 'unordered';
    return this;
  }

  /**
   * Configures the comparison to use ordered array matching.
   * Arrays will be compared with strict element-by-element ordering.
   *
   * @returns {Expect} This instance for method chaining
   *
   * @example
   * Expect.that([{a: 1}, {b: 2}])
   *   .withOrderedSort()
   *   .shouldMatch([{a: 1}, {b: 2}]); // Passes
   *
   * Expect.that([{a: 1}, {b: 2}])
   *   .withOrderedSort()
   *   .shouldMatch([{b: 2}, {a: 1}]); // Fails
   */
  withOrderedSort() {
    this._options.arrayComparison = 'ordered';
    return this;
  }

  /**
   * Configures fields to ignore during value comparison.
   * Useful for dynamic fields like `_id`, `timestamp`, `uuid`, etc.
   *
   * @param {...string} fields - Field names to ignore
   * @returns {Expect} This instance for method chaining
   *
   * @example
   * Expect.that({_id: 'abc123', name: 'test', timestamp: '2023-01-01'})
   *   .withIgnoredFields('_id', 'timestamp')
   *   .shouldMatch({name: 'test'}); // Passes (ignores _id and timestamp)
   */
  withIgnoredFields(...fields) {
    this._options.ignoreFields = fields;
    return this;
  }

  /**
   * Performs the comparison and throws an error if values don't match.
   * This is the terminal operation in the fluent API chain.
   *
   * The comparison automatically:
   * - Detects content types (files, objects, arrays, patterns, text)
   * - Selects the optimal comparison strategy
   * - Provides detailed error messages on failure
   *
   * @param {*} expected - Expected value (file path, object, array, string, etc.)
   * @throws {Error} If the comparison fails
   *
   * @example
   * // All these work automatically:
   * Expect.that(results).shouldMatch('file.txt');           // File comparison
   * Expect.that(results).shouldMatch([{a: 1}]);             // Object comparison
   * Expect.that(results).shouldMatch('{_id: "..."}');       // Pattern matching
   * Expect.that(results).shouldMatch('Some text output');   // Text comparison
   */
  shouldMatch(expected) {
    // Add baseDir internally - always resolve to examples directory
    const optionsWithBaseDir = {
      ...this._options,
      baseDir: path.resolve(__dirname, '../examples'),
    };

    const result = ComparisonEngine.compare(
      expected,
      this._actual,
      optionsWithBaseDir
    );

    if (!result.isMatch) {
      throw new Error(result.getErrorSummary());
    }
  }
}

module.exports = Expect;
module.exports.Expect = Expect;

