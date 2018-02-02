.. list-table::
   :widths: 20 20 60
   :header-rows: 1

   * - Name
     - Type
     - Description

   * - clusterId
     - :ref:`objectId <document-bson-type-object-id>`
     - ID of the cluster the :term:`snapshot` represents.

   * - complete
     - boolean
     - Indicator that the :term:`snapshot` has been created. This is
       ``false`` if the snapshot creation job is still in progress.

   * - created
     - document
     - The components of a :ref:`timestamp <document-bson-type-timestamp>`.

   * - created.date
     - timestamp
     - The exact point in time when the :term:`snapshot` was taken in
       `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`_
       date and time format at :abbr:`UTC (Coordinated Universal Time)`.

   * - created.increment
     - integer
     - The operation order in which this :term:`snapshot` took place at
       this exact point in time. To learn how timestamps work in
       MongoDB, see :ref:`document-bson-type-timestamp`.

   * - doNotDelete
     - boolean
     - Indicator that the :term:`snapshot` cannot be deleted.

   * - expires
     - timestamp
     - The date in `ISO 8601
       <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`_ date
       and time format at :abbr:`UTC (Coordinated Universal Time)` after
       which this :term:`snapshot` can be deleted.

       If ``doNotDelete`` is set to ``true``, any value in ``expires``
       is removed.

       If the ``expires`` value is earlier than the current date and
       time, it cannot be edited.

   * - groupId
     - objectId
     - ID of the :term:`group` that owns the :term:`snapshot`.

   * - id
     - objectId
     - ID of the :term:`snapshot`.

   * - isPossiblyInconsistent
     - boolean
     - Indicator of the consistency of this :term:`snapshot`.

       .. note::
          This appears for :term:`sharded cluster` snapshots only.

       To take a snapshot of a :term:`sharded cluster` in a consistent
       state, the :term:`Backup Agent` temporarily turns off the
       balancer before creating the :term:`snapshot`. In some cases, it
       cannot turn off the balancer in a timely manner. The snapshot is
       then created with the balancer still running.

       If this happens, the snapshot may be in an inconsistent state
       (e.g., chunk migrations may be in progress).

   * - lastOplogAppliedTimestamp
     - document
     - The components of the
       :ref:`timestamp <document-bson-type-timestamp>`  of the last
       oplog entry was applied.

   * - lastOplogAppliedTimestamp.date
     - timestamp
     - The exact point in time when the last :term:`oplog` was applied
       in `ISO 8601
       <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`_ date
       and time format at :abbr:`UTC (Coordinated Universal Time)`.

   * - lastOplogAppliedTimestamp.increment
     - integer
     - The operation order in which last :term:`oplog` was applied at
       this exact point in time. To learn how timestamps work in
       MongoDB, see :ref:`document-bson-type-timestamp`.

   * - links
     - object array
     - .. include:: /includes/api/links-explanation.rst

   * - namespaceFilterList
     - object array
     - The :term:`namespaces <namespace>` that are included or excluded
       from this :term:`snapshot`.

   * - namespaceFilterList.filterList
     - string array
     - A comma-separated list of any combination of databases or
       :term:`namespaces <namespace>` that are exclusively included or
       explicitly excluded from the snapshot.

       The default value is an empty array (``[]``).

   * - namespaceFilterList.filterType
     - string
     - A value that determines how :term:`namespaces <namespace>` are
       filtered for this snapshot.

       - If this value is set to ``blacklist``, namespaces in
         ``namespaceFilterList.filterList`` are excluded from the
         snapshot.
       - If this value is set to ``whitelist``, only namespaces in
         ``namespaceFilterList.filterList`` are included in the
         snapshot.

       The default value is ``blacklist``.

   * - missingShards
     - object array
     - List of shards that the :term:`snapshot` is missing.

       .. note::
          This appears for :term:`sharded cluster` snapshots only.

       In steady state, this array is empty. If the :term:`Backup Agent`
       cannot connect to a shard when a :term:`snapshot` is created, the
       shard is omitted from the snapshot. Each :term:`document` in the
       array is a **cluster** document containing a ``self`` link.

   * - missingShards.id
     - objectId
     - ID of the missing :term:`shard`.

   * - missingShards.groupId
     - objectId
     - ID of the group that owns the missing :term:`shard`.

   * - missingShards.typeName
     - string
     - The type of server that the missing :term:`shard` represents:

       - ``CONFIG_SERVER_REPLICA_SET``
       - ``REPLICA_SET``

   * - missingShards.clusterName
     - string
     - The name of the cluster for the missing :term:`shard`.

   * - missingShards.shardName
     - string
     - The name of the missing :term:`shard`.

   * - missingShards.replicaSetName
     - string
     - Name of the replica set in the missing :term:`shard`.

   * - missingShards.lastHeartbeat
     - timestamp
     - The exact point in time in
       `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`_
       date and time format at :abbr:`UTC (Coordinated Universal Time)` when the last heartbeat was received from
       the missing :term:`shard`.

   * - parts
     - object array
     - The individual parts that comprise the complete :term:`snapshot`.

       - For a :term:`replica set`, this array contains a single
         document.
       - For a :term:`sharded cluster`, this array contains one document
         for each shard plus one document for the :term:`config server`.

   * - parts.clusterId
     - objectId
     - ID of the :term:`replica set`.

   * - parts.compressionSetting
     - string
     - Method of compression for the :term:`snapshot`.

   * - parts.dataSizeBytes
     - number
     - The total size of the data in the :term:`snapshot` in bytes.

   * - parts.encryptionEnabled
     - boolean
     - Indicator of the state of encryption of the :term:`snapshot`
       data.

   * - parts.fileSizeBytes
     - number
     - The total size of the data files in bytes.

   * - parts.masterKeyUUID
     - objectId
     - The :abbr:`KMIP (Key Management Interoperability Protocol)`
       master key ID used to encrypt the :term:`snapshot` data.

       .. note::
          This appears only if this snapshot has
          ``parts.encryptionEnabled : true``.

   * - parts.mongodVersion
     - string
     - The version of ``mongod`` that the :term:`replica set`
       :term:`primary` was running when the :term:`snapshot` was
       created.

   * - parts.replicaSetName
     - string
     - Name of the :term:`replica set`.

   * - parts.storageSizeBytes
     - number
     - The total size of space allocated for document storage.

   * - parts.typeName
     - string
     - The type of server that the part represents:

       - ``REPLICA_SET``
       - ``CONFIG_SERVER_REPLICA_SET``
