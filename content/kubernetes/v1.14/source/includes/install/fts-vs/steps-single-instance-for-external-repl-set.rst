.. procedure::
   :style: normal

   .. step:: Required. Create and deploy the resource for |text-search| and |vector-search|.

      You can deploy one instance of the search node without any load
      balancing. To deploy, complete the following steps:

      a. Create a MongoDBSearch custom resource named ``mdbs``.

         This resource contains the following:

         .. list-table::
            :widths: 30 70
            :stub-columns: 1

            * - ``spec.source.external.hostAndPorts``
              - List of external MongoDB replica set members.

            * - ``spec.source.username``
              - Search synchronization user username.

            * - ``spec.source.passwordSecretRef``
              - Search synchronization user password.

            * - ``spec.source.external.tls.ca.name``
              - Configures MongoDBSearch pods to trust the external
                database. It points to the |k8s| secret that contains
                the public CA certificate for your external MongoDB. 

            * - ``spec.security.tls.certsSecretPrefix``
              - Secures the MongoDBSearch service. It points to the
                |k8s| secret containing the |tls| server certificate and
                private key that the MongoDBSearch pods will present to
                incoming clients. 

            * - ``spec.resourceRequirements``
              - CPU and memory resource requirements for the search container.

         To learn more about the settings in this custom resource, see
         :ref:`k8s-fts-vs-settings`.

         .. literalinclude:: /includes/code-examples/search/04-search-external-mongod/code_snippets/04_0320_create_mongodb_search_resource.sh
            :language: shell
            :copyable: true
            :linenos:

      #. Wait for the MongoDBSearch resource deployment to
         complete.

         When you apply the MongoDBSearch custom resource, the
         |k8s| operator begins deploying the search nodes (pods). This
         step pauses the execution until the ``mdbs`` resource's
         status phase is ``Running``, which indicates that the
         MongoDB Search StatefulSet is operational.

         .. literalinclude:: /includes/code-examples/search/04-search-external-mongod/code_snippets/04_0325_wait_for_search_resource.sh
            :language: shell
            :copyable: true
            :linenos:

   .. step:: Required. Configure external access for |text-search| and |vector-search|.

      To enable your external MongoDB instances to connect to the search
      service, you must configure external access for |text-search| and
      |vector-search|. You can create a LoadBalancer Service that
      exposes the search pods outside the |k8s| cluster. 

      This following service exposes the MongoDBSearch service on
      port 27028 with an external IP address or hostname that can be
      accessed from outside the |k8s| cluster.

      .. literalinclude:: /includes/code-examples/search/04-search-external-mongod/code_snippets/04_0322_create_search_loadbalancer_service.sh
         :language: shell
         :copyable: true
         :linenos:

   .. step:: Optional. View all the running pods in your namespace.

      View all the running pods in your namespace pods for the MongoDB
      replica set members, the |k8s-op|, and the Search nodes.

      .. io-code-block::
         :copyable: true

         .. input:: /includes/code-examples/search/04-search-external-mongod/code_snippets/04_0335_show_running_pods.sh
            :language: shell
            :linenos:

         .. output:: /includes/code-examples/outputs/test_kind_search_external_mongod_snippets/04_0335_show_running_pods.out
            :language: shell
            :linenos:
            :visible: false