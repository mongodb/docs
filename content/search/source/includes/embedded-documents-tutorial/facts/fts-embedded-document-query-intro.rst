The sample queries search the embedded documents in the ``schools``
collection. The queries use the following pipeline stages:

- :pipeline:`$search` to search the collection.
- :pipeline:`$project` to include and exclude  fields from the
  collection, and add a field named ``score`` in the results. For
  queries that enable :ref:`highlighting <highlight-ref>`, the
  :pipeline:`$project` stage also adds a new field called
  ``highlights``, which contains the highlighting information.
