Specifies the verbosity mode for the explain output. The mode affects
the behavior of ``explain()`` and determines the amount of information
to return. The possible modes are: ``"queryPlanner"``,
``"executionStats"``, and ``"allPlansExecution"``.

Default mode is ``"queryPlanner"``.

.. COMMENT for docs team - 
   unlike the explain command, for the shell helpers, queryPlanner is
   the default.

For backwards compatibility with earlier versions of
:method:`cursor.explain()`, MongoDB interprets ``true`` as
``"allPlansExecution"`` and ``false`` as ``"queryPlanner"``.
