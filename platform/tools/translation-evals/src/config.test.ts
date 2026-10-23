import { describe, it, expect } from 'vitest';
import { loadConfig } from './config.js';

describe('loadConfig', () => {
  it('applies defaults and derives paths from the package root', () => {
    const cfg = loadConfig({});
    expect(cfg.prodOrigin).toBe('https://www.mongodb.com');
    expect(cfg.localOrigin).toBe('http://localhost:3000');
    expect(cfg.locales).toEqual(['pt-br', 'es', 'ko-kr', 'ja-jp', 'zh-cn']);
    expect(cfg.contentMdxDir.endsWith('content-mdx')).toBe(true);
    expect(cfg.dataDir.endsWith('translation-evals/data')).toBe(true);
    expect(cfg.braintrustProject).toBe('docs-translations');
  });

  it('honors TARGET_LOCALES override', () => {
    const cfg = loadConfig({ TARGET_LOCALES: 'es,ja-jp' });
    expect(cfg.locales).toEqual(['es', 'ja-jp']);
  });

  it('normalises blank env values to undefined, not empty strings', () => {
    // `cp .env.example .env` leaves these present but empty; Node's
    // `--env-file` loads them as "". An empty string must not count as an
    // override, or the backend would send model "" and an empty key.
    const cfg = loadConfig({
      AI_GATEWAY_API_KEY: '',
      TRANSLATOR_MODEL: '',
      JUDGE_MODEL: '',
    });
    expect(cfg.translatorModel).toBeUndefined();
    expect(cfg.judgeModel).toBeUndefined();
  });
});
