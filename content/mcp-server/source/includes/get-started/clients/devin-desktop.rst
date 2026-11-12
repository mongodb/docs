Devin Desktop supports the following setup methods:

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

      .. step:: Open Devin Desktop.

      .. step:: Install the plugin.

         a. Go to :guilabel:`Customize → Plugins`.

         #. Under :guilabel:`Marketplace`, select :guilabel:`MongoDB Atlas`.

         #. Click :guilabel:`Install for me`.

      .. step:: Login to Atlas.

         Click :guilabel:`Connect MCP` and complete the guided Atlas
         :ref:`OAuth flow <remote-mcp-security>`.

      .. step:: Confirm the requested permissions.

         Devin requests access to MongoDB Atlas. Click **Authorize**.

         Devin redirects you back to Devin Desktop and displays a
         confirmation that the MCP Server installed successfully.

.. collapsible::
   :heading: {+manual-atlas-managed-mcp-heading+}
   :sub_heading: Set up {+remote-mcp-programmatic+}.
   :expanded: false

   .. include:: /includes/get-started/manual-atlas-managed/devin-desktop-cli.rst

{+self-managed-mdb-title+}
--------------------

.. include:: /includes/get-started/local-mcp-reqs.rst

.. collapsible::
   :heading: {+plugin-self-managed-mcp-heading+}
   :sub_heading: Set up the Plugin for {+local-short+}.
   :expanded: false

   .. procedure::
      :style: normal

      .. step:: Open Devin Desktop.

      .. step:: Install the plugin.

         a. Go to :guilabel:`Customize → Plugins`.

         #. Under :guilabel:`Marketplace`, select :guilabel:`MongoDB`.

         #. Click :guilabel:`Install for me`.

.. collapsible::
   :heading: {+manual-self-managed-mcp-heading+}
   :sub_heading: Set up {+local-mcp+}.
   :expanded: false

   .. include:: /includes/get-started/local.rst
