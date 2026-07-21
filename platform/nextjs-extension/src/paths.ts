import path from "node:path";

/** Fallback repo root when DOCS_MONOREPO_ROOT env var is not set */
export const DOCS_MONOREPO_ROOT_FALLBACK = "/opt/build/repo";

/** Name of the content directory at the repo root */
export const CONTENT_DIR_NAME = "content";

/**
 * Repo root used to resolve paths like `content/foo/snooty.toml`.
 * Prefer `DOCS_MONOREPO_ROOT` when set; otherwise use `fallbackRoot` (for example
 * `path.resolve(process.cwd(), "..", "..")` from the extension package).
 */
export const getDocsMonorepoRoot = (fallbackRoot: string): string =>
	process.env.DOCS_MONOREPO_ROOT
		? path.resolve(process.env.DOCS_MONOREPO_ROOT)
		: path.resolve(fallbackRoot);

/** Canonical directory paths for the monorepo, computed from repo root.
 * Pass a custom repoRoot to override the default (useful in tests).
 * Pass appDir to target a different Next.js app (e.g. "docs-site").
 *
 * Content paths throughout the build pipeline are stored relative to `contentDir`
 * (e.g. `atlas` or `c-driver/current`). Use `absoluteContentPath` and
 * `absoluteBundlePath` to resolve them to absolute filesystem paths when needed.
 */
export const getRepoPaths = (
	repoRoot = getDocsMonorepoRoot(DOCS_MONOREPO_ROOT_FALLBACK),
	appDir = "docs-nextjs",
) => {
	const contentDir = path.join(repoRoot, CONTENT_DIR_NAME);
	const appRoot = path.join(repoRoot, "platform", appDir);
	return {
		repoRoot,
		contentDir,
		docsNextjsDir: appRoot,
		tocDataDir: path.join(appRoot, "src", "context", "toc-data"),
		generatedDir: path.join(appRoot, "src", "generated"),
		offlineDocsDir: path.join(
			appRoot,
			"src",
			"context",
			"table-of-contents",
			"offline-docs",
		),
		parserDir: path.join(repoRoot, "snooty-parser"),
		mdxOutputDir: path.join(repoRoot, "content-mdx"),
		/** Resolve a content-relative path (e.g. `atlas/main`) to an absolute path */
		absoluteContentPath: (contentPath: string) =>
			path.join(contentDir, contentPath),
		/** Resolve a content-relative path to its absolute bundle directory path */
		absoluteBundlePath: (contentPath: string) =>
			path.join(contentDir, contentPath, "bundle"),
	};
};
