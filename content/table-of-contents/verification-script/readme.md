# Unified TOC Verification script

This script:

- Creates an array of every ToC entry, grouped by site

- Creates an array of every `.txt` file in the monorepo dirs, grouped by site
  - If the `contentSite` string in `types/types.ts` is different from the monorepo directory name, you must add it to the `remapSite` variable in `verification-config.ts`.
  - If your site is versioned, you must add the appropriate versions to the `config` variable in `verification-config.ts`
  - If you site has a url prefix, you must add it to `urlPrefixes` in `verification-config.ts`
    - This is any url content between `/docs` and your `/<site name>`
    - For example, csharp docs have a url of `/docs/drivers/csharp` so `/drivers` must be added to `urlPrefixes`

- Compares the list of .txt files to the ToC entries

- Creates a `missing.csv` for .txt files that:
  - Exist in a dir/version specified in `verification-config.ts`
  - Are not listed in a ToC entry

- Creates a `matched.csv` for .txt files that have a matching ToC entry

- Logs files marked `:orphan:`


## Running the script

The script has no dependencies beyond what is already required by `package.json` and `package-lock.json`

You can run the script with any typescript compatible toolchain. For example:
``` shell
npx ts-node content/table-of-contents/verification-script/verify-toc.ts
```

If you get an error related to `__filename` or `__dirname`, try uncommenting lines 71-72 of `verify-toc.ts`.

## Output
The script writes two output files: matched.csv and missed.csv.

Both files have the same format:
```
site, file path, expected url, matched toc url
```

- `site`: the content docs site associated with the file/url
  - this is a string from the `DocSite` type in `./types/index.ts`
- `file path`: the file evaluated
- `expected url`: the url we expect to see in the ToC entry for the specified file
- `matched toc url`: the actual file path used in the ToC (`null` if no match)

NOTE: The script attempts to match the the expected url both with and without a trailing slash.

## Migrated vs Unmigrated sites

Only migrated sites can be checked by this script.

Sites that:
- Have not been migrated
- Are used in the ToC
- Are not marked as `isExternal`

are noted with a comment `NOT-MIGRATED` in the `verification-config.ts` file.
