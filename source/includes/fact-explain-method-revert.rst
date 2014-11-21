For a mixed version sharded cluster with version 2.8 :program:`mongos`
and at least one 2.6 :program:`mongod` shard, when you run |explain| in
a version 2.8 :program:`mongo` shell, |explain| will retry with the
:operator:`$explain` operator to return results in the 2.6 format.
