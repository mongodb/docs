const { areObjectsEqual } = require('./areObjectsEqual');
const {
  ComparisonResult,
  ErrorMessageBuilder,
} = require('./errorReporting');
const {
  readAndParseFile,
  parseExpectedOutput,
  normalizeForComparison,
  ensureComparableFormat,
} = require('./fileParser');
const {
  ContentAnalyzer,
  ContentType,
  ComparisonStrategy,
} = require('./ContentAnalyzer');
const {
  analyzeUnorderedMismatch,
  buildUnorderedArrayErrors,
} = require('./unorderedArrayAnalysis');
const { compareWithDetails } = require('./detailedComparison');
const path = require('path');

/**
 * ComparisonEngine orchestrates the comparison of expected and actual values
 * with intelligent content detection and detailed error reporting.
 */
class ComparisonEngine {
  /**
   * Compares expected and actual values with automatic content type detection.
   *
   * @param {*} expected - Expected value (can be file path, string, object, array, etc.)
   * @param {*} actual - Actual value from test execution
   * @param {Object} [options={}] - Comparison options
   * @param {string} [options.arrayComparison='unordered'] - 'ordered' or 'unordered'
   * @param {string[]} [options.ignoreFields=[]] - Fields to ignore during comparison
   * @param {string} [options.baseDir] - Base directory for resolving file paths
   * @returns {ComparisonResult} Result with success status and error details
   */
  static compare(expected, actual, options = {}) {
    // Detect content types
    const baseDir = options.baseDir || path.resolve(__dirname, '../../examples');
    const expectedType = ContentAnalyzer.detectType(expected, baseDir);
    const actualType = ContentAnalyzer.detectType(actual);

    // Analyze patterns
    const patterns = ContentAnalyzer.analyzePatterns(expected);

    // Select and execute comparison strategy
    const strategy = ContentAnalyzer.selectStrategy(
      expectedType,
      actualType,
      patterns
    );

    try {
      return this._executeStrategy(
        strategy,
        expected,
        actual,
        expectedType,
        actualType,
        options,
        baseDir
      );
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
   * Executes the appropriate comparison strategy.
   *
   * @private
   * @param {string} strategy - The comparison strategy to use
   * @param {*} expected - Expected value
   * @param {*} actual - Actual value
   * @param {string} expectedType - Detected type of expected value
   * @param {string} actualType - Detected type of actual value
   * @param {Object} options - Comparison options
   * @param {string} baseDir - Base directory for file resolution
   * @returns {ComparisonResult} Comparison result
   */
  static _executeStrategy(
    strategy,
    expected,
    actual,
    expectedType,
    actualType,
    options,
    baseDir
  ) {
    switch (strategy) {
      case ComparisonStrategy.FILE_TO_ANY:
        return this._compareFileToAny(expected, actual, options, baseDir);

      case ComparisonStrategy.PATTERN_TO_OBJECT:
        return this._comparePatternToObject(expected, actual, options);

      case ComparisonStrategy.STRUCTURAL:
        return this._compareStructural(expected, actual, options);

      case ComparisonStrategy.TEXT_WITH_NORMALIZATION:
        return this._compareTextWithNormalization(expected, actual, options);

      case ComparisonStrategy.PRIMITIVE:
        return this._comparePrimitive(expected, actual);

      default:
        return ComparisonResult.failure(
          'root',
          expected,
          actual,
          `Unknown comparison strategy: ${strategy}`
        );
    }
  }

  /**
   * Compares a file path against actual data.
   *
   * @private
   */
  static _compareFileToAny(filepath, actual, options, baseDir) {
    // Read and parse the file
    const parseResult = readAndParseFile(filepath, baseDir);

    if (!parseResult.success) {
      return ComparisonResult.failure(
        'root',
        filepath,
        actual,
        ErrorMessageBuilder.fileParseError(filepath, parseResult.error)
      );
    }

    const expectedData = parseResult.data;
    const hasOmittedFields = parseResult.hasOmittedFields;

    // Ensure comparable formats
    const { expected, actual: actualFormatted } = ensureComparableFormat(
      expectedData,
      actual
    );

    // Build comparison options
    const comparisonOptions = {
      comparisonType: options.arrayComparison || 'unordered',
      ignoreFieldValues: options.ignoreFields || options.ignoreFieldValues || [],
      allowOmittedFieldsWithEllipsis: hasOmittedFields,
    };

    // Normalize for comparison
    const normalizedExpected = normalizeForComparison(expected);
    const normalizedActual = normalizeForComparison(actualFormatted);

    // Perform comparison using existing areObjectsEqual
    const isEqual = areObjectsEqual(
      normalizedExpected,
      normalizedActual,
      comparisonOptions
    );

    if (isEqual) {
      return ComparisonResult.success();
    } else {
      // If comparing arrays with unordered comparison, use detailed analysis
      if (
        Array.isArray(normalizedExpected) &&
        Array.isArray(normalizedActual) &&
        comparisonOptions.comparisonType === 'unordered'
      ) {
        return this._analyzeUnorderedArrayFailure(
          normalizedExpected,
          normalizedActual,
          'root',
          comparisonOptions
        );
      }

      return ComparisonResult.failure(
        'root',
        normalizedExpected,
        normalizedActual,
        'Values do not match'
      );
    }
  }

  /**
   * Compares a pattern string against an object.
   *
   * @private
   */
  static _comparePatternToObject(patternString, actual, options) {
    // Parse the pattern string as if it were a file content
    const parseResult = parseExpectedOutput(patternString);

    if (!parseResult.success) {
      return ComparisonResult.failure(
        'root',
        patternString,
        actual,
        `Failed to parse pattern: ${parseResult.error.message}`
      );
    }

    const expectedData = parseResult.data;
    const hasOmittedFields = parseResult.hasOmittedFields;

    // Ensure comparable formats
    const { expected, actual: actualFormatted } = ensureComparableFormat(
      expectedData,
      actual
    );

    // Build comparison options
    const comparisonOptions = {
      comparisonType: options.arrayComparison || 'unordered',
      ignoreFieldValues: options.ignoreFields || options.ignoreFieldValues || [],
      allowOmittedFieldsWithEllipsis: hasOmittedFields,
    };

    // Normalize for comparison
    const normalizedExpected = normalizeForComparison(expected);
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
      // If comparing arrays with unordered comparison, use detailed analysis
      if (
        Array.isArray(normalizedExpected) &&
        Array.isArray(normalizedActual) &&
        comparisonOptions.comparisonType === 'unordered'
      ) {
        return this._analyzeUnorderedArrayFailure(
          normalizedExpected,
          normalizedActual,
          'root',
          comparisonOptions
        );
      }

      return ComparisonResult.failure(
        'root',
        normalizedExpected,
        normalizedActual,
        'Pattern does not match'
      );
    }
  }

  /**
   * Compares two structured values (objects or arrays).
   *
   * @private
   */
  static _compareStructural(expected, actual, options) {
    // Check if expected contains ellipsis patterns
    const patterns = ContentAnalyzer.analyzePatterns(expected);

    // Build comparison options
    const comparisonOptions = {
      comparisonType: options.arrayComparison || 'unordered',
      ignoreFieldValues: options.ignoreFields || options.ignoreFieldValues || [],
      allowOmittedFieldsWithEllipsis: patterns.hasEllipsis,
    };

    // Normalize for comparison
    const normalizedExpected = normalizeForComparison(expected);
    const normalizedActual = normalizeForComparison(actual);

    // Perform comparison
    const isEqual = areObjectsEqual(
      normalizedExpected,
      normalizedActual,
      comparisonOptions
    );

    if (isEqual) {
      return ComparisonResult.success();
    } else {
      // If comparing arrays with unordered comparison, use detailed analysis
      if (
        Array.isArray(normalizedExpected) &&
        Array.isArray(normalizedActual) &&
        comparisonOptions.comparisonType === 'unordered'
      ) {
        return this._analyzeUnorderedArrayFailure(
          normalizedExpected,
          normalizedActual,
          'root',
          comparisonOptions
        );
      }

      return ComparisonResult.failure(
        'root',
        normalizedExpected,
        normalizedActual,
        'Values do not match'
      );
    }
  }

  /**
   * Analyzes unordered array comparison failure to provide detailed error information.
   *
   * @private
   * @param {Array} expected - Expected array
   * @param {Array} actual - Actual array
   * @param {string} path - Current path in data structure
   * @param {Object} options - Comparison options
   * @returns {ComparisonResult} Result with detailed errors
   */
  static _analyzeUnorderedArrayFailure(expected, actual, path, options) {
    // Check array lengths first
    if (expected.length !== actual.length) {
      return ComparisonResult.failure(
        path,
        expected,
        actual,
        `Array length mismatch: expected ${expected.length} elements, got ${actual.length}`
      );
    }

    // Perform detailed analysis
    const compareElementFn = (exp, act, elemPath) => {
      return compareWithDetails(exp, act, elemPath, options);
    };

    const analysis = analyzeUnorderedMismatch(
      expected,
      actual,
      compareElementFn,
      path
    );

    // Build detailed error messages
    const errors = buildUnorderedArrayErrors(analysis, expected, actual, path);

    // Return a ComparisonResult with all errors
    return new ComparisonResult(false, errors);
  }

  /**
   * Compares two text values with normalization.
   *
   * @private
   */
  static _compareTextWithNormalization(expected, actual, options) {
    // Normalize whitespace and line endings
    const normalizeText = (text) => {
      if (typeof text !== 'string') {
        text = String(text);
      }
      return text
        .trim()
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n')
        .replace(/\s+$/gm, ''); // Trim trailing whitespace from each line
    };

    const normalizedExpected = normalizeText(expected);
    const normalizedActual = normalizeText(actual);

    if (normalizedExpected === normalizedActual) {
      return ComparisonResult.success();
    } else {
      return ComparisonResult.failure(
        'root',
        normalizedExpected,
        normalizedActual,
        'Text content does not match'
      );
    }
  }

  /**
   * Compares two primitive values.
   *
   * @private
   */
  static _comparePrimitive(expected, actual) {
    if (expected === actual) {
      return ComparisonResult.success();
    } else {
      return ComparisonResult.failure(
        'root',
        expected,
        actual,
        ErrorMessageBuilder.valueMismatch(expected, actual)
      );
    }
  }
}

module.exports = {
  ComparisonEngine,
};

