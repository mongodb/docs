.. step:: Specify your MCP server configuration in Augment.

   Augment Code offers multiple ways to configure MCP servers.
   The quickest way to add the MongoDB MCP server is to use 
   `Easy MCP <https://docs.augmentcode.com/setup-augment/mcp#easy-mcp%3A-one-click-integrations>`__.
   For all connection methods and detailed configuration steps, see
   `MCP Configuration <https://docs.augmentcode.com/setup-augment/mcp>`__.
   
   For this tutorial, we will use the JSON configuration method to add 
   a custom configuration:

   a. Click the gear icon in the Augment panel, then click :guilabel:`Settings`.
   #. In the MCP section, click :guilabel:`Import from JSON`.
   #. Paste the following configuration, replacing ``<connection-string>`` 
      with your MongoDB connection string.

      .. literalinclude:: /includes/get-started/shared/common-mcp-config.json
         :language: json
         :emphasize-lines: 3-14
   
      .. include:: /includes/get-started/shared/connection-string-mcp-config.rst