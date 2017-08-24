.. list-table::
   :widths: 10 10 80
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``batchId``
     - ObjectId
     - ID of the batch to which this restore job belongs. Only
       present for a restore of a sharded cluster.

   * - ``clusterId``
     - ObjectId
     - ID of the cluster represented by the restore job.

   * - ``delivery``
     - object
     - The method and details of how the restored snapshot data will
       be delivered.

   * - ``delivery.expires``
     - timestamp
     - Date after which the URL is no longer available. Only
       present if ``delivery.methodName`` is ``HTTP``.

   * - ``delivery.expirationHours``
     - number
     - The number of hours the download URL is valid once the
       restore job is complete. Only present if
       ``delivery.methodName`` is ``HTTP``.

   * - ``delivery.formatName``
     - string
     - Format in which data from an SCP restore should be written
       to the destination. Only present if
       ``delivery.methodName`` is ``SCP``. Value may be one of
       the following:

       - ``ARCHIVE``
       - ``INDIVIDUAL``

   * - ``delivery.hostname``
     - string
     - Hostname of the server to which the data should be written
       for an SCP restore. Only present if
       ``delivery.methodName`` is ``SCP``.

   * - ``delivery.maxDownloads``
     - number
     - The number of times the download URL can be used. This
       must be ``1`` or greater. Only present if
       ``delivery.methodName`` is ``HTTP``.

   * - ``delivery.methodName``
     - string
     - How the data will be delivered. Value may be one of the
       following:

       .. - ``AUTOMATED_RESTORE``
       - ``HTTP``
       - ``QUERY``
       - ``SCP``

       .. .. note::

       ..    ``AUTOMATED_RESTORE`` can be specified in the request for this resource but the response shows the ``delivery.methodName`` as ``HTTP``. An automated restore uses the ``HTTP`` method to deliver the restore job to the target host.

   * - ``delivery.port``
     - number
     - Port to use for ``SCP``. Only present if
       ``delivery.methodName`` is ``SCP``.

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
     - The URL from which the restored snapshot data can be
       downloaded. Only present if ``delivery.methodName`` is
       ``HTTP``.

   * - ``encryptionEnabled``
     - boolean
     - Indicates whether the restored snapshot data is encrypted.

   * - ``groupId``
     - ObjectId
     - ID of the :term:`group` that owns the restore job.

   * - ``hostId``
     - ObjectId
     - ID of the :term:`config server` to which this restore job
       belongs. Only present for a restore of a legacy mirrored
       :term:`config server`.

   * - ``masterKeyUUID``
     - string
     - The :abbr:`KMIP (Key Management Interoperability Protocol)`
       master key ID used to encrypt the snapshot data. This field is
       present only if ``encryptionEnabled`` is true for the snapshot.

   * - ``password``
     - string
     - Password to use for ``SCP``. If ``delivery.methodName`` is
       ``SCP``, then you must include this field when creating the
       restore job. However, it is never exposed when a restore job
       entity is returned.

   * - ``passwordTypeName``
     - string
     - Type of authentication to use for ``SCP``. Only present if
       ``delivery.methodName`` is ``SCP``. Value may be one of the
       following:

       - ``PASSWORD``
       - ``SSH_KEY``

   * - ``pointInTime``
     - boolean
     - Indicates that the job is a point-in-time restore.

   * - ``snapshotId``
     - ObjectId
     - ID of the :term:`snapshot` to restore.

   * - ``targetDirectory``
     - string
     - Target directory to which the data should be written for an
       SCP restore. Only present if ``delivery.methodName`` is
       ``SCP``.

   * - ``timestamp``
     - BSON timestamp
     - Timestamp of the latest oplog entry in the restored
       :term:`snapshot`.

       If you include this parameter, you are requesting a point-in-time
       restore job.

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
       <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`_
       date and time format at :abbr:`UTC (Coordinated Universal
       Time)` of the latest oplog entry in the restored
       :term:`snapshot`.

   * - ``timestamp.increment``
     - number
     - Order of operation of all operations completed at the
       latest oplog entry in the restored :term:`snapshot`.

   * - ``username``
     - string
     - Username to use for ``SCP``. Only present if
       ``delivery.methodName`` is ``SCP``.

