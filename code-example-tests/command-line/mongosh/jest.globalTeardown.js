/**
 * Jest Global Teardown
 *
 * Runs once after all test files complete.
 */

module.exports = async () => {
  // Clean up environment variable
  delete process.env.AVAILABLE_DATABASES;
};

