This query uses the following pipeline stages:

.. list-table::
   :stub-columns: 1

   * - :pipeline:`$search`
     - - Searches for movies that contain the term ``ghost`` in the
         plot or title (``must`` clause), but doesn't have the
         specified ObjectIds (``mustNot`` clause).
       - Searches for movies that contain the term ``ghost`` in the
         plot or title (``must`` clause) and have the specified
         ObjectIds (``filter`` clause), but reduces the ``score``
         by 50% (``boost``).

   * - :pipeline:`$limit`
     - Limits the number of results to ``10`` documents.

   * - :pipeline:`$project`
     - - Includes only the ``title``, ``plot``, and ``_id`` fields
         from the documents in the results.
       - Adds a field named ``score`` that shows the score of the
         document in the results.
