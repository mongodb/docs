.. procedure::
   :style: normal

   .. step:: Run the set up utility.

      The set up utility guides you through the process of creating an initial JSON
      configuration file. This JSON configuration file tells the server how to
      connect to MongoDB and how to share that data with MCP clients.

      From the command line, run:

      .. code:: shell

         npx mongodb-mcp-server@latest setup

      .. note::

         Alternatively, you can run the {+local-short+} in a Docker container,
         which does not require Node.js. To learn more, see
         :github:`Using Docker <mongodb-js/mongodb-mcp-server#option-5-using-docker>`.

   .. step:: Provide read-only mode setting.

      You can limit the MCP Server to perform only read operations using
      read-only mode. To enable read-only mode, enter ``Y``.

      For security, always enable read-only mode unless you must perform
      write operations. You can enable write operations later. For
      details, see :ref:`MCP Server Read-Only Mode
      <mcp-server-configuration-read-only-mode>`.

   .. step:: Enter connection string.

      Enter the connection string for your MongoDB cluster.

      For example,
      ``mongodb+srv://user:D1fficultP%40ssw0rd@mycluster.abcd1.mongodb.net/myDatabase?retryWrites=true&w=majority``.

      To learn more, see :ref:`Find Your Connection String
      <mongodb-uri>`.

   .. step:: (Optional) Enter path for configuration file.

      If you want to use a different path for the configuration file,
      enter the path to save the configuration file.

      For example, ``/Users/user.name/Library/Application Support/Code/User/mcp.json``.

   .. step:: Restart your AI client.

      Restart your AI client so that it uses either the JSON configuration file
      the set up utility created or the configuration file you specified.

If you have issues with your {+local-mcp+} configuration,
see :ref:`mcp-server-configuration-troubleshooting`.

For complete configuration options, see
:ref:`Configure MCP Server and Connections <mcp-server-configuration>`.