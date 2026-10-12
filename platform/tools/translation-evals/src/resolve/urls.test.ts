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

describe('slugFor', () => {
  it('appends a query hash so variants do not collide', () => {
    expect(slugFor('/docs/atlas/alerts')).toBe('atlas__alerts');
    expect(slugFor('/docs/atlas/alert-resolutions', 'interface=atlas-ui')).toBe('atlas__alert-resolutions__interface_atlas-ui');
  });
});
