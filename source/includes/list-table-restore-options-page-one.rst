.. list-table::
   :widths: 35 65

   * - :guilabel:`Snapshot`

     - Restores from a :ref:`stored snapshot <snapshot>`. Select the
       snapshot from which to restore.

   * - :guilabel:`Point In Time`

     - Creates a custom snapshot based on a replica set :ref:`point in
       time <point-in-time-restore>` or a sharded cluster :ref:`checkpoint
       <checkpoint>`. |mms| includes all operations up to but not
       including the point in time. For example, if you select 12:00, the
       last operation in the restore is 11:59:59 or earlier.

       Select a :guilabel:`Date` and :guilabel:`Time` and click
       :guilabel:`Next`. If a cluster doesn't have a checkpoint near the
       selected time, |mms| displays available checkpoints and prompts you
       to select again.

   * - :guilabel:`Oplog Timestamp`

     - Creates a custom snapshot based on an entry in the :term:`oplog`.
       Specify the entry by its ``ts`` field. 

       - :guilabel:`Timestamp`: The first argument in the Timestamp()
         method in the ``ts`` field.

       - :guilabel:`Increment`: The second argument in the Timestamp()
         method in the ``ts`` field.

       For more information on timestamps, see the ``Timestamps`` section
       on the :manual:`BSON Types page </reference/bson-types>` of the
       MongoDB manual.
