.. list-table::
   :widths: 20 20 60
   :header-rows: 1

   * - Name
     - Type
     - Description

   * - ``clusterId``
     - :ref:`objectId <document-bson-type-object-id>`
     - ID of the cluster the snapshot represents. 

   * - ``complete``
     - boolean
     - Indicator that the snapshot has been created. This is false if
       the snapshot creation job is still in progress.

   * - ``created``
     - document
     - The components of a :ref:`timestamp <document-bson-type-timestamp>`.

   * - ``created.date``
     - timestamp
     - The exact point in time when the snapshot was taken in 
       `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`_ 
       date and time format at :abbr:`UTC (Coordinated Universal Time)`.

   * - ``created.increment``
     - integer
     - The operation order in which this snapshot took place at this
       exact point in time. To learn how timestamps work in MongoDB,
       see :ref:`document-bson-type-timestamp`.

   * - ``doNotDelete``
     - boolean
     - Indicator that the snapshot cannot be deleted.

   * - ``expires``
     - timestamp
     - The date after which this snapshot can be deleted in 
       `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`_ 
       date and time format at :abbr:`UTC (Coordinated Universal Time)`.

   * - ``groupId``
     - objectId
     - ID of the group that owns the snapshot.

   * - ``id``
     - objectId
     - ID of the :term:`snapshot`.

   * - ``isPossiblyInconsistent``
     - boolean
     - Indicator of the consistency of this snapshot. 

       .. note::
          This appears for :term:`sharded cluster` snapshots only.

       To take a snapshot of a sharded cluster in a consistent state,
       the backup agent temporarily turns off the balancer before
       creating the snapshot. In some cases, it cannot turn off the
       balancer in a timely manner. The snapshot is then created with
       the balancer still running.

       If this happens, the snapshot may be in an inconsistent state
       (e.g., chunk migrations may be in progress).

   * - ``links``
     - document array
     - See `Response Links`_.

   * - ``missingShards``
     - document array
     - List of shards that the snapshot is missing. 

       .. note::
          This appears for :term:`sharded cluster` snapshots only.

       In steady state, this array is empty. If the :term:`backup
       agent` cannot connect to a shard when a snapshot is created, the
       shard is omitted from the snapshot. Each document in the array
       is a **cluster** document containing a ``self`` link.

   * - ``missingShards.id``
     - objectId
     - ID of the missing shard.

   * - ``missingShards.groupId``
     - objectId
     - ID of the group that owns the missing shard.

   * - ``missingShards.typeName``
     - string
     - The type of server that the missing shard represents:

       - ``CONFIG_SERVER_REPLICA_SET``
       - ``REPLICA_SET``

   * - ``missingShards.clusterName``
     - string
     - The name of the cluster for the missing shard. 

   * - ``missingShards.shardName``
     - string
     - The name of the missing shard. 

   * - ``missingShards.replicaSetName``
     - string
     - Name of the replica set in the missing shard.

   * - ``missingShards.lastHeartbeat``
     - timestamp
     - The exact point in time when the last heartbeat was received.

   * - ``parts``
     - document array
     - The individual parts that comprise the complete snapshot. 
       
       - For a replica set, this array contains a single document. 
       - For a sharded cluster, this array contains one document for
         each shard plus one document for the config server.

   * - ``parts.clusterId``
     - objectId
     - ID of the replica set. 

   * - ``parts.compressionSetting``
     - string
     - Method of compression for the snapshot. 

   * - ``parts.dataSizeBytes``
     - number
     - The total size of the data in the snapshot in bytes.

   * - ``parts.encryptionEnabled``
     - boolean
     - Indicator of the state of encryption of the snapshot data.

   * - ``parts.fileSizeBytes``
     - number
     - The total size of the data files in bytes.

   * - ``parts.masterKeyUUID``
     - objectId
     - The KMIP master key ID used to encrypt the snapshot data. 

       .. note::
          This appears only if this snapshot has
          ``parts.encryptionEnabled : true``.

   * - ``parts.mongodVersion``
     - string
     - The version of ``mongod`` that was running when the snapshot was
       created.

   * - ``parts.replicaSetName``
     - string
     - Name of the replica set.

   * - ``parts.storageSizeBytes``
     - number
     - The total size of space allocated for document storage.

   * - ``parts.typeName``
     - string
     - The type of server that the part represents:

       - ``REPLICA_SET``
       - ``CONFIG_SERVER_REPLICA_SET``