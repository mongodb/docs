import { describe, it, expect } from 'vitest';
import { buildPageRefs, slugFor } from './urls.js';

describe('buildPageRefs', () => {
  it('derives basePath from dir-name-to-prefix and expands composable variants', () => {
    const refs = buildPageRefs(
      'atlas',
      [['atlas', 'alerts'], ['atlas', 'alert-resolutions']],
      { atlas: 'docs/atlas' },
      { composablePages: { 'alert-resolutions': [{ interface: 'atlas-ui' }, { interface: 'atlas-cli' }] } },
    );
    expect(refs.find((r) => r.urlPath === '/docs/atlas/alerts')!.slug).toBe('alerts');
    const variants = refs.filter((r) => r.urlPath === '/docs/atlas/alert-resolutions');
    expect(variants.map((v) => v.query).sort()).toEqual(['interface=atlas-cli', 'interface=atlas-ui']);
  });
});

describe('buildPageRefs (versioned site)', () => {
  it('inserts the version segment and keeps the composable key site-relative', () => {
    const refs = buildPageRefs(
      'manual/v8.0',
      [
        ['manual', 'v8.0', 'about'],
        ['manual', 'v8.0', 'alert-resolutions'],
      ],
      { manual: 'docs' },
      { composablePages: { 'alert-resolutions': [{ interface: 'atlas-ui' }] } },
    );
    expect(refs.find((r) => r.urlPath === '/docs/v8.0/about')).toMatchObject({
      urlPath: '/docs/v8.0/about',
      mdxPath: 'manual/v8.0/about.mdx',
    });
    // the variant is found: the composable key is rel ('alert-resolutions'), not the root-relative path
    expect(refs.some((r) => r.urlPath === '/docs/v8.0/alert-resolutions' && r.query === 'interface=atlas-ui')).toBe(true);
  });
});

describe('slugFor', () => {
  it('appends a query hash so variants do not collide', () => {
    expect(slugFor('/docs/atlas/alerts')).toBe('atlas__alerts');
    expect(slugFor('/docs/atlas/alert-resolutions', 'interface=atlas-ui')).toBe('atlas__alert-resolutions__interface_atlas-ui');
  });
});
