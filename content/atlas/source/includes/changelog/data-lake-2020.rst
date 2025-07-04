.. _data-lake-v20201216:

16 December 2020 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Adds ``{background: true}`` option, which allows queries to 
  run in the background for :ref:`$out <adf-out-stage>` to |s3| stage.
- Introduces ``$queryHistory`` aggregation stage to view past 
  queries.
- Includes various performance and stability improvements.

.. _data-lake-v20201124:

24 November 2020 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Supports Parquet, CSV, and TSV formats for :pipeline:`$out` to |s3|.
- Adds a rolling limit for cursors.
- Improves error messages for commands that cannot be parsed.

.. _data-lake-v20201103:

03 November 2020 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Supports the :pipeline:`$geoNear` and :pipeline:`$graphLookup`   
  :manual:`aggregation pipeline stages
  </reference/operator/aggregation-pipeline>` in queries on {+fdi+}
  collections that reference a single |service| collection.
- Updates summary information in :manual:`explain
  </reference/command/explain>` output.

.. _data-lake-v20201013:

13 October 2020 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Supports ``defaultFormat`` for files in publicly accessible |url|\s in 
  |http| stores.
- Limits the number of simultaneous queries to 30 per {+fdi+}.
- Supports ``bzip2`` compression format.
- Supports ``comment`` option for the :manual:`aggregate 
  </reference/command/aggregate>` command.
- Includes various performance and stability improvements.

.. _data-lake-v20200922:

22 September 2020 Release
~~~~~~~~~~~~~~~~~~~~~~~~~

- Supports :ref:`killOp <terminate-running-query>` command for terminating 
  a long-running query.
- Adds :datalakeconf-aws:`configuration <databases.[n].maxWildcardCollections>` 
  for maximum number of wildcard collections for |s3| {+fdi+} stores.

.. _data-lake-v20200901:

01 September 2020 Release
~~~~~~~~~~~~~~~~~~~~~~~~~

- Supports :ref:`HTTP URLs <config-adf>` as a 
  data source.
- Supports |aws| |s3| `Intelligent Tiering 
  <https://aws.amazon.com/s3/storage-classes/#Unknown_or_changing_access>`__ 
  and `Standard-Infrequent Access
  <https://aws.amazon.com/s3/storage-classes/#Infrequent_access>`__ storage 
  classes.
- Supports :pipeline:`$unionWith` aggregation stage.
- Restricts {+fdi+} :ref:`connection string <fdi-connect>` 
  authentication 
  to one user at a time.
- Includes general performance and stability improvements.

.. _data-lake-v20200818:

18 August 2020 Release
~~~~~~~~~~~~~~~~~~~~~~

- Improves :ref:`$out <adf-out-stage>` to |s3| write performance.

- Includes general performance and stability improvements.

.. _data-lake-v20200813:

13 August 2020 Release
~~~~~~~~~~~~~~~~~~~~~~

- Adds ``correlationID`` to the :ref:`$currentOp <determine-query-status>` 
  output.
- Includes general performance and stability improvements.

.. _data-lake-v20200728:

28 July 2020 Release
~~~~~~~~~~~~~~~~~~~~

- Relaxes :ref:`$out <adf-out-stage>` |s3| region requirement.
- Includes improved :ref:`storage configuration <config-adf>`  
  error messages.
- Includes general performance and stability improvements.

.. _data-lake-v20200714:

14 July 2020 Release
~~~~~~~~~~~~~~~~~~~~

- Supports :pipeline:`$collStats` aggregation pipeline stage.
- Includes performance optimizations for `ORC <https://orc.apache.org/docs/>`_ 
  files.
- Includes general performance and stability improvements.

.. _data-lake-v20200707:

07 July 2020 Release
~~~~~~~~~~~~~~~~~~~~

- Adds support for the ``skip`` and ``limit`` fields to the ``count()``
  command.
 
.. _data-lake-v20200616:

16 June 2020 Release
~~~~~~~~~~~~~~~~~~~~

- Adds ``storageValidateConfig`` command to validate your 
  {+fdi+} :ref:`storage configuration <config-adf>`.
- Includes bug fixes and performance improvements.

.. _data-lake-v20200602:

02 June 2020 Release
~~~~~~~~~~~~~~~~~~~~

- Includes general performance and stability improvements.

.. _data-lake-v20200526:

26 May 2020 Release
~~~~~~~~~~~~~~~~~~~

- Adds support for :atlas:`Atlas Clusters </cluster-configuration>` as a
  data source.
- Improves performance for the :ref:`adf-lookup-stage` aggregation pipeline stage.
- Adds support for evaluating string :manual:`$convert
  </reference/operator/aggregation/convert/>` expressions in the ``filename``
  for :ref:`$out <adf-out-stage>` to |s3|.
- Updates `Parquet <https://parquet.apache.org/docs/>`__
  support for `MAP types
  <https://github.com/apache/parquet-format/blob/master/LogicalTypes.md#nested-types>`__.
- Improves error messaging for :ref:`$out <adf-out-stage>` to |s3|.
- Adds a command to generate a storage configuration.

.. _data-lake-v20200512:

12 May 2020 Release
~~~~~~~~~~~~~~~~~~~

- Automates storage configuration generation for newly created
  {+fdi+}s.
- Allows write partitioning-aware data to S3 using the :pipeline:`$out`
  in {+df+}.

.. _data-lake-v20200505:

05 May 2020 Release
~~~~~~~~~~~~~~~~~~~

- Generates Storage Configs when |service| creates a {+fdi+}.
- Adds support for :pipeline:`$out` to |s3|.
- Updates support for `Apache Parquet <https://parquet.apache.org/>`__
  `LIST <https://github.com/apache/parquet-format/blob/master/LogicalTypes.md#lists>`__
  element.
- Upgrades :manual:`wire protocol <l/reference/mongodb-wire-protocol>`
  support to 4.2 from 3.6.
- Adds support for verbosity in the explain plan.

.. _data-lake-v20200426:

26 April 2020 Release
~~~~~~~~~~~~~~~~~~~~~

- Fixes stability issues.

.. _data-lake-v20200414:

14 April 2020 Release
~~~~~~~~~~~~~~~~~~~~~

- Improves performance.
- Supports the :manual:`$currentOp </reference/operator/aggregation/currentOp/>`
  stage so that you can monitor query progress on long-running queries.
- Updates the :ref:`isodate <adf-path-attribute-types>` attribute
  to accept additional formats.
- Refreshes the metadata catalog when you use
  :ref:`Storage Configuration <config-adf>` commands.


.. _data-lake-v202020326:

26 March 2020 Release
~~~~~~~~~~~~~~~~~~~~~

- Includes various performance and stability improvements.
- Supports filename field references for :pipeline:`$out`.
- Supports :manual:`$toString </reference/operator/aggregation/toString/>`
  in :pipeline:`$out` to |s3|.

.. _data-lake-v202020309:

09 March 2020 Release
~~~~~~~~~~~~~~~~~~~~~

- Supports optionally granting {+fdi+} write access to S3
  buckets, enabling use of :pipeline:`$out` semantics to write directly
  to those buckets.

- Adds incremental :ref:`store <adf-cli>`, :ref:`database <adf-cli>`,
  :ref:`collection <adf-cli>`, and :ref:`view <adf-cli>`
  commands for storage configuration management.

- Limits collections returned for wildcard collections to 1,000.

- Updates the storage configuration format.

.. _data-lake-v20200211:

11 February 2020 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Supports cross-database :pipeline:`$lookup` queries.
- Supports lowercase and uppercase file extensions.
- Template segments now support dot-separated attribute names that
  correspond to nested fields.

.. _data-lake-v20200121:

21 January 2020 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Allows the :ref:`defaultFormat <adf-aws-databases-reference>`
  to be specified without a leading dot.
- Supports filtering based on stripes for files in ORC format.
- Allows query attributes to be extracted after the first stage.
