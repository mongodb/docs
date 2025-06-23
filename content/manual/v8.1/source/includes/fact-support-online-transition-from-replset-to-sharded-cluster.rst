MongoDB supports online transition from a replica set to a 1-shard    
cluster by allowing commands to be run directly against a shard.
However, once the cluster has more than one shard, only the        
:ref:`listed commands <shard-direct-commands>` can be run directly    
against the shard without the maintenance-only ``directShardOperations`` 
role.
