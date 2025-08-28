/**
 * Utility for checking MongoDB sample data availability and conditionally skipping tests.
 *
 * This module provides functions to automatically skip tests when sample data is missing,
 * with clear feedback about what's missing and how to fix it.
 *
 * @fileoverview Sample data detection and test skipping utilities for Jest
 */

import { MongoClient } from 'mongodb';

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
 * Cache for sample data availability to avoid repeated database queries
 * @type {Map<string, boolean>}
 */
const sampleDataCache = new Map();

/**
 * Global flag to track if we've shown sample data availability summary
 */
let hasShownSummary = false;

/**
 * Shows a helpful summary of sample data availability (only once per test run)
 * Returns immediately if already shown to avoid duplicate logging
 */
async function showSampleDataSummary() {
  if (hasShownSummary) return;
  hasShownSummary = true;

  try {
    const availableDatabases = await getAvailableSampleDatabases();

    if (availableDatabases.length === 0) {
      console.log('\n📊 Sample Data Status: No MongoDB sample databases found');
      console.log('   Some tests may be skipped. To load sample data:');
      console.log(
        '   • Atlas: https://www.mongodb.com/docs/atlas/sample-data/'
      );
      console.log('   • Local: Use mongorestore with sample data archive\n');
    } else {
      console.log(
        `\n📊 Sample Data Status: ${availableDatabases.length} database(s) available`
      );
      console.log(`   Found: ${availableDatabases.join(', ')}\n`);
    }
  } catch (error) {
    // Silently fail - we don't want to break test runs over this
    console.warn('Could not determine sample data status:', error.message);
  }
}

/**
 * Checks if a specific sample database and its expected collections exist
 * @param {string} databaseName - The sample database name to check
 * @param {string[]} [requiredCollections] - Optional array of specific collections to verify
 * @returns {Promise<boolean>} True if the sample database and collections exist
 *
 * @example
 * // Check if sample_mflix database exists with default collections
 * const hasMovieData = await checkSampleDataAvailable('sample_mflix');
 *
 * // Check if specific collections exist
 * const hasCustomData = await checkSampleDataAvailable('sample_mflix', ['movies', 'theaters']);
 */
export async function checkSampleDataAvailable(
  databaseName,
  requiredCollections = null
) {
  const cacheKey = `${databaseName}:${JSON.stringify(requiredCollections)}`;

  if (sampleDataCache.has(cacheKey)) {
    return sampleDataCache.get(cacheKey);
  }

  try {
    const uri = process.env.CONNECTION_STRING;
    if (!uri) {
      console.warn('CONNECTION_STRING environment variable not set');
      sampleDataCache.set(cacheKey, false);
      return false;
    }

    // Configure client with short timeouts for testing
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 2000, // 2 second timeout for server selection
      connectTimeoutMS: 2000, // 2 second timeout for initial connection
      socketTimeoutMS: 2000, // 2 second timeout for socket operations
    });
    await client.connect();

    try {
      // Check if database exists
      const adminDb = client.db().admin();
      const databases = await adminDb.listDatabases();
      const dbExists = databases.databases.some(
        (db) => db.name === databaseName
      );

      if (!dbExists) {
        sampleDataCache.set(cacheKey, false);
        return false;
      }

      // Check collections if specified
      const collectionsToCheck =
        requiredCollections || SAMPLE_DATABASES[databaseName] || [];
      if (collectionsToCheck.length > 0) {
        const db = client.db(databaseName);
        const collections = await db.listCollections().toArray();
        const existingCollections = collections.map((col) => col.name);

        const missingCollections = collectionsToCheck.filter(
          (col) => !existingCollections.includes(col)
        );

        if (missingCollections.length > 0) {
          sampleDataCache.set(cacheKey, false);
          return false;
        }
      }

      sampleDataCache.set(cacheKey, true);
      return true;
    } finally {
      await client.close();
    }
  } catch (error) {
    console.warn(
      `Error checking sample data availability for ${databaseName}:`,
      error.message
    );
    sampleDataCache.set(cacheKey, false);
    return false;
  }
}

/**
 * Checks if any of the standard MongoDB sample databases are available
 *
 * @returns {Promise<string[]>} Array of available sample database names
 *
 * @example
 * const availableDbs = await getAvailableSampleDatabases();
 * console.log('Available sample databases:', availableDbs);
 */
export async function getAvailableSampleDatabases() {
  const results = await Promise.all(
    Object.keys(SAMPLE_DATABASES).map(async (dbName) => {
      const isAvailable = await checkSampleDataAvailable(dbName);
      return isAvailable ? dbName : null;
    })
  );

  return results.filter((db) => db !== null);
}

/**
 * Creates a Jest test wrapper that skips the test if required sample data is not available
 * Automatically shows sample data summary on first use
 *
 * @param {string} description - Test description
 * @param {Function} testFn - Test function to execute
 * @param {string|string[]} requiredDatabases - Sample database name(s) required for the test
 * @param {Object} [options] - Additional options
 * @param {Object} [options.collections] - Object mapping database names to required collections
 * @returns {void}
 *
 * @example
 * // Test that requires sample_mflix database
 * describeWithSampleData('Movie aggregation tests', () => {
 *   it('should filter movies by genre', async () => {
 *     // Test implementation
 *   });
 * }, 'sample_mflix');
 *
 * // Test that requires multiple databases
 * describeWithSampleData('Cross-database tests', () => {
 *   it('should join movie and restaurant data', async () => {
 *     // Test implementation
 *   });
 * }, ['sample_mflix', 'sample_restaurants']);
 */
export function describeWithSampleData(
  description,
  testFn,
  requiredDatabases,
  options = {}
) {
  const databases = Array.isArray(requiredDatabases)
    ? requiredDatabases
    : [requiredDatabases];

  describe(description, () => {
    let sampleDataAvailable = false;
    let missingDatabases = [];

    beforeAll(async () => {
      // Show sample data summary (only once per test run)
      try {
        await showSampleDataSummary();
      } catch (error) {
        // Ignore summary errors to prevent test failures
      }

      const availabilityChecks = await Promise.all(
        databases.map(async (dbName) => {
          const requiredCollections = options.collections?.[dbName];
          const isAvailable = await checkSampleDataAvailable(
            dbName,
            requiredCollections
          );
          return { dbName, isAvailable };
        })
      );

      missingDatabases = availabilityChecks
        .filter((check) => !check.isAvailable)
        .map((check) => check.dbName);

      sampleDataAvailable = missingDatabases.length === 0;

      if (!sampleDataAvailable) {
        console.warn(
          `\n⚠️  Skipping "${description}" - Missing: ${missingDatabases.join(', ')}`
        );
      }
    });

    if (typeof testFn === 'function') {
      // Call the test definition function, but Jest will skip if needed
      const originalIt = global.it;
      const originalTest = global.test;

      // Override it/test to conditionally skip
      global.it = global.test = (testDescription, testFunc, timeout) => {
        if (!sampleDataAvailable) {
          return originalIt.skip(testDescription, testFunc, timeout);
        }
        return originalIt(testDescription, testFunc, timeout);
      };

      try {
        testFn();
      } finally {
        // Restore original it/test functions
        global.it = originalIt;
        global.test = originalTest;
      }
    }
  });
}

/**
 * Creates a Jest test case that skips if required sample data is not available
 * Automatically shows sample data summary on first use
 *
 * @param {string} description - Test description
 * @param {Function} testFn - Test function to execute
 * @param {string|string[]} requiredDatabases - Sample database name(s) required for the test
 * @param {Object} [options] - Additional options
 * @param {Object} [options.collections] - Object mapping database names to required collections
 * @param {number} [options.timeout] - Test timeout in milliseconds
 * @returns {void}
 *
 * @example
 * describe('Movie tests', () => {
 *   itWithSampleData('should filter movies by year', async () => {
 *     // Test implementation
 *   }, 'sample_mflix');
 *
 *   itWithSampleData('should find restaurants near theaters', async () => {
 *     // Test implementation
 *   }, ['sample_mflix', 'sample_restaurants']);
 * });
 */
export function itWithSampleData(
  description,
  testFn,
  requiredDatabases,
  options = {}
) {
  const databases = Array.isArray(requiredDatabases)
    ? requiredDatabases
    : [requiredDatabases];

  it(
    description,
    async () => {
      // Show sample data summary (only once per test run)
      // Use setImmediate to avoid hanging after test completion
      const summaryPromise = showSampleDataSummary().catch(() => {
        // Ignore summary errors to prevent test failures
      });
      
      const availabilityChecks = await Promise.all(
        databases.map(async (dbName) => {
          const requiredCollections = options.collections?.[dbName];
          const isAvailable = await checkSampleDataAvailable(
            dbName,
            requiredCollections
          );
          return { dbName, isAvailable };
        })
      );

      const missingDatabases = availabilityChecks
        .filter((check) => !check.isAvailable)
        .map((check) => check.dbName);

      if (missingDatabases.length > 0) {
        console.warn(
          `\n⚠️  Skipping "${description}" - Missing: ${missingDatabases.join(', ')}`
        );
        return; // Skip the test
      }

      // Run the test if sample data is available
      await testFn();
      
      // Ensure summary is completed (but don't wait if it hangs)
      await Promise.race([summaryPromise, new Promise(resolve => setTimeout(resolve, 100))]);
    },
    options.timeout
  );
}

/**
 * Clears the sample data availability cache
 * Useful for testing or when sample data availability may have changed
 *
 * @example
 * // Clear cache after loading new sample data
 * clearSampleDataCache();
 */
export function clearSampleDataCache() {
  sampleDataCache.clear();
}
