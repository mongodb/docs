:gold:`IMPORTANT:` When you remove a shard in 8.0, |service| uses the 
:dbcommand:`moveCollection` command to move any unsharded collections in
that shard to a remaining shard. All unsharded collections remain online 
during this process.
 
- All sharded collections remain online and available during the shard removal
  process. You must turn on the balancer to drain the sharded collections from 
  the removed shard.
- |service| moves any unsharded collections that can't be drained by ``moveCollection`` command 
  by using the :manual:`movePrimary </reference/command/movePrimary/>` command. To learn more about 
  the limitations of ``moveCollection``, see :manual:`Restrictions </reference/command/moveCollection/#restrictions>`. 
  ``movePrimary`` is an offline operation.
- For more information about shard removal, see 
  :manual:`Remove Shards from a Sharded Cluster </tutorial/remove-shards-from-cluster>`.