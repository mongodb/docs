.. step:: Add the server to your configuration file.

   .. cta-banner::
     :url: https://insiders.vscode.dev/redirect/mcp/install?name=mongodb&inputs=%5B%7B%22id%22%3A%22connection_string%22%2C%22type%22%3A%22promptString%22%2C%22description%22%3A%22MongoDB%20connection%20string%22%7D%5D&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22mongodb-mcp-server%22%2C%22--readOnly%22%5D%2C%22env%22%3A%7B%22MDB_MCP_CONNECTION_STRING%22%3A%22%24%7Binput%3Aconnection_string%7D%22%7D%7D
     :icon: Code

     Click this `shortcut <https://insiders.vscode.dev/redirect/mcp/install?name=mongodb&inputs=%5B%7B%22id%22%3A%22connection_string%22%2C%22type%22%3A%22promptString%22%2C%22description%22%3A%22MongoDB%20connection%20string%22%7D%5D&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22mongodb-mcp-server%22%2C%22--readOnly%22%5D%2C%22env%22%3A%7B%22MDB_MCP_CONNECTION_STRING%22%3A%22%24%7Binput%3Aconnection_string%7D%22%7D%7D>`__
     to open VS code and start configuring the MCP server directly in your IDE.
     
   Edit the configuration file for your AI client.
   For VS Code Github Copilot users, add the following configuration 
   to your ``mcp.json`` file to set up the MongoDB MCP server
   across all workspaces. For detailed configuration steps, including
   how to configure servers for separate workspaces, see 
   `MCP servers in VS Code <https://code.visualstudio.com/docs/copilot/chat/mcp-servers#_add-an-mcp-server>`__.

   .. literalinclude:: /includes/get-started/shared/mcp-config-copilot.json
      :language: json
      :emphasize-lines: 4-15

   .. include:: /includes/get-started/shared/connection-string-mcp-config.rst
