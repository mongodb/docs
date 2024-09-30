.. setting:: spec.shardOverrides

   *Type*: array of objects

   *Optional*
   
   List that contains overrides per shard. Each object contains 
   the following fields:

   - ``shardNames``

     *Required*

     The name of the shard this override applies to.

   - ``podSpec.Persistence``
     
     *Optional*

     Defines how the |k8s-op-short| creates and binds persistent volumes to shards. 
     For ``topology=MultiCluster`` it sets persistence settings for all member 
     clusters. You can define persistence settings for a particular member 
     cluster in ``spec.shardOverrides.clusterSpecList.persistence``.

   - ``additionalMongodConfig``
     
     *Optional*

     Shard-specific override for ``spec.shard.additionalMongodConfig``.

   - ``agent``
     
     *Optional*

     Shard-specific override for ``spec.shard.agent``. 

   - ``statefulSet``
  
     *Optional*

     Shard-specific override for ``spec.shardPodSpec.podTemplate`` 
     and ``spec.shard.clusterSpecList.statefulSet``.

   - ``members``

     *Optional*

     Only available when ``topology=SingleCluster``. Shard-specific override 
     for override for ``spec.mongodsPerShardCount``.

   - ``memberConfig``

     *Optional*

     Only available when ``topology=SingleCluster``. Shard-specific override 
     for ``spec.shard.memberConfig``.
