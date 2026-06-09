The sample query uses the following pipeline stages to retrieve
results for the first page and retrieve tokens or a point of reference
for subsequent queries:

.. list-table::
   :widths: 20 80
   :header-rows: 1

   * - Pipeline Stage
     - Description

   * - :pipeline:`$search`

     - - Searches for titles that contain ``summer`` in the ``title``
         field by using the :ref:`text <text-ref>` operator.
       - Sorts the results by the ``released`` field value in
         ascending order by using the :ref:`sort <sort-ref>` option.

   * - :pipeline:`$limit`
     - Limits the results to ``10`` documents.

   * - :pipeline:`$project`
     - Includes only the ``title``, ``released``, and ``genres``
       fields from the documents in the results. The query also adds
       the following fields to each document in the results:

       - ``paginationToken``, which is the token that can be used as a
         point of reference in subsequent queries
       - ``score``, which is the relevance score of the document in
         the results
