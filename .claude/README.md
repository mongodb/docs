# AI-assisted feature documentation

This directory holds the custom agents and templates for the AI-assisted feature-documentation workflow piloted under DOCSP-60866 (Maverick).

In brief: the writer authors a Documentation Plan and Docs Scope, the **Feature Planner Agent** decomposes the Scope into a sequenced task list on a feature branch, **Feature Drafter Agent** sub-agents draft each unit and open PRs, and the writer reviews and merges everything. A shared decision log keeps the agents consistent across sessions. The steps below expand each stage.

## Layout

```
.claude/
├── agents/
│   ├── feature-planner-agent.md   # the custom agent (primary/orchestrator)
│   └── feature-drafter-agent.md   # sub-agent: drafts one unit, opens a PR
├── scripts/
│   └── feature-branch.sh          # deterministic git flow (create/sync/start-task)
└── templates/                     # writer fills these out per feature
    ├── documentation-plan-template.md
    ├── docs-scope-template.md
    └── decision-log-template.md
```

## How a feature flows

1. Writer invokes the Feature Planner Agent with a single sentence, for example "Let's plan docs for <feature>." The agent runs intake: if the writer already has a Plan and Scope, it reads them; if not, it points the writer to the templates and walks them through filling each one out.
2. The Plan captures context (purpose, research by content type, testing strategy incl. hands-on exploration, source stability). The Scope captures the per-page Content work table. The writer seeds the decision log's terminology table from the Plan's Glossary section.
3. The agent establishes a feature branch (`feature/DOCSP-XXXXX-name`). All work for this feature targets that branch, not `main`.
4. The agent runs an IA-impact pass (surfacing existing pages the feature affects), identifies shared includes, decomposes the Scope into a sequenced task list, and presents it for approval.
5. On approval, the agent spawns Feature Drafter Agents (parallel or sequential). Each drafts one unit, shapes it to its content-type prototype, tests code examples via Grove where supported (flagging the rest for the writer), and opens a PR against the feature branch.
6. The agent reconciles new decisions into the decision log after each task.
7. The writer reviews and merges every PR into the feature branch, including hands-on verification of any code examples the Feature Drafter Agent could not test. When the feature's docs are complete, the writer merges one final PR from the feature branch into `main`, so the feature publishes as a unit.

## Conventions

- **Content types.** Content is Concept, Task, Reference, or Troubleshooting. Feature Drafter Agents shape each page to the matching prototype in `.github/prompts/content-type-templates.prompt.md`, the single source for the prototypes, kept in sync with the style guide. Product-specific variations the writer notes in the Plan take precedence.
- **Source constants and substitutions.** Feature Drafter Agents read the target project's `snooty.toml` and use its defined `[constants]` (`{+name+}`) and `[substitutions]` (`|name|`) instead of hardcoding product names, versions, or recurring terms. See `.github/prompts/source-constant-substitution-check.prompt.md`.
- **Feature branch.** Per the docs team's [Feature Branches Handling](https://wiki.corp.mongodb.com/spaces/DE/pages/239736577/Feature+Branches+Handling) process, Feature Drafter Agent PRs target the feature branch; the writer (branch owner) syncs it with `main` daily and merges the final feature-branch-to-`main` PR. The git flow is encoded in `scripts/feature-branch.sh` (`create` / `sync` / `start-task`), so the agents call the script instead of running raw git (it always uses `git merge`, never `git rebase`).
- **CLI first, MCP fallback.** Jira/GitHub via the `jira`/`gh` CLIs, MCP only as fallback. Glean is always MCP.
- **Writer owns review.** No review sub-agent. The human is the last word.

## Skills referenced

The agents preload these skills, all present in `.claude/skills/`:

- **Feature Planner Agent:** `jira`, for ticket operations and follow-up tickets when the IA-impact pass surfaces scope creep.
- **Feature Drafter Agent:** `grove-test` (test code examples where supported), `local-build-check` (validate the rST build before the PR), `add-redirects` and `unified-toc` (when a unit moves/renames/deletes or adds a page), and `open-pr` (open the PR with the standard template and staging links).
