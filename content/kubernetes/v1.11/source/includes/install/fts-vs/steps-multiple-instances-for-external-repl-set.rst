.. procedure:: 
   :style: normal

   .. step:: Required. Create and deploy the resource for |text-search| and |vector-search|.

      a. Create a ``MongoDBSearch`` custom resource that deploys ``mongot``
         replicas with a managed Envoy load balancer. The resource
         configures the following:

         - The external ``mongod`` replica set hosts as the sync source,
           with |tls| verification using the CA secret.
         - A sync user and password secret for authenticating with the
           source replica set.
         - |tls| certificates using the ``certsSecretPrefix``.
         - A managed load balancer mode for routing traffic through Envoy.
         - An ``externalHostname`` that your external ``mongod`` instances
           use to reach the Envoy proxy Service. Set this to a DNS name
           or hostname that resolves to the proxy Service's external IP.
           The |k8s-op-short| creates a proxy Service named
           ``{name}-search-0-proxy-svc`` and the ``externalHostname``
           value is embedded in the proxy's TLS certificate so that
           ``mongod`` can verify the connection.
         - Resource limits and requests for ``mongot`` pods.

         .. literalinclude:: /includes/code-examples/search/10-search-external-rs-mongod-managed-lb/code_snippets/10_0320_create_mongodb_search_resource.sh
            :language: shell
            :copyable: true
            :linenos:

      #. Wait for the ``MongoDBSearch`` resource to reach ``Running``
         status. 
         
         This might take several minutes while ``mongot`` syncs
         data from the external replica set.

         .. io-code-block::
            :copyable: true
         
            .. input:: /includes/code-examples/search/10-search-external-rs-mongod-managed-lb/code_snippets/10_0325_wait_for_search_resource.sh
               :language: shell
               :linenos:

            .. output:: /includes/code-examples/outputs/test_kind_search_external_rs_managed_lb_snippets/10_0325_wait_for_search_resource.out
               :language: shell
               :linenos:
               :visible: false

   .. step:: Required. Verify the MongoDBSearch deployment.

      The following commands show the pods, search-related services,
      and ``MongoDBSearch`` resources in the namespace.

      .. io-code-block::
         :copyable: true

         .. input:: /includes/code-examples/search/10-search-external-rs-mongod-managed-lb/code_snippets/10_0330_show_running_pods.sh
            :language: shell
            :linenos:

         .. output:: /includes/code-examples/outputs/test_kind_search_external_rs_managed_lb_snippets/10_0330_show_running_pods.out
            :language: shell
            :linenos:
            :visible: false

   .. step:: Optional. Verify external ``mongod`` instances.

      After the ``MongoDBSearch`` resource is running, verify that your
      external ``mongod`` instances connect to the operator-created
      proxy Service. To learn more about configuring |com| parameters 
      from the UI, see :ref:`k8s-search-set-parameters`.
