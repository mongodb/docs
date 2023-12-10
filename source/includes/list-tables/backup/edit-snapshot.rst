.. list-table::
   :widths: 35 65
   :stub-columns: 1

   * - Take snapshots every ... hours and save for ... days

     - Sets how frequently, in hours, |mms| takes a base snapshot of
       the deployment and the number of days |mms| retains base
       snapshots.

       Changes to the snapshot schedule affect your
       :ref:`snapshot storage costs <backup-pricing>`.

   * - Create cluster checkpoint every ... minutes
       (Sharded Clusters only)

     - Sets how frequently, in minutes, |mms| creates a
       :ref:`checkpoint` in between snapshots of a sharded cluster.
       Checkpoints provide restore points that you can use to create
       custom *point-in-time* snapshots.

       .. include:: /includes/admonitions/important/checkpoints-fcv-4-0-only.rst

   * - Store daily snapshots for

     - Sets the number of days that |mms| retains daily snapshots.

   * - Store weekly snapshots for

     - Sets the number of weeks that |mms| retains weekly snapshots.

   * - Store monthly snapshots for

     - Sets the number of months that |mms| retains monthly snapshots.
       
       .. note:: 
          
          |onprem| takes monthly snapshots every 28 days, not by calendar month.
     
   * - Day of Week for Full Snapshot

     - Sets the day of the week when |mms| takes a full snapshot. This
       ensures a recent complete backup.

       |mms| sets the default value to a random weekday.
