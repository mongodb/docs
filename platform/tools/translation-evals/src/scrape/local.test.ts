import { describe, it, expect } from 'vitest';
import { localUrlFor } from './local.js';
import { hasContent } from './browser.js';
import type { PageRef } from '../types.js';

const page: PageRef = { slug: 'atlas__alerts', urlPath: '/docs/atlas/alerts', mdxPath: 'atlas/alerts.mdx' };

describe('localUrlFor', () => {
  it('uses the local origin, no locale prefix, matching production-English paths', () => {
    expect(localUrlFor('http://localhost:3000', page)).toBe('http://localhost:3000/docs/atlas/alerts/');
    expect(localUrlFor('http://localhost:3000', { ...page, query: 'interface=atlas-ui' })).toBe(
      'http://localhost:3000/docs/atlas/alerts/?interface=atlas-ui',
    );
  });
});

describe('hasContent', () => {
  it('rejects empty and whitespace-only page text', () => {
    expect(hasContent('')).toBe(false);
    expect(hasContent(' \n\t ')).toBe(false);
    expect(hasContent('Docs Home')).toBe(true);
  });
});
