// File just to run the script locally for development

import { readFile, writeFile, mkdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { mdxToMarkdown } from "./parse.js";

// Specify the MDX file path relative to content-mdx directory
// Example: 'manual/upcoming/core/transactions.mdx' or 'atlas/alert-resolutions.mdx'
const MDX_FILE_PATH = "django-mongodb/upcoming/interact-data/crud.mdx";

// Get the directory of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Calculate path to content-mdx directory (go up from src -> mdx-to-md -> tools -> platform -> root -> content-mdx)
const contentMdxDir = join(__dirname, "..", "..", "..", "..", "content-mdx");
const mdxFilePath = join(contentMdxDir, MDX_FILE_PATH);

// Read the MDX file
const input = await readFile(mdxFilePath, "utf-8");

// Convert MDX to Markdown
// The sourceFilePath is the full path for version context (e.g., "manual/upcoming/core/transactions" or "atlas/alert-resolutions")
const sourceFilePath = MDX_FILE_PATH.replace(/\.mdx$/, "");
const result = await mdxToMarkdown(input, contentMdxDir, sourceFilePath);

// Create output path (change .mdx extension to .md)
const outputPath = join(
  __dirname,
  "..",
  "output",
  MDX_FILE_PATH.replace(/\.mdx$/, ".md")
);
const outputDir = dirname(outputPath);

// Create directory structure if it doesn't exist
await mkdir(outputDir, { recursive: true });

// Write the file
await writeFile(outputPath, result);

console.log(`✅ Converted ${MDX_FILE_PATH} to Markdown`);
console.log(`📄 Output written to: ${outputPath}`);
