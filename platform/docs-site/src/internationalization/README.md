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

The locale is fixed at build time by the `DOCS_LOCALE` environment variable, for
example `es`. Set it per site; `next.config.mjs` validates it and maps it to
`NEXT_PUBLIC_DOCS_LOCALE`, which the app reads. When it is unset or `en-us`, the
build is `en-us`; an unsupported value fails the build.

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

## Design system (VIA) built-in strings

`@via-ds/components` ships English defaults for its own labels. Each one below is
overridden through a prop so it follows the build locale (checked against 0.15.0).

Not every default is a `*Label` prop (`headingText`, `aria-label` and the `Table`
`messages` object are not). VIA tags every English default with `@default '` in
its `.d.ts` files, so search `node_modules/@via-ds/components/dist` for that. When
VIA adds a component or a default that docs-site uses, add a row.

| English default                                                           | Keys                                          | Where                                  | Prop                                                                                                                      | Seen by                  |
| ------------------------------------------------------------------------- | --------------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| Note, Tip, Important, Warning, Example                                    | `admonition.*`                                | `Admonition` (`Callout`)               | `headingText`                                                                                                             | Everyone                 |
| Copied!                                                                   | `code.copied`                                 | `Code` (`CopyButton`)                  | `copiedLabel`                                                                                                             | Everyone                 |
| Close dialog                                                              | `dialog.close`                                | `Lightbox`, `DownloadModal` (`Dialog`) | `closeButtonLabel`                                                                                                        | Screen readers           |
| Notifications, Close                                                      | `toast.notifications`, `toast.close`          | `ViaProviderWrapper` (`Toaster`)       | `aria-label`, `closeButtonLabel`                                                                                          | Screen readers           |
| Clear search                                                              | `search.clear`                                | `SearchInput` (`SearchField`)          | `clearButtonAriaLabel`                                                                                                    | Screen readers           |
| Loading                                                                   | `actions.loading`                             | `DownloadModal` (`Button`)             | `pendingLabel`                                                                                                            | Screen readers           |
| Breadcrumbs, Show all breadcrumbs                                         | `nav.breadcrumbs`, `nav.show_all_breadcrumbs` | `BreadcrumbContainer` (`Breadcrumbs`)  | `aria-label`, `overflowAriaLabel`                                                                                         | Screen readers           |
| No results, Show suggestions, Remove, N items selected, No items selected | `combobox.*`                                  | `OpenAPIChangelog` (`Combobox`)        | `emptyLabel`, `menuTriggerAriaLabel`, `chipRemoveButtonAriaLabel`, `formatSelectionCount`, `multipleSelectionPlaceholder` | Everyone, screen readers |

Not overridden:

- `Select` has `emptyLabel`, `loadingLabel` and `optionalLabel`. None is
  overridden: no `Select` here sets `isOptional` or `isLoading`, and none is
  expected to render with no options. Add them if that changes.
- `Table` takes a `messages` object. `DownloadModal` uses selectable rows, so its
  "Row selection", "Select all rows" and "Select row {rowId}" defaults are still
  English for screen readers. The MDX `Table` has no selection, expand or sort.
- `Combobox` has `loadingLabel` and `optionalLabel`. Neither is overridden: the
  comboboxes in `OpenAPIChangelog` set neither `isLoading` nor `isOptional`.
- VIA components docs-site does not import yet (for example `Drawer`, `SidePanel`
  and `Pagination`) have English defaults too. Check them when one is first used.
- `UnifiedSidenav` (`AccordionNav`, `DoublePannedNav`) still uses LeafyGreen.
- `@mdb/consistent-nav` (header and footer) localizes itself from the `locale` it
  is given. `mongodb-chatbot-ui` has hard-coded English strings with no override.

## Tests

`src/tests/internationalization/` and `src/tests/utils/build-locale.test.ts`.
