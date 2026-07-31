<!--
TEMPLATE: Documentation Plan (agent-ready)

HOW THIS TEMPLATE WORKS
This is the writer-authored *spec context* for a feature. It is the parent
artifact. The concrete, per-page work lives in the companion Docs Scope
(see docs-scope-template.md). The Feature Planner Agent reads BOTH this Plan and the
Scope, but decomposes the SCOPE into tasks. This Plan supplies the context
that keeps the Feature Planner Agent from making bad calls.

PARSING CONTRACT (do not remove or rename the H2 headings below)
The Feature Planner Agent locates information by exact H2 heading text. Keep all
"## " headings verbatim. You may add prose freely under each. Fields written
as `key:` lines inside the Metadata and Publication blocks are read literally.
Keep the key names. Leave a field as `TBD` rather than deleting it.
-->

# [Feature name]: Documentation Plan

## Metadata

```
feature_name: [Feature name]
docs_jira_epic: [DOCSP-XXXXX]
upstream_tickets: [CLOUDP-XXXX, SERVER-XXXX, ...]
author: [Your name]
plan_lgtm_ticket: [EDT-XXXX]    # PM sign-off on this Plan
scope_lgtm_ticket: [EDT-XXXX]   # PM sign-off on the Docs Scope
status: drafting           # one of: drafting | in-review | approved | executing | complete
```

## Purpose

One or two sentences: what this feature is and why it exists, from the user's point of view. This is the orientation the Feature Planner Agent and every sub-agent reads first. Keep it free of internal jargon.

## Source materials

Links the Feature Planner Agent and sub-agents should treat as ground truth. Prefer specific PRs over whole repos (favor passing a specific PR to the agent. Reserve local clones for broad exploration with explicit guidance).

```
product_description: [link]
scope_doc: [link]
spec_or_tech_design: [link]
figma_or_expo: [link]
source_code_prs: [link, link]   # specific feature PRs preferred
external_team_sync_notes: [link]
related_slack_or_reviews: [link]
source_stability: [stable | in-flux]   # is the underlying feature/spec final, or
                                        # still changing? in-flux means expect rework.
                                        # the writer weighs whether to start now
```

## Audience and research

Synthesize your research here, organized by MongoDB's content types (defined in `.github/prompts/content-type-templates.prompt.md`). These types drive how the Feature Planner Agent routes work and how Feature Drafter Agents shape each page. Note which types this feature needs and what content falls under each.

### Concept
Pages that help a user learn what the feature is, why they should care, and how it works. Audience includes users new to the feature. Capture: the core idea, use cases, behaviors/considerations users must know before using it, and what related tasks they'll want next.

### Task
Goal-oriented pages instructing a user how to accomplish something, including end-to-end tutorials (a tutorial is a long task). Capture: the goals users have, prerequisites, the steps, and what a successful result looks like.

### Reference
Granular details for experienced users: methods, operators, commands, parameters, return values. Release notes are also reference. NOTE: reference content is frequently GENERATED FROM SOURCE (OpenAPI specs, code annotations, CLI help), not hand-drafted. List what reference surface exists and where its source is. The Feature Planner Agent routes generated reference to a generator path and only routes narrative reference (no generator) to a Feature Drafter Agent.

## Stakeholder findings

Answers gathered from PM, Engineering, and Support. Record the answer, not just the question, so sub-agents have the resolved facts.

### Product Management
- Audience and the problem being solved:
- Why choose this feature, and the benefits:
- What users must know to succeed, and how much to cover:
- Decisions users make while using it, and whether we guide them:
- What's next on their journey:
- Known gotchas / points of confusion:

### Engineering
- User-facing impacts:
- How users invoke the feature:
- Technical prerequisites:
- Performance considerations:
- Best practices:
- Known gotchas:

### Support
- Existing internal docs convertible to public FAQ/troubleshooting:
- (If updating an existing feature) frequent support cases, forum/SO questions:

### Competitive analysis
- How competitors document the analogous feature, and what to borrow or improve on:

## Testing strategy

State this up front, not as an afterthought (proposal rule). There are two distinct kinds of testing, and they happen at different points in the workflow.

### Hands-on product exploration (upstream research)

The writer (with SME support where needed) actually using the feature to understand how it behaves. This is research that informs what gets written, so it happens during planning and scoping, BEFORE the Feature Planner Agent decomposes tasks. You cannot scope accurately for behavior you have not observed.

```
hands_on_done: [yes | no | partial]
hands_on_owner: [who used the product]
hands_on_environment: [where: staging, local Docker, sandbox cluster, etc.]
```

- What you learned by using it that the specs did not tell you:
- Behaviors, edge cases, or gotchas you confirmed firsthand:
- Anything you could NOT exercise, and why (no access, pre-release, etc.):

Hands-on exploration is a RECOMMENDED checkpoint, not a hard gate. The Feature Planner will note whether `hands_on_done` is set and surface it to the writer, but the writer decides when the Scope is ready to execute.

### Code-example veracity (downstream drafting)

Verifying that generated code actually runs and produces what the docs claim. This happens during drafting. For each piece of runnable content, say which path applies:

```
grove_supported: [yes | no | partial]
```

- Code examples covered by Grove (the Feature Drafter Agent runs these, flags any failures): [list]
- Code examples NOT covered by Grove (the Feature Drafter Agent notes coverage. The WRITER does the final hands-on verification): [list]
- Known Grove gaps relevant to this feature (do NOT attempt to auto-test these): e.g. Search index create/drop, transaction rollback, sharding in local Docker, Voyage AI embeddings, pre-release testing. List the ones that apply.
- Procedural content the writer will manually test against real infrastructure:

## Publication and access

```
access_model: public        # this trial is public-track
preview_banner_required: no
```

(For a Private Preview feature this block would specify microsite vs. unauthenticated staging, banner text, and access-list handling. Public-track features skip all of that. It is left here so the Feature Planner Agent reads a definite value.)

## Glossary

Key terms for this feature and the exact wording to use for each. The Feature Planner Agent (or the writer) seeds the decision log's "Seeded terminology" table from this section BEFORE any Feature Drafter Agent runs, so terminology is consistent from the first task. Use the same columns as that table so entries copy across directly. Leave the table empty only if the feature introduces no new or easily-confused terms.

| Term | Use this | Not this | Notes |
|---|---|---|---|
| | | | |

## Decision log

```
decision_log: ./decision-log.md
```

The decision log is a SIBLING artifact, not a section of this Plan, because multiple agent sessions append to it. The Feature Planner Agent reads it before planning and reconciles against it after each chunk. See decision-log-template.md. Do not inline decisions here. Record them in the log.

## Milestones

Living document. Dates change. Work backwards from the deadline so reviewers can reserve time. Status one of: not-started | in-progress | blocked | complete.

| Milestone | Date | Status | Owner | Notes |
|---|---|---|---|---|
| Documentation Plan complete | | | | |
| Hands-on product exploration | | | | recommended before Scope sign-off |
| Docs Scope complete (PM sign-off) | | | | |
| Task list approved | | | | |
| Drafts complete | | | | |
| Reviews complete | | | | |
| Published | | | | |

## Open questions

Only questions that need HUMAN judgment (scope calls, framing, priority). Anything answerable from the source materials above is research the writer/agent should have resolved, not an open question. The Feature Planner Agent will not invent answers to items left here. It surfaces them to the writer.

- [ ] [question]

## Sign-off

PM sign-off on BOTH this Plan and the Docs Scope is the recommended checkpoint before execution, tracked via the EDT tickets in Metadata (required LGTMers field). Engineering approval may also be required depending on team. Docs Leads may give feedback but are not required approvers. The writer owns the project and decides when to proceed.

FEATURE PLANNER AGENT PRECONDITION: the writer confirms the Scope is ready before the Feature Planner Agent generates a task list. The Feature Planner Agent will not invent answers to anything left in "Open questions."
