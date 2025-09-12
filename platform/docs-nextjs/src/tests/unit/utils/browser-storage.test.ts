import { setLocalValue, getLocalValue } from '@/utils/browser-storage';

const errMsg = 'getItem error';
const mockLocalStorage = jest.spyOn(window, 'localStorage', 'get').mockImplementation(() => {
  return {
    getItem: () => {
      throw new Error(errMsg);
    },
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
    key: jest.fn(),
    length: 0,
  };
});

describe('when rendering in the browser', () => {
  test('setLocalValue does not break if no storage', () => {
    expect(window.localStorage.getItem).toThrow(errMsg);
    expect(setLocalValue).not.toThrow();
  });

  test('getLocalValue does not break if no storage', () => {
    expect(window.localStorage.getItem).toThrow(errMsg);
    expect(getLocalValue).not.toThrow();
  });
});

// reset window.localStorage.getItem just so we don't mess up any global objects
afterAll(() => {
  mockLocalStorage.mockRestore();
});
