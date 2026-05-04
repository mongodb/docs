Starting in MongoDB 8.0, ``$shardedDataDistribution`` only returns
output for a collection's :term:`primary shard` if the primary shard
has :term:`chunks <chunk>` or :term:`orphaned documents <orphaned
document>`.
