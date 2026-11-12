The Devin CLI supports the following setup methods:

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

      .. step:: Install the plugin.

         Run:

         .. code-block:: none

            devin mcp add mongodb-atlas https://mcp.mongodb.com

      .. step:: Create your Atlas service account client ID and secret.

         If you have not already created your Atlas service account client
         ID and secret, follow the instructions on
         :ref:`prerequisites <mcp-server-prerequisites>`.

      .. step:: Authenticate with Atlas.

         Run the following command, replacing ``<CLIENT_ID>`` and
         ``<CLIENT_SECRET>`` with your pre-registered Atlas OAuth client
         ID and secret.

         .. code-block:: none

            devin mcp login mongodb-atlas --oauth-client-id "<CLIENT_ID>" --oauth-client-secret "<CLIENT_SECRET>"

         .. important::

            ``devin mcp login`` cannot register Devin CLI automatically because
            the managed Atlas MCP server does not support OAuth dynamic client
            registration.

         Devin CLI opens your browser to complete the guided Atlas
         :ref:`OAuth flow <remote-mcp-security>`.

         .. note::

            If your Atlas organization cannot issue a service-account OAuth
            client for this flow, use the {+manual-atlas-managed-mcp-heading+}
            below.

      .. step:: Verify the server.

         Run:

         .. code-block:: none

            devin mcp list
            devin mcp get mongodb-atlas

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

      .. step:: Install the plugin.

         Run:

         .. code-block:: none

            devin plugins install CognitionAI/devin-marketplace#plugins/mongodb     
 
      .. step:: Set your connection environment variables.

         Run the following command to set your connection environment variable,
         replacing ``<CONNECTION-STRING>`` with the :ref:`connection string
         <mongodb-uri>` for your local MongoDB instance:

         .. code-block:: bash

            export MDB_MCP_CONNECTION_STRING="<CONNECTION-STRING>"

         Run the following if you need to set up your Atlas API service-account
         credentials, replacing ``<CLIENT_ID>`` and ``<CLIENT_SECRET>`` with
         your Atlas API service account client ID and secret:

         .. code-block:: bash

            export MDB_MCP_API_CLIENT_ID="<CLIENT_ID>"
            export MDB_MCP_API_CLIENT_SECRET="<CLIENT_SECRET>"      

      .. step:: Verify the plugin installation.

         Run:

         .. code-block:: none

            devin mcp list
            devin mcp get mongodb

.. collapsible::
   :heading: {+manual-self-managed-mcp-heading+}
   :sub_heading: Set up {+local-mcp+}.
   :expanded: false

   .. include:: /includes/get-started/local.rst
