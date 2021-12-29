.. _data-lake-v20211228:

28 December 2021 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Improves performance and stability.
- Supports queries on collections prefixed with ``system``, but doesn't 
  support queries on collections prefixed with ``system.``.

.. _data-lake-v20211207:

07 December 2021 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Improves performance and stability.
- Adds support for the
  :manual:`$maxTimeMS </reference/operator/meta/maxTimeMS/>`
  option.

.. _data-lake-v20211116:

16 November 2021 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Improves performance and stability.
- Allows connections to |data-lakes| via 
  :ref:`private endpoints <manage-private-endpoint>`.
- Adds support for X.509 authorization.
- Adds support for empty ``field`` parameters with the 
  :manual:`$setField </reference/operator/aggregation/setField/>`
  aggregation expression.
- Fixes an issue where commands returned zero exit codes on failure.
- Fixes an issue where documents with empty subdocuments 
  written to Parquet contained empty parquet groups.
- Updates ``EstimateRowGroupSize`` to report ``UncompressedSize`` for
  documents stored in Parquet.
- Adjusts the minimum value for ``maxRowGroupSize`` when using
  :ref:`adl-out-stage` to Parquet to 16MB.
- Removes support for using :ref:`adl-out-stage` to write documents
  that contain duplicate fields to Parquet.
- Improves error messages for :ref:`adl-out-stage`. 

.. _data-lake-v20211027:

27 October 2021 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Improves performance and stability.
- Includes X.509 users in the :manual:`usersInfo 
  </reference/command/usersInfo/>` command output.
- Improves SCRAM authentication performance.

.. _data-lake-v20211005:

05 October 2021 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Improves performance and stability.
- Adds support for the ``authenticate`` command.
- Preserves binary subtypes in the parquet reader/writer.

.. _data-lake-v20210914:

14 September 2021 Release
~~~~~~~~~~~~~~~~~~~~~~~~~

- Provides various stability and performance improvements.
- Adds support for ``ap-south-1`` :ref:`region 
  <atlas-data-lake-regions>`.
- Outputs customer query logs into multiple lines.
- Includes ``background`` field in :ref:`$queryHistory output 
  <adl-query-history-stage-output>`.
- Supports :ref:`wildcard databases and collections 
  <generate-wildcard-collections>` for |service| data store.

.. _data-lake-v20210824:

25 August 2021 Release
~~~~~~~~~~~~~~~~~~~~~~

- Provides various stability improvements.
- Improves ``collStats`` and ``dbStats`` :ref:`command 
  <mql-support-diagnostic-cmd>` performance and stability.
- Adds support for the :pipeline:`$merge` aggregation pipeline stage.
- Allows ``localField`` and ``foreignField`` with a more expressive
  :doc:`$lookup </reference/pipeline/lookup-stage/>` aggregation
  pipeline stage syntax.
- Implements the ``$count`` accumulator.

.. _data-lake-v20210803:

03 August 2021 Release
~~~~~~~~~~~~~~~~~~~~~~

- Improves performance.
- Improves error messaging.
- Adds ``computeTime`` and ``automaticRefreshInProgress`` fields to the
  ``collStats`` and ``dbStats`` :ref:`command 
  <mql-support-diagnostic-cmd>` outputs.

.. _data-lake-v20210712:

12 July 2021 Release
~~~~~~~~~~~~~~~~~~~~

- Supports dropping non-existent :ref:`stores <dl-drop-store-cmd>` and 
  :ref:`databases <dl-drop-database-cmd>` from the storage 
  configuration.
- Includes ``partitions.count`` in :ref:`collStats 
  <mql-support-diagnostic-cmd>` command output.

.. _data-lake-v20210623:

23 June 2021 Release
~~~~~~~~~~~~~~~~~~~~

- Allows downloading {+dl+} query logs from the :ref:`UI 
  <query-adl>` and :ref:`API <api-download-query-log>`.
- Removes restriction on large collection namespaces.
- Adds option to bypass cache for :manual:`collStats 
  </reference/command/collStats>` and :manual:`dbStats 
  </reference/command/dbStats>` to fetch the most recent statistics.
- Supports :manual:`serverStatus </reference/command/serverStatus/>` 
  command.

.. _data-lake-v20210608:

8 June 2021 Release
~~~~~~~~~~~~~~~~~~~

- Improves stability and performance.
- Supports public S3 data stores with the ``public`` configuration flag.
- Supports Zstandard compression.
- Adds ``db`` field to ``dbStats`` result.

.. _data-lake-v20210511:

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
