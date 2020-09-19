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

   * - components
     - array of objects
     - Collection of clusters to be downloaded. |service| returns this
       parameter when restoring a :term:`sharded cluster` and
       **"deliveryType" : "download"**.

   * - | components
       | .downloadUrl
     - string
     - |url| from which the snapshot of the
       **components.replicaSetName** should be downloaded. |service|
       returns **null** for this parameter if the download |url|:

       - Has expired,
       - Has been used, or
       - Hasn't been created.

   * - | components
       | .replicaSetName
     - string
     - Name of the shard or config server included in the snapshot.

   * - deliveryType
     - string
     - Type of restore job to create. Possible values are:

       .. include:: /includes/api/list-tables/restore-job-types.rst

   * - deliveryUrl
     - array of strings
     - One or more |url|\s for the compressed snapshot files for manual
       download. |service| returns this parameter when
       **"deliveryType" : "download"**.

       .. note::

          If empty, |service| is processing the restore job. Use the
          :doc:`/reference/api/cloud-backup/restore/get-all-restore-jobs`
          endpoint periodically check for a **deliveryUrl** download
          value for the restore job.

   * - expired
     - boolean
     - Flag indicating whether the restore job expired.

   * - expiresAt
     - integer
     - |iso8601-time| when the restore job expires.

   * - failed
     - boolean
     - Flag indicating whether the restore job failed.

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
       timestamp. |service| returns this parameter when
       **"deliveryType" : "pointInTime"** and **"oplogTs" > 0**.

   * - oplogInc
     - integer
     - :ref:`Oplog <ref-atlas-oplog>` operation number from which to
       you want to restore this snapshot. This is the second part of an
       :ref:`Oplog <ref-atlas-oplog>` timestamp. |service| returns this
       parameter when **"deliveryType" : "pointInTime"** and
       **"oplogTs" > 0**.

   * - pointInTimeUTCSeconds
     - integer
     - |Epoch-time| from which |service| restored this snapshot.
       Returned when **"deliveryType" : "pointInTime"** and
       **"pointInTimeUTCSeconds" > 0**.

   * - snapshotId
     - string
     - Unique identifier of the source snapshot ID of the restore job.
       Returned when **"deliveryType" : "automated"** or
       **"deliveryType" : "download"**.

   * - targetGroupId
     - string
     - Name of the target |service| project of the restore job.
       Returned when **"deliveryType" : "automated"**.

   * - targetClusterName
     - string
     - Name of the target |service| cluster to which the restore job
       restores the snapshot. |service| returns this parameter when
       **"deliveryType" : "automated"**.

   * - timestamp
     - string
     - |iso8601-time| when the snapshot associated to **snapshotId**
       was taken.
