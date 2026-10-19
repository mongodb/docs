import {
  getParserBinaryPath,
  getReleasePlatform,
  getReleaseUrl,
} from '../../src/github/getParser';

describe('getReleasePlatform', () => {
  it.each([
    ['linux', 'x64', 'linux_x86_64'],
    ['darwin', 'arm64', 'darwin_arm64'],
    ['darwin', 'x64', 'darwin_x86_64'],
  ] as const)('maps %s/%s to %s', (platform, arch, expected) => {
    expect(getReleasePlatform({ platform, arch })).toBe(expected);
  });

  it('throws for platforms without a release binary', () => {
    expect(() => getReleasePlatform({ platform: 'linux', arch: 'arm64' })).toThrow(
      /No snooty-parser release binary for linux\/arm64/,
    );
  });
});

describe('getReleaseUrl', () => {
  it('builds the GitHub release asset URL', () => {
    expect(getReleaseUrl('v0.20.20', 'linux_x86_64')).toBe(
      'https://github.com/mongodb/snooty-parser/releases/download/v0.20.20/snooty-v0.20.20-linux_x86_64.zip',
    );
  });
});

describe('getParserBinaryPath', () => {
  it('points at the executable inside the extracted archive', () => {
    expect(getParserBinaryPath('/repo/snooty-parser')).toBe(
      '/repo/snooty-parser/snooty/snooty',
    );
  });
});
