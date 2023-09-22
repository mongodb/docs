Prior to MongoDB 4.0, |geo-operation| queries are not supported 
for sharded collections. Instead, you can use the :pipeline:`$geoNear` 
aggregation stage or the ``geoNear`` command.
