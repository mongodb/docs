.. step::  Write your MCP client configuration.

   Run the following command to create your configuration file:

   .. code-block:: json

      cat > mcp-client-config.json <<EOF
      {
        "mcpServers": {
           "mongodb-atlas-mcp-remote": {
             "type": "stdio",
             "command": "npx",
             "args": ["-y", "mongodb-atlas-mcp-remote@latest"],
             "env": {
               "MDB_MCP_API_CLIENT_ID": "$CLIENT_ID",
               "MDB_MCP_API_CLIENT_SECRET": "$SECRET"
             }
           }
         }
      }
      EOF

   In Devin, click **Add a Custom MCP**. Click **Import JSON**, then paste the
   contents of ``mcp-client-config.json``.
