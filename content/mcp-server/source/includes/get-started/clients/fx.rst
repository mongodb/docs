The fx CLI supports the following setup methods:

.. include:: /includes/get-started/user-delegation-atlas-managed.rst

.. include:: /includes/get-started/manual-atlas-managed.rst

.. include:: /includes/get-started/manual-local.rst

{+mdb-atlas-ai-client-title+}
-------------

.. collapsible::
   :heading: {+user-delegation-atlas-managed-mcp-heading+} (Recommended)
   :sub_heading: Set up user-delegated access for {+atlas-managed-mcp+}.
   :expanded: true

   .. include:: /includes/get-started/enable-ai-clients.rst

   .. procedure::
      :style: normal

      .. step:: Create your fx MCP configuration file.

         Create a file named ``mcp.json`` in the ``~/.fx`` directory.

      .. step:: Add the {+atlas-managed-mcp-server+} configuration.

         Add the following configuration to ``~/.fx/mcp.json``:

         .. code-block:: json

            {
              "mcp": {
                "mongodb": {
                  "type": "http",
                  "url": "https://mcp.mongodb.com",
                  "oauth": {
                    "client_id": "fx"
                  }
                }
              }
            }

      .. step:: Enable the MongoDB MCP Server in fx.

         Open an fx session and run:
         
         .. code-block:: none 
            
            /mcp auth mongodb --open

         Complete the guided :ref:`OAuth flow <remote-mcp-security>`.

      .. step:: Authorize access.

         To grant fx access to your Atlas resources, click
         :guilabel:`Authorize`.

.. collapsible::
   :heading: Manual MongoDB Atlas Managed MCP Server (Client Credentials)
   :sub_heading: Set up {+remote-mcp-programmatic+}.
   :expanded: false

   .. include:: /includes/get-started/manual-atlas-managed/fx.rst

{+self-managed-mdb-title+}
--------------------

.. collapsible::
   :heading: {+manual-self-managed-mcp-heading+}
   :sub_heading: Set up {+local-mcp+}.
   :expanded: false

   .. include:: /includes/get-started/local.rst
