Geospatial Indexes and Sharding
-------------------------------

You cannot use a geospatial index as a :term:`shard key` to shard a
collection. However, you *can* create and maintain a geospatial index
on a sharded collection, as long as the shard key is another
field. Your application may query for geospatial data using
:dbcommand:`geoNear` and :operator:`$within`; however, queries using
:operator:`$near` are not supported.
