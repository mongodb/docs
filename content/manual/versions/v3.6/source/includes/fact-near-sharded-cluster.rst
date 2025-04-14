For sharded collections, queries using |geo-operation| are not
supported. You can instead use either the :dbcommand:`geoNear` command
or the :pipeline:`$geoNear` aggregation stage.
