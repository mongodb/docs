---
name: open-pr
description: 'Opens a GitHub Pull Request with the standard PR template: Description, Staging Links, and JIRA ticket. Infers the ticket from the branch name and generates staging preview URLs from changed files after the PR is created. TRIGGER when: user asks to open, create, submit, make, update, or edit a PR or pull request, or wants to refresh staging links on an existing PR.'
argument-hint: '[--base <branch>] [optional notes or extra context]'
---

# Open a Pull Request

Follow these steps in order to create a well-formed PR.

## Step 0 — Parse arguments

Check `$ARGUMENTS` for a `--base <branch>` flag:

- If `--base <branch>` is present, use that branch as the PR base and treat the remainder of `$ARGUMENTS` as extra description context.
- If `--base` is not present, default the base branch to `main`.

## Step 1 — Gather context

Run these in parallel:

- `git branch --show-current` — get the current branch name
- `git log --oneline $(git merge-base HEAD origin/HEAD)..HEAD` — list commits on this branch
- `git diff --name-only $(git merge-base HEAD origin/HEAD)..HEAD` — list all changed files

## Step 1b — Check for documentation files

From the changed files list, check whether any files exist under `content/`. Set a flag `HAS_DOC_FILES` to true if at least one such file exists, false otherwise.

## Step 1c — Check PR size

Run the size report from the repo root and show its output to the user:

```bash
python3 .claude/hooks/pr-size-check.py --report
```

This reports the PR's size and classification using the same logic as the PR-size hook. Reviews get harder past ~10 files / ~300 changed lines, and lose coverage past ~20 / ~1,200.

- If the verdict is `EXCEEDS` or `large`, recommend splitting the work into smaller, independently reviewable PRs, and ask the user whether they want to split first or proceed with the current PR.
- Do **not** block. If the user chooses to proceed, or the verdict is `exempt` (mechanical/backport/version-cut/code-example work) or within the recommended size, continue to Step 2.

## Step 2 — Derive the JIRA ticket

Parse the ticket ID from the branch name. Branch names follow the pattern `DOCSP-NNNNN-<description>`. Extract the `DOCSP-NNNNN` portion.

- Ticket ID: `DOCSP-NNNNN`
- Ticket URL: `https://jira.mongodb.org/browse/DOCSP-NNNNN`

If the branch name does not contain a DOCSP ticket ID, ask the user for the ticket number before continuing.

## Step 3 — Build a PR title

Use the format: `DOCSP-NNNNN <short description of the change>` — same pattern as the branch name but human-readable. Example: `DOCSP-55497 disambiguate mergeObjects`.

## Step 4 — Write the Description section

Based on the commit messages, changed files, and any extra context provided in `$ARGUMENTS`, write a clear prose summary of what the PR does. Focus on *what changed and why*, not just listing files. Follow the tone and style of the example summary in the reference PR: concise bullet points under a short introductory sentence work well for multi-page changes.

## Step 4b — Choose a PR template

Present the following options and ask the user which template to use. Wait for their reply before continuing to Step 5.

- **Content changes**: `.github/PULL_REQUEST_TEMPLATE/content.md`
- **Drivers changes**: `.github/PULL_REQUEST_TEMPLATE/drivers.md`
- **Code Example Tests**: `.github/PULL_REQUEST_TEMPLATE/code.md`
- **Platform changes**: `.github/PULL_REQUEST_TEMPLATE/platform.md`
- **Cloud Docs changes**: `.github/PULL_REQUEST_TEMPLATE/cloud.md`
- **Agent Skill changes**: `.github/PULL_REQUEST_TEMPLATE/agent-skill.md`
- **No template**

If the user chooses a template, read the file at the listed path and store its content. If the user chooses no template, proceed to Step 5 with no template content.

## Step 5 — Create or identify the PR

First, check whether a PR already exists for the current branch by its exact local branch name:

```bash
gh pr list --head <current-branch> --json number,url 2>/dev/null
```

**If a PR already exists:** the list will contain one entry — capture the PR number and URL from it. Inform the user that an existing PR was found and that you will update its description. Skip to Step 6.

**If no PR exists:** create the PR as a draft with a temporary body:

```bash
gh pr create \
  --draft \
  --title "<title from Step 3>" \
  --body "Draft — updating body now..." \
  --base <base branch from Step 0>
```

Capture the PR number from the output URL (the integer at the end of the URL).

## Step 6 — Build staging preview links

If `HAS_DOC_FILES` is false, skip this step and set the staging links content to `N/A`. Continue to Step 7.

If `HAS_DOC_FILES` is true, invoke the `staging-preview` skill, passing `PR_NUMBER` as the input. The skill will poll for the builder-bot deploy preview comment and construct page-specific staging URLs for all changed files. Use the output as the staging links content for Step 7.

## Step 7 — Assemble the final PR body

**If no template was chosen**, use this structure:

```markdown
## Description

<prose summary from Step 4>

## Staging links

<staging links from Step 6, or "N/A" if none>

## JIRA ticket

[DOCSP-NNNNN](https://jira.mongodb.org/browse/DOCSP-NNNNN)
```

**If a template was chosen**, use the template content (already read in Step 4b) as the base. Fill in the sections that correspond to description, staging links, and JIRA ticket based on the template's own structure and comment placeholders. Leave checklists and all other sections untouched for the user to complete.

## Step 8 — Update the PR body

Use the GitHub REST API to update the body (avoid `gh pr edit`, which fails in this repo due to a Projects classic GraphQL deprecation error):

```bash
body=$(cat <<'EOF'
<final body from Step 7>
EOF
)
gh api repos/10gen/docs-mongodb-internal/pulls/<PR_NUMBER> \
  --method PATCH \
  --field body="$body" \
  --jq '.number'
```

Ask the user whether they want the PR marked as ready for review or kept as a draft. If they choose ready for review, run:

```bash
gh pr ready <PR_NUMBER>
```

## Step 9 — Report back

Output:
- The PR URL
- The PR number
- A summary of the staging links generated
