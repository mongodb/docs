/**
 * Error reporting utilities for detailed comparison failure messages.
 * Provides key path tracking and human-readable error descriptions.
 */

/**
 * ComparisonError represents a single comparison failure with context.
 */
class ComparisonError {
  constructor(keyPath, expected, actual, message) {
    this.keyPath = keyPath;
    this.expected = expected;
    this.actual = actual;
    this.message = message;
  }

  /**
   * Formats the error as a human-readable string.
   *
   * @returns {string} Formatted error message
   */
  toString() {
    const path = this.keyPath || 'root';
    const expectedStr = this._formatValue(this.expected);
    const actualStr = this._formatValue(this.actual);

    return `Comparison failed at ${path}:\n  ${this.message}\n  Expected: ${expectedStr}\n  Actual: ${actualStr}`;
  }

  /**
   * Formats a value for display in error messages.
   *
   * @private
   * @param {*} value - The value to format
   * @returns {string} Formatted value string
   */
  _formatValue(value) {
    if (value === undefined) return 'undefined';
    if (value === null) return 'null';

    try {
      const str = JSON.stringify(value, null, 2);
      // Truncate very long values
      if (str.length > 200) {
        return str.substring(0, 200) + '...';
      }
      return str;
    } catch {
      return String(value);
    }
  }
}

/**
 * ComparisonResult holds the outcome of a comparison operation.
 */
class ComparisonResult {
  constructor(isMatch, errors = []) {
    this.isMatch = isMatch;
    this.errors = errors;
  }

  /**
   * Creates a successful comparison result.
   *
   * @returns {ComparisonResult} Success result
   */
  static success() {
    return new ComparisonResult(true, []);
  }

  /**
   * Creates a failed comparison result.
   *
   * @param {string} keyPath - Path to the failed comparison
   * @param {*} expected - Expected value
   * @param {*} actual - Actual value
   * @param {string} message - Error message
   * @returns {ComparisonResult} Failure result
   */
  static failure(keyPath, expected, actual, message) {
    const error = new ComparisonError(keyPath, expected, actual, message);
    return new ComparisonResult(false, [error]);
  }

  /**
   * Gets a formatted error summary for all errors.
   *
   * @returns {string} Formatted error summary
   */
  getErrorSummary() {
    if (this.isMatch) {
      return 'Comparison succeeded';
    }

    if (this.errors.length === 0) {
      return 'Comparison failed (no details available)';
    }

    if (this.errors.length === 1) {
      return this.errors[0].toString();
    }

    return `Comparison failed with ${this.errors.length} errors:\n\n` +
      this.errors.map((err, i) => `${i + 1}. ${err.toString()}`).join('\n\n');
  }
}

/**
 * PathTracker helps build key paths for nested comparisons.
 */
class PathTracker {
  constructor(basePath = '') {
    this.path = basePath;
  }

  /**
   * Creates a new PathTracker for a nested property.
   *
   * @param {string|number} key - Property key or array index
   * @returns {PathTracker} New PathTracker with extended path
   */
  extend(key) {
    if (this.path === '') {
      return new PathTracker(String(key));
    }
    if (typeof key === 'number') {
      return new PathTracker(`${this.path}[${key}]`);
    }
    return new PathTracker(`${this.path}.${key}`);
  }

  /**
   * Gets the current path as a string.
   *
   * @returns {string} Current path
   */
  toString() {
    return this.path || 'root';
  }
}

/**
 * Creates detailed error messages for specific comparison scenarios.
 */
class ErrorMessageBuilder {
  /**
   * Creates an error message for type mismatches.
   *
   * @param {*} expected - Expected value
   * @param {*} actual - Actual value
   * @returns {string} Error message
   */
  static typeMismatch(expected, actual) {
    const expectedType = Array.isArray(expected) ? 'array' : typeof expected;
    const actualType = Array.isArray(actual) ? 'array' : typeof actual;
    return `Type mismatch: expected ${expectedType} but got ${actualType}`;
  }

  /**
   * Creates an error message for length mismatches.
   *
   * @param {number} expectedLength - Expected array length
   * @param {number} actualLength - Actual array length
   * @returns {string} Error message
   */
  static lengthMismatch(expectedLength, actualLength) {
    return `Array length mismatch: expected ${expectedLength} elements but got ${actualLength}`;
  }

  /**
   * Creates an error message for missing keys.
   *
   * @param {string} key - Missing key name
   * @returns {string} Error message
   */
  static missingKey(key) {
    return `Missing expected key: "${key}"`;
  }

  /**
   * Creates an error message for extra keys.
   *
   * @param {string[]} keys - Extra key names
   * @returns {string} Error message
   */
  static extraKeys(keys) {
    const keyList = keys.map(k => `"${k}"`).join(', ');
    return `Unexpected extra keys: ${keyList}`;
  }

  /**
   * Creates an error message for value mismatches.
   *
   * @param {*} expected - Expected value
   * @param {*} actual - Actual value
   * @returns {string} Error message
   */
  static valueMismatch(expected, actual) {
    return `Value mismatch`;
  }

  /**
   * Creates an error message for file parsing errors.
   *
   * @param {string} filepath - File path that failed to parse
   * @param {Error} error - Parse error
   * @returns {string} Error message
   */
  static fileParseError(filepath, error) {
    return `Failed to parse expected output file "${filepath}": ${error.message}`;
  }

  /**
   * Creates an error message for pattern matching failures.
   *
   * @param {string} pattern - Pattern that failed to match
   * @returns {string} Error message
   */
  static patternMismatch(pattern) {
    return `Pattern "${pattern}" did not match`;
  }
}

module.exports = {
  ComparisonError,
  ComparisonResult,
  PathTracker,
  ErrorMessageBuilder,
};

