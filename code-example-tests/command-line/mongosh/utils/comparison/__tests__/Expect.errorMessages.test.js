/**
 * Error Message Tests for Expect API
 *
 * These tests verify that setup errors provide clear, actionable messages
 * for technical writers who maintain the code examples.
 */

const Expect = require('../Expect.js');

describe('Expect API - Setup Error Messages', () => {
  const originalEnv = { ...process.env };

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  describe('Configuration Errors', () => {
    test('Empty array - specific error', () => {
      let errorMessage = '';
      try {
        Expect.outputFromExampleFiles([]);
      } catch (error) {
        errorMessage = error.message;
      }

      expect(errorMessage).toContain('non-empty array');
      expect(errorMessage).toContain('file paths');
    });

    test('Non-array input - clear error', () => {
      let errorMessage = '';
      try {
        Expect.outputFromExampleFiles('single-file.js');
      } catch (error) {
        errorMessage = error.message;
      }

      expect(errorMessage).toContain('non-empty array');
    });

    test('Undefined input - clear error', () => {
      let errorMessage = '';
      try {
        Expect.outputFromExampleFiles();
      } catch (error) {
        errorMessage = error.message;
      }

      expect(errorMessage).toContain('non-empty array');
    });

    test('withDbName used with that() - clear error', () => {
      let errorMessage = '';
      try {
        Expect.that('output').withDbName('test-db');
      } catch (error) {
        errorMessage = error.message;
      }

      expect(errorMessage).toContain('withDbName()');
      expect(errorMessage).toContain('outputFromExampleFiles()');
    });
  });

  describe('Missing Database Name', () => {
    test('Database name required - clear fix', async () => {
      let errorMessage = '';
      try {
        await Expect.outputFromExampleFiles(['file.js'])
          .shouldMatch('output.sh');
      } catch (error) {
        errorMessage = error.message;
      }

      expect(errorMessage).toContain('Database name is required');
      expect(errorMessage).toContain('withDbName');
      expect(errorMessage.length).toBeLessThan(100); // Should be concise
    });
  });

  describe('Missing Environment Variables', () => {
    test('Missing CONNECTION_STRING - mentions both vars and .env', async () => {
      delete process.env.CONNECTION_STRING;

      let errorMessage = '';
      try {
        await Expect.outputFromExampleFiles(['file.js'])
          .withDbName('test-db')
          .shouldMatch('output.sh');
      } catch (error) {
        errorMessage = error.message;
      }

      expect(errorMessage).toContain('CONNECTION_STRING');
      expect(errorMessage).toContain('CONNECTION_PORT');
      expect(errorMessage).toContain('.env file');
    });

    test('Missing CONNECTION_PORT - mentions both vars and .env', async () => {
      delete process.env.CONNECTION_PORT;

      let errorMessage = '';
      try {
        await Expect.outputFromExampleFiles(['file.js'])
          .withDbName('test-db')
          .shouldMatch('output.sh');
      } catch (error) {
        errorMessage = error.message;
      }

      expect(errorMessage).toContain('CONNECTION_STRING');
      expect(errorMessage).toContain('CONNECTION_PORT');
      expect(errorMessage).toContain('.env file');
    });

    test('Missing both env vars - helpful error', async () => {
      delete process.env.CONNECTION_STRING;
      delete process.env.CONNECTION_PORT;

      let errorMessage = '';
      try {
        await Expect.outputFromExampleFiles(['file.js'])
          .withDbName('test-db')
          .shouldMatch('output.sh');
      } catch (error) {
        errorMessage = error.message;
      }

      expect(errorMessage).toContain('CONNECTION_STRING');
      expect(errorMessage).toContain('CONNECTION_PORT');
    });
  });

  describe('File Path Errors', () => {
    test('Non-existent file - throws error', async () => {
      await expect(
        Expect.outputFromExampleFiles(['does-not-exist-123456.js'])
          .withDbName('test-db')
          .shouldMatch('output.sh')
      ).rejects.toThrow();
    });

    test('Invalid path - throws error', async () => {
      await expect(
        Expect.outputFromExampleFiles(['/etc/passwd'])
          .withDbName('test-db')
          .shouldMatch('output.sh')
      ).rejects.toThrow();
    });

    test('Path traversal attempt - throws error', async () => {
      await expect(
        Expect.outputFromExampleFiles(['../../../etc/passwd'])
          .withDbName('test-db')
          .shouldMatch('output.sh')
      ).rejects.toThrow();
    });
  });
});

