.. step:: Add the server to your configuration file.

   .. include:: /includes/get-started/shared/create-atlas-service-account.rst

   Edit the configuration file for your AI client.
   For Gemini CLI users, add the following configuration to 
   your user configuration ``~/.gemini/mcp.json``
   or the project configuration ``.gemini/mcp.json`` file
   to set up the MongoDB MCP Server.

   .. note::

      The Gemini CLI uses the ``mcpServers`` configuration in your ``mcp.json`` 
      file to locate and connect to MCP servers. For all connection methods and detailed configuration steps, see
      `MCP Server Configuration <https://github.com/google-gemini/gemini-cli/blob/main/docs/tools/mcp-server.md>`__.

   The following configuration uses your Atlas service account credentials to enable
   Atlas-specific tools, including connection, access, and cluster management.
   Replace ``<client-id>`` and ``<client-secret>`` with your Atlas service account credentials:

   .. include:: /includes/get-started/shared/atlas-service-account-credentials-table.rst

   .. literalinclude:: /includes/get-started/shared/example-configs/common-mcp-config-atlas.json
      :language: json
      :emphasize-lines: 3-15

