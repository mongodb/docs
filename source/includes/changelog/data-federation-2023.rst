.. note:: Release notes mention only releases with feature changes

   MongoDB releases {+adf+} every week, continuously improving
   {+adf+} performance and stability. These release notes capture only
   those releases that contain feature changes. If a particular {+adf+}
   release contains only performance and stability improvements, it is not
   included in these release notes. To identify which release version you
   are using, check the release version string for the release date.

.. _adf-v20230613:

13 June 2023 Release
~~~~~~~~~~~~~~~~~~~~

- Introduces new :ref:`onboarding experience <adf-getting-started>` with 
  templates for the most common {+adf+} use cases.
- Improves error message for :ref:`$out to S3 <adf-out-stage>` queries to provide more detail.

.. _adf-v20230509:

09 May 2023 Release
~~~~~~~~~~~~~~~~~~~

- Optimizes partition attributes for selecting files on |s3| when
  using the :manual:`$in </reference/operator/aggregation/in/>` operator
  in aggregation pipelines.  

.. _adf-v20230418:

18 April 2023 Release
~~~~~~~~~~~~~~~~~~~~~

- Modifies the behavior of ``$queryHistory`` to indicate a query is
  complete when all batches have been uploaded as cursor files, all
  batches have been returned to the user, or there is an error.
- Adds the ability to use BSON data for the comment field in commands.

.. _adf-v20230404:

04 April 2023 Release
~~~~~~~~~~~~~~~~~~~~~

- Improves error messages when querying a document over 16MB.
- Fixes a correctness issue for :manual:`$getFields
  </reference/operator/aggregation/getField/>` where {+adf+} differed
  from MongoDB when querying an empty sub-document.
- Improves stability and performance for :ref:`$out <adf-out-stage>` to
  |s3| when writing to Parquet. 

.. _adf-v20230221:

21 February 2023 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Fixes an issue with ``$match`` queries that resulted in documents not being returned
  when querying on nested documents within an array where any nested document was missing
  the target field.
- Improves performance and stability when writing to Parquet using :ref:`adf-out-stage` to |s3|.
- Adds the ability to use any BSON type with the ``$comment`` operator and query in
  :ref:`$queryHistory <adf-query-history-stage>`.
- {+adf+} now returns MongoDB 6.2.0 in the :ref:`buildInfo output <mql-support-diagnostic-cmd>`.

.. _adf-v20230215:

15 February 2023 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Adds the ability to :ref:`limit the amount of data <adf-manage-query-limits>` that {+adf+} processes for your {+fdi+}\s to control costs. 


.. _adf-v20230207:

07 February 2023 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Improves error messages when a client attempts to insert, 
  update, or delete a document in a {+fdi+}.

.. _adf-v20230124:

24 January 2023 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Adds the application name to connections that {+adf+} creates to your
  |service| {+clusters+}.
- Adds the ability to set and update the storage configuration using the
  |service| :oas-atlas-tag:`Data Federation API </Data-Federation>`.

.. _adf-v20230111:

11 January 2023 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Fixes an issue that caused ``maxTimeMS`` with a ``batchSize`` of ``0``
  to fail.
