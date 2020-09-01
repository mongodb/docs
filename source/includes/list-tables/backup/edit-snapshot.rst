.. list-table::
   :widths: 35 65
   :stub-columns: 1

   * - Take snapshots every ... hours and save for ... days

     - Sets how frequently, in hours, |mms| takes a base snapshot of
       the deployment and the number of days |mms| retains base
       snapshots.

       .. cond:: cloud

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

   * - Day of Week for Full Snapshot

     - Sets the day of the week when |mms| takes a full snapshot. This
       ensures a recent complete backup.

       .. cond:: onprem

          |onprem| sets the default value to :guilabel:`Sunday`.

       .. cond:: cloud

          |mms| sets the default value to a random weekday.

.. cond:: onprem

   .. list-table::
      :widths: 35 65
      :stub-columns: 1

      * - Allow point-in-time restores going back

        - Sets the number of days that |mms| retains oplogs alongside
          snapshots.

          .. seealso::

             To learn how snapshots and point-in-time restores work,
             see :doc:`/tutorial/nav/restore-overview`.

      * - Reference Time of Day (UTC)

        - Sets the time of day at
          `UTC <https://www.timeanddate.com/time/aboututc.html>`_ from
          which the snapshot schedule starts. When you change the
          :guilabel:`Reference Time of Day`, snapshots that are in
          progress remain unaffected. Only snapshots taken after you
          change the reference time follow the updated schedule.

          .. note::

             Changing the reference time changes the time of the next
             scheduled snapshot:

             * If the new reference time is before the current
               reference time, the next snapshot occurs at the new
               reference time tomorrow.

             * If the new reference time is after the current reference
               time, and you make the change before the current
               reference time, the next snapshot occurs at the new
               reference time today.

             * If the new reference time is after the current reference
               time, but you make the change after the current
               reference time, the next snapshot occurs at the new
               reference time tomorrow.

             .. seealso::

                To review more examples, see
                :ref:`Snapshot Frequency and Retention <snapshot-frequency-and-retention>`.
