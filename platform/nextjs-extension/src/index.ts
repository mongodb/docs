// Documentation: https://sdk.netlify.com/docs/
import { Extension, envVarToBool } from "./util/extension";
import { updateConfig } from "./contentMetadata/config";
import { buildToc } from "./buildTOC/index";

const extension = new Extension({
  isEnabled: envVarToBool(process.env.NEXTJS_EXTENSION_ENABLED),
});

extension.addBuildEventHandler(
	"onPreBuild",
	async ({ netlifyConfig, dbEnvVars, utils }) => {
		// add env vars to config environment
		await updateConfig({
			configEnvironment: netlifyConfig.build.environment,
			dbEnvVars,
		});

		// build toc
		// TODO: cache this? it shouldn't change often, when should it be invalidated?
		await buildToc({ utils });
	},
);

export { extension };
