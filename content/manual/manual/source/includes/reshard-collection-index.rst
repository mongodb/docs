During the index phase, each recipient shard builds the necessary new indexes. These include
all existing indexes on the sharded collection and an index compatible
with the new shard key pattern if such an index doesn't already exist on
the sharded collection.