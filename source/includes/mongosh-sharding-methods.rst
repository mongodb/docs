.. list-table::
   :widths: 30,70
   :header-rows: 1

   * - Name

     - Description

   * - :method:`convertShardKeyToHashed()`

     - Returns the hashed value for the input.

   * - :method:`db.checkMetadataConsistency`

     - Checks the cluster or database for inconsistent sharding metadata.

       .. versionadded:: 7.0

   * - :method:`db.collection.checkMetadataConsistency`

     - Checks the collection for inconsistent sharding metadata.

       .. versionadded:: 7.0

   * - :method:`sh.abortMoveCollection()`

     - .. include:: /includes/command/abortMoveCollection.rst 

   * - :method:`sh.abortReshardCollection()`

     - Aborts a :ref:`resharding operation <sharding-resharding>`.

       .. versionadded:: 5.0

   * - :method:`sh.addShard()`

     - Adds a :term:`shard` to a sharded cluster.

   * - :method:`sh.addShardTag()`

     - This method aliases to :method:`sh.addShardToZone()`.

   * - :method:`sh.addShardToZone()`

     - Associates a shard to a zone. Supports configuring :ref:`zones <zone-sharding>` in sharded clusters.

   * - :method:`sh.addTagRange()`

     - This method aliases to :method:`sh.updateZoneKeyRange()`.

   * - :method:`sh.balancerCollectionStatus()`

     - Returns information on whether the chunks of a sharded
       collection are balanced.

   * - :method:`sh.checkMetadataConsistency()`

     - Checks the cluster for inconsistent sharding metadata.

       .. versionadded:: 7.0

   * - :method:`sh.commitReshardCollection()`

     - Forces a :ref:`resharding operation <sharding-resharding>` to
       block writes and complete.

       .. versionadded:: 5.0

   * - :method:`sh.disableAutoMerger()`

     - .. include:: /includes/disableAutoMerger.rst

       .. versionadded:: 7.0

   * - :method:`sh.disableAutoSplit()`

     - Disables auto-splitting for the sharded cluster.

       .. include:: /includes/autosplit-no-operation.rst

   * - :method:`sh.disableBalancing()`

     - Disable balancing on a single collection in a sharded database. 
       Does not affect balancing of other collections in a sharded cluster.

   * - :method:`sh.enableAutoMerger()`

     - .. include:: /includes/enableAutoMerger.rst

       .. versionadded:: 7.0

   * - :method:`sh.enableAutoSplit()`

     - Enables auto-splitting for the sharded cluster.

       .. include:: /includes/autosplit-no-operation.rst

   * - :method:`sh.enableBalancing()`

     - Activates the sharded collection balancer process 
       if previously disabled using :method:`sh.disableBalancing()`.

   * - :method:`sh.enableSharding()`

     - Creates a database.

   * - :method:`sh.getBalancerState()`

     - Returns a boolean to report if the :term:`balancer` is currently enabled.

   * - :method:`sh.getShardedDataDistribution()`

     - .. include:: /includes/sharding/getShardedDataDistribution-shell-helper-method-summary.rst

   * - :method:`sh.help()`

     - Returns help text for the ``sh`` methods.

   * - :method:`sh.isBalancerRunning()`

     - Returns a document describing the status of the balancer.

   * - :method:`sh.isConfigShardEnabled()`

     - Returns whether a cluster has a :ref:`config shard <config-shard-concept>`.
       If it does, ``sh.isConfigShardEnabled()`` also returns
       host and tag information.

   * - :method:`sh.listShards()`

     - Returns an array of documents describing the
       shards in a sharded cluster. 

   * - :method:`sh.moveChunk()`

     - Migrates a :term:`chunk` in a :term:`sharded cluster`.

   * - :method:`sh.moveCollection()`

     - Moves a single unsharded collection to a different shard.

   * - :method:`sh.removeRangeFromZone()`

     - Removes an association between a range of shard keys and a zone. 
       Supports configuring :ref:`zones <zone-sharding>` in sharded clusters.

   * - :method:`sh.removeShardTag()`

     - This method aliases to :method:`sh.removeShardFromZone()`.

   * - :method:`sh.removeShardFromZone()`

     - Removes the association between a shard and a zone. Use to manage :ref:`zone sharding <zone-sharding>`.

   * - :method:`sh.removeTagRange()`

     - This method aliases to :method:`sh.removeRangeFromZone()`.

   * - :method:`sh.reshardCollection()`

     - Initiates a :ref:`resharding operation <sharding-resharding>` to change the
       shard key for a collection, changing the distribution of your data.

       .. versionadded:: 5.0

   * - :method:`sh.setBalancerState()`

     - Enables or disables the :term:`balancer` which 
       migrates :term:`chunks <chunk>` between :term:`shards <shard>`.

   * - :method:`sh.shardAndDistributeCollection()`

     - Shards a collection and immediately redistributes the data using the 
       provided :term:`shard key`.

       .. versionadded:: 8.0

   * - :method:`sh.shardCollection()`

     - Enables sharding for a collection.

   * - :method:`sh.splitAt()`

     - Divides an existing :term:`chunk` into two chunks 
       using a specific value of the :term:`shard key` as the dividing point.

   * - :method:`sh.splitFind()`

     - Divides an existing :term:`chunk` that contains a 
       document matching a query into two approximately equal chunks.

   * - :method:`sh.startAutoMerger()`

     - .. include:: /includes/startAutoMerger.rst

       .. versionadded:: 7.0

   * - :method:`sh.startBalancer()`

     - Enables the :term:`balancer` and waits for balancing to start.

   * - :method:`sh.status()`

     - Reports on the status of a :term:`sharded cluster`, as :method:`db.printShardingStatus()`.

   * - :method:`sh.stopAutoMerger()`

     - .. include:: /includes/stopAutoMerger.rst

       .. versionadded:: 7.0

   * - :method:`sh.stopBalancer()`

     - Disables the :term:`balancer` and waits for any in progress 
       balancing rounds to complete.

   * - :method:`sh.unshardCollection`

     - .. include:: /includes/method/sh.unshardCollection

   * - :method:`sh.updateZoneKeyRange()`

     - Associates a range of shard keys to a zone. Supports configuring 
       :ref:`zones <zone-sharding>` in sharded clusters.

   * - :method:`sh.waitForBalancer()`

     - Internal. Waits for the balancer state to change.

   * - :method:`sh.waitForBalancerOff()`

     - Internal. Waits until the balancer stops running.

   * - :method:`sh.waitForPingChange()`

     - Internal. Waits for a change in ping state from one of the :binary:`~bin.mongos` in the sharded cluster.
