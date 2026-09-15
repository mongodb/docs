# Testing the SSG Docs App

## Prerequisites — Generate MDX

Before running dev or building, the target project's content must be converted from RST to MDX. Run this from the **`platform/`** root:

```bash
pnpm convert:rst-to-mdx
```

This populates `content-mdx/<project>/` with the MDX files the app reads. It must be re-run whenever source docs change.

---

## Dev Experience

From **`platform/`**:

```bash
pnpm dev
```

This launches `scripts/select-project.mjs`, which prompts you to pick a project. It sets `DOCS_PROJECT`, then starts `next dev`.

## Build Experience

From **`platform/docs-site/`**:

```bash
DOCS_PROJECT=django-mongodb pnpm build
```

Replace `django-mongodb` with any project directory under `content-mdx/`.

**Build log:**  
All output (stdout + stderr) is written to:

```
platform/docs-site/build.log
```

The log captures MDX compile warnings, the route table, and any errors — useful for debugging which pages failed to pre-render.
