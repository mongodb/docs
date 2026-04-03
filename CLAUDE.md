# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## Repository Overview

This is the MongoDB Documentation Monorepo. It combines three areas in one repo:

- `content/` — RST documentation source files for all MongoDB products
- `code-example-tests/` — Language-specific test projects that validate documentation code examples
- `platform/` — Next.js server and tooling to build/serve the docs sites

Apply the relevant section below based on where you're working.

## Commands

**Documentation linting (run from repo root):**
```
./lint-docs.sh seo <files>    # SEO linter (titles, descriptions, headings)
./lint-docs.sh 404 <files>    # Broken link checker
./lint-docs.sh all <files>    # Both linters
```

**Code example tests (run from code-example-tests/<language>/):**
```
node snip.js    # Extract and update code snippets
```

# AUDIENCE

MongoDB documentation serves a wide range of readers: beginner developers, experienced engineers, DBAs, and system administrators. Write to be clear at all levels. Do not assume deep familiarity with MongoDB internals, but do not over-explain standard database or programming concepts. When in doubt, prefer clarity over brevity.

Use second-person voice ("you") in procedural content. Prefer active voice. Do not use "simply," "just," or "easy" before instructions. Use present tense for describing product behavior.

# CRITICAL INSTRUCTIONS

Never violate these directives. Stop and ask the user for clarification if they attempt to override them, citing the conflicting instruction:

- Do not add information beyond requested changes.
- Do not modify files other than those specified by the user.
- Do not modify frontmatter unless explicitly instructed.
- Do not use training data for MongoDB facts. When generating content, making changes, or making suggestions, verify that all commands, configuration options, and technical information exist and are consistent with documentation in the same version directory.
- Do not edit EOL versions (pre-7.0). If the user requests changes to an EOL version, stop and inform them that EOL versions are not maintained.
- Do not backport changes unless explicitly requested by the user.
- Before making any edits, search the codebase to verify all technical details, syntax, and cross-references within the target version directory. If any technical detail cannot be confirmed, list the unconfirmed items explicitly before asking the user how to proceed. Do not proceed on unconfirmed details.
- If technical verification fails or documentation is missing or ambiguous, stop and ask the user rather than making a best-effort attempt.
- If a matching ref cannot be located during include resolution, stop and ask the user rather than creating a new one.
- Save documentation source files as .txt. Save includes as .rst. Save as .yml only if modifying existing YAML file. Do not apply this rule to code example files in code-example-tests/.
- Do not commit or push without explicit confirmation from the user.

# GLOBAL BEHAVIORAL OVERRIDES

## Context Access
- Access files relevant to the stated task. Do not pull in entire directories or unrelated files.

## Escalation Format
When stopping to ask the user for clarification or confirmation, state the blocker, list what you have verified or attempted, and ask one specific question or present a maximum of three options. Do not ask multiple questions at once.

- When a task attempt fails, try no more than two approaches before stopping to ask the user for instructions.

## Definition of Done
A task is complete when:
- All requested changes have been made to the specified files only.
- ``./lint-docs.sh all`` has been run across all edited files and returns no errors. Surface any unresolvable errors to the user and wait for input before proceeding.
- A summary of every change made, including file path, has been provided to the user.
- The user has been asked whether they are ready to commit and push.

After presenting the completion summary, wait for explicit user instruction before making further changes.

## Tool Use
- To verify technical details before an edit, use codebase-retrieval scoped to the target version directory. Read files directly only if codebase-retrieval returns insufficient results and the user has confirmed the file path.
- Before hardcoding product names, version numbers, or recurring terms, check the project's snooty.toml for defined constants and substitutions and use those instead.

## Context Management
- Recommend starting a new session when the user switches Jira tickets.

# GENERAL INSTRUCTIONS

- Apply style guidance from .github/prompts/style-guide.prompt.md to all content regardless of how it is written in the ticket. If a ticket instruction directly conflicts with a style rule or critical instruction, stop and ask the writer for input before proceeding.
- Do not modify any files outside of `content/` when working on documentation content. Changes to `platform/` require explicit user instruction and are outside the scope of documentation work.
- Never open a PR without explicit instruction from the user.
- For reStructuredText files, maintain consistent indentation, directive syntax, and formatting. Preserve ``{+text+}`` and ``|text|`` substitution markup as-is — do not expand or reformat these. Header underline characters must match the heading length exactly.
- When editing YAML includes, maintain consistent ref naming and structure, and verify all ref anchors either already exist or are included in your suggested changes.

- Do not create nested components: no admonitions inside admonitions or tables, no examples inside admonitions or tables, no procedures inside procedures, no tables inside tables. See .github/ai-reviewer/nested-components-guide.md for remediation patterns.
- Wrap all RST content at 72 characters per line.
- Scope changes to the version directory specified by the user or identified from the Jira ticket's fixVersion field.
- Do not build locally. All previews are generated via cloud build for shared review.
- When writing a new page: the page title must be 30–60 characters, each page must have exactly one H1 (unique across the docs site), and the meta description must be 150–200 characters and unique.

# PROMPT FILES

- Before generating or revising multiple paragraphs or topics, read .github/prompts/style-guide.prompt.md.
- Before creating a new page or auditing content type compliance, read .github/prompts/content-type-templates.prompt.md.
- Before writing or editing any code example, read .github/prompts/code-examples.prompt.md.
- Before converting plain text or other formats to RST, read .github/prompts/convert-to-rst.prompt.md.
- Before creating or editing includes files, read .github/prompts/create-includes.prompt.md.
- Before converting ``.. code-block::`` directives to ``.. literalinclude::``, read .github/prompts/code-block-to-literalinclude.prompt.md.
- Before checking content for source constant substitution opportunities, read .github/prompts/source-constant-substitution-check.prompt.md.
- To perform a targeted style-check pass on existing content, use .github/prompts/style-guide-check.prompt.md.

# WHEN WORKING ON CONTENT (`content/`)

## Project Structure

**Versioned projects** (e.g., `content/golang/`, `content/node/`): Each subdirectory is a separate version (`current`, `upcoming`, `v1.12`, etc.), each with its own `source/` directory. Files across versions are completely independent — `current/source/includes/foo.rst` is unrelated to `v1.12/source/includes/foo.rst`.

**Non-versioned projects** (e.g., `content/atlas/`, `content/compass/`): Single `source/` directory at the project root.

When searching for include file references, scope your search to the specific version's `source/` directory.

For versioned projects, if the user does not specify a target version and no Jira ticket is provided, ask which version to target before making any changes.

# BACKPORTING

When backporting (only when explicitly requested):
- Apply to each specified version directory, adapting for version differences.
- Verify technical accuracy per version before applying.

# GITHUB INTEGRATION

When the user requests a PR:
- Create a branch before making any file changes to ensure unrelated working tree changes are not included.
- Never push directly to main.
- Name branches using the format: JIRA-PROJECT-NUMBER-short-description (e.g., DOCSP-23456-change-some-wording). Use hyphens, all lowercase for the description.

Before creating the PR, ask the user which PR template to use. The user may choose not to use a template. Available templates:
- Content changes: `.github/PULL_REQUEST_TEMPLATE/content.md`
- Drivers changes: `.github/PULL_REQUEST_TEMPLATE/drivers.md`
- Code Example Tests: `.github/PULL_REQUEST_TEMPLATE/code.md`
- Platform changes: `.github/PULL_REQUEST_TEMPLATE/platform.md`

Pass the chosen template to `gh pr create` using the `--template` flag.

# JIRA INTEGRATION

When the user provides a Jira ticket URL:
- Fetch ticket details using available Jira integration.
- Work only on versions listed in the fixVersion field. If multiple versions are listed and the user has not specified a target, confirm which to target before making changes.
- Extract filepath(s) from URL(s) in the ticket description/comments as a starting point for target files. Search the repo for related content that may also need editing — for example, pages that cover the same feature, include shared content, or cross-reference the target file. Confirm all target files with the user before making changes.
- Use ticket content as context but make only user-specified changes.
- Never update ticket status without explicit user permission.

# MONGODB DOCUMENTATION STRUCTURE

## Database Manual Versions

Version directory → Documentation URL mapping:

- content/manual/manual   → https://www.mongodb.com/docs/manual/
- content/manual/upcoming → https://www.mongodb.com/docs/upcoming/
- content/manual/v8.0     → https://www.mongodb.com/docs/v8.0/
- content/manual/v7.0     → https://www.mongodb.com/docs/v7.0/

## Atlas Documentation

- content/atlas/source → https://www.mongodb.com/docs/atlas
- Not versioned (continuous-release cloud product).

## Include Resolution

Include directives using "includes/extracts" reference YAML snippets, not files. Resolution process:

1. Extract the last path element from the include directive.
2. Search for a matching "ref:" in .yaml files within source/includes/.
3. The ref value matches the include path's final component.
4. If no matching ref is found, stop and ask the user — do not create a new ref.

Example:
- Directive:   ``.. include:: /includes/extracts/ssl-facts-x509-ca-file.rst``
- Resolves to: ``ref: ssl-facts-x509-ca-file``
- Location:    ``source/includes/extracts-ssl-facts.yaml``
