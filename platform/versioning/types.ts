/**
 * Types for file-based docs versioning.
 *
 * Authoring note: everything here is erasable-syntax-only (no enums, no
 * parameter properties) so the files can be loaded by a plain TypeScript
 * import in the Next.js apps and by Node's type stripping in build tooling.
 */

/** Docs search registration. Omit for projects not in docs search. */
export type DocsetSearch = {
	/** Human-readable category shown in the search filter dropdown. */
	categoryTitle: string;
	/**
	 * Key prefix for search properties (`${categoryName}-${versionName}`).
	 * Defaults to the docset's `project`. Set it ONLY where the two differ —
	 * for example the Manual, whose `project` is `docs` but whose
	 * `categoryName` is `manual`.
	 */
	categoryName?: string;
};

/** How an inactive version is presented to readers. */
export type EOLType = "download" | "link";

/** One published version of a docset. */
export type Version = {
	/**
	 * The single real identifier.
	 * 
	 * For a multi-version project this should be simultaneously:
	 * - the content directory under `content/<project>/`,
	 * - the URL path segment after the site prefix, and
	 * - the search key suffix.
	 *
	 * For an unversioned project it is a data stub (usually `main`) used for the
	 * search key and offline bundles — it is NOT a URL path segment.
	 */
	versionName: string;
	/** Whether the version is currently published. Defaults to `true`. */
	active: boolean;
	/** Label shown in the version dropdown. Defaults to `versionName`. */
	versionSelectorLabel: string;
	/**
	 * If true, the version docs search and canonical links should prefer.
	 * At most one `stable` per project.
	 */
	stable: boolean;
	/**
	 * If true, the version is excluded from search indexing and sitemaps.
	 * Defaults to `false`.
	 */
	noIndexing: boolean;
	/** Present only for inactive versions still surfaced as end-of-life. */
	eolType?: EOLType;
	/** Download location for an offline bundle, if one exists. */
	offlineUrl?: string;
};

/**
 * A labelled cluster of versions in the version dropdown.
 *
 * `groupLabel` is the identity: it is what the dropdown renders and keys on.
 * The pool documents carried a Mongo ObjectId `id` here, but no consumer ever
 * read it, so it is not reproduced.
 */
export type Group = {
	groupLabel: string;
	/** `versionName` values that appear in the version dropdown. Must exist on the docset. */
	includedVersions: string[];
};

/** One documentation site. */
export type Docset = {
	/** Snooty project name. Must match the filename and the project's snooty.toml. */
	project: string;
	/** Name shown in UI surfaces. */
	displayName: string;
	/** Published path prefix without a leading or trailing slash, e.g. `docs/atlas/cli`. */
	prefix: string;
	/**
	 * Excluded from public-facing responses such as sitemaps, health-check URLs,
	 * and llms.txt generation. Defaults to `false`.
	 */
	internalOnly: boolean;
	search?: DocsetSearch;
	groups?: Group[];
	/** At least one version. */
	versions: Version[];
};

/**
 * One version of a docs site, as written in `projects/<project>.ts`.
 *
 * Order matters: versions appear in the version dropdown in the order listed
 * here, so keep newest first.
 */
export type VersionInput = {
  /**
   * The version's identity, and the only value that must be exactly right.
   *
   * For a site with multiple versions this string is all of these at once:
   * - the directory under `content/<contentDir>/` holding the source,
   * - the URL segment after the site prefix (`/docs/atlas/cli/v1.57/`),
   * - the suffix of the docs-search key (`atlas-cli-v1.57`).
   *
   * For a single-version site it is a stub, by convention `main`. It still
   * names the search key and the offline bundle, but it does NOT appear in
   * the URL — that site publishes at its prefix alone.
   */
  name: string;
  /**
   * What the version dropdown displays. Defaults to `name`.
   *
   * Use it when the readable name differs from the directory, most often to
   * pin down what a moving name currently points at:
   * `{ name: "current", label: "current (v1.58.2)" }`. Display only — no URL,
   * key, or path depends on it.
   */
  label?: string;
  /**
   * Whether the version is published. Defaults to `true`.
   *
   * `false` means the site is no longer built or served for this version: it
   * leaves the version dropdown, the sitemap, and docs search. Set this when
   * a version goes end-of-life, and usually set `eol` alongside it.
   */
  active?: boolean;
  /**
   * Drives canonical link targets and the default docs-search result for the
   * site. Exactly one active version per site should be `true`; a second one
   * fails the build. Move it when you cut a new release.
   *
   * Defaults to `false`.
   */
  stable?: boolean;
  /**
   * Keeps the version out of search indexing and the sitemap. Defaults to `false`.
   *
   * The version is still built and reachable by direct link — this only hides
   * it from search engines and site search. Typical for `upcoming`, which
   * documents unreleased behavior.
   */
  noIndexing?: boolean;
  /**
   * How an inactive version is still offered to readers.
   *
   * `"download"` points at a downloadable archive of the docs; `"link"` sends
   * readers to another page. Omit it for a version that is simply gone and
   * shouldn't be surfaced at all. Only meaningful with `active: false`.
   */
  eol?: EOLType;
  /** Direct URL to this version's offline docs archive, if one is published. */
  offlineUrl?: string;
};

/**
 * One docs site, as written in `projects/<project>.ts`. Pass it to
 * `defineDocset()`, which fills in defaults and validates the result.
 *
 * Adding a site: create the file, name it after `project`, and register it in
 * `../index.ts`. CI fails if those disagree.
 */
export type DocsetInput = {
	/**
	 * The Snooty project name. Must match this file's name and the `name` field
	 * in the site's `snooty.toml`.
	 *
	 * This is an internal identifier, not a URL: it keys parsed pages, build
	 * metadata, and the docs-search category. It often differs from the content
	 * directory (project `docs` lives in `content/manual/`) and from the URL
	 * prefix. Renaming one is a migration, not an edit.
	 */
	project: string;
	/** The site's name as readers see it, e.g. "Atlas CLI" or "MongoDB Manual". */
	displayName: string;
	/**
	 * Where the site publishes, without leading or trailing slashes:
	 * `"docs/atlas/cli"` serves `https://mongodb.com/docs/atlas/cli/`.
	 *
	 * A site with multiple versions appends the version (`docs/atlas/cli/v1.57`);
	 * a single-version site publishes at the prefix alone. Must be unique once
	 * the version is appended — `docs` and `landing` are the sole exception, and
	 * they coexist because only one of them is versioned.
	 */
	prefix: string;
	/**
	 * Hides the site from public-facing output: sitemaps, health checks, and
	 * llms.txt. Defaults to `false`.
	 *
	 * For sites that are built and deployed but not meant to be discoverable,
	 * such as `meta`. It does NOT make a site private — the pages are still served
	 * to anyone with the URL.
	 */
	internalOnly?: boolean;
	/**
	 * Registers the site in docs search. Omit it and the site is not searchable
	 * and contributes no search keys.
	 */
	search?: DocsetSearch;
	/**
	 * Splits the version dropdown into labelled sections, e.g. the Manual's
	 * "Major Release" and "Minor Release". Omit it and versions appear as one
	 * flat list. Versions you leave out of every group still appear, above the
	 * groups.
	 */
	groups?: Group[];
	/**
	 * Every version of the site, newest first. At least one is required.
	 *
	 * A site with one version publishes at its prefix with no version segment;
	 * two or more and every version gets a URL segment.
	 */
	versions: VersionInput[];
};
