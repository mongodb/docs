---
name: source-explorer
internal: true
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

- **Manifest exists** (`references/<property>.yaml` in the `docs-drift` skill directory): use its `source.repos` and `source.surface_hints` as the reading guide, and its `source.hidden_surface` and `triage.intent_markers` to identify intentionally hidden surface.
- **No manifest yet**: ask the user for a repo URL and a brief description of where the public surface lives before proceeding. Use these ad-hoc hints as the reading guide; do not scaffold a manifest (that is Discovery mode in `docs-drift`).

## Get the source

Fetch each repo at `source.repos[].ref`, or at the default branch if no ref is set or the hints are ad-hoc. For a large monorepo, check out only the directories the hints name.

If a fetch fails (bad URL, no access, stale ref), stop and tell the writer which repo failed and why. Do not summarize from partial source: a summary with missing sections reads as complete. Ask the writer for a corrected URL or ref. Do not edit the manifest; manifest corrections belong to `docs-drift`.

## What to read

Guided by `source.surface_hints` (or the ad-hoc hints provided), read every location the hints point to — do not sample within a hint's scope, and do not read outside it unless a follow-up question requires it. If a hint names a directory or package, read every file in it that matches the declaration pattern the hint describes. If the hint names a directory without a declaration pattern, ask the writer what identifies public surface there before reading. Walk every surface location in scope:

- Every CLI flag / config option definition site
- Every public API request/response struct and its fields
- Every enum and state declaration
- Every conditional default and behavioral constraint enforced in source

Also read every `source.hidden_surface` location, and note anything that carries a `triage.intent_markers` substring. With ad-hoc hints, look for common markers such as `// internal` or `// external-only`. This surface is intentionally undocumented. Flag it to the writer so its absence from the docs doesn't confuse them.

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
