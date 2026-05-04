.. Limitations on resharding/rewriting collections

- If the collection uses :ref:`Atlas Search <atlas-search>`, the
  search index becomes unavailable after the operation
  completes. To restore it, manually rebuild the search index.

- Collections that use queryable encryption are not supported.

