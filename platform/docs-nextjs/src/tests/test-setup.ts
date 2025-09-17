import '@testing-library/jest-dom';
import { mockLeafyGreenIds, resetLeafyGreenIdCounter, restoreLeafyGreenIds } from './utils/mock-leafygreen-ids';
import { mockWindows } from './utils/mock-windows';

// Mock LeafyGreen ID generation for consistent snapshots
beforeAll(() => {
  mockLeafyGreenIds();
  mockWindows();
});

// Reset ID counter before each test for consistency
beforeEach(() => {
  resetLeafyGreenIdCounter();

  // Mock window.location without using Object.defineProperty
  // Use global setup to avoid property redefinition errors
  delete (window as unknown as { location?: Location }).location;
  (window as unknown as { location: Partial<Location> }).location = {
    hash: '',
    assign: jest.fn(),
    reload: jest.fn(),
    replace: jest.fn(),
    toString: () => '',
  };
});

// Restore original Math.random after all tests
afterAll(() => {
  restoreLeafyGreenIds();
});

window.scrollTo = jest.fn(); // Set the scrollTo function to a jest mock
