.. step::  Write your MCP client configuration.

   Run the following command to create your configuration file:

   .. code-block:: json

      cat > mcp-client-config.json <<EOF
      {
        "mcp": {
          "mongodb-atlas-mcp-remote": {
            "type": "stdio",
            "command": ["npx", "-y", "mongodb-atlas-mcp-remote@latest"],
            "environment": {
              "MDB_MCP_API_CLIENT_ID": "$CLIENT_ID",
              "MDB_MCP_API_CLIENT_SECRET": "$SECRET"
            }
          }
        }
      }
      EOF

   Open ``mcp-client-config.json`` and paste its contents into your
   ``~/.fx/mcp.json`` file.
