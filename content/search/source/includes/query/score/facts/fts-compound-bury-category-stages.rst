This query uses the following pipeline stages:

.. list-table::
   :stub-columns: 1

   * - :pipeline:`$search`
     - - Searches for movies that contain the term ``ghost`` in the
         plot or title (``must`` clause) and aren't in the
         ``comedy`` genre (``mustNot`` clause).
       - Searches for movies that contain the term ``ghost`` in the
         plot or title (``must`` clause) and are in the ``comedy``
         genre (``filter`` clause), but reduces the ``score`` by
         50% (``boost``).

   * - :pipeline:`$limit`
     - Limits the number of results to ``10`` documents.

   * - :pipeline:`$project`
     - - Includes only the ``_id``, ``title``, ``plot``, and
         ``genres`` fields from the documents in the results.
       - Adds a field named ``score`` that shows the score in the
         results.
