You can specify the level of detail of your explanation by passing a
verbosity level to the ``explain()`` method.  

The following table shows all verbosity levels for explanations and
their intended use cases: 

.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 40 60

   * - Verbosity Level
     - Use Case

   * - ALL_PLANS_EXECUTIONS
     - You want to know which plan MongoDB will choose to run your query.

   * - EXECUTION_STATS
     - You want to know if your query is performing well.

   * - QUERY_PLANNER
     - You have a problem with your query and you want as much information
       as possible to diagnose the issue.
     