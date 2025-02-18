.. _atlas-sp-20250120:

20 January 2025 Release
-----------------------

- Supports the :ref:`$currentDate <atlas-sp-agg-currentdate>` expression
  that returns the system time of your {+spi+} each time {+atlas-sp+} evaluates it.
- Supports reading JSON documents with embedded file signatures (magic bytes).
- Fixes an issue that prevented the configuration of hopping windows with
  ``hopSize`` greater than ``interval``.



.. _atlas-sp-20250114:

14 January 2025 Release
-----------------------

- Changes the ``executionTimeSecs`` stat to ``executionTimeMillis``. To
  view this stat, invoke the :method:`sp.processor.stats()` command.
- Changes the buffering duration for :ref:`streams-agg-pipeline-emit`
  to {+kafka+} sinks from 1000 milliseconds to five milliseconds.
