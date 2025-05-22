For an introduction to ``chunkSize``, see
:ref:`tutorial-modifying-chunk-size`.

The following table describes how ``chunkSize`` affects defragmentation
and the balancer operations in different MongoDB versions.

.. list-table::
   :header-rows: 1
   :widths: 30 70
 
   * - MongoDB Version
     - Description

   * - MongoDB 6.0 and later
     - When the collection data shared between two shards differs by
       three or more times the configured ``chunkSize`` setting, the
       balancer migrates chunks between the shards.
       
       For example, if ``chunkSize`` is 128 MB and the collection data
       differs by 384 MB or more, the balancer migrates chunks between
       the shards.

   * - Earlier than MongoDB 6.0
     - When a chunk grows larger than ``chunkSize``, the chunk is split.

When chunks are moved, split, or merged, the shard metadata is updated
after the chunk operation is committed by a :ref:`config server
<sharding-config-server>`. Shards not involved in the chunk operation
are also updated with new metadata.

The time for the shard metadata update is proportional to the size of
the routing table. CRUD operations on the collection are temporarily
blocked while the shard metadata is updated, and a smaller routing table
means shorter CRUD operation delays.

Defragmenting a collection reduces the number of chunks and the time to
update the chunk metadata.

To reduce the system workload, configure the balancer to run only at a
specific time using a :ref:`shard balancing window
<sharding-schedule-balancing-window>`. Defragmentation runs during the
balancing window time period.

You can use the :parameter:`chunkDefragmentationThrottlingMS` parameter
to limit the rate of split and merge commands run by the balancer.

You can start and stop defragmentation at any time.

You can also set a :ref:`shard zone <zone-sharding>`. A shard zone is
based on the shard key, and you can associate each zone with one or more
shards in a cluster.

Starting in MongoDB 6.0, a sharded cluster only splits chunks when
chunks must be migrated. This means the chunk size may exceed
``chunkSize``. Larger chunks reduce the number of chunks on a shard and
improve performance because the time to update the shard metadata is
reduced. For example, you might see a 1 TB chunk on a shard even though
you have set ``chunkSize`` to 256 MB.

``chunkSize`` affects the following:

- Maximum amount of data the balancer attempts to migrate between two
  shards in a single chunk migration operation.
- Amount of data migrated during defragmentation.
