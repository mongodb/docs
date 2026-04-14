.. step:: (Optional) Specify a cluster connection string.

   .. include:: /includes/get-started/shared/connection-string-mcp-config.rst

   .. code-block:: json
      :emphasize-lines: 10

      ...
      "args": [
        "-y",
        "mongodb-mcp-server@latest",
        "--readOnly"
      ],
      "env": {
        "MDB_MCP_API_CLIENT_ID": "<client-id>",
        "MDB_MCP_API_CLIENT_SECRET": "<client-secret>",
        "MDB_MCP_CONNECTION_STRING": "<connection-string>"
      }
      ...