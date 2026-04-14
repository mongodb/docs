.. step:: Add the MongoDB MCP Server using the Claude Code CLI.

   Now that you have completed your MCP server configuration, 
   run the following command in your terminal,
   replacing ``<json>`` with your MongoDB MCP Server configuration:

   .. code-block:: bash

      claude mcp add-json mongodb <json>

   Run the following command to verify that the MongoDB MCP Server was 
   successfully added:

   .. code-block:: bash

      claude mcp get mongodb
