The MongoDB MCP Server can connect to your MongoDB deployment for you.
However, if you do not want to expose your connection string to the
LLM's context, or to persist the connection across sessions, you can add your
connection string to the configuration.

Replace ``<connection-string>`` with your specific connection string in
the ``"environment"`` section of the configuration. For security reasons, 
we recommend using environment variables for sensitive data.