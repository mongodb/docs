Add an {+aws+} S3 Private Link Connection through the {+atlas-admin-api+}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To add an {+aws+} S3 Private Link connection to your {+spw+} through
the {+atlas-admin-api+}, follow these steps:

.. procedure::
   :style: normal

   .. step:: Set up Unified AWS Access.

      Follow the procedure described in `Set Up Unified AWS
      Access
      <https://docs.mongodb.com/atlas/security/set-up-unified-aws-access/?interface=atlas-admin-api>`__.

      Ensure that you grant your IAM role ``ListAllMyBuckets`` and
      ``PutObject`` permissions. The following example policy grants the AWS
      principal these permissions for any S3 bucket:

      .. literalinclude:: /includes/s3-private-link-connection-example-policy.json
         :language: json
         :dedent:
         :emphasize-lines: 7,10-11,14

      Note the ARN value in ``Statement.Principal.AWS`` to use
      later in this procedure.

   .. include:: /includes/nav/steps-project-access-manager

   .. step:: Configure a Service Account.

      .. include:: /includes/atlas-stream-processing/create-service-account.rst

   .. step:: Create the Private Link Connection.

      The {+atlas-admin-api+} provides an endpoint to
      :oas-bump-atlas-op:`Create One Private Link
      <creategroupstreamprivatelinkconnection>`

      For an {+aws+} |s3| Private Link connection, set the
      following key-value pairs:

      .. list-table::
	 :widths: 35 65
	 :header-rows: 1

	 * - Key
	   - Value

	 * - ``vendor``
	   - ``"S3"``

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

   .. step:: Create the S3 Connection.

      The {+atlas-admin-api+} provides an endpoint to
      :oas-bump-atlas-op:`Create One Connection
      <creategroupstreamconnection>`.

      For an {+aws+} |s3| Private Link connection, set the
      following key-value pairs:

      .. list-table::
	 :widths: 35 65
	 :header-rows: 1

	 * - Key
	   - Value

	 * - ``name``
	   - The name you want to give to the connection.

	 * - ``type``
	   - ``"S3"``

	 * - ``aws.roleArn``
	   - Value of the ARN noted in an earlier step.

	 * - ``networking.access.type``
	   - "PRIVATE_LINK"

	 * - ``networking.access.connectionId``
	   - The ``_id`` value in the response when you create
	     the Private Link connection.
