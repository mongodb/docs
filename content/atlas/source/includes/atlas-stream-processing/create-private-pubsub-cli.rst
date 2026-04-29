Add a {+gcp+} Pub/Sub Private Service Connect Connection through the {+atlas-cli+}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To add a {+gcp+} Pub/Sub connection to your {+spw+} through the
{+atlas-cli+}, perform these steps:

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

      .. include:: /includes/extracts/atlas-streams-privateLinks-create.rst

      In your configuration file, set the following key-value
      pairs:

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
           - {+gcp+} region in which you create the endpoint.

      Use :atlascli:`atlas streams privateLinks list
      <atlas-streams-privateLinks-list>` command to check
      the ``state`` of your endpoint. When it reaches a ``DONE``
      state, note the value of the ``_id`` field.
	     
   .. step:: Create the {+gcp+} Pub/Sub connection.

      .. include:: /includes/extracts/atlas-streams-connections-create.rst

      In your configuration file, set the following key-value pairs:

      .. list-table::
	 :widths: 35 65
	 :header-rows: 1

	 * - Key
	   - Value

	 * - ``name``
	   - Name for the connection.

	 * - ``type``
	   - "GCPPubSub"

	 * - ``gcp.serviceAccountId``
	   - ``Service Account`` ID that you noted earlier in
	     this procedure.

	 * - ``networking.access.type``
	   - "PRIVATE_LINK"

	 * - ``networking.access.connectionId``
	   - Value of ``_id`` in the response when you create
	     the Private Link connection.
