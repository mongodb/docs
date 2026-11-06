# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

It holds only the rules that apply everywhere. Each area of the repo has its own `CLAUDE.md` with the rules for working there.

## Repository Overview

This is the MongoDB Documentation Monorepo. It combines three areas in one repo:

| Area | What it is | Rules file |
|---|---|---|
| `content/` | RST documentation source files for all MongoDB products | `content/CLAUDE.md` |
| `code-example-tests/` | Language-specific test projects that validate documentation code examples | `code-example-tests/CLAUDE.md` |
| `platform/` | Next.js server and tooling to build/serve the docs sites | `platform/CLAUDE.md` |

## Which Rules Apply

Choose the rules file by the path of each file you change, not by the topic of the task:

- Before you change any file, read the rules file for that file's area. Area rules files load only when you open files in that area, so read the file explicitly rather than relying on it already being loaded.
- Apply an area's rules file only to files in that area. Never apply one area's rules to another area. For example, the writer rules in `content/CLAUDE.md` (lint-docs, version directories, `.txt`/`.rst` naming, 72-character wrapping, "do not build locally") never apply to changes in `platform/` or `code-example-tests/`.
- If a task changes files in more than one area, read each area's rules file and apply each to its own files only.
- For files outside all three areas (for example `.claude/`, `.github/`, or repo-root files), apply only this file.

Agent tooling lives in `.claude/` (skills, hooks, agents, rules). See `.claude/skills/README.md` for the skill catalog. The `grove-*` skills handle common workflows in `code-example-tests/`.

# CRITICAL INSTRUCTIONS

These apply in every area of the repo:

- Do not commit or push without explicit confirmation from the user.
- When a hook message reports pending redirect changes, invoke the add-redirects skill before pushing. The reminder is informational and fires once per session, so you may batch redirects and add them in a single pass, but the push-time check blocks the push until redirects exist.
- When a hook message reports documentation pages added, moved, or deleted in content/, invoke the unified-toc skill immediately — before committing, pushing, or responding to any other request.

## Hooks

Hooks in `.claude/settings.json` run for every session, wherever you work. Content hooks (Vale, nested components, TOC, redirects) act only on files under `content/`. Git process hooks (branch naming, push target, PR size, Jira transitions) act on every change.

## Agent Tooling (`.claude/`)

Do not wrap lines in `.claude/skills/*/SKILL.md` files or any other agent tooling under `.claude/`; keep each prose paragraph on a single line. Do not wrap lines in PR descriptions either.

## Context Management

- Recommend starting a new session when the user switches Jira tickets.

# PR SIZE

Large PRs lose review coverage: an audit of past PRs found reviews get
harder past ~10 changed files / ~300 changed lines, and that past ~20 files
/ ~1,200 lines reviewers stop engaging and approve without real review. Keep
PRs reviewable.

- Scope each PR to a single, self-contained change. Keep it under ~10 files /
  ~300 changed lines where possible, and do not exceed ~20 files / ~1,200
  changed lines.
- When a task will clearly exceed these sizes, propose splitting it into
  multiple independently reviewable PRs *before* writing code, and call out
  the split in your plan.
- If a size warning fires while you work, heed it: stop adding scope and
  prefer to open what you have as its own PR. Continue past the recommended
  size only when the user has explicitly authorized a larger PR.
- These limits target hand-written content. Genuinely mechanical changes
  (version flips, backports, bulk redirects/TOC updates, code example work
  under `code-example-tests/`, and agent tooling under `.claude/` such as
  hooks and skills) are exempt.

# GIT BRANCH TRACKING

A ticket branch tracks the branch it was created from, by design, per the
Docs Team Git Process:

- Work off main: `git checkout -b DOCSP-12345-short-description origin/main`
  — the branch tracks `origin/main`.
- Work off a feature branch:
  `git checkout -b DOCSP-12345-short-description origin/feature/<name>`
  — the branch tracks that feature branch.

Either upstream is expected, not a misconfiguration. Do not re-point it (no
`git branch -u` / `--set-upstream-to`, and do not edit `branch.<name>.merge`).

Because a bare `git push` resolves through the upstream, always push your
branch explicitly: `git push origin <branch-name>`. Never push to `main` --
`main` advances only through reviewed PR merges.
