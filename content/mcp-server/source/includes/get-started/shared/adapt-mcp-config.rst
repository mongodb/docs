MCP clients don't share a single configuration format. Use this
configuration as a starting point and adapt it to your client's syntax.
Depending on your client, you might need to make the following changes:

- Rename the top-level ``mcpServers`` object. Some clients name it
  ``mcp`` or ``mcp_servers``.
- Convert the configuration to TOML or YAML instead of JSON.
- Combine ``command`` and ``args`` into a single array in ``command``.
- Rename the ``env`` object to ``environment``.

The location of the configuration file also varies by client. To learn
which format your client expects and where it reads its configuration
file, see your client's documentation.
