.. list-table::
   :widths: 15 10 75
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``clusterCheckpointIntervalMin``
     - number
     - Number of minutes between successive cluster checkpoints. This
       only applies to sharded clusters. This number determines the
       granularity of point-in-time restores for sharded clusters.
       |mms| may return values of ``15``, ``30``, or ``60``.

       .. include:: /includes/admonitions/important/checkpoints-fcv-4-0-only.rst

   * - ``clusterId``
     - string
     - Unique identifier of the cluster to which this backup
       configuration applies.

   * - ``dailySnapshotRetentionDays``
     - number
     - Number of days to retain daily snapshots. |mms| may return
       values between ``1`` and ``365``, inclusive.

       .. note::

          Setting ``dailySnapshotRetentionDays`` to ``0`` disables this
          rule.

   * - ``groupId``
     - string
     - Unique identifier of the project that owns the backup
       configuration.

   * - ``links``
     - object array
     - .. include:: /includes/api/links-explanation.rst

   * - ``monthlySnapshotRetentionMonths``
     - number
     - Number of months to retain monthly snapshots. |mms| may return
       values between ``1`` and ``36``, inclusive.

       .. note::

          Setting ``monthlySnapshotRetentionMonths`` to ``0`` disables this rule.

   * - ``pointInTimeWindowHours``
     - number
     - Number of hours in the past for which a point-in-time snapshot
       can be created.

   * - ``referenceHourOfDay``
     - number
     - Hour of the day to schedule snapshots using a 24 hour clock.
       |mms| may return values between ``0`` and ``23``, inclusive.

   * - ``referenceMinuteOfHour``
     - number
     - Minute of the hour to schedule snapshots. |mms| may return
       values between ``0`` and ``59``, inclusive.

   * - ``referenceTimeZoneOffset``
     - string
     - The |iso8601-tzoffset| where the |onprem| host resides. To
       avoid problems with daylight saving time, use |utc|. The
       default is ``+0000``, which is equivalent to |utc|. ``Z`` is
       also a supported value and equivalent to |utc|.

   * - ``snapshotIntervalHours``
     - number
     - Number of hours between snapshots. |mms| may return values of
       ``6``, ``8``, ``12``, or ``24``.

   * - ``snapshotRetentionDays``
     - number
     - Number of days to keep recent snapshots. |mms| may return values
       between ``2`` and ``5``, inclusive.

   * - ``weeklySnapshotRetentionWeeks``
     - number
     - Number of weeks to retain weekly snapshots. |mms| may return
       values between ``1`` and ``52``, inclusive.

       .. note::

          Setting ``weeklySnapshotRetentionWeeks`` to ``0`` disables
          this rule.
