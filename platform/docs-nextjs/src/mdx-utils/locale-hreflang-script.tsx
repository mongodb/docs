import { DOTCOM_BASE_URL } from '@/constants';
import { getLocaleMapping } from '@/utils/locale';
import { assertLeadingSlash } from '@/utils/assert-leading-slash';

interface LocaleHreflangScriptProps {
  slug: string;
}

/**
 * Injects <link rel="alternate" hreflang> tags into <head> at runtime with the
 * sl_opaque class, which prevents Smartling GDN from rewriting their href values.
 *
 * The Next.js Metadata API (alternates.languages) handles the static/SEO version of
 * these links. This script handles the Smartling requirement, since the Metadata API
 * does not support custom attributes on generated <link> elements.
 */
export function LocaleHreflangScript({ slug }: LocaleHreflangScriptProps) {
  const localeHrefMap = getLocaleMapping(DOTCOM_BASE_URL, assertLeadingSlash(slug === '/' ? '' : slug));
  const xDefaultHref = (localeHrefMap['en-us'] as string).toLowerCase();

  // Do not remove class. This is used to prevent Smartling from potentially overwriting these links
  const entries = [
    ...Object.entries(localeHrefMap).map(([hrefLang, href]) => ({ hrefLang, href: href.toLowerCase(), className: 'sl_opaque' })),
    ...(xDefaultHref ? [{ hrefLang: 'x-default', href: xDefaultHref, className: 'sl_opaque' }] : []),
  ];

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){var e=${JSON.stringify(
          entries,
        )};e.forEach(function(l){var t=document.createElement('link');t.rel='alternate';t.hreflang=l.hrefLang;t.href=l.href;t.className='sl_opaque';document.head.appendChild(t)})})()`,
      }}
    />
  );
}
