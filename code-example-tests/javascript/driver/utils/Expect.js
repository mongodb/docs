const { ComparisonEngine } = require('./comparison/comparisonEngine');
const { readAndParseFile } = require('./comparison/fileParser');
const {
  ContentAnalyzer,
  ContentType,
} = require('./comparison/ContentAnalyzer');
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
 *
 * // Schema-based validation for results that may vary (e.g., Vector Search)
 * Expect.that(actualResults)
 *   .shouldResemble(expectedOutput)
 *   .withSchema({
 *     count: 20,
 *     requiredFields: ['_id', 'title', 'year'],
 *     fieldValues: { year: 2012 }
 *   });
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
    // Schema validation state (for shouldResemble API)
    this._comparisonType = null; // 'exact' for shouldMatch, 'schema' for shouldResemble
    this._schemaConfig = null;
    this._expectedOutputForResemble = null;
    // Track whether sort options were explicitly set
    this._hasSortOption = false;
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
   * Note: This option is only compatible with shouldMatch(). Using it with
   * shouldResemble() will throw an error because schema-based validation
   * doesn't compare documents between expected and actual, so ordering
   * is not applicable.
   *
   * @returns {Expect} This instance for method chaining
   *
   * @example
   * Expect.that([{a: 1}, {b: 2}])
   *   .withUnorderedSort()
   *   .shouldMatch([{b: 2}, {a: 1}]); // Passes
   */
  withUnorderedSort() {
    this._hasSortOption = true;
    this._options.arrayComparison = 'unordered';
    return this;
  }

  /**
   * Configures the comparison to use ordered array matching.
   * Arrays will be compared with strict element-by-element ordering.
   *
   * Note: This option is only compatible with shouldMatch(). Using it with
   * shouldResemble() will throw an error because schema-based validation
   * doesn't compare documents between expected and actual, so ordering
   * is not applicable.
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
    this._hasSortOption = true;
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
   * This method is mutually exclusive with shouldResemble().
   *
   * @param {*} expected - Expected value (file path, object, array, string, etc.)
   * @throws {Error} If the comparison fails or if shouldResemble() was already called
   *
   * @example
   * // All these work automatically:
   * Expect.that(results).shouldMatch('file.txt');           // File comparison
   * Expect.that(results).shouldMatch([{a: 1}]);             // Object comparison
   * Expect.that(results).shouldMatch('{_id: "..."}');       // Pattern matching
   * Expect.that(results).shouldMatch('Some text output');   // Text comparison
   */
  shouldMatch(expected) {
    if (this._comparisonType === 'schema') {
      throw new Error(
        'shouldMatch() cannot be used with shouldResemble() - they are mutually exclusive'
      );
    }
    this._comparisonType = 'exact';

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

  /**
   * Marks the comparison for schema-based validation instead of exact matching.
   * Use this when MongoDB results may vary but should conform to a known structure.
   *
   * This method MUST be followed by withSchema() to define validation criteria.
   * This method is mutually exclusive with shouldMatch().
   *
   * @param {*} expectedOutput - Sample expected output to validate against the schema
   * @returns {Expect} This instance for method chaining
   * @throws {Error} If shouldMatch() was already called
   *
   * @example
   * Expect.that(actualResults)
   *   .shouldResemble(expectedOutput)
   *   .withSchema({
   *     count: 20,
   *     requiredFields: ['_id', 'title', 'year'],
   *     fieldValues: { year: 2012 }
   *   });
   */
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
    this._expectedOutputForResemble = expectedOutput;
    return this;
  }

  /**
   * Defines the schema for validating results in shouldResemble() mode.
   * This is the terminal operation when using shouldResemble().
   *
   * Validates that BOTH expectedOutput and actualOutput:
   * - Match the expected document count
   * - Contain all required fields in every document
   * - Have matching values for specified fieldValues in every document
   *
   * @param {Object} schema - Schema definition for validation
   * @param {number} schema.count - Expected number of documents
   * @param {string[]} [schema.requiredFields=[]] - Fields that must exist in every document
   * @param {Object} [schema.fieldValues={}] - Key-value pairs that must match in every document
   * @throws {Error} If shouldResemble() was not called first
   * @throws {Error} If validation fails
   *
   * @example
   * Expect.that(actualResults)
   *   .shouldResemble(expectedOutput)
   *   .withSchema({
   *     count: 20,
   *     requiredFields: ['_id', 'title', 'year'],
   *     fieldValues: { year: 2012 }
   *   });
   */
  withSchema(schema) {
    if (this._comparisonType !== 'schema') {
      throw new Error(
        'withSchema() requires shouldResemble() to be called first'
      );
    }

    // Validate schema structure
    if (!schema || typeof schema !== 'object') {
      throw new Error('withSchema() requires a schema object');
    }
    if (typeof schema.count !== 'number' || schema.count < 0) {
      throw new Error('withSchema() requires a non-negative count number');
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

    this._schemaConfig = {
      count: schema.count,
      requiredFields: schema.requiredFields || [],
      fieldValues: schema.fieldValues || {},
    };

    // Validate that all fieldValues keys are also in requiredFields
    this._validateFieldValuesInRequiredFields(
      this._schemaConfig.requiredFields,
      this._schemaConfig.fieldValues
    );

    // Resolve expected output if it's a file path
    const resolvedExpected = this._resolveExpectedOutput(
      this._expectedOutputForResemble
    );

    // Validate both expected and actual outputs against the schema
    const errors = [];

    // Validate expected output
    const expectedErrors = this._validateAgainstSchema(
      resolvedExpected,
      this._schemaConfig.count,
      this._schemaConfig.requiredFields,
      this._schemaConfig.fieldValues,
      'expected'
    );
    errors.push(...expectedErrors);

    // Validate actual output
    const actualErrors = this._validateAgainstSchema(
      this._actual,
      this._schemaConfig.count,
      this._schemaConfig.requiredFields,
      this._schemaConfig.fieldValues,
      'actual'
    );
    errors.push(...actualErrors);

    if (errors.length > 0) {
      throw new Error(
        `Schema validation failed:\n${errors.map((e) => `  - ${e}`).join('\n')}`
      );
    }
  }

  /**
   * Validates an array of documents against the schema definition.
   *
   * @private
   * @param {*} data - The data to validate (array or single document)
   * @param {number} count - Expected document count
   * @param {string[]} requiredFields - Fields that must exist in every document
   * @param {Object} fieldValues - Key-value pairs that must match in every document
   * @param {string} label - Label for error messages ('expected' or 'actual')
   * @returns {string[]} Array of error messages (empty if valid)
   */
  _validateAgainstSchema(data, count, requiredFields, fieldValues, label) {
    const errors = [];

    // Normalize data to an array (auto-wrap single documents)
    const documents = this._normalizeToDocumentArray(data, label, errors);

    // If normalization failed, return early with errors
    if (errors.length > 0) {
      return errors;
    }

    // Validate count
    if (documents.length !== count) {
      errors.push(
        `${label} output has ${documents.length} documents, expected ${count}`
      );
    }

    // Validate each document
    documents.forEach((doc, index) => {
      if (typeof doc !== 'object' || doc === null) {
        errors.push(`${label}[${index}] is not an object`);
        return;
      }

      // Check required fields (presence only, not value)
      // Supports dot notation for nested fields and array indexing like stages[0].$cursor
      for (const field of requiredFields) {
        // Use nested path navigation if dot notation or array indexing is used
        if (field.includes('.') || field.includes('[')) {
          const result = this._tryGetNestedValue(doc, field);
          if (!result.found) {
            errors.push(
              `${label}[${index}] is missing required field '${field}'`
            );
          }
        } else {
          if (!(field in doc)) {
            errors.push(
              `${label}[${index}] is missing required field '${field}'`
            );
          }
        }
      }

      // Check field values
      // Supports dot notation for nested fields and array indexing like stages[0].$cursor
      for (const [field, expectedValue] of Object.entries(fieldValues)) {
        let actualValue;
        let fieldExists;

        // Use nested path navigation if dot notation or array indexing is used
        if (field.includes('.') || field.includes('[')) {
          const result = this._tryGetNestedValue(doc, field);
          fieldExists = result.found;
          actualValue = result.value;
        } else {
          fieldExists = field in doc;
          actualValue = doc[field];
        }

        if (!fieldExists) {
          errors.push(
            `${label}[${index}] is missing field '${field}' required by fieldValues`
          );
        } else if (!this._valuesEqual(actualValue, expectedValue)) {
          errors.push(
            `${label}[${index}].${field} has value ${JSON.stringify(actualValue)}, expected ${JSON.stringify(expectedValue)}`
          );
        }
      }
    });

    return errors;
  }

  /**
   * Resolves expected output, loading from file if it's a file path.
   * Uses the same file path detection as shouldMatch().
   *
   * @private
   * @param {*} expectedOutput - The expected output (may be a file path string)
   * @returns {*} The resolved expected output data
   * @throws {Error} If file cannot be read or parsed
   */
  _resolveExpectedOutput(expectedOutput) {
    // If it's not a string, return as-is
    if (typeof expectedOutput !== 'string') {
      return expectedOutput;
    }

    // Check if it's a file path using ContentAnalyzer
    const baseDir = path.resolve(__dirname, '../examples');
    const contentType = ContentAnalyzer.detectType(expectedOutput, baseDir);

    if (contentType === ContentType.FILE) {
      const parseResult = readAndParseFile(expectedOutput, baseDir);
      if (!parseResult.success) {
        throw parseResult.error;
      }
      return parseResult.data;
    }

    // Not a file path, return as-is
    return expectedOutput;
  }

  /**
   * Normalizes input to a document array.
   * Handles arrays, single documents (objects), and reports errors for invalid types.
   *
   * @private
   * @param {*} data - The data to normalize
   * @param {string} label - Label for error messages ('expected' or 'actual')
   * @param {string[]} errors - Array to push errors into
   * @returns {Array} Normalized array of documents (empty array if invalid)
   */
  _normalizeToDocumentArray(data, label, errors) {
    // Null/undefined check
    if (data === null || data === undefined) {
      errors.push(`${label} output is ${data === null ? 'null' : 'undefined'}`);
      return [];
    }

    // Already an array - return as-is
    if (Array.isArray(data)) {
      return data;
    }

    // Single document (plain object) - wrap in array
    if (typeof data === 'object') {
      return [data];
    }

    // Invalid type (string, number, boolean, etc.)
    errors.push(
      `${label} output must be an array or document, got ${typeof data}`
    );
    return [];
  }

  /**
   * Compares two values for equality, handling common MongoDB types.
   *
   * @private
   * @param {*} actual - The actual value
   * @param {*} expected - The expected value
   * @returns {boolean} True if values are equal
   */
  _valuesEqual(actual, expected) {
    // Handle null/undefined
    if (actual === expected) return true;
    if (actual === null || expected === null) return false;
    if (actual === undefined || expected === undefined) return false;

    // Handle MongoDB types by converting to string/primitive for comparison
    const normalizedActual = this._normalizeValue(actual);
    const normalizedExpected = this._normalizeValue(expected);

    // Deep equality for objects/arrays
    if (
      typeof normalizedActual === 'object' &&
      typeof normalizedExpected === 'object'
    ) {
      return (
        JSON.stringify(normalizedActual) === JSON.stringify(normalizedExpected)
      );
    }

    return normalizedActual === normalizedExpected;
  }

  /**
   * Normalizes a value for comparison, handling common MongoDB types.
   *
   * @private
   * @param {*} value - The value to normalize
   * @returns {*} The normalized value
   */
  _normalizeValue(value) {
    if (value === null || value === undefined) return value;

    // Handle MongoDB ObjectId
    if (value.constructor && value.constructor.name === 'ObjectId') {
      return value.toString();
    }

    // Handle MongoDB Decimal128
    if (value.constructor && value.constructor.name === 'Decimal128') {
      return value.toString();
    }

    // Handle Date objects
    if (value instanceof Date) {
      return value.toISOString();
    }

    // Handle arrays
    if (Array.isArray(value)) {
      return value.map((v) => this._normalizeValue(v));
    }

    // Handle plain objects
    if (typeof value === 'object') {
      const result = {};
      for (const [k, v] of Object.entries(value)) {
        result[k] = this._normalizeValue(v);
      }
      return result;
    }

    return value;
  }

  /**
   * Validates that all fields in fieldValues are also present in requiredFields.
   * Matches the C# SchemaBuilder validation behavior.
   *
   * @private
   * @param {string[]} requiredFields - Array of required field names
   * @param {Object} fieldValues - Object of field-value pairs to check
   * @throws {Error} If fieldValues contains fields not in requiredFields
   */
  _validateFieldValuesInRequiredFields(requiredFields, fieldValues) {
    if (!fieldValues || Object.keys(fieldValues).length === 0) {
      return;
    }

    const requiredFieldsSet = new Set(requiredFields);
    const missingFields = Object.keys(fieldValues).filter(
      (fieldName) => !requiredFieldsSet.has(fieldName)
    );

    if (missingFields.length > 0) {
      const fieldList = missingFields.map((f) => `'${f}'`).join(', ');
      throw new Error(
        `Schema validation configuration error: fieldValues contains field(s) [${fieldList}] ` +
          `that are not in requiredFields. All fields in fieldValues must also be listed in requiredFields.`
      );
    }
  }

  /**
   * Attempts to get a value from a nested structure using dot notation and array indexing.
   * Supports paths like "queryPlanner.winningPlan.stage" and "stages[0].$cursor.queryPlanner.winningPlan.stage".
   *
   * @private
   * @param {Object} doc - The document to navigate
   * @param {string} fieldPath - The path to the field (supports dot notation and array indexing)
   * @returns {{ found: boolean, value: * }} Result with found flag and value if found
   */
  _tryGetNestedValue(doc, fieldPath) {
    const pathParts = this._parseFieldPath(fieldPath);
    let current = doc;

    for (const part of pathParts) {
      if (current === null || current === undefined) {
        return { found: false, value: undefined };
      }

      // Normalize the current value (handle MongoDB types)
      const normalizedCurrent = this._normalizeValue(current);

      if (part.isArrayIndex) {
        // Handle array indexing
        if (Array.isArray(normalizedCurrent)) {
          if (
            part.arrayIndex < 0 ||
            part.arrayIndex >= normalizedCurrent.length
          ) {
            return { found: false, value: undefined };
          }
          current = normalizedCurrent[part.arrayIndex];
        } else {
          // Not an array, can't index
          return { found: false, value: undefined };
        }
      } else {
        // Handle object key access
        if (
          typeof normalizedCurrent === 'object' &&
          normalizedCurrent !== null &&
          !Array.isArray(normalizedCurrent)
        ) {
          if (!(part.fieldName in normalizedCurrent)) {
            return { found: false, value: undefined };
          }
          current = normalizedCurrent[part.fieldName];
        } else {
          // Current value is not an object, can't navigate further
          return { found: false, value: undefined };
        }
      }
    }

    return { found: true, value: current };
  }

  /**
   * Parses a field path into individual parts, handling both dot notation and array indexing.
   * For example, "stages[0].$cursor.queryPlanner" becomes:
   * [{ fieldName: "stages" }, { arrayIndex: 0 }, { fieldName: "$cursor" }, { fieldName: "queryPlanner" }]
   *
   * @private
   * @param {string} fieldPath - The field path to parse
   * @returns {Array<{ fieldName?: string, arrayIndex?: number, isArrayIndex: boolean }>} Parsed path parts
   */
  _parseFieldPath(fieldPath) {
    const parts = [];
    const segments = fieldPath.split('.');

    for (const segment of segments) {
      // Check if segment contains array indexing like "stages[0]" or "items[2]"
      const bracketIndex = segment.indexOf('[');
      if (bracketIndex >= 0) {
        // Extract field name before the bracket (if any)
        if (bracketIndex > 0) {
          const fieldName = segment.substring(0, bracketIndex);
          parts.push({ fieldName, isArrayIndex: false });
        }

        // Extract all array indices from the segment (handles cases like "arr[0][1]")
        let remaining = segment.substring(bracketIndex);
        while (remaining.length > 0 && remaining.startsWith('[')) {
          const closeBracket = remaining.indexOf(']');
          if (closeBracket < 0) break;

          const indexStr = remaining.substring(1, closeBracket);
          const arrayIndex = parseInt(indexStr, 10);
          if (!isNaN(arrayIndex)) {
            parts.push({ arrayIndex, isArrayIndex: true });
          }

          remaining = remaining.substring(closeBracket + 1);
        }
      } else {
        // Simple field name
        parts.push({ fieldName: segment, isArrayIndex: false });
      }
    }

    return parts;
  }
}

module.exports = Expect;
module.exports.Expect = Expect;
