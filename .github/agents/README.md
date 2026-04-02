# Agentic Workflows

This directory contains modular components for agent-driven documentation workflows.
Files follow Anthropic's recommended prompt structure using XML tags for clear delineation.

## Structure

```
.github/agents/
├── README.md
└── atlas-release-notes/               # Atlas release notes workflow
    ├── flow.md                        # Main flow (run this)
    ├── fetch_aha_features.py          # Script: fetch features from Aha! API
    ├── fetch-aha-features.skill.md    # Skill doc for Aha! fetcher
    ├── write-feature-entry.skill.md   # Feature → RST transformation
    ├── write-bug-entry.skill.md       # Bug → RST transformation
    └── assemble-release-notes.skill.md # Entries → RST section
```

## Usage

To run the Atlas release notes flow:

```
run .github/agents/atlas-release-notes/flow.md
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

## Data Format

**YAML** is the standard format for passing data between stages.

```yaml
features:
  - name: "SSE-KMS encryption for S3 export"
    description: "Customers can now use KMS keys..."
    maturity: ga
```

## Adding a New Workflow

1. Create a new directory under `.github/agents/`
2. Add `flow.md` with XML-structured sections
3. Add skill files for transformations
4. Test end-to-end with real data

