.. important::

   When you remove a shard, |service| uses the :manual:`movePrimary
   </reference/command/movePrimary/>` command to move any unsharded databases in
   that shard to a remaining shard. 
   
   All sharded collections remain online and available during the shard removal
   process. However, read or write operations to unsharded collections during
   the ``movePrimary`` operation can result in unexpected behavior, including
   migration failure or data loss.
   
   We recommend moving the primary shard for any databases containing unsharded
   collections before removing the shard.

   For more information, see :manual:`Remove Shards from an Existing Sharded
   Cluster </tutorial/remove-shards-from-cluster/>`.
