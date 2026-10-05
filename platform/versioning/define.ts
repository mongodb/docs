import type {
	Docset,
	DocsetInput,
	Version,
	VersionInput,
} from "./types";

export const DOCS_URL_PROD = "https://mongodb.com/";
export const DOCS_URL_STAGING = "https://mongodbcom-cdn.staging.corp.mongodb.com/";

export const docsUrlForEnv = (env: string | undefined): string =>
	env === "dotcomstg" ? DOCS_URL_STAGING : DOCS_URL_PROD;

const fail = (project: string, message: string): never => {
	throw new Error(`[versioning] ${project}: ${message}`);
};

const applyVersionDefaults = (input: VersionInput): Version => {
	const version: Version = {
		versionName: input.name,
		active: input.active ?? true,
		versionSelectorLabel: input.label ?? input.name,
		stable: input.stable ?? false,
		noIndexing: input.noIndexing ?? false,
	};
	if (input.eol !== undefined) version.eolType = input.eol;
	if (input.offlineUrl !== undefined) version.offlineUrl = input.offlineUrl;
	return version;
};

/**
 * Applies defaults and checks the invariants that are cheap to enforce at
 * author time. Anything needing the filesystem (does `content/<project>/<version>/`
 * exist?) or cross-project state (are prefixes unique?) belongs in the lint
 * pass instead, since this runs inside the bundled apps.
 *
 * Throws rather than warns: a malformed docset should fail the build, not
 * silently drop a version.
 */
export const defineDocset = (input: DocsetInput): Docset => {
	const { project } = input;

	if (!project) fail("<unnamed>", "`project` is required");
	if (!input.prefix && input.prefix !== "")
		fail(project, "`prefix` is required (use `\"\"` for the landing site)");
	if (!input.versions || input.versions.length === 0)
		fail(project, "at least one version is required");

	const versions = input.versions.map(applyVersionDefaults);

	const seen = new Set<string>();
	for (const version of versions) {
		if (!version.versionName)
			fail(project, "every version needs a non-empty `name`");
		if (seen.has(version.versionName))
			fail(project, `duplicate versionName "${version.versionName}"`);
		seen.add(version.versionName);
	}

	const stable = versions.filter((v) => v.active && v.stable);
	if (stable.length > 1)
		fail(
			project,
			`more than one active version marked stable: ${stable
				.map((v) => v.versionName)
				.join(", ")}`,
		);

	for (const group of input.groups ?? []) {
		for (const versionName of group.includedVersions) {
			if (!seen.has(versionName))
				fail(
					project,
					`group "${group.groupLabel}" includes unknown version "${versionName}"`,
				);
		}
	}

	const docset: Docset = {
		project,
		displayName: input.displayName,
		prefix: input.prefix,
		internalOnly: input.internalOnly ?? false,
		versions,
	};
	if (input.search !== undefined) docset.search = input.search;
	if (input.groups !== undefined) docset.groups = input.groups;
	return docset;
};

export const isMultiVersion = (docset: Docset): boolean =>
	docset.versions.length > 1;

/** Search key for a version: `${categoryName}-${versionName}`. */
export const searchPropertyFor = (
	docset: Docset,
	version: Version,
): string | undefined => {
	if (!docset.search) return undefined;
	const categoryName = docset.search.categoryName ?? docset.project;
	return `${categoryName}-${version.versionName}`;
};
