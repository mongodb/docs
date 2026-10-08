import { describe, it, expect } from 'vitest';
import { loadConfig } from '../src/config.js';

describe('loadConfig', () => {
  it('applies defaults and derives paths from the package root', () => {
    const cfg = loadConfig({});
    expect(cfg.prodOrigin).toBe('https://www.mongodb.com');
    expect(cfg.localOrigin).toBe('http://localhost:3000');
    expect(cfg.locales).toEqual(['pt-br', 'es', 'ko-kr', 'ja-jp', 'zh-cn']);
    expect(cfg.contentMdxDir.endsWith('content-mdx')).toBe(true);
    expect(cfg.dataDir.endsWith('translation-evals/data')).toBe(true);
    expect(cfg.braintrustProject).toBe('docs-translations-rendered');
  });

  it('honors TARGET_LOCALES override', () => {
    const cfg = loadConfig({ TARGET_LOCALES: 'es,ja-jp' });
    expect(cfg.locales).toEqual(['es', 'ja-jp']);
  });
});
