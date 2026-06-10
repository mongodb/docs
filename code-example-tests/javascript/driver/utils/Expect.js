import { ComparisonEngine } from './comparison/comparisonEngine.js';
import path from 'path';

/**
 * Expect provides a fluent API for comparing MongoDB documentation example
 * outputs. Every comparison is delegated to the language-agnostic comparison
 * kernel (a native Go binary under tools/comparison-kernel/bin/), so behaviour
 * is identical across language suites.
 *
 * @example
 * // File comparison
 * Expect.that(actualResults).shouldMatch('expected-output.txt');
 *
 * // Object comparison with options
 * Expect.that(actualResults)
 *   .withOrderedSort()
 *   .withIgnoredFields('_id', 'timestamp')
 *   .shouldMatch(expectedResults);
 *
 * // Schema-based validation (results may vary, structure must hold)
 * Expect.that(actualResults)
 *   .shouldResemble(expectedOutput)
 *   .withSchema({
 *     count: 20,
 *     requiredFields: ['_id', 'title', 'year'],
 *     fieldValues: { year: 2012 },
 *   });
 */
class Expect {
  constructor(actual) {
    this._actual = actual;
    this._options = {
      arrayComparison: 'unordered',
      ignoreFields: [],
    };
    this._comparisonType = null;
    this._expectedForResemble = null;
    this._hasSortOption = false;
  }

  static that(actual) {
    return new Expect(actual);
  }

  withUnorderedSort() {
    this._hasSortOption = true;
    this._options.arrayComparison = 'unordered';
    return this;
  }

  withOrderedSort() {
    this._hasSortOption = true;
    this._options.arrayComparison = 'ordered';
    return this;
  }

  withIgnoredFields(...fields) {
    this._options.ignoreFields = fields;
    return this;
  }

  shouldMatch(expected) {
    if (this._comparisonType === 'schema') {
      throw new Error(
        'shouldMatch() cannot be used with shouldResemble() - they are mutually exclusive'
      );
    }
    this._comparisonType = 'exact';

    const result = ComparisonEngine.compare(expected, this._actual, {
      ...this._options,
      baseDir: path.resolve(__dirname, '../examples'),
    });

    if (!result.isMatch) {
      throw new Error(result.getErrorSummary());
    }
  }

  shouldResemble(expectedOutput) {
    if (this._comparisonType === 'exact') {
      throw new Error(
        'shouldResemble() cannot be used with shouldMatch() - they are mutually exclusive'
      );
    }
    if (this._options.ignoreFields.length > 0) {
      throw new Error(
        'withIgnoredFields() cannot be used with shouldResemble() - ' +
          'schema validation ignores field values by default'
      );
    }
    if (this._hasSortOption) {
      throw new Error(
        'withOrderedSort()/withUnorderedSort() cannot be used with shouldResemble() - ' +
          'sort options only apply to shouldMatch() comparisons'
      );
    }
    this._comparisonType = 'schema';
    this._expectedForResemble = expectedOutput;
    return this;
  }

  withSchema(schema) {
    if (this._comparisonType !== 'schema') {
      throw new Error(
        'withSchema() requires shouldResemble() to be called first'
      );
    }
    if (!schema || typeof schema !== 'object') {
      throw new Error('withSchema() requires a schema object');
    }
    if (
      typeof schema.count !== 'number' ||
      !Number.isInteger(schema.count) ||
      schema.count < 0
    ) {
      throw new Error(
        `withSchema() requires a non-negative count number, got ${schema.count}`
      );
    }
    if (
      schema.requiredFields !== undefined &&
      !Array.isArray(schema.requiredFields)
    ) {
      throw new Error(
        'withSchema() requiredFields must be an array of field names'
      );
    }
    if (
      schema.fieldValues !== undefined &&
      (typeof schema.fieldValues !== 'object' ||
        schema.fieldValues === null ||
        Array.isArray(schema.fieldValues))
    ) {
      throw new Error(
        'withSchema() fieldValues must be an object of key-value pairs'
      );
    }

    // Catch a common configuration mistake early: fieldValues should be a
    // subset of requiredFields. Otherwise a fieldValues entry can silently
    // pass for documents that lack the field altogether.
    const requiredFieldsSet = new Set(schema.requiredFields || []);
    const orphanFieldValues = Object.keys(schema.fieldValues || {}).filter(
      (k) => !requiredFieldsSet.has(k)
    );
    if (orphanFieldValues.length > 0) {
      const list = orphanFieldValues.map((f) => `'${f}'`).join(', ');
      throw new Error(
        `Schema validation configuration error: fieldValues contains field(s) [${list}] ` +
          `that are not in requiredFields. All fields in fieldValues must also be listed in requiredFields.`
      );
    }

    // Reject obviously-incompatible actual values up front so the user gets a
    // clearer error than the kernel's "document at index 0 is not an object".
    if (this._actual === null) {
      throw new Error('Schema validation failed: actual output is null');
    }
    if (this._actual === undefined || typeof this._actual !== 'object') {
      throw new Error(
        `Schema validation failed: actual output must be an array or document, got ${typeof this._actual}`
      );
    }

    const result = ComparisonEngine.compareWithSchema(
      this._expectedForResemble,
      this._actual,
      {
        count: schema.count,
        requiredFields: schema.requiredFields || [],
        fieldValues: schema.fieldValues || {},
      },
      { baseDir: path.resolve(__dirname, '../examples') }
    );

    if (!result.isMatch) {
      throw new Error(`Schema validation failed:\n${result.getErrorSummary()}`);
    }
  }
}

export default Expect;
export { Expect };
