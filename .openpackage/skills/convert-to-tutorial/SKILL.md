---
name: convert-to-tutorial
internal: true
description: "Reformat a MongoDB docs page into the standard composable tutorial template: verify the code samples compile, tighten and simplify the tone, apply the tutorial structure, and produce a changelog of every change. Use when converting or reformatting a page to the tutorial format."
---

# Reformat a Document into a Tutorial

Convert an existing docs page into the composable tutorial format while preserving its information.

This skill reformats documentation only. When code samples don't compile or run, record that in the changelog — do not build or test examples (that's `grove-create` / `grove-migrate`).

## Step 1: Verify the code samples

Check whether each code sample in the document compiles and runs, running them where feasible. Record any sample you could not verify — and any that fails — in the changelog. Do not fix or rewrite sample code.

## Step 2: Tighten the tone

Make the prose straightforward, informational, and concise. Remove purple prose and emojis. Write at an 8th-grade reading level or lower.

## Step 3: Apply the tutorial structure

Load `references/tutorial-template.md` and restructure the page to match it, filling each placeholder with reformatted content from the original document. Preserve all indentation and RST directive syntax exactly as shown in the template.

Match every header underline to its heading length. When a heading contains a substitution, count per `.claude/rules/rst-conventions.md` (source constants use the rendered length; pipe substitutions use the raw source length). Wrap documentation content at 72 characters per line.

## Step 4: Produce the changelog

List every addition and deletion, with its new line number, in a bulleted list. Ask the user whether to save it; if yes, write it to `ai-changelogs/` in the repository root, creating the folder if it does not exist.

## Rules

- Do not modify any RST directive that contains code.
- Do not add information that is not in the original document.
- Do not remove information without a changelog entry.
- Introduce code examples with a full sentence (for example, "You can perform <X action> by adding the following code to your program:"). Introduce lists with a full sentence describing the items.
- Keep each tutorial step under 50 lines of code or text; split longer steps into multiple steps with clear titles.
- Keep the page title between 30 and 60 characters.
- Keep the `:description:` meta field value between 150 and 200 characters.
