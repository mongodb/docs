.. important::
   Run these steps in order after sourcing ``env_variables.sh``.

.. collapsible::
   :heading: Deploy the MongoDB Sharded Cluster
   :expanded: false

   .. procedure::
      :style: normal

      .. step:: Required. Create MongoDB Sharded Cluster

         Create the ``operator-managed`` replica set. The operator
         automatically configures search parameters when
         ``MongoDBSearch`` is deployed later:

         .. literalinclude:: /includes/code-examples/search/09-search-sharded-mongod-managed-lb/code_snippets/09_0310_create_mongodb_sharded_cluster.sh
            :language: shell
            :copyable: true
            :linenos:

      .. step:: Required. Wait for Sharded Cluster

         Wait for the cluster to reach Running phase (up to 15 min).

         .. literalinclude:: /includes/code-examples/search/09-search-sharded-mongod-managed-lb/code_snippets/09_0315_wait_for_sharded_cluster.sh
            :language: shell
            :copyable: true
            :linenos:

      .. step:: Required. Create MongoDB Users

         Create admin, application, and search-sync-source MongoDB users.

         .. literalinclude:: /includes/code-examples/search/09-search-sharded-mongod-managed-lb/code_snippets/09_0316_create_mongodb_users.sh
            :language: shell
            :copyable: true
            :linenos:

.. collapsible::
   :heading: Deploy MongoDB Search with Managed Envoy LB
   :expanded: false

   .. procedure::
      :style: normal

      .. step:: Required. Create mongot TLS Certificates

         Create TLS certificates for ``mongot`` pods (one
         cert-manager Certificate per shard). The
         ``certsSecretPrefix`` field in the CR
         (``MDB_TLS_CERT_SECRET_PREFIX``) determines how the operator
         locates these secrets — it expects names like
         ``{prefix}-{resource}-search-0-{shard}-cert``.

         .. literalinclude:: /includes/code-examples/search/09-search-sharded-mongod-managed-lb/code_snippets/09_0316a_create_mongot_tls_certificates.sh
            :language: shell
            :copyable: true
            :linenos:

      .. step:: Required. Create Load Balancer TLS Certificates

         The Envoy proxy terminates one mTLS session (from
         ``mongod``) and initiates another (to ``mongot``), so it
         needs **two** certificates:

         .. list-table::
            :header-rows: 1
            :widths: 20 40 40

            * - Certificate
              - Secret Name Pattern
              - Purpose
            * - Server cert
              - ``{prefix}-{name}-search-lb-0-cert``
              - Presented to ``mongod`` during TLS handshake
            * - Client cert
              - ``{prefix}-{name}-search-lb-0-client-cert``
              - Used by Envoy when connecting to ``mongot``

         Both must be signed by the same CA that ``mongod`` and ``mongot`` trust.

         .. note::

            If you are using your own PKI instead of cert-manager, you must create
            **both** the server certificate and the client certificate. The client
            certificate (``*-lb-client-cert``) is required for Envoy to authenticate
            itself to ``mongot``. If necessary, use the following script to set
            up the client certificate.

         .. literalinclude:: /includes/code-examples/search/09-search-sharded-mongod-managed-lb/code_snippets/09_0316b_create_lb_tls_certificates.sh
            :language: shell
            :copyable: true
            :linenos:

      .. step:: Required. Create MongoDBSearch Resource

         Apply the ``MongoDBSearch`` Custom Resource with
         ``spec.loadBalancer.managed`` and
         ``mongodbResourceRef`` pointing to the MongoDB Custom
         Resource. You don't need ``source.username``, ``source.passwordSecretRef``, or
         ``source.external`` block. The operator infers these from the referenced
         MongoDB Custom Resource.

         .. literalinclude:: /includes/code-examples/search/09-search-sharded-mongod-managed-lb/code_snippets/09_0320_create_mongodb_search_resource.sh
            :language: shell
            :copyable: true
            :linenos:

      .. step:: Required. Wait for MongoDBSearch

         Wait for the MongoDBSearch resource to reach Running phase, which might take up to ten minutes.

         .. literalinclude:: /includes/code-examples/search/09-search-sharded-mongod-managed-lb/code_snippets/09_0325_wait_for_search_resource.sh
            :language: shell
            :copyable: true
            :linenos:

.. collapsible::
   :heading: Verify the Deployment
   :expanded: false

   To verify the deployment, run this command to show all pods
   in the namespace including MongoDB replica set pods, ``mongot``
   pods, Envoy proxy pods, and operator pods.
   
   .. literalinclude:: /includes/code-examples/search/09-search-sharded-mongod-managed-lb/code_snippets/09_0330_show_running_pods.sh
      :language: shell
      :copyable: true
      :linenos: