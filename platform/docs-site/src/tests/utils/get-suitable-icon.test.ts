// ONLINE_IMAGE_PREFIX is computed once at module load from
// NEXT_PUBLIC_DOCS_BASE_PATH, so each case sets env vars then re-imports via
// jest.resetModules() to simulate a fresh per-project build.
describe('getSuitableIcon', () => {
  const load = async (docsProject?: string) => {
    process.env.NEXT_PUBLIC_DOCS_BASE_PATH = '/docs';
    if (docsProject !== undefined) {
      process.env.NEXT_PUBLIC_BUILD_DOCS_PROJECT = docsProject;
    }
    jest.resetModules();
    return import('@/utils/get-suitable-icon');
  };

  afterEach(() => {
    delete process.env.NEXT_PUBLIC_DOCS_BASE_PATH;
    delete process.env.NEXT_PUBLIC_BUILD_DOCS_PROJECT;
  });

  it('keeps the docset directory for a prefixed docset', async () => {
    const { getSuitableIcon } = await load('compass');
    expect(getSuitableIcon({ icon: '/images/icons/compass.svg', siteBasePrefix: 'docs/compass' })).toBe(
      '/docs/_next/static/images/compass/images/icons/compass.svg',
    );
  });

  // landing publishes at prefix `docs`, which strips to '', so without the
  // DOCS_PROJECT fallback the icon URL loses its `landing/` segment and 404s.
  it('recovers the docset directory for landing, whose prefix strips to empty', async () => {
    const { getSuitableIcon } = await load('landing');
    expect(getSuitableIcon({ icon: '/images/icons/java.svg', siteBasePrefix: 'docs' })).toBe(
      '/docs/_next/static/images/landing/images/icons/java.svg',
    );
  });

  it('prefers the dark-mode icon when one is set', async () => {
    const { getSuitableIcon } = await load('landing');
    expect(
      getSuitableIcon({
        icon: '/images/icons/Micronaut.png',
        iconDark: '/images/icons/Micronaut-dark.png',
        isDarkMode: true,
        siteBasePrefix: 'docs',
      }),
    ).toBe('/docs/_next/static/images/landing/images/icons/Micronaut-dark.png');
  });

  it('leaves hosted icon names alone', async () => {
    const { getSuitableIcon } = await load('landing');
    expect(getSuitableIcon({ icon: 'general_content_learn', siteBasePrefix: 'docs' })).toBe(
      'https://webimages.mongodb.com/_com_assets/icons/general_content_learn.svg',
    );
  });
});
