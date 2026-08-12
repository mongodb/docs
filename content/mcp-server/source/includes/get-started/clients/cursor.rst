Cursor supports the following setup methods:

.. include:: /includes/get-started/plugin-atlas-managed.rst

.. include:: /includes/get-started/manual-atlas-managed.rst

.. include:: /includes/get-started/plugin-local.rst

.. include:: /includes/get-started/manual-local.rst

{+mdb-atlas-ai-client-title+}
-------------

.. collapsible::
   :heading: {+plugin-atlas-managed-mcp-heading+} (Recommended)
   :sub_heading: Set up the Plugin for {+atlas-managed-mcp+}.
   :expanded: true

   .. include:: /includes/get-started/enable-ai-clients.rst

   .. procedure::
      :style: normal

      .. step:: Open a Cursor session.

      .. step:: Install the plugin.

         Go to **Cursor Settings → Customize → Browse Marketplace**. 
         
         Search for **MongoDB Atlas (Managed MCP)** and click **Add**.

      .. step:: Login to Atlas.

         Go to **Tools & MCPs → Authenticate → MongoDB-Atlas** and complete
         the guided :ref:`OAuth flow <remote-mcp-security>`.

      .. step:: Confirm the requested permissions.

          Click **Authorize**.

.. collapsible::
   :heading: {+manual-atlas-managed-mcp-heading+}
   :sub_heading: {+remote-mcp-programmatic+}.
   :expanded: false

   .. include:: /includes/get-started/manual-atlas-managed/cursor.rst

{+self-managed-mdb-title+}
--------------------

.. collapsible:: 
   :heading: {+plugin-self-managed-mcp-heading+}
   :sub_heading: Set up the Plugin for {+self-managed-mcp+}.
   :expanded: false

   .. procedure::
      :style: normal

      .. step:: Open a Cursor session.

      .. step:: Install the plugin.

         Go to **Cursor Settings → Customize → Browse Marketplace**. 
         
         Search for **MongoDB Atlas (Managed MCP)** and click **Add**.

      .. step:: Complete setup.

         Open a **New Agent**, run the ``/mongodb-mcp-setup``
         skill, and follow the prompts.
   
.. collapsible:: 
   :heading: {+manual-self-managed-mcp-heading+}
   :sub_heading: {+local-mcp+}.
   :expanded: false
         
   .. include:: /includes/get-started/local.rst 