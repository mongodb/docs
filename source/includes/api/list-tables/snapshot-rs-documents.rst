.. list-table::
   :widths: 15 10 75
   :header-rows: 1
   :stub-columns: 1

   * - ``Name``
     - Type
     - Description

   * - ``clusterId``
     - string
     - Unique identifier of the cluster the :term:`snapshot`
       represents.

   * - ``complete``
     - boolean
     - Flag that indicates the :term:`snapshot` has been created. This
       is ``false`` if the snapshot creation job is still in progress.

   * - ``created``
     - document
     - Components of a :ref:`timestamp <document-bson-type-timestamp>`.

   * - | ``created``
       | ``.date``
     - timestamp
     - iso8601-time when the :term:`snapshot` was taken.

   * - | ``created``
       | ``.increment``
     - integer
     - Operation order in which this :term:`snapshot` took place at
       this exact point in time. To learn how timestamps work in
       MongoDB, see :ref:`document-bson-type-timestamp`.

   * - ``doNotDelete``
     - boolean
     - Flag that indicates the :term:`snapshot` cannot be deleted.

   * - ``expires``
     - timestamp
     - |iso8601-time| at |utc| after which this :term:`snapshot` can be
       deleted.

       If ``doNotDelete`` is set to ``true``, any value in ``expires``
       is removed.

       If the ``expires`` value is earlier than the current date and
       time, it cannot be edited.

   * - ``groupId``
     - string
     - Unique identifier of the :term:`project` that owns the
       :term:`snapshot`.

   * - ``id``
     - string
     - Unique identifier of the :term:`snapshot`.

   * - | ``isPossibly``
       | ``Inconsistent``
     - boolean
     - Flag that indicates the consistency of this :term:`snapshot`.

       .. note::
          This appears for :term:`sharded cluster` snapshots only.

       To take a snapshot of a :term:`sharded cluster` in a consistent
       state, the {+bagent+} temporarily turns off the
       balancer before creating the :term:`snapshot`. In some cases, it
       cannot turn off the balancer in a timely manner. The snapshot is
       then created with the balancer still running.

       If this happens, the snapshot may be in an inconsistent state
       (e.g., chunk migrations may be in progress).

   * - | ``lastOplog``
       | ``AppliedTimestamp``
     - document
     - Components of the
       :ref:`timestamp <document-bson-type-timestamp>`  of the last
       oplog entry was applied.

   * - | ``lastOplog``
       | ``AppliedTimestamp``
       | ``.date``
     - timestamp
     - |iso8601-time| at |utc| when the last :term:`oplog` was applied.

   * - | ``lastOplog``
       | ``AppliedTimestamp``
       | ``.increment``
     - integer
     - Operation order in which last :term:`oplog` was applied at
       this exact point in time. To learn how timestamps work in
       MongoDB, see :ref:`document-bson-type-timestamp`.

   * - ``links``
     - object array
     - .. include:: /includes/api/links-explanation.rst

   * - ``namespaceFilterList``
     - object
     - :term:`namespaces <namespace>` that are included or excluded
       from this :term:`snapshot`.

   * - | ``namespaceFilterList``
       | ``.filterList``
     - string array
     - Comma-separated list of any combination of databases or
       :term:`namespaces <namespace>` that are exclusively included or
       explicitly excluded from the snapshot.

       The default value is an empty array (``[]``).

   * - | ``namespaceFilterList``
       | ``.filterType``
     - string
     - Label that determines how :term:`namespaces <namespace>` are
       filtered for this snapshot.

       - If this value is set to ``blacklist``, namespaces in
         ``namespaceFilterList.filterList`` are excluded from the
         snapshot.
       - If this value is set to ``whitelist``, only namespaces in
         ``namespaceFilterList.filterList`` are included in the
         snapshot.

       The default value is ``blacklist``.

   * - ``missingShards``
     - array of objects
     - List of shards that the :term:`snapshot` is missing.

       .. note::
          This appears for :term:`sharded cluster` snapshots only.

       In steady state, this array is empty. If the {+bagent+} cannot
       connect to a shard when a :term:`snapshot` is created, the shard
       is omitted from the snapshot. Each :term:`document` in the array
       is a **cluster** document containing a ``self`` link.

   * - | ``missingShards``
       | ``.id``
     - string
     - Unique identifier of the missing :term:`shard`.

   * - | ``missingShards``
       | ``.groupId``
     - string
     - Unique identifier of the project that owns the missing
       :term:`shard`.

   * - | ``missingShards``
       | ``.typeName``
     - string
     - Type of server that the missing :term:`shard` represents:

       - ``CONFIG_SERVER_REPLICA_SET``
       - ``REPLICA_SET``

   * - | ``missingShards``
       | ``.clusterName``
     - string
     - Name of the cluster for the missing :term:`shard`.

   * - | ``missingShards``
       | ``.shardName``
     - string
     - Name of the missing :term:`shard`.

   * - | ``missingShards``
       | ``.replicaSetName``
     - string
     - Name of the replica set in the missing :term:`shard`.

   * - | ``missingShards``
       | ``.lastHeartbeat``
     - timestamp
     - |iso8601-time| at |utc| when the last heartbeat was received
       from the missing :term:`shard`.

   * - ``parts``
     - array of objects
     - Individual parts that comprise the complete :term:`snapshot`.

       - For a :term:`replica set`, this array contains a single
         document.
       - For a :term:`sharded cluster`, this array contains one
         document for each shard plus one document for the
         :term:`config server`.

   * - | ``parts``
       | ``.clusterId``
     - string
     - Unique identifier of the :term:`replica set`.

   * - | ``parts``
       | ``.compressionSetting``
     - string
     - Method of compression for the :term:`snapshot`.

   * - | ``parts``
       | ``.dataSizeBytes``
     - number
     - Total size of the data in the :term:`snapshot` in bytes.

   * - | ``parts``
       | ``.encryptionEnabled``
     - boolean
     - Indicator of the state of encryption of the :term:`snapshot`
       data.

   * - | ``parts``
       | ``.fileSizeBytes``
     - number
     - Total size of the data files in bytes.

   * - | ``parts``
       | ``.masterKeyUUID``
     - string
     - |kmip| master key ID used to encrypt the :term:`snapshot` data.

       .. note::
          This appears only if this snapshot has
          ``parts.encryptionEnabled : true``.

   * - | ``parts``
       | ``.mongodVersion``
     - string
     - Version of |mongod| that the :term:`replica set`
       :term:`primary` was running when the :term:`snapshot` was
       created.

   * - | ``parts``
       | ``.replicaSetName``
     - string
     - Name of the :term:`replica set`.

   * - | ``parts``
       | ``.storageSizeBytes``
     - number
     - Total size of space allocated for document storage.

   * - | ``parts``
       | ``.typeName``
     - string
     - Type of server that the part represents:

       - ``REPLICA_SET``
       - ``CONFIG_SERVER_REPLICA_SET``
