.. step:: Build your MCP server configuration.
  
   To add MCP servers, add an MCP configuration to a configuration file. For
   all connection methods and detailed configuration steps, see 
   `MCP Servers <https://opencode.ai/docs/mcp-servers/>`__ in the
   OpenCode documentation.

   For this tutorial, you will add a MongoDB MCP Server entry to your OpenCode
   configuration file.

   a. Open the configuration file in a code or text editor. 
   
   #. Add the following JSON configuration:

      .. literalinclude:: /includes/get-started/shared/example-configs/mcp-config-opencode-self.json
         :language: json
         :emphasize-lines: 14

   #. Replace ``<connection-string>`` with your MongoDB connection string.

   .. include:: /includes/get-started/shared/connection-string-mcp-config-opencode.rst

