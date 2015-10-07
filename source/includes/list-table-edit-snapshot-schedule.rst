.. list-table::
   :widths: 35 65

   * - :guilabel:`Take snapshots every` ... :guilabel:`and save for`

     - Sets how often |mms| takes a base snapshot of the deployment and
       how long |mms| retains base snapshots. For information on how these
       settings affect |mms|, see :ref:`snapshot-frequency-and-retention`.

       .. include:: /includes/extracts/list-table-edit-snapshot-schedule.rst

   * - :guilabel:`Create cluster checkpoint every` (Sharded Clusters only)

     - Sets how often |mms| creates a :ref:`checkpoint <checkpoint>` in
       between snapshots of a sharded cluster. Checkpoints provide restore
       points that you can use to create custom "point in time" snapshots.
       For more information, see :ref:`checkpoint`.

   * - :guilabel:`Store daily snapshots for`

     - Sets the time period that |mms| retains daily snapshots. For
       defaults, see :ref:`snapshot-frequency-and-retention`.

   * - :guilabel:`Store weekly snapshots for`

     - Sets the time period that |mms| retains weekly snapshots. For
       defaults, see :ref:`snapshot-frequency-and-retention`.

   * - :guilabel:`Store monthly snapshots for`

     - Sets the time period that |mms| retains monthly snapshots. For
       defaults, see :ref:`snapshot-frequency-and-retention`.
