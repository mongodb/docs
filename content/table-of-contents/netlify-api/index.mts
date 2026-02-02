import { NetlifyAPI } from "@netlify/api";
import { tableOfContentApiOptions } from "./helpers/argv.js";
import * as dotenv from "dotenv";
import { triggerBranchDeploy } from "./services/branch-deploy.mjs";
import { triggerAllSitesDeploys } from "./services/all-site-deploys.mjs";
import { PROD_PREPROD_BRANCH_NAMES } from "./configs.js";

dotenv.config();

const client = new NetlifyAPI(process.env.NETLIFY_ACCESS_TOKEN);
const siteId = "d08bd0f0-b557-41b8-b3a6-1d033e9bcb6f"; // The ID for MongoDB VSCode Site



(async () => {
  const { branch, allPredprod, allProd  } = await tableOfContentApiOptions;

  console.log(
    `
    Running this command with the following options:
      - Branch: ${branch}
      - Running all preprod sites: ${allPredprod}
      - Running all prod sites: ${allProd}
    `
  );

  // both all-prod and all-preprod can't be true, if so error out with a message
  if(allPredprod && allProd) { 
    console.warn(
      `Ending script before running, both all preprod and prod flags were set to true. Only one can be set to true per session.`
    )
    return; 
  }

  // if all-prod is true trigger the build all workflow for prod sites
  if(allPredprod) {
    console.log('Running a build all preprod deploy');
    await triggerAllSitesDeploys({ client, branchName: PROD_PREPROD_BRANCH_NAMES.PREPRD });

  } else if(allProd) {
    console.log('Running a build all prod deploy');
    await triggerAllSitesDeploys({ client, branchName: PROD_PREPROD_BRANCH_NAMES.MAIN });
    
  } else {
    console.log('Running a branch deploy');
    await triggerBranchDeploy({
      siteId,
      branch,
      client
    });
  }

  
})().catch((_error) => {
  console.error('');
  console.error('======================================');
  console.error('  ❌ DEPLOY FAILED');
  console.error('======================================');
  console.error('');
  console.error('See error details above. If this is an authentication');
  console.error('issue (401/403), the token may need to be regenerated.');
  console.error('');
  process.exit(1);
});
