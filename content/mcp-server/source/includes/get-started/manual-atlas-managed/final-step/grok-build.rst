.. step::  Write your MCP client configuration.

   Run the following command to create your configuration file:
  
   .. code-block:: bash
      
      cat > ~/.mcp-env <<EOF
      export MDB_MCP_API_CLIENT_ID="$CLIENT_ID"
      export MDB_MCP_API_CLIENT_SECRET="$SECRET"
      EOF
      chmod 600 ~/.mcp-env

   After you create your configuration file, run the following command to load 
   your configuration into your current shell session:

   .. code-block:: bash

      source ~/.mcp-env
