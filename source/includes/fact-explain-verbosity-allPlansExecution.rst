MongoDB runs the :doc:`query optimizer
</core/query-plans>` to choose the winning plan and executes the
winning plan to completion. In ``"allPlansExecution"`` mode, MongoDB
returns statistics describing the execution of the winning plan as well
as statistics for the other candidate plans captured during :ref:`plan
selection <query-plans-query-optimization>`.

.. start-explain-write

.. include:: /includes/fact-explain-write-operations.rst

.. end-explain-write

|explain| returns the :data:`~explain.queryPlanner` and
:data:`~explain.executionStats` information for the evaluated
|operation|. The :data:`~explain.executionStats` includes the
*completed* query execution information for the *winning plan*.

If the query optimizer considered more than one plan,
:data:`~explain.executionStats` information also includes the *partial*
execution information captured during the :ref:`plan selection phase
<query-plans-query-optimization>` for both the winning and rejected
candidate plans.
