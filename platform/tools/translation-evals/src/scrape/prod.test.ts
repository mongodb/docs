import { describe, it, expect } from 'vitest';
import { prodUrlFor } from './prod.js';
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
