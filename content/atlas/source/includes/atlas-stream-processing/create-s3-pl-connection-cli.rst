.. procedure::
   :style: normal

   .. step:: Set up Unified AWS Access.

      Follow the procedure described in `Set Up Unified AWS
      Access
      <https://docs.mongodb.com/atlas/security/set-up-unified-aws-access/?interface=atlas-admin-api>`__.

      Ensure that you grant your IAM role ``ListAllMyBuckets`` and
      ``PutObject`` permissions.

      Note the ARN value in ``Statement.Principal.AWS`` to use later in this
      procedure.

   .. include:: /includes/nav/steps-project-access-manager

   .. step:: Create an API key.

      The :oas-bump-atlas-op:`Create One Connection
      <creategroupstreamconnection>` API endpoint
      requires digest authorization when creating an S3 Connection. To
      support this, you must create an API Key.

      a. In the :guilabel:`Project Access Manager`, select the
	 :guilabel:`Applications` tab, then click :guilabel:`API Keys`.

      b. Click :guilabel:`Create API Key`. Provide a short description
	 for the key.

      c. In the :guilabel:`Project Permissions` dropdown menu,
	 select both the :guilabel:`Project Stream Processing Owner` and
	 :guilabel:`Project Owner` roles. Click :guilabel:`Next`.

      d. Save both the public and private keys to use later in this procedure.

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
	   - ``"S3"``

	 * - ``provider``
	   - ``"AWS"``         

	 * - ``region``
	   - The {+aws+} region in which you create the endpoint.

	 * - ``serviceEndpointId``
	   - ``"com.amazonaws.<region>.s3"`` where ``<region>``
	     is the name of the {+aws+} region in which you
	     create the endpoint.

      Use :atlascli:`atlas streams privateLinks list
      <atlas-streams-privateLinks-list>` command to check
      the ``state`` of your endpoint. When it reaches a ``DONE``
      state, note the value of the ``_id`` field and proceed to
      the next step.

   .. step:: Create the S3 Connection.

      .. include:: /includes/extracts/atlas-streams-connections-create.rst

      In your configuration file, set the following key-value pairs:

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
