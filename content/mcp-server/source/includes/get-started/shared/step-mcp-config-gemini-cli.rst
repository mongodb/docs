.. step:: Add the server to your configuration file.

   Edit the configuration file for your AI client.
   For Gemini CLI users, add the following configuration to 
   your user configuration ``~/.gemini/mcp.json``
   or the project configuration ``.gemini/mcp.json`` file
   to set up the MongoDB MCP server.

   .. note::

      The Gemini CLI uses the ``mcpServers`` configuration in your ``mcp.json`` 
      file to locate and connect to MCP servers. For all connection methods and detailed configuration steps, see
      `MCP Server Configuration <https://github.com/google-gemini/gemini-cli/blob/main/docs/tools/mcp-server.md>`__.
    
   .. literalinclude:: /includes/get-started/shared/common-mcp-config.json
      :language: json
      :emphasize-lines: 3-14

   .. include:: /includes/get-started/shared/connection-string-mcp-config.rst
