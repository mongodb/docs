import {
  remapDiskRelativeToBlobRelative,
  toBasePathRelativePath,
} from '@/mdx-utils/blob-path-remap';

const PREFIX_MAP: Record<string, string> = {
  landing: 'docs',
  manual: 'docs',
  atlas: 'docs/atlas',
  'django-mongodb': 'docs/languages/python/django-mongodb',
};

describe('remapDiskRelativeToBlobRelative', () => {
  it('maps the landing root index to empty (docs homepage, not /docs/landing)', () => {
    expect(remapDiskRelativeToBlobRelative('landing', PREFIX_MAP)).toBe('');
  });

  it('drops the landing dir name for child pages', () => {
    expect(remapDiskRelativeToBlobRelative('landing/get-started', PREFIX_MAP)).toBe('get-started');
  });

  it('maps a prefixed docset root to the stripped prefix', () => {
    expect(remapDiskRelativeToBlobRelative('atlas', PREFIX_MAP)).toBe('atlas');
  });

  it('keeps an unknown bare dir name unremapped', () => {
    expect(remapDiskRelativeToBlobRelative('unknown-docset', PREFIX_MAP)).toBe('unknown-docset');
  });

  it('drops the dir name for versioned empty-prefix paths (manual)', () => {
    expect(remapDiskRelativeToBlobRelative('manual/current', PREFIX_MAP)).toBe('current');
    expect(remapDiskRelativeToBlobRelative('manual/manual', PREFIX_MAP)).toBe('manual');
  });
});

describe('toBasePathRelativePath', () => {
  it('emits [] for the landing homepage (optional catch-all root under /docs)', () => {
    expect(toBasePathRelativePath(['landing'], PREFIX_MAP, [])).toEqual([]);
  });

  it('does not emit a bogus empty segment from splitting an empty remap', () => {
    expect(toBasePathRelativePath(['landing'], PREFIX_MAP, [])).not.toEqual(['']);
  });

  it('emits child segments for landing pages', () => {
    expect(toBasePathRelativePath(['landing', 'get-started'], PREFIX_MAP, [])).toEqual(['get-started']);
  });

  it('emits [] for a prefixed docset homepage after stripping the basePath prefix', () => {
    expect(toBasePathRelativePath(['atlas'], PREFIX_MAP, ['atlas'])).toEqual([]);
  });

  it('emits remaining segments for prefixed docset pages', () => {
    expect(toBasePathRelativePath(['atlas', 'getting-started'], PREFIX_MAP, ['atlas'])).toEqual(['getting-started']);
  });

  it('emits the version slug for manual (empty prefix, versioned)', () => {
    expect(toBasePathRelativePath(['manual', 'current'], PREFIX_MAP, [])).toEqual(['current']);
    expect(toBasePathRelativePath(['manual', 'manual'], PREFIX_MAP, [])).toEqual(['manual']);
  });

  it('strips a multi-segment docset prefix', () => {
    expect(
      toBasePathRelativePath(
        ['django-mongodb', 'current', 'get-started'],
        PREFIX_MAP,
        ['languages', 'python', 'django-mongodb'],
      ),
    ).toEqual(['current', 'get-started']);
  });
});
