``mongosync`` does not support migrating into destination namespaces with 
pre-configured shard zone tags. Before starting a migration, remove all 
shard tag ranges, or zones, from any namespaces that ``mongosync`` will migrate 
into on the destination. You can re-add the desired zone ranges after the 
migration reaches the ``COMMITTED`` state.