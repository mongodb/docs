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
  sourceFilePath?: string,
  options?: { baseUrl?: string }
): Promise<string>
```

**Parameters:**

- `source` (required): The MDX content as a string
- `contentMdxDir` (optional): Directory path where MDX files are stored. Required for resolving `<Include>` components
- `sourceFilePath` (optional): Path to the source file relative to `contentMdxDir`. Used for version context when resolving includes
- `options.baseUrl` (optional): Docs site base URL so relative paths in `_references.json` become absolute links

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

# Convert a single MDX file (for local testing; path is relative to content-mdx)
pnpm dev -- atlas/access/orgs-create-view-edit-delete.mdx
```

### Dev command

`pnpm dev` builds the package and runs a one-off conversion of a single MDX file. It reads from the repo’s `content-mdx` directory (override with `CONTENT_MDX_DIR`) and writes Markdown under `output/` in this package.

Pass the file path relative to `content-mdx` (include the `.mdx` extension):

```bash
pnpm dev -- manual/upcoming/core/transactions.mdx
pnpm dev -- django-mongodb/upcoming/interact-data/crud.mdx
```

If you omit the argument, `MDX_TO_MD_FILE` or a small default in `src/dev.ts` is used. Optional: `MDX_TO_MD_BASE_URL` for resolving relative entries in `_references.json` when the built-in atlas/manual map does not fit.

Output is written to `output/<same-relative-path>.md`.

## Extending

The package is designed to be extensible. New custom component transformations can be added as plugins in `src/plugins/`. Each plugin is a Remark plugin that transforms the AST (Abstract Syntax Tree) to convert JSX components to Markdown nodes.

