:manual:`Sharding </sharding>` allows you to scale your cluster
horizontally. With MongoDB, you can shard some collections, while
allowing other collections in the same {+cluster+} to remain unsharded.
When you create a new database, the shard in the {+cluster+} with the
least amount of data is picked as that database's :term:`primary shard`
by default. All of the unsharded collections of that database live in
that primary shard by default. This can cause increased traffic to the
primary shard as your workload grows, especially if the workload growth
focuses on the unsharded collections on the primary shard.

To distribute this workload better, MongoDB 8.0 allows you to move an
unsharded collection to other shards from the primary shard with the
:dbcommand:`moveCollection` command. This allows you to place active,
busy collections onto shards with less expected resource usage. With
this, you can:

- Optimize performance on larger, complex workloads.
- Achieve better resource utilization.
- Distribute date more evenly across shards.

We recommended to isolate your collection in the following circumstances:

- If your primary shard experiences significant workload due to the
  presence of multiple high-throughput unsharded collections.

- You anticipate an unsharded collection to experience future growth,
  which could become a bottleneck for other collections.

- You are running a one-collection-per-cluster deployment design and you
  want to isolate those customers based on priority or workloads.  

- Your shards have more than a proportional amount of data due to the
  number of unsharded collections located on them.

To learn how to move an unsharded collection with {+mongosh+}, see
:ref:`task-move-a-collection`.