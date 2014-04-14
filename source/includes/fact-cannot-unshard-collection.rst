MongoDB provides no method to deactivate sharding for a collection
after calling :dbcommand:`shardCollection`. Additionally, after
:dbcommand:`shardCollection`, you cannot change shard keys or modify
the value of any field used in your shard key index.
