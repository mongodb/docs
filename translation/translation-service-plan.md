# Translation Service Plan

## Objective

Build the first version of an in-house translation service for Docs Platform.

The first version should be a stateless API that translates flat JSON platform strings from one locale to another while preserving keys, protecting non-translatable terms, and returning partial results with per-key errors when needed.

This should be designed to stay provider-agnostic and LLM-agnostic.

## What We Want to Build

We want a service that accepts:

- a flat JSON object of platform strings
- source locale
- target locale
- optional content type
- a list of non-translatable terms
- optional backend preferences

Example input payload:

```json
{
  "ask_mongodb_ai": "Ask MongoDB AI",
  "docs_home": "Docs Home"
}
```

Example request metadata:

```json
{
  "source_locale": "en",
  "target_locale": "es",
  "content_type": "platform_strings",
  "non_translatable_terms": ["MongoDB", "Compass", "Atlas", "Docs"]
}
```

Example desired output:

```json
{
  "ask_mongodb_ai": "Pregúntale a MongoDB AI",
  "docs_home": "Docs Inicio"
}
```

## Core Requirements

- Preserve the exact input keys in the output.
- Translate only the values.
- Support per-request source and target locale metadata.
- Support request-level non-translatable terms.
- Be synchronous for v1.
- Be stateless for v1.
- Return partial JSON with an `errors` map per key if some strings fail.
- Keep the architecture extensible for future persistence, glossary support, translation memory, async jobs, and review workflows.

## v1 Scope

### In scope

- Flat JSON platform strings only
- Internal API endpoint
- One locale pair per request
- Request validation
- Runtime protection for non-translatable terms
- Translation via an adapter interface
- Strict output validation
- Partial-failure responses
- Basic logging and metrics

### Out of scope

- Markdown or MDX translation
- TOC translation
- Rich document translation
- Translation memory
- Persistent storage as a requirement
- Multi-file ingestion
- Async job execution as a required path
- Automatic quality ranking across providers
- Full glossary management system

## Design Constraints

### Provider-agnostic

The service contract and orchestration logic should not be tied to any one backend provider.

### LLM-agnostic

If v1 uses an LLM backend, the service should still avoid coupling itself to one specific model API or prompt format.

### Stateless first

The service should not require a database to operate, but internal models should preserve enough metadata to support storage later.

### Runtime enforcement for protected terms

Do not rely only on prompt instructions like “do not translate MongoDB.”

For v1, protect non-translatable terms using placeholders before translation, then restore them after translation.

Example:

- `Ask MongoDB AI` -> `Ask __PROT1__ AI`
- model translates the protected string
- restore `__PROT1__ -> MongoDB`

This is mainly for terms that must remain exactly unchanged.

## Recommended Architecture

### Main flow

Client -> Translation API -> Request Validator -> JSON Normalizer -> Protection Layer -> Translation Orchestrator -> Backend Adapter -> Output Validator -> Response Builder

### Component responsibilities

#### Translation API

Receives the request and returns the response.

#### Request Validator

Validates:

- payload is a flat JSON object
- all keys are strings
- all values are strings
- locales are valid
- non-translatable terms are valid strings

#### JSON Normalizer

Converts the input JSON into an internal segment list.

Example internal segment:

```json
{
  "key": "ask_mongodb_ai",
  "source_text": "Ask MongoDB AI",
  "source_locale": "en",
  "target_locale": "es",
  "content_type": "platform_strings",
  "protected_terms": ["MongoDB"]
}
```

#### Protection Layer

Detects non-translatable terms in each string and replaces them with placeholders such as `__PROT1__`.

#### Translation Orchestrator

Responsible for:

- batching strings if needed
- selecting a backend adapter
- building structured translation instructions
- collecting results
- isolating partial failures

#### Backend Adapter Interface

Create one internal interface such as:

```ts
interface TranslationBackend {
  translateBatch(request: TranslationBatchRequest): Promise<TranslationBatchResult>
}
```

Possible implementations:

- LLM Adapter A
- LLM Adapter B
- MT Adapter C

The orchestrator should depend only on this interface.

#### Output Validator

Validates:

- output shape
- key coverage
- placeholder preservation/restoration
- malformed items
- missing results

#### Response Builder

Rebuilds the translated JSON and adds errors + metadata.

## API Shape

### Endpoint

`POST /v1/translate`

### Example request

```json
{
  "source_locale": "en",
  "target_locale": "es",
  "content_type": "platform_strings",
  "payload": {
    "ask_mongodb_ai": "Ask MongoDB AI",
    "docs_home": "Docs Home"
  },
  "non_translatable_terms": ["MongoDB", "Compass", "Atlas", "Docs"],
  "backend_preferences": {
    "provider": "auto",
    "model": "auto"
  }
}
```

### Example response

```json
{
  "source_locale": "en",
  "target_locale": "es",
  "translations": {
    "ask_mongodb_ai": "Pregúntale a MongoDB AI",
    "docs_home": "Docs Inicio",
    "broken_key": null
  },
  "errors": {
    "broken_key": {
      "code": "TRANSLATION_FAILED",
      "message": "Provider returned invalid output for this key"
    }
  },
  "meta": {
    "provider": "example_provider",
    "model": "example_model",
    "content_type": "platform_strings",
    "partial_failure": true,
    "request_id": "uuid"
  }
}
```

## Why Sync for v1

Use synchronous request/response behavior for the first version because:

- platform-string payloads should be relatively small
- callers will likely want translated JSON immediately
- the first version should optimize for simplicity
- async job infrastructure adds unnecessary complexity too early

Async can be added later for:

- large bundles
- document translation
- many locales in one request
- long-running retries or backend fallback chains

## Error Handling Model

Use partial failure instead of whole-request failure whenever possible.

Recommended behavior:

- successful keys return translated values
- failed keys return `null`
- failed keys appear in `errors[key]`
- top-level metadata indicates whether the response had partial failures

Example error object:

```json
{
  "code": "PLACEHOLDER_RESTORATION_FAILED",
  "message": "Protected term token was modified during translation"
}
```

## Observability

At minimum, log:

- request id
- source locale
- target locale
- content type
- key count
- selected backend
- latency
- error count

Track metrics for:

- request count
- success rate
- partial-failure rate
- backend latency
- unsupported locale rate

## Security / Safety Notes

- Require internal authentication.
- Treat source content as untrusted input.
- Avoid logging full payload contents by default.
- Keep backend usage governable so specific providers can be approved or blocked later.

## Implementation Plan

### Phase 1: contract and core types

Build:

- request schema
- response schema
- internal segment model
- backend interface

### Phase 2: validation and protection

Build:

- request validation
- flat JSON validation
- non-translatable term detection
- placeholder replacement and restoration

### Phase 3: first backend adapter

Build:

- one working translation adapter
- structured output contract
- strict response parsing
- per-key error isolation

### Phase 4: response handling

Build:

- translated JSON reconstruction
- errors map
- response metadata

### Phase 5: operational hardening

Build:

- logging
- metrics
- timeout handling
- retry policy
- basic tests

### Phase 6: first integration

Integrate the service with one Docs Platform caller for platform-string translation.

## Suggested Deliverables

- API contract for `/v1/translate`
- internal architecture for normalization, protection, orchestration, and adapters
- one working backend adapter
- placeholder-based protected-term handling
- partial-failure response model
- basic observability
- first caller integration

## Future Extensions

These should not be built into the v1 critical path, but the design should leave room for them:

- glossary storage and management
- preferred translated terminology
- persistence
- translation memory
- async jobs
- review and approval workflows
- support for nested JSON
- support for Markdown, MDX, TOC, and docs body content
- multi-locale fan-out
- backend routing and fallback

## Final Direction

Build the smallest useful version first:

- stateless
- synchronous
- flat JSON only
- protected-term placeholders
- provider-agnostic interface
- LLM-agnostic backend layer
- strict validation
- partial failures per key

This is the implementation target for v1.