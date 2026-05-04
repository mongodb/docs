Starting in MongoDB 8.3, the query engine limits the ``TextOr`` stage
memory usage to 100 megabytes. The ``TextOr`` stage processes
:query:`$text` queries that read text score metadata. For example,
``TextOr`` processes queries that sort results by text score. If the
``TextOr`` stage exceeds this limit:

- If ``allowDiskUse`` is ``true``, the stage spills intermediate
  results to disk.
- If ``allowDiskUse`` is ``false``, the query fails with an
  exceeded memory limit error.

In earlier versions, the ``TextOr`` stage had no memory limit and
consumed RAM without restrictions, risking out-of-memory (OOM)
errors.