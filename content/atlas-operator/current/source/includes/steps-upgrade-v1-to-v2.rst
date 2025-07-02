.. procedure::
   :style:  normal

   .. step:: Deploy a new |k8s| cluster.

      With this new cluster deployed, you now have two |k8s| clusters. The 
      following steps require that you run ``kubectl`` commmands against each of
      these |k8s| clusters. To simplify this, you can configure each of the |k8s| 
      contexts with the following commands:

      .. code-block:: sh

         kubectl config set-cluster old --server=https://<OLD_CLUSTER_URL>
         kubectl config set-context old --cluster=old

         kubectl config set-cluster new --server=https://<NEW_CLUSTER_URL>
         kubectl config set-context new --cluster=new

   .. step:: Deploy |ak8so| ``v2.x`` to your new K8s cluster.

      Replace the ``<version>`` placeholder in the following command with your 
      desired |ak8so| version, and run the command to deploy |ak8so| to your newly provsioned 
      |k8s| cluster.

      .. code-block:: sh

         kubectl use-context new
         kubectl apply -f https://raw.githubusercontent.com/mongodb/mongodb-atlas-kubernetes/<version>/deploy/all-in-one.yaml

   .. step:: Scale the replica count of your ``v1.x`` |ak8so| to zero.
      
      Scale the replica count in your ``v1.x`` |ak8so| deployment to ``0`` in 
      your "old" |k8s| cluster, so that it will no longer monitor and update 
      the associated MongoDB |service| deployment by running:

      .. code-block:: sh
         
         kubectl use-context old
         kubectl scale --replicas=0 deployment.apps/mongodb-atlas-operator -n mongodb-atlas-system

   .. step:: Update existing ``AtlasProject`` CR definitions.

      Update your existing YAML definitions to align with the following example, 
      so they reference the following API secrets and credentials as needed:

      .. list-table::
         :header-rows: 1
         :widths: 25 25 25 25

         * - CR Section
           - Cloud Provider
           - v1.x
           - v2.x

         * - ``.spec.alertConfiguration.notifications``
           -
           - ``APIToken``
           - ``APITokenRef``

         * - 
           -
           - ``DatadogAPIKey``
           - ``DatadogAPIKeyRef``

         * -
           -
           - ``FlowdockTokenAPI``
           - ``FlowdockTokenAPIRef``

         * -
           -
           - ``OpsGenieAPIKey``
           - ``OpsGenieAPIKeyRef``

         * -
           -
           - ``VictorOpsAPIKey``
           - ``VictorOpsSecretRef``

         * -
           -
           - ``VictorOpsRoutingKey``
           - ``VictorOpsSecretRef`` 
             (expected to have both ``VictorOps`` values)

         * - ``.spec.encryptionAtRest``
           - AWS
           - ``AccessKeyID``, ``SecretAccessKey``, ``CustomerMasterKeyID``, ``RoleID``
           - ``CloudProviderAccessRoles``

         * - 
           - Azure
           - ``SubscriptionID``, ``KeyVaultName``, ``KeyIdentifier``, ``Secret``
           - ``secretRef``

         * - 
           - GCP
           - ``ServiceAccountKey``, ``KeyVersionResourceID``
           - ``secretRef``
   
      As a result of the updates you made in the previous steps, 
      your resulting CRD might look similar to the following example:

      .. code-block:: yaml

         apiVersion: atlas.mongodb.com/v1
         kind: AtlasProject
         metadata:
           name: my-project
           labels:
             app.kubernetes.io/version: 1.6.0
         spec:
           name: Test Atlas Operator Project
           projectIpAccessList:
             - cidrBlock: "<Public-CIDR-of-K8s-Cluster>"
               comment: "This CIDR is added to your Atlas Project's Access List." 

   .. step:: Update existing ``AtlasDeployment`` CR definitions.
      
      - If your existing YAML definition includes an ``advancedDeploymentSpec``,
        rename that section to ``deploymentSpec``.

      - If your existing YAML definition includes a ``deploymentSpec``,
        update that section to align with the following ``deploymentSpec`` example.

      - If your existing YAML definition includes a ``serverlessSpec``,
        no changes are required.

      As a result of the updates you made in the previous steps, 
      your resulting CRD might look similar to the following example:

      .. code-block:: yaml
         
         deploymentSpec:
           clusterType: REPLICASET
           name: advanced-deployment-2
           mongoDBMajorVersion: "5.0"
           replicationSpecs:

             - regionConfigs:
                 regionName: EASTERN_US
                 - electableSpecs:
                     nodeCount: 4
                     instanceSize: M10
                   autoScaling:
                     compute:
                       scaleDownEnabled: true
                       enabled: true
                       minInstanceSize: M10
                       maxInstanceSize: M20
                   providerName: GCP
                   backingProviderName: GCP
                   priority: 7

                 regionName: US_EAST_2
                 - electableSpecs:
                     nodeCount: 1
                     instanceSize: M10
                   autoScaling:
                     compute:
                       scaleDownEnabled: true
                       enabled: true
                       minInstanceSize: M10
                       maxInstanceSize: M20
                   providerName: AWS
                   backingProviderName: AWS
                   priority: 6

   .. step:: Apply the newly generated AKO 2.x compatible resources in your new |k8s| cluster.
      
      Run the following command to deploy your updated |ak8so| resources:

      .. code-block:: sh
         
         kubectl use-context new
         kubectl apply -f resource.yaml

   .. step:: Scale up the number of replica set members in the upgraded deployment.

      Set the replica count to ``1`` in your |ak8so| 2.x deployment, 
      so that the new |ak8so| picks up migrated resources.
      Because these resources are semantically equal to your existing AKO 1.9.x 
      custom resources, your MongoDB |service| resources themselves won't change.

   .. step:: Verify new resource statuses.

      Run the following commands to verify the statuses of your newly deployed custom resources:

      .. code-block:: sh
         
         kubectl use-context new
         kubectl describe atlasprojects <your-project-name>
         kubectl describe atlasdeployments <your-deployment-name>
