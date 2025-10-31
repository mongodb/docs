.. step:: Add the MongoDB MCP server using the Claude Code CLI.

   Now that you have completed your MCP server configuration, 
   run the following command in your terminal,
   replacing ``<json>`` with your MongoDB MCP server configuration:

   .. code-block:: bash

      claude mcp add-json mongodb <json>

   Run the following command to verify that the MongoDB MCP server was 
   successfully added:

   .. code-block:: bash

      claude mcp get mongodb
