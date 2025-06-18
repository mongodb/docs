.. step:: (Optional) Enable read-only mode.

   To enable read-only mode, which restricts the server to 
   allow only read and metadata operations, add the ``--readOnly`` 
   flag as an argument in your MCP server configuration:

   .. code-block:: json
      :emphasize-lines: 8

      "MongoDB": {
        "command": "npx",
        "args": [
          "-y",
          "mongodb-mcp-server",
          "--connectionString",
          "<connection-string>",
          "--readOnly"
        ]
      }