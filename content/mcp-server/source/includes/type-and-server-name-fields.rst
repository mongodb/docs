The MCP Server configuration file examples set the ``type`` field to
``"stdio"``.

``type`` can be set to one of the following:

- ``"stdio"``, which uses the standard input and output for
  communications with the MCP Server. ``stdio`` is suitable for most AI
  clients. Typically use ``stdio``.
- ``"http"``, which enables HTTP communications with the MCP Server. You
  can then use HTTP to interact with the MCP Server from a Web client.

  .. warning::

     HTTP is **NOT** recommended for production use without implementing
     authentication and security.

The MCP Server configuration file examples also set the MCP Server name
to ``"MongoDB"``. You can change the server name to match the name of
your MCP Server after you start it. The server name identifies the MCP
Server to the AI client.
