.. _data-lake-v20200707:

07 July 2020 Release
~~~~~~~~~~~~~~~~~~~~

- Adds support for the ``skip`` and ``limit`` fields to the ``count()``
  command.
 
.. _data-lake-v20200616:

16 June 2020 Release
~~~~~~~~~~~~~~~~~~~~

- Adds ``storageValidateConfig`` command to validate your 
  {+dl+} :ref:`storage configuration <datalake-configuration-file>`.
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
- Improves performance for the :ref:`adl-lookup-stage` aggregation pipeline stage.
- Adds support for evaluating string :manual:`$convert
  </reference/operator/aggregation/convert/>` expressions in the ``filename``
  for :ref:`adl-out-stage` to |s3|.
- Updates `Parquet <https://parquet.apache.org/documentation/latest/>`__
  support for `MAP types
  <https://github.com/apache/parquet-format/blob/master/LogicalTypes.md#nested-types>`__.
- Improves error messaging for :ref:`adl-out-stage` to |s3|.
- Adds a command to :ref:`generate a storage configuration
  <datalake-storagegenconfig>`.

.. _data-lake-v20200512:

12 May 2020 Release
~~~~~~~~~~~~~~~~~~~

- Automates storage configuration generation for newly created
  {+data-lake+}s.
- Allows write partitioning-aware data to S3 using the :pipeline:`$out`
  in {+data-lake+}.

.. _data-lake-v20200505:

05 May 2020 Release
~~~~~~~~~~~~~~~~~~~

- Generates :ref:`Storage Configs <datalake-storagegenconfig>`
  when |service| creates a {+data-lake+}.
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
- Updates the :ref:`isodate <datalake-path-attribute-types>` attribute
  to accept additional formats.
- Refreshes the metadata catalog when you use
  :ref:`Storage Configuration <config-datalake>` commands.


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

- Supports optionally granting {+data-lake+} write access to S3
  buckets, enabling use of :pipeline:`$out` semantics to write directly
  to those buckets.

- Adds incremental :ref:`store <manage-stores-cli>`,
  :ref:`database <dl-manage-db-cli>`,
  :ref:`collection <manage-collections-views-cli>`, and
  :manual:`view </reference/method/db.createView/#db.createView>`
  commands for storage configuration management.

- Limits collections returned for wildcard collections to 1,000.

- Updates the :ref:`storage configuration format <datalake-configuration-format>`.

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

- Allows the :ref:`defaultFormat <datalake-databases-reference>`
  to be specified without a leading dot.
- Supports filtering based on stripes for files in ORC format.
- Allows query attributes to be extracted after the first stage.
