import type { NetlifyPluginOptions } from "@netlify/build";
// Documentation: https://sdk.netlify.com
import {
	type BuildHookOptions,
	type BuildHookType,
	NetlifyExtension,
} from "@netlify/sdk";
import type z from "zod";
import { getDbConfig, type StaticEnvVars } from "./assertDbEnvVars";

export {
	envVarToBool,
	type ConfigEnvironmentVariables,
} from "./configEnvironment";

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
			z.infer<BuildContext>,
			z.infer<BuildConfigSchema>
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
				if: (buildConfig: z.infer<BuildConfigSchema>) => {
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
