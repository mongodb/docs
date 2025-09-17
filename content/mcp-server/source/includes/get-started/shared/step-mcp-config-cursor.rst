.. step:: Add the server to your configuration file.

   .. cta-banner::
     :url: https://www.cursor.com/install-mcp?name=MongoDB&config=eyJjb21tYW5kIjoibnB4IC15IG1vbmdvZGItbWNwLXNlcnZlciJ9
     :icon: Code

     Click this `shortcut <https://www.cursor.com/install-mcp?name=MongoDB&config=eyJjb21tYW5kIjoibnB4IC15IG1vbmdvZGItbWNwLXNlcnZlciJ9>`__
     to start configuring the MCP server directly in Cursor.
     
   Edit the configuration file for your AI client.
   For Cursor users, add the following configuration to your ``.cursor/mcp.json`` file in
   your project or home directory to set up the MongoDB MCP server.
   For detailed configuration steps, see
   `Cursor documentation <https://docs.cursor.com/context/model-context-protocol#installing-mcp-servers>`__.

   .. literalinclude:: /includes/get-started/shared/common-mcp-config.json
      :language: json
      :emphasize-lines: 3-14
  
   .. include:: /includes/get-started/shared/connection-string-mcp-config.rst
