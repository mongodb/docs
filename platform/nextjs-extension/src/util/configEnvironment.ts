import type {
	BranchEntry,
	DocsetsDocument,
	Environments,
	PoolDBName,
	ReposBranchesDocument,
	SearchDBName,
	SnootyDBName,
	ProjectsDocument,
	OrganizationName,
} from "./databaseConnection/types";

export const envVarToBool = (envVar: boolean | string = "false"): boolean => {
	if (!envVar) {
		return false;
	}
	if (typeof envVar === "boolean") {
		return envVar;
	}
	return JSON.parse(envVar);
};

// TODO: update this once on nextjs
export type ConfigEnvironmentVariables = Partial<{
	// The name of the branch in the content repo that is being built
	BRANCH_NAME: string;
	// Usually duplicate of BRANCH_NAME property, this is the git primitve branch that the build is being built on
	BRANCH: string;
	ALLOW_INACTIVE_VERSIONS: boolean; // If true, also build inactive branches with eol_type === 'link'. Default is false.
	COMMIT_REF: string;
	CACHED_COMMIT_REF: string;
	REPO_NAME: string;
	ORG: OrganizationName;
	SITE_NAME: string;
	INCOMING_HOOK_URL: string;
	INCOMING_HOOK_TITLE: string;
	INCOMING_HOOK_BODY: string;
	IS_LOCAL_DEVELOPMENT: boolean;
	ENV: Environments;
	REPO_ENTRY: ReposBranchesDocument;
	DOCSET_ENTRY: DocsetsDocument;
	BRANCH_ENTRY: BranchEntry;
	// Exposed to Next.js client/build; typically mirrors BRANCH / HEAD
	NEXT_PUBLIC_GIT_BRANCH: string;
	PROJECTS_ENTRY: ProjectsDocument;
	POOL_DB_NAME: PoolDBName;
	REPOSITORY_URL: string;
	SEARCH_DB_NAME: SearchDBName;
	SNOOTY_DB_NAME: SnootyDBName;
	SLACK_USER_ID: string;
	SLACK_USERNAME: string;
	DEPLOY_PRIME_URL: string;
	DEPLOY_URL: string;
	REVIEW_ID: string;
	DEPLOY_ID: string;
	UNIFIED_TOC_JSON_PATH: string;
	// Content tree this site builds, e.g. "manual" or "pymongo-driver/current"
	DOCS_PROJECT: string;
}>;
