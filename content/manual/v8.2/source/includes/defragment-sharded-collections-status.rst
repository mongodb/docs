Defragmentation uses the following phases to reduce the number of chunks
in a collection and improve performance:

1. Merge chunks on the same shard that can be merged.
#. Migrate smaller chunks to other shards. A small chunk is one that
   contains data less than 25% of the ``chunkSize`` setting.
#. Merge remaining chunks on the same shard that can be merged.
