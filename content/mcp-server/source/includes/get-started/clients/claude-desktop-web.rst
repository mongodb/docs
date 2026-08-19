Claude Desktop & Web support the following setup methods:

.. include:: /includes/get-started/connector-atlas-managed.rst

.. include:: /includes/get-started/manual-atlas-managed.rst

.. include:: /includes/get-started/manual-local.rst

{+mdb-atlas-ai-client-title+}
-------------

.. collapsible::
   :heading: {+connector-atlas-managed-mcp-heading+} (Recommended)
   :sub_heading: Set up the Connector for {+atlas-managed-mcp+}.
   :expanded: true

   .. include:: /includes/get-started/enable-ai-clients.rst

   .. procedure::
      :style: normal

      .. step:: Open a Claude Desktop or Claude Web session.

      .. step:: Open your :guilabel:`Settings`:

         In the bottom-left corner, click the card with your profile name and
         select :guilabel:`Settings`.
   
      .. step:: Find the MongoDB Atlas Connector.

         In the :guilabel:`Settings` menu, click :guilabel:`Connectors`.
         Click the :guilabel:`Add` dropdown and select
         :guilabel:`Browse connectors`. Search for and select the
         **MongoDB Atlas** connector.

      .. step:: Login to Atlas.

         Click :guilabel:`Connect` and complete the guided Atlas :ref:`OAuth flow
         <remote-mcp-security>`.

      .. step:: Grant access to Atlas.
      
         Click :guilabel:`Authorize`.

.. collapsible::
   :heading: {+manual-atlas-managed-mcp-heading+} (Claude Desktop)
   :sub_heading: Set up {+remote-mcp-programmatic+} (Claude Desktop)
   :expanded: false

   .. include:: /includes/get-started/manual-atlas-managed/claude-desktop-web.rst
   
{+self-managed-mdb-title+}
--------------------

.. collapsible:: 
   :heading: {+manual-self-managed-mcp-heading+} (Claude Desktop)
   :sub_heading: Set up {+local-mcp+} (Claude Desktop).
   :expanded: false
         
   .. include:: /includes/get-started/local.rst 