.. step:: Add the server to your configuration file.

   .. cta-banner::
     :url: https://cursor.com/en-US/install-mcp?name=MongoDB&config=eyJjb21tYW5kIjoibnB4IC15IG1vbmdvZGItbWNwLXNlcnZlciAtLXJlYWRPbmx5In0%3D
     :icon: Code

     Click this `shortcut <https://cursor.com/en-US/install-mcp?name=MongoDB&config=eyJjb21tYW5kIjoibnB4IC15IG1vbmdvZGItbWNwLXNlcnZlciAtLXJlYWRPbmx5In0%3D>`__
     to start configuring the MCP server directly in Cursor.

   .. include:: /includes/get-started/shared/create-atlas-service-account.rst

   Edit the configuration file for your AI client.
   For Cursor users, add the following configuration to your ``.cursor/mcp.json`` file in
   your project or home directory to set up the MongoDB MCP Server.
   For detailed configuration steps, see
   `Installing MCP servers <https://cursor.com/docs/mcp#installing-mcp-servers>`__
   in the Cursor documentation.
   
   The following configuration uses your Atlas service account credentials to enable
   Atlas-specific tools, including connection, access, and cluster management.
   Replace ``<client-id>`` and ``<client-secret>`` with your Atlas service account credentials:

   .. include:: /includes/get-started/shared/atlas-service-account-credentials-table.rst

   .. literalinclude:: /includes/get-started/shared/example-configs/common-mcp-config-atlas.json
      :language: json
      :emphasize-lines: 3-15

