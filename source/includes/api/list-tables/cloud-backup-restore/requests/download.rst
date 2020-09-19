.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 20 14 11 55

   * - Body Parameter
     - Type
     - Necessity
     - Description

   * - deliveryType
     - string
     - Required
     - Type of restore job to create. |service| accepts:

       .. include:: /includes/api/list-tables/restore-job-types.rst

   * - snapshotId
     - string
     - Required
     - Unique identifier of the snapshot to restore.
