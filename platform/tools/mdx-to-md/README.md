# mdx-to-md

A tool for converting custom MDX files to standard Markdown. This package transforms MDX syntax and custom MDX components into plain Markdown.

## How it works

The package uses [Remark](https://remark.js.org/) and its plugin ecosystem to process MDX content through a series of transformations:

1. **Parse MDX** - Uses `remark-mdx` to parse MDX syntax
2. **Preserve frontmatter** - Uses `remark-frontmatter` to maintain YAML frontmatter
3. **Transform components** - Custom plugins convert JSX components to Markdown
4. **Stringify** - Uses `remark-stringify` to output final Markdown

### API

```typescript
mdxToMarkdown(
  source: string,
  contentMdxDir?: string,
  sourceFilePath?: string
): Promise<string>
```

**Parameters:**

- `source` (required): The MDX content as a string
- `contentMdxDir` (optional): Directory path where MDX files are stored. Required for resolving `<Include>` components
- `sourceFilePath` (optional): Path to the source file relative to `contentMdxDir`. Used for version context when resolving includes

**Returns:** A Promise that resolves to the converted Markdown string

## Development

```bash
# Build
pnpm build

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Lint
pnpm lint

# Type check
pnpm typecheck

# Convert a single MDX file (for local testing)
pnpm dev
```

### Dev command

`pnpm dev` builds the package and runs a one-off conversion of a single MDX file. It reads from the repo’s `content-mdx` directory and writes Markdown to `output/` in this package.

To choose which file is converted, edit `MDX_FILE_PATH` in `src/dev.ts` (e.g. `"django-mongodb/upcoming/interact-data/crud.mdx"` or `"manual/upcoming/core/transactions.mdx"`). Then run:

```bash
pnpm dev
```

Output is written to `output/<path>.md` (e.g. `output/django-mongodb/upcoming/interact-data/crud.md`).

## Extending

The package is designed to be extensible. New custom component transformations can be added as plugins in `src/plugins/`. Each plugin is a Remark plugin that transforms the AST (Abstract Syntax Tree) to convert JSX components to Markdown nodes.

