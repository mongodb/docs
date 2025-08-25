# Reviewing Guidelines for the Atlas App Services Documentation

Realm Docs contributions typically go through two sets of reviewers:

1. A **copy edit**, which focuses on structure and wording
2. A **technical review**, which addresses code snippets and the
   technical correctness of prose.

## Technical Review

Review the technical accuracy and completeness of a docs PR
(Pull Request) and correct it if necessary.

### What to Review

- Code snippets
- Technical claims, e.g. ("To create a `Foo`, use the `Bar.createFoo()` method")
- Missing "footguns", i.e. potential pitfalls that could trip up users
  who try to follow the documentation.

### What Not to Review

- Wording of sentences: while suggestions are appreciated, PRs
  that have reached the technical review stage have already passed copy
  editing. Copy edits are out of scope of technical reviews, unless they
  directly relate to a technical claim.
- Structure of the page: as with wording, structural changes are out of
  scope and should never block approval of a technical review.
- Any lines of the page that have not been touched in the PR,
  unless they refer to content that has changed as a result of the PR or
  fall within the scope of the PR's related JIRA ticket. If you do notice
  an issue with content that's outside of the JIRA ticket's scope,
  please mention it in the #docs-realm Slack channel or file a JIRA
  ticket with the `DOCSP` project.

## Copy Edits

Review the structure, wording and flow of a docs PR and correct it if
necessary.

### What to Review

- Wording
- Page structure
- Snooty Autobuilder build errors and warnings
- Altered or added example app tests (if any have changed, CI should
  automatically run)
- Technical content from a "looks correct" perspective, since technical
  review should address deeper concerns
- Whether or not the PR fulfills the Acceptance Criteria described in the
  linked JIRA ticket.

### What Not to Review

Very little is completely off-limits to a copy edit of a PR -- if you
notice a technical issue, it's best to call it out early.
However,
copy editors should constrain their reviews to only content within the
scope of the JIRA ticket.
