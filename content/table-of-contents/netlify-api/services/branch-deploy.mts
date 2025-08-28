import { NetlifyAPI } from "@netlify/api";
import { ENVIRONMENT_VARS } from "../configs.js";
import { manageNetlifyEnv } from "../helpers/mangage-netlify-envs.mjs";

export const triggerBranchDeploy = async ({
  siteId,
  branch,
  client
}:{
  siteId: string;
  branch: string;
  client: NetlifyAPI
}) => {

  let frontendVersion: { deleteEnvVarValue: () => Promise<void> }
  let useUnifiedToc: { deleteEnvVarValue: () => Promise<void> }
  let populateMetadata: { deleteEnvVarValue: () => Promise<void> }

  try {
    // Enable FRONTEND_VERSION for the said branch
    frontendVersion = await manageNetlifyEnv(client, branch, {
      account_id: "mongodb",
      key: ENVIRONMENT_VARS.FRONTEND_VERSION,
      siteId,
      body: {
        context: "branch",
        context_parameter: branch,
        value: "feat/unified-nav",
      },
    });

    

    // Enable GATSBY_USE_UNIFIED_TOC for the said branch
    useUnifiedToc = await manageNetlifyEnv(client, branch, {
      account_id: "mongodb",
      key: ENVIRONMENT_VARS.GATSBY_USE_UNIFIED_TOC,
      siteId,
      body: {
        context: "branch",
        context_parameter: branch,
        value: "true",
      },
    })

    // Enable POPULATE_METADATA_ENABLED_STAGING_ZW for the said branch
    populateMetadata = await manageNetlifyEnv(client, branch, {
      account_id: "mongodb",
      key: ENVIRONMENT_VARS
        .POPULATE_METADATA_ENABLED,
      siteId,
      body: {
        context: "branch",
        context_parameter: branch,
        value: "true",
      },
    })
    

    const createSiteBuildHook = await client.createSiteBuildHook({
      siteId,
      body: {
        title: `MONGODB_VSCODE_CUSTOM_BUILD_HOOK_${branch.toUpperCase()}`,
        branch
      }
    });

    console.log(
      `Created site build hook:
        - tile: ${createSiteBuildHook.title}
        - branch: ${createSiteBuildHook.branch}
        - createdAt: ${createSiteBuildHook.created_at}
      `
    )

    const { url , id } = createSiteBuildHook;

    if(url) {
      console.log(`Calling ${createSiteBuildHook.title} webhook to trigger a build on ${createSiteBuildHook.branch}`)
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })
    }

    // Checking to see if we have the build hook ID, use that ID to delete the site build hook
    // after it was called. Help keeping the hook configs clean.
    if(id) {
      await client.deleteSiteBuildHook({ siteId, id })
    }

    //TODO: DOP-6090: need to find the right time to call these methods to remove the env var for said branch
    // frontendVersion.deleteEnvVarValue();
    // useUnifiedToc.deleteEnvVarValue();
    // populateMetadata.deleteEnvVarValue();

  } catch (error) {
    console.error("error", error);
  }

}