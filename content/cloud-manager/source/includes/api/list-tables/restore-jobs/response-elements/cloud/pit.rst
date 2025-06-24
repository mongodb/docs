.. list-table::
   :widths: 15 10 75
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``batchId``
     - string
     - Unique identifier of the :term:`batch` to which this restore
       job belongs. Returned if snapshot was from a sharded cluster.

   * - ``clusterId``
     - string
     - Unique identifier of the :manual:`cluster </reference/glossary/#std-term-cluster>` that the restore job
       represents. Returned if snapshot was from a replica set or
       :manual:`sharded cluster </reference/glossary/#std-term-sharded-cluster>`.

   * - ``created``
     - string
     - |iso8601-time| when the restore job was requested.

   * - ``delivery``
     - object
     - Method and details of how the restored :manual:`snapshot </reference/glossary/#std-term-snapshot>` data
       is delivered.

   * - | ``delivery``
       | ``.methodName``
     - string
     - Means by which the data is delivered. Returns ``HTTP``.

   * - | ``delivery``
       | ``.targetClusterId``
     - string
     - Unique identifier of the destination cluster to perform the
       restore job.

   * - | ``delivery``
       | ``.targetGroupId``
     - string
     - Unique identifier of the project that contains the
       destination cluster for the restore job.

   * - ``encryptionEnabled``
     - boolean
     - Flag indicating if the snapshot was encrypted.

   * - ``groupId``
     - string
     - Unique identifier of the :cloudmgr:`group </reference/glossary/#std-term-group>` that owns the restore
       job.

   * - ``hostId``
     - string
     - Unique identifier of the :manual:`config server </reference/glossary/#std-term-config-server>` to which this
       restore job belongs. Returned if  :manual:`config server </reference/glossary/#std-term-config-server>` was a
       |sccc|.

   * - ``id``
     - string
     - Unique identifier of the restore job.

   * - ``links``
     - object array
     - .. include:: /includes/api/links-explanation.rst

   * - ``masterKeyUUID``
     - string
     - |kmip| master key ID used to encrypt the :manual:`snapshot </reference/glossary/#std-term-snapshot>` data.
       Returned if ``"encryptionEnabled" : true``.

   * - ``pointInTime``
     - boolean
     - Flag indicating if the snapshot was from a point in time.

   * - ``snapshotId``
     - string
     - Unique identifier of the :manual:`snapshot </reference/glossary/#std-term-snapshot>` to restore.

   * - ``statusName``
     - string
     - Current status of the job. Accepted values are:

       - ``FINISHED``
       - ``IN_PROGRESS``
       - ``BROKEN``
       - ``KILLED``

   * - ``timestamp``
     - object
     - Timestamp of the Oplog entry when the snapshot was created.

   * - | ``timestamp``
       | ``.date``
     - string
     - |iso8601-time| of the latest oplog entry in the restored
       snapshot.

   * - | ``timestamp``
       | ``.increment``
     - string
     - Order of all operations completed at the latest oplog entry in
       the restored snapshot.
