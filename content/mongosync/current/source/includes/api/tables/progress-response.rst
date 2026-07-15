
.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 20 20 60

   * - Field
     - Type
     - Description

   * - ``state``
     - string
     - The current state of ``mongosync``. For information on the
       possible states, see :ref:`c2c-states-descriptions`.

   * - ``canCommit``
     - boolean
     - If ``true``, indicates that a :ref:`commit <c2c-api-commit>`
       request succeeds. This also means that:

       - The initial sync has completed and is applying change
         events.
       - The embedded verifier is in an appropriate state for
         commit.
       - The lag for ``mongosync`` and the embedded verifier is
         30 seconds or less.

       If you set :ref:`buildIndexes <mongosync-build-indexes>`
       to ``"afterDataCopy"`` or ``"excludeHashedAfterCopy"``
       when calling ``start``, ``{canCommit: true}`` also
       indicates that index builds are complete.

       .. versionchanged:: 1.21

          ``canCommit`` is ``false`` when ``mongosync`` or the
          embedded verifier reports more than 30 seconds of lag.

   * - ``canWrite``
     - boolean
     - If ``true``, indicates that writes are permitted on the
       destination cluster. Do not write to the destination cluster
       while ``canWrite`` is ``false``.
  
       Index validation continues until the :ref:`commit
       <c2c-api-commit>` is complete.

   * - ``indexBuilding``
     - object
     - Shows real-time progress of index builds on the destination cluster if you
       set ``buildIndexes`` to ``afterDataCopy`` or ``excludeHashedAfterCopy``
       when calling ``start``. This object is only displayed during the
       :ref:`Change Event Application <c2c-cea>` phase.

       :gold:`IMPORTANT:` Because ``mongosync`` creates indexes for the largest
       collections first, the percentage of indexes built might not linearly
       correspond to the percentage of time elapsed.
   
   * - ``indexBuilding.indexesBuilt``
     - integer
     - The number of indexes that ``mongosync`` has finished building.

   * - ``indexBuilding.totalIndexesToBuild``
     - integer
     - The total number of indexes that ``mongosync`` needs to build, 
       including those that it has finished building.

   * - ``indexBuilding.collectionsFinished``
     - integer
     - The number of collections that ``mongosync`` has completed index builds for.

   * - ``indexBuilding.collectionsTotal``
     - integer
     - The total number of collections that ``mongosync`` needs to build indexes
       for, including those that have been completed.

   * - ``info``
     - string
     - Provides extra information on the synchronization progress.
       Possible ``info`` values include:

       - ``"collection copy"``
       - ``"change event application"``
       - ``"waiting for commit to complete"``
       - ``"commit completed"``

   * - ``lag``
     - object
     - Reports synchronization lag broken down by component. The ``lag``
       object is ``null`` when ``mongosync`` is in the ``IDLE`` or
       ``PAUSED`` state.

       .. versionadded:: 1.21

   * - ``lag.overallLagSeconds``
     - integer
     - Time difference in seconds between the latest event timestamp
       that ``mongosync`` applied to the destination cluster and the
       latest timestamp on the source cluster. Equals ``lagTimeSeconds``
       in all states.

       .. versionadded:: 1.21

   * - ``lag.crudLagSeconds``
     - integer
     - CRUD component of the synchronization lag in seconds. This field
       is ``null`` when ``mongosync`` has not yet set the source
       timestamp for CRUD operations.

       .. versionadded:: 1.21

   * - ``lag.ddlLagSeconds``
     - integer
     - DDL component of the synchronization lag in seconds. This field
       is ``null`` when the DDL applier is disabled (for example, when
       the source server version is earlier than 6.0) or when no DDL
       event has been applied yet.

       .. versionadded:: 1.21

   * - ``lagTimeSeconds``
     - integer
     - *Deprecated in mongosync 1.21.* Use ``lag.overallLagSeconds``
       instead. This field may be removed in a future version.

       Time difference in seconds between the latest event timestamp
       that ``mongosync`` applied to the destination cluster and the
       latest timestamp on the source cluster for this instance of
       ``mongosync``.

       ``mongosync`` performs periodic no-op writes on the source
       cluster, which may prevent the value of the ``lagTimeSeconds``
       field from reaching zero until ``mongosync`` commits the
       migration.

       Due to constant no-ops on the source cluster, the time difference
       is often a few seconds above zero, even if there are no real
       writes on the source cluster. The time difference becomes zero
       when ``mongosync`` commits the migration.

       As of version 1.9, ``/progress`` also reports verifier lag. See
       ``verification.source.lagTimeSeconds`` and
       ``verification.destination.lagTimeSeconds`` in this table.

   * - ``totalEventsApplied``
     - integer
     - The approximate number of change events this instance of 
       ``mongosync`` has applied to the destination cluster.

       This value may not be an accurate representation of the total 
       number of events because it is not persisted and it omits 
       certain events from the count.

   * - ``collectionCopy``
     - object
     - Estimates the total amount of data being copied from collections and the
       amount that has already been copied to the destination cluster

   * - ``collectionCopy``
       ``.estimatedTotalBytes``
     - integer
     - Estimated total number of bytes to be copied globally by all
       ``mongosync`` instances during the initial copying of
       collections.

       ``mongosync`` calculates this value before collection copy
       begins. During collection copy, this value only changes if
       ``estimatedCopiedBytes`` exceeds it, in which case ``mongosync``
       raises ``estimatedTotalBytes`` to equal ``estimatedCopiedBytes``.
       After collection copy completes, ``estimatedTotalBytes`` equals
       ``estimatedCopiedBytes``. This value is a best-effort estimate.

   * - ``collectionCopy``
       ``.estimatedCopiedBytes``
     - integer
     - Estimated number of bytes copied to the destination cluster by
       this ``mongosync`` instance during the initial copying of
       collections.

       To calculate total estimated progress as a percentage:

       #. Add the ``estimatedCopiedBytes`` value for each
          ``mongosync`` instance.
       #. Divide the result by ``estimatedTotalBytes``.
       #. Multiply the result by 100.

       Both values are best-effort estimates and may not accurately
       reflect actual migration progress.

   * - ``destination.`` ``pingLatencyMs``
     - integer
     - Provides the last-known ping latency, in milliseconds, from ``mongosync`` to the destination cluster.
       This field is refreshed every 30 seconds while replication is still in progress and reported in the response.
       If latency is less than ``1`` millisecond or ``mongosync`` has not performed the ping yet, this field is absent.
       This field has a value of ``-1`` if the last ping attempt failed.

       .. versionadded:: 1.17

   * - ``directionMapping``
     - object
     - Describes the mapping direction for the synchronization, namely
       the source and destination clusters.

   * - ``directionMapping``
       ``.Source``
     - string
     - Source cluster. Returned in the form
       ``<cluster name>: <host>:<port>``.

   * - ``directionMapping``
       ``.Destination``
     - string
     - Destination cluster. Returned in the form
       ``<cluster name>: <host>:<port>``.
  
   * - ``estimatedOplogTimeRemaining``
     - string
     - Shows estimate of the oplog time available on the source cluster.
       Possible values include a duration (for example, ``"12 hours"``,
       ``"4 hours"``, or ``"45 minutes"``) and special cases such as
       ``"more than 72 hours"``, ``"less than 15 minutes"``, and
       ``"not checked yet"``.

       ``mongosync`` calculates ``estimatedOplogTimeRemaining`` as the time window
       between the oldest available oplog entry on the source cluster and the
       oldest oplog entry that ``mongosync`` still needs to complete
       successfully. ``mongosync`` updates this value every five minutes.

       :gold:`IMPORTANT:` If you increase the oplog size on the source cluster,
       ``estimatedOplogTimeRemaining`` might not increase immediately. As
       ``mongosync`` processes the source oplog, the available oplog window
       typically increases.

       ``mongosync`` reports ``estimatedOplogTimeRemaining`` only while it checks
       oplog time. ``mongosync`` includes this field only when it is in the
       ``RUNNING`` state and only before the ``/progress`` endpoint returns
       ``canWrite=true``.
    
       .. versionadded:: 1.19

   * - ``estimatedSecondsToCEACatchup``
     - integer
     - Estimated time in seconds remaining in the :ref:`Change Event Application 
       <c2c-cea>` (CEA) phase, based on how much ``lagTimeSeconds`` has 
       decreased over a recent interval.

       ``/progress`` does not report ``estimatedSecondsToCEACatchup`` 
       if ``mongosync`` is not in CEA, or if ``lagTimeSeconds`` has increased 
       or stayed the same over the most recent interval. In this case, 
       wait 30 minutes and then try again.

       .. versionadded:: 1.14

   * - ``mongosyncID``
     - string
     - Identifier string for the ``mongosync`` instance.

       .. versionadded:: 1.3

   * - ``coordinatorID``
     - string
     - Identifier string for the coordinator instance.

       - When ``mongosync`` is coordinated by another instance, this field shows
         the identifier string for the coordinator instance.

       - When ``mongosync`` is a coordinator or runs alone, this field returns
         the same value as its ``mongosyncID`` field.

       - When ``mongosync`` starts up, this field returns ``null`` until
         ``mongosync`` identifies the coordinator.

       .. versionadded:: 1.3

   * - ``source.`` ``pingLatencyMs``
     - integer
     - Provides the last-known ping latency, in milliseconds, from ``mongosync`` to the source cluster.
       This field is refreshed every 30 seconds while replication is still in progress and reported in the response.
       If latency is less than ``1`` millisecond or ``mongosync`` has not performed the ping yet, this field is absent.
       This field has a value of ``-1`` if the last ping attempt failed.

       .. versionadded:: 1.17

   * - ``verification``
     - document
     - Provides information on the phase and progress of
       verification checks performed by the embedded verifier.

       .. versionadded:: 1.9

   * - ``verification.source``
     - document
     - Provides information on the phase and progress of
       verification checks running on the source cluster.

       .. versionadded:: 1.9

   * - ``verification.source.`` ``estimatedDocumentCount``
     - integer
     - Estimated number of documents on the source cluster.

       .. versionadded:: 1.9

   * - ``verification.source.`` ``hashedDocumentCount``
     - integer
     - Number of documents hashed by the verifier on the
       source cluster.

       .. versionadded:: 1.9

   * - ``verification.source.`` ``lagTimeSeconds``
     - integer
     - Time in seconds after the last verification check was
       performed on the source cluster.

       .. versionadded:: 1.9

   * - ``verification.source.`` ``phase``
     - string
     - Current phase of the verification process on the source
       cluster. This can be one of three values:

       - ``"not started"``: The verifier has not started any 
         initial collection scans for this cluster.
       - ``"initial hashing"``: The verifier is doing its initial 
         scan for at least one collection in the cluster.
       - ``"stream hashing"``: The verifier has finished its initial 
         scan for the cluster and is now following its 
         change stream. 
         
       If the verifier needs to re-scan a collection, the verifier can go back to
       the ``"initial hashing"`` phase even if the endpoint previously 
       reported the ``"stream hashing"`` phase.

       .. versionadded:: 1.9

   * - ``verification.source.`` ``scannedCollectionCount``
     - integer
     - Number of collections scanned by the embedded verifier on
       the source cluster.

       .. versionadded:: 1.9

   * - ``verification.source.`` ``totalCollectionCount``
     - integer
     - Number of collections on the source cluster to include in
       verification checks.

   * - ``verification.destination``
     - document
     - Provides information on the phase and progress of
       verification checks running on the destination cluster.

       .. versionadded:: 1.9

   * - ``verification.destination.`` ``estimatedDocumentCount``
     - integer
     - Estimated number of documents on the destination cluster.

       .. versionadded:: 1.9

   * - ``verification.destination.`` ``hashedDocumentCount``
     - integer
     - Number of documents hashed by the verifier on the
       destination cluster.

       .. versionadded:: 1.9

   * - ``verification.destination.`` ``lagTimeSeconds``
     - integer
     - Time in seconds since the last verification check
       performed on the destination cluster.

       .. versionadded:: 1.9

   * - ``verification.destination.`` ``phase``
     - string
     - Current phase of the verification process on the destination
       cluster. This can be one of three values:

       - ``"not started"``: The verifier has not started any 
         initial collection scans for this cluster.
       - ``"initial hashing"``: The verifier is doing its initial 
         scan for at least one collection in the cluster.
       - ``"stream hashing"``: The verifier has finished its initial 
         scan for the cluster and is now following its 
         change stream. 
         
       If the verifier needs to re-scan a collection, the verifier can go back to
       the ``"initial hashing"`` phase even if the endpoint previously 
       reported the ``"stream hashing"`` phase.

       .. versionadded:: 1.9

   * - ``verification.destination.`` ``scannedCollectionCount``
     - integer
     - Number of collections scanned by the embedded verifier on
       the destination cluster.

       .. versionadded:: 1.9

   * - ``verification.destination.`` ``totalCollectionCount``
     - integer
     - Number of collections on the destination cluster to
       include in verification checks.

       .. versionadded:: 1.9

   * - ``warnings``
     - array of strings
     - Warning messages that ``mongosync`` detects. If ``mongosync`` detects no
       warnings, it omits this field.

       If the estimated oplog time remaining is very low, ``mongosync`` adds a
       warning that describes the issue and links to the documentation. For example:

       .. code-block:: json

          "warnings": [
            "The amount of available oplog on the source cluster is too small for mongosync to complete successfully.
            For more details, see https://www.mongodb.com/docs/cluster-to-cluster-sync/current/reference/oplog-sizing/."
          ]

       For more details, see :ref:`c2c-oplog-sizing`.

       If ``mongosync`` blocks user writes on the source cluster,
       ``mongosync`` adds a warning to the ``warnings`` field.
       To learn more, see :ref:`c2c-write-blocking`.

       .. versionadded:: 1.19
