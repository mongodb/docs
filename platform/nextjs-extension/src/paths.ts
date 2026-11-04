import path from "node:path";

/** Fallback repo root when DOCS_MONOREPO_ROOT env var is not set */
export const DOCS_MONOREPO_ROOT_FALLBACK = "/opt/build/repo";

/** Name of the content directory at the repo root */
export const CONTENT_DIR_NAME = "content";

/**
 * Repo root used to resolve paths like `content/table-of-contents`.
 * Prefer `DOCS_MONOREPO_ROOT` when set; otherwise use `fallbackRoot` (for example
 * `path.resolve(process.cwd(), "..", "..")` from the extension package).
 */
export const getDocsMonorepoRoot = (fallbackRoot: string): string =>
	process.env.DOCS_MONOREPO_ROOT
		? path.resolve(process.env.DOCS_MONOREPO_ROOT)
		: path.resolve(fallbackRoot);

/** Directory paths the unified TOC build needs, computed from repo root.
 * Pass a custom repoRoot to override the default (useful in tests).
 * Pass appDir to target a different Next.js app (e.g. "docs-site").
 */
export const getRepoPaths = (
	repoRoot = getDocsMonorepoRoot(DOCS_MONOREPO_ROOT_FALLBACK),
	appDir = "docs-nextjs",
) => {
	const contentDir = path.join(repoRoot, CONTENT_DIR_NAME);
	const appRoot = path.join(repoRoot, "platform", appDir);
	return {
		tocDataDir: path.join(appRoot, "src", "context", "toc-data"),
		/** Resolve a content-relative path (e.g. `table-of-contents`) to an absolute path */
		absoluteContentPath: (contentPath: string) =>
			path.join(contentDir, contentPath),
	};
};
