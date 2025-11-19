.. procedure::
   :style: normal

   .. step:: Create a MongoDBUser YAML file.

      Create a file (e.g., ``my-oidc-user.yaml``) to define the user.

      - ``metadata.name``: A unique name for the MongoDBUser resource within Kubernetes.
      - ``spec.username``: The user's OIDC identity, combining the oidc 
        provider's ``configurationName`` and the user's unique token claim in the 
        format ``<configurationName>/<userClaimValue>``.
      - ``spec.db``: This must be ``$external``.
      - ``spec.mongodbResourceRef.name``: The name of the ``MongoDB`` resource this user belongs to.
      - ``spec.roles``: An array of MongoDB roles to grant to this user.

      Here is an example that creates a user with read-write access to the app-data database.

      .. code-block:: yaml

         apiVersion: mongodb.com/v1
         kind: MongoDBUser
         metadata:
           # A unique name for this Kubernetes resource.
           name: oidc-app-user-1
         spec:
           # This username MUST match the 'userClaim' from the OIDC token.
           username: "idp0/a1b2c3d4e5f6g7h8"
 
           # OIDC users MUST be created in the $external database.
           db: "$external"

           # Point to the MongoDB deployment where this user should be created.
           mongodbResourceRef:
             name: my-oidc-replicaset

           # Grant MongoDB roles to the user.
           roles:
             - db: "app-data"
               name: "readWrite"

   .. step:: Apply the configuration.

      .. code-block:: sh

         kubectl apply -f my-oidc-user.yaml




