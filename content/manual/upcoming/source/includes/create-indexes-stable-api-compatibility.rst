When using :ref:`Stable API <stable-api>` V1, all
:dbcommand:`createIndexes` fields are available with the
following exceptions:

- The following fields in the |paramName| are not available in
  Stable API V1:

  - ``background``
  - ``bucketSize``
  - ``sparse``
  - ``storageEngine``

- :ref:`Text <index-type-text>` indexes are not available in
  Stable API V1.

- The above unsupported index types are ignored by the
  :ref:`query planner<query-plans-query-optimization>` in
  :ref:`strict mode<stable-api-strict-client>`. For example,
  attempting to use a ``sparse`` index with :method:`cursor.hint()`
  results in the following ``BadValue`` error:

  .. code-block::
     :copyable: false

     planner returned error :: caused by :: hint provided does not
     correspond to an existing index
