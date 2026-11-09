import { describe, expect, it } from 'vitest';
import { LOCALE_TARGETS, resolveTarget } from './locale-targets.js';

describe('locale targets', () => {
  it('maps the five locale repos', () => {
    expect(Object.keys(LOCALE_TARGETS).sort()).toEqual(
      ['es', 'ja-jp', 'ko-kr', 'pt-br', 'zh-cn'].sort(),
    );
    expect(resolveTarget('es')).toEqual({ repo: '10gen/docs-mdx-es', locale: 'es' });
  });

  it('throws on an unknown locale', () => {
    expect(() => resolveTarget('fr')).toThrow(/Unknown locale "fr"/);
  });
});
