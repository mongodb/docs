.. list-table::
   :widths: 35 65
   :stub-columns: 1

   * - Take snapshots every ... hours and save for ... days

     - Sets how frequently, in hours, |mms| takes a base snapshot of
       the deployment and the number of days |mms| retains base
       snapshots.

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

       |onprem| sets the default value to :guilabel:`Sunday`.

.. list-table::
   :widths: 35 65
   :stub-columns: 1

   * - Allow point-in-time restores going back

     - Sets the number of days that |mms| retains oplogs alongside
       snapshots. To learn how snapshots and point-in-time restores work,
       see :ref:`restore-overview`.

   * - Reference Time of Day (UTC)

     - Sets the time of day at
       `UTC <https://www.timeanddate.com/time/aboututc.html>`_ from
       which the snapshot schedule starts. When you change the value in
       :guilabel:`Reference Time of Day`, snapshots that are in progress
       or that are already scheduled remain unaffected. Only snapshots
       taken after you change the reference time follow the updated schedule.

       The following statements describe how |mms| behaves in relation
       to the value you specify in :guilabel:`Reference Time of Day`:

       - This value acts as a timer that |mms| uses for scheduling and then
         taking the next snapshot. This value isn't the same as the time
         when |mms| takes the next snapshot, but it is close to it. This
         value differs from the actual time that |mms| uses to take a
         snapshot by a small interval. You can't control this interval.
       - If you leave this value blank, |mms| interprets it as ``null``,
         starts the timer for scheduling the next snapshot, and then takes
         the next snapshot after a short interval from the time when it
         took the previous snapshot.
  
       - If you change the time value in this field, |mms| uses the new
         time value as the starting time for scheduling the snapshot that
         will occur *after the currently scheduled snapshot*.
         In other words, for each snapshot that is already scheduled, |mms| uses
         the time it already established: either based on the ``null`` value
         plus a short interval, or based on the custom reference time value
         plus a short interval. If you change the reference time value in
         this field, the next scheduled snapshot will not happen sooner
         than the snapshot that is already scheduled.

         To review examples, see :ref:`Snapshot Frequency and Retention <snapshot-frequency-and-retention>`.
