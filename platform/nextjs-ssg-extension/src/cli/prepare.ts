import path from "node:path";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import type { ConfigEnvironmentVariables } from "../../../nextjs-extension/src/util/configEnvironment";
import { getDbConfig } from "../../../nextjs-extension/src/util/assertDbEnvVars";
import {
	applyHostEnvironment,
	resolveHostEnvironment,
} from "../../../nextjs-extension/src/util/hostEnvironment";
import { createLocalBuildUtils } from "../../../nextjs-extension/src/util/localBuildUtils";
import { getRepoPaths } from "../../../nextjs-extension/src/paths";
import { createAllContentData, prepare } from "../prepare";
import { APP_DIR } from "../constants";
import { writePipelineState } from "../pipelineState";

// Runs both from src/ (tsx) and bundled from dist/, so the depth varies.
const findMonorepoRoot = (startDir: string): string => {
	let dir = startDir;
	while (!existsSync(path.join(dir, "platform", "pnpm-workspace.yaml"))) {
		const parent = path.dirname(dir);
		if (parent === dir) {
			throw new Error(`No docs monorepo root found above ${startDir}`);
		}
		dir = parent;
	}
	return dir;
};

const main = async () => {
	process.env.DOCS_MONOREPO_ROOT ??= findMonorepoRoot(
		path.dirname(fileURLToPath(import.meta.url)),
	);

	if (!process.env.FORCE_REBUILD_PATHS && process.env.DOCS_PROJECT) {
		process.env.FORCE_REBUILD_PATHS = process.env.DOCS_PROJECT;
	}

	const hostEnv = resolveHostEnvironment();
	applyHostEnvironment(hostEnv);
	console.log("[prepare] host environment:", hostEnv);

	const { docsNextjsDir: appDir } = getRepoPaths(undefined, APP_DIR);
	const cacheDir =
		process.env.PIPELINE_CACHE_DIR ??
		path.join(appDir, ".next", "cache", "content-pipeline");

	const configEnvironment: ConfigEnvironmentVariables = {};
	const allContentData = createAllContentData();

	await prepare({
		configEnvironment,
		dbEnvVars: getDbConfig(),
		utils: createLocalBuildUtils({ cacheDir }),
		allContentData,
	});

	const statePath = await writePipelineState({
		hostEnv,
		configEnvironment,
		allContentData,
	});
	console.log(`[prepare] wrote pipeline state to ${statePath}`);
};

main().then(
	// Atlas clients opened during the Atlas fetch can keep the event loop alive.
	() => process.exit(0),
	(error) => {
		console.error("[prepare] failed:", error);
		process.exit(1);
	},
);
