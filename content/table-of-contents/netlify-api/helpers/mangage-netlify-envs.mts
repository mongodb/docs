// Helper for managing Netlify ENVs
import type { NetlifyAPI } from "@netlify/api";

type ENV_OBJ = {
  account_id: string;
  key: string;
  siteId: string;
  body: {
    context?:
      | "all"
      | "dev"
      | "branch-deploy"
      | "deploy-preview"
      | "production"
      | "branch"
      | undefined;
    context_parameter?: string | undefined;
    value?: string | undefined;
  };
};

export const manageNetlifyEnv = async (
  client: NetlifyAPI,
  branch: string,
  envObject: ENV_OBJ
) => {
  
  const { key, values } = await client.setEnvVarValue({ ...envObject });
  console.log(`Added ${envObject.body.value} to ${envObject.body.context_parameter} in ${envObject.key} env var`);

  const envId = values?.find(value => value?.context_parameter === branch)?.id || '';

  return {
    deleteEnvVarValue: async () => {
    
      await client.deleteEnvVarValue({
        account_id: "mongodb",
        id: envId,
        key: key || "",
        siteId: envObject.siteId
      });
  
      console.log(`Deleted ${envObject.body.context_parameter} from ${envObject.key} env var`);
    }
  }
};
