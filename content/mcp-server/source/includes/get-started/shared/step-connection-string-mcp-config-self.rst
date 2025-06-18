.. step:: (Optional) Add your connection string.

   The MongoDB MCP server can connect to your MongoDB instance on your behalf. 
   However, if you do not want to expose your connection string to the 
   LLM's context, or if you want to persist the connection across sessions, add your 
   connection string to the configuration. Replace the placeholder 
   value with your actual connection string.

   .. list-table::
      :widths: 30 70
      :header-rows: 1

      * - Value
        - Description

      * - ``<connection-string>``
        - The connection string for your self-hosted MongoDB deployment.
          Ensure that the credentials in your connection string access only the 
          data and operations you're comfortable exposing to LLMs.

          To learn more, see :ref:`Find Your Connection String
          <find-connection-string>` and :ref:`Examples <connections-connection-examples>`.

   .. code-block:: json
      :emphasize-lines: 6-7

      "MongoDB": {
        "command": "npx",
        "args": [
          "-y",
          "mongodb-mcp-server",
          "--connectionString",
          "<connection-string>"
        ]
      }
