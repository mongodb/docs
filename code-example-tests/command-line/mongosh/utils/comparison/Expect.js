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
    // Schema validation state (for shouldResemble API)
    this._comparisonType = null; // 'exact' for shouldMatch, 'schema' for shouldResemble
    this._schemaConfig = null;
    this._expectedOutputForResemble = null;
    // Track if sort order was explicitly set (for shouldResemble validation)
    this._sortOrderExplicitlySet = false;
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
   * Note: This method can only be used with shouldMatch(), not with
   * shouldResemble(). Schema-based validation doesn't compare documents
   * between expected and actual, so ordering is not applicable.
   *
   * @returns {Expect} This instance for method chaining
   * @throws {Error} If used with shouldResemble()
   *
   * @example
   * Expect.that([{a: 1}, {b: 2}])
   *   .withUnorderedSort()
   *   .shouldMatch([{b: 2}, {a: 1}]); // Passes - order doesn't matter
   */
  withUnorderedSort() {
    if (this._comparisonType === 'schema') {
      throw new Error(
        'withUnorderedSort() cannot be used with shouldResemble(). ' +
        'Schema-based validation checks document structure independently - it does not compare ' +
        'documents between expected and actual, so ordering is not applicable.'
      );
    }
    this._options.arrayComparison = 'unordered';
    this._sortOrderExplicitlySet = true;
    return this;
  }

  /**
   * Configures the comparison to use ordered array matching.
   * Arrays will be compared with strict element-by-element ordering.
   *
   * Use this when the order of results matters, such as when verifying
   * that a sort operation produces correctly ordered output.
   *
   * Note: This method can only be used with shouldMatch(), not with
   * shouldResemble(). Schema-based validation doesn't compare documents
   * between expected and actual, so ordering is not applicable.
   *
   * @returns {Expect} This instance for method chaining
   * @throws {Error} If used with shouldResemble()
   *
   * @example
   * // Verify sort order is correct
   * Expect.that(actualOutput)
   *   .withOrderedSort()
   *   .shouldMatch('sorted-output.sh'); // Order matters
   */
  withOrderedSort() {
    if (this._comparisonType === 'schema') {
      throw new Error(
        'withOrderedSort() cannot be used with shouldResemble(). ' +
        'Schema-based validation checks document structure independently - it does not compare ' +
        'documents between expected and actual, so ordering is not applicable.'
      );
    }
    this._options.arrayComparison = 'ordered';
    this._sortOrderExplicitlySet = true;
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
   * Important: This method can only be used with shouldMatch(), not with
   * shouldResemble(). The schema-based comparison in shouldResemble() validates
   * document structure and count, so ignoring fields is not applicable in
   * that context.
   *
   * @param {...string} fields - Field names to ignore (variable arguments)
   * @returns {Expect} This instance for method chaining
   * @throws {Error} If used with shouldResemble()
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
    // Check if shouldResemble() was already called
    if (this._comparisonType === 'schema') {
      throw new Error(
        'withIgnoredFields() cannot be used with shouldResemble(). ' +
        'The schema-based comparison validates document structure and count, not exact values, ' +
        'so ignoring fields is not applicable. Use shouldMatch() if you need to ignore specific field values.'
      );
    }
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
   * Sets up schema-based validation mode where exact document matching is not required.
   * Use this when the result shape and count matter, but exact document contents may vary
   * (e.g., Vector Search results, or queries where results may vary by environment).
   *
   * This is mutually exclusive with shouldMatch() - use one or the other.
   * Must be followed by withSchema() to define the validation criteria.
   *
   * Note: withIgnoredFields() is not supported with shouldResemble(). The schema-based
   * comparison doesn't perform value matching between expected and actual documents,
   * so ignoring fields doesn't make sense in this context. Use shouldMatch() if you
   * need to ignore specific field values.
   *
   * @param {string|*} expected - Expected output (file path or direct value) to validate against schema
   * @returns {Expect} This instance for method chaining (to call withSchema())
   * @throws {Error} If used with shouldMatch() or withIgnoredFields()
   *
   * @example
   * await Expect
   *   .outputFromExampleFiles(['vector-search.js'])
   *   .withDbName('test-db')
   *   .shouldResemble('vector-search/output.sh')
   *   .withSchema({
   *     count: 5,
   *     requiredFields: ['_id', 'title', 'score'],
   *     fieldValues: { category: 'electronics' }
   *   });
   */
  shouldResemble(expected) {
    if (this._comparisonType === 'exact') {
      throw new Error('shouldResemble() cannot be used with shouldMatch() - they are mutually exclusive');
    }
    // Check if withIgnoredFields() was called before shouldResemble()
    if (this._options.ignoreFields && this._options.ignoreFields.length > 0) {
      throw new Error(
        'withIgnoredFields() cannot be used with shouldResemble(). ' +
        'The schema-based comparison validates document structure and count, ' +
        'so ignoring fields is not applicable. Use shouldMatch() if you need to ignore specific field values.'
      );
    }
    // Check if sort order was explicitly set before shouldResemble()
    if (this._sortOrderExplicitlySet) {
      throw new Error(
        'withOrderedSort()/withUnorderedSort() cannot be used with shouldResemble(). ' +
        'Schema-based validation checks document structure independently - it does not compare ' +
        'documents between expected and actual, so ordering is not applicable.'
      );
    }
    this._comparisonType = 'schema';
    this._expectedOutputForResemble = expected;
    return this;
  }

  /**
   * Defines the schema validation criteria for shouldResemble().
   * This is the terminal operation when using schema-based validation.
   *
   * The schema validation:
   * - Validates BOTH the expectedOutput AND actualOutput match the schema
   * - Confirms the count of returned documents matches
   * - Ensures all documents contain the required fields
   * - Verifies field values match when fieldValues are specified
   *
   * @param {Object} schema - Schema configuration
   * @param {number} schema.count - Expected number of documents
   * @param {string[]} [schema.requiredFields] - Field names that must exist in every document
   * @param {Object} [schema.fieldValues] - Key-value pairs that must match in every document
   * @returns {Promise<void>|void} Promise when using outputFromExampleFiles(), void otherwise
   * @throws {Error} If validation fails or if used without shouldResemble()
   *
   * @example
   * // Validate 20 documents, each with required fields and a specific year value
   * await Expect
   *   .outputFromExampleFiles(['find.js'])
   *   .withDbName('movies')
   *   .shouldResemble('output.sh')
   *   .withSchema({
   *     count: 20,
   *     requiredFields: ['_id', 'title', 'year'],
   *     fieldValues: { year: 2012 }
   *   });
   */
  withSchema(schema) {
    if (this._comparisonType !== 'schema') {
      throw new Error('withSchema() requires shouldResemble() to be called first');
    }

    // Validate schema structure
    if (!schema || typeof schema !== 'object') {
      throw new Error('withSchema() requires a schema object');
    }
    if (typeof schema.count !== 'number' || schema.count < 0) {
      throw new Error('withSchema() requires a non-negative count number');
    }
    if (schema.requiredFields !== undefined && !Array.isArray(schema.requiredFields)) {
      throw new Error('withSchema() requiredFields must be an array of field names');
    }
    if (schema.fieldValues !== undefined && (typeof schema.fieldValues !== 'object' || schema.fieldValues === null)) {
      throw new Error('withSchema() fieldValues must be an object of key-value pairs');
    }

    this._schemaConfig = {
      count: schema.count,
      requiredFields: schema.requiredFields || [],
      fieldValues: schema.fieldValues || {},
    };

    // Execute validation
    if (this._mode === 'file-execution') {
      return this._executeAndValidateSchema();
    } else {
      return this._validateSchemaDirectly();
    }
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
    if (this._comparisonType === 'schema') {
      throw new Error('shouldMatch() cannot be used with shouldResemble() - they are mutually exclusive');
    }
    this._comparisonType = 'exact';

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
    // Supports both local MongoDB (mongodb://) and Atlas (mongodb+srv://) connections
    const mongoUri = process.env.CONNECTION_STRING;
    const port = process.env.CONNECTION_PORT;

    if (!mongoUri) {
      throw new Error(
        'CONNECTION_STRING environment variable is required.\n' +
        'Make sure your .env file is configured correctly.\n\n' +
        'For local MongoDB:\n' +
        '  CONNECTION_STRING="mongodb://localhost:27017"\n' +
        '  CONNECTION_PORT="27017"\n\n' +
        'For Atlas:\n' +
        '  CONNECTION_STRING="mongodb+srv://user:password@cluster.mongodb.net/"'
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
    // Use --nodb to prevent mongosh from connecting to localhost before running the script
    // Only add --port flag for non-SRV connection strings (local MongoDB)
    const isSrvConnection = mongoUri.startsWith('mongodb+srv://');
    const portFlag = (!isSrvConnection && port) ? ` --port ${port}` : '';
    return new Promise((resolve, reject) => {
      const command = `mongosh --nodb --file ${tempFilePath}${portFlag}`;
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

  /**
   * Executes example files and validates output against schema.
   *
   * @private
   */
  async _executeAndValidateSchema() {
    // Validate configuration
    if (!this._config.dbName) {
      throw new Error('Database name is required. Use .withDbName(dbName)');
    }

    // Read environment variables
    // Supports both local MongoDB (mongodb://) and Atlas (mongodb+srv://) connections
    const mongoUri = process.env.CONNECTION_STRING;
    const port = process.env.CONNECTION_PORT;

    if (!mongoUri) {
      throw new Error(
        'CONNECTION_STRING environment variable is required.\n' +
        'Make sure your .env file is configured correctly.\n\n' +
        'For local MongoDB:\n' +
        '  CONNECTION_STRING="mongodb://localhost:27017"\n' +
        '  CONNECTION_PORT="27017"\n\n' +
        'For Atlas:\n' +
        '  CONNECTION_STRING="mongodb+srv://user:password@cluster.mongodb.net/"'
      );
    }

    // Create temporary file with all example files combined
    const tempFilePath = makeTempFileForTesting({
      connectionString: mongoUri,
      dbName: this._config.dbName,
      filepath: this._config.files,
      validateOutput: true,
    });

    // Execute mongosh command
    // Use --nodb to prevent mongosh from connecting to localhost before running the script
    // Only add --port flag for non-SRV connection strings (local MongoDB)
    const isSrvConnection = mongoUri.startsWith('mongodb+srv://');
    const portFlag = (!isSrvConnection && port) ? ` --port ${port}` : '';
    return new Promise((resolve, reject) => {
      const command = `mongosh --nodb --file ${tempFilePath}${portFlag}`;
      const childProcess = exec(
        command,
        { maxBuffer: 10 * 1024 * 1024 }, // 10MB buffer
        (error, stdout, stderr) => {
          // Cleanup function
          const cleanup = () => {
            try {
              const fs = require('fs');
              const tempDirPath = path.resolve(__dirname, '../../temp');
              if (fs.existsSync(tempDirPath)) {
                fs.rmSync(tempDirPath, { recursive: true, force: true });
              }
            } catch (cleanupError) {
              console.warn('[Expect] Failed to cleanup temp directory:', cleanupError.message);
            }
          };

          if (stderr && stderr.trim()) {
            console.error('[Expect] mongosh stderr:', stderr);
          }

          if (error) {
            const stderrText = (stderr || '').toLowerCase();
            const errorText = error.message.toLowerCase();
            const isSyntaxError = stderrText.includes('syntaxerror') ||
                                  errorText.includes('syntaxerror') ||
                                  stderrText.includes('unexpected token') ||
                                  errorText.includes('unexpected token');

            let errorMessage;
            if (isSyntaxError) {
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

            cleanup();
            reject(new Error(errorMessage));
            return;
          }

          try {
            this._validateSchemaDirectly(stdout);
            cleanup();
            resolve();
          } catch (validationError) {
            cleanup();
            reject(validationError);
          }
        }
      );

      childProcess.on('exit', () => {
        if (childProcess.stdin) childProcess.stdin.destroy();
        if (childProcess.stdout) childProcess.stdout.destroy();
        if (childProcess.stderr) childProcess.stderr.destroy();
      });
    });
  }

  /**
   * Checks if a string represents a file path.
   * Uses the same logic as MongoshComparisonEngine._isFilePath for consistency.
   *
   * @private
   * @param {string} str - Potential file path
   * @param {string} baseDir - Base directory for resolution
   * @returns {boolean} True if string looks like a file path
   */
  _isFilePath(str, baseDir) {
    try {
      const fs = require('fs');
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
   * Validates output against schema without executing files.
   *
   * @private
   * @param {string|*} actual - Actual output (defaults to this._actual)
   */
  _validateSchemaDirectly(actual = this._actual) {
    const { MongoshOutputParser } = require('./MongoshOutputParser');
    const fs = require('fs');
    const baseDir = path.resolve(__dirname, '../../examples');

    // Parse expected output
    let expectedParsed;
    const expected = this._expectedOutputForResemble;

    if (typeof expected === 'string') {
      // Use file path detection logic that's consistent with shouldMatch
      const isFilePath = this._isFilePath(expected, baseDir);

      if (isFilePath) {
        const fullPath = path.isAbsolute(expected) ? expected : path.resolve(baseDir, expected);

        let fileContent;
        try {
          fileContent = fs.readFileSync(fullPath, 'utf8');
        } catch (error) {
          // Provide user-friendly error for file not found
          const errorMessage = error.code === 'ENOENT'
            ? ErrorMessageBuilder.fileNotFound(expected, baseDir, 'expected output')
            : `Failed to read expected output file: ${error.message}`;
          throw new Error(errorMessage);
        }

        const parseResult = MongoshOutputParser.parseExpectedOutput(fileContent);
        if (!parseResult.success) {
          throw new Error(`Failed to parse expected output file "${expected}": ${parseResult.error.message}`);
        }
        expectedParsed = parseResult.data;
      } else {
        // Parse as mongosh output string (use parseExpectedOutput for ellipsis handling)
        const parseResult = MongoshOutputParser.parseExpectedOutput(expected);
        if (!parseResult.success) {
          throw new Error(`Failed to parse expected output: ${parseResult.error.message}`);
        }
        expectedParsed = parseResult.data;
      }
    } else if (Array.isArray(expected)) {
      expectedParsed = expected;
    } else if (typeof expected === 'object' && expected !== null) {
      // Auto-wrap single document in array for convenience
      expectedParsed = [expected];
    } else {
      throw new Error('shouldResemble() expected output must be a file path, array, document, or mongosh output string');
    }

    // Parse actual output
    let actualParsed;
    if (typeof actual === 'string') {
      const parseResult = MongoshOutputParser.parse(actual);
      if (!parseResult.success) {
        throw new Error(`Failed to parse actual output: ${parseResult.error.message}`);
      }
      actualParsed = parseResult.data;
    } else if (Array.isArray(actual)) {
      actualParsed = actual;
    } else if (typeof actual === 'object' && actual !== null) {
      // Auto-wrap single document in array for convenience
      actualParsed = [actual];
    } else {
      throw new Error('Actual output must be an array, document, or parseable string');
    }

    // Validate both expected and actual against schema
    const errors = [];

    // Validate expected output against schema
    const expectedErrors = this._validateDocumentsAgainstSchema(expectedParsed, 'expected output');
    errors.push(...expectedErrors);

    // Validate actual output against schema
    const actualErrors = this._validateDocumentsAgainstSchema(actualParsed, 'actual output');
    errors.push(...actualErrors);

    if (errors.length > 0) {
      throw new Error(`Schema validation failed:\n\n${errors.join('\n\n')}`);
    }
  }

  /**
   * Validates an array of documents against the schema configuration.
   *
   * @private
   * @param {Array} documents - Array of documents to validate
   * @param {string} source - Label for error messages ('expected output' or 'actual output')
   * @returns {string[]} Array of error messages (empty if valid)
   */
  _validateDocumentsAgainstSchema(documents, source) {
    const errors = [];
    const { count, requiredFields, fieldValues } = this._schemaConfig;

    // Validate count
    if (documents.length !== count) {
      errors.push(
        `${source}: Expected ${count} documents but got ${documents.length}`
      );
    }

    // Validate each document
    documents.forEach((doc, index) => {
      // Check that the document is an object
      if (typeof doc !== 'object' || doc === null || Array.isArray(doc)) {
        errors.push(`${source}[${index}]: Expected an object but got ${Array.isArray(doc) ? 'array' : typeof doc}`);
        return;
      }

      // Validate required fields
      for (const field of requiredFields) {
        if (!(field in doc)) {
          errors.push(`${source}[${index}]: Missing required field "${field}"`);
        }
      }

      // Validate field values
      // Note: withIgnoredFields() cannot be used with shouldResemble(), so no conflict is possible
      for (const [field, expectedValue] of Object.entries(fieldValues)) {
        if (!(field in doc)) {
          errors.push(`${source}[${index}]: Missing field "${field}" (expected value: ${JSON.stringify(expectedValue)})`);
        } else if (!this._valuesMatch(doc[field], expectedValue)) {
          errors.push(
            `${source}[${index}]: Field "${field}" has value ${JSON.stringify(doc[field])} ` +
            `but expected ${JSON.stringify(expectedValue)}`
          );
        }
      }
    });

    return errors;
  }

  /**
   * Compares two values for equality, handling special MongoDB types.
   *
   * @private
   * @param {*} actual - Actual value
   * @param {*} expected - Expected value
   * @returns {boolean} True if values match
   */
  _valuesMatch(actual, expected) {
    // Handle null/undefined
    if (actual === expected) return true;
    if (actual === null || expected === null) return actual === expected;
    if (actual === undefined || expected === undefined) return actual === expected;

    // Handle different types
    const actualType = typeof actual;
    const expectedType = typeof expected;

    if (actualType !== expectedType) {
      // Special case: number comparisons (Int32, Long, Double can be compared to number)
      if (actualType === 'object' && expectedType === 'number') {
        // Check for MongoDB numeric types
        if (actual.constructor && ['Int32', 'Long', 'Double'].includes(actual.constructor.name)) {
          return Number(actual) === expected;
        }
      }
      return false;
    }

    // Handle primitive types
    if (actualType !== 'object') {
      return actual === expected;
    }

    // Handle arrays
    if (Array.isArray(actual) && Array.isArray(expected)) {
      if (actual.length !== expected.length) return false;
      return actual.every((item, i) => this._valuesMatch(item, expected[i]));
    }

    // Handle Date
    if (actual instanceof Date && expected instanceof Date) {
      return actual.getTime() === expected.getTime();
    }

    // Handle objects (simple key comparison)
    const actualKeys = Object.keys(actual);
    const expectedKeys = Object.keys(expected);
    if (actualKeys.length !== expectedKeys.length) return false;

    return actualKeys.every(key =>
      expectedKeys.includes(key) && this._valuesMatch(actual[key], expected[key])
    );
  }
}

module.exports = Expect;

