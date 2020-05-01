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

   * - ``oplogTs``
     - integer
     - |Epoch-time| from which to you want to restore this snapshot.
       This is the first part of an :ref:`Oplog <ref-atlas-oplog>`
       timestamp. Returned when ``"oplogTs" > 0``.

   * - ``oplogInc``
     - integer
     - :ref:`Oplog <ref-atlas-oplog>` operation number from which to
       you want to restore this snapshot. This is the second part of an
       :ref:`Oplog <ref-atlas-oplog>` timestamp. Returned when
       ``"oplogTs" > 0``.

   * - | ``pointInTime``
       | ``UTCSeconds``
     - integer
     - |Epoch-time| from which |service| restored this snapshot.
       Returned when ``"pointInTimeUTCSeconds" > 0``.

   * - | ``target``
       | ``GroupId``
     - string
     - Name of the target |service| project of the restore job.

   * - | ``target``
       | ``ClusterName``
     - string
     - Name of the target |service| cluster to which the restore job
       restores the snapshot.

   * - ``timestamp``
     - string
     - |iso8601-time| when the snapshot associated to ``snapshotId``
       was taken.
