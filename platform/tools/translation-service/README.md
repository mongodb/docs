# Translation Service

In-house translation service for Docs Platform UI strings

Related packages in `platform/tools/`:

- `translation-mdx-adapter/` flattens MDX documents into the `{ key: string }`
  payload this service accepts.
- `translation-evals/` evaluates LLM translations against production
  translations. Its planned `translate` stage will call this service.

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
`platform/tools/translation-mdx-adapter/`, which flattens a document into
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
`buildResponse`), the protection helpers, the `OpenAiBackend`,
`AnthropicBackend`, and `AwsTranslateBackend` classes and their helpers, the
prompt constants, and all wire types
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

`OpenAiBackend` (`src/backends/llm/openai/backend.ts`) calls the AI Gateway's OpenAI Responses API (`gpt-5.5`) and
implements the same `TranslationBackend` seam. Create one from the
environment with `createOpenAiBackend()`, which reads `AI_GATEWAY_API_KEY`
(required) and the optional `OPENAI_ENDPOINT`, `OPENAI_MODEL`, and
`OPENAI_TIMEOUT_MS` overrides:

```ts
import { translate, createOpenAiBackend } from "./src/index.js";

const response = await translate(request, { backend: createOpenAiBackend() });
```

The key and the endpoint must belong to the same gateway. A key issued
for a different gateway is rejected with HTTP 401, which looks like an
auth bug rather than a misconfiguration. Both backends default to the AI
Gateway; override `OPENAI_ENDPOINT` / `ANTHROPIC_ENDPOINT` if your key is
for the legacy Azure gateway.

Whole-request failures (HTTP error, timeout, unparseable or mis-shaped
output) throw `BackendError`; the pipeline degrades them to per-key
errors so the response shape stays stable.

`AnthropicBackend` (`src/backends/llm/anthropic/backend.ts`) calls the AI
Gateway's Anthropic Messages API (`claude-sonnet-5-5`) and implements the
same `TranslationBackend` seam. Create one from the environment with
`createAnthropicBackend()`, which reads the shared `AI_GATEWAY_API_KEY`
(required) and the optional `ANTHROPIC_ENDPOINT`, `ANTHROPIC_MODEL`,
`ANTHROPIC_TIMEOUT_MS`, and `ANTHROPIC_MAX_TOKENS` overrides:

```ts
import { translate, createAnthropicBackend } from "./src/index.js";

const response = await translate(request, { backend: createAnthropicBackend() });
```

It differs from `OpenAiBackend` in the wire format: it authenticates with
the `x-api-key` header (the OpenAI backend sends `api-key`) and sends an
`anthropic-version: 2023-06-01` header, because the Messages API is
versioned. The request body carries a required `max_tokens` and asks for
structured output through `output_config`.

The Anthropic backend requests structured output via
`output_config.format`. Current Claude models support this; if you select
an older model and a request fails with HTTP 400, check that the model
supports structured outputs.

`AwsTranslateBackend` (`src/backends/aws-translate/backend.ts`) calls
Amazon Translate's `TranslateText` API, a machine-translation baseline
for comparing against the LLM backends. It reports
`meta.provider: "aws-translate"` and `meta.model: "translate-text"`.
Create one from the environment with `createAwsTranslateBackend()`:

```ts
import { translate, createAwsTranslateBackend } from "./src/index.js";

const response = await translate(request, {
  backend: createAwsTranslateBackend(),
});
```

It differs from `OpenAiBackend` in a few ways:

- Credentials come from the AWS SDK default provider chain (for
  example `AWS_PROFILE` with SSO), not from a backend-specific variable.
  The identity needs `translate:TranslateText`. Optional overrides are
  `AWS_TRANSLATE_REGION` (falls back to `AWS_REGION`, then `us-east-1`),
  `AWS_TRANSLATE_TIMEOUT_MS`, and `AWS_TRANSLATE_CONCURRENCY` (default 5).
- `TranslateText` takes one string per call, so a batch becomes one
  call per key, at most `AWS_TRANSLATE_CONCURRENCY` at a time.
- There is no prompt, so `__PROTn__` tokens are wrapped in
  `<span translate="no">` elements and the text is HTML-escaped before
  sending, then unwrapped and unescaped afterward
  (`src/backends/aws-translate/markup.ts`).
- Service locale tags are mapped to AWS language codes
  (`src/backends/aws-translate/locales.ts`): for example `pt-br` becomes
  `pt` and `zh-cn` becomes `zh`.

Failures tied to a single string become per-key errors:
`TRANSLATION_FAILED` for text over the 10,000-byte limit,
`BACKEND_TIMEOUT` for a timed-out call, and `INVALID_OUTPUT` when the
translation contains markup the source didn't have. An unsupported
locale fails every key with `UNSUPPORTED_LOCALE`. Failures that would
affect every string, such as missing credentials or throttling that
persists after the SDK's retries, stop the batch and throw `BackendError`.
For debugging, error messages include the text sent to and returned by
AWS (truncated to 300 characters), the HTTP status, and the AWS request
id when AWS provides one.

AWS may store text submitted to Amazon Translate to improve its models
unless your AWS account has opted out. See
[Amazon Translate guidelines and quotas](https://docs.aws.amazon.com/translate/latest/dg/what-is-limits.html).

### Choosing a backend

To let configuration pick the provider instead of importing a specific
factory, use the registry (`src/backends/registry.ts`).
`createBackend(name)` takes a `BackendName` enum member
(`BackendName.OpenAI`, `BackendName.Anthropic`, `BackendName.AwsTranslate`,
`BackendName.Stub`).
When the name comes from untyped input such as a CLI flag, check it with
`isBackendName()` first; `BACKEND_NAMES` lists the valid string values
(`openai`, `anthropic`, `aws-translate`, `stub`) for error messages. The
OpenAI and Anthropic backends read the shared `AI_GATEWAY_API_KEY` plus
the optional `OPENAI_*` and `ANTHROPIC_*` endpoint, model, timeout, and
`ANTHROPIC_MAX_TOKENS` overrides; `AwsTranslateBackend` reads
`AWS_TRANSLATE_*`.
Each backend's `name` always matches its enum value, so `meta.provider`
reports what the caller selected.

```ts
import { translate, createBackend, BackendName } from "./src/index.js";

const response = await translate(request, {
  backend: createBackend(BackendName.AwsTranslate),
});
```

To add a provider, implement `TranslationBackend`, add a `BackendName`
member, and register a factory for it in `registry.ts`.

## Development

This is a private `platform/` pnpm workspace package. It is not published.
Install dependencies once from `platform/`, then run scripts from
`platform/tools/translation-service/`:

```sh
pnpm install       # from platform/
pnpm test          # jest
pnpm test:watch
pnpm typecheck     # tsc --noEmit (src + tests)
pnpm build         # emits dist/ from src only
```

## Live end-to-end test

The jest suite is hermetic (it injects fake backends and never hits the
network). To exercise a real backend, use the e2e script.
It is intentionally kept out of jest so CI stays offline.

```sh
cp .env.example .env              # then edit .env and set AI_GATEWAY_API_KEY
pnpm e2e                          # builds dist/, loads .env, calls OpenAI for real
pnpm e2e --backend anthropic      # calls the Anthropic Messages path for real
pnpm e2e --backend aws-translate  # calls AWS Translate with your AWS credentials
pnpm e2e --backend stub           # offline check of the script and pipeline
```

Without `--backend`, the script uses `openai`.

`pnpm e2e` runs `scripts/e2e-translate.mjs`, which translates a few
sample strings (with a protected product name), prints the response and
latency, and asserts the invariants that matter: keys preserved, no
partial failures, protected terms intact, and no leaked `__PROTn__`
tokens. It exits non-zero if any check fails, so it doubles as a smoke
test. Your key comes from `.env` (gitignored); `AI_GATEWAY_API_KEY` is the
shared key for the `openai` and `anthropic` backends, and the script reads
the same `OPENAI_*`, `ANTHROPIC_*`, and `AWS_TRANSLATE_*` variables as
`createOpenAiBackend()`, `createAnthropicBackend()`, and
`createAwsTranslateBackend()`.

### AWS credentials for the AWS Translate backend

The AWS Translate backend signs in through MongoDB's AWS SSO (IAM
Identity Center), using an AWS CLI profile. You need the AWS CLI v2 and
access to the AWS account set up for this service, with a role that
allows `translate:TranslateText`. If the account doesn't appear when you
sign in, ask whoever manages AWS access to assign it to you.

1. Create the profile. Any profile name works; these steps use
   `content-translation-service`:

   ```sh
   aws configure sso --profile content-translation-service
   ```

   Answer the prompts:

   - **SSO session name:** `mongodb`. If you already have this session
     (for example, from the CodeArtifact setup), the CLI reuses it and
     skips the next two prompts.
   - **SSO start URL:** `https://mongodbcorp.awsapps.com/start`
   - **SSO region:** `us-east-1`
   - **SSO registration scopes:** accept the default
     (`sso:account:access`).

   A browser window opens for you to sign in. Then pick the account set
   up for AWS Translate and its role. For the remaining prompts, use
   `us-east-1` as the default client region and accept the default
   output format.

2. Sign in and confirm the profile works:

   ```sh
   aws sso login --profile content-translation-service
   aws sts get-caller-identity --profile content-translation-service
   ```

3. In `.env`, set the profile:

   ```sh
   AWS_PROFILE=content-translation-service
   ```

4. Run the e2e test:

   ```sh
   pnpm e2e --backend aws-translate
   ```

SSO sessions expire. If the e2e output shows `CredentialsProviderError`
or an expired-token error on every key, run `aws sso login --profile
content-translation-service` again. An `AccessDeniedException` means the
role you picked doesn't allow `translate:TranslateText`.
