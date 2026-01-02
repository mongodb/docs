.. procedure::
   :style: normal

   .. step:: Set up Unified AWS Access.

      .. include:: /includes/atlas-stream-processing/unified-aws-access.rst

   .. include:: /includes/nav/steps-project-access-manager

   .. step:: Create an API key.

      .. include:: /includes/atlas-stream-processing/create-api-key.rst

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
      <creategroupstreamconnection>`. You must send this
      request using digest authorization, as detailed in the next step.

   .. step:: In your HTTP request interface, enable digest authorization. 
    
      For the ``username``, provide the public key you generated
      previously. For the ``password``, provide the private key you
      generated previously.

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
