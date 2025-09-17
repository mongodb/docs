Use environment variables instead of command line arguments for
sensitive configuration settings such as login credentials and
connection information. For example, use ``MDB_MCP_API_CLIENT_ID`` and
``MDB_MCP_API_CLIENT_SECRET`` for API client settings, and
``MDB_MCP_CONNECTION_STRING`` for connection strings.

Environment variables are more secure than command line arguments.
Command line arguments can be tracked, cached, included in process
lists, and logged in various locations.
