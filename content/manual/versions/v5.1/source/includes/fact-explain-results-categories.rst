|explain| operations can return information regarding:

- ``explainVersion``, the output format version (for example, ``"1"``);

- ``command``, which details the command being explained;

- :ref:`queryPlanner`, which details the plan selected by the
  :doc:`query optimizer </core/query-plans>` and lists the rejected
  plans;

- :ref:`executionStats`, which details the execution of the winning
  plan and the rejected plans;

- :ref:`serverInfo`, which provides information on the
  MongoDB instance; and

- ``serverParameters``, which details internal parameters.

The verbosity mode (i.e. ``queryPlanner``, ``executionStats``,
``allPlansExecution``) determines whether the results include
:ref:`executionStats` and whether :ref:`executionStats` includes data
captured during :ref:`plan selection <query-plans-query-optimization>`.
