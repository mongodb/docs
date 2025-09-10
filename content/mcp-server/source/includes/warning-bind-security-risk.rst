Binding to ``0.0.0.0`` exposes the MCP Server to the entire local
network, which allows other devices on the same network to
potentially access the MCP Server. This is a security risk and could
allow unauthorized access to your database context. If you must
expose the MCP Server outside of ``localhost``, implement strong
:ref:`security authentication <mcp-server-security>`.
