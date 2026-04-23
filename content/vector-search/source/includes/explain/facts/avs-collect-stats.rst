The ``collectors`` is a |bson| document with the following field:

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
