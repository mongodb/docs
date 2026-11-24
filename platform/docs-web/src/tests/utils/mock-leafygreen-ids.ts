/**
 * Mock for LeafyGreen UI's random ID generation to make tests deterministic
 */

let mockIdCounter = 0;

// Store original function to restore after tests
let originalMathRandom: typeof Math.random;

/**
 * Mock Math.random to generate predictable IDs for LeafyGreen components
 * This ensures that IDs in snapshots are consistent across test runs
 */
export const mockLeafyGreenIds = () => {
  originalMathRandom = Math.random;
  mockIdCounter = 0;

  // Mock Math.random to return predictable values
  Math.random = jest.fn(() => {
    mockIdCounter++;
    // Generate a predictable decimal that will create consistent base36 strings
    // This mimics the pattern used by LeafyGreen's genId function
    return mockIdCounter * 0.000001;
  });
};

/**
 * Restore the original Math.random function
 */
export const restoreLeafyGreenIds = () => {
  if (originalMathRandom) {
    Math.random = originalMathRandom;
  }
  mockIdCounter = 0;
};

/**
 * Reset the counter for consistent IDs across test runs
 */
export const resetLeafyGreenIdCounter = () => {
  mockIdCounter = 0;
};
