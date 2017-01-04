Using |mms|, you can configure all MongoDB deployment types: sharded
clusters, replica sets, and standalones.

The shards in a sharded cluster **must** be replica sets. That is, a
shard cannot be a standalone :program:`mongod`. If you must run a shard
as a single :program:`mongod` (which provides **no** redundancy or
failover), run the shard as a single-member replica set.

.. note::
   You may not upgrade a sharded MongoDB deployment to version 3.4 if 
   the deployment uses mirrored :program:`mongod` instances as config 
   servers. To allow the sharded deployment to be upgraded, see 
   :doc:`/tutorial/convert-config-servers-to-replica-set`. The 
   conversion requires that the sharded deployment run MongoDB version
   3.2.4 or later. Deployments running previous versions must upgrade
   to version 3.2.4 before an upgrade to version 3.4.
