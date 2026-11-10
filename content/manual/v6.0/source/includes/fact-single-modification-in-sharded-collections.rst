To use |single-modification-operation-names| operations for a sharded
collection that specify the |single-modification-operation-option| option: 

- If you only target one shard, you can use a partial shard key in the query specification or,

- You can provide the :term:`shard key` or the ``_id`` field in the query
  specification.
