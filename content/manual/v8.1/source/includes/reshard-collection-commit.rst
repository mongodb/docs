During the commit phase: 

- The resharding coordinator waits for all shards to reach strict consistency,
  then commits the resharding operation.
- The resharding coordinator instructs each donor and recipient shard
  primary, independently, to rename the temporary sharded collection.
  The temporary collection becomes the new resharded collection.
- Each donor shard drops the old sharded collection.