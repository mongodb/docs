MongoDB runs the :doc:`query optimizer </core/query-plans>` to choose
the winning plan, executes the winning plan to completion, and returns
statistics describing the execution of the winning plan.

.. start-explain-write

.. include:: /includes/fact-explain-write-operations.rst

.. end-explain-write

|explain| returns the :data:`~explain.queryPlanner` and
:data:`~explain.executionStats` information for the evaluated
|operation|. However, :data:`~explain.executionStats` does not
provide query execution information for the rejected plans.
