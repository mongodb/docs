import { createTranslator } from '@/internationalization/translate';

describe('createTranslator', () => {
  it('resolves a plain string from the active bundle', () => {
    const translator = createTranslator('en-us', { greeting: 'Hello' }, {});
    expect(translator.t('greeting')).toBe('Hello');
  });

  it('falls back to the English bundle when the active bundle lacks the key', () => {
    const translator = createTranslator('es', {}, { greeting: 'Hello' });
    expect(translator.t('greeting')).toBe('Hello');
  });

  it('returns the key itself when it is missing everywhere', () => {
    const translator = createTranslator('en-us', {}, {});
    expect(translator.t('nav.missing')).toBe('nav.missing');
  });

  it('interpolates named values', () => {
    const translator = createTranslator('en-us', { hi: 'Hi {name}' }, {});
    expect(translator.t('hi', { name: 'Sam' })).toBe('Hi Sam');
  });

  it('formats plurals', () => {
    const translator = createTranslator('en-us', { results: '{count, plural, one {# result} other {# results}}' }, {});
    expect(translator.t('results', { count: 1 })).toBe('1 result');
    expect(translator.t('results', { count: 42 })).toBe('42 results');
  });

  it('renders rich-text tags via the t_rich function', () => {
    const translator = createTranslator('en-us', { m: 'See <link>docs</link>.' }, {});
    expect(translator.t_rich('m', { link: (chunks) => `<a>${chunks.join('')}</a>` })).toBe('See <a>docs</a>.');
  });

  it('falls back to the raw message when ICU parsing fails', () => {
    const translator = createTranslator('en-us', { bad: 'Hello {unclosed' }, {});
    expect(translator.t('bad')).toBe('Hello {unclosed');
  });
});
