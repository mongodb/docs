a. Copy the following command:
  
   .. important::
     
      The following command requires ``jq`` 1.6 or higher.
  
   .. code-block:: sh

      kubectl get secret {my-project}-{my-atlas-cluster}-{my-database-user} -o json | jq -r '.data | with_entries(.value |= @base64d)';

#. Replace the following placeholders with the details for your 
   custom resources:

   .. list-table::
      :widths: 20 80

      * - ``my-project``
        - Specify the value of the ``metadata`` field of your  
          :ref:`atlasproject-custom-resource`.

      * - ``my-atlas-cluster``
        - Specify the value of the ``metadata`` field of your 
          :ref:`atlasdeployment-custom-resource`.

      * - ``my-database-user``
        - Specify the value of the ``metadata`` field of your 
          :ref:`atlasdatabaseuser-custom-resource`.

#. Run the command.

   .. note::
     
      Your connection strings will differ from the following example. 
      If you have multiple private endpoints, the secret contains 
      multiple ``connectionStringPrivate`` and 
      ``connectionStringPrivateSvr`` fields with the appropriate 
      numeric suffix (for example, ``connectionStringPrivate1``, 
      ``connectionStringPrivate2``, and so on).

   .. code-block:: sh

      {
        "connectionStringPrivate": "mongodb://pl-0-eastus2.uzgh6.mongodb.net:1024,pl-0-eastus2.uzgh6.mongodb.net:1025,pl-0-eastus2.uzgh6.mongodb.net:1026/?ssl=truereplicaSet=atlas-18bndf-shard-0",
        "connectionStringPrivateSrv": "mongodb+srv://cluster0-pl-0.uzgh6.mongodb.net",
        "password": "P@@sword%",
        "username": "theuser"
       }

   You can use this |k8s-secret| in your application:

   .. code-block:: sh

      containers:
        - name: test-app
          env:
          - name: "CONNECTION_STRING"
            valueFrom:
              secretKeyRef:
                name: my-project-my-atlas-cluster-my-database-user
                key: connectionStringPrivate
