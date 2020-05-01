.. list-table::
   :widths: 15 10 75
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``cancelled``
     - boolean
     - Flag indicating whether the restore job was canceled.

   * - ``createdAt``
     - string
     - |iso8601-time| when |service| created the restore job.

   * - ``deliveryType``
     - string
     - Type of restore job to create. Possible values are:

       .. include:: /includes/api/list-tables/restore-job-types.rst

   * - ``deliveryUrl``
     - array of strings
     - One or more |url|\s for the compressed snapshot files for manual
       download. Returned when ``"deliveryType" : "download"``.

       .. note::

          If empty, |service| is processing the restore job. Use the
          :doc:`/reference/api/cloud-provider-snapshot-restore-jobs-get-all/`
          endpoint periodically check for a ``deliveryUrl`` download
          value for the restore job.

   * - ``expired``
     - boolean
     - Flag indicating whether the restore job expired.

   * - ``expiresAt``
     - integer
     - |iso8601-time| when the restore job expires.

   * - ``finishedAt``
     - integer
     - |iso8601-time| when the restore job completed.

   * - ``id``
     - string
     - Unique identifier of the restore job.

   * - ``links``
     - array of objects
     - .. include:: /includes/links-explanation.rst

   * - ``snapshotId``
     - string
     - Unique identifier of the source snapshot ID of the restore job.

   * - ``timestamp``
     - string
     - |iso8601-time| when the snapshot associated to ``snapshotId``
       was taken.
