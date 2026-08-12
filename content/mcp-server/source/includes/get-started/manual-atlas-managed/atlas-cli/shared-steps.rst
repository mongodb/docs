.. step:: Login to Atlas.

   In your terminal, run the following command:

   .. code-block:: bash

      atlas auth login -P mcp

   Select **UserAccount**. This returns a one-time verification code and
   directs you to an external browser window. Log in and verify your account
   using the one-time code, then come back to the terminal.
   
   Follow the prompts in terminal to finish configuring your profile.

.. step::  Set your organization or project ID environment variable.

   Run the following command in your terminal to set your environment 
   variables for an **organization-level** configuration, replacing ``<ORG_ID>``
   with your organization ID.

   .. code-block:: bash

      export ORG_ID="<ORG_ID>" # Set to use org-level config

   .. tip:: 
     
      If you want to use **project-level configuration** instead, you can set your
      project ID instead of your organization ID. Replace ``<GROUP_ID>`` with your 
      project ID and run:

      .. code-block:: bash

         export GROUP_ID="<GROUP_ID>" # Set to use project-level config instead of ORG_ID

.. step:: Set your IP.

   Run the following command, replacing ``<YOUR_IP_ADDRESS>`` with your IP address:

   .. code-block:: bash

      export MY_IP="<YOUR_IP_ADDRESS>"

.. step:: Create your MCP configuration.

   Run the following commands to create an **organization-level**
   configuration, adding roles and your IP address for access:

   .. code-block:: bash

      cat > /tmp/mcp-config.json <<EOF
      {
      "mcpConfigName": "my-config",
      "roles": ["ORG_OWNER"],
      "ipAccessList": [{"ipAddress": "$MY_IP"}]
      }
      EOF

      read -r MCP_CONFIG_ID CLIENT_ID <<< "$(
      atlas api remoteMcpConfigurations createOrgMcpConfig \
      --orgId "$ORG_ID" \
      --file /tmp/mcp-config.json \
      -P {+manual-atlas-managed-mcp-env+} \
      -o '{{.mcpConfigId}} {{.clientId}}'
      )"

      export MCP_CONFIG_ID
      export CLIENT_ID

   .. tip::

      If you want to use **project-level configuration** instead, run the
      following commands:

      .. code-block:: bash

         cat > /tmp/mcp-config.json <<EOF
         {
         "mcpConfigName": "my-config",
         "roles": ["GROUP_OWNER"],
         "ipAccessList": [{"ipAddress": "$MY_IP"}]
         }
         EOF

         read -r MCP_CONFIG_ID CLIENT_ID <<< "$(
         atlas api remoteMcpConfigurations createGroupMcpConfig \
         --groupId "$GROUP_ID" \
         --file /tmp/mcp-config.json \
         -P {+manual-atlas-managed-mcp-env+} \
         -o '{{.mcpConfigId}} {{.clientId}}'
         )"

         export MCP_CONFIG_ID
         export CLIENT_ID

.. step:: Generate your client secret.

   Run the following commands to create a secret for your created **organization-level**
   configuration. Set the expiration time for the secret you are creating in 
   ``secretExpiresAfterHours``.

   .. important::

      You can only retrieve the **secret** once. If you lose it, regenerate it
      by creating a new secret.

   .. code-block:: bash

      cat > /tmp/mcp-secret.json <<EOF
      {"secretExpiresAfterHours": 8760}
      EOF

      SECRET=$(
        atlas api remoteMcpConfigurations createOrgMcpSecret \
          --orgId "$ORG_ID" \
          --mcpConfigId "$MCP_CONFIG_ID" \
          --file /tmp/mcp-secret.json \
          -P {+manual-atlas-managed-mcp-env+} \
          -o '{{.secret}}'
      )

      export SECRET   

   

   .. tip::

      If you want to use **project-level configuration** instead, run the
      following commands:

      .. code-block:: bash

         cat > /tmp/mcp-secret.json <<EOF
         {"secretExpiresAfterHours": 8760}
         EOF

         SECRET=$(
         atlas api remoteMcpConfigurations createGroupMcpSecret \
            --groupId "$GROUP_ID" \
            --mcpConfigId "$MCP_CONFIG_ID" \
            --file /tmp/mcp-secret.json \
            -P {+manual-atlas-managed-mcp-env+} \
            -o '{{.secret}}'
         )   
      
         export SECRET
