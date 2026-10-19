import {
	Extension,
	envVarToBool,
	type ConfigEnvironmentVariables,
} from "./util/extension";
import { handleSearchManifests } from "./searchManifests/index";
import { handleOfflineDownloads } from "./offline-docs/index";
import { createAllContentData, prepare } from "./prepare";
import { ENVS_TO_RUN } from "./constants";
import { handleLlmsTxt, handleRootLlmsTxt } from "./llms-txt/index";
import { getFileChanges } from "./github/processFileChanges";
import { logDiskMetrics } from "./util/diskMetrics";

const extension = new Extension({
  isEnabled: envVarToBool(process.env.NEXTJS_SSG_EXTENSION_ENABLED),
});

const allContentData = createAllContentData();

extension.addBuildEventHandler(
	"onPreBuild",
	async ({ netlifyConfig, dbEnvVars, utils }) => {
		await prepare({
			configEnvironment: netlifyConfig.build.environment,
			dbEnvVars,
			utils,
			allContentData,
		});
	},
);

extension.addBuildEventHandler(
	"onSuccess",
	async ({ netlifyConfig, utils, dbEnvVars }) => {
		const configEnvironment = netlifyConfig.build
			.environment as ConfigEnvironmentVariables;

		await logDiskMetrics(
			"onSuccess:start",
			"deploy succeeded; starting post-build publish steps",
		);

		const gitChangedFiles = utils.git.modifiedFiles;

		if (ENVS_TO_RUN.includes(configEnvironment.ENV ?? "")) {
			console.log(
				`Generating search manifest for version ${JSON.stringify(
					allContentData.pathsToBuild,
				)} (from nextjs SSG Netlify extension)`,
			);

			// A failed search upload must not skip llms.txt or offline docs.
			try {
				await handleSearchManifests({
					allContentData,
					run: utils.run,
					dbEnvVars,
					configEnvironment,
				});
			} catch (error) {
				console.error(
					"[search-manifest] Failed to generate search manifests:",
					error,
				);
			}

			await logDiskMetrics(
				"onSuccess:after-search-manifest",
				"search manifests generated",
			);

			// A stale llms.txt is never a reason to fail a deploy: the
			// weekly root llms.txt pass and a manual `pnpm publish-project`
			// both recover from a skipped publish.
			try {
				await handleLlmsTxt(utils.run, configEnvironment);
				// Netlify's git.modifiedFiles diffs against the last cached
				// deploy commit and is often empty on landing builds, so read
				// the merged commit directly.
				const headCommitFiles = await getFileChanges({
					run: utils.run,
					git: utils.git,
				});
				await handleRootLlmsTxt(utils.run, configEnvironment, headCommitFiles);
			} catch (error) {
				console.error("[llms-txt] Failed to publish llms.txt:", error);
			}

			await logDiskMetrics("onSuccess:after-llms-txt", "llms.txt published");

			// this should only run on prod build
			console.log("Generating offline docs ...");
			await handleOfflineDownloads(
				allContentData,
				gitChangedFiles,
				utils,
				dbEnvVars,
				configEnvironment,
			);

			await logDiskMetrics(
				"onSuccess:end",
				"all post-build steps complete",
			);
		} else {
			console.log(
				"Skipping search manifest, offline docs, and llms.txt generation for env ",
				configEnvironment.ENV,
			);
			return;
		}
	},
);

export { extension };
