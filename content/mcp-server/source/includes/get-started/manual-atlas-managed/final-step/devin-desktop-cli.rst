.. step:: Add the stdio bridge to Devin.

   Run:

   .. code-block:: none

      devin mcp add mongodb-atlas -- npx -y mongodb-atlas-mcp-remote@latest

.. step::  Write your MCP client configuration.

   Run the following command to create your configuration file:

   .. code-block:: json

      cat > .devin/mcp-client-config.json <<EOF
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
