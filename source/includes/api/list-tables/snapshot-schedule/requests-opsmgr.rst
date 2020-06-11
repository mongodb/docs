.. list-table::
   :widths: 15 10 10 65
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Necessity
     - Description

   * - ``clusterCheckpointIntervalMin``
     - number
     - Optional
     - Number of minutes between successive cluster checkpoints. This
       only applies to sharded clusters. This number determines the
       granularity of point-in-time restores for sharded clusters.
       You can set a value of ``15``, ``30``, or ``60``.

       .. include:: /includes/admonitions/important/checkpoints-fcv-4-0-only.rst

   * - ``clusterId``
     - string
     - Optional
     - Unique identifier of the cluster to which this backup
       configuration applies.

   * - ``dailySnapshotRetentionDays``
     - number
     - Optional
     - Number of days to retain daily snapshots. You can set a value
       between ``1`` and ``365``, inclusive.

       .. note::

          Setting ``dailySnapshotRetentionDays`` to ``0`` disables this
          rule.

   * - ``groupId``
     - string
     - Optional
     - Unique identifier of the project that owns the backup
       configuration.

   * - ``links``
     - object array
     - Optional
     - .. include:: /includes/api/links-explanation.rst

   * - ``monthlySnapshotRetentionMonths``
     - number
     - Optional
     - Number of months to retain monthly snapshots. You can set a
       value between ``1`` and ``36``, inclusive.

       .. note::

          Setting ``monthlySnapshotRetentionMonths`` to ``0`` disables this rule.

   * - ``pointInTimeWindowHours``
     - number
     - Optional
     - Number of hours in the past for which a point-in-time snapshot
       can be created.

   * - ``referenceHourOfDay``
     - number
     - Optional
     - Hour of the day to schedule snapshots using a 24 hour clock.
       You can set a value between ``0`` and ``23``, inclusive.

   * - ``referenceMinuteOfHour``
     - number
     - Optional
     - Minute of the hour to schedule snapshots. You can set a value
       between ``0`` and ``59``, inclusive.

   * - ``referenceTimeZoneOffset``
     - string
     - Optional
     - The |iso8601-tzoffset| where the |onprem| host resides. To
       avoid problems with daylight saving time, use |utc|. The
       default is ``+0000``, which is equivalent to |utc|. ``Z`` is
       also a supported value and equivalent to |utc|.

   * - ``snapshotIntervalHours``
     - number
     - Optional
     - Number of hours between snapshots. You can set a value of ``6``,
       ``8``, ``12``, or ``24``.

   * - ``snapshotRetentionDays``
     - number
     - Optional
     - Number of days to keep recent snapshots. You can set a value
       between ``2`` and ``5``, inclusive.

   * - ``weeklySnapshotRetentionWeeks``
     - number
     - Optional
     - Number of weeks to retain weekly snapshots. You can set a value
       between ``1`` and ``52``, inclusive.

       .. note::

          Setting ``weeklySnapshotRetentionWeeks`` to ``0`` disables
          this rule.
