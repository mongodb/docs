.. procedure:: 
   :style: normal

   .. step:: Retrieve your Kubernetes Operator replica set definition file.

      If you have an existing replica set definition file, open it. Otherwise, 
      you can copy the entire working examples below.


   .. step:: Add the OIDC authentication settings.

      In your definition file, modify the ``spec.security`` section. Choose one or 
      more of the following examples based on your use case. You can combine 
      multiple provider configurations in the ``oidcProviderConfigs`` array.

      **Example A: Workforce Federation with Group Membership**

      Use this for authenticating human users based on their group membership in your IdP. 
      This is the most common model for managing teams of users.

      .. literalinclude:: /includes/code-examples/yaml-files/workforce-federation-with-group-membership.yaml
         :language: yaml

      **Example B: Workload Federation with UserID**

      Use this for authenticating an application or service with a specific 
      identity. This is ideal for service accounts.

      .. literalinclude:: /includes/code-examples/yaml-files/workload-federation-with-userid.yaml
         :language: yaml

      .. include:: /includes/userid-oidc-note.rst

      **Example C: Workforce Federation with UserID**

      Use this to grant a specific human user unique permissions not covered 
      by their group memberships.

      .. literalinclude:: /includes/code-examples/yaml-files/workforce-federation-with-userid.yaml
         :language: yaml

      .. include:: /includes/userid-oidc-note.rst

      **Example D: Workload Federation with Group Membership**

      Use this for authenticating a group of related services or applications 
      that all require the same permissions.

      .. literalinclude:: /includes/code-examples/yaml-files/workload-federation-with-group-membership.yaml
         :language: yaml

   .. step:: Apply the configuration.

      .. code-block:: sh

         kubectl apply -f <your-replica-set-file>.yaml

   .. step:: Track the status of your deployment.

      .. code-block:: sh

         kubectl get mdb <resource-name> -o yaml -w
