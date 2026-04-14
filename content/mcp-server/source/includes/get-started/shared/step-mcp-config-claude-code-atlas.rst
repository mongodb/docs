.. step:: Build your MCP server configuration.

   To add MCP servers, use either Claude Code CLI options or import
   existing MCP servers from Claude Desktop. For all connection methods and
   detailed configuration steps, see
   `Installing MCP servers <https://docs.claude.com/en/docs/claude-code/mcp>`__.

   .. include:: /includes/get-started/shared/create-atlas-service-account.rst

   For this tutorial, you will create a custom JSON configuration,
   and then pass this configuration to the ``claude mcp add-json`` command.
   The following configuration uses your Atlas service account credentials to enable
   Atlas-specific tools, including connection, access, and cluster management:

   a. Copy the following JSON configuration into a code or text editor and
      replace ``<client-id>`` and ``<client-secret>`` with your Atlas service
      account credentials:

      .. include:: /includes/get-started/shared/atlas-service-account-credentials-table.rst

      .. literalinclude:: /includes/get-started/shared/example-configs/common-mcp-config-atlas.json
         :language: json
         :emphasize-lines: 3-15

