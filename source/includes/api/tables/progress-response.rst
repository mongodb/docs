
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
     - Time in seconds between the last applied event and time of the
       current latest event for this instance of ``mongosync``.

       .. note::

          ``mongosync`` performs periodic no-op writes on the source cluster,
          which may prevent the value of the ``lagTimeSeconds`` field from
          reaching zero.

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
       
       .. note::

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

       .. note::

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
     - The identifier string for the ``mongosync`` instance.

   * - ``coordinatorID``
     - string
     - The identifier string for the coordinator instance.

       - When ``mongosync`` is coordinated by another instance, this field shows
         the identifier string for the coordinator instance.

       - When ``mongosync`` is a coordinator or runs alone, this field returns
         the same value as its ``mongosyncID`` field.

       - When ``mongosync`` starts up, this field returns ``null`` until
         ``mongosync`` identifies the coordinator.

