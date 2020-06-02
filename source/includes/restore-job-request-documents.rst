.. list-table::
   :header-rows: 1
   :widths: 15 10 10 65

   * - Body Parameter
     - Type
     - Necessity
     - Description

   * - ``checkpointId``
     - string
     - | Conditional:
       | ``"delivery.methodName" : "AUTOMATED_RESTORE"``
       | *for Sharded Clusters Only.*
     - Unique identifier for the
       :term:`sharded cluster` checkpoint that represents the point in
       time to which your data will be restored.

       .. note::

          If you set ``checkpointId``, you cannot set ``oplogInc``,
          ``oplogTs``, ``snapshotId``, or ``pointInTimeUTCMillis``.

       If you provide this setting, this endpoint restores all data up
       to this checkpoint to the database you specify in the
       ``delivery`` object.

   * - ``delivery``
     - object
     - Required
     - Method and details of how the restored snapshot data
       will be delivered.

   * - | ``delivery``
       | ``.expirationHours``
     - number
     - | Conditional:
       | ``"delivery.methodName" : "HTTP"``
     - Number of hours the download |url| is valid once the restore
       job is complete.

   * - | ``delivery``
       | ``.maxDownloads``
     - number
     - | Conditional:
       | ``"delivery.methodName" : "HTTP"``
     - Number of times the download |url| can be used. This must be
       ``1`` or greater.

   * - | ``delivery``
       | ``.methodName``
     - string
     - Required
     - Means by which the data is delivered. Accepted values are:

       - ``AUTOMATED_RESTORE``
       - ``HTTP``

       .. note::

          If you set ``"delivery.methodName" : "AUTOMATED_RESTORE"``,
          you must also set:

          - ``delivery.targetGroupId`` and
          - ``delivery.targetClusterName`` or
            ``delivery.targetClusterId``

          In addition, the response shows the ``delivery.methodName``
          as ``HTTP``. An automated restore uses the ``HTTP`` method
          to deliver the restore job to the target host.

   * - | ``delivery``
       | ``.targetClusterId``
     - string
     - | Conditional:
       | ``"delivery.methodName" : "AUTOMATED_RESTORE"``
     - Unique identifier of the target cluster. Use the ``clusterId``
       returned in the response body of the
       :doc:`Get All Snapshots </reference/api/legacy-backup/restore/get-all-restore-jobs>`
       and :doc:`Get a Snapshot </reference/api/legacy-backup/restore/get-one-restore-job>`
       endpoints. For use only with automated restore jobs.

       .. note::

          If backup is not enabled on the target cluster, the
          :doc:`Get All Snapshots </reference/api/legacy-backup/restore/get-all-restore-jobs>`
          endpoint returns an empty ``results`` array without
          ``clusterId`` elements, and the
          :doc:`Get a Snapshot </reference/api/legacy-backup/restore/get-one-restore-job>`
          endpoint also does not return a ``clusterId`` element. Use
          the ``delivery.targetClusterName`` parameter instead or
          enable backup on the target cluster.

   * - | ``delivery``
       | ``.targetClusterName``
     - string
     - | Conditional:
       | ``"delivery.methodName" : "AUTOMATED_RESTORE"``
     - Name of the target cluster. Use the ``clusterName``
       returned in the response body of the
       :doc:`Get All Snapshots </reference/api/legacy-backup/restore/get-all-restore-jobs>`
       and :doc:`Get a Snapshot </reference/api/legacy-backup/restore/get-one-restore-job>`
       endpoints. For use only with automated restore jobs.

       .. note::

          If backup is not enabled on the target cluster, the
          :doc:`Get All Snapshots </reference/api/legacy-backup/restore/get-all-restore-jobs>`
          endpoint returns an empty ``results`` array without
          ``clusterName`` elements, and the
          :doc:`Get a Snapshot </reference/api/legacy-backup/restore/get-one-restore-job>`
          endpoint also does not return a ``clusterName`` element. Use
          the ``delivery.targetClusterName`` parameter instead or
          enable backup on the target cluster.

   * - | ``delivery``
       | ``.targetGroupId``
     - string
     - | Conditional:
       | ``"delivery.methodName" : "AUTOMATED_RESTORE"``
     - Unique identifier of the project that contains the destination
       cluster for the restore job.

   * - ``oplogTs``
     - string
     - | Conditional:
       | ``"delivery.methodName" : "AUTOMATED_RESTORE"``
     - Oplog :manual:`timestamp </reference/bson-types>` given as a
       |epoch-time|. When paired with ``oplogInc``, they represent the
       point in time to which your data will be restored.

       Run a query against :data:`local.oplog.rs` on your
       :term:`replica set` to find the desired timestamp.

       .. note::

          If you set ``oplogTs``, you:

          - Must set ``oplogInc``.
          - Cannot set ``checkpointId``, ``snapshotId``, or
            ``pointInTimeUTCMillis``.

       If you provide this setting, this endpoint restores all data up
       to *and including* this Oplog timestamp to the database you
       specified in the ``delivery`` object.

   * - ``oplogInc``
     - string
     - | Conditional:
       | ``"delivery.methodName" : "AUTOMATED_RESTORE"``
     - 32-bit incrementing ordinal that represents operations within a
       given second. When paired with ``oplogTs``, they represent the
       point in time to which your data will be restored.

       .. note::

          If you set ``oplogInc``, you:

          - Must set ``oplogTs``.
          - Cannot set ``checkpointId``, ``snapshotId``, or
            ``pointInTimeUTCMillis``.

       If you provide this setting, this endpoint restores all data up
       to *and including* this Oplog timestamp to the database you
       specified in the ``delivery`` object.

   * - ``pointInTimeUTCMillis``
     - long
     - | Conditional:
       | ``"delivery.methodName" : "AUTOMATED_RESTORE"``
     - |epoch-time-ms| that represents the point in time to which your
       data will be restored. This timestamp must be within last 24
       hours of the current time.

       If you provide this setting, this endpoint restores all data up
       to this point in time to the database you specified in the
       ``delivery`` object.

       .. note::

          If you set ``pointInTimeUTCMillis``, you cannot set
          ``oplogInc``, ``oplogTs``, ``snapshotId``, or
          ``checkpointId``.

   * - ``snapshotId``
     - string
     - Required
     - Unique identifier of the snapshot to restore.

       .. note::

          If you set ``snapshotId``, you cannot set
          ``oplogInc``, ``oplogTs``, ``pointInTimeUTCMillis``, or ``checkpointId``.

