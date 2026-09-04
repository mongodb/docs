# CLAUDE.md — `platform/`

Ground rules for AI coding agents working in `platform/`. These supplement
the repo-root `CLAUDE.md`.

## Pull requests

When opening a PR for changes in `platform/`, always use the platform
template:

```bash
gh pr create --template platform.md
```

The template lives at `.github/PULL_REQUEST_TEMPLATE/platform.md`.

## Comments

Do not add comments by default.

Add one only when it explains non-obvious intent, a tricky tradeoff, or a
"why" the code itself can't convey — never to restate what the code already
says. Keep it short and specific. If a comment doesn't clearly earn its
place, omit it.

The goal is signal-dense PRs that are easy to review, not padding.
