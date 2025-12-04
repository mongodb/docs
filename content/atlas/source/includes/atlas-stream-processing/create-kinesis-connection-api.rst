Add a Kinesis Connection through the {+atlas-admin-api+}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To add a Kinesis connection to your {+spw+} through the
{+atlas-admin-api+}, follow these steps:

.. procedure::
   :style: normal

   .. step:: Set up Unified AWS Access.

      Follow the procedure described in `Set Up Unified AWS Access
      <https://docs.mongodb.com/atlas/security/set-up-unified-aws-access/?interface=atlas-admin-api>`__.

      Ensure that you grant your IAM role the following permissions:

      - ``SubscribeToShard``
      - ``ListShards``
      - ``DescribeStreamSummary``
      - ``PutRecords``

      Note the ARN value in ``Statement.Principal.AWS`` for later in this
      procedure.

   .. include:: /includes/nav/steps-project-access-manager

   .. step:: Create an API key.

      .. include:: /includes/atlas-stream-processing/create-aws-api-key.rst

   .. step:: Create the Kinesis Connection.

      The {+atlas-admin-api+} provides an endpoint to
      :oas-atlas-tag:`Create One Connection
      </Streams/operation/createStreamConnection>`. You must send this
      request using digest authorization.

      In your HTTP request interface, enable digest authorization. For
      the ``username``, provide the public key you generated
      previously. For the ``password``, provide the private key you
      generated previously.

      For an {+aws+} Kinesis connection, set the following key-value pairs:

      .. list-table::
         :widths: 35 65
         :header-rows: 1

         * - Key
           - Value

         * - ``type``
           - ``"AWSKinesisDataStreams"``

         * - ``aws.roleArn``
           - Value of the ARN noted in an earlier step.
