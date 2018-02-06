.. list-table::
   :widths: 20 10 70
   :header-rows: 1

   * - Name
     - Type
     - Description
       
   * - ``batchId``
     - string
     - ID of the batch to which this restore job belongs.

       Only present for a restore of a :term:`sharded cluster`.

   * - ``clusterId``
     - string
     - ID of the :term:`cluster` represented by the restore job.

       Only present for a restore of a :term:`cluster`.

   * - ``created``
     - timestamp
     - The exact point in time when the restore job was requested in
       `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`_
       date and time format in :abbr:`UTC (Coordinated Universal Time)`.

   * - ``delivery``
     - object
     - The method and details of how the restored snapshot data
       shall be delivered.

   * - ``delivery.expires``
     - timestamp
     - Date after which the :abbr:`URL (Uniform Resource Locator)` is no
       longer available.

       Only present if ``"delivery.methodName" : "HTTP"``.

   * - ``delivery.expirationHours``
     - number
     - The number of hours the download :abbr:`URL (Uniform Resource
       Locator)` is valid once the restore job is complete.

       Only present if ``"delivery.methodName" : "HTTP"``.

   * - ``delivery.maxDownloads``
     - number
     - The number of times the download :abbr:`URL (Uniform Resource
       Locator)` can be used. This must be ``1`` or greater.

       Only present if ``"delivery.methodName" : "HTTP"``.

   * - ``delivery.methodName``
     - string
     - How the data will be delivered. Value may be one of the
       following:

       - ``HTTP``
       - ``QUERY``

   * - ``delivery.statusName``
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

   * - ``delivery.url``
     - string
     - The :abbr:`URL (Uniform Resource Locator)` from which the
       restored snapshot data can be downloaded.

       Only present if ``"delivery.methodName" : "HTTP"``.

   * - ``encryptionEnabled``
     - boolean
     - Indicates whether the restored snapshot data is
       encrypted.

   * - ``groupId``
     - string
     - ID of the project that owns the restore job.

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
     - The hashing algorithm used to compute the hash value. If present,
       this value is ``SHA1``.

   * - ``hashes.fileName``
     - string
     - The name of the file that has been hashed.

   * - ``hashes.hash``
     - string
     - The hash of the file.
       
   * - ``id``
     - :ref:`ObjectId <document-bson-type-object-id>`
     - The ID of the restore job.

   * - ``links``
     - document array
     - One or more links to sub-resources and/or related resources. The
       relations between URLs are explained in the `Web Linking Specification
       <http://tools.ietf.org/html/rfc5988>`_

   * - ``masterKeyUUID``
     - string
     - The :abbr:`KMIP (Key Management Interoperability Protocol)`
       master key ID used to
       encrypt the snapshot data. This field is present only if
       ``encryptionEnabled`` is true for the snapshot.

   * - ``snapshotId``
     - :ref:`ObjectId <document-bson-type-object-id>`
     - ID of the snapshot to restore.

   * - ``statusName``
     - string
     - Current status of the job. Value may be one of the following:

       - ``FINISHED``
       - ``IN_PROGRESS``
       - ``BROKEN``
       - ``KILLED``

   * - ``timestamp``
     - object
     - Timestamp of the latest oplog
       entry in the restored snapshot.

   * - ``timestamp.date``
     - timestamp
     - Timestamp in `ISO 8601
       <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`_ date
       and time format in :abbr:`UTC (Coordinated Universal Time)` of
       the latest oplog entry in the
       restored snapshot.

   * - ``timestamp.increment``
     - number
     - Order of all operations completed at the latest
       oplog entry in the restored
       snapshot.