# [Feature name]: Decision Log

Append-only. Shared across all agent sessions and the writer. The Feature Planner Agent reads this before planning and reconciles against it after every task. Record decisions that later sessions need: terminology choices, IA/structural calls, approved wording, anything affecting more than one task. Newest entries at the bottom.

Do NOT record routine progress here, only decisions that change how subsequent work should be done.

## Seed before drafting starts

The writer (or a quick Feature Planner Agent pass) seeds this log from the Plan's Glossary section BEFORE any Feature Drafter Agent runs, so terminology is consistent from the first task instead of reconciled afterward. Seed entries use the same format as any other entry.

Before locking terms in, check the [Embargoed Features List](https://wiki.corp.mongodb.com/pages/viewpage.action?pageId=560136334&spaceKey=DE&title=Embargoed%2BFeatures%2BList) for naming constraints on unreleased features. If a term is embargoed, record the approved public wording (and what not to use) in the table below so no drafter leaks the embargoed name.

Seeded terminology (fill before drafting):

| Term | Use this | Not this | Notes |
|---|---|---|---|
| | | | |

---

## Format

Each entry:

```
### [date]: [short title]
Decision: [what was decided]
Why: [reasoning]
Approved by: [writer name]
Affects: [task/row numbers or "all"]
```

---

## Promoting a decision (rare)

This log is scoped to one feature. Most decisions live and die here. A rare decision outlives the feature: a naming or structural rule that should bind future work across the docs set. When a decision is that durable and that high-impact (think P1), the writer may promote it to a permanent home, such as `CLAUDE.md` or the relevant `.claude/rules/` file, and note in the entry's `Affects:` line that it was promoted.

Keep the bar high. Promote only decisions that would still matter to unrelated work months from now. If in doubt, leave it in this log. The permanent files stay useful only if they stay short.

---

## Entries

### [YYYY-MM-DD]: [example: term is "cluster tier" not "instance size"]
Decision: Why: Approved by: Affects:
