Add a {+gcp+} Pub/Sub Private Service Connect Connection through the {+atlas-admin-api+}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To add a {+gcp+} Pub/Sub connection to your {+spw+} through the
{+atlas-admin-api+}, perform these steps:

.. procedure::
   :style: normal

   .. step:: Set up GCP Service Account Access.

      Follow the procedure described in :ref:`Set Up and Manage GCP
      Service Account Access <manage-gcp-access>`.

      Note the ``Service Account`` ID for use later in this procedure.
      
      Grant the following roles at both the project and topic levels:

      - `Publisher Role <https://docs.cloud.google.com/pubsub/docs/access-control#pubsub.publisher>`__
      - `Viewer Role <https://docs.cloud.google.com/pubsub/docs/access-control#pubsub.viewer>`__
      
      For more information, see the `Pub/Sub documentation
      <https://docs.cloud.google.com/pubsub/docs/access-control#console>`__.
	   
   .. include:: /includes/nav/steps-project-access-manager

   .. step:: Configure a Service Account.

      .. include:: /includes/atlas-stream-processing/create-service-account.rst

   .. step:: Create the Private Link Connection.

      The {+atlas-admin-api+} provides an endpoint to
      :oas-bump-atlas-op:`Create One Private Link
      <creategroupstreamprivatelinkconnection>`.

      For a {+gcp+} Pub/Sub Private Service Connect connection, set the
      following key-value pairs:

      .. list-table::
         :widths: 35 65
         :header-rows: 1

         * - Key
           - Value

         * - ``vendor``
           - ``"PUBSUB"``

         * - ``provider``
           - ``"GCP"``         
	     
         * - ``region``
           - The {+gcp+} region in which you create the endpoint.

      Use :oas-bump-atlas-op:`Return All Private Link Connections
      <listgroupstreamprivatelinkconnections>` to check
      the ``state`` of your endpoint. When it reaches a ``DONE``
      state, note the value of the ``_id`` field.

   .. step:: Create the GCP Pub/Sub Private Service Connect Connection.

      The {+atlas-admin-api+} provides an endpoint to
      :oas-bump-atlas-op:`Create One Stream Connection
      <creategroupstreamconnection>`.

      For a {+gcp+} Pub/Sub Private Service Connect connection, set the
      following key-value pairs:

      .. list-table::
	       :widths: 35 65
	       :header-rows: 1

	       * - Key
	         - Value

	       * - ``name``
	         - Name you want to give to the connection.

	       * - ``type``
	         - "GCPPubSub"

	       * - ``gcp.serviceAccountId``
	         - ``Service Account`` ID that you noted earlier in
		   this procedure.

	       * - ``networking.access.type``
	         - "PRIVATE_LINK"

	       * - ``networking.access.connectionId``
	         - Value of ``_id`` in the response when you create
	           the Private Service Connect connection.
