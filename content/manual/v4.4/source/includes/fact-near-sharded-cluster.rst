Starting in MongoDB 4.0, |geo-operation| queries are supported for
sharded collections.

In earlier MongoDB versions, |geo-operation| queries are not supported
for sharded collections; instead, for sharded clusters, you must use
the :pipeline:`$geoNear` aggregation stage or the ``geoNear`` command
(available in MongoDB 4.0 and earlier).
