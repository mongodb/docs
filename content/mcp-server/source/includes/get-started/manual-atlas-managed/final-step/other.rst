.. step::  Write your MCP client configuration.

   Run the following command to create a generic configuration file
   from the values you obtained in the previous steps:

   .. code-block:: bash

      cat > mcp-client-config.json <<EOF
      {
        "mcpServers": {
          "mongodb-atlas-mcp-remote": {
            "type": "stdio",
            "command": "npx",
            "args": ["-y", "mongodb-atlas-mcp-remote@latest"],
            "env": {
              "MDB_MCP_API_CLIENT_ID": "$CLIENT_ID",
              "MDB_MCP_API_CLIENT_SECRET": "$SECRET",
              "MDB_MCP_API_BASE_URL": "https://mcp.mongodb.com"
            }
          }
        }
      }
      EOF

      echo "Done. Open mcp-client-config.json and paste its contents into your MCP client's settings."

   .. include:: /includes/get-started/shared/adapt-mcp-config.rst
