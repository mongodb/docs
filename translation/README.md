# Translation Service

In-house translation service for Docs Platform UI strings

## What it does

`translate()` accepts a JSON object of source content to translate, shaped
according to its `content_type`. Only one `content_type` is supported
today, `platform_strings`, whose payload is a flat `{ key: string }` map.
For `platform_strings`, `translate()` protects non-translatable terms
(product names such as `MongoDB`, `Atlas`, `Compass`) with `__PROTn__`
placeholder tokens (`__PROT1__`, `__PROT2__`, … — 1-indexed, no literal
braces), sends the protected text to a pluggable `TranslationBackend`,
validates the output per key, restores the protected terms, and returns a
flat JSON object keyed exactly like the input. Individual keys can fail
without failing the batch: failed keys are `null` in `translations`,
explained in `errors`, and flagged via `meta.partial_failure`.

## A note on `content_type`

`content_type` is no longer load-bearing. The original design had the
service itself learn additional payload shapes — Markdown/MDX, nested
objects — and branch on `content_type` to handle each.

That is not the direction taken. MDX is handled outside the service by
`platform/tools/mdx-translation-adapter/`, which flattens a document into
the same flat `{ key: string }` payload this service already accepts, and
reapplies the translated strings to the original document afterwards. The
service therefore stays format-agnostic: it only ever sees flat strings and
never needs to understand markup.

The field is kept because it costs nothing and preserves the option — it is
validated, defaulted, and echoed back in `meta.content_type`, so a payload
shape that genuinely cannot be flattened could still be added later without
a breaking change to the request contract. Until that happens,
`platform_strings` is the only accepted value and there is no reason for a
caller to set it explicitly.

## Usage

```ts
import { translate, StubBackend } from "./src/index.js";

const response = await translate(
  {
    source_locale: "en-us",
    target_locale: "pt-br",
    payload: {
      "actions.ask_mongodb_ai": "Ask MongoDB AI",
      "actions.copy_page": "Copy page",
    },
    non_translatable_terms: ["MongoDB", "MongoDB AI", "Atlas", "Compass"],
  },
  { backend: new StubBackend() },
);

// response.source_locale — echoed from the request
// response.target_locale — echoed from the request
// response.translations  — Record<string, string | null>, keys preserved
// response.errors        — per-key { code, message } for failed keys
// response.meta          — provider, model, content_type, partial_failure, request_id
```

`content_type` is optional and defaults to `platform_strings`;
`non_translatable_terms` is optional and defaults to empty. A request may
also carry `backend_preferences: { provider, model }`, both defaulting to
`"auto"`. Preferences are validated and passed through to the backend on
the batch request, but no backend reads them yet — routing is currently
decided by whichever backend you hand to `translate()`. `meta.provider` and
`meta.model` report what the backend actually used, not what was requested.

Invalid requests (bad locale tag, unsupported `content_type`, non-string
payload values) throw `RequestValidationError`, which carries every
`ValidationIssue` found.

`src/index.ts` re-exports every module, so pipeline internals
(`validateRequest`, `normalize`, `protectSegments`, `validateOutput`,
`buildResponse`), the protection helpers, the `GroveBackend` class and its
config/request/response helpers, the prompt constants, and all wire types
are importable. Only `translate()`, the backends, and the error classes are
intended as the stable surface; treat the rest as internal.

## Pipeline

`translate()` → Request Validator (`validation.ts`) → JSON Normalizer
(`normalize.ts`) → Protection Layer (`protect-segments.ts`, built on
`protection-helpers.ts`) → `TranslationBackend.translateBatch()` → Output
Validator (`validate-output.ts`) → Response Builder (`build-response.ts`).

![Translation service pipeline flow](./docs/translate-service-flow.png)

## Backends

The service is provider- and LLM-agnostic: implement the
`TranslationBackend` interface (`src/types.ts`) and pass it to
`translate()`. `StubBackend` (`src/backends/stub-backend.ts`) is a
deterministic development stand-in that prefixes the target locale and
supports fault injection (`errorFor`, `omitKeys`, `corruptTokensFor`) for testing failure paths.

`GroveBackend` (`src/backends/llm/grove/backend.ts`) is currently the only real backend. It calls the Grove gateway Responses API (`gpt-5.5`) and
implements the same `TranslationBackend` seam. Create one from the
environment with `createGroveBackend()`, which reads `GROVE_API_KEY`
(required) and the optional `GROVE_ENDPOINT`, `GROVE_MODEL`, and
`GROVE_TIMEOUT_MS` overrides:

```ts
import { translate, createGroveBackend } from "./src/index.js";

const response = await translate(request, { backend: createGroveBackend() });
```

Whole-request failures (HTTP error, timeout, unparseable or mis-shaped
output) throw `BackendError`; the pipeline degrades them to per-key
errors so the response shape stays stable.

## Development

This directory is standalone (not part of the `platform/` pnpm workspace)
with its own `npm` lockfile. From `translation/`:

```sh
npm install        # once
npm test           # jest
npm run test:watch
npm run typecheck  # tsc --noEmit (src + tests)
npm run build      # emits dist/ from src only
```

## Live end-to-end test

The jest suite is hermetic (it injects fake backends and never hits the
network). To exercise the real Grove gateway, use the e2e script.
It is intentionally kept out of jest so CI stays offline.

```sh
cp .env.example .env      # then edit .env and set GROVE_API_KEY
npm run e2e               # builds dist/, loads .env, calls Grove for real
```

`npm run e2e` runs `scripts/e2e-translate.mjs`, which translates a few
sample strings (with a protected product name), prints the response and
latency, and asserts the invariants that matter: keys preserved, no
partial failures, protected terms intact, and no leaked `__PROTn__`
tokens. It exits non-zero if any check fails, so it doubles as a smoke
test. Your key comes from `.env` (gitignored); the script reads the same
`GROVE_*` variables as `createGroveBackend()`.
