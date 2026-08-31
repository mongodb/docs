import {
  diskDirBelongsToDocsProject,
  sitemapBaseDocUrl,
  sitemapPublicRest,
  sitemapUrlPrefix,
} from '@/utils/sitemap-site-path';

const PREFIX_MAP = {
  landing: 'docs',
  manual: 'docs',
  search: 'docs/atlas/atlas-search',
  java: 'docs/drivers/java/sync',
};

describe('diskDirBelongsToDocsProject', () => {
  it('keeps landing from picking up manual versions', () => {
    expect(diskDirBelongsToDocsProject('landing', 'landing')).toBe(true);
    expect(diskDirBelongsToDocsProject('manual/v8.0', 'landing')).toBe(false);
    expect(diskDirBelongsToDocsProject('search', 'landing')).toBe(false);
  });

  it('keeps a manual deploy from picking up landing', () => {
    expect(diskDirBelongsToDocsProject('manual/v8.0', 'manual')).toBe(true);
    expect(diskDirBelongsToDocsProject('manual/current', 'manual')).toBe(true);
    expect(diskDirBelongsToDocsProject('landing', 'manual')).toBe(false);
  });

  it('limits a single-version build to that version dir', () => {
    expect(diskDirBelongsToDocsProject('java/current', 'java/current')).toBe(true);
    expect(diskDirBelongsToDocsProject('java/upcoming', 'java/current')).toBe(false);
  });
});

describe('sitemapUrlPrefix', () => {
  it('omits "landing" so pages sit at /docs/<page>/', () => {
    expect(sitemapUrlPrefix('landing', PREFIX_MAP)).toBe('');
  });

  it('uses the version segment for manual so pages sit at /docs/<version>/<page>/', () => {
    expect(sitemapUrlPrefix('manual/v8.0', PREFIX_MAP)).toBe('v8.0');
    expect(sitemapUrlPrefix('manual/upcoming', PREFIX_MAP)).toBe('upcoming');
    // Current Manual is a version directory named "manual", same as the project.
    expect(sitemapUrlPrefix('manual/manual', PREFIX_MAP)).toBe('manual');
  });

  it('keeps a non-empty unversioned prefix', () => {
    expect(sitemapUrlPrefix('search', PREFIX_MAP)).toBe('atlas/atlas-search');
  });

  it('keeps a versioned driver prefix', () => {
    expect(sitemapUrlPrefix('java/current', PREFIX_MAP)).toBe('drivers/java/sync/current');
  });
});

describe('sitemapPublicRest', () => {
  it('stages landing at the public/ root', () => {
    expect(sitemapPublicRest('', '')).toBe('');
  });

  it('stages each manual version under public/<version>/', () => {
    expect(sitemapPublicRest('v8.0', '')).toBe('v8.0');
    expect(sitemapPublicRest('manual', '')).toBe('manual');
  });

  it('stages an unversioned prefixed docset at the public/ root', () => {
    expect(sitemapPublicRest('atlas/atlas-search', 'atlas/atlas-search')).toBe('');
  });

  it('stages a versioned prefixed docset under public/<version>/', () => {
    expect(sitemapPublicRest('drivers/java/sync/current', 'drivers/java/sync')).toBe(
      'current',
    );
  });
});

describe('sitemapBaseDocUrl', () => {
  const site = 'https://www.mongodb.com';

  it('uses /docs for landing', () => {
    expect(sitemapBaseDocUrl(site, '')).toBe(`${site}/docs`);
  });

  it('uses /docs/<version> for manual', () => {
    expect(sitemapBaseDocUrl(site, 'v8.0')).toBe(`${site}/docs/v8.0`);
    expect(sitemapBaseDocUrl(site, 'manual')).toBe(`${site}/docs/manual`);
  });
});
