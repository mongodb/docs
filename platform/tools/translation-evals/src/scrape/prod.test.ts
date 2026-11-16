import { describe, it, expect } from 'vitest';
import { prodUrlFor, scrapeWarn, shouldWrite } from './prod.js';
import type { PageRef } from '../types.js';

const page: PageRef = { slug: 'atlas__alerts', urlPath: '/docs/atlas/alerts', mdxPath: 'atlas/alerts.mdx' };

describe('prodUrlFor', () => {
  it('prefixes the locale and appends the query', () => {
    expect(prodUrlFor('https://www.mongodb.com', 'es', page)).toBe('https://www.mongodb.com/es/docs/atlas/alerts/');
    expect(prodUrlFor('https://www.mongodb.com', '', page)).toBe('https://www.mongodb.com/docs/atlas/alerts/');
    expect(prodUrlFor('https://www.mongodb.com', 'ja-jp', { ...page, query: 'interface=atlas-ui' })).toBe(
      'https://www.mongodb.com/ja-jp/docs/atlas/alerts/?interface=atlas-ui',
    );
  });
});

describe('scrapeWarn', () => {
  it('warns on a skipped page with its status', () => {
    expect(scrapeWarn('base', 'atlas__alerts', 'en', { kind: 'skipped', status: 404 })).toEqual({
      scope: 'base', event: 'warn', subject: 'scrape', attrs: { status: 404, slug: 'atlas__alerts', locale: 'en' },
    });
  });
  it('warns on an empty page', () => {
    expect(scrapeWarn('1/2', 'aggregation', 'pt-br', { kind: 'empty', page: { url: '', title: '', content: '' } })).toEqual({
      scope: '1/2', event: 'warn', subject: 'scrape', attrs: { empty: 1, slug: 'aggregation', locale: 'pt-br' },
    });
  });
  it('is silent on success', () => {
    expect(scrapeWarn('1/2', 's', 'es', { kind: 'ok', page: { url: '', title: '', content: 'x' } })).toBeNull();
  });
});

describe('shouldWrite', () => {
  it('records a successful scrape', () => {
    expect(shouldWrite({ kind: 'ok', page: { url: '', title: '', content: 'x' } })).toBe(true);
  });
  it('does not record an empty page, which would score as blank content', () => {
    expect(shouldWrite({ kind: 'empty', page: { url: '', title: '', content: '' } })).toBe(false);
  });
  it('does not record a skipped page', () => {
    expect(shouldWrite({ kind: 'skipped', status: 404 })).toBe(false);
  });
});
