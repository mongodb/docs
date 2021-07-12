.. list-table::
   :widths: 20 14 11 55
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Necessity
     - Description

   * - deliveryType
     - string
     - Required
     - Type of restore job to create. |service| returns **automated**.

   * - snapshotId
     - string
     - Required
     - Unique 24-hexadecimal digit string that identifies the source of
       restore job.

   * - targetClusterName
     - string
     - Required
     - Human-readable label of the target |service| {+cluster+} or
       {+serverless-instance+} to which the restore job restores the
       snapshot.

   * - targetGroupId
     - string
     - Required
     - Unique 24-hexadecimal digit string that identifies the target
       |service| project for this restore job.
