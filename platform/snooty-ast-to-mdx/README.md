# snooty-ast-to-mdx

This tool converts custom [Snooty rST](https://github.com/mongodb/snooty-parser) to `mdx` by going from Snooty AST to MDAST, then using Remark/Frontmatter to get `mdx`.

- The process includes converting custom Snooty rST >> custom Snooty AST >> `mdast` >> `mdx`
- The conversion is not always 1:1, due to differences in rST vs `mdx`
  - Examples include: substitutions, images, custom directives, etc.

### How it works

- Snooty parser is used to go from rST >> AST
- Custom mapping logic is applied to convert AST >> `mdast`
- Remark/Frontmatter is then used to convert `mdast` >> `mdx`

## Run the rST to MDX script

```bash
Usage:
    ./convertRstToMdx.sh --help or -h # shows this help message

    ./convertRstToMdx.sh <folder/inside/of/content> # runs against a single folder
    ./convertRstToMdx.sh # with no arguments, runs against all content folders
```

**NOTE:** Before you run the script, ensure you're using the correct version of node. You may also need to give the script permissions to be executed:
```bash
nvm use
chmod +x convertRstToMdx.sh # if needed
```

This will run a full rST to MDX conversion on a docs site from the `content/` folder. The `mdx` output will be placed in the `platform/docs-nextjs/src/pages/` folder. For example:

```bash
./convertRstToMdx.sh atlas # runs against the atlas content folder (content/atlas)
```

### Options (environment variables)

Default settings for the environment variables (Apple Silicon with latest parser version):
```bash
SNOOTY_ARCH=arm SNOOTY_VERSION=v0.20.7 ./convertRstToMdx.sh
```

You can run the script with different parser versions, which can be found here: https://github.com/mongodb/snooty-parser/releases
```bash
SNOOTY_VERSION=v0.20.5 ./convertRstToMdx.sh
```

Or for different architectures (Apple Silicon, Intel Mac, or Linux). Aliases are also supported and can be found in the script (look for `ARCH_INPUT`).
```bash
SNOOTY_ARCH=x86 ./convertRstToMdx.sh # same as below
SNOOTY_ARCH=intel ./convertRstToMdx.sh # same as above
SNOOTY_ARCH=linux ./convertRstToMdx.sh
```

For debugging purposes, you can set the `SNOOTY_VERBOSE` environment variable to `true` to show output from the Snooty parser when building the AST:
```bash
SNOOTY_VERBOSE=true ./convertRstToMdx.sh
```

## Developer Quickstart

**NOTE:** The full set of rST source files can be found in the top-level `content/` folder. If you want to parse a docs site into a zip (and optionally extract JSON files), follow the [Developer Quickstart instructions here](https://github.com/mongodb/snooty?tab=readme-ov-file#developer-quickstart).

```bash
pnpm install
pnpm lint && pnpm typecheck && pnpm test --coverage

pnpm start /path/to/ast-input.json
pnpm start /path/to/doc-site.zip /optional/output/folder
```

### Run with a json file

This is a more contrived example, which will run the tool against a single json file, which represents a single page from a docs site. Docs sites are typically stored in a zip file, which we unzip to read BSON files, which get dumped to JSON files:

```bash
pnpm start /path/to/ast.json
```

### Run with a zip file

This will run the tool against a zip file, which contains a single docs site (a collection of pages). This tool should output the entire site in MDX format (along with images and substitutions) in a folder which preserves the directory structure of the zip file. For example, if you had parsed the MongoDB Manual with Snooty Parser, you could run:

```bash
pnpm start /path/to/manual.zip
```
