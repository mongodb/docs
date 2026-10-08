# Agentic Workflows

This directory contains modular components for agent-driven documentation workflows. Files follow Anthropic's recommended prompt structure using XML tags for clear delineation.

Agents in this directory are Claude Code agents: flow-based workflows live in their own subdirectories, and subagent definitions are single `.md` files with YAML frontmatter.

## Structure

```
.claude/agents/
├── README.md
├── feature-drafter-agent.md          # Sub-agent: drafts one doc unit, opens one PR
├── feature-planner-agent.md          # Orchestrator: spec → task list → drafter sub-agents
├── atlas-release-notes/              # Atlas release notes workflow
│   ├── README.md                     # Run instructions and prerequisites
│   ├── flow.md                       # Main flow (run this)
│   ├── fetch_aha_features.py         # Script: fetch features from Aha! API
│   ├── fetch-aha-features.skill.md   # Skill doc for Aha! fetcher
│   ├── write-feature-entry.skill.md  # Feature → RST transformation
│   ├── write-bug-entry.skill.md      # Bug → RST transformation (not in use)
│   └── assemble-release-notes.skill.md # Entries → RST section
└── ops-manager-release-notes/        # Ops Manager release notes workflow
    ├── flow.md                       # Main flow (run this)
    ├── fetch_aha_features.py         # Script: fetch features from Aha! API
    ├── fetch-aha-features.skill.md   # Skill doc for Aha! fetcher
    ├── write-feature-entry.skill.md  # Feature → RST transformation
    ├── write-improvement-entry.skill.md # Improvement → RST transformation
    ├── write-bug-entry.skill.md      # Bug → RST transformation (not in use)
    └── assemble-release-entry.skill.md # Entries → RST section
```

## Usage

### Feature documentation workflow

Invoke the Feature Planner Agent directly in Claude Code (it spawns Feature
Drafter Agent sub-agents itself). See its frontmatter and body for the
expected inputs. Use for a single feature whose pages ship together on a
feature branch; for a batch of small, independent DOCSP tickets, use the
`captain-v2` skill instead.

### Release notes workflows (atlas-release-notes, ops-manager-release-notes)

Each workflow directory has its own README with prerequisites and run
instructions. To run the Atlas release notes flow:

```
run .claude/agents/atlas-release-notes/flow.md
  version: v20260304
  start_date: 2026-02-25
  end_date: 2026-03-05
```

## Prompt Structure

All files use XML tags for clear structure (per Anthropic best practices):

| Tag | Purpose |
|-----|---------|
| `<description>` | What the flow/skill does |
| `<inputs>` / `<input>` | Required inputs |
| `<output>` | Expected output format |
| `<rules>` | Constraints and requirements |
| `<instructions>` | Step-by-step process |
| `<examples>` | Input/output pairs wrapped in `<example>` |
| `<terminology>` | Domain-specific terms and substitutions |

## Core Concepts

### Skills

Skills are **atomic, stateless transformations** that convert input → output.

- Self-contained instructions with `<input>`, `<output>`, `<rules>`, `<examples>`
- YAML format for explicit data passing
- Deterministic (same input → same output)

### Flows

Flows **compose skills** into end-to-end workflows.

- `<instructions>` define steps that fetch data and invoke skills
- `<rules>` define constraints (e.g., "count in = count out")
- `<output_format>` defines final deliverables

### Subagent definitions

Files like `feature-planner-agent.md` and `feature-drafter-agent.md` are
Claude Code subagent definitions: YAML frontmatter (name, description, model,
tools, skills, MCP servers) followed by the system prompt. The orchestrator
agent invokes bounded sub-agents via the Task tool; a sub-agent cannot spawn
further sub-agents, so orchestration always lives in the primary agent.

## Data Format

**YAML** is the standard format for passing data between stages.

```yaml
features:
  - name: "SSE-KMS encryption for S3 export"
    description: "Customers can now use KMS keys..."
    maturity: ga
```

## Adding a New Workflow

For a multi-stage flow (fetch → transform → assemble):

1. Create a new directory under `.claude/agents/`
2. Add `flow.md` with XML-structured sections
3. Add skill files for transformations
4. Add a README with prerequisites and run instructions (see
   `atlas-release-notes/README.md` for the pattern)
5. Test end-to-end with real data

For a task-delegating orchestrator or bounded drafting sub-agent, add a
single `.md` file with YAML frontmatter instead (see
`feature-planner-agent.md` and `feature-drafter-agent.md`).
