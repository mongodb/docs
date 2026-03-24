.. procedure::
   :style: normal

   .. step:: Required. Set the environment variables.

      To set the environment variables for use in the subsequent steps
      in this procedure, copy the following, set the values for the
      environment variables, and then run the commands in your terminal:

      .. literalinclude:: /includes/code-examples/search/07-search-external-sharded-mongod-managed-lb/env_variables.sh
         :language: yaml
         :copyable: true
         :linenos:

      Note that these environment variables are only available in
      the current terminal session and will need to be set again in any
      new terminal sessions.

   .. step:: Create the |k8s| namespace.

      The |k8s-op-short| uses the ``mongodb`` namespace by default. To
      simplify your installation, create the ``mongodb`` namespace using
      the following |kubectl| command:

      .. literalinclude:: /includes/code-examples/search/07_0045_create_namespaces.sh
         :language: yaml
         :copyable: true
         :linenos:

   .. step:: Conditional. Add the MongoDB |helm| repository.

      |helm| automates the deployment and management of MongoDB
      instances on |k8s|. If you have already added the |helm|
      repository that contains the |helm| chart for installing the
      |k8s-op-short| operator, skip this step. Otherwise, add the
      |helm| repository.

      To add, copy, paste, and run the following command:

      .. io-code-block::
         :copyable: true

         .. input:: /includes/code-examples/search/07-search-external-sharded-mongod-managed-lb/code_snippets/07_0090_helm_add_mongodb_repo.sh
            :language: yaml
            :linenos:

         .. output:: /includes/code-examples/outputs/test_kind_search_external_sharded_managed_lb_snippets/07_0090_helm_add_mongodb_repo.out
            :language: yaml
            :visible: false

   .. step:: Conditional. Install the |k8s-op|.

      The |k8s-op-short| watches ``MongoDB``, ``MongoDBOpsManager``, and
      ``MongoDBSearch`` custom resources and manages the lifecycle of
      your MongoDB deployments. If you already installed the |k8s-op|,
      skip this step. Otherwise, install the |k8s-op| from the |helm|
      repository you added in the previous step.

      To install the |k8s-op| in the ``mongodb`` namespace, copy, paste,
      and run the following:

      .. io-code-block::
         :copyable: true

         .. input:: /includes/code-examples/search/07-search-external-sharded-mongod-managed-lb/code_snippets/07_0100_install_operator.sh
            :language: yaml
            :linenos:

         .. output:: /includes/code-examples/outputs/test_kind_search_external_sharded_managed_lb_snippets/07_0100_install_operator.out
            :language: yaml
            :visible: false

      The preceding command installs |k8s-op-short| in the ``mongodb``
      namespace, which it creates if it doesn't already exist. After
      installation, the |k8s-op-short| watches for ``MongoDBSearch``
      custom resources and manages the lifecycle of your |text-search| and
      |vector-search| deployments.
