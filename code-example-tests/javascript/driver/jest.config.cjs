const SECONDS = 1000;

const config = {
  // Per-test timeout. Without a tight cap, a hanging op (e.g., server selection
  // against an unreachable cluster) waits the driver's full timeout, multiplied
  // by every test in the suite. Preflight in run-tests.js catches the common
  // failure mode; this is a secondary safety net for individual stuck tests.
  testTimeout: 15 * SECONDS,
  roots: ['tests', 'utils/__tests__'],
};
module.exports = config;
