.. list-table::
   :widths: 15 10 75
   :header-rows: 1
   :stub-columns: 1

   * - ``Name``
     - Type
     - Description

   * - ``clusterId``
     - string
     - Unique identifier of the cluster the :manual:`snapshot </reference/glossary/#std-term-snapshot>`
       represents.

   * - ``clusterName``
     - string
     - Label that identifies the cluster.

   * - ``complete``
     - boolean
     - Flag that indicates the :manual:`snapshot </reference/glossary/#std-term-snapshot>` has been created. This
       is ``false`` if the snapshot creation job is still in progress.

   * - ``created``
     - document
     - Components of a :ref:`timestamp <document-bson-type-timestamp>`.

   * - | ``created``
       | ``.date``
     - timestamp
     - iso8601-time when the :manual:`snapshot </reference/glossary/#std-term-snapshot>` was taken.

   * - | ``created``
       | ``.increment``
     - integer
     - Operation order in which this :manual:`snapshot </reference/glossary/#std-term-snapshot>` took place at
       this exact point in time. To learn how timestamps work in
       MongoDB, see :ref:`document-bson-type-timestamp`.

   * - ``doNotDelete``
     - boolean
     - Flag that indicates the :manual:`snapshot </reference/glossary/#std-term-snapshot>` cannot be deleted.

   * - ``expires``
     - timestamp
     - |iso8601-time| at |utc| after which this :manual:`snapshot </reference/glossary/#std-term-snapshot>` can be
       deleted.

       If ``doNotDelete`` is set to ``true``, any value in ``expires``
       is removed.

       If the ``expires`` value is earlier than the current date and
       time, it cannot be edited.

   * - ``groupId``
     - string
     - Unique identifier of the :opsmgr:`project </reference/glossary/#std-term-project>` that owns the
       :manual:`snapshot </reference/glossary/#std-term-snapshot>`.

   * - ``id``
     - string
     - Unique identifier of the :manual:`snapshot </reference/glossary/#std-term-snapshot>`.

   * - | ``isPossibly``
       | ``Inconsistent``
     - boolean
     - Flag that indicates the consistency of this :manual:`snapshot </reference/glossary/#std-term-snapshot>`. 
       ``isPossiblyInconsistent`` appears for
       :manual:`sharded cluster </reference/glossary/#std-term-sharded-cluster>` snapshots only.

       To take a snapshot of a :manual:`sharded cluster </reference/glossary/#std-term-sharded-cluster>` in a consistent
       state, the {+bagent+} temporarily turns off the
       balancer before creating the :manual:`snapshot </reference/glossary/#std-term-snapshot>`. In some cases, it
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
     - |iso8601-time| at |utc| when the last :manual:`oplog </reference/glossary/#std-term-oplog>` was applied.

   * - | ``lastOplog``
       | ``AppliedTimestamp``
       | ``.increment``
     - integer
     - Operation order in which last :manual:`oplog </reference/glossary/#std-term-oplog>` was applied at
       this exact point in time. To learn how timestamps work in
       MongoDB, see :ref:`document-bson-type-timestamp`.

   * - ``links``
     - object array
     - .. include:: /includes/api/links-explanation.rst

   * - ``namespaceFilterList``
     - object
     - :manual:`namespaces  </reference/glossary/#std-term-namespace>` that are included or excluded
       from this :manual:`snapshot </reference/glossary/#std-term-snapshot>`.

   * - | ``namespaceFilterList``
       | ``.filterList``
     - string array
     - Comma-separated list of any combination of databases or
       :manual:`namespaces  </reference/glossary/#std-term-namespace>` that are exclusively included or
       explicitly excluded from the snapshot.

       The default value is an empty array (``[]``).

   * - | ``namespaceFilterList``
       | ``.filterType``
     - string
     - Label that determines how :manual:`namespaces  </reference/glossary/#std-term-namespace>` are
       filtered for this snapshot.

       - If this value is set to ``denylist``, namespaces in
         ``namespaceFilterList.filterList`` are excluded from the
         snapshot.
       - If this value is set to ``accessList``, only namespaces in
         ``namespaceFilterList.filterList`` are included in the
         snapshot.

       The default value is ``denylist``.

   * - ``missingShards``
     - array of objects
     - List of shards that the :manual:`snapshot </reference/glossary/#std-term-snapshot>` is missing. ``missingShards`` appears for 
       :manual:`sharded cluster </reference/glossary/#std-term-sharded-cluster>` snapshots only.

       In steady state, this array is empty. If the {+bagent+} cannot
       connect to a shard when a :manual:`snapshot </reference/glossary/#std-term-snapshot>` is created, the shard
       is omitted from the snapshot. Each :term:`document` in the array
       is a **cluster** document containing a ``self`` link.

   * - | ``missingShards``
       | ``.id``
     - string
     - Unique identifier of the missing :manual:`shard </reference/glossary/#std-term-shard>`.

   * - | ``missingShards``
       | ``.groupId``
     - string
     - Unique identifier of the project that owns the missing
       :manual:`shard </reference/glossary/#std-term-shard>`.

   * - | ``missingShards``
       | ``.typeName``
     - string
     - Type of server that the missing :manual:`shard </reference/glossary/#std-term-shard>` represents:

       - ``CONFIG_SERVER_REPLICA_SET``
       - ``REPLICA_SET``
       - ``CONFIG_SHARD_REPLICA_SET``

   * - | ``missingShards``
       | ``.clusterName``
     - string
     - Name of the cluster for the missing :manual:`shard </reference/glossary/#std-term-shard>`.

   * - | ``missingShards``
       | ``.shardName``
     - string
     - Name of the missing :manual:`shard </reference/glossary/#std-term-shard>`.

   * - | ``missingShards``
       | ``.replicaSetName``
     - string
     - Name of the replica set in the missing :manual:`shard </reference/glossary/#std-term-shard>`.

   * - | ``missingShards``
       | ``.lastHeartbeat``
     - timestamp
     - |iso8601-time| at |utc| when the last heartbeat was received
       from the missing :manual:`shard </reference/glossary/#std-term-shard>`.

   * - ``parts``
     - array of objects
     - Individual parts that comprise the complete :manual:`snapshot </reference/glossary/#std-term-snapshot>`.

       - For a :manual:`replica set </reference/glossary/#std-term-replica-set>`, this array contains a single
         document.
       - For a :manual:`sharded cluster </reference/glossary/#std-term-sharded-cluster>`, this array contains one
         document for each shard plus one document for the
         :manual:`config server </reference/glossary/#std-term-config-server>`.

   * - | ``parts``
       | ``.clusterId``
     - string
     - Unique identifier of the :manual:`replica set </reference/glossary/#std-term-replica-set>`.

   * - | ``parts``
       | ``.completedTime``
     - string
     - Date and time when the snapshot completed.

   * - | ``parts``
       | ``.compressionSetting``
     - string
     - Method of compression for the :manual:`snapshot </reference/glossary/#std-term-snapshot>`.

   * - | ``parts``
       | ``.dataSizeBytes``
     - number
     - Total size of the data in the :manual:`snapshot </reference/glossary/#std-term-snapshot>` in bytes.

   * - | ``parts``
       | ``.encryptionEnabled``
     - boolean
     - Indicator of the state of encryption of the :manual:`snapshot </reference/glossary/#std-term-snapshot>`
       data.

   * - | ``parts``
       | ``.fcv``
     - string
     - Number that indicates the feature compatibility version of
       MongoDB that the replica set primary ran when MongoDB Cloud
       created the snapshot.

   * - | ``parts``
       | ``.fileSizeBytes``
     - number
     - Total size of the data files in bytes.

   * - | ``parts``
       | ``.machineId``
     - string
     - Hostname and port that indicate the node on which MongoDB Cloud created the snapshot.

   * - | ``parts``
       | ``.masterKeyUUID``
     - string
     - |kmip| master key ID used to encrypt the :manual:`snapshot </reference/glossary/#std-term-snapshot>` data. 
       ``parts.masterKeyUUID`` appears only if this snapshot has
       ``parts.encryptionEnabled : true``.

   * - | ``parts``
       | ``.mongodVersion``
     - string
     - Version of |mongod| that the :manual:`replica set </reference/glossary/#std-term-replica-set>`
       :manual:`primary </reference/glossary/#std-term-primary>` was running when the :manual:`snapshot </reference/glossary/#std-term-snapshot>` was
       created.

   * - | ``parts``
       | ``.replicaSetName``
     - string
     - Name of the :manual:`replica set </reference/glossary/#std-term-replica-set>`.

   * - | ``parts``
       | ``.replicaState``
     - string
     - The node's role at the time when snapshot process began.

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
       - ``CONFIG_SHARD_REPLICA_SET``
