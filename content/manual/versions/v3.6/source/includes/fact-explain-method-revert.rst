For a mixed version sharded cluster with version 3.0 :binary:`~bin.mongos`
and at least one 2.6 :binary:`~bin.mongod` shard, when you run |explain| in
a version 3.0 :binary:`~bin.mongo` shell, |explain| will retry with the
:operator:`$explain` operator to return results in the 2.6 format.
