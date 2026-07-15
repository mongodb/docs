# Claude Skills Reference

Available Claude Code agent skills for the MongoDB Docs team. Invoke a skill by typing `/skill-name` in Claude Code, or describe what you want — Claude will pick up the right skill from context.

For guidelines on building and reviewing skills, see [Docs Agent Skill Guidelines](https://wiki.corp.mongodb.com/pages/viewpage.action?pageId=536510577).

<!-- Auto-generated from OWNERS.yaml and SKILL.md frontmatter. Run .claude/skills/generate-readme.py to update. -->

## Universal Skills

Skills every writer should know, regardless of team.

| Skill | What it does |
|---|---|
| `/jira` | Use this skill for any Jira operation in the DOCSP project — creating, viewing, searching, updating, transitioning, commenting on, or linking tickets |
| `/open-pr` | Opens a GitHub Pull Request with the standard PR template: Description, Staging Links, and JIRA ticket |
| `/staging-preview` | Generate staging preview links for a MongoDB docs PR |
| `/local-build-check` | Run local docs build checks on pending content/ changes before opening a PR |
| `/add-redirects` | Add redirects when MongoDB documentation pages are renamed, moved, or deleted under content/ |
| `/dochub` | Create or update a DocHub link (dochub.mongodb.org/core/<key>) so product UI and error messages point at docs through a stable vanity URL, or check whether a moved/renamed/deleted docs page has broken any DocHub link |
| `/unified-toc` | Update the unified table of contents when pages are added, removed, or moved |
| `/version-update` | Create a new version of any versioned MongoDB documentation docset — drivers, providers, or product docsets |
| `/docs-drift` | Detect drift between a documentation property and its source code, classify each finding (Confirmed / Tracked / Upcoming / Intentional / Needs-eng- confirmation), and draft held DOCSP tickets for confirmed drift only |
| `/source-explorer` | Read a product's source code and build a plain-language summary of its public surface — flags, options, API endpoints, states, defaults, and constraints |

## Grove & Code Examples

For writers working with tested code examples in the Grove platform.

| Skill | What it does |
|---|---|
| `/grove-setup` | Set up a local Grove environment for running code example tests |
| `/grove-create` | Create a new tested code example in the Grove platform |
| `/grove-migrate` | Migrate existing untested code into the Grove test suite |
| `/grove-run` | Run Grove tests and diagnose failures |
| `/grove-test` | Create or fix tests for existing Grove code examples |
| `/grove-maintain` | Audit, upgrade, and maintain Grove test suites |

## Release Notes

For writers drafting release notes for specific MongoDB products.

| Skill | What it does |
|---|---|
| `/compass-release-notes` | Draft Compass release notes for a new version by fetching the corresponding release from mongodb-js/compass and formatting them for the docs |
| `/drivers-release-notes` | Draft MongoDB drivers release notes for a new version by fetching the corresponding release from the driver source code and adding them to the documentation |
| `/mongosh-release-notes` | Draft MongoDB Shell (mongosh) release notes for a new version by fetching the corresponding release from mongodb-js/mongosh and formatting them for the docs |
| `/mcp-release-notes` | Draft MongoDB MCP Server release notes for a new version by fetching the corresponding release from mongodb-js/mongodb-mcp-server and formatting them for the docs |

## Drivers / DBX

| Skill | What it does |
|---|---|
| `/drivers-ticket-assistant` | Help the user understand and complete their assigned DOCSP tickets for drivers |

## Ticket Workflows

Skills for triage duty and batch ticket completion.

| Skill | What it does |
|---|---|
| `/triage` | Run triage duty for CET/Cloud, Server, or Drivers/DBX |
| `/captain-v2` | Batch workflow for completing small DOCSP Jira tickets via sage-bot-beta |

## Platform & Tooling

For specialized content migration tasks.

| Skill | What it does |
|---|---|
| `/language-tabs-to-composable-scripted` | Converts RST pages using language tabs to composable tutorial format |

## Skill Authoring

For writers reviewing or creating new Claude Code skills.

| Skill | What it does |
|---|---|
| `/review-skill` | Review a proposed Agent Skill for structural validity and content quality before publishing |

## Other Skills

| Skill | What it does |
|---|---|
| `/fix-404s` | Detect and fix broken external links (404s) in MongoDB documentation files |
| `/fix-nested-components` | Fix forbidden nested RST components flagged by the nested components linter — callouts inside callouts, callouts inside list-tables, examples inside callouts, examples inside list-tables, and procedures inside procedures |
