To use the MongoDB MCP server, you must have the following:

- A self-hosted MongoDB deployment. To learn more, see :ref:`tutorials-installation`.

- Any `supported MCP client. <https://modelcontextprotocol.io/clients>`__

- You also need your MongoDB cluster connection string. To learn more, see 
  :ref:`Find Your Connection String <mongodb-uri>`.

- `Node.js <https://www.nodejs.org/>`__ installed, using version 22.12.0 or
  later. 

  To examine your ``Node.js`` version, run the following command:

  .. code-block:: bash

      node --version

  .. note::

     The MongoDB MCP Server previously supported Node.js version 20.19.0 and
     later. Node.js version 20.x reached end of life on April 30, 2026. While
     the MCP server may continue to work using Node.js version 20.x, we cannot
     guarantee the expected behavior and recommend upgrading to a supported
     version of Node.js.

     Alternatively, you can run the server in Docker container,
     which does not require installing Node.js. To learn more,
     see :github:`Using Docker <mongodb-js/mongodb-mcp-server#option-5-using-docker>`.

Configure MCP Server File
~~~~~~~~~~~~~~~~~~~~~~~~~

The MongoDB MCP Server JSON configuration file tells the server how to
connect to MongoDB and how to share that data with MCP clients.

To create an initial JSON file, use the MCP Server setup utility. The
utility guides you through the configuration process. Follow these
steps:

.. procedure::
   :style: normal

   .. step:: Run utility.

      From the command line, run:

      .. code:: shell

         npx mongodb-mcp-server@latest setup

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

The utility creates the configuration file. Read the instructions on how
to use the configuration file with your AI client. The utility also
provides the location of the configuration file.

Use the MCP Server
~~~~~~~~~~~~~~~~~~

Restart your AI client so that it uses the JSON configuration file you
created or updated in the previous section.

After you configure the MongoDB MCP Server, you can access the MongoDB
cluster from your AI client.

.. procedure::
   :style: normal

   .. step:: Check that the server is running.

      In your AI client, check that the MongoDB MCP server is
      running and verify that your list of MCP tools includes
      the MongoDB MCP tools if possible.

   .. step:: Test the MCP server tools.

      Run prompts in your AI client to test the MongoDB MCP Server tools.
      Your exact responses will vary depending on the data in your MongoDB
      deployment, and the AI client and model that you're using.
      The following sample prompts assume that the MCP server has both read and
      write access to your MongoDB deployment.

      a. First, create a new database and collection to work
         with by running the following prompt:

         .. include:: /includes/get-started/prompts/create-collection.rst

      #. Now that you have a MongoDB collection with some sample data,
         run prompts to interact with it using the MCP tools:

      .. tabs::

         .. tab:: Explore and query
            :tabid: data-exploration

            Run the following prompts in your AI client
            to explore and query your data in natural language:

            .. include:: /includes/get-started/prompts/explore-and-query.rst

            .. note::
  
               Watch a video that demonstrates data exploration and querying through the MongoDB MCP Server.

            .. video:: https://www.youtube.com/watch?v=vCDUH9w8g9U

         .. tab:: Generate code
            :tabid: code-generation

            Run the following prompt to generate code related to your MongoDB data.
            Providing context, such as schemas and data structures, enables more accurate code generation,
            reducing hallucinations and enhancing agent capabilities.

            .. include:: /includes/get-started/prompts/code-generation.rst

            .. note::
              
               Watch a video that demonstrates code generation using the MongoDB MCP Server.
               
            .. video:: https://www.youtube.com/watch?v=P3MEVnfTyKE

For more examples of what you can do with the MCP Server, see
:ref:`mcp-server-examples`.

.. _mcp-get-started-uninstall:

Uninstall
~~~~~~~~~

To remove the MongoDB MCP Server, follow the steps for your
installation method.

Plugin or Extension Install
```````````````````````````

For Claude Code, Codex, Cursor, or Gemini plugins, uninstall the
MongoDB MCP Server through your AI client's plugin or extension
manager.

Configuration File Install
``````````````````````````

Remove the ``mongodb`` entry from your AI client's MCP
configuration file. In most clients, this entry is under
``mcpServers``; for Codex, remove the ``[mcp_servers.mongodb]``
section. After you remove the entry, restart your AI client.

The configuration file location depends on your AI client:

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - AI client
     - Configuration file location
   * - Claude Desktop
     - ``claude_desktop_config.json``
   * - Cursor
     - ``.cursor/mcp.json`` in your project or home directory
   * - Gemini CLI
     - ``~/.gemini/mcp.json`` (user) or ``.gemini/mcp.json``
       (project)
   * - Codex
     - ``~/.codex/config.toml`` (user) or
       ``.codex/config.toml`` (project)

