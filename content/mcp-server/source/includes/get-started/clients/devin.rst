Devin AI supports the following setup methods:

.. include:: /includes/get-started/plugin-atlas-managed.rst

.. include:: /includes/get-started/manual-atlas-managed.rst


{+mdb-atlas-ai-client-title+}
-------------

.. collapsible::
   :heading: {+plugin-atlas-managed-mcp-heading+} (Recommended)
   :sub_heading: Set up the Plugin for {+atlas-managed-mcp+}.
   :expanded: true

   .. include:: /includes/get-started/enable-ai-clients.rst

   .. procedure::
      :style: normal

      .. step:: Open a Devin AI session.

      .. step:: Install the plugin.

         a. Go to **Settings → Connections**.

         b. Select the **MongoDB Atlas** MCP Server.
         
         c. Click **Install and enable**.
         
         d. In the security notice pop-up window, confirm **Install and enable**.

      .. step:: Login to Atlas.

         Complete the guided Atlas
         :ref:`OAuth flow <remote-mcp-security>`.

      .. step:: Confirm the requested permissions.

         Devin requests access to MongoDB Atlas. Click **Authorize**.
         
         Devin redirects you back to your Devin app and displays a
         confirmation that the MCP Server installed successfully.

.. collapsible::
   :heading: {+manual-atlas-managed-mcp-heading+}
   :sub_heading: Set up {+remote-mcp-programmatic+}.
   :expanded: false

   .. include:: /includes/get-started/manual-atlas-managed/devin.rst

{+self-managed-mdb-title+}
--------------------

.. note::
   
   Devin AI does not support {+self-managed-mdb-title+}.   
