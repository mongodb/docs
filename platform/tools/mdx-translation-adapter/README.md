# mdx-translation-adapter

Turns an MDX document into a flat `key -> string` payload a translation
service can handle, then reapplies the translated strings to the original
document and serializes it back to MDX.

The adapter never asks the translation service to understand MDX. It walks
the MDAST once, pulls out only the strings a reader actually sees, and
retains the parsed tree in memory so reconstruction is a targeted write-back
rather than a re-parse of translated markup.

## Install / build

The package is a workspace library (no CLI). It is consumed from `dist/`, so
rebuild after editing `src/`:

```bash
pnpm build       # tsc -> dist/
pnpm test        # vitest
pnpm typecheck
pnpm lint
```

## Usage

The one-call path — extract, translate, reconstruct:

```ts
import { translateMdx } from 'mdx-translation-adapter';

const translated = await translateMdx(mdxSource, async (payload, terms) => {
  // call your translation service; return { [key]: translatedString | null }
  return await myService(payload, terms);
});
```

### Walkthrough: `extract` → translate → `reconstruct`

Drive the two halves yourself when you need the payload in hand. Given this
input document:

```mdx
---
title: Connect to a Cluster
description: Learn how to connect to a MongoDB cluster.
---

# Connect to a Cluster

Use the [connection string](/connect) to connect. Run `mongosh` first.

<Note title="Before you begin">
  Create a database user.
</Note>

<Image src="/img/connect.png" alt="The connect dialog" />
```

**Step 1 — `extract(mdx)`** returns a `ContentObject`:

```ts
const content = extract(mdxSource);
```

`content.payload` is the flat map you send to the service:

```json
{
  "frontmatter.description": "Learn how to connect to a MongoDB cluster.",
  "heading[0]": "Connect to a Cluster",
  "paragraph[0]": "Use the O0connection stringC0 to connect. Run S1 first.",
  "note[0].@title": "Before you begin",
  "note[0].paragraph[0]": "Create a database user.",
  "image[0].@alt": "The connect dialog"
}
```

Note what happened to `paragraph[0]`: the link became a wrap pair
(`O0` … `C0`) around its still-translatable text, and the inline code became
a single opaque token (`S1`). Each token is fenced by invisible Private Use
Area characters, so `O0` above is really `U+E000 O 0 U+E001` — copy them from
`non_translatable_terms`, don't retype them.

`content.non_translatable_terms` is exactly those tokens:

```json
["O0", "C0", "S1"]
```

`content.manifest` is the in-memory state (retained AST + one entry per key).
Pass it straight back to `reconstruct`; don't inspect or serialize it.

**Step 2 — translate.** Send `payload` and `non_translatable_terms` to the
service. The response is `Record<string, string | null>` with the same keys:

```json
{
  "frontmatter.description": "Découvrez comment vous connecter à un cluster MongoDB.",
  "paragraph[0]": "Utilisez la O0chaîne de connexionC0 pour vous connecter. Exécutez d'abord S1.",
  "...": "..."
}
```

The translator is free to move tokens around the sentence — that's the point
— but every token must still be present. A `null` value or a dropped token
fails validation in step 3.

**Step 3 — `reconstruct(translations, content)`** writes the strings back
into the retained AST and serializes:

```ts
const output = reconstruct(translations, content);
```

```mdx
---
title: Connect to a Cluster
description: Découvrez comment vous connecter à un cluster MongoDB.
---

# Se connecter à un cluster

Utilisez la [chaîne de connexion](/connect) pour vous connecter. Exécutez d'abord `mongosh`.

<Note title="Avant de commencer">
  Créez un utilisateur de base de données.
</Note>

<Image src="/img/connect.png" alt="La boîte de dialogue de connexion" />
```

The link target, the code span, the `src`, the untranslated `title`
frontmatter, and the MDX structure all come through untouched — only the
extracted strings changed.

`extract` and `reconstruct` must run in the **same process**: the content
object's manifest holds references into the retained in-memory AST. Do not
serialize a `ContentObject` and rehydrate it elsewhere.

`translateMdx` also accepts `{ nonTranslatableTerms }` — caller-supplied
terms (product names, identifiers) merged with the adapter's own tokens.

### Trying it against a real file

`scripts/run-adapter.mjs` runs the adapter over an `.mdx` file using the
Grove backend from the sibling `translation` package:

```bash
pnpm build   # here, and `npm run build` in platform/translation
node --env-file-if-exists=../../../translation/.env \
  scripts/run-adapter.mjs ../../../content-mdx/compass/connect.mdx fr
```

## What gets extracted

Three kinds of manifest entry, each keyed by a stable full path scoped to its
sibling list (e.g. `banner[0].paragraph[1]`, never a document-global counter):

| Kind | Key example | Source |
| --- | --- | --- |
| `block` | `banner[0].paragraph[0]` | paragraph, heading, and table-cell phrasing content |
| `prop` | `image[0].@alt` | translatable JSX attributes |
| `frontmatter` | `frontmatter.description` | allowlisted YAML fields |

Frontmatter is allowlisted, not inferred — currently `description` only
(`TRANSLATABLE_FRONTMATTER_KEYS` in `src/frontmatter.ts`).

### Inline placeholders

A block's translatable string is one flat string, so non-text inline nodes
are swapped for opaque tokens delimited by Unicode Private Use Area
characters (so they can't collide with literal source text):

- **wrap** (`O0` … `C0`) — nodes with translatable children: link, emphasis,
  strong. Children are restored from inside the translated tokens.
- **attr-wrap** — a self-closing element whose primary text lives in an
  attribute (e.g. `<Reference title="X" />`). The value is inlined into the
  block string so the translator sees it in context for gender/number
  agreement, then written back to the attribute.
- **opaque** (`S0`) — inline nodes with no translatable text: inline code,
  breaks, inline JSX. Kept verbatim.

Every token is reported in `non_translatable_terms` so the service protects
it.

## Component registry

`src/component-registry.ts` decides how each MDX component is treated:

- **container** — recurse into children as blocks (admonitions, `Procedure` /
  `Step`, `Tabs` / `Tab`, tables, `Collapsible`, `Include` / `Replacement`,
  `IoCodeBlock`, `VersionAdded`).
- **opaque** — do not recurse; only listed props translate (`Image`, `Abbr`).
- **reference** — preserve verbatim (`Reference`, `RefRole`, `RefTarget`,
  `Target`).

Unregistered components fall back to `container` with no translatable props,
matching the build pipeline's unwrap behavior.

Props are translatable if they appear in `GLOBAL_TRANSLATABLE_PROPS` (`title`,
`alt`, `label`, `aria-label`, …) or in a component's own `translatableProps`.
Identifier-ish props are deliberately excluded — `Tab.name` (the visible
heading) translates, `tabid` never does.

When adding a component, ground its rule in what the corresponding
`transform-*.ts` build plugin actually renders, not in what the tag name
suggests.

## Failure policy

`reconstruct` validates before emitting anything and throws
`ReconstructionError` — producing no output — when:

- a payload key is missing or its translation is `null`, or
- a placeholder token did not survive translation.

This is deliberate: a half-translated document with mangled markup is worse
than a clear failure. Use `validateTranslation` directly if you want to check
a response without reconstructing.
