.. list-table::
   :widths: 20 14 66
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - cancelled
     - boolean
     - Flag that indicates whether someone canceled the restore job.

   * - createdAt
     - string
     - |iso8601-time| when |service| created the restore job.

   * - deliveryType
     - string
     - Type of restore job to create. |service| returns **automated**.

   * - expired
     - boolean
     - Flag that indicates whether the restore job expired.

   * - expiresAt
     - string
     - |iso8601-time| when the restore job expires.

   * - failed
     - boolean
     - Flag that indicates whether someone canceled the restore job.

   * - finishedAt
     - string
     - |iso8601-time| when the restore job completed.

   * - id
     - string
     - Unique 24-hexadecimal digit string that identifies the restore
       job.

   * - snapshotId
     - string
     - Unique 24-hexadecimal digit string that identifies the source of
       restore job.

   * - targetClusterName
     - string
     - Human-readable label of the target |service| {+cluster+} or
       {+serverless-instance+} to which the restore job restores the
       snapshot.

   * - targetGroupId
     - string
     - Unique 24-hexadecimal digit string that identifies the target
       |service| project of the restore job.

   * - timestamp
     - string
     - |iso8601-time| when |service| took the snapshot identified with
       **snapshotId**.
