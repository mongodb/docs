1. Verify you have the ``.yaml`` configuration file for each MongoDB
   resource you have deployed.

   .. Formating hack, need whitespace below too

   | \ 
   | **Standalone Resources**
    

   If you have standalone resources but do not have the ``.yaml``
   configuration file for them, run the following command to generate
   the configuration file:

   .. code-block:: sh

      kubectl mst <standalone-name> -n <namespace> -o yaml > <standalone-conf-name>.yaml

   .. Formating hack, need whitespace below too

   | \ 
   | **Replica Set Resources**
    

   If you have replica set resources but do not have the ``.yaml``
   configuration file for them, run the following command to generate
   the configuration file:

   .. code-block:: sh

      kubectl get mrs <replicaset-name> -n <namespace> -o yaml > <replicaset-conf-name>.yaml

   .. Formating hack, need whitespace below too

   | \ 
   | **Sharded Cluster Resources**
    

   If you have sharded cluster resources but do not have the ``.yaml``
   configuration file for them, run the following command to generate
   the configuration file:

   .. code-block:: sh

      kubectl get msc <shardedcluster-name> -n <namespace> -o yaml > <shardedcluster-conf-name>.yaml

#. Edit each ``.yaml`` configuration file match the new |k8s-crd|:

   - Change the ``kind`` to ``MongoDB``
   - Add the ``spec.type`` field and set it to ``Standalone``,
     ``ReplicaSet``, or ``ShardedCluster`` depending on your resource.

     .. include:: /includes/fact-cannot-change-type.rst

   After you edit each ``.yaml`` file, they should look like the
   following example:

   .. tabs-deployments::

      tabs:
        - id: standalone
          content: |
            .. literalinclude:: /includes/code-examples/yaml-files/example-standalone.yaml
               :language: yaml
               :start-after: START-regular-standalone
               :end-before: END-regular-standalone
               :emphasize-lines: 3,15

        - id: repl
          content: |
            .. literalinclude:: /includes/code-examples/yaml-files/example-replica-set.yaml
               :language: yaml
               :start-after: START-regular-replset
               :end-before: END-regular-replset
               :linenos:
               :emphasize-lines: 3,16

        - id: shard
          content: |
            .. literalinclude:: /includes/code-examples/yaml-files/example-sharded-cluster.yaml
               :language: yaml
               :start-after: START-regular-sharded
               :end-before: END-regular-sharded
               :linenos:
               :emphasize-lines: 3,19

   .. warning::

      If you change the ``metadata.name`` field you will lose your
      resource's data.
