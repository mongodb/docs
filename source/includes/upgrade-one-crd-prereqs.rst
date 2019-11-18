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

   After you edit each ``.yaml`` file, it should look like the following
   example:

   .. tabs-deployments::

      tabs:
        - id: standalone
          content: |
            .. literalinclude:: /reference/k8s/example-standalone-minimal.yaml
               :language: yaml
               :emphasize-lines: 3,13

        - id: repl
          content: |
            .. literalinclude:: /reference/k8s/example-replica-set.yaml
               :language: yaml
               :lines: 1-17, 25
               :linenos:
               :emphasize-lines: 3,16

        - id: shard
          content: |
            .. literalinclude:: /reference/k8s/example-sharded-cluster.yaml
               :language: yaml
               :lines: 1-20, 28
               :linenos:
               :emphasize-lines: 3,19

   .. warning::

      If you change the ``metadata.name`` field you will lose your
      resource's data.
