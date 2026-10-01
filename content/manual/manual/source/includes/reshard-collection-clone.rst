During the clone phase:

#. Each recipient shard creates a temporary, empty sharded collection
   with the same collection options as the donor sharded collection.
   The recipient shards do not create any indexes except ``_id``
   until the index phase.

#. Each recipient shard clones collection data from the donor shards
   and writes the cloned data to its temporary collection, which
   contains all documents that the recipient shard owns under the
   new shard key.
