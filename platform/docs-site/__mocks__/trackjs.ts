export const TrackJS = {
  install: jest.fn(),
  isInstalled: jest.fn(() => true),
  track: jest.fn(),
  addMetadata: jest.fn(),
  removeMetadata: jest.fn(),
  configure: jest.fn(),
  attempt: jest.fn((fn: (...args: unknown[]) => unknown) => fn()),
  watch: jest.fn((fn: (...args: unknown[]) => unknown) => fn),
  version: '3.10.4',
};
