
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
       request will succeed. This also means that the initial sync has
       completed and is applying change events.

   * - ``canWrite``
     - boolean
     - If ``true``, indicates that writes are permitted on the
       destination cluster. Do not write to the destination cluster
       while ``canWrite`` is ``false``.
  
       Index validation continues until the :ref:`commit
       <c2c-api-commit>` is complete.

   * - ``info``
     - string
     - Provides extra information on the synchronization progress.
       Possible ``info`` values include:

       - ``"collection copy"``
       - ``"change event application"``
       - ``"waiting for commit to complete"``
       - ``"commit completed"``

   * - ``lagTimeSeconds``
     - integer
     - Time difference in seconds between the latest event timestamp that
       ``mongosync`` applied to the destination cluster and the latest
       timestamp on the source cluster for this instance of ``mongosync``.

       ``mongosync`` performs periodic no-op writes on the source cluster,
       which may prevent the value of the ``lagTimeSeconds`` field from
       reaching zero until ``mongosync`` commits the migration.

       Due to constant no-ops on the source cluster, the time difference
       is often a few seconds above zero, even if there are no real
       writes on the source cluster. The time difference becomes zero
       when ``mongosync`` commits the migration.

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
       

       ``mongosync`` approximates the estimated total number of bytes
       prior to migration and does not update this value during the
       synchronization process. This value does not reflect changes
       made to the source cluster during sync and is not an accurate
       indicator of migration progress. 

   * - ``collectionCopy``
       ``.estimatedCopiedBytes``
     - integer
     - Estimated number of bytes which have been copied to the destination
       cluster by this ``mongosync`` instance during the initial copying of 
       collections.

       To calculate the total estimated progress as a percentage, add the value
       of the ``estimatedCopiedBytes`` field for each ``mongosync`` instance
       and divide the result by the value of the ``estimatedTotalBytes`` field
       . Then, multiply the result by 100.


       The value of ``estimatedCopiedBytes`` may be larger than the
       value of the ``estimatedTotalBytes`` due to retried operations.
       A comparison of ``estimatedTotalBytes`` and
       ``estimatedCopiedBytes`` is not an accurate indicator of
       migration progress.  

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

