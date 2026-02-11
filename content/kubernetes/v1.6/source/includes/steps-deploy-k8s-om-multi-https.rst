.. step:: Create |k8s| clusters.

   You may skip this step if you already have installed and configured your
   own |k8s| clusters with a service mesh.

   a. Create three |gke| clusters:
     
      .. literalinclude:: /includes/code-examples/ops-manager-multi-cluster/code_snippets/0010_create_gke_cluster_0.sh
         :language: sh
         :linenos:

      .. literalinclude:: /includes/code-examples/ops-manager-multi-cluster/code_snippets/0010_create_gke_cluster_1.sh
         :language: sh
         :linenos:

      .. literalinclude:: /includes/code-examples/ops-manager-multi-cluster/code_snippets/0010_create_gke_cluster_2.sh
         :language: sh
         :linenos:

   
   #. Set your default gcloud project:

      .. literalinclude:: /includes/code-examples/ops-manager-multi-cluster/code_snippets/0011_gcloud_set_current_project.sh
            :language: sh
            :linenos:


   #. Obtain credentials and save contexts to the current ``kubeconfig``
      file. By default, this file is located in the ``~/.kube/config`` directory
      and referenced by the ``$KUBECONFIG`` :ref:`environment variable <set-env-vars-om-mc>`.

      .. literalinclude:: /includes/code-examples/ops-manager-multi-cluster/code_snippets/0020_get_gke_credentials.sh
         :language: sh
         :linenos:

      All ``kubectl`` commands reference these contexts using the following variables:

      - ``$K8S_CLUSTER_0_CONTEXT_NAME``
      - ``$K8S_CLUSTER_1_CONTEXT_NAME``
      - ``$K8S_CLUSTER_2_CONTEXT_NAME``

   #. Verify that ``kubectl`` has access to |k8s| clusters:

      .. io-code-block:: 
         :copyable: true 

         .. input:: /includes/code-examples/ops-manager-multi-cluster/code_snippets/0030_verify_access_to_clusters.sh
            :linenos:
            :language: sh

         .. output:: /includes/code-examples/ops-manager-multi-cluster/output/0030_verify_access_to_clusters.out
            :linenos:
            :language: sh
            :visible: false

   #. Install |istio| service mesh to allow cross-cluster |dns| resolution
      and network connectivity between |k8s| clusters:
     
      .. literalinclude:: /includes/code-examples/ops-manager-multi-cluster/code_snippets/0040_install_istio.sh
         :language: sh
         :linenos:


.. step:: Create namespaces.

   .. note::

      To enable |sidecar-injection| in Istio, the following commands add
      the ``istio-injection=enabled`` labels to the ``$OPERATOR_NAMESPACE``
      and the ``mongodb`` namespaces on each member cluster.
      If you use another service mesh, configure it to handle network
      traffic in the created namespaces.

   - Create a separate namespace, ``mongodb-operator``, referenced by the
     ``$OPERATOR_NAMESPACE`` :ref:`environment variable <set-env-vars-om-mc>`
     for the |k8s-op-short| deployment.

   - Create the same ``$OPERATOR_NAMESPACE`` on each member |k8s| cluster.
     This is needed so that the :ref:`kubectl mongodb plugin <kubectl-plugin-ref>`
     can create a service account for the |k8s-op-short| on each member cluster.
     The |k8s-op-short| uses these service accounts on the operator
     cluster to perform operations on each member cluster.

     .. literalinclude:: /includes/code-examples/ops-manager-multi-cluster/code_snippets/0045_create_operator_namespace.sh
        :language: sh
        :linenos:

   - On each member cluster, including the member cluster that serves
     as the operator cluster, create another, separate namespace, ``mongodb``.
     The |k8s-op-short| uses this namespace for |onprem| resources and components.

     .. literalinclude:: /includes/code-examples/ops-manager-multi-cluster/code_snippets/0045_create_ops_manager_namespace.sh
        :language: sh
        :linenos:

.. step:: Optional. Authorize clusters to pull secrets from private image registries.

   This step is optional if you use official Helm charts and images from the |quay| registry.

   .. literalinclude:: /includes/code-examples/ops-manager-multi-cluster/code_snippets/0046_create_image_pull_secrets.sh
      :language: sh
      :linenos:

.. step:: Optional. Check cluster connectivity.

   The following optional scripts verify whether the service mesh is
   configured correctly for cross-cluster DNS resolution and connectivity.

   a. Run this script on cluster 0:

      .. literalinclude:: /includes/code-examples/ops-manager-multi-cluster/code_snippets/0050_check_cluster_connectivity_create_sts_0.sh
         :language: yaml
         :linenos:

   b. Run this script on cluster 1:

      .. literalinclude:: /includes/code-examples/ops-manager-multi-cluster/code_snippets/0050_check_cluster_connectivity_create_sts_1.sh
         :language: yaml
         :linenos:

   c. Run this script on cluster 2:

      .. literalinclude:: /includes/code-examples/ops-manager-multi-cluster/code_snippets/0050_check_cluster_connectivity_create_sts_2.sh
         :language: yaml
         :linenos:

   d. Run this script to wait for the creation of StatefulSets:

      .. literalinclude:: /includes/code-examples/ops-manager-multi-cluster/code_snippets/0060_check_cluster_connectivity_wait_for_sts.sh
         :language: sh
         :linenos:

   e. Create Pod service on cluster 0:

      .. literalinclude:: /includes/code-examples/ops-manager-multi-cluster/code_snippets/0070_check_cluster_connectivity_create_pod_service_0.sh
         :language: yaml
         :linenos:

   f. Create Pod service on cluster 1:

      .. literalinclude:: /includes/code-examples/ops-manager-multi-cluster/code_snippets/0070_check_cluster_connectivity_create_pod_service_1.sh
         :language: yaml
         :linenos:

   g. Create Pod service on cluster 2:

      .. literalinclude:: /includes/code-examples/ops-manager-multi-cluster/code_snippets/0070_check_cluster_connectivity_create_pod_service_2.sh
         :language: yaml
         :linenos:

   h. Create round robin service on cluster 0:

      .. literalinclude:: /includes/code-examples/ops-manager-multi-cluster/code_snippets/0080_check_cluster_connectivity_create_round_robin_service_0.sh
         :language: yaml
         :linenos:

   i. Create round robin service on cluster 1:

      .. literalinclude:: /includes/code-examples/ops-manager-multi-cluster/code_snippets/0080_check_cluster_connectivity_create_round_robin_service_1.sh
         :language: yaml
         :linenos:

   j. Create round robin service on cluster 2:

      .. literalinclude:: /includes/code-examples/ops-manager-multi-cluster/code_snippets/0080_check_cluster_connectivity_create_round_robin_service_2.sh
         :language: yaml
         :linenos:

   k. Verify Pod 0 from cluster 1:

      .. io-code-block:: 
         :copyable: true 

         .. input:: /includes/code-examples/ops-manager-multi-cluster/code_snippets/0090_check_cluster_connectivity_verify_pod_0_0_from_cluster_1.sh
            :linenos:
            :language: sh

         .. output:: /includes/code-examples/ops-manager-multi-cluster/output/0090_check_cluster_connectivity_verify_pod_0_0_from_cluster_1.out
            :linenos:
            :language: sh
            :visible: false

   l. Verify Pod 1 from cluster 0:

      .. io-code-block:: 
         :copyable: true 

         .. input:: /includes/code-examples/ops-manager-multi-cluster/code_snippets/0090_check_cluster_connectivity_verify_pod_1_0_from_cluster_0.sh
            :linenos:
            :language: sh

         .. output:: /includes/code-examples/ops-manager-multi-cluster/output/0090_check_cluster_connectivity_verify_pod_1_0_from_cluster_0.out
            :linenos:
            :language: sh
            :visible: false

   m. Verify Pod 1 from cluster 2:

      .. io-code-block:: 
         :copyable: true 

         .. input:: /includes/code-examples/ops-manager-multi-cluster/code_snippets/0090_check_cluster_connectivity_verify_pod_1_0_from_cluster_2.sh
            :linenos:
            :language: sh

         .. output:: /includes/code-examples/ops-manager-multi-cluster/output/0090_check_cluster_connectivity_verify_pod_1_0_from_cluster_2.out
            :linenos:
            :language: sh
            :visible: false

   o. Verify Pod 2 from cluster 0:

      .. io-code-block::
         :copyable: true 

         .. input:: /includes/code-examples/ops-manager-multi-cluster/code_snippets/0090_check_cluster_connectivity_verify_pod_2_0_from_cluster_0.sh
            :linenos:
            :language: sh

         .. output:: /includes/code-examples/ops-manager-multi-cluster/output/0090_check_cluster_connectivity_verify_pod_2_0_from_cluster_0.out
            :linenos:
            :language: sh
            :visible: false

   p. Run the cleanup script:

      .. literalinclude:: /includes/code-examples/ops-manager-multi-cluster/code_snippets/0100_check_cluster_connectivity_cleanup.sh
         :language: sh
         :linenos:

.. step:: Deploy a multi-cluster configuration.

   In this step, you use the |kubectl-mongodb| to automate the |k8s| cluster
   configuration that is necessary for the |k8s-op-short| to manage workloads
   on multiple |k8s| clusters.

   Because you configure the |k8s| clusters before you install the |k8s-op-short|,
   when you deploy the |k8s-op-short| for the multi-|k8s| cluster operation,
   all the necessary multi-cluster configuration is already in place. 

   As stated in the :ref:`om-multi-procedure-overview`, the |k8s-op-short|
   has the configuration for three member clusters that you can use to deploy
   |onprem| MongoDB databases.
   The first cluster is also used as the operator cluster, where you
   install the |k8s-op-short| and deploy the custom resources.

   .. io-code-block::
      :copyable: true 

      .. input:: /includes/code-examples/ops-manager-multi-cluster/code_snippets/0200_kubectl_mongodb_configure_multi_cluster.sh
         :linenos:
         :language: sh

      .. output:: /includes/code-examples/ops-manager-multi-cluster/output/0200_kubectl_mongodb_configure_multi_cluster.out
         :linenos:
         :language: sh
         :visible: false

.. step:: Install the |k8s-op-short| using the Helm chart.

   a. Add and update the MongoDB Helm repository. Verify that the local Helm cache refers to the correct |k8s-op-short| version:

      .. io-code-block::
         :copyable: true 

         .. input:: /includes/code-examples/ops-manager-multi-cluster/code_snippets/0205_helm_configure_repo.sh
            :linenos:
            :language: sh

         .. output:: /includes/code-examples/ops-manager-multi-cluster/output/0205_helm_configure_repo.out
            :linenos:
            :language: sh
            :visible: false

   b. Install the |k8s-op-short| into the ``$OPERATOR_NAMESPACE``, configured to watch
      ``$NAMESPACE`` and to manage three member |k8s| clusters. At this point
      in the procedure, :k8sdocs:`ServiceAccounts </tasks/configure-pod-container/configure-service-account/>`
      and :k8sdocs:`roles </reference/access-authn-authz/rbac/#role-and-clusterrole>`
      are already deployed by the |kubectl-mongodb|. Therefore, the following
      scripts skip configuring them and set ``operator.createOperatorServiceAccount=false``
      and ``operator.createResourcesServiceAccountsAndRoles=false``.
      The scripts specify the ``multiCluster.clusters`` setting to instruct
      the Helm chart to deploy the |k8s-op-short| in :ref:`multi-cluster mode <mode-multi-or-single>`.

      .. io-code-block::
         :copyable: true 

         .. input:: /includes/code-examples/ops-manager-multi-cluster/code_snippets/0210_helm_install_operator.sh
            :linenos:
            :language: sh

         .. output:: /includes/code-examples/ops-manager-multi-cluster/output/0210_helm_install_operator.out
            :linenos:
            :language: sh
            :visible: false

   c. Check the |k8s-op-short| deployment:

      .. io-code-block::
         :copyable: true

         .. input:: /includes/code-examples/ops-manager-multi-cluster/code_snippets/0211_check_operator_deployment.sh
            :linenos:
            :language: sh

         .. output:: /includes/code-examples/ops-manager-multi-cluster/output/0211_check_operator_deployment.out
            :linenos:
            :language: sh
            :visible: false

.. step:: Prepare TLS certificates.

   In this step, you enable |tls| for the {+appdb+} and the |application|.
   If you don't want to use TLS, remove the following fields from the ``MongoDBOpsManager``
   resources:

   - :opsmgrkube:`spec.security.certsSecretPrefix`
   - :opsmgrkube:`spec.security.tls.ca`
   - :opsmgrkube:`spec.applicationDatabase.security.certsSecretPrefix`
   - :opsmgrkube:`spec.applicationDatabase.security.tls.ca`

   a. Optional. Generate keys and certificates:

      Use the ``openssl`` command line tool to generate self-signed CAs and
      certificates for testing purposes.

      .. literalinclude:: /includes/code-examples/ops-manager-multi-cluster/code_snippets/0250_generate_certs.sh
         :language: shell
         :linenos:

   b. Create secrets with TLS keys:

      If you prefer to use your own keys and certificates, skip the previous
      generation step and put the keys and certificates  into the following files:

      - ``certs/ca.crt`` - |certauth| certificates. These are not necessary when using trusted certificates.
      - ``certs/appdb.key`` - private key for the {+appdb+}.
      - ``certs/appdb.crt`` - certificate for the {+appdb+}.
      - ``certs/om.key`` - private key for |onprem|.
      - ``certs/om.crt`` - certificate for |onprem|.

      .. literalinclude:: /includes/code-examples/ops-manager-multi-cluster/code_snippets/0255_create_cert_secrets.sh
         :language: sh
         :linenos:

.. step:: Install |onprem|.

   At this point, you have prepared the environment and the |k8s-op-short|
   to deploy the |onprem| resource.

   a. Create the necessary credentials for the |onprem| admin user that the
      |k8s-op-short| will create after deploying the |application| instance:

      .. literalinclude:: /includes/code-examples/ops-manager-multi-cluster/code_snippets/0300_ops_manager_create_admin_credentials.sh
         :language: sh
         :linenos:

   b. Deploy the simplest ``MongoDBOpsManager`` custom resource possible
      (with |tls| enabled) on a single member cluster, which is also known as
      the operator cluster.

      This deployment is almost the same as for the :ref:`single-cluster mode <mode-multi-or-single>`,
      but with :opsmgrkube:`spec.topology` and :opsmgrkube:`spec.applicationDatabase.topology`
      set to ``MultiCluster``.

      Deploying this way shows that a single |k8s| cluster deployment is
      a special case of a multi-|k8s| cluster deployment on a single |k8s| member cluster.
      You can start deploying the |application| and the {+appdb+}
      on as many |k8s| clusters as necessary from the beginning, and don't
      have to start with the deployment with only a single member |k8s| cluster.

      At this point, you have prepared the |onprem| deployment to span more
      than one |k8s| cluster, which you will do later in this procedure.

      .. literalinclude:: /includes/code-examples/ops-manager-multi-cluster/code_snippets/0310_ops_manager_deploy_on_single_member_cluster.sh
         :language: yaml
         :linenos:

   c. Wait for the |k8s-op-short| to pick up the work and reach the
      ``status.applicationDatabase.phase=Pending`` state. Wait for both the
      {+appdb+} and |onprem| deployments to complete.

      .. io-code-block::
         :copyable: true

         .. input:: /includes/code-examples/ops-manager-multi-cluster/code_snippets/0311_ops_manager_wait_for_pending_state.sh
            :linenos:
            :language: sh

         .. output:: /includes/code-examples/ops-manager-multi-cluster/output/0311_ops_manager_wait_for_pending_state.out
            :linenos:
            :language: sh
            :visible: false

   d. Deploy |onprem|. The |k8s-op-short| deploys |onprem| by performing
      the following steps. It:

      - Deploys the {+appdb+}\'s replica set nodes and waits
        for the MongoDB processes in the replica set to start running.
      - Deploys the |application| instance with the {+appdb+}\'s
        connection string and waits for it to become ready.
      - Adds the Monitoring {+mdbagent+} containers to each {+appdb+}\'s Pod.
      - Waits for both the |application| and the {+appdb+} Pods to start running.

      .. io-code-block::
         :copyable: true

         .. input:: /includes/code-examples/ops-manager-multi-cluster/code_snippets/0312_ops_manager_wait_for_running_state.sh
            :linenos:
            :language: sh

         .. output:: /includes/code-examples/ops-manager-multi-cluster/output/0312_ops_manager_wait_for_running_state.out
            :linenos:
            :language: sh
            :visible: false

      Now that you have deployed a single-member cluster in a :ref:`multi-cluster mode <mode-multi-or-single>`,
      you can reconfigure this deployment to span more than one |k8s| cluster.

   e. On the second member cluster, deploy two additional {+appdb+}
      replica set members and one additional instance of the |application|:

      .. literalinclude:: /includes/code-examples/ops-manager-multi-cluster/code_snippets/0320_ops_manager_add_second_cluster.sh
         :language: yaml
         :linenos:

   f. Wait for the |k8s-op-short| to pick up the work (pending phase):

      .. io-code-block::
         :copyable: true

         .. input:: /includes/code-examples/ops-manager-multi-cluster/code_snippets/0321_ops_manager_wait_for_pending_state.sh
            :linenos:
            :language: sh

         .. output:: /includes/code-examples/ops-manager-multi-cluster/output/0321_ops_manager_wait_for_pending_state.out
            :linenos:
            :language: sh
            :visible: false

   g. Wait for the |k8s-op-short| to finish deploying all components:

      .. io-code-block::
         :copyable: true 

         .. input:: /includes/code-examples/ops-manager-multi-cluster/code_snippets/0322_ops_manager_wait_for_running_state.sh
            :linenos:
            :language: sh

         .. output:: /includes/code-examples/ops-manager-multi-cluster/output/0322_ops_manager_wait_for_running_state.out
            :linenos:
            :language: sh
            :visible: false

.. step:: Enable backup.

   In a multi-|k8s| cluster deployment of the |application|, you can configure
   only |s3|-based backup storage. This procedure refers to ``S3_*``
   defined in :ref:`env_variables.sh <set-env-vars-om-mc>`.

   a. Optional. Install the |minio|.

      This procedure deploys |s3|-compatible storage for your backups using the |minio|.
      You can skip this step if you have |aws| |s3| or other |s3|-compatible
      buckets available. Adjust the ``S3_*`` variables accordingly in
      :ref:`env_variables.sh <set-env-vars-om-mc>` in this case.

      .. literalinclude:: /includes/code-examples/ops-manager-multi-cluster/code_snippets/0400_install_minio_s3.sh
         :language: sh
         :linenos:

   b. Before you configure and enable backup, create secrets:

      - ``s3-access-secret`` - contains |s3| credentials.
      - ``s3-ca-cert`` - contains a |certauth| certificate that issued the bucket's
        server certificate. In the case of the sample MinIO deployment used
        in this procedure, the default |k8s| Root |certauth| certificate
        is used to sign the certificate. Because it's not a publicly trusted
        |certauth| certificate, you must provide it so that |onprem| can
        trust the connection.

      If you use publicly trusted certificates, you may skip this step and
      remove the values from the :opsmgrkube:`spec.backup.s3Stores.customCertificateSecretRefs`
      and :opsmgrkube:`spec.backup.s3OpLogStores.customCertificateSecretRefs` settings.

      .. literalinclude:: /includes/code-examples/ops-manager-multi-cluster/code_snippets/0500_ops_manager_prepare_s3_backup_secrets.sh
         :language: sh
         :linenos:

.. step:: Re-deploy |onprem| with backup enabled.

   a. The |k8s-op-short| can configure and deploy all components,
      the |application|, the Backup Daemon instances, and the Application
      Database's replica set nodes in any combination on any member clusters
      for which you configure the |k8s-op-short|.
   
      To illustrate the flexibility of the multi-|k8s| cluster deployment
      configuration, deploy only one Backup Daemon instance on the third
      member cluster and specify zero Backup Daemon members for the first
      and second clusters.

      .. literalinclude:: /includes/code-examples/ops-manager-multi-cluster/code_snippets/0510_ops_manager_enable_s3_backup.sh
         :language: yaml
         :linenos:

   b. Wait until the |k8s-op-short| finishes its configuration:

      .. io-code-block:: 
         :copyable: true 

         .. input:: /includes/code-examples/ops-manager-multi-cluster/code_snippets/0522_ops_manager_wait_for_running_state.sh
            :linenos:
            :language: sh

         .. output:: /includes/code-examples/ops-manager-multi-cluster/output/0522_ops_manager_wait_for_running_state.out
            :linenos:
            :language: sh
            :visible: false

.. step:: Optional. Delete the |gke| clusters and all their associated resources (VMs).

   Run the following script to delete the GKE clusters and clean up your environment.

   .. important::

      The following commands are not reversible. They delete all clusters
      referenced in ``env_variables.sh``. Don't run these commands if you
      wish to retain the GKE clusters, for example, if you didn't create
      the GKE clusters as part of this procedure.

   .. literalinclude:: /includes/code-examples/ops-manager-multi-cluster/code_snippets/9010_delete_gke_clusters.sh
      :language: sh
      :linenos:
