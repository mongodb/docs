Starting in MongoDB 9.0, MongoDB tracks the memory that
|geo-operation| uses to buffer results and to remove duplicate
records. If the query exceeds the 100 megabyte memory limit for the
stage, MongoDB ends the query and returns an error.

Only queries that match a large number of documents reach the
limit. To reduce the memory that the query requires, specify
``maxDistance`` to restrict the search area. This memory counts
toward the per-operation memory limit. To learn more,
see :ref:`operation-memory-limit`.