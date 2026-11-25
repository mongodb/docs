.. important::
   Run these steps in order after sourcing ``env_variables.sh``.

.. collapsible::
   :heading: Deploy the MongoDB Sharded Cluster
   :expanded: false

   .. procedure::
      :style: normal

      .. step:: Required. Create MongoDB Sharded Cluster

         Create the operator-managed sharded cluster. The
         |k8s-op-short| automatically configures search parameters
         when you deploy the ``MongoDBSearch`` resource later:

         .. literalinclude:: /includes/code-examples/search/09-search-sharded-mongod-managed-lb/code_snippets/09_0310_create_mongodb_sharded_cluster.sh
            :language: shell
            :copyable: true
            :linenos:

      .. step:: Required. Wait for Sharded Cluster

         Wait for the cluster to reach the ``Running`` phase. This
         may take up to 15 minutes.

         .. literalinclude:: /includes/code-examples/search/09-search-sharded-mongod-managed-lb/code_snippets/09_0315_wait_for_sharded_cluster.sh
            :language: shell
            :copyable: true
            :linenos:

      .. step:: Required. Create MongoDB Users

         Create the admin, application, and ``search-sync-source``
         MongoDB users required by the |k8s-op-short| and the
         ``mongot`` process:

         .. literalinclude:: /includes/code-examples/search/09-search-sharded-mongod-managed-lb/code_snippets/09_0316_create_mongodb_users.sh
            :language: shell
            :copyable: true
            :linenos:

.. collapsible::
   :heading: Deploy MongoDB Search
   :expanded: false

   .. procedure::
      :style: normal

      .. step:: Required. Create mongot TLS Certificates

         Create a |tls| certificate for each shard's ``mongot``
         pod using ``cert-manager``. The
         ``certsSecretPrefix`` field in the ``MongoDBSearch``
         custom resource determines how the operator locates these
         secrets — it expects names in the format
         ``{prefix}-{resource}-search-0-{shard}-cert``.

         .. literalinclude:: /includes/code-examples/search/09-search-sharded-mongod-managed-lb/code_snippets/09_0316a_create_mongot_tls_certificates.sh
            :language: shell
            :copyable: true
            :linenos:

      .. step:: Required. Create and deploy the ``MongoDBSearch`` resource.

         Deploy one ``mongot`` instance per shard without an Envoy
         load balancer. The ``MongoDBSearch`` resource references
         the sharded cluster by name through ``mongodbResourceRef``
         and configures |tls| via ``certsSecretPrefix``. Because
         there is no load balancer, ``mongod`` on each shard
         connects directly to its local ``mongot`` pod.

         To create the ``MongoDBSearch`` resource, run the following
         command in your terminal:

         .. code-block:: shell

            kubectl apply --context "${K8S_CTX}" -n "${MDB_NS}" -f - <<EOF
            apiVersion: mongodb.com/v1
            kind: MongoDBSearch
            metadata:
              name: ${MDB_RESOURCE_NAME}
            spec:
              logLevel: DEBUG
              source:
                mongodbResourceRef:
                  name: ${MDB_RESOURCE_NAME}
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

         The ``MongoDBSearch`` resource references the sharded
         cluster by name through ``mongodbResourceRef`` and
         configures |tls| through ``certsSecretPrefix``. The single
         ``clusters`` entry deploys one ``mongot`` instance per shard.
         To learn more about these settings, see
         :ref:`k8s-fts-vs-settings`.

      .. step:: Required. Wait for the ``MongoDBSearch`` resource.

         Wait for the ``MongoDBSearch`` resource to reach the
         ``Running`` phase. This may take up to ten minutes.

         .. literalinclude:: /includes/code-examples/search/09-search-sharded-mongod-managed-lb/code_snippets/09_0325_wait_for_search_resource.sh
            :language: shell
            :copyable: true
            :linenos:

.. collapsible::
   :heading: Verify the Deployment
   :expanded: false

   To verify the deployment, run this command to show all pods
   in the namespace, including MongoDB shard pods, ``mongot``
   pods, and operator pods.

   .. literalinclude:: /includes/code-examples/search/09-search-sharded-mongod-managed-lb/code_snippets/09_0330_show_running_pods.sh
      :language: shell
      :copyable: true
      :linenos:
