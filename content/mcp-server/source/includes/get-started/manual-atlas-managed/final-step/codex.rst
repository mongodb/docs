.. step::  Write your MCP client configuration.

   Run the following command to create your configuration file:

   .. code-block:: toml

      cat > mcp-client-config.toml <<EOF
      [mcp_servers.mongodb-atlas-mcp-remote]
      command = "npx"
      args = ["-y", "mongodb-atlas-mcp-remote@latest"]

      [mcp_servers.mongodb-atlas-mcp-remote.env]
      MDB_MCP_API_CLIENT_ID = "$CLIENT_ID"
      MDB_MCP_API_CLIENT_SECRET = "$SECRET"
      EOF

   Copy the contents of ``mcp-client-config.toml`` and paste it at the
   end of your ``~/.codex/config.toml`` file.
