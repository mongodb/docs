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

**Verifying pages are available:**  
After the dev server starts, open:

```
platform/docs-site/generated-pages.html
```

This file is written at startup and lists all routes that were discovered from the filesystem, each as a clickable link to `http://localhost:3000/docs/<path>/`.

---

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

**Verifying generated pages:**  
After a successful build, check:

```
platform/docs-site/generated-pages.html
```

This file is created during `generateStaticParams` and lists every route that was statically pre-rendered. Spin up the built app with `pnpm start` and visit any of the listed routes to confirm pages render correctly.
