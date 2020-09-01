.. list-table::
   :widths: 20 10 70
   :header-rows: 1

   * - Name
     - Type
     - Description
       
   * - ``batchId``
     - string
     - Unique identifier of the batch to which this restore job
       belongs.

       Only present for a restore of a sharded cluster.

   * - ``clusterId``
     - string
     - Unique identifier of the cluster the restore job
       represents.

       Only present for a restore of a cluster.

   * - ``created``
     - string
     - |iso8601-time| when the restore job was requested.

   * - ``delivery``
     - object
     - Method and details of how the restored snapshot data
       shall be delivered.

   * - ``delivery.expires``
     - string
     - |iso8601-time| after which the |url| is no longer available.

       Only present if ``"delivery.methodName" : "HTTP"``.

   * - ``delivery.expirationHours``
     - number
     - Number of hours the download |url| is valid once the restore
       job is complete.

       Only present if ``"delivery.methodName" : "HTTP"``.

   * - ``delivery.maxDownloads``
     - number
     - Number of times the download |url| can be used. This must be
       ``1`` or greater.

       Only present if ``"delivery.methodName" : "HTTP"``.

   * - ``delivery.methodName``
     - string
     - Means by which the data is delivered. Accepted values include:

       - ``HTTP``
       - ``QUERY``

   * - ``delivery.statusName``
     - string
     - Current status of the downloadable file. Accepted values
       include:

       - ``NOT_STARTED``
       - ``IN_PROGRESS``
       - ``READY``
       - ``FAILED``
       - ``INTERRUPTED``
       - ``EXPIRED``
       - ``MAX_DOWNLOADS_EXCEEDED``

   * - ``delivery.url``
     - string
     - |url| from which the restored snapshot data can be downloaded.

       Only present if ``"delivery.methodName" : "HTTP"``.

   * - ``encryptionEnabled``
     - boolean
     - Indicates whether the restored snapshot data is encrypted.

   * - ``groupId``
     - string
     - Unique identifier of the project that owns the restore job.

   * - ``hashes``
     - object array
     - If the corresponding ``delivery.url`` has been downloaded,
       each document in this array is a mapping of a restore file to
       a hashed checksum. This array is present *only after* the
       file is downloaded.

       .. note::
          For an ``HTTP`` restore, this array only contains a single
          object that represents the hash of the ``.tar.gz`` file.

   * - ``hashes.typeName``
     - string
     - Hashing algorithm used to compute the hash value. If
       present, this value is ``SHA1``.

   * - ``hashes.fileName``
     - string
     - Name of the file that has been hashed.

   * - ``hashes.hash``
     - string
     - Hash of the file.
       
   * - ``id``
     - string
     - Unique identifier of the restore job.

   * - ``links``
     - document array
     - One or more links to sub-resources and/or related resources. The
       relations between URLs are explained in the `Web Linking Specification
       <http://tools.ietf.org/html/rfc5988>`_

   * - ``masterKeyUUID``
     - string
     - |kmip| master key ID used to encrypt the snapshot data.

       Only if ``encryptionEnabled`` is true for the snapshot.

   * - ``snapshotId``
     - string
     - Unique identifier of the snapshot to restore.

   * - ``statusName``
     - string
     - Current status of the job. Accepted values include:

       - ``FINISHED``
       - ``IN_PROGRESS``
       - ``BROKEN``
       - ``KILLED``

   * - ``timestamp``
     - object
     - Timestamp of the Oplog entry when the snapshot was created.

   * - ``timestamp.date``
     - string
     - |iso8601-time| of the latest oplog entry in the restored
       snapshot.

   * - ``timestamp.increment``
     - string
     - Order of all operations completed at the latest oplog entry in
       the restored snapshot.
