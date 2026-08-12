// SORTED_DOCS_PREFIXES is computed once at module load from
// NEXT_PUBLIC_DOCS_PREFIXES, so each case sets env vars then re-imports via
// jest.resetModules() to simulate a fresh per-project build.
describe('sameProjectHref', () => {
  const setEnv = (basePath: string, prefixes: string[]) => {
    process.env.NEXT_PUBLIC_DOCS_BASE_PATH = basePath;
    process.env.NEXT_PUBLIC_DOCS_PREFIXES = JSON.stringify(prefixes);
  };

  const load = async () => {
    jest.resetModules();
    return import('@/utils/base-path');
  };

  afterEach(() => {
    delete process.env.NEXT_PUBLIC_DOCS_BASE_PATH;
    delete process.env.NEXT_PUBLIC_DOCS_PREFIXES;
  });

  it('always treats manual (empty-prefix) links as cross-deploy', async () => {
    setEnv('/docs', ['/docs', '/docs/atlas']);
    const { sameProjectHref } = await load();
    expect(sameProjectHref('/docs/v8.0/introduction/')).toBeNull();
  });

  it('always treats landing (empty-prefix) links as cross-deploy', async () => {
    setEnv('/docs', ['/docs', '/docs/atlas']);
    const { sameProjectHref } = await load();
    expect(sameProjectHref('/docs/some-landing-page/')).toBeNull();
  });

  it('still resolves same-deploy links for a prefixed docset', async () => {
    setEnv('/docs/atlas', ['/docs', '/docs/atlas']);
    const { sameProjectHref } = await load();
    expect(sameProjectHref('/docs/atlas/architecture/')).toBe('/architecture/');
  });

  it('still returns null for cross-deploy links on a prefixed docset', async () => {
    setEnv('/docs/atlas', ['/docs', '/docs/atlas', '/docs/compass']);
    const { sameProjectHref } = await load();
    expect(sameProjectHref('/docs/compass/current/')).toBeNull();
  });

  it('returns null when there is no prefix list (dev/offline)', async () => {
    setEnv('/docs/atlas', []);
    const { sameProjectHref } = await load();
    expect(sameProjectHref('/docs/atlas/architecture/')).toBeNull();
  });
});

describe('getAssetBucketSuffix', () => {
  const load = async () => {
    jest.resetModules();
    return import('@/utils/base-path');
  };

  afterEach(() => {
    delete process.env.NEXT_PUBLIC_DOCS_ASSET_BUCKET_SUFFIX;
    delete process.env.NEXT_PUBLIC_BUILD_STATIC_PAGES;
  });

  it('returns the suffix next.config baked into NEXT_PUBLIC_DOCS_ASSET_BUCKET_SUFFIX', async () => {
    process.env.NEXT_PUBLIC_DOCS_ASSET_BUCKET_SUFFIX = '/docs_static_manual';
    const { getAssetBucketSuffix } = await load();
    expect(getAssetBucketSuffix()).toBe('/docs_static_manual');
  });

  it('returns the inactive manual suffix when that build sets it', async () => {
    process.env.NEXT_PUBLIC_DOCS_ASSET_BUCKET_SUFFIX = '/docs_static_manual_inactive';
    const { getAssetBucketSuffix } = await load();
    expect(getAssetBucketSuffix()).toBe('/docs_static_manual_inactive');
  });

  it('returns empty when the env is unset (non-manual / landing)', async () => {
    const { getAssetBucketSuffix } = await load();
    expect(getAssetBucketSuffix()).toBe('');
  });

  it('returns empty for the offline static export', async () => {
    process.env.NEXT_PUBLIC_BUILD_STATIC_PAGES = 'true';
    process.env.NEXT_PUBLIC_DOCS_ASSET_BUCKET_SUFFIX = '/docs_static_manual';
    const { getAssetBucketSuffix } = await load();
    expect(getAssetBucketSuffix()).toBe('');
  });
});
