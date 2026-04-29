Add an {+aws-kinesis+} Private Link Connection through the {+atlas-admin-api+}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To add an {+aws-kinesis+} Private Link connection to your {+spw+}
through the {+atlas-admin-api+}, perform these steps:

.. procedure::
   :style: normal

   .. step:: Set up Unified AWS Access.

      .. include:: /includes/atlas-stream-processing/unified-aws-access.rst

   .. include:: /includes/nav/steps-project-access-manager

   .. step:: Configure a Service Account.

      .. include:: /includes/atlas-stream-processing/create-service-account.rst

   .. step:: Create the Private Link Connection.

      The {+atlas-admin-api+} provides an endpoint to
      :oas-bump-atlas-op:`Create One Private Link
      <creategroupstreamprivatelinkconnection>`.

      For an {+aws-kinesis+} Private Link connection, set the
      following key-value pairs:

      .. list-table::
         :widths: 35 65
         :header-rows: 1

         * - Key
           - Value

         * - ``vendor``
           - ``"KINESIS"``

         * - ``provider``
           - ``"AWS"``         

         * - ``region``
           - The {+aws+} region in which you create the endpoint.

      Use :oas-bump-atlas-op:`Return All Private Link Connections
      <listgroupstreamprivatelinkconnections>` to check
      the ``state`` of your endpoint. When it reaches a ``DONE``
      state, note the value of the ``_id`` field and proceed to
      the next step.

   .. step:: Create the Kinesis Private Link Connection.

      The {+atlas-admin-api+} provides an endpoint to
      :oas-bump-atlas-op:`Create One Stream Connection
      <creategroupstreamconnection>`.

      For an {+aws-kinesis+} Private Link connection, set the
      following key-value pairs:

      .. list-table::
	       :widths: 35 65
	       :header-rows: 1

	       * - Key
	         - Value

	       * - ``name``
	         - The name you want to give to the connection.

	       * - ``type``
	         - "AWSKinesisDataStream"

	       * - ``aws.roleArn``
	         - Value of the ARN noted in an earlier step.

	       * - ``networking.access.type``
	         - "PRIVATE_LINK"

	       * - ``networking.access.connectionId``
	         - The ``_id`` value in the response when you create
	           the Private Link connection.
