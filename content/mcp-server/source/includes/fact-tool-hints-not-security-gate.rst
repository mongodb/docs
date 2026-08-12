.. warning:: Tool annotations aren't a security boundary

   Tool annotations such as ``destructiveHint`` and ``readOnlyHint``
   are advisory metadata that the MCP Server sends to the AI client.
   They don't authorize, restrict, or block any operations, and an AI
   client can ignore them. Don't rely on annotations to prevent
   unintended changes.

   To limit what an AI client can do on your behalf, grant only the
   Atlas permissions that the AI client's task requires. To learn about Atlas
   roles, see :ref:`Atlas User Roles <user-roles>`.
