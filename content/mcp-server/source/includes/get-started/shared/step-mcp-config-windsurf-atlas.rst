.. step:: Add the server to your configuration file.

   .. include:: /includes/get-started/shared/create-atlas-service-account.rst

   Edit the configuration file for your AI client.
   For Windsurf users, add the following configuration to your 
   ``~/.codeium/windsurf/mcp_config.json`` file to set up the MongoDB MCP Server.
   For detailed configuration steps, see
   `Windsurf documentation <https://docs.windsurf.com/windsurf/cascade/mcp>`__.
   
   The following configuration uses your Atlas service account credentials to enable
   Atlas-specific tools, including connection, access, and cluster management.
   Replace ``<client-id>`` and ``<client-secret>`` with your Atlas service account credentials:

   .. include:: /includes/get-started/shared/atlas-service-account-credentials-table.rst

   .. literalinclude:: /includes/get-started/shared/example-configs/common-mcp-config-atlas.json
      :language: json
      :emphasize-lines: 3-15

