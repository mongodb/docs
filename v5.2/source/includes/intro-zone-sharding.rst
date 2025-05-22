In sharded clusters, you can create :term:`zones <zone>` of sharded data based
on the :term:`shard key`. You can associate each zone with one or more shards
in the cluster. A shard can associate with any number of zones. In a balanced 
cluster, MongoDB migrates :term:`chunks <chunk>` covered by a zone only to 
those shards associated with the zone. 
