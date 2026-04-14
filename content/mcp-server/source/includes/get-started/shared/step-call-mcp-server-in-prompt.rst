.. step:: (Optional) Call the MCP server in your prompt.

   Any enabled MCP server is available for the OpenCode LLM to use. However,
   to specify a server you would like the OpenCode LLM to use, explicitly call
   an MCP server in your prompt using the server name specified in the 
   MCP server configuration. This is useful if you have multiple MCP servers
   configured, or want to explicitly use a specific server for a task.
   
   For example, you can add ``Use mongodb.`` to your prompt to explicitly
   call the ``mongodb`` MCP server you configured.