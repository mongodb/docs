# Platform string translation

Resolves a stable key to a translated message for the locale this site was
built for, and formats it with ICU MessageFormat.

This layer covers **platform UI chrome only**: buttons, placeholders, modals,
error pages. Documentation body content is translated on a separate path (see
`platform/tools/translation-mdx-adapter/`), and TOC/navigation labels come from
data rather than from this catalog.

Some design-system components ship their own English text (for example the
callout heading). Pass translated text through the component's label props
instead of relying on the default.

## Files

| File | Role |
| --- | --- |
| `translate.ts` | `createTranslator(locale, bundle, fallback)`: lookup and ICU formatting. Framework-agnostic, no React state. |
| `get-translator.ts` | `getTranslator()`: the translator for the build locale. A plain function, callable from server and client code. |
| `catalogs.ts` | Registry mapping each shipped locale code to its bundle, plus `FALLBACK_LOCALE` and `getCatalog()`. |
| `platform-strings.en-us.json` | The source catalog. |
| `platform-strings.<locale>.json` | Translated bundles. |

## Usage

`getTranslator()` is a plain function, not a hook. The locale is fixed at build time, so it can be called in client components, server components and ordinary functions.

```tsx
'use client';
import { getTranslator } from '@/internationalization/get-translator';

function CopyButton() {
  const { t } = getTranslator();
  return <Button aria-label={t('actions.copy_page')}>{t('actions.copy_page')}</Button>;
}
```

A server component calls it the same way:

```tsx
import { getTranslator } from '@/internationalization/get-translator';

export default function Heading() {
  const { t } = getTranslator();
  return <h1>{t('errors.something_went_wrong')}</h1>;
}
```

The keys in these examples are illustrative.

`t()` and `t_rich()` only accept keys that exist in the English catalog (`PlatformStringKey`, derived from `platform-strings.en-us.json`), so a misspelled key fails type-check. When a key is stored in data, keep it a literal (for example with `as const`) so it stays typed.

### `t` vs `t_rich`

`t(key, values?)` returns a **string**. Use it for plain copy, interpolation, and
plurals, anywhere a string is required, including attributes such as
`aria-label`, `title`, and `alt`.

```tsx
t('search.results', { count: 42 });   // "42 RESULTS"
t('nav.back_to', { label: 'Atlas' }); // "Back to Atlas"
```

`t_rich(key, values?)` returns a **ReactNode**. Use it when the message contains
`<tag>…</tag>` slots that must render as elements. Each tag name in the message
is supplied as a function that receives the enclosed chunks:

```tsx
t_rich('errors.the_page_with_the_url_does_not_exist', {
  fromURL,
  link: (chunks) => <Link to={fromURL}>{chunks}</Link>,
});
```

The catalog entry behind that call is:

```json
"The page with the URL “<link>{fromURL}</link>” does not exist."
```

Keeping the tag inside the message lets translators move the linked phrase
within the sentence instead of forcing a fixed word order.

## Locale selection

The locale is fixed at build time by the `NEXT_PUBLIC_DOCS_LOCALE` environment
variable, for example `es`. Set it per site. When it is unset, or is not a
supported locale code, the build is `en-us`.

The URL prefix and the `mdb_docsPrefLocale` cookie are deliberately ignored.
Smartling still serves translated pages of the English build at locale-prefixed
URLs, and platform strings on those builds must stay English.

## Lookup and fallback

Resolution order is **active bundle → English fallback bundle → the key itself**.
`getCatalog()` also falls back to English for an unrecognized locale code.

Formatting never throws at render time: if a message fails to parse or format,
the raw message string is returned instead. A missing key surfaces as the key
text in the UI, which makes gaps visible without breaking the page.

Compiled `IntlMessageFormat` instances are cached in a module-level map keyed by
`locale + message`, shared across every translator instance.

## Locales

`catalogs.ts` registers a bundle for every locale in `AvailableLocaleType`
(`src/utils/locale.ts`). `en-us` is the source catalog and the fallback. A locale
that is not translated yet has an empty `{}` bundle and resolves to English.

To add a locale: add its code to `AvailableLocaleType`, add the bundle JSON file,
then import and register it in `catalogs.ts`. The type of `catalogs` fails the
build if a locale is missing.

## Adding or changing a string

1. Add the key and English text to `platform-strings.en-us.json`. Follow the
   existing naming: an area prefix plus a slug of the text (`actions.copy_page`,
   `search.results`).
2. Use `t()` / `t_rich()` in the component.
3. Commit the catalog change alongside the component change.
4. Translated bundles are produced from the English catalog with the translation
   service (`platform/tools/translation-service/`), reviewed, and committed. A key
   missing from a bundle renders in English.

## Tests

`src/tests/internationalization/` and `src/tests/utils/build-locale.test.ts`.
