Don't create a sharded {+cluster+} with a single shard for production
environments. Single-shard sharded {+clusters+} don't provide the same
benefits as multi-shard configurations. After you create a single-shard
{+cluster+}, restart your application, reconnect to the {+cluster+},
and then add more shards to your {+cluster+}.