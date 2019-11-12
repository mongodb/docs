.. list-table::
   :widths: 30 10 40 10 10
   :stub-columns: 1
   :header-rows: 1

   * - System Variable
     - Data Type
     - Description
     - Default Value (Atlas-hosted)
     - Default Value (On Premises)

   * - ``full_pushdown_exec_mode``
     - boolean
     - Specifies whether a query error is returned for queries with
       clauses that aren't fully translated to the MongoDB query language.
       SQL query predicates are used to filter data returned by the query.
     - ``0 (false)``
     - ``0 (false)``

   * - ``log_level``
     - integer
     - Specifies the logging level for |bi-short|:

       - ``-1``: Do not log.
       - ``0``: Log only messages for database users, such as basic
         ``mongosqld`` events and state changes.
       - ``1``: Log messages for database users and ``mongosqld`` administrators.
       - ``2``: For internal use only.
     - ``2``
     - ``0``

   * - ``max_execution_time``
     - integer
     - Specifies the maximum length of time an aggregation operation
       may run. A value of ``0`` specifies no limit.
     - ``0``
     - ``0``

   * - ``max_nested_table_depth``
     - integer
     - Specifies the maximum number of unique nested field paths that
       ``mongosqld`` maps to a relational table for a collection.
     - ``50``
     - ``50``

   * - ``max_num_fields_per_collection``
     - integer
     - The maximum number of unique fields that ``mongosqld`` maps to
       relational columns for a collection.
     - ``1000``
     - ``1000``

   * - ``mongodb_max_connection_size``
     - integer
     - The maximum size of memory in bytes that may be allocated for
       evaluating any query on any given client connection. A value of
       ``0`` specifies no limit.
     - ``0``
     - ``0``

   * - ``mongodb_max_server_size``
     - integer
     - The maximum size of memory in bytes that may be allocated for
       evaluating all queries on |bi-short|. A value of ``0`` specifies
       no limit.
     - ``0``
     - ``0``

   * - ``mongodb_max_stage_size``
     - integer
     - The maximum size of memory in bytes that may be allocated for
       evaluating any query in any given query evaluation stage. A value of
       ``0`` specifies no limit.
     - ``0``
     - ``0``

   * - ``mongodb_max_varchar_length``
     - integer
     - Specifies the maximum string length returned for columns using
       the ``VARCHAR`` data type. A value of ``0`` specifies
       no limit.
     - ``0``
     - ``0``

   * - ``mongodb_version_compatibility``
     - string
     - For mixed cluster MongoDB installations, the minimum version of
       any process within the cluster.
     - none
     - none

   * - ``mongodb_git_version``
     - string
     - The git version of MongoDB the |bi-short| is connected to.
     - none
     - none

   * - ``mongodb_topology``
     - string
     - The MongoDB cluster topology the |bi-short| is connected to.
     - none
     - none

   * - ``mongodb_version``
     - string
     - The MongoDB version the |bi-short| is connected to.
     - none
     - none

   * - ``mongosqld_version``
     - string
     - The |bi-short| version.
     - none
     - none

   * - ``optimize_cross_joins``
     - boolean
     - If enabled, cross joins are optimized into inner joins when possible.
     - ``true``
     - ``true``

   * - ``optimize_evaluations``
     - boolean
     - If enabled, constant-folding is performed.
     - ``true``
     - ``true``

   * - ``optimize_filtering``
     - boolean
     - If enabled, predicates in ``WHERE`` clauses are moved as close as possible
       to the MongoDB data source they operate on.
     - ``true``
     - ``true``

   * - ``optimize_inner_joins``
     - boolean
     - If enabled, inner joins are reordered for more optimal query execution.
     - ``true``
     - ``true``

   * - ``optimize_self_joins``
     - boolean
     - If enabled, attempt to translate joins between tables with the same
       underlying MongoDB collection without :manual:`$lookup
       </reference/operator/aggregation/lookup/>`.
     - ``true``
     - ``true``

   * - ``optimize_view_sampling``
     - boolean
     - If enabled, the :manual:`$sample </reference/operator/aggregation/sample/>`
       stage is moved ahead of pipeline stages which do not alter cardinality during
       sampling of a MongoDB view.
     - ``true``
     - ``true``

   * - ``polymorphic_type_conversion_mode``
     - string
     - Determines how |bi-short| evaluates document fields that are
       specified with multiple data types. For example, ``count``
       could be a number in one document and a string in another.
       The data type that |bi-short| selects depends on the value
       of the ``schema_mapping_mode`` system variable. A value of
       ``majority`` causes |bi-short| to select the type
       that appears in the majority of document fields, while a value
       of ``lattice`` would cause |bi-short| to select string as the
       data type for ``count``. See :doc:`Cached Sampling </schema/cached-sampling>`
       for more information.

       Set ``polymorphic_type_conversion_mode`` to one of the following
       values:

       - ``off``:
         Queries may fail if you do not explicitly cast
         document fields that are specified with multiple data types.
       - ``fast``:
         |bi-short| converts only document fields that
         appeared as multiple data types during sampling.
       - ``safe``:
         |bi-short| converts all document fields to the data type
         discovered during sampling, even if the fields do not appear
         as multiple data types.
     -  ``off``
     -  ``off``

   * - ``pushdown``
     - boolean
     - If enabled, queries are translated to MongoDB's native aggregation
       language.
     - ``true``
     - ``true``

   * - ``sample_refresh_interval_secs``
     - integer
     - Specifies how frequently, in seconds, that the |bi-short| schema
       is updated. A value of ``0`` specifies that the schema is not 
       refreshed after |bi-short| starts.

       See :doc:`Cached Sampling </schema/cached-sampling>` for more
       information.
     - ``0``
     - ``0``

   * - ``sample_size``
     - integer
     - Specifies how many documents |bi-short| samples when generating
       its schema. A value of ``0`` specifies that |bi-short| performs
       a collection scan across all sample :option:`namespaces <mongosqld --sampleNamespaces>`.

       See :doc:`Cached Sampling </schema/cached-sampling>` for more
       information.
     - ``100``
     - ``100``

   * - ``schema_mapping_mode``
     - string
     - Specifies how the MongoDB schema is transformed into a relational
       schema:

       - ``lattice``: See :doc:`Sampling Type Conflicts </schema/type-conflicts>`
         for more information. 
       - ``majority``: |bi-short| assigns the most common data type for
         a field occuring in a sample.

     - ``lattice``
     - ``lattice``

   * - ``type_conversion_mode``
     - string
     - Specifies the semantics that |bi-short| uses for type conversions,
       such as the ``CAST`` function.

       - ``mysql``
       - ``mongosql``
     - ``mongosql``
     - ``mongosql``
