.. _adf-v20231205:

05 December 2023 Release 
~~~~~~~~~~~~~~~~~~~~~~~~

- Changes the error ``CommandNotSupported`` to ``CommandNotFound``.

.. _adf-v20231128:

28 November 2023 Release 
~~~~~~~~~~~~~~~~~~~~~~~~

- Supports :abbr:`OIDC (OpenID Connect)` for |azure-ad|, Okta, and Ping
  Identity as :abbr:`IdPs (Identity Providers)`. To learn more, see
  :ref:`oidc-authentication-authorization`.

.. _adf-v20231031:

31 October 2023 Release 
~~~~~~~~~~~~~~~~~~~~~~~

- Improves performance when reading from 
  :ref:`Parquet <adf-parquet-data-format>` files.
- Adds support for modifying views with ``collMod``.
- Adds automatic recognition of ``.jsonl`` files as JSON Lines files.
- Fixes an issue with :ref:`sqlGenerateSchema <sqlgenerateschema-cmd>` 
  where it wouldn't run on {+Online-Archive+} source.

.. _adf-v20230822:

22 August 2023 Release 
~~~~~~~~~~~~~~~~~~~~~~

- Adds a ``lastModified`` timestamp field to |s3| object provenance metadata. To learn more,
  see :datalakeconf-aws:`databases.[n].collections.[n].dataSources.[n].provenanceFieldName`.
- Supports provenance metadata for {+Online-Archive+} datasets.

.. _adf-v20230808:

08 August 2023 Release 
~~~~~~~~~~~~~~~~~~~~~~

- Improves error message for exceeding the :manual:`maxTimeMS
  </reference/method/cursor.maxTimeMS/>` limit. 
- Improves :manual:`explain() results</reference/explain-results/>` for
  queries that target Atlas Data Lake datasets and {+Online-Archive+}s.

.. _adf-v20230801:

01 August 2023 Release 
~~~~~~~~~~~~~~~~~~~~~~

- Improves performance for queries that utilize the :manual:`$ne
  </reference/operator/query/ne/>` operator.

.. _adf-v20230725:

25 July 2023 Release 
~~~~~~~~~~~~~~~~~~~~

- Allows you to set :manual:`read concern </reference/read-concern/>`
  for :ref:`Atlas cluster <adf-configuration-file-atlas>` data store.

.. _adf-v20230627:

27 June 2023 Release 
~~~~~~~~~~~~~~~~~~~~

- Supports the ``$$SEARCH_META`` aggregation variable when you run 
  :pipeline:`$search` queries on an |service| {+cluster+} through
  {+adf+}.

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
- Improves performance and stability when writing to Parquet using :ref:`$out <adf-out-stage>` to |s3|.
- Adds the ability to use any BSON type with the ``$comment`` operator and query in
  ``$queryHistory``. (Starting in MongoDB 5.1, the ``$comment`` operator
  :manual:`was removed </release-notes/6.0-compatibility/#removed-operators>`).
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
  |service| :oas-bump-atlas-tag:`API <data-federation>`.

.. _adf-v20230111:

11 January 2023 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Fixes an issue that caused ``maxTimeMS`` with a ``batchSize`` of ``0``
  to fail.
