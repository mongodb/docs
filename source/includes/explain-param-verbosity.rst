Specifies the verbosity mode for the explain output. The mode affects
the behavior of ``explain()`` and determines the amount of information
to return.

The possible modes are: :ref:`"queryPlanner"
<explain-method-queryPlanner>`, :ref:`"executionStats"
<explain-method-executionStats>`, and :ref:`"allPlansExecution"
<explain-method-allPlansExecution>`.

For backwards compatibility with :method:`cursor.explain()`, MongoDB
interprets ``true`` as :ref:`"allPlansExecution"
<explain-allPlansExecution>` and ``false`` as :ref:`"queryPlanner"
<explain-queryPlanner>`.

Default mode is :ref:`"queryPlanner" <explain-method-queryPlanner>`.

For more information on the modes, see :ref:`explain-method-verbosity`.

.. COMMENT unlike the explain command, for the methods, queryPlanner is the default.
