Starting in MongoDB 8.0, you can only run :ref:`certain commands 
<shard-direct-commands>` on shards. If you attempt to connect directly 
to a shard and run an unsupported command, MongoDB returns an error:

.. code-block:: none

   "You are connecting to a sharded cluster improperly by connecting directly 
   to a shard. Please connect to the cluster via a router (mongos)."

To run a non-supported database command directly against a shard, you 
must either connect to ``mongos`` or have the maintenance-only 
``directShardOperations`` role.
