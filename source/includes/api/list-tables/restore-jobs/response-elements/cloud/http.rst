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
     - Unique identifier of the :term:`cluster` that the restore job
       represents. Returned if snapshot was from a replica set or
       :term:`sharded cluster`.

   * - ``created``
     - string
     - |iso8601-time| when the restore job was requested.

   * - ``delivery``
     - object
     - Method and details of how the restored :term:`snapshot` data
       is delivered.

   * - | ``delivery``
       | ``.expirationHours``
     - number
     - Number of hours the download |url| is valid once the restore
       job is complete.

   * - | ``delivery``
       | ``.expires``
     - string
     - |iso8601-time| after which the |url| is no longer available.

   * - | ``delivery``
       | ``.maxDownloads``
     - number
     - Number of times the download |url| can be used. This must be
       ``1`` or greater.

   * - | ``delivery``
       | ``.methodName``
     - string
     - Means by which the data is delivered. Returns ``HTTP``.

   * - | ``delivery``
       | ``.statusName``
     - string
     - Current status of the downloadable file. Accepted values are:

       - ``NOT_STARTED``
       - ``IN_PROGRESS``
       - ``READY``
       - ``FAILED``
       - ``INTERRUPTED``
       - ``EXPIRED``
       - ``MAX_DOWNLOADS_EXCEEDED``

   * - | ``delivery``
       | ``.url``
     - string
     - |url| from which the restored :term:`snapshot` data can be
       downloaded.

   * - ``encryptionEnabled``
     - boolean
     - Flag indicating if the snapshot was encrypted.

   * - ``groupId``
     - string
     - Unique identifier of the :term:`group` that owns the restore
       job.

   * - ``hashes``
     - array of objects
     - If the corresponding ``delivery.url`` has been downloaded, this
       array returns a single object that represents the hash of
       the ``.tar.gz`` file.

   * - | ``hashes``
       | ``.fileName``
     - string
     - Name of the snapshot file that has been hashed.

   * - | ``hashes``
       | ``.hash``
     - string
     - Hash of the snapshot file.

   * - | ``hashes``
       | ``.typeName``
     - string
     - Hashing algorithm used to compute the hash value. If returned,
       value is set to ``SHA1``.

   * - ``hostId``
     - string
     - Unique identifier of the :term:`config server` to which this
       restore job belongs. Returned if  :term:`config server` was a
       |sccc|.

   * - ``id``
     - string
     - Unique identifier of the restore job.

   * - ``links``
     - array of objects
     - .. include:: /includes/api/links-explanation.rst

   * - ``masterKeyUUID``
     - string
     - |kmip| master key ID used to encrypt the :term:`snapshot` data.
       Returned if ``"encryptionEnabled" : true``.

   * - ``pointInTime``
     - boolean
     - Flag indicating if the snapshot was from a point in time.

   * - ``snapshotId``
     - string
     - Unique identifier of the :term:`snapshot` to restore.

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
