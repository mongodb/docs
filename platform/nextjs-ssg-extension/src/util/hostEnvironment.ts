import {
	type Environments,
	isBuildEnvironment,
} from "./databaseConnection/types";

export type BuildHost = "netlify" | "vercel" | "local";

export type HostEnvironment = {
	host: BuildHost;
	env: Environments;
	branch: string;
	commitRef?: string;
	prId?: string;
	deployId?: string;
	baseCommitRef?: string;
	repositoryUrl?: string;
};

type EnvVars = Record<string, string | undefined>;

const NETLIFY_CONTEXT_TO_ENV: Record<string, Environments> = {
	production: "dotcomprd",
	preprd: "dotcomstg",
	"deploy-preview": "prd",
	"branch-deploy": "prd",
	"preview-server": "prd",
	dev: "stg",
};

const VERCEL_ENV_TO_ENV: Record<string, Environments> = {
	production: "dotcomprd",
	preview: "prd",
	development: "stg",
};

export const detectHost = (vars: EnvVars): BuildHost => {
	if (vars.VERCEL) return "vercel";
	if (vars.NETLIFY) return "netlify";
	return "local";
};

const resolveEnv = (
	host: BuildHost,
	vars: EnvVars,
	hostContext: string | undefined,
	contextMap: Record<string, Environments>,
): Environments => {
	if (vars.ENV !== undefined) {
		if (isBuildEnvironment(vars.ENV)) return vars.ENV;
		throw new Error(
			`ENV "${vars.ENV}" is not a build environment (stg, prd, dotcomstg, dotcomprd)`,
		);
	}
	const mapped = hostContext ? contextMap[hostContext] : undefined;
	if (mapped) return mapped;
	throw new Error(
		`Cannot determine build environment on ${host}: set ENV explicitly` +
			(hostContext ? ` (unmapped context "${hostContext}")` : ""),
	);
};

export const resolveHostEnvironment = (
	vars: EnvVars = process.env,
): HostEnvironment => {
	const host = detectHost(vars);

	if (host === "vercel") {
		const owner = vars.VERCEL_GIT_REPO_OWNER;
		const slug = vars.VERCEL_GIT_REPO_SLUG;
		const repositoryUrl =
			vars.VERCEL_GIT_PROVIDER === "github" && owner && slug
				? `https://github.com/${owner}/${slug}`
				: undefined;
		return {
			host,
			env: resolveEnv(host, vars, vars.VERCEL_ENV, VERCEL_ENV_TO_ENV),
			branch: requireVar(vars, "VERCEL_GIT_COMMIT_REF", host),
			commitRef: vars.VERCEL_GIT_COMMIT_SHA,
			prId: vars.VERCEL_GIT_PULL_REQUEST_ID || undefined,
			deployId: vars.VERCEL_DEPLOYMENT_ID,
			// Vercel has no equivalent of CACHED_COMMIT_REF, so the last deployed
			// commit must be supplied by whatever stores it.
			baseCommitRef: vars.PIPELINE_BASE_COMMIT_REF,
			repositoryUrl,
		};
	}

	if (host === "netlify") {
		return {
			host,
			env: resolveEnv(host, vars, vars.CONTEXT, NETLIFY_CONTEXT_TO_ENV),
			branch: requireVar(vars, "HEAD", host),
			commitRef: vars.COMMIT_REF,
			prId: vars.REVIEW_ID,
			deployId: vars.DEPLOY_ID,
			baseCommitRef: vars.CACHED_COMMIT_REF,
			repositoryUrl: vars.REPOSITORY_URL,
		};
	}

	return {
		host,
		env: resolveEnv(host, vars, undefined, {}),
		branch: requireVar(vars, "HEAD", host),
		commitRef: vars.COMMIT_REF,
		prId: vars.REVIEW_ID,
		baseCommitRef: vars.PIPELINE_BASE_COMMIT_REF ?? vars.CACHED_COMMIT_REF,
		repositoryUrl: vars.REPOSITORY_URL,
	};
};

const requireVar = (vars: EnvVars, name: string, host: BuildHost): string => {
	const value = vars[name];
	if (!value) {
		throw new Error(`Cannot determine branch on ${host}: ${name} is not set`);
	}
	return value;
};

/** Writes the resolved values under the Netlify variable names that the rest
 *  of the pipeline (updateConfig, next.config.mjs) reads. */
export const applyHostEnvironment = (
	hostEnv: HostEnvironment,
	vars: EnvVars = process.env,
) => {
	const assign = (name: string, value: string | undefined) => {
		if (value !== undefined) vars[name] = value;
	};
	assign("ENV", hostEnv.env);
	assign("HEAD", hostEnv.branch);
	assign("COMMIT_REF", hostEnv.commitRef);
	assign("REVIEW_ID", hostEnv.prId);
	assign("DEPLOY_ID", hostEnv.deployId);
	assign("CACHED_COMMIT_REF", hostEnv.baseCommitRef);
	assign("REPOSITORY_URL", hostEnv.repositoryUrl);
};
