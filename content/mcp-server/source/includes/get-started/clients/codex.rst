Codex supports the following setup methods:

.. include:: /includes/get-started/plugin-atlas-managed.rst

.. include:: /includes/get-started/manual-atlas-managed.rst

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

      .. step:: Open a Codex session.

      .. step:: Install the plugin.

         Go to **Settings → Plugins → Search plugins**.

         Search for **MongoDB Atlas** and select it.

      .. step:: Authorize the plugin.

         Click **Continue to MongoDB Atlas** and complete the guided Atlas
         :ref:`OAuth flow <remote-mcp-security>`.
      
      .. step:: Confirm the requested permissions.

         Click **Authorize**.   

.. collapsible::
   :heading: {+manual-atlas-managed-mcp-heading+}
   :sub_heading: Set up {+remote-mcp-programmatic+}.
   :expanded: false

   .. include:: /includes/get-started/manual-atlas-managed/codex.rst

{+self-managed-mdb-title+}
--------------------


.. collapsible:: 
   :heading:  {+manual-self-managed-mcp-heading+}
   :sub_heading: Set up {+local-mcp+}.
   :expanded: false
         
   .. include:: /includes/get-started/local.rst 
