To confirm that a sharded cluster uses a config shard, run the
:dbcommand:`listShards` command against the ``admin`` database while 
connected to a :binary:`mongos` and inspect the output for a document 
where ``_id`` is set to ``"config"``. If the ``listShards`` output does 
not contain a document where ``_id`` is set to ``"config"``, the cluster 
does not use a config shard.
