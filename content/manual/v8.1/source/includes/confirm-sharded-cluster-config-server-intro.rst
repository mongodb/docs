You can confirm that a sharded cluster uses a config
shard by using one of the following methods:

- Run the :method:`sh.isConfigShardEnabled()` method
  in ``mongosh``. If the ``sh.isConfigShardEnabled()``
  output contains ``enabled: true``, the cluster
  uses a config shard. If the output contains ``enabled: false``,
  the cluster does not use a config shard.
- Run the :dbcommand:`listShards` command against the ``admin`` database while 
  connected to a :binary:`mongos` and inspect the output for a document 
  where ``_id`` is set to ``"config"``. If the ``listShards`` output does 
  not contain a document where ``_id`` is set to ``"config"``, the cluster 
  does not use a config shard.