|explain| operations can return information regarding:

- :ref:`queryPlanner`, which details the plan selected by the
  :doc:`query optimizer </core/query-plans>` and lists the rejected
  plans;

- :ref:`executionStats`, which details the execution of the winning
  plan and the rejected plans; and

- :ref:`serverInfo`, which provides information on the
  MongoDB instance.

The verbosity mode (i.e. ``queryPlanner``, ``executionStats``,
``allPlansExecution``) determines whether the results include
:ref:`executionStats` and whether :ref:`executionStats` includes data
captured during :ref:`plan selection <query-plans-query-optimization>`.
