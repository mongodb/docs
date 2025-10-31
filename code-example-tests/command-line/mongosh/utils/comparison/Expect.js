const { MongoshComparisonEngine } = require('./MongoshComparisonEngine');
const { ErrorMessageBuilder } = require('./errorReporting');
const { exec } = require('child_process');
const path = require('path');
const makeTempFileForTesting = require('../makeTempFileForTesting');

/**
 * Expect provides a fluent API for comparing mongosh code example outputs.
 *
 * Designed specifically for non-developer technical writers to easily write
 * and maintain tests for MongoDB documentation code examples.
 *
 * @example
 * // Execute mongosh examples and compare output (recommended for technical writers)
 * await Expect
 *   .outputFromExampleFiles([
 *     'aggregation/load-data.js',
 *     'aggregation/run-pipeline.js'
 *   ])
 *   .withDbName('test-db')
 *   .shouldMatch('aggregation/output.sh');
 *
 * @example
 * // With comparison options
 * await Expect
 *   .outputFromExampleFiles(['query.js'])
 *   .withDbName('test-db')
 *   .withIgnoredFields('_id', 'timestamp')
 *   .withOrderedSort()
 *   .shouldMatch('output.sh');
 *
 * @example
 * // Direct output comparison (advanced usage)
 * Expect.that(actualOutput).shouldMatch('expected-output.sh');
 *
 * @example
 * // With ignored fields for dynamic values
 * Expect.that(actualOutput)
 *   .withIgnoredFields('_id', 'timestamp')
 *   .shouldMatch('expected-output.sh');
 */
class Expect {
  /**
   * Creates a new Expect instance.
   *
   * @private
   * @param {string|*} actual - The actual output (or null if executing files)
   * @param {Object} config - Configuration for file execution mode
   */
  constructor(actual = null, config = {}) {
    this._actual = actual;
    this._config = config;
    this._options = {
      arrayComparison: 'unordered', // Default to unordered
      ignoreFields: [],
    };
    this._mode = actual === null ? 'file-execution' : 'direct-comparison';
  }

  /**
   * Static factory method to create an Expect instance from example files.
   * This is the recommended approach for technical writers.
   *
   * Automatically handles:
   * - Reading CONNECTION_STRING and CONNECTION_PORT from environment
   * - Creating temporary test files
   * - Executing mongosh commands
   * - Capturing output for comparison
   *
   * @param {string[]} files - Array of file paths relative to examples directory
   * @returns {Expect} A new Expect instance configured for file execution
   *
   * @example
   * await Expect
   *   .outputFromExampleFiles([
   *     'aggregation/load-data.js',
   *     'aggregation/run-pipeline.js'
   *   ])
   *   .withDbName('test-db')
   *   .shouldMatch('aggregation/output.sh');
   */
  static outputFromExampleFiles(files) {
    if (!Array.isArray(files) || files.length === 0) {
      throw new Error('outputFromExampleFiles requires a non-empty array of file paths');
    }
    return new Expect(null, { files });
  }

  /**
   * Static factory method to create an Expect instance from actual output.
   * This is for advanced usage when you already have the output captured.
   *
   * @param {string|*} actual - The actual output from mongosh execution
   * @returns {Expect} A new Expect instance for method chaining
   *
   * @example
   * Expect.that(stdout).shouldMatch('output.sh');
   */
  static that(actual) {
    return new Expect(actual);
  }

  /**
   * Configures the comparison to use unordered array matching (default).
   * Arrays will be compared without regard to element order.
   *
   * This is the default behavior, so calling this method is optional.
   * It's provided for explicitness and API consistency.
   *
   * @returns {Expect} This instance for method chaining
   *
   * @example
   * Expect.that([{a: 1}, {b: 2}])
   *   .withUnorderedSort()
   *   .shouldMatch([{b: 2}, {a: 1}]); // Passes - order doesn't matter
   */
  withUnorderedSort() {
    this._options.arrayComparison = 'unordered';
    return this;
  }

  /**
   * Configures the comparison to use ordered array matching.
   * Arrays will be compared with strict element-by-element ordering.
   *
   * Use this when the order of results matters, such as when verifying
   * that a sort operation produces correctly ordered output.
   *
   * @returns {Expect} This instance for method chaining
   *
   * @example
   * // Verify sort order is correct
   * Expect.that(actualOutput)
   *   .withOrderedSort()
   *   .shouldMatch('sorted-output.sh'); // Order matters
   */
  withOrderedSort() {
    this._options.arrayComparison = 'ordered';
    return this;
  }

  /**
   * Configures fields to ignore during value comparison.
   *
   * This is particularly useful for dynamic fields that change between
   * test runs, such as:
   * - `_id` (auto-generated ObjectIds)
   * - `timestamp` or date fields with current time
   * - `uuid` or other randomly generated values
   *
   * Note: The field must still exist in both actual and expected output.
   * This option only ignores the *value* comparison for these fields.
   *
   * @param {...string} fields - Field names to ignore (variable arguments)
   * @returns {Expect} This instance for method chaining
   *
   * @example
   * // Ignore dynamic _id and timestamp values
   * Expect.that(actualOutput)
   *   .withIgnoredFields('_id', 'createdAt', 'updatedAt')
   *   .shouldMatch('output.sh');
   *
   * @example
   * // Expected output can use ellipsis for ignored field values
   * // In output.sh:
   * // { _id: "...", name: "test", timestamp: "..." }
   * Expect.that(actualOutput)
   *   .shouldMatch('output.sh');
   */
  withIgnoredFields(...fields) {
    this._options.ignoreFields = fields;
    return this;
  }

  /**
   * Specifies the database name to use when executing example files.
   * Only applicable when using outputFromExampleFiles().
   *
   * @param {string} dbName - The database name to use
   * @returns {Expect} This instance for method chaining
   *
   * @example
   * await Expect
   *   .outputFromExampleFiles(['query.js'])
   *   .withDbName('test-db')
   *   .shouldMatch('output.sh');
   */
  withDbName(dbName) {
    if (this._mode !== 'file-execution') {
      throw new Error('withDbName() can only be used with outputFromExampleFiles()');
    }
    this._config.dbName = dbName;
    return this;
  }

  /**
   * Performs the comparison and throws an error if values don't match.
   * This is the terminal operation in the fluent API chain.
   *
   * When used with outputFromExampleFiles(), this method:
   * - Executes the example files in mongosh
   * - Captures the output
   * - Compares against the expected output file
   * - Returns a Promise that resolves on success or rejects on failure
   *
   * When used with that(), this method:
   * - Compares the provided actual output directly
   * - Throws synchronously on failure
   *
   * The comparison automatically:
   * - Detects whether expected is a file path or direct value
   * - Parses mongosh output strings
   * - Normalizes MongoDB types (ObjectId, ISODate, Decimal128, etc.)
   * - Applies ellipsis pattern matching
   * - Provides detailed error messages on failure
   *
   * Expected Output File Format:
   * - Multiple objects can be separated by newlines (no array wrapper needed)
   * - Use MongoDB shell syntax (unquoted keys, single quotes, etc.)
   * - Use `...` for flexible matching:
   *   - Property level: `{ _id: "...", name: "test" }` - matches any _id value
   *   - Standalone: `...` on its own line - all objects allow extra fields
   *     (parser automatically adds {"...": "..."} to each object)
   *
   * @param {string|*} expected - Expected value
   *                              - String: treated as file path if file exists
   *                              - Object/Array: compared directly
   * @returns {Promise<void>|void} Promise when using outputFromExampleFiles(), void otherwise
   * @throws {Error} If the comparison fails
   *
   * @example
   * // Execute and compare (returns Promise)
   * await Expect
   *   .outputFromExampleFiles(['query.js'])
   *   .withDbName('test-db')
   *   .shouldMatch('output.sh');
   *
   * @example
   * // Direct comparison (synchronous)
   * Expect.that(stdout).shouldMatch('aggregation/output.sh');
   *
   * @example
   * // With ellipsis in expected output file (output.sh):
   * // { _id: "...", name: "Carl", dateofbirth: ISODate("...") }
   * // { _id: "...", name: "Olive", dateofbirth: ISODate("...") }
   * Expect.that(stdout).shouldMatch('output.sh');
   */
  shouldMatch(expected) {
    if (this._mode === 'file-execution') {
      return this._executeAndCompare(expected);
    } else {
      return this._compareDirectly(expected);
    }
  }

  /**
   * Executes example files and compares output.
   *
   * @private
   * @param {string|*} expected - Expected output
   */
  async _executeAndCompare(expected) {
    // Validate configuration
    if (!this._config.dbName) {
      throw new Error('Database name is required. Use .withDbName(dbName)');
    }

    // Read environment variables
    const mongoUri = process.env.CONNECTION_STRING;
    const port = process.env.CONNECTION_PORT;

    if (!mongoUri || !port) {
      throw new Error(
        'CONNECTION_STRING and CONNECTION_PORT environment variables are required.\n' +
        'Make sure your .env file is configured correctly.'
      );
    }

    // Create temporary file with all example files combined
    const tempFilePath = makeTempFileForTesting({
      connectionString: mongoUri,
      dbName: this._config.dbName,
      filepath: this._config.files,
      validateOutput: true,
    });

    // Execute mongosh command with proper handle cleanup
    return new Promise((resolve, reject) => {
      const command = `mongosh --file ${tempFilePath} --port ${port}`;
      const childProcess = exec(
        command,
        { maxBuffer: 10 * 1024 * 1024 }, // 10MB buffer
        (error, stdout, stderr) => {
          // Cleanup function to recursively delete temp directory
          const cleanup = () => {
            try {
              const fs = require('fs');
              const path = require('path');
              const tempDirPath = path.resolve(__dirname, '../../temp');

              // Recursively delete the temp directory and all its contents
              if (fs.existsSync(tempDirPath)) {
                fs.rmSync(tempDirPath, { recursive: true, force: true });
              }
            } catch (cleanupError) {
              // Silently ignore cleanup errors - don't fail the test for cleanup issues
              console.warn('[Expect] Failed to cleanup temp directory:', cleanupError.message);
            }
          };

          if (stderr && stderr.trim()) {
            console.error('[Expect] mongosh stderr:', stderr);
          }

          if (error) {
            // Check if this is a syntax error in the generated temp file
            const stderrText = (stderr || '').toLowerCase();
            const errorText = error.message.toLowerCase();
            const isSyntaxError = stderrText.includes('syntaxerror') ||
                                  errorText.includes('syntaxerror') ||
                                  stderrText.includes('unexpected token') ||
                                  errorText.includes('unexpected token');

            let errorMessage;
            if (isSyntaxError) {
              // Read the temp file content for debugging
              const fs = require('fs');
              let tempFileContent = '';
              try {
                tempFileContent = fs.readFileSync(tempFilePath, 'utf8');
              } catch (readError) {
                // If we can't read the file, just use the original error
              }

              const filepath = Array.isArray(this._config.files)
                ? this._config.files.join(', ')
                : this._config.files;

              errorMessage = ErrorMessageBuilder.tempFileSyntaxError(
                filepath,
                stderr || error.message,
                tempFilePath,
                tempFileContent
              );
            } else {
              errorMessage = ErrorMessageBuilder.mongoshExecutionError(
                error,
                command,
                stderr
              );
            }

            cleanup(); // Clean up before rejecting
            reject(new Error(errorMessage));
            return;
          }

          try {
            // Compare output
            this._compareDirectly(expected, stdout);
            cleanup(); // Clean up on success
            resolve();
          } catch (comparisonError) {
            cleanup(); // Clean up on comparison failure
            reject(comparisonError);
          }
        }
      );

      // Ensure child process is properly cleaned up
      childProcess.on('exit', () => {
        if (childProcess.stdin) childProcess.stdin.destroy();
        if (childProcess.stdout) childProcess.stdout.destroy();
        if (childProcess.stderr) childProcess.stderr.destroy();
      });
    });
  }

  /**
   * Compares output directly without executing files.
   *
   * @private
   * @param {string|*} expected - Expected output
   * @param {string|*} actual - Actual output (defaults to this._actual)
   */
  _compareDirectly(expected, actual = this._actual) {
    // Set base directory to examples folder
    const optionsWithBaseDir = {
      ...this._options,
      baseDir: path.resolve(__dirname, '../../examples'),
    };

    const result = MongoshComparisonEngine.compare(
      expected,
      actual,
      optionsWithBaseDir
    );

    if (!result.isMatch) {
      throw new Error(result.getErrorSummary());
    }
  }
}

module.exports = Expect;

