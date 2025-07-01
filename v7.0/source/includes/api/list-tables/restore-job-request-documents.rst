.. list-table::
   :widths: 15 10 10 65
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Necessity
     - Description

   * - ``checkpointId``
     - string
     - Conditional
     - Unique identifier for the :manual:`sharded cluster </reference/glossary/#std-term-sharded-cluster>` checkpoint
       that represents the point in time to which your data will be
       restored.

       Conditions:

       - Set ``"delivery.methodName" : "AUTOMATED_RESTORE"``.
       - Run Sharded Clusters using |fcv-link| of 4.0 or earlier.
       - Can't set ``oplogInc``, ``oplogTs``, or
         ``pointInTimeUTCMillis``.

       If you provide this setting, this endpoint restores all data up
       to this :opsmgr:`checkpoint  </reference/glossary/#std-term-checkpoint>` to the database you
       specified in the ``delivery`` object.

   * - ``delivery``
     - object
     - Required
     - Method and details of how the restored :manual:`snapshot </reference/glossary/#std-term-snapshot>` data
       is delivered.

   * - | ``delivery``
       | ``.expires``
     - string
     - Conditional
     - |iso8601-time| after which the |url| is no longer available.

       ``delivery.methodName" : "HTTP"``

   * - | ``delivery``
       | ``.expirationHours``
     - number
     - Conditional
     - Number of hours the download |url| is valid once the restore
       job is complete.

       ``delivery.methodName" : "HTTP"``

   * - | ``delivery``
       | ``.maxDownloads``
     - number
     - Conditional
     - Number of times the download |url| can be used. This must be
       ``1`` or greater.

       ``delivery.methodName" : "HTTP"``

   * - | ``delivery``
       | ``.methodName``
     - string
     - Required
     - Means by which |mms| delivers the data. Accepted values are:

       - ``AUTOMATED_RESTORE``
       - ``HTTP``

       If you set ``"delivery.methodName" : "AUTOMATED_RESTORE"``,
       you must also set:

       - ``delivery.targetGroupId`` and
       - ``delivery.targetClusterId``

       In addition, the response shows the ``delivery.methodName``
       as ``HTTP``. An automated restore uses the ``HTTP`` method
       to deliver the restore job to the target host.

       .. include:: /includes/note-scp-removed.rst

   * - | ``delivery``
       | ``.targetClusterId``
     - string
     - Conditional
     - Unique identifier of the target cluster. Use the ``clusterId``
       returned in the response body of the
       :doc:`Get All Snapshots </reference/api/snapshots/get-all-snapshots-for-one-cluster>`
       and :doc:`Get a Snapshot </reference/api/snapshots/get-all-snapshots-for-one-cluster>`
       endpoints.

       ``delivery.methodName" : "AUTOMATED_RESTORE"``.

       If backup is not enabled on the target cluster, the
       :doc:`Get All Snapshots </reference/api/snapshots/get-all-snapshots-for-one-cluster/>`
       endpoint returns an empty ``results`` array without
       ``clusterId`` elements, and the
       :doc:`Get a Snapshot </reference/api/snapshots/get-all-snapshots-for-one-cluster>`
       endpoint also does not return a ``clusterId`` element.

   * - | ``delivery``
       | ``.targetGroupId``
     - string
     - Conditional
     - Unique identifier of the project that contains the destination
       cluster for the restore job.

       ``delivery.methodName" : "AUTOMATED_RESTORE"``

   * - ``oplogTs``
     - string
     - Conditional
     - Oplog :manual:`timestamp </reference/bson-types>` given as a
       |epoch-time|. When paired with ``oplogInc``, they represent the
       point in time to which your data will be restored.

       Run a query against ``local.oplog.rs`` on your
       :manual:`replica set </reference/glossary/#std-term-replica-set>` to find the desired timestamp.

       ``"delivery.methodName" : "AUTOMATED_RESTORE"``
       *for Replica Sets Only.*

       If you set ``oplogTs``, you:

       - Must set ``oplogInc``.
       - Cannot set ``checkpointId`` or ``pointInTimeUTCMillis``.

       If you provide this setting, this endpoint restores all data up
       to *and including* this Oplog timestamp to the database you
       specified in the ``delivery`` object.

   * - ``oplogInc``
     - string
     - Conditional
     - 32-bit incrementing ordinal
       that represents operations within a given second. When paired
       with ``oplogTs``, they represent the point in time to which
       your data will be restored.

       ``"delivery.methodName" : "AUTOMATED_RESTORE"``
       *for Replica Sets Only.*

       If you set ``oplogInc``, you:

       - Must set ``oplogTs``.
       - Cannot set ``checkpointId`` or ``pointInTimeUTCMillis``.

       If you provide this setting, this endpoint restores all data up
       to *and including* this Oplog timestamp to the database you
       specified in the ``delivery`` object.

   * - ``pointInTimeUTCMillis``
     - long
     - Conditional
     - |epoch-time-ms| that represents the point in time to which your
       data will be restored. This timestamp must be within last 24
       hours of the current time.

       If you provide this setting, this endpoint restores all data up
       to this :opsmgr:`Point in Time </reference/glossary/#std-term-point-in-time-restore>`  to the
       database you specified in the ``delivery`` object.

       ``"delivery.methodName" : "AUTOMATED_RESTORE"``
       *for Replica Sets Only.*

       If you set ``pointInTimeUTCMillis``, you cannot set
       ``oplogInc``, ``oplogTs``, or ``checkpointId``.

   * - ``snapshotId``
     - string
     - Conditional
     - Unique identifier of the :manual:`snapshot </reference/glossary/#std-term-snapshot>` to restore.
