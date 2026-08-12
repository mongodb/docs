.. step:: Create your public API key.

   To create your public key, follow the steps in 
   :ref:`Get Started with the Atlas Administration API 
   <atlas-admin-api-access>`.

.. step:: Set your API key environment variables.

   Run the following commands in your terminal to set your Atlas API environment 
   variables, replacing:

   - ``<PUBLIC_API_KEY>`` with your public API key
   - ``<PRIVATE_API_KEY>`` with your private API key

   .. code-block:: bash

      export PUBLIC_API_KEY="<PUBLIC_API_KEY>"
      export PRIVATE_API_KEY="<PRIVATE_API_KEY>"

.. step:: Set your organization or project ID environment variable.

   Run the following command, replacing ``<ORG_ID>`` with your organization ID
   for an **organization-level** configuration:
   
   .. code-block:: bash
      
      export ORG_ID="<ORG_ID>" # Set to use org-level config instead of GROUP_ID


   .. tip:: 

      If you want to use **project-level configuration** instead, you can set your
      group ID instead of your organization ID. Replace ``<GROUP_ID>`` with your 
      group ID and run:
     
      .. code-block:: bash

         export GROUP_ID="<GROUP_ID>" # Set to use project-level config instead of ORG_ID

.. step:: Set your IP.

   Run the following command replacing ``<YOUR_IP_ADDRESS>`` with your IP address:

   .. code-block:: bash

      export MY_IP="<YOUR_IP_ADDRESS>"


.. step:: Create your MCP configuration.
   
   Run the following and extract both ``mcpConfigId`` and ``clientId``
   from the response for an **organization-level** configuration:

   .. code-block:: bash

      curl -s --digest -u "$PUBLIC_API_KEY:$PRIVATE_API_KEY" \
      -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/vnd.atlas.2025-03-12+json" \
      -d "$(jq -n --arg ip "$MY_IP" '{
            mcpConfigName: "my-config",
            roles: ["ORG_OWNER"],
            ipAccessList: [
               {ipAddress: $ip},
               {cidrBlock: "10.0.0.0/24"}
            ]
      }')" \
      "https://{+manual-atlas-managed-mongodb-env+}.mongodb.com/api/atlas/v2/orgs/$ORG_ID/mcpConfigs"

   .. tip:: 

      If you want to use **project-level configuration** instead, run:

      .. code-block:: bash

         curl -s --digest -u "$PUBLIC_API_KEY:$PRIVATE_API_KEY" \
         -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/vnd.atlas.2025-03-12+json" \
         -d "$(jq -n --arg ip "$MY_IP" '{
               mcpConfigName: "my-config",
               roles: ["GROUP_OWNER"],
               ipAccessList: [
                  {ipAddress: $ip},
                  {cidrBlock: "10.0.0.0/24"}
               ]
         }')" \
         "https://{+manual-atlas-managed-mongodb-env+}.mongodb.com/api/atlas/v2/groups/$GROUP_ID/mcpConfigs"

   To learn more about user roles, see:

   - :ref:`Organization Roles <organization-roles>`
   - :ref:`Project Roles <project-roles>`

   For details on the ``mcpConfigs`` API endpoint, see `Remote MCP Configurations
   <https://www.mongodb.com/docs/api/doc/atlas-admin-api-v2/group/endpoint-remote-mcp-configurations/>`_.

.. step:: Set your Client ID and MCP Configuration ID environment variables.

   Run the following command, replacing: 

   - ``<CLIENT_ID>`` with the ``clientId`` you extracted in the previous step
   - ``<MCP_CONFIG_ID>`` with the ``mcpConfigId`` you extracted in the previous step

   .. code-block:: bash

      export CLIENT_ID="<CLIENT_ID>"
      export MCP_CONFIG_ID="<MCP_CONFIG_ID>"

.. step:: Generate your MCP client secret.

   Run the following command and extract the ``secret`` from the response for
   an **organization-level** configuration:

   .. important::

      You can only retrieve the **secret** once. If you lose it, regenerate it
      by creating a new secret.

   .. code-block:: bash

      curl -s --digest -u "$PUBLIC_API_KEY:$PRIVATE_API_KEY" \
      -X POST \
      -H 'Content-Type: application/vnd.atlas.2025-03-12+json' \
      -H 'Accept: application/vnd.atlas.2025-03-12+json' \
      -d '{"secretExpiresAfterHours": 8760}' \
      "https://{+manual-atlas-managed-mongodb-env+}.mongodb.com/api/atlas/v2/orgs/$ORG_ID/mcpConfigs/$MCP_CONFIG_ID/secrets"

   .. tip:: 

      If you want to use **project-level configuration** instead, run:
   
      .. code-block:: bash

         curl -s --digest -u "$PUBLIC_API_KEY:$PRIVATE_API_KEY" \
         -X POST \
         -H 'Content-Type: application/vnd.atlas.2025-03-12+json' \
         -H 'Accept: application/vnd.atlas.2025-03-12+json' \
         -d '{"secretExpiresAfterHours": 8760}' \
         "https://{+manual-atlas-managed-mongodb-env+}.mongodb.com/api/atlas/v2/groups/$GROUP_ID/mcpConfigs/$MCP_CONFIG_ID/secrets"

.. step:: Set your MCP client secret.

   Run the following command, replacing ``<SECRET>`` with the value of 
   ``secret`` you extracted in the previous step:

   .. code-block:: bash

      export SECRET="<SECRET>"
