.. step:: Copy the MCP client configuration.

   In the :guilabel:`Auth helper` card, select your AI client from the
   :guilabel:`Provider` dropdown, then click the copy icon on the code
   block.

   If the :guilabel:`Provider` dropdown doesn't list your AI client,
   skip this step and start from the generic configuration in the next
   step instead.

.. step:: Write your MCP client configuration.

   Open your AI client's MCP configuration file in your project or home
   directory, paste the block that you copied in the previous step, and
   save the file.

   If you didn't copy a block in the previous step, start from the
   following generic configuration. Replace ``<CLIENT-ID>`` and
   ``<CLIENT-SECRET>`` with the credentials that you copied when you
   created the configuration:

   .. code-block:: json

      {
        "mcpServers": {
          "mongodb-atlas-mcp-remote": {
            "type": "stdio",
            "command": "npx",
            "args": ["-y", "mongodb-atlas-mcp-remote@latest"],
            "env": {
              "MDB_MCP_API_CLIENT_ID": "<CLIENT-ID>",
              "MDB_MCP_API_CLIENT_SECRET": "<CLIENT-SECRET>"
            }
          }
        }
      }

   .. include:: /includes/get-started/shared/adapt-mcp-config.rst

.. include:: /includes/get-started/manual-atlas-managed/atlas-ui/finish-setup.rst
