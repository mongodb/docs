import type { NetlifyPluginOptions } from "@netlify/build";
// Documentation: https://sdk.netlify.com
import {
	type BuildHookOptions,
	type BuildHookType,
	NetlifyExtension,
} from "@netlify/sdk";
import type z from "zod";
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
import { getDbConfig, type StaticEnvVars } from "./assertDbEnvVars";

type BuildHookWithEnvVars<
	DbConfig,
	BuildContext extends z.ZodSchema,
	BuildConfigSchema extends z.ZodSchema,
> = (
	options: {
		dbEnvVars: DbConfig;
		buildContext?: BuildContext;
		buildConfig?: BuildConfigSchema;
	} & Omit<NetlifyPluginOptions, "inputs">,
) => void | Promise<void>;

type ExtensionOptions = {
	isEnabled: boolean;
};

type FunctionsOptions = {
	/**
	 * A prefix value added to functions. For example, given a prefix value of `my_prefix`, a function
	 * `hello-world.mts` will be named `my_prefix_hello-world`. Used to prevent naming collisions
	 * between functions.
	 */
	prefix: string;
	/**
	 * An optional function that can be used to prevent functions from being injected into the user's
	 * site. Receives the name of the function to be injected (excludes file extension).
	 */
	shouldInjectFunction?: ((options: { name: string }) => boolean) | undefined;
};

export const envVarToBool = (envVar: boolean | string = "false"): boolean => {
	if (!envVar) {
		return false;
	}
	if (typeof envVar === "boolean") {
		return envVar;
	}
	return JSON.parse(envVar);
};

// class Extension extends NetlifyExtension
export class Extension<
	BuildContext extends z.ZodSchema = z.ZodUnknown,
	BuildConfigSchema extends z.ZodSchema = z.ZodUnknown,
> extends NetlifyExtension<
	z.ZodUnknown,
	z.ZodUnknown,
	// In case of issues, double check that BuildContext, BuildConfigSchema are in correct spots within the order of type params
	BuildContext,
	BuildConfigSchema,
	z.ZodUnknown
> {
	isEnabled: boolean;
	staticEnvVars: StaticEnvVars;

	constructor({ isEnabled }: ExtensionOptions) {
		super();
		this.isEnabled = isEnabled;
		console.log(`Extension enabled: ${this.isEnabled}`);
		this.staticEnvVars = getDbConfig();
	}

	addBuildEventHandler = async (
		type: BuildHookType,
		func: BuildHookWithEnvVars<
			StaticEnvVars,
			Zod.infer<BuildContext>,
			Zod.infer<BuildConfigSchema>
		>,
		options?: BuildHookOptions,
	): Promise<void> => {
		super.addBuildEventHandler(
			type,
			async (args) => {
				const dbEnvVars = this.staticEnvVars;
				console.log(`Starting logic within ${type} Netlify Hooks.`);
				await func({ dbEnvVars, ...args });
			},
			{
				...options,
				if: (buildConfig: Zod.infer<BuildConfigSchema>) => {
					if (!this.isEnabled) {
						return false;
					}
					// Ensure if option is not overwritten if passed into build event handler
					return options?.if === undefined || options.if(buildConfig);
				},
			},
		);
	};
}

// TODO: update this once on nextjs
export type ConfigEnvironmentVariables = Partial<{
	// The name of the branch in the content repo that is being built
	BRANCH_NAME: string;
	// Usually duplicate of BRANCH_NAME property, this is the git primitve branch that the build is being built on
	BRANCH: string;
	ALLOW_INACTIVE_VERSIONS: boolean; // If true, will build inactive branches. Default is false.
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
}>;
