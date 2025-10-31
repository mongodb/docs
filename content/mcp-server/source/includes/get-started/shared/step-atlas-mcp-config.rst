.. step:: (Optional) Enable Atlas tools.

   To enable Atlas-specific tools, including connection, 
   access, and cluster management, add 
   your Atlas service account credentials to your 
   MCP server configuration:

   a. If you haven't already, create an Atlas service account.

      Service accounts enable programmatic access to your Atlas organization.
      These credentials are different than your Atlas API key.
      To learn how to create a new service account and get 
      the credentials, see :atlas:`Grant programmatic access to an organization 
      </atlas/configure-api-access/#grant-programmatic-access-to-an-organization>`.

   #. Add the credentials to your MCP server configuration.

      Add your Atlas API client ID and secret as environment variables in the
      ``"env"`` section of your MCP server configuration. Replace the
      placeholder values with your specific Atlas service account
      credentials:

      .. list-table::
         :widths: 30 70
         :header-rows: 1

         * - Value
           - Description

         * - ``<client-id>``
           - Atlas API client ID for authentication.

         * - ``<client-secret>``
           - Atlas API client secret for authentication.

      .. code-block:: json
          :emphasize-lines: 9-10

          ...
          "args": [
            "-y",
            "mongodb-mcp-server@latest",
            "--readOnly"
          ],
          "env": {
            "MDB_MCP_CONNECTION_STRING": "<connection-string>",
            "MDB_MCP_API_CLIENT_ID": "<client-id>",
            "MDB_MCP_API_CLIENT_SECRET": "<client-secret>"
          }
          ...
