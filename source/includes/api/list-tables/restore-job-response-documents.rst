.. list-table::
   :widths: 15 15 70
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - batchId
     - string
     - ID of the :term:`batch` to which this restore job belongs.

       Only present for a restore of a :term:`sharded cluster`.

   * - clusterId
     - string
     - ID of the :term:`cluster` represented by the restore job.

       Only present for a restore of a :term:`cluster`.

   * - created
     - timestamp
     - The exact point in time when the restore job was requested in
       `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`_
       date and time format in :abbr:`UTC (Coordinated Universal Time)`.

   * - delivery
     - object
     - The method and details of how the restored :term:`snapshot` data
       shall be delivered.

   * - delivery.expires
     - timestamp
     - Date after which the :abbr:`URL (Uniform Resource Locator)` is no
       longer available.

       Only present if ``"delivery.methodName" : "HTTP"``.

   * - delivery.expirationHours
     - number
     - The number of hours the download :abbr:`URL (Uniform Resource
       Locator)` is valid once the restore job is complete.

       Only present if ``"delivery.methodName" : "HTTP"``.

   * - delivery.formatName
     - string
     - Format in which data from an :abbr:`SCP (secure copy)` restore
       should be written to the destination. Value may be one of the
       following:

       - ``ARCHIVE``
       - ``INDIVIDUAL``

       Only present if ``"delivery.methodName" : "SCP"``.

   * - delivery.hostname
     - string
     - Hostname of the server to which the data should be written
       for an SCP restore.

       Only present if ``"delivery.methodName" : "SCP"``.

   * - delivery.maxDownloads
     - number
     - The number of times the download :abbr:`URL (Uniform Resource
       Locator)` can be used. This must be ``1`` or greater.

       Only present if ``"delivery.methodName" : "HTTP"``.

   * - delivery.methodName
     - string
     - How the data will be delivered. Value may be one of the
       following:

       - ``HTTP``
       - ``QUERY``
       - ``SCP``

       .. include:: /includes/note-scp-deprecation.rst

   * - delivery.port
     - number
     - Port to use for ``SCP``.

       Only present if ``"delivery.methodName" : "SCP"``.

   * - delivery.statusName
     - string
     - Current status of the downloadable file. Value may be one
       of the following:

       - ``NOT_STARTED``
       - ``IN_PROGRESS``
       - ``READY``
       - ``FAILED``
       - ``INTERRUPTED``
       - ``EXPIRED``
       - ``MAX_DOWNLOADS_EXCEEDED``

   * - delivery.targetDirectory
     - string
     - Target directory to which the data should be written for an
       SCP restore.

       Only present if ``"delivery.methodName" : "SCP"``.

   * - delivery.url
     - string
     - The :abbr:`URL (Uniform Resource Locator)` from which the
       restored :term:`snapshot` data can be downloaded.

       Only present if ``"delivery.methodName" : "HTTP"``.

   * - encryptionEnabled
     - boolean
     - Indicates whether the restored :term:`snapshot` data is
       encrypted.

   * - groupId
     - string
     - ID of the :term:`group` that owns the restore job.

   * - hashes
     - object array
     - If the corresponding ``delivery.url`` has been downloaded,
       each document in this array is a mapping of a restore file to
       a hashed checksum. This array is present *only after* the
       file is downloaded.

       .. note::
          For an ``HTTP`` restore, this array only contains a single
          object that represents the hash of the ``.tar.gz`` file.

   * - hashes.typeName
     - string
     - The hashing algorithm used to compute the hash value. If present,
       this value is ``SHA1``.

   * - hashes.fileName
     - string
     - The name of the file that has been hashed.

   * - hashes.hash
     - string
     - The hash of the file.

   * - hostId
     - string
     - ID of the :term:`config server` to which this restore job
       belongs.

       Only present for a restore of a mirrored :term:`config server`
       (:abbr:`SCCC (Sync Cluster Connection Configuration)`).

   * - id
     - string
     - Unique identifier of the restore job.

   * - links
     - object array
     - .. include:: /includes/api/links-explanation.rst

   * - masterKeyUUID
     - string
     - The :abbr:`KMIP (Key Management Interoperability Protocol)`
       :doc:`master key ID </tutorial/encrypt-snapshots>` used to
       encrypt the :term:`snapshot` data. This field is present only if
       ``encryptionEnabled`` is true for the snapshot.

   * - pointInTime
     - boolean
     - Indicates that the job for a :abbr:`PIT (point-in-time)` restore.

   * - snapshotId
     - string
     - ID of the :term:`snapshot` to restore.

   * - statusName
     - string
     - Current status of the job. Value may be one of the following:

       - ``FINISHED``
       - ``IN_PROGRESS``
       - ``BROKEN``
       - ``KILLED``

   * - timestamp
     - BSON timestamp
     - Timestamp of the latest :term:`oplog <Oplog Store Database>`
       entry in the restored :term:`snapshot`.

   * - timestamp.date
     - timestamp
     - Timestamp in `ISO 8601
       <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`_ date
       and time format in :abbr:`UTC (Coordinated Universal Time)` of
       the latest :term:`oplog <Oplog Store Database>` entry in the
       restored :term:`snapshot`.

   * - timestamp.increment
     - number
     - Order of all operations completed at the latest
       :term:`oplog <Oplog Store Database>` entry in the restored
       :term:`snapshot`.
