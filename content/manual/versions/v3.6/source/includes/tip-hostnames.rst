.. tip:: To avoid downtime, give each config server a logical DNS name
   (unrelated to the server's physical or virtual hostname). Without
   logical DNS names, moving or renaming a config server requires
   shutting down every :binary:`~bin.mongod` and :binary:`~bin.mongos` instance
   in the sharded cluster.
