# TOC Data

For development, this directory should contain a `data.copied.ts` file with the complete data from toc.json:

- **File to create:** `toc-data/data.copied.ts`
- **Purpose:** Holds generated table-of-contents data (~60k lines).
- **Status:** Ignored by Git.

## Local setup

Generate your toc data in the `content/table-of-contents` directory.

You can follow the README in the table-of-contents directory [here](../../../../../content/table-of-contents/README.md).

Then copy/paste the output from toc.json into `toc-data/data.copied.ts` like below:


```ts
// toc-data/index.ts
export const tocData = // ... the complete array of toc data