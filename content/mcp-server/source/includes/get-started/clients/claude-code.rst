Claude Code supports the following setup methods:

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

      .. step:: Open a Claude Code CLI session.

      .. step:: Install the plugin.
   
         Run:

         .. code-block:: none

            /plugin install mongodb-atlas@claude-plugins-official

         Follow the prompts to complete the installation.

      .. step:: Apply changes.

         Run ``/reload-plugins``.

      .. step:: Login to Atlas.

         Run ``/mcp``, select **plugin:mongodb-atlas:mongodb-atlas**, and select
         **Authenticate**. 

      .. step:: Confirm the requested permissions.

         Complete the guided Atlas :ref:`OAuth flow <remote-mcp-security>` and
         click **Authorize**.

.. collapsible::
   :heading:  {+manual-atlas-managed-mcp-heading+}
   :sub_heading: Set up {+remote-mcp-programmatic+}.
   :expanded: false

   .. include:: /includes/get-started/manual-atlas-managed/claude-code.rst

{+self-managed-mdb-title+}
--------------------

.. collapsible:: 
   :heading: {+plugin-self-managed-mcp-heading+}
   :sub_heading: Set up the Plugin for {+local-short+}.
   :expanded: false

   .. procedure::
      :style: normal

      .. step:: Open a Claude Code CLI session.

      .. step:: Install the plugin.
   
         Run:

         .. code-block:: none

            /plugin install mongodb@claude-plugins-official

         Follow the prompts to complete the installation.

      .. step:: Set up the plugin.

         Run the ``/mongodb:mongodb-mcp-setup`` skill and follow the prompts.
   
.. collapsible:: 
   :heading:  {+manual-self-managed-mcp-heading+}
   :sub_heading: Set up {+local-mcp+}.
   :expanded: false
         
   .. include:: /includes/get-started/local.rst 