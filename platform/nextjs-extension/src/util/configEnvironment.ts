import type { Environments, SnootyDBName } from "./databaseConnection/types";

export const envVarToBool = (envVar: boolean | string = "false"): boolean => {
	if (!envVar) {
		return false;
	}
	if (typeof envVar === "boolean") {
		return envVar;
	}
	return JSON.parse(envVar);
};

// The values updateConfig sets for the docs-nextjs build
export type ConfigEnvironmentVariables = Partial<{
	ENV: Environments;
	// Exposed to Next.js client/build; sanitized copy of HEAD
	NEXT_PUBLIC_GIT_BRANCH: string;
	SNOOTY_DB_NAME: SnootyDBName;
}>;
