import type { NetlifyAPI } from "@netlify/api";

export const triggerBranchDeploy = async ({
  siteId,
  branch,
  client
}:{
  siteId: string;
  branch: string;
  client: NetlifyAPI
}) => {

  try {

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

  } catch (error) {
    console.error("error", error);
  }

}