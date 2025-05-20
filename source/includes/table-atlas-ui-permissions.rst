.. list-table::
   :header-rows: 1
   :widths: 30 40

   * - Action
     - Required Roles

   * - Create Databases
     - .. include:: /includes/min-project-data-access-read-write.rst

   * - View Databases
     - .. include:: /includes/min-project-data-access-read-only.rst

   * - Drop Databases
     - .. include:: /includes/min-project-data-access-admin.rst

   * - Create Collections
     - .. include:: /includes/min-project-data-access-read-write.rst

   * - View Collections
     - .. include:: /includes/min-project-data-access-read-only.rst

   * - Drop Collections
     - .. include:: /includes/min-project-data-access-admin.rst

   * - Shard Collections
     - One of the following roles: 
       
       - :authrole:`Organization Owner` 
       - :authrole:`Project Owner`

   * - Insert Documents 
     - .. include:: /includes/min-project-data-access-read-write.rst

   * - Delete Documents 
     - .. include:: /includes/min-project-data-access-read-write.rst

   * - Edit Documents 
     - .. include:: /includes/min-project-data-access-read-write.rst

   * - Create Indexes 
     - .. include:: /includes/min-project-data-access-admin.rst

   * - Drop Indexes 
     - .. include:: /includes/min-project-data-access-admin.rst

   * - Hide Indexes 
     - .. include:: /includes/min-project-data-access-admin.rst

   * - View Indexes 
     - .. include:: /includes/min-project-data-access-read-only.rst

   * - Create Aggregation Pipelines 
     - .. include:: /includes/min-project-data-access-read-write.rst
