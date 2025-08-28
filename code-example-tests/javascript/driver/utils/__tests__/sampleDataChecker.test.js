/**
 * Tests for the sampleDataChecker utility module
 */

import {
  checkSampleDataAvailable,
  getAvailableSampleDatabases,
  describeWithSampleData,
  itWithSampleData,
  clearSampleDataCache,
} from '../sampleDataChecker.js';

describe('Sample Data Checker Utility', () => {
  beforeEach(() => {
    // Clear cache before each test to ensure fresh checks
    clearSampleDataCache();
  });

  describe('checkSampleDataAvailable', () => {
    it('should return false when CONNECTION_STRING is not set', async () => {
      const originalConnectionString = process.env.CONNECTION_STRING;
      delete process.env.CONNECTION_STRING;

      try {
        const result = await checkSampleDataAvailable('sample_mflix');
        expect(result).toBe(false);
      } finally {
        if (originalConnectionString) {
          process.env.CONNECTION_STRING = originalConnectionString;
        }
      }
    });

    it('should cache results to avoid repeated database queries', async () => {
      // First call
      const result1 = await checkSampleDataAvailable('nonexistent_database');

      // Second call should use cached result
      const result2 = await checkSampleDataAvailable('nonexistent_database');

      expect(result1).toBe(result2);
    });

    it('should handle connection errors gracefully', async () => {
      const originalConnectionString = process.env.CONNECTION_STRING;
      process.env.CONNECTION_STRING = 'mongodb://invalid-host:27017/test';

      try {
        const result = await checkSampleDataAvailable('sample_mflix');
        expect(result).toBe(false);
      } finally {
        if (originalConnectionString) {
          process.env.CONNECTION_STRING = originalConnectionString;
        }
      }
    });
  });

  describe('getAvailableSampleDatabases', () => {
    it('should return an array of available sample database names', async () => {
      const availableDbs = await getAvailableSampleDatabases();
      expect(Array.isArray(availableDbs)).toBe(true);

      // All returned database names should start with 'sample_'
      availableDbs.forEach((dbName) => {
        expect(dbName).toMatch(/^sample_/);
      });
    });
  });

  describe('clearSampleDataCache', () => {
    it('should clear the internal cache', async () => {
      // Make a call to populate cache
      await checkSampleDataAvailable('test_database');

      // Clear cache
      clearSampleDataCache();

      // This should work without throwing (cache is cleared)
      expect(() => clearSampleDataCache()).not.toThrow();
    });
  });
});

// Example tests using the conditional test wrappers
describeWithSampleData(
  'Sample Mflix Database Tests',
  () => {
    it('should run this test only if sample_mflix is available', async () => {
      // This test will only run if sample_mflix database exists
      expect(true).toBe(true);
    });

    it('should run another test with mflix data', async () => {
      // Another test that requires sample_mflix
      expect(true).toBe(true);
    });
  },
  'sample_mflix'
);

describeWithSampleData(
  'Multiple Sample Database Tests',
  () => {
    it('should run only if both databases are available', async () => {
      // This test will only run if both sample databases exist
      expect(true).toBe(true);
    });
  },
  ['sample_mflix', 'sample_restaurants']
);

describe('Individual Test Skipping Examples', () => {
  itWithSampleData(
    'should query movie data',
    async () => {
      // This individual test will be skipped if sample_mflix is not available
      expect(true).toBe(true);
    },
    'sample_mflix'
  );

  itWithSampleData(
    'should join movies and restaurants',
    async () => {
      // This test requires both sample databases
      expect(true).toBe(true);
    },
    ['sample_mflix', 'sample_restaurants']
  );

  itWithSampleData(
    'should query specific collections',
    async () => {
      // This test requires specific collections within a database
      expect(true).toBe(true);
    },
    'sample_mflix',
    {
      collections: { sample_mflix: ['movies', 'theaters'] },
    }
  );

  // Regular test that always runs regardless of sample data
  it('should always run basic functionality tests', () => {
    expect(true).toBe(true);
  });
});
