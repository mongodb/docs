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

  /**
   * Creates a user-friendly error message for file not found errors.
   *
   * @param {string} filepath - The file path that was not found
   * @param {string} baseDir - The base directory used for resolution
   * @param {string} [context='expected output'] - Context of what the file contains
   * @returns {string} Error message with troubleshooting tips
   */
  static fileNotFound(filepath, baseDir, context = 'expected output') {
    const path = require('path');
    const resolvedPath = path.isAbsolute(filepath)
      ? filepath
      : path.resolve(baseDir, filepath);

    return (
      `File not found: "${filepath}"\n\n` +
      `Resolved path: ${resolvedPath}\n` +
      `Base directory: ${baseDir}\n\n` +
      `💡 Troubleshooting tips:\n` +
      `   • Check that the file path is correct relative to the examples directory\n` +
      `   • Verify the file exists at the resolved path shown above\n` +
      `   • Make sure the file extension is included (e.g., ".sh" for ${context} files)`
    );
  }

  /**
   * Creates a user-friendly error message for MongoDB connection failures.
   *
   * @param {Error} error - The connection error
   * @param {string} port - The port that was attempted
   * @param {string} [connectionString] - The connection string (optional)
   * @returns {string} Error message with troubleshooting tips
   */
  static connectionError(error, port, connectionString) {
    const errorMessage = error.message || String(error);

    // Check for common connection error patterns
    const isConnectionRefused = errorMessage.includes('ECONNREFUSED') ||
                                errorMessage.includes('connect ECONNREFUSED');
    const isTimeout = errorMessage.includes('timeout') ||
                     errorMessage.includes('ETIMEDOUT');
    const isAuthError = errorMessage.includes('Authentication') ||
                       errorMessage.includes('auth');

    let message = `Failed to connect to MongoDB\n\n`;
    message += `Error: ${errorMessage}\n\n`;

    if (isConnectionRefused) {
      message += `❌ Connection refused - MongoDB is not running or not accessible\n\n`;
      message += `💡 Troubleshooting tips:\n`;
      message += `   • Ensure MongoDB is running on port ${port}\n`;
      message += `   • Check that the port number is correct in your .env file\n`;
      message += `   • Verify no firewall is blocking the connection\n`;
      message += `   • Try connecting manually: mongosh --port ${port}`;
    } else if (isTimeout) {
      message += `⏱️  Connection timeout - MongoDB is not responding\n\n`;
      message += `💡 Troubleshooting tips:\n`;
      message += `   • Check that MongoDB is running and responsive\n`;
      message += `   • Verify the connection string is correct\n`;
      message += `   • Check network connectivity to the MongoDB server`;
    } else if (isAuthError) {
      message += `🔒 Authentication failed\n\n`;
      message += `💡 Troubleshooting tips:\n`;
      message += `   • Verify your MongoDB credentials are correct\n`;
      message += `   • Check the CONNECTION_STRING in your .env file\n`;
      message += `   • Ensure the user has proper permissions`;
    } else {
      message += `💡 Troubleshooting tips:\n`;
      message += `   • Verify MongoDB is running: mongosh --port ${port}\n`;
      message += `   • Check your .env file configuration:\n`;
      message += `     - CONNECTION_STRING should be a valid MongoDB URI\n`;
      message += `     - CONNECTION_PORT should match your MongoDB port (default: 27017)\n`;
      if (connectionString) {
        message += `   • Current connection string: ${connectionString}`;
      }
    }

    return message;
  }

  /**
   * Creates a user-friendly error message for mongosh execution failures.
   *
   * @param {Error} error - The execution error
   * @param {string} command - The mongosh command that was executed
   * @param {string} [stderr] - Standard error output from mongosh
   * @returns {string} Error message with troubleshooting tips
   */
  static mongoshExecutionError(error, command, stderr) {
    let message = `Failed to execute mongosh command\n\n`;
    message += `Command: ${command}\n`;
    message += `Error: ${error.message}\n`;

    if (stderr && stderr.trim()) {
      message += `\nMongosh stderr:\n${stderr}\n`;
    }

    // Check for common error patterns
    const errorText = (error.message + (stderr || '')).toLowerCase();

    if (errorText.includes('econnrefused') || errorText.includes('connection refused')) {
      message += `\n❌ Cannot connect to MongoDB\n\n`;
      message += `💡 This is likely a connection issue. Please:\n`;
      message += `   • Ensure MongoDB is running\n`;
      message += `   • Verify the CONNECTION_STRING and CONNECTION_PORT in your .env file\n`;
      message += `   • Check that the port matches your MongoDB instance\n`;
      message += `   • Try connecting manually with: ${command}`;
    } else if (errorText.includes('command not found') || errorText.includes('mongosh: not found')) {
      message += `\n❌ mongosh command not found\n\n`;
      message += `💡 Please install mongosh:\n`;
      message += `   • Visit: https://www.mongodb.com/docs/mongodb-shell/install/\n`;
      message += `   • Or use: brew install mongosh (on macOS)`;
    } else {
      message += `\n💡 Troubleshooting tips:\n`;
      message += `   • Check that the .js file being executed is valid JavaScript\n`;
      message += `   • Verify MongoDB is accessible\n`;
      message += `   • Review the error message above for specific issues`;
    }

    return message;
  }

  /**
   * Creates a user-friendly error message for temp file formation issues.
   * This indicates a problem with the test utility itself, not the user's code.
   *
   * @param {string} filepath - The code example file path
   * @param {string} issue - Description of the issue detected
   * @param {string} [tempFilePath] - Path to the generated temp file (if available)
   * @param {string} [tempFileContent] - Content of the temp file (if available)
   * @returns {string} Error message directing user to DevDocs team
   */
  static tempFileFormationError(filepath, issue, tempFilePath, tempFileContent) {
    let message = `⚠️  Test Utility Issue Detected\n\n`;
    message += `The test utility encountered a problem while preparing your code example for testing.\n`;
    message += `This is likely an issue with the test utility itself, not your code.\n\n`;

    message += `📄 Code example file: ${filepath}\n`;
    message += `❌ Issue detected: ${issue}\n\n`;

    if (tempFilePath) {
      message += `Generated temp file: ${tempFilePath}\n\n`;
    }

    if (tempFileContent) {
      message += `Generated temp file content:\n`;
      message += `${'='.repeat(60)}\n`;
      message += tempFileContent;
      message += `\n${'='.repeat(60)}\n\n`;
    }

    message += `🆘 What to do:\n`;
    message += `   1. This is NOT an error in your code example\n`;
    message += `   2. The test utility may need to be updated to handle your code format\n`;
    message += `   3. Please reach out to the DevDocs team for assistance:\n`;
    message += `      • Share this error message\n`;
    message += `      • Include the code example file: ${filepath}\n`;
    message += `      • Mention what type of mongosh operation you're testing\n\n`;

    message += `💡 Common causes:\n`;
    message += `   • Code example uses a mongosh pattern the utility doesn't recognize\n`;
    message += `   • Code formatting differs from expected patterns\n`;
    message += `   • New mongosh syntax not yet supported by the utility\n\n`;

    message += `The DevDocs team will update the utility to support your code example format.`;

    return message;
  }

  /**
   * Creates a user-friendly error message for syntax errors in generated temp files.
   *
   * @param {string} filepath - The code example file path
   * @param {string} syntaxError - The syntax error message from mongosh
   * @param {string} [tempFilePath] - Path to the generated temp file
   * @param {string} [tempFileContent] - Content of the temp file
   * @returns {string} Error message with debugging guidance
   */
  static tempFileSyntaxError(filepath, syntaxError, tempFilePath, tempFileContent) {
    let message = `⚠️  Syntax Error in Generated Test File\n\n`;
    message += `The test utility generated a file with syntax errors.\n`;
    message += `This could be an issue with your code example OR the test utility.\n\n`;

    message += `📄 Code example file: ${filepath}\n`;
    message += `❌ Syntax error: ${syntaxError}\n\n`;

    if (tempFilePath) {
      message += `Generated temp file: ${tempFilePath}\n\n`;
    }

    if (tempFileContent) {
      message += `Generated temp file content:\n`;
      message += `${'='.repeat(60)}\n`;
      message += tempFileContent;
      message += `\n${'='.repeat(60)}\n\n`;
    }

    message += `🔍 Debugging steps:\n`;
    message += `   1. Check if your code example has valid JavaScript syntax\n`;
    message += `   2. Review the generated temp file content above\n`;
    message += `   3. Look for issues like:\n`;
    message += `      • Missing or extra parentheses/brackets\n`;
    message += `      • Incorrect wrapping of your code in printjson()\n`;
    message += `      • Malformed connection string\n\n`;

    message += `💡 If your code example looks correct:\n`;
    message += `   • The test utility may be incorrectly wrapping your code\n`;
    message += `   • Reach out to the DevDocs team with this error message\n`;
    message += `   • Include your code example file: ${filepath}\n\n`;

    message += `💡 If your code example has syntax errors:\n`;
    message += `   • Fix the syntax in your code example file\n`;
    message += `   • Make sure it's valid mongosh JavaScript\n`;
    message += `   • Test it manually with: mongosh --file ${filepath}`;

    return message;
  }
}

module.exports = {
  ComparisonError,
  ComparisonResult,
  PathTracker,
  ErrorMessageBuilder,
};

