/**
 * Utility for checking MongoDB sample data availability and conditionally skipping tests.
 *
 * This module provides functions to automatically skip tests when sample data is missing,
 * with clear feedback about what's missing and how to fix it.
 *
 * Designed for the MongoDB Shell test suite - reads database availability from
 * process.env.AVAILABLE_DATABASES set by Jest global setup (jest.globalSetup.js).
 *
 * @fileoverview Sample data detection and test skipping utilities for mongosh tests
 */

/**
 * Standard MongoDB sample database names and their expected collections
 */
const SAMPLE_DATABASES = {
  sample_mflix: ['movies', 'theaters', 'users', 'comments', 'sessions'],
  sample_restaurants: ['restaurants', 'neighborhoods'],
  sample_training: [
    'posts',
    'companies',
    'inspections',
    'routes',
    'trips',
    'grades',
    'zips',
  ],
  sample_analytics: ['customers', 'accounts', 'transactions'],
  sample_airbnb: ['listingsAndReviews'],
  sample_geospatial: ['shipwrecks'],
  sample_guides: ['planets', 'comets'],
  sample_stores: ['sales'],
  sample_supplies: ['sales'],
  sample_weatherdata: ['data'],
};

/**
 * Cache for available databases (loaded from environment once per test file)
 * @type {Set<string>|null}
 */
let availableDatabasesCache = null;

/**
 * Fetches the list of available databases from process.env.
 * The environment variable is set by jest.globalSetup.js before any tests run.
 * Results are cached in memory for the duration of each test file.
 *
 * @returns {Set<string>} Set of available database names
 */
function getAvailableDatabases() {
  if (availableDatabasesCache !== null) {
    return availableDatabasesCache;
  }

  try {
    // Read from environment variable set by global setup
    const databasesJson = process.env.AVAILABLE_DATABASES;
    if (!databasesJson) {
      // Global setup hasn't run or failed - assume no sample data
      availableDatabasesCache = new Set();
      return availableDatabasesCache;
    }

    const databases = JSON.parse(databasesJson);
    availableDatabasesCache = new Set(databases);

    return availableDatabasesCache;
  } catch (error) {
    console.warn('Failed to read available databases from environment:', error.message);
    availableDatabasesCache = new Set();
    return availableDatabasesCache;
  }
}

/**
 * Checks if a specific database is available.
 *
 * @param {string} databaseName - The database name to check
 * @returns {boolean} True if the database exists
 */
function isDatabaseAvailable(databaseName) {
  const availableDbs = getAvailableDatabases();
  return availableDbs.has(databaseName);
}

/**
 * Checks if a database is a known sample database.
 *
 * @param {string} databaseName - The database name to check
 * @returns {boolean} True if the database is a known sample database
 */
function isSampleDatabase(databaseName) {
  return Object.prototype.hasOwnProperty.call(SAMPLE_DATABASES, databaseName);
}

/**
 * Pre-loads the database cache from the environment variable.
 * This is called once per test file to ensure the cache is populated.
 * The actual summary is shown by jest.globalSetup.js before any tests run.
 */
function showSampleDataSummary() {
  // Pre-populate the cache on first call
  // This just reads from the environment variable set by global setup
  try {
    getAvailableDatabases();
  } catch (error) {
    // Silently fail - we don't want to break test runs over this
  }
}

/**
 * Creates a Jest describe wrapper that skips all tests if required sample data is not available.
 * Automatically shows sample data summary on first use.
 *
 * This is the recommended way to handle sample data dependencies in mongosh tests.
 * It provides consistent behavior with other MongoDB driver test suites.
 *
 * @param {string} description - Test suite description
 * @param {Function} testFn - Test suite function containing test cases
 * @param {string|string[]} requiredDatabases - Sample database name(s) required for the tests
 * @returns {void}
 *
 * @example
 * // Single database requirement
 * const { describeWithSampleData } = require('../../utils/sampleDataChecker');
 *
 * describeWithSampleData('mongosh sample_mflix tests', () => {
 *   test('should query movies', async () => {
 *     await Expect
 *       .outputFromExampleFiles(['query.js'])
 *       .withDbName('sample_mflix')
 *       .shouldMatch('output.sh');
 *   });
 * }, 'sample_mflix');
 *
 * @example
 * // Multiple database requirements
 * describeWithSampleData('Cross-database tests', () => {
 *   test('should work with multiple databases', async () => {
 *     // Test implementation
 *   });
 * }, ['sample_mflix', 'sample_restaurants']);
 */
function describeWithSampleData(description, testFn, requiredDatabases) {
  const databases = Array.isArray(requiredDatabases)
    ? requiredDatabases
    : [requiredDatabases];

  // Pre-populate cache on first call
  showSampleDataSummary();

  // Check availability of all required databases at module load time
  const missingDatabases = databases.filter(dbName => {
    // Non-sample databases are always considered available
    if (!isSampleDatabase(dbName)) {
      return false;
    }
    return !isDatabaseAvailable(dbName);
  });

  const sampleDataAvailable = missingDatabases.length === 0;

  if (!sampleDataAvailable) {
    // Try to get the test file path from the call stack
    let testFilePath = 'unknown file';
    try {
      const stack = new Error().stack;
      const stackLines = stack.split('\n');
      // Look for the first line that contains a test file path
      for (const line of stackLines) {
        if (line.includes('/tests/') && line.includes('.test.js')) {
          const match = line.match(/\((.+\.test\.js):\d+:\d+\)/);
          if (match) {
            // Extract just the relative path from the workspace
            const fullPath = match[1];
            const testsIndex = fullPath.indexOf('/tests/');
            if (testsIndex !== -1) {
              testFilePath = fullPath.substring(testsIndex + 1); // Remove leading slash
            }
          }
          break;
        }
      }
    } catch (e) {
      // Fallback to description if we can't get the path
      testFilePath = description;
    }

    // Show warning message with file path
    // ANSI color codes:
    // \x1b[1m = bold, \x1b[22m = normal weight
    // \x1b[43m = yellow background, \x1b[49m = default background
    // \x1b[2m = dim, \x1b[90m = bright black (grey)
    const skipLabel = '\x1b[1m\x1b[43m SKIP \x1b[49m\x1b[22m'; // Bold text on yellow background (uses terminal's default text color)

    // Split the file path into directory and filename
    const lastSlashIndex = testFilePath.lastIndexOf('/');
    const directory = testFilePath.substring(0, lastSlashIndex + 1);
    const filename = testFilePath.substring(lastSlashIndex + 1);

    process.stderr.write(
      `${skipLabel} \x1b[2m${directory}\x1b[22m\x1b[90m${filename}\x1b[39m\n` +
      `       Missing sample database(s): ${missingDatabases.join(', ')}\n` +
      `       Load sample data: https://www.mongodb.com/docs/atlas/sample-data/\n\n`
    );

    // Use describe.skip to skip the entire suite
    describe.skip(description, testFn);
  } else {
    // Run tests normally if sample data is available
    describe(description, testFn);
  }
}

/**
 * Creates a Jest test case that skips if required sample data is not available.
 * Automatically shows sample data summary on first use.
 *
 * Use this when you need individual tests to have different sample data requirements
 * within the same describe block. For most cases, describeWithSampleData is preferred.
 *
 * @param {string} description - Test description
 * @param {Function} testFn - Test function to execute
 * @param {string|string[]} requiredDatabases - Sample database name(s) required for the test
 * @param {number} [timeout] - Optional test timeout in milliseconds
 * @returns {void}
 *
 * @example
 * const { itWithSampleData } = require('../../utils/sampleDataChecker');
 *
 * describe('Movie tests', () => {
 *   itWithSampleData('should filter movies by year', async () => {
 *     // Test implementation
 *   }, 'sample_mflix');
 *
 *   itWithSampleData('should find restaurants', async () => {
 *     // Test implementation
 *   }, 'sample_restaurants');
 * });
 */
function itWithSampleData(description, testFn, requiredDatabases, timeout) {
  const databases = Array.isArray(requiredDatabases)
    ? requiredDatabases
    : [requiredDatabases];

  it(
    description,
    async () => {
      // Pre-populate cache on first call
      showSampleDataSummary();

      // Check availability of all required databases
      const missingDatabases = databases.filter(dbName => {
        // Non-sample databases are always considered available
        if (!isSampleDatabase(dbName)) {
          return false;
        }
        return !isDatabaseAvailable(dbName);
      });

      if (missingDatabases.length > 0) {
        // Use process.stderr.write to bypass Jest's console buffering
        process.stderr.write(
          `\n⚠️  Skipping "${description}" - Missing sample database(s): ${missingDatabases.join(', ')}\n`
        );
        return; // Skip the test
      }

      // Run the test if sample data is available
      await testFn();
    },
    timeout
  );
}

/**
 * Clears the in-memory database availability cache.
 * Useful for testing. Note: This does not affect the environment variable.
 */
function clearCache() {
  availableDatabasesCache = null;
}

module.exports = {
  isDatabaseAvailable,
  isSampleDatabase,
  showSampleDataSummary,
  describeWithSampleData,
  itWithSampleData,
  clearCache,
  SAMPLE_DATABASES,
};

