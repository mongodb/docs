.. warning::

   There is no supported means to un-shard a collection after running
   :dbcommand:`shardCollection`.
   Additionally, once you have sharded a collection you cannot
   change shard keys, or update the value of any field used in
   your shard key index.

