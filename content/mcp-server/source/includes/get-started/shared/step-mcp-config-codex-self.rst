.. step:: Build your MCP server configuration.
  
   To add MCP servers, use either Codex CLI options or add an MCP
   configuration to a ``.codex/config.toml`` file. For all connection
   methods and detailed configuration steps, see
   `Model Context Protocol <https://developers.openai.com/codex/mcp>`__ in the
   OpenAI Codex documentation.

   For this tutorial, you will add a MongoDB MCP Server entry to the
   ``~/.codex/config.toml`` file. You can also limit the MCP server to a
   specific project by adding the configuration to a project-specific
   ``.codex/config.toml`` file.

   a. Open the ``~/.codex/config.toml`` file in a code or text editor. 
   
   #. Add the following TOML configuration:

      .. literalinclude:: /includes/get-started/shared/example-configs/mcp-config-codex-self.toml
         :language: toml
         :emphasize-lines: 2-3, 6

   #. Replace ``<connection-string>`` with your MongoDB connection string.

   .. include:: /includes/get-started/shared/connection-string-mcp-config-codex.rst

