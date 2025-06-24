During the clone phase:

- Each recipient shard creates a temporary, empty sharded collection with the
  same collection options as the donor sharded collection.
  This new collection is the target for where recipient shards write the new data.
  The recipient shards do not create any index except the ``_id`` index until the 
  index phase.
- Each recipient shard clones collection data from the donor shard, 
  including all documents that the recipient shard owns under the new shard key.