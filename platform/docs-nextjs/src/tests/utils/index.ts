import { act } from 'react-dom/test-utils';
import { theme } from '@/styles/theme';

export async function tick({ waitFor = 0, wrapper }: { waitFor?: number; wrapper?: { update: () => void } } = {}) {
  await act(async () => {
    jest.advanceTimersByTime(waitFor);
  });
  if (wrapper) {
    wrapper.update();
  }
}

export function mockMutationObserver() {
  global.MutationObserver = class {
    disconnect() {}
    observe(element: Node, initObject?: MutationObserverInit) {}
    takeRecords(): MutationRecord[] {
      return [];
    }
  } as unknown as typeof MutationObserver;
}

export function mockSegmentAnalytics() {
  (window as unknown as { analytics: { user: jest.Mock } }).analytics = {
    user: jest.fn(() => ({
      id: jest.fn(() => 'test-id-please-ignore'),
    })),
  };
}

const {
  screenSize: { largeAndUp, upToLarge, upToSmall },
} = theme;

export const setMatchMedia = (...queries: string[]) => {
  window.matchMedia = (media: string) =>
    ({
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      matches: queries.some((query) => media === query),
      media,
      onchange: null,
      dispatchEvent: () => true,
    } as MediaQueryList);
};

export const setMobile = () => {
  setMatchMedia(upToSmall, upToLarge);
};

export const setTablet = () => {
  setMatchMedia(upToLarge);
};

export const setDesktop = () => {
  setMatchMedia(largeAndUp);
};
