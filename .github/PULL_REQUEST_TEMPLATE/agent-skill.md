## DESCRIPTION

<!-- Summarize the skill(s) added or changed in this PR. What use case does it
address, and why is it valuable enough to justify the context window cost? -->


## JIRA

<!-- https://jira.mongodb.org/browse/DOCSP-NNNNN -->


## SKILL INFORMATION

<!-- For each skill added or modified, fill in one row. The token count for
SKILL.md appears in the output of the `review-skill` skill; see
https://www.mongodb.com/docs/meta/tutorials/review-agent-skill/ for details. -->

| Skill | Path | Purpose | SKILL.md Tokens |
|-------|------|---------|-----------------|
| `/skill-name` | `.claude/skills/skill-name/` | <!-- one-sentence purpose --> | <!-- N --> |

## SPECIAL CONSIDERATIONS

<!-- Prerequisites, required MCP servers, runtime/version requirements, or
dependencies on other skills. Write "None" if there are none. -->


## LLM-AS-JUDGE SCORING

<!-- Paste the output from running `review-skill` (structural validation +
LLM scoring). At minimum, fill in the per-dimension table. If scoring
multiple skills, duplicate the table. -->

**Structural validation (`skill-validator check`):** <!-- pass / fail -->
**Errors:** <!-- list, or "none" -->
**Warnings:** <!-- list, or "none" -->

### SKILL.md scores

| Skill | Overall | Clarity | Actionability | Token Eff. | Scope | Directive Prec. | Novelty |
|-------|---------|---------|---------------|------------|-------|-----------------|---------|
| `/skill-name` | | | | | | | |

### Reference file scores (if applicable)

| File | Overall | Clarity | Token Eff. | Novelty | Instructional Value | Skill Relevance |
|------|---------|---------|------------|---------|---------------------|-----------------|
| `references/<file>.md` | | | | | | |

**Mean novelty:** <!-- N.N (threshold: 3) -->

<!-- If any dimension scored 2 or below, or novelty is below 3, explain what
you changed in response or why the score is acceptable. -->


## VALIDATION PROMPTS

<!-- Provide the prompts you used to test the skill with an agent. Note any
behavioral differences between with-skill and baseline runs. -->

1.
2.
3.
4.
5.

## EVAL RESULTS (OPTIONAL)

<!-- If you ran evals comparing with-skill and baseline agent runs, summarize
them here. See PR #19339 for an example format. Skip if not applicable. -->


## AUTHOR SELF-REVIEW CHECKLIST

- [ ] Ran the `review-skill` skill and addressed any dimension scoring 2 or
      below, and any novelty score below 3 (or explained why it's acceptable).
- [ ] Tested the skill with an agent using the validation prompts above.
- [ ] `description` field contains specific, observable trigger conditions
      (not generic phrasing like "helps with X").
- [ ] Reference file descriptions tell the agent *when* to load the file,
      not *what's in* it.
- [ ] Inline routing directives use the trigger + imperative verb + payoff
      pattern (no soft "see X for more details" phrasing).
- [ ] Conditional or operation-specific guidance lives in reference files,
      not in `SKILL.md`.
- [ ] Scope does not overlap with an existing skill, or deferrals are
      explicit and name the target skill.
- [ ] No instructions reference non-existent tools, APIs, or files.
- [ ] Tool references are generic or capability-based (e.g., "read the file",
      "search the codebase") rather than tied to a specific agent platform's
      tool names (e.g., `Read`, `Grep`, `WebFetch`). The skill should work
      across Claude Code, Cursor, and other supported platforms.
- [ ] Added or updated an entry in `.claude/skills/OWNERS.yaml` with the
      skill's `dris` (1-2 GitHub usernames or emails; first is primary,
      second is backup) and today's `last_reviewed` date. New skills must
      include at least one non-`TBD` entry in `dris` before merge.

## REVIEWER CHECKLIST

<!-- Reviewers: see https://www.mongodb.com/docs/meta/tutorials/review-agent-skill/
for the full guide. -->

### Must-fix (block merge)

- [ ] Decision tree has no dead-end branches — every conditional has a
      defined next step for both outcomes.
- [ ] Prerequisites are surfaced upfront, not discovered mid-workflow.
- [ ] No internal contradictions between sections.
- [ ] No scope overlap with existing skills without explicit deferral.

### Should-fix (request changes)

- [ ] Instructions use concrete thresholds and criteria, not subjective
      terms like "large", "slow", or "appropriate".
- [ ] No content duplicated between `SKILL.md` and reference files.
- [ ] "Prefer X over Y" recommendations note when Y is actually correct.
- [ ] Low-novelty content is justified by eval evidence or removed.
- [ ] Examples use consistent field names and variables across a
      walkthrough.

### Nice-to-have (non-blocking)

- [ ] Hard limits and soft guidelines are weighted differently.
- [ ] Naming conventions and structural patterns match other skills in the
      catalog.
- [ ] If the skill's scope could be confused with another skill in the
      catalog, `SKILL.md` includes a "Do NOT use when" section that names
      the other skill and the conditions that route to it.

## EXTERNAL REVIEW REQUIREMENTS

See the [Agent Skill review guide](https://www.mongodb.com/docs/meta/tutorials/review-agent-skill/)
for guidance on evaluating scope, decision trees, instruction precision, and
cross-skill ecosystem fit.
