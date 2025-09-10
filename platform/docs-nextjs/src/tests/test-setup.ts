import '@testing-library/jest-dom';

// Mock window.location without using Object.defineProperty
// Use global setup to avoid property redefinition errors
beforeEach(() => {
  delete (window as unknown as { location?: Location }).location;
  (window as unknown as { location: Partial<Location> }).location = {
    hash: '',
    assign: jest.fn(),
    reload: jest.fn(),
    replace: jest.fn(),
    toString: () => '',
  };
});

window.scrollTo = jest.fn(); // Set the scrollTo function to a jest mock
