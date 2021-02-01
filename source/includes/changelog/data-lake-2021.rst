.. _data-lake-v20210126:

26 January 2021 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Adds a new :ref:`adl-sql-stage` ``formatVersion`` to reduce the data
  size of the result set.
- Improves performance of :ref:`adl-lookup-stage`.
- Adds ``"verbosity": "queryPlannerExtended"`` support to the
  :manual:`explain </reference/command/explain>` command to filter out
  non-matching partitions.
- Adds support for :manual:`$$NOW
  </reference/aggregation-variables/#variable.NOW>`.
- Reports {+adl+} as MongoDB version 4.4 to tools.

.. _data-lake-v20210105:

5 January 2021 Release
~~~~~~~~~~~~~~~~~~~~~~

- Adds support for the background option on the :ref:`$out to Atlas
  <adl-out-stage>` aggregation stage.
- Includes stability and performance improvements.

