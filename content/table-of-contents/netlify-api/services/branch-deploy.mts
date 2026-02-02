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
    // Check for specific Netlify API errors
    if (error instanceof Error && 'status' in error) {
      const status = (error as { status: number }).status;
      if (status === 401 || status === 403) {
        console.error('');
        console.error('⚠️  Possible authentication issue detected.');
        console.error('   This may indicate the NETLIFY_ACCESS_TOKEN has expired or is invalid.');
        console.error('');
        console.error('   To fix, check if the token needs to be regenerated:');
        console.error('   1. Generate a new token: https://app.netlify.com/user/applications');
        console.error('   2. Update the secret: https://github.com/10gen/docs-mongodb-internal/settings/secrets/actions');
        console.error('');
      }
    }
    console.error("Error triggering branch deploy:", error);
    throw error; // Re-throw to fail the GitHub Action
  }

}