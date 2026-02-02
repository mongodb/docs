import type { NetlifyAPI } from "@netlify/api";
import { PROD_PREPROD_BRANCH_NAMES } from "../configs.js";

export const triggerAllSitesDeploys = async ({
  client,
  branchName
}: {
  client: NetlifyAPI;
  branchName: PROD_PREPROD_BRANCH_NAMES
}) => {
  try {

    const HOOK_NAME = branchName === PROD_PREPROD_BRANCH_NAMES.MAIN ? 'PROD' : 'PREPRD';
    // Fetch the list of sites
    const sitesFromNetlify = await client.listSites({
      filter: "all",
    });

    const sites = sitesFromNetlify.reduce((sites: {siteId: string; name: string;}[], site) => {
      const allowedBranches = site.build_settings?.allowed_branches;
      // Only include sites that are either preprd or prod and have an id and name
      if((allowedBranches?.includes(branchName) || branchName ===   'main') && site.id && site.name) {
        sites.push({
          siteId: site.id,
          name: site.name,
        })
      }

      return sites;
    }, []);

    console.log(`The total sites that will build for ${branchName} is:`, sites.length);

    if(!sites.length) {
      // End script early if the site's array is empty
      return;
    }

    // Create hooks for each site in the list
    const hooks = await Promise.all(
      sites?.map((site) => {
        console.log(`creating a hook for ${site.name}`);
        if (site.siteId) {
          return client.createSiteBuildHook({
            siteId: site.siteId,
            body: {
              title: `DOP_CUSTOM_${HOOK_NAME}_BUILD_HOOK`,
              branch: branchName,
            },
          });
        }
      })
    );

    // Trigger a preprod build for each site via build hooks
    const triggeredBuildResults = await Promise.all(
      hooks.map(async (hook, index) => {
        const siteName = sites[index].name;
        if (hook?.url) {
          const { url, title, branch } = hook;
          console.log(`Build hook url ${url} for ${siteName}`);
          console.log(
            `Calling ${title} webhook to trigger a build on ${branch} for ${siteName}`
          );
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          });

          return `Status code: ${response.status} for triggering a deploy via webhook for ${siteName}`
        }
      })
    );

    console.log(triggeredBuildResults.join(',').replaceAll(',', '\n'));

    // Checking to see if we have the build hook ID, use that ID to delete the site build hook
    // after it was called. Help keeping the hook configs clean.
    await Promise.all(
      hooks.map((hook, index) => {
        if (hook?.id && sites[index].siteId) {
          const { id, title } = hook;
          console.log(`Removing ${title} webhook from ${sites[index].name}`);
          client.deleteSiteBuildHook({
            siteId: sites[index].siteId,
            id,
          });
        }
      })
    );
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
    console.error("Error triggering all site deploys:", error);
    throw error; // Re-throw to fail the GitHub Action
  }
};
