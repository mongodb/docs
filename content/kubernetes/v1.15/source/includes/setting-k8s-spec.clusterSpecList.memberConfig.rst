.. _multi-spec-clusterspeclist-memberconfig:

.. setting:: memberConfig

  *Type*: collection

  Specification for each MongoDB shard and its 
  members in your |multi-cluster|.

  The order of the elements in the object for shard
  must reflect the order of members in the replica set. For example, 
  the first element affects the Pod at index ``0``, the second 
  element affects index ``1``, and so on.
  
  .. example::

     Consider the following example specification for a 
     |multi-cluster| with three replica sets:

     .. code-block:: yaml

        apiVersion: mongodb.com/v1
        kind: MongoDBMultiCluster
        metadata:
          name: multi-replica-set
        spec:
          version: 8.0.0
          type: ReplicaSet
          duplicateServiceObjects: false
          credentials: my-credentials
          opsManager:
            configMapRef:
              name: my-project
          clusterSpecList:
            - clusterName: cluster1.example.com
              members: 2
              memberConfig:
                  - votes: 1
                    priority: "0.5"
                    tags:
                        tag1: "value1"
                        environment: "prod"
                  - votes: 1
                    priority: "1.5"
                    tags:
                          tag2: "value2"
                          environment: "prod"
            - clusterName: cluster2.example.com
              members: 1
              memberConfig:
                  - votes: 1
                    priority: "0.5"
                    tags:
                        tag1: "value1"
                        environment: "prod" 
            - clusterName: cluster3.example.com
              members: 1
              memberConfig:
                  - votes: 1
                    priority: "0.5"
                    tags:
                        tag1: "value1"
                        environment: "prod"
