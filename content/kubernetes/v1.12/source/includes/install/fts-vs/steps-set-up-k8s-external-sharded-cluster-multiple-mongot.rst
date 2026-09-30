.. procedure::
   :style: normal

   .. step:: Create the |k8s| namespace.

      The |k8s-op-short| uses the ``mongodb`` namespace by default. To
      simplify your installation, create the ``mongodb`` namespace using
      the following |kubectl| command:

      .. literalinclude:: /includes/code-examples/search/07-search-external-sharded-mongod-managed-lb/code_snippets/07_0045_create_namespaces.sh
         :language: shell
         :copyable: true
         :linenos:

   .. step:: Conditional. Install the |k8s-op|.

      The |k8s-op-short| watches ``MongoDB``, ``MongoDBOpsManager``, and
      ``MongoDBSearch`` custom resources and manages the lifecycle of
      your MongoDB deployments. If you already installed the |k8s-op|,
      skip this step. Otherwise, install the |k8s-op| using |helm|.

      To install the |k8s-op| in the ``mongodb`` namespace, copy, paste,
      and run the following:

      .. io-code-block::
         :copyable: true

         .. input:: /includes/code-examples/search/07-search-external-sharded-mongod-managed-lb/code_snippets/07_0100_install_operator.sh
            :language: shell
            :linenos:

         .. output:: /includes/code-examples/outputs/test_kind_search_external_sharded_managed_lb_snippets/07_0100_install_operator.out
            :language: shell
            :visible: false

      The preceding command installs |k8s-op-short| in the ``mongodb``
      namespace, which it creates if it doesn't already exist. After
      installation, the |k8s-op-short| watches for ``MongoDBSearch``
      custom resources and manages the lifecycle of your |text-search| and
      |vector-search| deployments.