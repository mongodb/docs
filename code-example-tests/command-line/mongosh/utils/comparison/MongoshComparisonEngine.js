const { areObjectsEqual } = require('./areObjectsEqual');
const { MongoshOutputParser } = require('./MongoshOutputParser');
const {
  normalizeForComparison,
  ensureComparableFormat,
} = require('./mongoshNormalize.js');
const { ComparisonResult, ErrorMessageBuilder } = require('./errorReporting');
const { compareWithDetails } = require('./detailedComparison');
const { analyzeUnorderedMismatch, buildUnorderedArrayErrors } = require('./unorderedArrayAnalysis');
const fs = require('fs');
const path = require('path');

/**
 * MongoshComparisonEngine orchestrates comparison of mongosh test output
 * against expected output files or objects.
 *
 * Handles:
 * - Parsing mongosh stdout strings
 * - Reading and parsing expected output files
 * - Type normalization for comparison
 * - Error reporting with detailed messages
 */
class MongoshComparisonEngine {
  /**
   * Main comparison method. Automatically detects content types and
   * selects appropriate comparison strategy.
   *
   * @param {*} expected - Expected value (file path, object, array, or string)
   * @param {string|*} actual - Actual output (mongosh stdout string or parsed object)
   * @param {Object} [options={}] - Comparison options
   * @param {string} [options.arrayComparison='unordered'] - 'ordered' or 'unordered'
   * @param {string[]} [options.ignoreFields=[]] - Field names to ignore
   * @param {string} [options.baseDir] - Base directory for resolving file paths
   * @returns {ComparisonResult} Result with success status and error details
   */
  static compare(expected, actual, options = {}) {
    const baseDir = options.baseDir || path.resolve(__dirname, '../../examples');

    try {
      // Determine if expected is a file path
      const isFilePath = typeof expected === 'string' && this._isFilePath(expected, baseDir);

      if (isFilePath) {
        return this._compareWithFile(expected, actual, options, baseDir);
      } else {
        return this._compareDirectly(expected, actual, options);
      }
    } catch (error) {
      return ComparisonResult.failure(
        'root',
        expected,
        actual,
        `Comparison error: ${error.message}`
      );
    }
  }

  /**
   * Checks if a string represents a file path.
   * Returns true if the string looks like a file path (contains path separators or file extensions)
   * OR if the file exists.
   *
   * @private
   * @param {string} str - Potential file path
   * @param {string} baseDir - Base directory for resolution
   * @returns {boolean} True if string looks like a file path
   */
  static _isFilePath(str, baseDir) {
    try {
      // Check if file exists
      const fullPath = path.isAbsolute(str) ? str : path.resolve(baseDir, str);
      if (fs.existsSync(fullPath)) {
        return true;
      }

      // Check if string looks like a file path (has path separators or common file extensions)
      const hasPathSeparator = str.includes('/') || str.includes('\\');
      const hasFileExtension = /\.(sh|js|json|txt|md)$/i.test(str);

      return hasPathSeparator || hasFileExtension;
    } catch {
      return false;
    }
  }

  /**
   * Compares actual output against an expected output file.
   *
   * @private
   * @param {string} filepath - Path to expected output file
   * @param {string|*} actual - Actual output (string or parsed)
   * @param {Object} options - Comparison options
   * @param {string} baseDir - Base directory
   * @returns {ComparisonResult} Comparison result
   */
  static _compareWithFile(filepath, actual, options, baseDir) {
    // Read and parse expected output file
    const fullPath = path.isAbsolute(filepath) ? filepath : path.resolve(baseDir, filepath);

    let fileContent;
    try {
      fileContent = fs.readFileSync(fullPath, 'utf8');
    } catch (error) {
      // Provide user-friendly error message for file not found
      const errorMessage = error.code === 'ENOENT'
        ? ErrorMessageBuilder.fileNotFound(filepath, baseDir, 'expected output')
        : `Failed to read expected output file: ${error.message}`;

      return ComparisonResult.failure(
        'root',
        filepath,
        actual,
        errorMessage
      );
    }

    const expectedResult = MongoshOutputParser.parseExpectedOutput(fileContent);
    if (!expectedResult.success) {
      return ComparisonResult.failure(
        'root',
        filepath,
        actual,
        ErrorMessageBuilder.fileParseError(filepath, expectedResult.error)
      );
    }

    // Parse actual output if it's a string
    let actualParsed;
    if (typeof actual === 'string') {
      const actualResult = MongoshOutputParser.parse(actual);
      if (!actualResult.success) {
        return ComparisonResult.failure(
          'root',
          expectedResult.data,
          actual,
          `Failed to parse actual output: ${actualResult.error.message}`
        );
      }
      actualParsed = actualResult.data;
    } else {
      actualParsed = actual;
    }

    // Perform comparison
    return this._performComparison(
      expectedResult.data,
      actualParsed,
      options,
      expectedResult.hasOmittedFields || false
    );
  }

  /**
   * Compares actual output directly against expected value (not a file).
   *
   * @private
   * @param {*} expected - Expected value (object, array, etc.)
   * @param {string|*} actual - Actual output
   * @param {Object} options - Comparison options
   * @returns {ComparisonResult} Comparison result
   */
  static _compareDirectly(expected, actual, options) {
    // Parse actual output if it's a string
    let actualParsed;
    if (typeof actual === 'string') {
      const actualResult = MongoshOutputParser.parse(actual);
      if (!actualResult.success) {
        return ComparisonResult.failure(
          'root',
          expected,
          actual,
          `Failed to parse actual output: ${actualResult.error.message}`
        );
      }
      actualParsed = actualResult.data;
    } else {
      actualParsed = actual;
    }

    // Perform comparison
    return this._performComparison(expected, actualParsed, options, false);
  }

  /**
   * Performs the actual comparison using areObjectsEqual.
   *
   * @private
   * @param {*} expected - Expected value (parsed)
   * @param {*} actual - Actual value (parsed)
   * @param {Object} options - Comparison options
   * @param {boolean} hasOmittedFields - Whether global ellipsis is present
   * @returns {ComparisonResult} Comparison result
   */
  static _performComparison(expected, actual, options, hasOmittedFields) {
    // Ensure comparable formats
    const { expected: expectedFormatted, actual: actualFormatted } =
      ensureComparableFormat(expected, actual);

    // Build comparison options
    const defaultIgnoreFields = ['$clusterTime', 'operationTime'];
    const userIgnoreFields = options.ignoreFields || [];
    const allIgnoreFields = [...defaultIgnoreFields, ...userIgnoreFields];

    const comparisonOptions = {
      comparisonType: options.arrayComparison || 'unordered',
      ignoreFieldValues: allIgnoreFields,
      allowOmittedFieldsWithEllipsis: hasOmittedFields,
    };

    // Normalize for comparison
    const normalizedExpected = normalizeForComparison(expectedFormatted);
    const normalizedActual = normalizeForComparison(actualFormatted);

    // Perform comparison
    const isEqual = areObjectsEqual(
      normalizedExpected,
      normalizedActual,
      comparisonOptions
    );

    if (isEqual) {
      return ComparisonResult.success();
    } else {
      // Use detailed comparison for better error messages
      return this._buildDetailedComparisonErrors(
        normalizedExpected,
        normalizedActual,
        comparisonOptions
      );
    }
  }

  /**
   * Builds detailed comparison errors using unordered array analysis when applicable.
   *
   * @private
   * @param {*} expected - Expected value (normalized)
   * @param {*} actual - Actual value (normalized)
   * @param {Object} comparisonOptions - Comparison options
   * @returns {ComparisonResult} Detailed comparison result with errors
   */
  static _buildDetailedComparisonErrors(expected, actual, comparisonOptions) {
    // For unordered array comparison, use detailed analysis
    if (Array.isArray(expected) && Array.isArray(actual) && comparisonOptions.comparisonType === 'unordered') {
      // Check if lengths match first - use detailed comparison for better error message
      if (expected.length !== actual.length) {
        const detailedResult = compareWithDetails(expected, actual, 'root', comparisonOptions);
        const errorMessage = detailedResult.errors.map(err => err.toString()).join('\n\n');
        return ComparisonResult.failure('root', expected, actual, errorMessage);
      }

      // Use unordered array analysis for detailed error reporting
      const analysis = analyzeUnorderedMismatch(
        expected,
        actual,
        (exp, act, path) => compareWithDetails(exp, act, path, comparisonOptions),
        'root'
      );

      // Build detailed error messages
      const errors = buildUnorderedArrayErrors(analysis, expected, actual, 'root');

      // Format errors into a single message
      const errorMessage = errors.map(err => err.toString()).join('\n\n');

      return ComparisonResult.failure('root', expected, actual, errorMessage);
    }

    // For non-array or ordered comparison, use detailed comparison
    const detailedResult = compareWithDetails(expected, actual, 'root', comparisonOptions);

    if (detailedResult.errors.length > 0) {
      const errorMessage = detailedResult.errors.map(err => err.toString()).join('\n\n');
      return ComparisonResult.failure('root', expected, actual, errorMessage);
    }

    // Fallback to basic error message
    return ComparisonResult.failure(
      'root',
      expected,
      actual,
      'Output does not match expected (no detailed errors available)'
    );
  }
}

module.exports = { MongoshComparisonEngine };

