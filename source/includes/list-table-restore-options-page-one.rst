.. list-table::
   :widths: 35 65

   * - :guilabel:`Snapshot`

     - Restores from a :ref:`stored snapshot <snapshot>`. Select the
       snapshot from which to restore.

   * - :guilabel:`Point In Time`

     - Creates a custom snapshot based on a replica set :ref:`point in
       time <point-in-time-restore>`. |mms| includes all operations up to but not
       including the point in time. For example, if you select 12:00, the
       last operation in the restore is 11:59:59 or earlier.

       Select a :guilabel:`Date` and :guilabel:`Time` and click
       :guilabel:`Next`.

   * - :guilabel:`Oplog Timestamp`

     - Creates a custom snapshot based on the timestamp of an entry in the
       :term:`oplog`, as specified by the entry’s ``ts`` field. The ``ts``
       field is a :manual:`BSON </reference/bson-types>` timestamp and has
       two components: the timestamp and the increment.

       Specify the following:

       - :guilabel:`Timestamp`: The value in seconds since the Unix epoch.

       - :guilabel:`Increment`: An incrementing ordinal for operations
         within a given second.
