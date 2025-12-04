Add a Kinesis Connection through the {+atlas-cli+}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To add a kinesis connection to your {+spw+} through
{+atlas-cli+}, follow these steps:

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

   .. step:: Create the Kinesis connection.

      .. include:: /includes/extracts/atlas-streams-connections-create.rst

      In your configuration file, set the following key-value pairs:

      .. list-table::
         :widths: 35 65
         :header-rows: 1

         * - Key
           - Value

         * - ``type``
           - ``"AWSKinesisDataStreams"``

         * - ``aws.roleArn``
           - Value of the ARN noted in an earlier step.
