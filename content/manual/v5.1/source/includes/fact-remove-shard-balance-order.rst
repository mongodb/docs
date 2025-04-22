When you remove a shard in a cluster with an uneven chunk
distribution, the balancer first removes the chunks from the draining
shard and then balances the remaining uneven chunk distribution.
