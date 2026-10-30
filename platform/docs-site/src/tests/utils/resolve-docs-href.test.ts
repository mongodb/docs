// base-path and isOfflineBuild read env at module load, so each case sets env
// vars then re-imports via jest.resetModules() to simulate a fresh build.
const PREFIXES = ['/docs', '/docs/atlas', '/docs/atlas/architecture'];

const load = async (basePath: string, { offline = false } = {}) => {
  process.env.NEXT_PUBLIC_DOCS_BASE_PATH = basePath;
  process.env.NEXT_PUBLIC_DOCS_PREFIXES = JSON.stringify(PREFIXES);
  if (offline) process.env.NEXT_PUBLIC_BUILD_STATIC_PAGES = 'true';
  jest.resetModules();
  return (await import('@/utils/resolve-docs-href')).resolveDocsHref;
};

afterEach(() => {
  delete process.env.NEXT_PUBLIC_DOCS_BASE_PATH;
  delete process.env.NEXT_PUBLIC_DOCS_PREFIXES;
  delete process.env.NEXT_PUBLIC_BUILD_STATIC_PAGES;
});

describe('resolveDocsHref', () => {
  it('resolves a same-deploy link to a client href, preserving query and hash', async () => {
    const resolve = await load('/docs/atlas');
    expect(resolve('/docs/atlas/cluster?tab=x#step', '/other/')).toEqual({
      href: '/docs/atlas/cluster/?tab=x#step',
      clientHref: '/cluster/?tab=x#step',
    });
  });

  it('resolves a nested docset link to itself', async () => {
    const resolve = await load('/docs/atlas/architecture');
    expect(resolve('/docs/atlas/architecture/current/', '/')).toEqual({
      href: '/docs/atlas/architecture/current/',
      clientHref: '/current/',
    });
  });

  it.each([
    ['a nested child docset', '/docs/atlas', '/docs/atlas/architecture/current/'],
    ['the parent docset', '/docs/atlas/architecture', '/docs/atlas/cluster/'],
    ['a sibling sharing a name prefix', '/docs/atlas', '/docs/atlas-cli/'],
  ])('treats %s as cross-deploy', async (_, basePath, to) => {
    const resolve = await load(basePath);
    expect(resolve(to, '/')).toEqual({ href: to, clientHref: null });
  });

  it('adds leading and trailing slashes to relative paths', async () => {
    const resolve = await load('/docs/atlas');
    expect(resolve('docs/atlas/cluster', '/')).toEqual({ href: '/docs/atlas/cluster/', clientHref: '/cluster/' });
  });

  it('strips a link to the current page down to its hash, ignoring trailing slashes', async () => {
    const resolve = await load('/docs/atlas');
    expect(resolve('/docs/atlas/cluster/#step', '/cluster')).toEqual({ href: '#step', clientHref: null });
  });

  it('keeps the full path for a hash on another page', async () => {
    const resolve = await load('/docs/atlas');
    expect(resolve('/docs/atlas/other#step', '/cluster/')).toEqual({
      href: '/docs/atlas/other/#step',
      clientHref: '/other/#step',
    });
  });

  it('points offline links at index.html before the hash and never navigates client-side', async () => {
    const resolve = await load('/docs/atlas', { offline: true });
    expect(resolve('/docs/atlas/cluster#step', '/docs/atlas/cluster/')).toEqual({
      href: '/docs/atlas/cluster/index.html#step',
      clientHref: null,
    });
  });

  it('does not double index.html offline', async () => {
    const resolve = await load('/docs/atlas', { offline: true });
    expect(resolve('/docs/atlas/cluster/index.html', '/')).toEqual({
      href: '/docs/atlas/cluster/index.html',
      clientHref: null,
    });
  });

  it('passes external urls through unchanged', async () => {
    const resolve = await load('/docs/atlas');
    expect(resolve('https://www.mongodb.com/docs/atlas/cluster', '/cluster/')).toEqual({
      href: 'https://www.mongodb.com/docs/atlas/cluster',
      clientHref: null,
    });
  });
});
