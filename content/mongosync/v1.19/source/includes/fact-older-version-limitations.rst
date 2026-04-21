- The source cluster cannot have :term:`orphaned documents <orphaned document>`.
  To clean up any orphaned documents, run the 
  :dbcommand:`cleanupOrphaned` command on the ``mongod`` instances on every 
  shard's primary node on their source cluster. Wait for this command to 
  complete with a status ``{ok:1}`` before starting the migration.

- Writes that produce :term:`DDL <DDL (Data Definition Language)>` events cannot 
  occur on the source cluster during the migration. The following events cannot 
  occur: 
  
  - ``collMod``
  - ``create``
  - ``createIndexes``
  - ``drop``
  - ``dropDatabase``
  - ``dropIndexes``
  - ``refineCollectionShardKey``  
  - ``rename``
  - ``reshardCollection``
  - ``shardCollection``

  This includes operations that may create new collections such as 
  :dbcommand:`mapReduce`, :pipeline:`$out`, and :pipeline:`$merge`. This also 
  includes collections created implicitly from inserts. Only writes that produce 
  CRUD events can occur during the migration.

  .. note:: 
   
     Writes that produce DDL events on source collections outside of the 
     :ref:`namespace filter <c2c-filtered-sync>` are allowed.

- ``geoHaystack`` indexes are not supported.

- :ref:`/reverse <c2c-api-reverse>` endpoint is not supported. You can't 
  enable the ``reversible`` option in the :ref:`/start <c2c-api-start>` request.

- You can't set the ``enableUserWriteBlocking`` option to
  ``"sourceAndDestination"`` in the ``/start`` request, so dual write-blocking 
  is not supported. 
  Destination-only write-blocking is supported. Ensure that no writes are 
  made to the source cluster after you call the ``/commit`` endpoint.

- You can't enable the ``createSupportingIndexes`` :ref:`sharding parameter 
  <c2c-api-start-sharding>`. Instead, create an index to support your shard key 
  on the source cluster. 

- If there are any indexes with inconsistent specs or that are missing on one or 
  more shards, ``mongosync`` returns an error. To check for index 
  inconsistencies, see :ref:`manage-indexes-find-inconsistent-indexes`.