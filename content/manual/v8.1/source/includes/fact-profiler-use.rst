
.. list-table::
   :header-rows: 1
   :stub-columns: 1

   * - Profiler
     - Description

   * - :ref:`Atlas Query Profiler <query-profiler>`
     - Provides a scatterplot chart to Atlas customers, making
       it easy to identify slow queries and performance
       outliers.
   * - :ref:`database-profiler`
     - Stores query performance information in a collection,
       allowing you to query MongoDB for queries with
       specific performance issues.

Both the Atlas Query Profiler and the database profiler can
affect server performance, use up disk space, and expose query
metadata around encrypted fields. Consider the performance and
security implications before enabling them.
