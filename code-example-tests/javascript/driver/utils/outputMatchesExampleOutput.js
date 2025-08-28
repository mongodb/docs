const { areObjectsEqual } = require('./areObjectsEqual');
const { normalizeItem, preprocessFileContents } = require('./normalize');
const path = require('path');
const fs = require('fs');
const vm = require('vm');
const { Decimal128, ObjectId } = require('mongodb');

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
  return {
    Decimal128: (value) => new Decimal128(value),
    ObjectId: (value) => new ObjectId(value),
    Date: (value) => new Date(value),
  };
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
 *
 * @example
 * parseExpectedOutput('{_id: ObjectId("..."), name: "test"}')
 * // Returns: {success: true, data: [{_id: ObjectId(...), name: 'test'}]}
 */
function parseExpectedOutput(rawContent) {
  const processedBlocks = preprocessFileContents(rawContent);
  const context = createEvaluationContext();
  const expectedOutputArray = [];
  const hasStandaloneEllipsis = detectOmittedFields(rawContent);

  try {
    for (const block of processedBlocks) {
      if (!block) continue;
      const obj = vm.runInNewContext('(' + block + ')', context);
      
      // If standalone ellipsis is detected, add ellipsis pattern to objects
      if (hasStandaloneEllipsis && typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
        obj['...'] = '...';
      }
      
      expectedOutputArray.push(obj);
    }
    return { success: true, data: expectedOutputArray };
  } catch (error) {
    return { success: false, error };
  }
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
 * Applies normalization to input data for consistent comparison.
 * Handles arrays, objects, and primitives with MongoDB type normalization.
 *
 * @param {*} input - The input data to normalize
 * @returns {*} Normalized data ready for comparison
 *
 * @example
 * normalizeForComparison([{date: new Date(), _id: new ObjectId()}])
 * // Returns: [{date: '2023-01-01T...', _id: '507f...'}]
 */
function normalizeForComparison(input) {
  if (Array.isArray(input)) {
    return input.map(normalizeItem);
  }
  if (typeof input === 'object' && input !== null) {
    return normalizeItem(input);
  }
  return input;
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
 *
 * @example
 * ensureComparableFormat([{a:1}], {a:1}) // {expected: [{a:1}], actual: [{a:1}]}
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

/**
 * Compares two arrays with a fallback strategy for single-element arrays.
 * First attempts array-to-array comparison, then falls back to element comparison
 * if both arrays contain exactly one element.
 *
 * @param {Array} normalizedExpected - Normalized expected array
 * @param {Array} normalizedActual - Normalized actual array
 * @param {Object} comparisonOptions - Options for comparison behavior
 * @returns {boolean} True if arrays match according to comparison rules
 *
 * @example
 * compareArraysWithFallback([{a:1}], [{a:1}], {options: {}}) // true
 */
function compareArraysWithFallback(
  normalizedExpected,
  normalizedActual,
  comparisonOptions
) {
  let isEqual = areObjectsEqual(
    normalizedExpected,
    normalizedActual,
    comparisonOptions.options
  );

  // Fallback: if both arrays have length 1 and comparison failed, compare first elements as objects
  if (
    !isEqual &&
    normalizedExpected.length === 1 &&
    normalizedActual.length === 1
  ) {
    isEqual = areObjectsEqual(
      normalizedExpected[0],
      normalizedActual[0],
      comparisonOptions.options
    );
  }

  return isEqual;
}

/**
 * Performs direct object-to-object comparison with ellipsis and omission support.
 *
 * @param {Object} normalizedExpected - Normalized expected object
 * @param {Object} normalizedActual - Normalized actual object
 * @param {Object} comparisonOptions - Options for comparison behavior
 * @returns {boolean} True if objects match according to comparison rules
 *
 * @example
 * compareObjects({_id: '...'}, {_id: 'actual-id'}, {options: {}}) // true
 */
function compareObjects(
  normalizedExpected,
  normalizedActual,
  comparisonOptions
) {
  const isEqual = areObjectsEqual(
    normalizedExpected,
    normalizedActual,
    comparisonOptions.options
  );

  return isEqual;
}

/**
 * Main function that compares actual test output against expected output files.
 * Supports flexible MongoDB document comparison with automatic ellipsis pattern detection,
 * field omission, and various comparison strategies.
 *
 * @param {string} filepath - Relative path to expected output file (from examples directory)
 * @param {*} output - Actual output from test execution
 * @param {Object} [options={}] - Comparison configuration options
 * @param {string} [options.comparisonType='unordered'] - 'ordered' or 'unordered' array comparison
 * @param {string[]} [options.ignoreFieldValues=[]] - Field names to ignore during value comparison
 * @returns {boolean} True if actual output matches expected output according to the rules
 *
 * @example
 * // Basic usage - ellipsis patterns are automatically detected
 * outputMatchesExampleOutput('movies/find-result.txt', actualMovies)
 *
 * // With options
 * outputMatchesExampleOutput('movies/find-result.txt', actualMovies, {
 *   comparisonType: 'ordered',
 *   ignoreFieldValues: ['_id', 'timestamp', 'uuid']
 * })
 */
function outputMatchesExampleOutput(filepath, output, options = {}) {
  // Set default options
  const { comparisonType = 'unordered', ignoreFieldValues = [] } = options;

  // Read and parse expected output
  const filepathString = '../examples/' + filepath;
  const outputFilePath = path.resolve(__dirname, filepathString);
  const rawExpectedOutput = fs.readFileSync(outputFilePath, 'utf8');

  const hasOmittedFields = detectOmittedFields(rawExpectedOutput);
  const parseResult = parseExpectedOutput(rawExpectedOutput);

  if (!parseResult.success) {
    return false;
  }

  const expectedOutputArray = parseResult.data;

  // Ensure comparable formats
  const { expected, actual } = ensureComparableFormat(
    expectedOutputArray,
    output
  );

  // Set up comparison options - ellipsis matching is automatic when detected
  const comparisonOptions = {
    options: {
      comparisonType,
      unordered: comparisonType === 'unordered',
      ignoreFieldValues,
      allowOmittedFieldsWithEllipsis: hasOmittedFields,
    },
  };

  // Compare based on types
  if (Array.isArray(actual) && Array.isArray(expected)) {
    const normalizedActual = normalizeForComparison(actual);
    const normalizedExpected = normalizeForComparison(expected);
    return compareArraysWithFallback(
      normalizedExpected,
      normalizedActual,
      comparisonOptions
    );
  }

  if (
    typeof actual === 'object' &&
    actual !== null &&
    typeof expected === 'object' &&
    expected !== null &&
    !Array.isArray(actual) &&
    !Array.isArray(expected)
  ) {
    const normalizedActual = normalizeForComparison(actual);
    const normalizedExpected = normalizeForComparison(expected);
    return compareObjects(
      normalizedExpected,
      normalizedActual,
      comparisonOptions
    );
  }

  return false;
}

module.exports = outputMatchesExampleOutput;
module.exports.outputMatchesExampleOutput = outputMatchesExampleOutput;
