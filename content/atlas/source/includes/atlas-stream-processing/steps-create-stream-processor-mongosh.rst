To create a new stream processor with {+mongosh+}, use the 
:method:`sp.createStreamProcessor()` method. It has the following syntax:

.. code-block:: sh

   sp.createStreamProcessor(<name>, <pipeline>, <options>)

.. list-table::
  :widths: 20 10 50 20
  :header-rows: 1

  * - Argument
    - Type
    - Necessity
    - Description

  * - ``name``
    - string
    - Required
    - Logical name for the stream processor. This must be unique
      within the {+spw+}. This name should contain only alphanumeric
      characters.

  * - ``pipeline``
    - array
    - Required
    - :ref:`Stream aggregation pipeline <atlas-sp-aggregation>` you
      want to apply to your streaming data.

  * - ``options``
    - object
    - Optional
    - Object defining various optional settings for your stream
      processor.

  * - ``options.dlq``
    - object
    - Conditional
    - Object assigning a 
      :term:`dead letter queue` for your {+spw+}. This field is 
      necessary if you define the ``options`` field.

  * - ``options.dlq.connectionName``
    - string
    - Conditional
    - Human-readable label that identifies a connection in your 
      connection registry. This connection must reference an 
      |service| {+cluster+}. This field is necessary if you define the
      ``options.dlq`` field.

  * - ``options.dlq.db``
    - string
    - Conditional
    - Name of an |service| database on the {+cluster+} specified 
      in ``options.dlq.connectionName``. This field is necessary if 
      you define the ``options.dlq`` field.

  * - ``options.dlq.coll``
    - string
    - Conditional
    - Name of a collection in the database specified in
      ``options.dlq.db``. This field is necessary if you 
      define the ``options.dlq`` field.
      
  * - ``options.tier``
    - string
    - Optional
    - The tier of the pod to which {+atlas-sp+} assigns the
      processor. If you do not declare this option,
      {+atlas-sp+} assigns the processor to a pod of the
      {+spw+}'s default tier. To learn more, see :ref:`Tiers
      <atlas-sp-architecture-tiers>`.        

.. procedure::
  :style: normal

  .. step:: Connect to your {+spw+}.
      
      Use the connection string associated with your {+spw+}
      to connect using {+mongosh+}.

      a. In the pane for your {+spw+}, click :guilabel:`Connect`.

      #. In the :guilabel:`Connect to your workspace` dialog, 
         select the :guilabel:`Shell` tab.

      #. Copy the connection string displayed in the dialog. It has
         the following format, where
         ``<atlas-stream-processing-url>`` is the URL of your {+spw+}
         and ``<username>`` is the username of a database user with
         the :atlasrole:`atlasAdmin` role:

         .. code-block:: sh

            mongosh "mongodb://<atlas-stream-processing-url>/" 
            --tls --authenticationDatabase admin --username <username>  
            --password <password>   

      #. Paste the connection string into your terminal and replace
         the ``<password>`` placeholder with the credentials for
         the user. Press Enter to run it to connect to your
         {+spw+}.

      .. example::

        The following command connects to a {+spw+} as a user named
        ``streamOwner`` using `x.509 <https://www.mongodb.com/docs/manual/core/security-x.509/>`_
        authentication.
        
        .. code-block:: sh

            mongosh "mongodb://atlas-stream-78xq9gi1v4b4288x06a73e9f-zi30g.virginia-usa.a.query.mongodb-qa.net/?authSource=%24external&authMechanism=MONGODB-X509" \\ 
            --tls --authenticationDatabase admin --username streamOwner

        Provide your user password when prompted.

  .. step:: Define a pipeline.

      In the {+mongosh+} prompt, assign an array containing the
      aggregation stages you want to apply to a variable named 
      ``pipeline``. 
      
      The following example pipeline uses the ``stuff`` topic in
      the  ``myKafka`` connection in the connection registry as the 
      :pipeline:`$source`, matches records where the ``temperature`` 
      field has a value of ``46`` and emits the processed messages to 
      the ``output`` topic of the ``mySink`` connection in 
      the connection registry:

      .. code-block:: sh

        pipeline = [
          {$source: {"connectionName": "myKafka", "topic": "stuff"}},
          {$match: { temperature: 46 }},
          {
            "$emit": {
              "connectionName": "mySink",
              "topic" : "output",
            }  
          }
        ]

  .. step:: (Optional) Define a :term:`DLQ <dead letter queue>`.

      In the {+mongosh+} prompt, assign an object containing the
      following properties of your DLQ:

      - Connection name
      - Database name
      - Collection name

      The following example defines a DLQ over the ``cluster01``
      connection, in the ``metadata.dlq`` database collection.

      .. code-block:: sh

        deadLetter = {
          dlq: {
            connectionName: "cluster01", 
            db: "metadata", 
            coll: "dlq"
          }
        }

  .. step:: Create a stream processor.

      The following command creates a stream processor named 
      ``proc01`` that applies the logic defined in ``pipeline``.
      Documents that throw errors in processing are written to the
      DLQ defined in ``deadLetter``.

      .. code-block:: sh
      
        sp.createStreamProcessor("proc01", pipeline, deadLetter)
