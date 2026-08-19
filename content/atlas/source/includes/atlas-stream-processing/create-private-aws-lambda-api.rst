Add an AWS Lambda Private Link Connection through the {+atlas-admin-api+}
----------------------------------------------------------------------------------------------------------------------------

To add an {+aws+} Lambda Private Link connection to your {+spw+}
through the {+atlas-admin-api+}, follow these steps:

.. procedure::
   :style: normal

   .. step:: Create {+aws+} resources.

      Follow the procedure described in the :ref:`$externalFunction
      <atlas-sp-agg-externalFunction-auth>` documentation.

   .. step:: Configure a Service Account.

      .. include:: /includes/atlas-stream-processing/create-service-account.rst

   .. step:: Create the Private Link Connection.

      The {+atlas-admin-api+} provides an endpoint to
      :oas-bump-atlas-op:`Create One Private Link
      <creategroupstreamprivatelinkconnection>`

      For an ``$externalFunction`` Private Link connection, set the
      following key-value pairs:

      .. list-table::
	 :widths: 35 65
	 :header-rows: 1

	 * - Key
	   - Value

	 * - ``vendor``
	   - ``"LAMBDA"``

	 * - ``provider``
	   - ``"AWS"``         

	 * - ``region``
	   - The {+aws+} region in which you create the endpoint.

	 * - ``serviceEndpointId``
	   - ``"com.amazonaws.<region>.s3"`` where ``<region>``
	     is the name of the {+aws+} region in which you
	     create the endpoint.

      Use :oas-bump-atlas-op:`Return All Private Link Connections
      <listgroupstreamprivatelinkconnections>` to check
      the ``state`` of your endpoint. When it reaches a ``DONE``
      state, note the value of the ``_id`` field and proceed to
      the next step.      
      
   .. step:: Create the {+aws+} Lambda connection.

      The {+atlas-admin-api+} provides an endpoint to
      :oas-bump-atlas-op:`Create One Connection
      <creategroupstreamconnection>`.

      For an {+aws+} Lambda Private Link connection, set the
      following key-value pairs:

      .. list-table::
	 :widths: 35 65
	 :header-rows: 1

	 * - Key
	   - Value

	 * - ``name``
	   - The name you want to give to the connection.

	 * - ``type``
	   - ``"AWS Lambda"``

	 * - ``aws.roleArn``
	   - Value of the ARN noted in an earlier step.

	 * - ``publicPrivateNetworking.access.type``
	   - "PRIVATE_LINK"

	 * - ``publicPrivateNetworking.access.connectionId``
	   - The ``_id`` value in the response when you create
	     the Private Link connection.
      
