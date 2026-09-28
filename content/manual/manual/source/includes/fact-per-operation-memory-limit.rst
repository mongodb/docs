Starting in MongoDB 9.0, MongoDB limits the total amount of memory
that a single query operation can use. The limit applies to the
combined memory of all memory-tracked stages of the operation.

Tracked memory includes:

- Blocking stages such as :pipeline:`$group` and :pipeline:`$sort`
- Expression evaluation
- Query execution stages that buffer records, such as geospatial
  proximity searches, counts that use an index, and updates

By default, the limit is 1 gigabyte or 20% of the memory available
to the server process, whichever is greater. MongoDB sets the
default when the server starts.

The per-operation limit is separate from the 100 megabyte per-stage
memory limit and doesn't change how stages spill to disk. To learn
about the per-stage limit, see :ref:`agg-memory-restrictions`.

If an operation exceeds the per-operation limit, MongoDB ends the
operation and returns one of the following errors:

- :error:`QueryExceededMemoryLimitNoDiskUseAllowed <292>` when a
  stage that can spill to disk exceeds the limit and
  ``allowDiskUse`` is ``false``. Run the operation with
  ``{ allowDiskUse: true }`` so that the stage spills to disk
  instead of failing.

- :error:`ExceededMemoryLimit <146>` for other operations that
  exceed the limit.

Most operations use much less memory than the limit. If an operation
returns a memory limit error, reduce the memory that the operation
requires by performing one or more of the following actions:

- Use an index to satisfy the sort so that MongoDB doesn't sort
  documents in memory. To learn more, see :ref:`sort-index-use`.

- Add a :pipeline:`$limit` stage after a :pipeline:`$sort` stage so
  that the sort keeps only the documents you need. To learn more,
  see :ref:`sort-limit-sequence`.

- Filter documents with :pipeline:`$match` as early as possible in the
  pipeline so that later stages process fewer documents. To learn more,
  see :ref:`agg-pipeline-optimization`.

To check per-operation memory usage, use these
:dbcommand:`serverStatus` metrics:

- :serverstatus:`metrics.query.peakMemoryUsageOperation`
- :serverstatus:`metrics.query.operationsFailedDueToMemoryLimit`
- :serverstatus:`metrics.query.configuredMaxMemoryUsageBytesPerOperation`
