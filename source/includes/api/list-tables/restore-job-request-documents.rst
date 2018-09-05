.. list-table::
   :widths: 15 15 70
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - checkpointId
     - string
     - *Conditional: Sharded Clusters Only.* Unique identifier for the
       :term:`sharded cluster` :term:`checkpoint <checkpoint>` that
       represents the point in time to which your data will be
       restored.

       .. note::

          If you set ``checkpointId``, you cannot set ``oplogInc``,
          ``oplogTs``, or ``pointInTimeUTCMillis``.

       If you provide this setting, this endpoint restores all data up
       to this :term:`checkpoint <checkpoint>` to the database you
       specified in the ``delivery`` object.

   * - delivery
     - object
     - Method and details of how the restored :term:`snapshot` data
       is delivered.

   * - delivery.expires
     - timestamp
     - Date after which the |url| is no longer available.

       Only present if ``"delivery.methodName" : "HTTP"``.

   * - delivery.expirationHours
     - number
     - Number of hours the download :abbr:`URL (Uniform Resource
       Locator)` is valid once the restore job is complete.

       Only needed if ``"delivery.methodName" : "HTTP"``.

   * - delivery.maxDownloads
     - number
     - Number of times the download :abbr:`URL (Uniform Resource
       Locator)` can be used. This must be ``1`` or greater.

       Only needed if ``"delivery.methodName" : "HTTP"``.

   * - delivery.methodName
     - string
     - Means by which the data is delivered. Accepted values are:

       - ``AUTOMATED_RESTORE``
       - ``HTTP``
       - ``QUERY``

       .. note::

          If you specify ``AUTOMATED_RESTORE`` in the request , the
          response shows the ``delivery.methodName`` as ``HTTP``. An
          automated restore uses the ``HTTP`` method to deliver the
          restore job to the target host.

       .. include:: /includes/note-scp-removed.rst

   * - delivery.targetClusterId
     - string
     - Unique identifier of the destination cluster to perform the
       restore job. 
       
       Only required if ``delivery.methodName" : "AUTOMATED_RESTORE"``.
       
   * - delivery.targetGroupId
     - string
     - Unique identifier of the project that contains the destination 
       cluster for the restore job.

       Only required if ``delivery.methodName" : "AUTOMATED_RESTORE"``.

   * - delivery.url
     - string
     - The :abbr:`URL (Uniform Resource Locator)` from which the
       restored snapshot data can be downloaded.

       Only needed if ``"delivery.methodName" : "HTTP"``.

   * - oplogTs
     - string
     - *Conditional: Replica Sets Only.* Oplog
       :manual:`timestamp </reference/bson-types>` given as a
       |epoch-time|. When paired with ``oplogInc``, they represent the
       point in time to which your data will be restored.

       Run a query against :data:`local.oplog.rs` on your
       :term:`replica set` to find the desired timestamp.

       .. note::

          If you set ``oplogTs``, you:

          - Must set ``oplogInc``. 
          - Cannot set ``checkpointId`` or ``pointInTimeUTCMillis``.

       If you provide this setting, this endpoint restores all data up
       to *and including* this Oplog timestamp to the database you
       specified in the ``delivery`` object.

   * - oplogInc
     - string
     - *Conditional: Replica Sets Only.* 32-bit incrementing ordinal
       that represents operations within a given second. When paired
       with ``oplogTs``, they represent the point in time to which
       your data will be restored.

       .. note::

          If you set ``oplogInc``, you:

          - Must set ``oplogTs``. 
          - Cannot set ``checkpointId`` or ``pointInTimeUTCMillis``.

       If you provide this setting, this endpoint restores all data up
       to *and including* this Oplog timestamp to the database you
       specified in the ``delivery`` object.

   * - pointInTimeUTCMillis
     - long
     - *Conditional: Replica Sets Only.* A |epoch-time| that
       represents the point in time to which your data will be
       restored. This timestamp must be within last 24 hours of the
       current time.

       If you provide this setting, this endpoint restores all data up
       to this :term:`Point in Time <point-in-time restore>` to the
       database you specified in the ``delivery`` object.

       .. note::

          If you set ``pointInTimeUTCMillis``, you cannot set
          ``oplogInc``, ``oplogTs``, or ``checkpointId``.

   * - snapshotId
     - string
     - Unique identifier of the :term:`snapshot` to restore.

