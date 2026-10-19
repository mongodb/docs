import path from "node:path";
import fs from "node:fs/promises";
import type { ConfigEnvironmentVariables } from "./util/configEnvironment";
import type { HostEnvironment } from "./util/hostEnvironment";
import type { AllContentData } from "./contentMetadata/processContentMetadata";
import { getRepoPaths } from "./paths";
import { APP_DIR } from "./constants";

/** Written by `pipeline:prepare` for publish steps that run after `next build`. */
export type PipelineState = {
	hostEnv: HostEnvironment;
	configEnvironment: ConfigEnvironmentVariables;
	allContentData: AllContentData;
};

export const getPipelineStatePath = () =>
	path.join(
		process.env.PIPELINE_OUTPUT_DIR ??
			path.join(getRepoPaths(undefined, APP_DIR).docsNextjsDir, ".pipeline"),
		"state.json",
	);

export const writePipelineState = async (state: PipelineState) => {
	const statePath = getPipelineStatePath();
	await fs.mkdir(path.dirname(statePath), { recursive: true });
	await fs.writeFile(statePath, JSON.stringify(state, null, 2));
	return statePath;
};
