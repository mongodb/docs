- If |method| is run outside a transaction, operations that target more 
  than one shard broadcast the operation to all shards in the cluster. 

- If |method| is run inside a transaction, operations that target more
  than one shard only target the relevant shards.