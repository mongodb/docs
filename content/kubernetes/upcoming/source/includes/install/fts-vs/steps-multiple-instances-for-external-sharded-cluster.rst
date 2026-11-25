.. procedure::
   :style: normal

   .. step:: Required. Create and deploy the resource for |text-search| and |vector-search|.

      a. Create a ``MongoDBSearch`` custom resource that configures ``mongot``
         replicas with a managed Envoy load balancer. The resource configures 
         the following:

         - The external sharded cluster as the sync source, including
           the ``mongos`` router host and per-shard ``mongod`` hosts,
           with |tls| verification using the CA secret.
         - A sync user and password secret for authenticating with the
           source sharded cluster.
         - |tls| certificates using the ``certsSecretPrefix``.
         - A managed load balancer mode for routing traffic through Envoy.
         - An ``externalHostname`` template in a DNS domain that you
           control. The value contains the ``{shardName}`` placeholder,
           which the |k8s-op-short| replaces at runtime with each
           shard's ``shardName`` from the
           ``spec.source.external.shards`` list. This produces a unique
           hostname for each shard. The Envoy proxy matches these
           hostnames against the SNI of incoming ``mongod`` connections,
           so the load balancer's TLS certificate must include every
           expanded hostname in its SANs. A wildcard certificate, such
           as ``*.search.example.com``, covers all shards with a single
           certificate.

           For example, suppose the ``externalHostname`` is set to
           ``{shardName}.search.example.com`` and the shards are named
           ``shard-0`` and ``shard-1``. The resulting hostnames are:

           - ``shard-0.search.example.com``
           - ``shard-1.search.example.com``

         - A ``routerHostname`` in the same domain. This shard-agnostic
           hostname is the entry point that ``mongos`` routers use to
           reach ``mongot``. Unlike ``externalHostname``, the
           |k8s-op-short| uses this value verbatim.

           You must create DNS records that resolve each expanded
           ``externalHostname`` value and the ``routerHostname`` to the
           corresponding proxy Service, or to a load balancer in front
           of the proxy Services. The |k8s-op-short| creates a proxy
           Service named ``{name}-search-0-{shardName}-proxy-svc`` for
           each shard and ``{name}-search-0-proxy-svc`` for the router.

         - Resource limits and requests for ``mongot`` pods.

         .. literalinclude:: /includes/code-examples/search/07-search-external-sharded-mongod-managed-lb/code_snippets/07_0320_create_mongodb_search_resource.sh
            :language: shell
            :copyable: true
            :linenos:

      #. Wait for the ``MongoDBSearch`` resource to reach ``Running``
         status. 

         .. io-code-block::
            :copyable: true
         
            .. input:: /includes/code-examples/search/07-search-external-sharded-mongod-managed-lb/code_snippets/07_0325_wait_for_search_resource.sh
               :language: shell
               :linenos:

            .. output:: /includes/code-examples/outputs/test_kind_search_external_sharded_managed_lb_snippets/07_0325_wait_for_search_resource.out
               :language: shell
               :linenos:
               :visible: false

   .. step:: Required. Verify the MongoDBSearch deployment.

      The following commands show the pods, search-related services,
      and ``MongoDBSearch`` resources in the namespace.

      .. io-code-block::
         :copyable: true
      
         .. input:: /includes/code-examples/search/07-search-external-sharded-mongod-managed-lb/code_snippets/07_0330_show_running_pods.sh
            :language: shell
            :linenos:

         .. output:: /includes/code-examples/outputs/test_kind_search_external_sharded_managed_lb_snippets/07_0330_show_running_pods.out
            :language: shell
            :linenos:
            :visible: false

   .. step:: Optional. Verify external ``mongod`` instances.

      After the ``MongoDBSearch`` resource is running, verify that 
      your external ``mongod`` instances connect to the operator-created
      proxy Services. Each proxy Service must be exposed externally on 
      a hostname configured in the 
      ``spec.loadBalancer.managed.externalHostname`` field. Each shard 
      must be exposed on a different, shard-specific hostname, and 
      traffic from ``mongod`` must be configured to reach the proxy 
      Service for that particular shard. The proxy Service forwards 
      traffic to the Envoy proxy, which reads the SNI hostname and 
      routes the traffic to the correct shard's ``mongot`` group.
      
      To learn more about configuring |com| parameters, see 
      :ref:`k8s-search-set-parameters`.
