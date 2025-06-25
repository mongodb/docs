This task runs the :method:`~db.collection.explain` method on a
sample query in an attempt to identify performance issues. In
practice, it may be difficult to run ``explain()`` on every
query your application runs.

To narrow the list of queries sent by your application to only
those that are slow, you can use a profiler:

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
