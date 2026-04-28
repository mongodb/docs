/**
 * One-off MDX → Markdown conversion for local testing (not part of the published API).
 *
 * Usage (from this package directory, after `pnpm build` or via `pnpm dev`):
 *   pnpm dev -- <path-relative-to-content-mdx>
 *   pnpm dev -- manual/upcoming/core/transactions.mdx
 *
 * Env overrides:
 *   MDX_TO_MD_FILE   — same as the CLI arg if you prefer not to use `--`
 *   CONTENT_MDX_DIR  — root of MDX tree (defaults to repo ../../content-mdx)
 *   MDX_TO_MD_BASE_URL — full docs base URL for relative refs in _references.json
 *                        (defaults to a small map by first path segment: atlas, manual, …)
 */

import { readFile, writeFile, mkdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { mdxToMarkdown } from "./parse.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const cliArgs = process.argv.slice(2).filter((a) => a !== "--");
const relPath =
  cliArgs[0]?.replace(/^\/+/, "") ||
  process.env.MDX_TO_MD_FILE?.replace(/^\/+/, "") ||
  "atlas/access/orgs-create-view-edit-delete.mdx";

const contentMdxDir =
  process.env.CONTENT_MDX_DIR ??
  join(__dirname, "..", "..", "..", "..", "content-mdx");

const mdxFilePath = join(contentMdxDir, relPath);

const input = await readFile(mdxFilePath, "utf-8");

const sourceFilePath = relPath.replace(/\.mdx$/, "");

const project = sourceFilePath.split("/")[0] ?? "";
const BASE_URLS: Record<string, string> = {
  atlas: "https://www.mongodb.com/docs/atlas",
  manual: "https://www.mongodb.com/docs/manual",
};
const baseUrl =
  process.env.MDX_TO_MD_BASE_URL?.replace(/\/$/, "") ?? BASE_URLS[project];

const result = await mdxToMarkdown(input, contentMdxDir, sourceFilePath, {
  ...(baseUrl ? { baseUrl } : {}),
});

const outputPath = join(
  __dirname,
  "..",
  "output",
  relPath.replace(/\.mdx$/, ".md")
);
const outputDir = dirname(outputPath);

await mkdir(outputDir, { recursive: true });
await writeFile(outputPath, result);

console.log(`Converted ${relPath} → ${outputPath}`);
