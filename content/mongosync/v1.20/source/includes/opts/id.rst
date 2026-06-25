.. reference/configuration.txt
.. reference/mongosync.txt

Sets an identifier for the ``mongosync`` instance.

Use this |opt-term| when running multiple instances of ``mongosync`` on a sharded
cluster, to synchronize the shards individually.

The identifier value for this |opt-term| must correspond to the shard ID of the
shard it syncs.  To find the shard ID, use the :dbcommand:`listShards` command.