- Wildcard indexes can support at most *one* field in any given query 
  predicate. For more information on wildcard index query
  support, see :ref:`wildcard-index-query-sort-support`.

- Wildcard indexes omit the ``_id`` field by default. To include the
  ``_id`` field in the wildcard index, you must explicitly include it in
  the wildcardProjection document (i.e. ``{ "_id" : 1 }``).

- You can create multiple wildcard indexes in a collection.

- A wildcard index may cover the same fields as other indexes in the 
  collection.

- Wildcard indexes are :ref:`sparse <index-type-sparse>` and only
  contain entries for documents that have the indexed field, even if the
  index field contains a null value.

