.. start-note

Starting in MongoDB 8.0, you can only run :ref:`certain commands 
<node-direct-commands>` on nodes in sharded clusters. If you attempt to 
connect directly to a node and run an unsupported command, MongoDB returns an error:

.. code-block:: none

   "You are connecting to a sharded cluster improperly by connecting directly 
   to a shard. Please connect to the cluster via a router (mongos)."
.. end-short-note

To run a non-supported database command directly against a node in a sharded
cluster, you must either connect to ``mongos`` or have the maintenance-only 
``directShardOperations`` role.