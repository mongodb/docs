A shard key on the ``location`` field alone may result in bottlenecks,
especially for workloads where a subset of countries or subdivisions
receive the majority of write operations. |service| |global-writes|
requires a :manual:`compound shard key </core/index-compound>` 
to facilitate efficient distribution of sharded data across the cluster.
The secondary shard key field *cannot* be an array.
For guidance on choosing a secondary shard key field and the effect of 
shard key choice on data distribution, see :manual:`Choosing a Shard Key 
</core/sharding-shard-key/#choosing-a-shard-key>`.