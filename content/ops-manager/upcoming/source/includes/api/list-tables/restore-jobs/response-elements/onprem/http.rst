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
       | ``.authBearer``
     - string
     - Authorization bearer for requests to ``urlV2``. Value must  
       be ``Bearer``. 

   * - | ``delivery``
       | ``.authHeader``
     - string
     - Authorization header for requests to ``urlV2``. Value must 
       be ``Authorization``.

   * - | ``delivery``
       | ``.authValue``
     - string
     - Value for the bearer for requests to ``urlV2``. The 
       ``authValue`` for the bearer must be the token value.

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
     - |url| from which the restored :manual:`snapshot </reference/glossary/#std-term-snapshot>` data can be
       downloaded.

   * - | ``delivery``
       | ``.urlV2``
     - string
     - |url| from which the restored :manual:`snapshot </reference/glossary/#std-term-snapshot>` data can be
       securely downloaded. Requests to this |url| must include the 
       ``authHeader``, ``authBearer``, and ``authValue`` in the HTTP 
       request header. The request header for securely downloading 
       from ``urlv2`` must be in the following format:

       .. code-block:: sh 
          :copyable: false

          "<authHeader>:<authBearer> <authValue>" <urlV2>

       For example:

       .. code-block:: sh 
          :copyable: false

          curl -H "Authorization: Bearer {AUTH-TOKEN}" \
              https://{OPSMANAGER-HOST}:{PORT}/backup/restore/v3/pull/{restoreJobId}/{filename}"

   * - ``groupId``
     - string
     - Unique identifier of the :opsmgr:`group </reference/glossary/#std-term-group>` that owns the restore
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
     - Unique identifier of the :manual:`config server </reference/glossary/#std-term-config-server>` to which this
       restore job belongs. Returned if :manual:`config server </reference/glossary/#std-term-config-server>` was a
       |sccc|.

   * - ``id``
     - string
     - Unique identifier of the restore job.

   * - ``links``
     - array of objects
     - .. include:: /includes/api/links-explanation.rst

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
