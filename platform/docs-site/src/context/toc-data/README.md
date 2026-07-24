# TOC Data

For development, this directory should contain a `data.copied.ts` file with the complete data from `toc.json`:

- **File to create:** `toc-data/data.copied.ts`
- **Purpose:** Holds generated table-of-contents data (~60k lines).
- **Status:** Ignored by Git.

## Local setup

Generate your toc data in the `content/table-of-contents` directory:
```bash
cd content/table-of-contents
pnpm i
pnpm run build
```

You can see full usage instructions in the [README](../../../../../content/table-of-contents/README.md) inside `table-of-contents/`.

At this point, you should have a `toc.json` file inside `context/table-of-contents/build/`. Now create a `data.copied.ts` file in this directory, with the following:
```bash
// Auto-generated from toc.json
export const tocData = <PASTE_TOC_JSON_CONTENTS_HERE> as const;
```
