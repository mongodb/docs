Verbosity mode controls the behavior of ``explain`` and the amount of 
information returned. Value can be one of the following,
in order of decreasing verbosity: 

.. list-table:: 
   :widths: 30 70 

   * - :manual:`allPlansExecution 
       </reference/explain-results/#explain.executionStats>`
     - Information about the query plan including the ``stats`` fields, 
       which contain execution statistics for the query. Includes partial 
       execution data captured during plan selection.

   * - :manual:`executionStats 
       </reference/explain-results/#explain.executionStats>`
     - Information about the query plan including the ``stats`` fields, 
       which contain execution statistics for the query.

   * - :manual:`queryPlanner 
       </reference/explain-results/#explain.queryPlanner>` (default)
     - Information about the query plan. Does not include the 
       ``stats`` fields, which contain execution statistics for 
       the query.

.. seealso:: 
       
   :manual:`Verbosity Modes 
   </reference/command/explain/#verbosity-modes>`
