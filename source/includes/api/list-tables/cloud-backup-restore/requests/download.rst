.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 15 10 10 65

   * - Body Parameter
     - Type
     - Necessity
     - Description

   * - ``deliveryType``
     - string
     - Required
     - Type of restore job to create. Accepted values include:

       .. include:: /includes/api/list-tables/restore-job-types.rst

   * - ``snapshotId``
     - string
     - Required
     - Unique identifier of the snapshot to restore.
