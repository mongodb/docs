.. step:: Build your MCP server configuration.
  
   To add MCP servers, add an MCP configuration to a configuration file. For
   all connection methods and detailed configuration steps, 
   see `MCP Servers <https://opencode.ai/docs/mcp-servers/>`__ in the
   OpenCode documentation.

   .. include:: /includes/get-started/shared/create-atlas-service-account.rst

   For this tutorial, you will add a MongoDB MCP Server entry to your OpenCode
   configuration file. The following configuration uses your Atlas service account
   credentials to enable Atlas-specific tools, including connection, access,
   and cluster management:

   a. Open the configuration file in a code or text editor.

   #. Add the following JSON configuration and replace ``<client-id>`` and
      ``<client-secret>`` with your Atlas service account credentials:

      .. include:: /includes/get-started/shared/atlas-service-account-credentials-table.rst

      .. literalinclude:: /includes/get-started/shared/example-configs/mcp-config-opencode-atlas.json
         :language: json
         :emphasize-lines: 14-15

