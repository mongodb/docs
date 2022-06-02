.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 20 14 66

   * - Field
     - Type
     - Description

   * - ``state``
     - string
     - The current state of {+c2c-product-name+}.

   * - ``canCommit``
     - boolean
     - If ``true``, indicates that a :ref:`commit <c2c-api-commit>`
       request will succeed. This also means that the initial sync has
       completed and is applying change events.

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
       current latest event.

   * - ``collectionCopy``
     - object
     - Describes the total amount of data being copied and the
       amount that has already been copied to the destination cluster.

   * - ``collectionCopy.estimatedTotalBytes``
     - integer
     - Estimated total number of bytes to be copied.

   * - ``collectionCopy.estimatedCopiedBytes``
     - integer
     - Estimated number of bytes which have been copied to the
       destination cluster.

   * - ``directionMapping``
     - object
     - Describes the mapping direction for the synchronization, namely
       the source and destination clusters.

   * - ``directionMapping.Source``
     - string
     - Source cluster. Returned in the form
       ``<cluster name>: <host>:<port>``.

   * - ``directionMapping.Destination``
     - string
     - Destination cluster. Returned in the form
       ``<cluster name>: <host>:<port>``.
     
