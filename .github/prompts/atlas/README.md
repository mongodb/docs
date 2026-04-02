# Atlas Prompts

This directory contains AI prompts for automating Atlas documentation tasks.

## Atlas Release Notes Generation

> **Moved to Agent Workflow:** The release notes generation has been migrated to a
> modular agent workflow for better maintainability and consistency.
>
> **New location:** `.github/agents/atlas-release-notes/`
>
> **How to run:**
> ```
> run .github/agents/atlas-release-notes/flow.md
>   version: v20260304
>   start_date: 2026-02-25
>   end_date: 2026-03-05
> ```
>
> See `.github/agents/README.md` for full documentation.

---

## Other Prompts

| Prompt | Description |
|--------|-------------|
| `atlas-cli-release-prompt.md` | Atlas CLI release documentation |
| `atlas-events-prompt.md` | Atlas events documentation |
| `captain-ticket-prompt.md` | Small ticket automation |

