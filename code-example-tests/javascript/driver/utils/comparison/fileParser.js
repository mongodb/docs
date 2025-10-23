const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { Decimal128, ObjectId } = require('mongodb');
const { normalizeItem, preprocessFileContents } = require('./normalize');

/**
 * Creates a context object for safely evaluating expected output files.
 * Provides MongoDB constructors for Decimal128, ObjectId, and Date types.
 *
 * @returns {Object} Context object for vm.runInNewContext
 *
 * @example
 * const ctx = createEvaluationContext();
 * vm.runInNewContext('ObjectId("507f...")', ctx); // Creates ObjectId instance
 */
function createEvaluationContext() {
  // Create wrapper functions that work both as constructors (new X()) and functions (X())
  function DateConstructor(value) {
    return new Date(value);
  }
  DateConstructor.prototype = Date.prototype;
  DateConstructor.constructor = Date;

  function ObjectIdConstructor(value) {
    return new ObjectId(value);
  }
  ObjectIdConstructor.prototype = ObjectId.prototype;
  ObjectIdConstructor.constructor = ObjectId;

  function Decimal128Constructor(value) {
    return new Decimal128(value);
  }
  Decimal128Constructor.prototype = Decimal128.prototype;
  Decimal128Constructor.constructor = Decimal128;

  return {
    Decimal128: Decimal128Constructor,
    ObjectId: ObjectIdConstructor,
    Date: DateConstructor,
  };
}

/**
 * Checks if the expected output content contains a global omitted fields marker.
 * Looks for standalone '...' lines that indicate flexible field matching.
 *
 * @param {string} rawContent - Raw expected output file content
 * @returns {boolean} True if content contains omitted fields marker
 *
 * @example
 * detectOmittedFields(`{name: 'test'}
 * ...
 * {other: 'doc'}`) // true
 */
function detectOmittedFields(rawContent) {
  return /^\s*\.\.\.\s*$/m.test(rawContent);
}

/**
 * Parses and evaluates expected output from raw file content.
 * Handles multiple documents, MongoDB syntax, and error cases.
 * Automatically adds ellipsis patterns when standalone ... is detected.
 *
 * @param {string} rawContent - Raw file content containing expected output
 * @returns {Object} Result object with success flag and data/error
 * @returns {boolean} returns.success - Whether parsing succeeded
 * @returns {Array} [returns.data] - Parsed documents array (if success)
 * @returns {Error} [returns.error] - Parse error (if failure)
 * @returns {boolean} [returns.hasOmittedFields] - Whether global ellipsis was detected
 *
 * @example
 * parseExpectedOutput('{_id: ObjectId("..."), name: "test"}')
 * // Returns: {success: true, data: [{_id: ObjectId(...), name: 'test'}], hasOmittedFields: false}
 */
function parseExpectedOutput(rawContent) {
  const processedBlocks = preprocessFileContents(rawContent);
  const context = createEvaluationContext();
  const expectedOutputArray = [];
  const hasStandaloneEllipsis = detectOmittedFields(rawContent);

  try {
    for (const block of processedBlocks) {
      if (!block) continue;
      const result = vm.runInNewContext('(' + block + ')', context);

      // If the result is an array, flatten it into expectedOutputArray
      if (Array.isArray(result)) {
        for (const item of result) {
          // If standalone ellipsis is detected, add ellipsis pattern to objects
          if (
            hasStandaloneEllipsis &&
            typeof item === 'object' &&
            item !== null &&
            !Array.isArray(item)
          ) {
            item['...'] = '...';
          }
          expectedOutputArray.push(item);
        }
      } else {
        // If standalone ellipsis is detected, add ellipsis pattern to objects
        if (
          hasStandaloneEllipsis &&
          typeof result === 'object' &&
          result !== null
        ) {
          result['...'] = '...';
        }
        expectedOutputArray.push(result);
      }
    }
    return {
      success: true,
      data: expectedOutputArray,
      hasOmittedFields: hasStandaloneEllipsis,
    };
  } catch (error) {
    return { success: false, error };
  }
}

/**
 * Reads and parses a file containing expected output.
 *
 * @param {string} filepath - Path to the file to read
 * @param {string} [baseDir] - Base directory for resolving relative paths
 * @returns {Object} Parse result with success, data, and metadata
 *
 * @example
 * readAndParseFile('../examples/movies/find-result.txt')
 * // Returns: {success: true, data: [{...}], hasOmittedFields: false}
 */
function readAndParseFile(filepath, baseDir = null) {
  try {
    let fullPath = filepath;
    if (baseDir && !path.isAbsolute(filepath)) {
      fullPath = path.resolve(baseDir, filepath);
    }

    const rawContent = fs.readFileSync(fullPath, 'utf8');
    return parseExpectedOutput(rawContent);
  } catch (error) {
    return {
      success: false,
      error: new Error(`Failed to read file ${filepath}: ${error.message}`),
    };
  }
}

/**
 * Normalizes parsed data for comparison.
 * Handles arrays, objects, and primitives with MongoDB type normalization.
 *
 * @param {*} data - The data to normalize
 * @returns {*} Normalized data ready for comparison
 */
function normalizeForComparison(data) {
  if (Array.isArray(data)) {
    return data.map(normalizeItem);
  }
  if (typeof data === 'object' && data !== null) {
    return normalizeItem(data);
  }
  return data;
}

/**
 * Ensures both expected and actual data are in comparable formats.
 * Converts single objects to single-element arrays when needed for consistency.
 *
 * @param {Array} expected - Expected data array from file
 * @param {*} actual - Actual data from test execution
 * @returns {Object} Object with normalized expected and actual arrays
 * @returns {Array} returns.expected - Expected data as array
 * @returns {Array} returns.actual - Actual data as array
 */
function ensureComparableFormat(expected, actual) {
  // If only one expected object and actual is a single object, treat both as arrays of length 1
  if (
    expected.length === 1 &&
    actual &&
    !Array.isArray(actual) &&
    typeof actual === 'object'
  ) {
    return { expected, actual: [actual] };
  }

  return { expected, actual };
}

module.exports = {
  parseExpectedOutput,
  readAndParseFile,
  normalizeForComparison,
  ensureComparableFormat,
};

