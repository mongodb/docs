When you remove a shard, any unsharded databases in that shard are 
moved to a remaining shard using the 
:dbcommand:`movePrimary` command.

All sharded collections remain online and available during the shard 
removal process. However, read and write operations sent to unsharded 
collections during the ``movePrimary`` operation can result in 
unexpected behavior, including failure of the migration or loss of 
data.

We recommend moving the primary shard for any databases containing 
unsharded collections before removing the shard.

To learn more about removing shards, see 
:ref:`Remove Shards from an Existing Sharded Cluster <remove-shards-from-cluster-tutorial>`.
