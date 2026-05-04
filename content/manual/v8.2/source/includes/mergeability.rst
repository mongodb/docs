``mergeAllChunksOnShard`` finds and merges all mergeable chunks for a 
collection on the same shard. Two or more contiguous chunks in the same 
collection are **mergeable** when they meet all of these conditions: 

- They are owned by the same shard.
- They are not :ref:`jumbo <jumbo-chunk>` chunks. ``jumbo`` chunks are 
  not mergeable because they cannot participate in migrations.
- Their history can be purged safely, without breaking transactions and 
  snapshot reads:

  - The last migration involving the chunk happened at least as many
    seconds ago as the value of 
    :parameter:`minSnapshotHistoryWindowInSeconds`.
  - The last migration involving the chunk happened at least as many 
    seconds ago as the value of 
    :parameter:`transactionLifetimeLimitSeconds`.

