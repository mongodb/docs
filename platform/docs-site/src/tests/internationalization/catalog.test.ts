import { IntlMessageFormat } from 'intl-messageformat';
import { getCatalog } from '@/internationalization/catalogs';
import enUs from '@/internationalization/platform-strings.en-us.json';
import { createTranslator } from '@/internationalization/translate';
import type { AvailableLocaleType } from '@/utils/locale';

const TRANSLATED_LOCALES: Record<Exclude<AvailableLocaleType, 'en-us'>, true> = {
  'pt-br': true,
  es: true,
  'ko-kr': true,
  'ja-jp': true,
  'zh-cn': true,
};

const isValidIcu = (message: string, locale: string) => {
  try {
    return !!new IntlMessageFormat(message, locale);
  } catch {
    return false;
  }
};

describe('en-us platform strings', () => {
  it.each(Object.entries(enUs))('%s is a valid ICU message', (_key, message) => {
    expect(() => new IntlMessageFormat(message, 'en-us')).not.toThrow();
  });

  describe('messages that take values', () => {
    const { t, t_rich } = createTranslator('en-us', enUs, enUs);

    it('formats the permalink title for each description', () => {
      expect(t('permalink.title', { description: 'heading' })).toBe('Permalink to this heading');
      expect(t('permalink.title', { description: 'definition' })).toBe('Permalink to this definition');
    });

    it('interpolates labels and names', () => {
      expect(t('nav.back_to', { label: 'Drivers' })).toBe('Back to Drivers');
      expect(t('nav.version_label', { version: '2.0' })).toBe('Version 2.0');
      expect(t('offline.select_version_for', { name: 'Atlas' })).toBe('Select Offline Version for Atlas');
      expect(t('permalink.to_label', { label: 'Setup' })).toBe('Permalink to Setup');
    });

    it('keeps straight quotes around the skill name', () => {
      expect(t('skills.master_skill_for_free', { skill: 'Atlas Search' })).toBe('Master "Atlas Search" for free!');
    });

    it('keeps typographic apostrophes', () => {
      expect(t('errors.page_unavailable_in_version')).toBe(
        'We’re sorry, this page isn’t available in the version you selected.',
      );
    });

    it('keeps the non-breaking space before the legacy docs link', () => {
      const description = t_rich('offline.modal_description', { link: (chunks) => `[${chunks.join('')}]` });
      expect(description).toContain('Visit our [legacy docs site]');
    });
  });
});

describe.each(Object.keys(TRANSLATED_LOCALES))('%s platform strings', (locale) => {
  const bundle = getCatalog(locale);

  it('only has keys that en-us has', () => {
    expect(Object.keys(bundle).filter((key) => !(key in enUs))).toEqual([]);
  });

  it('only has valid ICU messages', () => {
    const invalid = Object.entries(bundle)
      .filter(([, message]) => !isValidIcu(message, locale))
      .map(([key]) => key);
    expect(invalid).toEqual([]);
  });
});
