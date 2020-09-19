.. list-table::
   :widths: 20 14 66
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - cancelled
     - boolean
     - Flag indicating whether the restore job was canceled.

   * - createdAt
     - string
     - |iso8601-time| when |service| created the restore job.

   * - deliveryType
     - string
     - Type of restore job to create. |service| may return:

       .. include:: /includes/api/list-tables/restore-job-types.rst

   * - expired
     - boolean
     - Flag indicating whether the restore job expired.

   * - expiresAt
     - integer
     - |iso8601-time| when the restore job expires.

   * - finishedAt
     - integer
     - |iso8601-time| when the restore job completed.

   * - id
     - string
     - Unique identifier of the restore job.

   * - links
     - array of objects
     - .. include:: /includes/links-explanation.rst

   * - oplogTs
     - integer
     - |Epoch-time| from which to you want to restore this snapshot.
       This is the first part of an :ref:`Oplog <ref-atlas-oplog>`
       timestamp. |service| returns this parameter when **"oplogTs"**
       exceeds 0.

   * - oplogInc
     - integer
     - :ref:`Oplog <ref-atlas-oplog>` operation number from which to
       you want to restore this snapshot. This is the second part of an
       :ref:`Oplog <ref-atlas-oplog>` timestamp. |service| returns this
       parameter when **"oplogTs"** exceeds 0.

   * - pointInTimeUTCSeconds
     - integer
     - |Epoch-time| from which |service| restored this snapshot.
       |service| returns this parameter when
       **"pointInTimeUTCSeconds"** exceeds 0.

   * - targetGroupId
     - string
     - Name of the target |service| project of the restore job.

   * - targetClusterName
     - string
     - Name of the target |service| cluster to which the restore job
       restores the snapshot.

   * - timestamp
     - string
     - |iso8601-time| when the snapshot associated to ``snapshotId``
       was taken.
