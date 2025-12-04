Add a Kinesis Connection through the {+atlas-ui+}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. important::

   {+atlas-sp+} currently supports using {+aws+} Kinesis connections
   only as sinks.

To add a Kinesis connection to your {+spw+} through {+atlas-ui+},
follow these steps:

.. procedure::
   :style: normal

   .. step:: Set up Unified AWS Access.

      Follow the procedure described in `Set Up Unified AWS Access
      <https://docs.mongodb.com/atlas/security/set-up-unified-aws-access/?interface=atlas-ui>`__.

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

      .. include:: /includes/nav/steps-stream-processing.rst  

   .. step:: Go to the :guilabel:`Connection Registry`.  

      a. Locate the overview panel of the {+spw+} you want to  
         modify and click :guilabel:`Configure`.  

      #. Select the :guilabel:`Connection Registry` tab.  

   .. step:: Click :guilabel:`+ Add connection`.  

   .. step:: Add a new connection.  

      a. Select an :guilabel:`AWS Kinesis` connection.  

      #. Provide a :guilabel:`Connection Name`. Each connection
         name must be unique within a {+spw+}.  This is the name
         used to reference the connection in {+atlas-sp+}
         :ref:`aggregations <atlas-sp-aggregation>`.

      #. Under :guilabel:`Network Access`, select :guilabel:`Public
         IP`.

      #. From the :guilabel:`AWS IAM Role ARN` dropdown, select
         the ARN of the unified access role you authorized in a
         prior step.

      #. Click :guilabel:`Add connection`.
