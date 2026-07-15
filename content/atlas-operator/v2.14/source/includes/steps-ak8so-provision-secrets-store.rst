To provision secrets with Secrets Store CSI:

a. Deploy the ``SecretProviderClass`` custom resource in the
   ``mongodb-atlas-system`` namespace. You must set
   ``spec.secretObjects.labels`` to 
   ``atlas.mongodb.com/type`` with the value ``credentials``
   for |ak8so| to find the secret that Secrets Store CSI
   creates.

   Before you run the following command, ensure that {+vault+} has the
   secret populated at the Kv V2 path 
   ``secret/data/kube01/external-secrets/atlas-account`` with the
   following properties: 
   
   - ``orgId``
   - ``publicApiKey``
   - ``privateApiKey``

   .. code-block::

      $ cat secrets-store/atlas.yaml
      apiVersion: secrets-store.csi.x-k8s.io/v1
      kind: SecretProviderClass
      metadata:
        name: atlas
        namespace: mongodb-atlas-system
      spec:
        provider: vault
        secretObjects:
        - data:
          - key: orgId
            objectName: atlas-org
          - key: publicApiKey
            objectName: atlas-pub-key
          - key: privateApiKey
            objectName: atlas-secret-key
          secretName: mongodb-atlas-operator-api-key
          type: Opaque
          labels:
            atlas.mongodb.com/type: credentials
        parameters:
          vaultAddress: https://vault.internal.io
          vaultKubernetesMountPath: k8s-kube01
          roleName: k8s-kube01-role
          objects: |
            - objectName: atlas-org
              secretPath: secret/data/kube01/secrets-store/atlas-account
              secretKey: orgId
            - objectName: atlas-pub-key
              secretPath: secret/data/kube01/secrets-store/atlas-account
              secretKey: publicApiKey
            - objectName: atlas-secret-key
              secretPath: secret/data/kube01/secrets-store/atlas-account
              secretKey: privateApiKey
      $ kubectl apply -f secrets-store/atlas.yaml

   This command creates the |k8s| |k8s-secret|
   ``mongodb-atlas-operator-api-key`` in the ``mongodb-atlas-system``
   namespace.

#. Run the following command to add a pod that mounts the
   required secrets:

   .. code-block::

      $ cat secrets-store/ako-patch.yaml 
        template:
          spec:
            containers:
            - name: system-secret-placeholder
              image: mongodb/atlas
              command: ["sleep", "infinity"]
              volumeMounts:
              - name: secrets-store-mount
                mountPath: "/mnt/secrets-store"
                readOnly: true
            volumes:
              - name: secrets-store-mount
                csi:
                  driver: secrets-store.csi.k8s.io
                  readOnly: true
                  volumeAttributes:
                    secretProviderClass: atlas
      $ kubectl apply -f secrets-store/ako-patch.yaml

#. Deploy the ``SecretProviderClass`` custom resource that references
   the secret that contains database user credentials. You must set
   ``spec.target.template.metadata.labels`` to 
   ``atlas.mongodb.com/type`` with the value ``credentials``
   for |ak8so| to find the secret that Secrets Store CSI
   creates.

   Before you run the following command, ensure that {+vault+} has the
   secret populated at the Kv V2 path 
   ``secret/data/kube01/external-secrets/db-user`` with the
   ``password`` property.

   .. code-block::

      $ cat external-secrets/dbuser.yaml 
      apiVersion: external-secrets.io/v1beta1
      kind: SecretProviderClass
      metadata:
        name: dbuser
        namespace: default
      spec:
        provider: vault
        secretObjects:
        - data:
          - key: password
            objectName: dbuser
          secretName: dbuser-password
          type: Opaque
          labels:
            atlas.mongodb.com/type: credentials
       parameters:
          vaultAddress: https://vault.internal.io
          vaultKubernetesMountPath: k8s-kube01
          roleName: k8s-kube01-role
          objects: |
            - objectName: "dbuser"
              secretPath: "secret/data/kube01/secrets-store/db-user"
              secretKey: "password"
      $ kubectl apply -f secrets-store/dbuser.yaml

#. Run the following command to create the ``secret-placeholder``
   sentinel pod, which ensures the Secrets Store CSI driver fetches
   the ``dbuser`` credentials and sync them to |k8s|:

   .. code-block::

      $ cat secrets-store/placeholder.yaml
      kind: Pod
      apiVersion: v1
      metadata:
        name: secret-placeholder
      spec:
        containers:
        - image: mongodb/atlas
          command: ["sleep", "infinity"]
          name: secret-placeholder
          volumeMounts:
          - name: secrets-store-mount
            mountPath: "/mnt/secrets-store"
            readOnly: true
        volumes:
          - name: secrets-store-mount
            csi:
              driver: secrets-store.csi.k8s.io
              readOnly: true
              volumeAttributes:
                secretProviderClass: dbuser
      $ kubectl apply -f secrets-store/placeholder.yaml

#. Ensure the secrets return as expected when you run the
   following commands:

   .. code-block::

      $ kubectl get -n mongodb-atlas-system secrets/mongodb-atlas-operator-api-key

   .. code-block::

      $ kubectl get -n default secrets/dbuser-password