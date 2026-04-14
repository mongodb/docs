.. step:: Specify your MCP server configuration in Augment.

   Augment Code has multiple ways to configure MCP servers.
   The quickest way to add the MongoDB MCP Server is to use 
   `Easy MCP <https://docs.augmentcode.com/setup-augment/mcp#easy-mcp%3A-one-click-integrations>`__.
   For all connection methods and detailed configuration steps, see
   `MCP Configuration <https://docs.augmentcode.com/setup-augment/mcp>`__.

   .. literalinclude:: /includes/get-started/shared/create-atlas-service-account.rst
   
   This tutorial uses the JSON configuration method to add 
   a custom configuration. The following configuration uses your Atlas service account
   credentials to enable Atlas-specific tools, including connection, 
   access, and cluster management:
      
   a. Click the gear icon in the Augment panel, then click :guilabel:`Settings`.
   #. In the MCP section, click :guilabel:`Import from JSON`.
   #. Paste the following configuration and replace ``<client-id>`` and
      ``<client-secret>`` with your Atlas service account credentials:

      .. literalinclude:: /includes/get-started/shared/atlas-service-account-credentials-table.rst

      .. literalinclude:: /includes/get-started/shared/example-configs/common-mcp-config-atlas.json
         :language: json
         :emphasize-lines: 3-15