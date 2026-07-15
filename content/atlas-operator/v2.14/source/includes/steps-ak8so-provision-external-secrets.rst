To provision secrets with External Secrets Operator:

a. Deploy the ``SecretStore`` custom resource for the ``default``
   service account in the ``mongodb-atlas-system`` namespace:

   .. code-block::

      $ cat external-secrets/vault-system.yaml 
      apiVersion: external-secrets.io/v1beta1
      kind: SecretStore
      metadata:
        name: vault-store
        namespace: mongodb-atlas-system
      spec:
        provider:
          vault:
            server: "https://vault.internal.io"
            path: "secret"
            version: "v2"
            auth:
              jwt:
                path: "jwt-kube01"
                role: "jwt-kube01-system"
                kubernetesServiceAccountToken:
                  expirationSeconds: 600
                  serviceAccountRef:
                    name: "default"
                    audiences:
                    - vault
      $ kubectl apply -f external-secrets/vault-system.yaml

#. Deploy the ``SecretStore`` custom resource for the ``default``
   service account in the ``default`` namespace:

   .. code-block::

      $ cat external-secrets/vault-default.yaml 
      apiVersion: external-secrets.io/v1beta1
      kind: SecretStore
      metadata:
        name: vault-store
        namespace: default
      spec:
        provider:
          vault:
            server: "https://vault.internal.io"
            path: "secret"
            version: "v2"
            auth:
              jwt:
                path: "jwt-kube01"
                role: "jwt-role"
                kubernetesServiceAccountToken:
                  expirationSeconds: 600
                  serviceAccountRef:
                    name: "default"
                    audiences:
                    - vault
      $ kubectl apply -f external-secrets/vault-default.yaml

#. Deploy the ``ExternalSecret`` custom resource that references the
   secret that contains the API key. You must set
   ``spec.target.template.metadata.labels`` to 
   ``atlas.mongodb.com/type`` with the value ``credentials``
   for |ak8so| to find the secret that External Secrets Operator
   creates.

   Before you run the following command, ensure that {+vault+} has the
   secret populated at the Kv V2 path ``secret/data/kube01/external-secrets/atlas-account`` with the following properties: 
   
   - ``orgId``
   - ``publicApiKey``
   - ``privateApiKey``

   .. code-block::

      $ cat external-secrets/atlas.yaml 
      apiVersion: external-secrets.io/v1beta1
      kind: ExternalSecret
      metadata:
        name: atlas
        namespace: mongodb-atlas-system
      spec:
          refreshInterval: "15s"
          secretStoreRef:
            name: vault-store
            kind: SecretStore
          target:
            name: mongodb-atlas-operator-api-key
            template:
              metadata:
                labels:
                  atlas.mongodb.com/type: credentials
          data:
          - secretKey: orgId
            remoteRef:
              key: secret/data/kube01/external-secrets/atlas-account
              property: orgId
          - secretKey: publicApiKey
            remoteRef:
              key: secret/data/kube01/external-secrets/atlas-account
              property: publicApiKey
          - secretKey: privateApiKey
            remoteRef:
              key: secret/data/kube01/external-secrets/atlas-account
              property: privateApiKey
        $ kubectl apply -f external-secrets/atlas.yaml

   This command creates the |k8s| |k8s-secret|
   ``mongodb-atlas-operator-api-key`` in the ``mongodb-atlas-system``
   namespace.

#. Deploy the ``ExternalSecret`` custom resource that references the
   secret that contains database user credentials. You must set
   ``spec.target.template.metadata.labels`` to 
   ``atlas.mongodb.com/type`` with the value ``credentials``
   for |ak8so| to find the secret that External Secrets Operator
   creates.

   Before you run the following command, ensure that {+vault+} has the
   secret populated at the Kv V2 path 
   ``secret/data/kube01/external-secrets/db-user`` with the
   ``password`` property.

   .. code-block::

      $ cat external-secrets/dbuser.yaml 
      apiVersion: external-secrets.io/v1beta1
      kind: ExternalSecret
      metadata:
        name: dbuser
        namespace: default
      spec:
          refreshInterval: "15s"
          secretStoreRef:
            name: vault-store
            kind: SecretStore
          target:
            name: dbuser-password
            template:
              metadata:
                labels:
                  atlas.mongodb.com/type: credentials
          data:
          - secretKey: password
            remoteRef:
              key: secret/data/kube01/external-secrets/db-user
              property: password
        $ kubectl apply -f external-secrets/atlas.yaml

#. Ensure the secrets return as expected when you run the
   following commands:

   .. code-block::

      $ kubectl get -n mongodb-atlas-system secrets/mongodb-atlas-operator-api-key

   .. code-block::

      $ kubectl get -n default secrets/dbuser-password