.. procedure::
   :style: normal

   .. step:: Required. Create and deploy the resource for |text-search| and |vector-search|.

      Deploy one ``mongot`` instance without a load balancer. To
      deploy, complete the following steps:

      a. Create a ``MongoDBSearch`` custom resource.

         This resource configures the external sharded cluster as
         the sync source and deploys a single ``mongot`` instance.
         The resource must contain the following:

         .. list-table::
            :widths: 30 70
            :stub-columns: 1

            * - ``spec.source.external.shardedCluster.router.hosts``
              - List of ``mongos`` router hosts and ports for the
                external sharded cluster.

            * - ``spec.source.external.shardedCluster.shards``
              - Per-shard list of replica set member hosts and
                ports. Each entry specifies the shard name and its
                ``hosts`` array.

            * - ``spec.source.external.tls.ca.name``
              - Name of the |k8s| ConfigMap that contains the
                public CA certificate for your external MongoDB
                deployment. Configures ``mongot`` to trust the
                external database.

            * - ``spec.source.username``
              - Username of the search synchronization user.

            * - ``spec.source.passwordSecretRef``
              - Name of the |k8s| secret that contains the
                password for the search synchronization user.

            * - ``spec.security.tls.certsSecretPrefix``
              - Prefix used to locate the |tls| server certificate
                secret for the ``MongoDBSearch`` service.

            * - ``spec.clusters[].resourceRequirements``
              - CPU and memory resource requirements for the
                ``mongot`` container.

         To learn more about the settings in this custom resource,
         see :ref:`k8s-fts-vs-settings`.

         To create the ``MongoDBSearch`` resource, run the following
         command in your terminal:

         .. code-block:: shell

            kubectl apply --context "${K8S_CTX}" -n "${MDB_NS}" -f - <<EOF
            apiVersion: mongodb.com/v1
            kind: MongoDBSearch
            metadata:
              name: ${MDB_SEARCH_RESOURCE_NAME}
            spec:
              logLevel: DEBUG
              source:
                username: search-sync-source
                passwordSecretRef:
                  name: ${MDB_SEARCH_RESOURCE_NAME}-search-sync-source-password
                  key: password
                external:
                  shardedCluster:
                    router:
                      hosts:
                        - ${MDB_EXTERNAL_MONGOS_HOST}
                    shards:
                      - shardName: ${MDB_EXTERNAL_SHARD_0_NAME}
                        hosts:
                          - ${MDB_EXTERNAL_SHARD_0_HOST}
                      - shardName: ${MDB_EXTERNAL_SHARD_1_NAME}
                        hosts:
                          - ${MDB_EXTERNAL_SHARD_1_HOST}
                  tls:
                    ca:
                      name: ${MDB_TLS_CA_CONFIGMAP}
              security:
                tls:
                  certsSecretPrefix: ${MDB_TLS_CERT_SECRET_PREFIX}
              clusters:
                - resourceRequirements:
                    limits:
                      cpu: "2"
                      memory: 3Gi
                    requests:
                      cpu: "1"
                      memory: 2Gi
            EOF

      #. Wait for the ``MongoDBSearch`` resource to reach
         ``Running`` status.

         .. io-code-block::
            :copyable: true

            .. input:: /includes/code-examples/search/07-search-external-sharded-mongod-managed-lb/code_snippets/07_0325_wait_for_search_resource.sh
               :language: shell
               :linenos:

            .. output:: /includes/code-examples/outputs/test_kind_search_external_sharded_managed_lb_snippets/07_0325_wait_for_search_resource.out
               :language: shell
               :linenos:
               :visible: false

   .. step:: Required. Configure external access for |text-search| and |vector-search|.

      To let your external ``mongod`` and ``mongos`` processes reach
      ``mongot``, create your own ``LoadBalancer`` Service for each
      shard to expose the operator-managed load balancer outside the
      |k8s| cluster.

      After you create each Service, set the ``mongotHost`` and
      ``searchIndexManagementHostAndPort`` parameters on that shard's
      ``mongod`` members to the external endpoint of the Service you
      created for that shard. On each ``mongos`` router, set the same
      parameters to the first shard's Service endpoint so that
      ``mongos`` can route ``$search`` queries.

   .. step:: Optional. View all the running pods in your namespace.

      View all the running pods in your namespace, including
      ``mongot`` pods and operator pods.

      .. io-code-block::
         :copyable: true

         .. input:: /includes/code-examples/search/07-search-external-sharded-mongod-managed-lb/code_snippets/07_0330_show_running_pods.sh
            :language: shell
            :linenos:

         .. output:: /includes/code-examples/outputs/test_kind_search_external_sharded_managed_lb_snippets/07_0330_show_running_pods.out
            :language: shell
            :linenos:
            :visible: false
