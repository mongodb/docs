.. setting:: spec.topology

   *Type*: string
   
   *Optional*
   
   *Default*: ``SingleCluster``

   Defines the topology of the sharded cluster. Cannot be changed for an 
   existing deployment. If set to ``MultiCluster``:

   - All sharded cluster components must have ``clusterSpecList`` defined:
  
     - ``spec.mongos.clusterSpecList``
     - ``spec.configSrv.clusterSpecList``
     - ``spec.shard.clusterSpecList``

   - The following fields are ignored, as their equivalent values are passed for 
     each cluster in the ``spec.<section>.clusterSpecList`` objects:

     - ``spec.mongodsPerShardCount`` is defined in ``spec.shard.clusterSpecList.members``
     - ``spec.mongosCount`` is defined in ``spec.mongos.clusterSpecList.members``
     - ``spec.configServerCount`` is defined in ``spec.configSrv.clusterSpecList.members``
     - ``spec.shardOverrides.memberConfig`` is defined in ``spec.shardOverrides.clusterSpecList.memberConfig``
     - ``spec.shardOverrides.members`` is defined in ``spec.shardOverrides.clusterSpecList.members``
     - ``spec.shardOverrides.statefulSet`` is defined in ``spec.shardOverrides.clusterSpecList.statefulSet``

   *Example*:

   .. code-block:: yaml

      apiVersion: mongodb.com/v1
      kind: MongoDB
      metadata:
        name: sc
      spec:
        shardCount: 3
        # we don't specify mongodsPerShardCount, mongosCount and configServerCount as they don't make sense for multi-cluster
        topology: MultiCluster
        type: ShardedCluster
        version: 7.0.12
        cloudManager:
          configMapRef:
            name: my-project
        credentials: my-credentials
        persistent: true
        shard:
          clusterSpecList:
            - clusterName: member-cluster-0
              members: 2 # each shard will have 2 members in cluster 0, unless overriden
            - clusterName: member-cluster-1
              members: 2
            - clusterName: member-cluster-2
              members: 1

        shardOverrides:
          - shardNames: [sc-2] # this override will apply to the third shard (here, shards are indexed from 0 to 2 as we have 3 shards)
            clusterSpecList:
              - clusterName: member-cluster-0 # all other fields are optional, if not provided the fields from matching member cluster from shard.clusterSpecList will be taken by default
                members: 3
              - clusterName: member-cluster-1 # we don't deploy this shard to member-cluster-1
                # Note that it is also possible to make it explicit with members: 0
              # we don't provide entry for clusterName: member-cluster-1, so it won't be deployed there
              - clusterName: member-cluster-2
                members: 2

        configSrv:
          clusterSpecList:
            - clusterName: member-cluster-0
              members: 2 # config server will have 2 members in this cluster
            - clusterName: member-cluster-1
              members: 1
            - clusterName: member-cluster-2
              members: 2

        mongos:
          clusterSpecList:
            - clusterName: member-cluster-0
              members: 2 # router will have 2 members in this cluster
            - clusterName: member-cluster-1
              members: 1

   The following fields relate exclusively to deployments in which ``topology=MultiCluster``:

   .. include:: /includes/setting-k8sScConf-spec.configSrv.clusterSpecList.rst
   .. include:: /includes/setting-k8sScConf-spec.duplicateServiceObjects.rst
   .. include:: /includes/setting-K8sScConf-spec.mongos.clusterSpecList.rst
   .. include:: /includes/setting-k8sScConf-spec.shard.clusterSpecList.rst
   .. include:: /includes/setting-k8sScConf-spec.shardOverrides.rst
   .. include:: /includes/setting-k8sScConf-spec.shardPodSpec.persistence.single.rst
