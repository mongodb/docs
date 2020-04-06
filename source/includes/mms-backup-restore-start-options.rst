.. list-table::
   :header-rows: 1
   :widths: 20 10 60 10

   * - Option 
     - Type 
     - Description 
     - Required? 

   * - ``--checkpoint``
     - string
     - *Only available for AUTOMATED RESTORE of sharded clusters.*

       The unique identifier for the :manual:`sharded cluster 
       </reference/glossary/#term-sharded-cluster>` checkpoint that 
       represents the point in time to which your data will be restored.

       .. note:: 

          If you set ``checkpointId``, you cannot set ``oplogInc``, ``oplogTs``, 
          or ``pointInTimeUTCMillis``.
     - no

   * - ``--clusterId``
     - string
     - The unique identifier of the cluster that the job represents.
     - yes

   * - ``--expirationHours``
     - integer
     - *Only available for HTTP.*
     
       The number of hours the download URL is valid once the restore job is 
       complete.
     - no

   * - ``--oplogInc``
     - string
     - *Only available for AUTOMATED RESTORE of replica sets.*

       The 32-bit incrementing ordinal that represents operations within a 
       given second. When paired with ``oplogTs``, they represent the point 
       in time to which your data will be restored.

       .. note::

          If you set ``oplogInc``, you:

          - Must set ``oplogTs``. 
          - Cannot set ``checkpointId`` or ``pointInTimeUTCMillis``.
     - no

   * - ``--oplogTs``
     - string
     - *Only available for AUTOMATED RESTORE of replica sets.*

       The oplog :manual:`timestamp </reference/bson-types>` given as a
       |epoch-time|. When paired with ``oplogInc``, they represent the
       point in time to which your data will be restored.

       .. note::

          If you set ``oplogTs``, you:

          - Must set ``oplogInc``. 
          - Cannot set ``checkpointId`` or ``pointInTimeUTCMillis``.
     - no

   * - ``--pointInTimeUTCMillis``
     - integer
     - *Only available for AUTOMATED RESTORE of replica sets.* 

       The |epoch-time-ms| that represents the point in time to which 
       your data will be restored. This timestamp must be within last 24 
       hours of the current time.

       .. note::

          If you set ``pointInTimeUTCMillis``, you cannot set
          ``oplogInc``, ``oplogTs``, or ``checkpointId``.
     - no

   * - ``--profile``, ``-p``
     - string
     - Name of the profile where the project ID and the |svc-api-key|\s 
       for the project are saved. If omitted, uses the ``default`` profile. 
       To learn more about creating a profile, see :ref:`mcli-configure`.
     - no

   * - ``--projectId``
     - string
     - Unique identifier of the project that contains the cluster. 
       If omitted, uses the project ID in the profile or :ref:`environment 
       variable <mcli-env-var>`.
     - no

   * - ``--maxDownloads``
     - integer
     - *Only available for HTTP.*

       The number of times the download |url| can be used. This must be
       ``1`` or greater.
     - no

   * - ``--snapshotId``
     - string
     - The unique identifier of the snapshot to use for restore.

       .. note:: 

          If you set snapshotId, you cannot set ``oplogInc``, ``oplogTs``, 
          ``pointInTimeUTCMillis``, or ``checkpointId``.
     - yes

   * - ``--targetClusterId``
     - string
     - *Only available for AUTOMATED RESTORE.*

       The unique identifier of the target cluster to restore.
     - no

   * - ``--targetProjectId``
     - string
     - *Only available for AUTOMATED RESTORE.* 

       The unique identifier of the project that contains the destination 
       cluster for the restore job
     - no