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

   * - ``fullIncrementalDayOfWeek``
     - string
     - Optional
     - Day of the week when |mms| takes a full snapshot. This
       ensures a recent complete backup. |mms| sets the default
       value to a random weekday.

   * - ``groupId``
     - string
     - Optional
     - Unique identifier of the project that owns the backup
       configuration.

   * - ``links``
     - array of objects
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
       can be created. You cannot change this value for a snapshot.

   * - ``snapshotIntervalHours``
     - number
     - Optional
     - Number of hours between snapshots. You can set a value of
       ``6``, ``8``, ``12``, or ``24``.

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

