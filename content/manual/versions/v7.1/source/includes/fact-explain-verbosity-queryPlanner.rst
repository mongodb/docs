MongoDB runs the :doc:`query optimizer </core/query-plans>` to choose
the winning plan for the operation under evaluation. |explain| returns
the :data:`~explain.queryPlanner` information for the evaluated
|operation|.
