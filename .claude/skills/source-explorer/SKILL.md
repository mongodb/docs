---
name: source-explorer
description: >
  Read a product's source code and build a plain-language summary of its public
  surface — flags, options, API endpoints, states, defaults, and constraints.
  Stays interactive so writers can ask follow-up questions about how the product
  works before writing or auditing docs. Consumes the same manifest as
  docs-drift but produces no structured output and runs no diff. Use when a
  writer wants to understand an unfamiliar codebase, calibrate a new docs-drift
  manifest, or answer "what does this flag actually do?" questions.
  Trigger phrases: "explore the source", "understand the source for X",
  "summarize the codebase", "explain the source surface", "what does X's source do",
  "source summary for X".
---

# source-explorer

Reads a product's source code and builds a plain-language summary of its public surface. The writer can then ask follow-up questions interactively ("what does `loadLevel` actually do?", "what are all the valid states?", "are there any flags with conditional defaults?").

**This skill produces no structured output, runs no diff, and files no tickets.** It is a comprehension tool, not a validation tool.

## Scope

This skill covers products whose public surface is declared in code: CLI flags, config options, HTTP API request/response shapes, enums, and states. UI-driven products (those whose primary public interface is affordances in a web or desktop UI) are out of scope.

## Inputs

One argument: a property name. Two cases:

- **Manifest exists** (`references/manifests/<property>.yaml` in the `docs-drift` skill directory): use its `source.repos` and `source.surface_hints` as the reading guide.
- **No manifest yet**: ask the user for a repo URL and a brief description of where the public surface lives before proceeding. Use these ad-hoc hints as the reading guide; do not scaffold a manifest (that is Discovery mode in `docs-drift`).

## What to read

Guided by `source.surface_hints` (or the ad-hoc hints provided), read the source exhaustively — do not sample. Walk every surface location the hints point to:

- Every CLI flag / config option definition site
- Every public API request/response struct and its fields
- Every enum and state declaration
- Every conditional default and behavioral constraint enforced in source

Also note anything marked with an intent marker (e.g. `// internal`, `// external-only`) — these are intentionally undocumented and worth flagging to the writer so they are not confused by their absence from the docs.

## Output

After reading, present a structured plain-language summary:

### Summary format

**Product:** `<property>`
**Source:** `<repo>` @ `<ref or branch>`

#### Public flags / options
For each: name, type, default (including conditional defaults), any behavioral constraints, and a one-line description of what it does.

#### Public API endpoints / request shapes
For each endpoint: path, method, request fields (name, type, required/optional, default), response fields.

#### States and enums
For each: name, allowed values, and what each value means in plain language.

#### Intentionally hidden surface
Items found in hidden-surface locations or carrying intent markers — listed so the writer knows they exist but are excluded by design.

#### Gaps and questions
Anything the hints pointed to that you could not find, or anything that looked ambiguous. Flag these for the writer.

---

After presenting the summary, remain interactive. Answer follow-up questions by reading additional source context as needed. Do not invent details — if a question requires reading a file you have not yet seen, read it.

## Relationship to docs-drift

This skill and `docs-drift` share manifest inputs but serve different purposes:

- Use `source-explorer` **before** running `docs-drift` on a new property, especially in Discovery mode. Understanding the codebase first leads to better `surface_hints` and `intent_markers` in the manifest.
- Use `source-explorer` standalone when a writer needs to understand a product's source without running a full drift audit.
- `docs-drift` Stage 2 (structured extraction) is a separate, focused task — it does not call this skill. The two read the same source independently.
