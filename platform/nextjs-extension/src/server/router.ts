import { TRPCError } from '@trpc/server';
import { procedure, router } from './trpc';
import { TeamConfigSchema } from '../schema/team-config';

const BUILD_EVENT_HANDLER_ENABLED_ENV_VAR = 'NEXTJS_EXTENSION_ENABLED';

export const appRouter = router({
  teamSettings: {
    query: procedure.query(async ({ ctx: { teamId, client } }) => {
      if (!teamId) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'teamId is required',
        });
      }
      const teamConfig = await client.getTeamConfiguration(teamId);
      if (!teamConfig) {
        return;
      }
      const result = TeamConfigSchema.safeParse(teamConfig.config);
      if (!result.success) {
        console.warn(
          'Failed to parse team settings',
          JSON.stringify(result.error, null, 2),
        );
      }
      return result.data;
    }),

    mutate: procedure
      .input(TeamConfigSchema)
      .mutation(async ({ ctx: { teamId, client }, input }) => {
        if (!teamId) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'teamId is required',
          });
        }

        try {
          const existingConfig = await client.getTeamConfiguration(teamId);
          if (!existingConfig) {
            await client.createTeamConfiguration(teamId, input);
          } else {
            await client.updateTeamConfiguration(teamId, {
              ...(existingConfig?.config || {}),
              ...input,
            });
          }
        } catch (e) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to save team configuration',
            cause: e,
          });
        }
      }),
  },
  buildEventHandler: {
    status: procedure.query(async ({ ctx: { teamId, siteId, client } }) => {
      if (!teamId || !siteId) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Both teamId and siteId are required',
        });
      }
      const envVars = await client.getEnvironmentVariables({
        accountId: teamId,
        siteId,
      });

      const enabledVar = envVars
        .find((val) => val.key === BUILD_EVENT_HANDLER_ENABLED_ENV_VAR)
        ?.values.find((val) => val.context === 'all');

      return {
        enabled: !!enabledVar,
      };
    }),
    enable: procedure.mutation(async ({ ctx: { teamId, siteId, client } }) => {
      if (!teamId || !siteId) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Both teamId and siteId are required',
        });
      }

      try {
        await client.createOrUpdateVariable({
          accountId: teamId,
          siteId,
          key: BUILD_EVENT_HANDLER_ENABLED_ENV_VAR,
          value: 'true',
        });

        console.log(
          `Build event handler enabled for team ${teamId}, site ${siteId}`,
        );

        return {
          success: true,
          message: 'Build event handler enabled successfully',
        };
      } catch (error) {
        console.error(
          `Failed to enable build event handler: ${error instanceof Error ? error.message : 'Unknown error'
          }`,
        );
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to enable build event handler',
          cause: error,
        });
      }
    }),
    disable: procedure.mutation(async ({ ctx: { teamId, siteId, client } }) => {
      if (!teamId || !siteId) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'teamId and siteId are required',
        });
      }

      try {
        await client.deleteEnvironmentVariable({
          accountId: teamId,
          siteId,
          key: BUILD_EVENT_HANDLER_ENABLED_ENV_VAR,
        });
        console.log(
          `Build event handler disabled for team ${teamId}, site ${siteId}`,
        );
        return {
          success: true,
          message: 'Build event handler disabled successfully',
        };
      } catch (error) {
        console.error(
          `Failed to disable build event handler for site ${siteId} and team ${teamId}: ${error instanceof Error ? error.message : 'Unknown error'
          }`,
        );
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to disable build event handler',
          cause: error,
        });
      }
    }),
  },
});

export type AppRouter = typeof appRouter;
