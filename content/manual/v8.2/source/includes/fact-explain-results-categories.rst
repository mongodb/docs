|explain| operations can return information regarding:

- ``explainVersion``, the output format version (for example, ``"1"``).

- ``command``, which details the command being explained.

- ``queryShapeHash``, starting in MongoDB 8.0, which is a hexadecimal
  string with the hash of a :term:`query shape`. For details, see
  :ref:`query-shapes`, :ref:`explain-output-query-shape-hash`, and
  :data:`explain.queryShapeHash`.

- :ref:`queryPlanner`, which details the plan selected by the
  :ref:`query optimizer <read-operations-query-optimization>` and lists the rejected
  plans.

- :ref:`executionStats`, which details the execution of the winning
  plan and the rejected plans.

- :ref:`serverInfo`, which provides information on the
  MongoDB instance.

- ``serverParameters``, which details internal parameters.


The verbosity mode (i.e. ``queryPlanner``, ``executionStats``,
``allPlansExecution``) determines whether the results include
:ref:`executionStats` and whether :ref:`executionStats` includes data
captured during :ref:`plan selection <query-plans-query-optimization>`.

Explain output is limited by the maximum :limit:`Nested Depth for BSON
Documents`, which is 100 levels of nesting. Explain output that exceeds
the limit is truncated.

