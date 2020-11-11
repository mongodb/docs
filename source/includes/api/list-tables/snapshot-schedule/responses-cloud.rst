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

   * - ``fullIncrementalDayOfWeek``
     - string
     - Day of the week when |mms| takes a full snapshot. This
       ensures a recent complete backup. |mms| sets the default
       value to a random weekday.

   * - ``groupId``
     - string
     - Unique identifier of the project that owns the backup
       configuration.

   * - ``links``
     - array of objects
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
       can be created. You cannot change this value for a snapshot.

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
