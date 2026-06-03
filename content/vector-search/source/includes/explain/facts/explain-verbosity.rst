Verbosity mode controls the behavior of ``explain`` and the amount of 
information returned. Value can be one of the following,
in order of decreasing verbosity: 

.. list-table:: 
   :widths: 30 70 

   * - :ref:`allPlansExecution <executionStats>`
     - Information about the query plan including the ``stats`` fields, 
       which contain execution statistics for the query. Includes partial 
       execution data captured during plan selection.

   * - :ref:`executionStats <executionStats>`
     - Information about the query plan including the ``stats`` fields, 
       which contain execution statistics for the query.

   * - :ref:`queryPlanner <queryPlanner>` (default)
     - Information about the query plan. Does not include the 
       ``stats`` fields, which contain execution statistics for 
       the query.

.. seealso:: 
       
   :manual:`Verbosity Modes 
   </reference/command/explain/#verbosity-modes>`
