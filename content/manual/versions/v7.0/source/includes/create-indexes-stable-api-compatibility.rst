When using :ref:`Stable API <stable-api>` V1:

- You cannot specify any of the following fields in the |paramName|:

  - ``background``
  - ``bucketSize``
  - ``sparse``
  - ``storageEngine``

- You cannot create :ref:`geoHaystack <index-geohaystack-index>` or
  :ref:`text <index-type-text>` indexes.

- The above unsupported index types are ignored by the 
  :ref:`query planner<query-plans-query-optimization>` in 
  :ref:`strict mode<stable-api-strict-client>`. For example, 
  attempting to use a ``sparse`` index with :method:`cursor.hint()` 
  will result in the following ``BadValue`` error:

  .. code-block::
     :copyable: false
   
     planner returned error :: caused by :: hint provided does not 
     correspond to an existing index