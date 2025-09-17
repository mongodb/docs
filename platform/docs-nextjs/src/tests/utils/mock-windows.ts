export const mockWindows = () => {
  // Properly mock window.matchMedia to satisfy MediaQueryList interface
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    } as MediaQueryList);

  window.scrollTo = () => {};

  global.fetch = jest.fn();

  // Properly mock window.crypto to satisfy Crypto interface
  window.crypto = {
    randomUUID: crypto.randomUUID.bind(crypto),
    getRandomValues: crypto.getRandomValues.bind(crypto),
    subtle: crypto.subtle,
  } as Crypto;
};
