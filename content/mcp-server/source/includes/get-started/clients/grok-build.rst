Grok Build supports the following setup methods:

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

      .. step:: Open a Grok Build CLI session.

      .. step:: Install the plugin.

         Run the ``/plugins`` command and click **Marketplace**. 
         
         Search for **mongodb-atlas** and press the ``i`` key.

      .. step:: Authorize the plugin.

         Browse to the **MCP Servers** tab and click
         **mongodb-atlas**.
      
      .. step:: Confirm the requested permissions.

         To confirm the requested permissions, click **Authorize**.

.. collapsible::
   :heading: {+manual-atlas-managed-mcp-heading+}
   :sub_heading: Set up {+remote-mcp-programmatic+}.
   :expanded: false

   .. include:: /includes/get-started/manual-atlas-managed/grok-build.rst

{+self-managed-mdb-title+}
--------------------

.. collapsible:: 
   :heading: {+plugin-self-managed-mcp-heading+}
   :sub_heading: Set up the Plugin for {+self-managed-mcp+}.
   :expanded: false

   .. procedure::
      :style: normal

      .. step:: Open a Grok Build CLI session.

      .. step:: Install the plugin.

         Run the ``/plugins`` command and click **Marketplace**.
         
         Search for **mongodb** and press the ``i`` key.

      .. step:: Complete setup.

         Run the ``/mongodb-mcp-setup`` skill and follow the prompts.
   
.. collapsible:: 
   :heading: {+manual-self-managed-mcp-heading+}
   :sub_heading: Set up {+local-mcp+}.
   :expanded: false
         
   .. include:: /includes/get-started/local.rst 