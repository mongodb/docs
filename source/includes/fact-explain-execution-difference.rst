In MongoDB, the :doc:`query optimizer </core/query-plans>` evaluates
and caches winning plans for query patterns. However, since the
optimizer only caches the plans for those query patterns with
*multiple* execution plans, the |explain-object| operation may return a
winning plan not included in the cache.
