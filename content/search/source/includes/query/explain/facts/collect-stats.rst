
The ``collectors`` |bson| document contains the following fields:

.. list-table::
   :header-rows: 1
   :widths: 15 15 10 60

   * - Field
     - Type
     - Necessity
     - Purpose

   * - ``allCollectorStats``
     - document
     - Required
     - Statistics of all collectors of the query. Statistics reported represent either
       the maximum value across all collectors used in the query or
       a sum of the statistic across all the sub-collectors. The timing statistics are
       summed to reflect the total time spent across all collectors
       for the entire query. To learn more, see
       :ref:`avs-explain-search-all-collector-stats`.

   * - ``facet``
     - document
     - Optional
     - Breakdown of the query that specifies :ref:`facet
       <fts-facet-ref>`. To learn more, see :ref:`explain-search-facet`.

   * - ``sort``
     - document
     - Optional
     - Breakdown of the query that specifies :ref:`sort <sort-ref>`.
       To learn more, see :ref:`explain-search-sort`.
