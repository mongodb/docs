a. Follow the procedure described in 
   `Set Up Unified AWS Access <https://docs.mongodb.com/atlas/security/set-up-unified-aws-access/?interface=atlas-ui>`__.

#. Ensure that you grant your :ref:`IAM role <set-up-unified-aws-access>` the       
   following permissions:

   .. list-table::
      :widths: 50 50
      :header-rows: 1

      * - Connection Type
        - AWS Permissions

      * - Kinesis as Source
        - * ``kinesis:DescribeStreamSummary``
          * ``kinesis:ListShards``
          * ``kinesis:SubscribeToShard``

      * - Kinesis as Sink
        - * ``kinesis:DescribeStreamSummary``
          * ``kinesis:PutRecords``

      * - Kinesis as Source and Sink
        - * ``kinesis:DescribeStreamSummary``
          * ``kinesis:ListShards``
          * ``kinesis:SubscribeToShard``
          * ``kinesis:PutRecords``

   The following example policy grants the |aws| principal the required Source 
   and Sink permissions for any Kinesis data stream:

   .. literalinclude:: /includes/kinesis-private-link-connection-example-policy.json
      :language: json
      :dedent:
      :emphasize-lines: 7,10-13,16

   The ``consumer`` resource is required to use a Kinesis data stream as a
   source.

#. Note the ARN value in ``Statement.Principal.AWS`` to use
   later in this procedure.
