.. [#data-bearing]
   
   On {+atlas-core-cluster+}s, data-bearing servers are the machines
   that run the nodes holding your application data. In
   a sharded cluster, each shard is a replica set whose members are
   the data-bearing servers. Sharded clusters may also use
   :ref:`config servers <sharding-config-server>`, which are billed
   separately from the data-bearing servers.

   On {+atlas-infinite-cluster+}s, data-bearing servers don't apply.
   |service| stores and manages your data in a storage layer that is
   separate from the compute layer. The electable, read-only, and
   analytics nodes are :term:`compute nodes <compute node>` that access
   data in the storage layer. To learn more, see
   :ref:`atlas-infinite-architecture`.
