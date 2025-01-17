.. _atlas-sp-20250114:

14 January 2025 Release
-----------------------

- Change the ``executionTimeSecs`` stat to ``executionTimeMillis``. To
  view this stat, invoke the :method:`sp.processor.stats()` command.
- Change the buffering duration for :ref:`streams-agg-pipeline-emit`
  to {+kafka+} sinks from 1000 milliseconds to five milliseconds.
