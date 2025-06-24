When a :pipeline:`$sort` precedes a :pipeline:`$limit` and there are no
intervening stages that modify the number of documents, the optimizer can
coalesce the :pipeline:`$limit` into the :pipeline:`$sort`. This allows
the :pipeline:`$sort` operation to only
maintain the top ``n`` results as it progresses, where ``n`` is the
specified limit, and ensures that MongoDB only needs to store ``n`` items in memory.
This optimization still applies when ``allowDiskUse`` is ``true`` and
the ``n`` items exceed the :ref:`aggregation memory limit
<agg-memory-restrictions>`.
