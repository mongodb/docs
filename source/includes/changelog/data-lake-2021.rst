.. _data-lake-v20210511:

8 June 2021 Release
~~~~~~~~~~~~~~~~~~~

- Improves stability and performance.
- Supports public S3 data stores with the ``public`` configuration flag.
- Supports Zstandard compression.
- Adds ``db`` field to ``dbStats`` result.

11 May 2021 Release
~~~~~~~~~~~~~~~~~~~

- Supports selecting read preference, read tags, and max staleness 
  through the :ref:`storage configuration <datalake-configuration-file>` for Atlas Cluster stores.
- Rejects commands sent with a Versioned API set.
- Enables the ``count`` parameter in the {+data-lake-short+} 
  :ref:`adl-collstats-stage` aggregation stage.
- No longer permits :ref:`adl-collstats-stage` in ``$facet`` 
  sub-pipelines.
- Enforces maximum document size for ``$facet`` after processing each 
  item.
- Improves performance for ``$match`` stages.
- Improves error messaging.

.. _data-lake-v20210423:

21 April 2021 Release
~~~~~~~~~~~~~~~~~~~~~

- Improves stability and performance.
- Includes improved support for Parquet.
- Supports ``M0``, ``M2``, & ``M5`` |service| clusters as data sources.
- Adds :ref:`regex pattern matching <datalake-databases-reference>` 
  option for wildcard collections from |service| Clusters.
- Includes updated error messages for query execution limit.

.. _data-lake-v20210330:

30 March 2021 Release
~~~~~~~~~~~~~~~~~~~~~

- Generates storage configuration automatically for the first time 
  after user authentication.
- Returns connection ID through the ``hello`` command.
- Supports ``$geoNear`` on {+adl+} collections that span multiple 
  |service| clusters.
- Includes various performance improvements.
- Includes improved error messages for terminated queries.

.. _data-lake-v20210309:

09 March 2021 Release
~~~~~~~~~~~~~~~~~~~~~

- Includes new onboarding and storage configuration interface.
- Improved SQL schema error message.
- Support query pushdown to collections comprised of multiple Atlas
  collections.
- Improves stability and performance.

.. _data-lake-v20210216:

16 February 2021 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Adds :ref:`SQL schema generation <query-with-sql>` for wildcard
  collections.
- Fixes stability and performance issues.

.. _data-lake-v20210126:

26 January 2021 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Adds a new :ref:`adl-sql-stage` ``formatVersion`` to reduce the data
  size of the result set.
- Improves performance of :ref:`adl-lookup-stage`.
- Adds ``"verbosity": "queryPlannerExtended"`` support to the
  :manual:`explain </reference/command/explain>` command to filter out
  non-matching partitions.
- Adds support for
  :manual:`$$NOW </reference/aggregation-variables/#variable.NOW>`.
- Reports {+adl+} as MongoDB version 4.4 to tools.

.. _data-lake-v20210105:

5 January 2021 Release
~~~~~~~~~~~~~~~~~~~~~~

- Adds support for the background option on the
  :ref:`$out to Atlas <adl-out-stage>` aggregation stage.
- Includes stability and performance improvements.

