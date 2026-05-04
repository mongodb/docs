Unsharded collections are stored on individual shards. If one of
these collections is on the shard you want to remove, you must
first migrate the collection to a different shard.

To migrate an unsharded collection, see the
:dbcommand:`moveCollection` command.