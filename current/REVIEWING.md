# Pull Request Reviewing Guidelines for the Django MongoDB Backend Documentation

Contributions to the set of documents in this repository can receive reviews from one or both of the following types of reviews:

1. A **copy review**, which focuses on information structure and wording; typically performed by a MongoDB Documentation Team member
2. A **technical review**, which addresses code snippets and the technical correctness of prose; typically performed by a MongoDB engineer.

See the following sections for reviewer expectations for each type of pull request (PR) review:

## Copy Review

Review the structure, wording, and flow of the information in the PR, and correct it if necessary.

### What to Review

- Wording
- Page structure
- Technical content to the extent of the reviewer's understanding.
- Whether the PR fulfills the Acceptance Criteria described in the
  linked JIRA ticket.

### What Not to Review

Nothing is completely off-limits to a copy review of a PR -- if you notice a technical issue, it's best to call it out early.
Copy reviewers should constrain their reviews to content within the scope of the JIRA ticket, or otherwise create PRs to address anything unrelated.

## Technical Review

Review the technical accuracy and completeness of a PR and correct it if necessary.

### What to Review

- Code snippets; ensure the code is idiomatic and that all technical claims are correct. e.g. ("To create a `Foo`, use the `Bar.createFoo()` method")
- Problematic explanations that could trip up users who try to follow the documentation.

### What Not to Review

While we welcome any recommendations on wording and structure, avoid blocking approval based on any copy edits. Please entrust the author to make the writing decisions based on style guidelines and team-specific writing conventions, and to create PRs to address anything they deem outside the technical review scope.

- Wording of sentences, although corrections to technical claims are welcome
- Structure of the page
- Any unchanged lines outside the PR unless relevant to the ticket
  acceptance criteria.
