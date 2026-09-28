MongoDB runs the :ref:`query optimizer <read-operations-query-optimization>` to choose
the winning plan for the operation under evaluation. |explain| returns
the :data:`~explain.queryPlanner` information for the evaluated
|operation|.
