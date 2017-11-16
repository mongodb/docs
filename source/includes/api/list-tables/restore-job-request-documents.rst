.. list-table::
   :widths: 10 10 80
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``delivery``
     - object
     - The method and details of how the restored :term:`snapshot` data
       will be delivered.

   * - ``delivery.expires``
     - timestamp
     - Date after which the :abbr:`URL (Uniform Resource Locator)` is no
       longer available.

       Only present if ``"delivery.methodName" : "HTTP"``.

   * - ``delivery.expirationHours``
     - number
     - The number of hours the download :abbr:`URL (Uniform Resource
       Locator)` is valid once the restore job is complete.

       Only needed if ``"delivery.methodName" : "HTTP"``.

   * - ``delivery.formatName``
     - string
     - Format in which data from an :abbr:`SCP (secure copy)` restore
       should be written to the destination. Value may be one of the
       following:

       - ``ARCHIVE``
       - ``INDIVIDUAL``

       Only needed if ``"delivery.methodName" : "SCP"``.

   * - ``delivery.hostname``
     - string
     - Hostname of the server to which the data should be written
       for an :abbr:`SCP (secure copy)` restore.

       Only needed if ``"delivery.methodName" : "SCP"``.

   * - ``delivery.maxDownloads``
     - number
     - The number of times the download :abbr:`URL (Uniform Resource
       Locator)` can be used. This must be ``1`` or greater.

       Only needed if ``"delivery.methodName" : "HTTP"``.

   * - ``delivery.methodName``
     - string
     - How the data will be delivered. Value may be one of the
       following:

       - ``AUTOMATED_RESTORE``
       - ``HTTP``
       - ``QUERY``
       - ``SCP``

       .. note::

          If you specify ``AUTOMATED_RESTORE`` in the request , the
          response shows the ``delivery.methodName`` as ``HTTP``. An
          automated restore uses the ``HTTP`` method to deliver the
          restore job to the target host.

       .. include:: /includes/note-scp-deprecation.rst

   * - ``delivery.password``
     - string
     - Password to use for :abbr:`SCP (secure copy)`.

       Only needed if ``"delivery.methodName" : "SCP"``.

       .. note::
          It is never exposed in a restore job response document.

   * - ``delivery.passwordTypeName``
     - string
     - Type of authentication to use for :abbr:`SCP (secure copy)`.
       Value may be one of the following:

       - ``PASSWORD``
       - ``SSH_KEY``

       Only needed if ``"delivery.methodName" : "SCP"``.

   * - ``delivery.port``
     - number
     - Port to use for ``SCP``.

       Only needed if ``"delivery.methodName" : "SCP"``.

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

   * - ``delivery.targetDirectory``
     - string
     - Target directory to which the data should be written for an
       :abbr:`SCP (secure copy)` restore.

       Only needed if ``"delivery.methodName" : "SCP"``.

   * - ``delivery.url``
     - string
     - The :abbr:`URL (Uniform Resource Locator)` from which the
       restored snapshot data can be downloaded.

       Only needed if ``"delivery.methodName" : "HTTP"``.

   * - ``delivery.username``
     - string
     - Username to use for :abbr:`SCP (secure copy)`.

       Only needed if ``"delivery.methodName" : "SCP"``.

   * - ``encryptionEnabled``
     - boolean
     - Indicates whether the restored snapshot data is encrypted.

   * - ``masterKeyUUID``
     - string
     - The :abbr:`KMIP (Key Management Interoperability Protocol)`
       :doc:`master key ID </tutorial/encrypt-snapshots>` used to
       encrypt the snapshot data. This field is present only if
       ``encryptionEnabled`` is true for the snapshot.

       Only needed if ``"encryptionEnabled" : true`` for the snapshot.

   * - ``pointInTime``
     - boolean
     - Indicates that the job is a :abbr:`PIT (point-in-time)` restore.

   * - ``snapshotId``
     - :ref:`ObjectId <document-bson-type-object-id>`
     - ID of the :term:`snapshot` to restore.

   * - ``timestamp``
     - BSON timestamp
     - Timestamp of the latest :term:`oplog <Oplog Store Database>`
       entry in the restored :term:`snapshot`.

       If you include this parameter, you are requesting a :abbr:`PIT
       (point-in-time)` restore job.

       .. important::

          - If your group (``GROUP-ID``) has the client-side :abbr:`PIT
            (point-in-time)` restore feature enabled, including
            ``timestamp`` in your request results in an error.

          - If your group (``GROUP-ID``) does not have the client-side
            :abbr:`PIT (point-in-time)` restore feature enabled,
            including ``timestamp`` in your request triggers a
            server-side :abbr:`PIT (point-in-time)` restore job.

   * - ``timestamp.date``
     - timestamp
     - Timestamp in `ISO 8601
       <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`_ date
       and time format in :abbr:`UTC (Coordinated Universal Time)` of
       the latest :term:`oplog <Oplog Store Database>` entry in the
       restored :term:`snapshot`.

   * - ``timestamp.increment``
     - number
     - Order of all operations completed at the latest
       :term:`oplog <Oplog Store Database>` entry in the restored
       :term:`snapshot`.
