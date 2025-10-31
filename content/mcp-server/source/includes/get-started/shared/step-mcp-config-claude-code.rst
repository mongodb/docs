.. step:: Build your MCP server configuration.
  
   You can quickly add MCP servers 
   by using Claude Code CLI options or by importing existing MCP servers from Claude Desktop.
   For all connection methods and detailed configuration steps, see
   `Installing MCP servers <https://docs.claude.com/en/docs/claude-code/mcp>`__.

   For this tutorial, you will create a custom JSON configuration,
   and then pass this configuration to the ``claude mcp add-json`` command.

   a. Copy the following JSON configuration into a code or text editor:

      .. literalinclude:: /includes/get-started/shared/common-mcp-config.json
         :language: json
         :emphasize-lines: 3-14

   #. Replace ``<connection-string>`` with your MongoDB connection string.

   .. include:: /includes/get-started/shared/connection-string-mcp-config.rst

