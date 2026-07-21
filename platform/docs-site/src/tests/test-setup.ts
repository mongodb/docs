import '@testing-library/jest-dom';
import { mockLeafyGreenIds, resetLeafyGreenIdCounter, restoreLeafyGreenIds } from './utils/mock-leafygreen-ids';
import { mockWindows } from './utils/mock-windows';

// Mock ResizeObserver for JSDOM (used by FacetTags component)
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
} as any; // eslint-disable-line @typescript-eslint/no-explicit-any

// Mock LeafyGreen ID generation for consistent snapshots
beforeAll(() => {
  mockLeafyGreenIds();
  mockWindows();
});

// Reset ID counter before each test for consistency
beforeEach(() => {
  resetLeafyGreenIdCounter();

  // Reset URL via History API so jsdom's real Location object is preserved
  window.history.replaceState({}, '', '/');
  // Clear hash to a consistent default
  if (window.location.hash) {
    window.location.hash = '';
  }
});

// Restore original Math.random after all tests
afterAll(() => {
  restoreLeafyGreenIds();
});

window.scrollTo = jest.fn(); // Set the scrollTo function to a jest mock
