# Docs Monorepo

This monorepo holds MongoDB documentation source (`content/`) and the apps that build and serve it (`platform/`).

- Writers currently author a Snooty dialect of RST in `content/`.
- CI converts that RST to MDX (`platform/snooty-ast-to-mdx`).
- `platform/docs-site` statically generates each content site and deploys it to Netlify (one site per content project).
- RST is the current source format; new authoring is moving to MDX.

`platform/` contains the build and serving apps for the docs sites, plus the RST-to-MDX converter, Netlify extensions, and related tools. `docs-nextjs` used to serve all docs via ISR. Writer content is moving off it onto `docs-site`. `docs-nextjs` remains for shared pages that aren't writer content: site search, 404, AI Assistant, Product Updates, and similar.

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
