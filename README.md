# Docs Monorepo

## Selecting PR Template

When creating a pull request, you can automatically populate the
description with a template by adding a query parameter to the URL. We
provide the following templates:

- Platform changes: Use `?template=platform.md`
- Code Example Tests changes: Use `?template=code.md`
- Content changes: Use `?template=content.md`
- Drivers changes: Use `?template=drivers.md`
- Cloud Docs changes: Use `?template=cloud.md`
- Agent Skill changes: Use `?template=agent-skill.md`

For example:

```curl
https://github.com/example/exampleChanges/compare/test?expand=1&template=template.md
```

## Context7

The `context7.json` file in the root of the repository is used to prove our ownership of the MongoDB docs to Context7.
