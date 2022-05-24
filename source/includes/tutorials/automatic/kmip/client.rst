.. procedure::
   :style: connected

   .. step:: Specify the {+key-vault-long-title+} Namespace

      Specify ``encryption.__keyVault`` as the {+key-vault-long+}
      namespace.

      .. tabs-drivers::

         .. tab::
            :tabid: java-sync

            .. code-block:: java

               String keyVaultNamespace = "encryption.__keyVault";

   .. step:: Specify your KMIP Endpoint

      Specify the ``kmip`` KMS provider and the URI of your
      {+kmip-kms+}:

      .. tabs-drivers::

         .. tab::
            :tabid: java-sync

            .. code-block:: java

               Map<String, Map<String, Object>> kmsProviderProperties = new HashMap<>();
               Map<String, Object> providerDetails = new HashMap<>();
               providerDetails.put("endpoint", "<KMIP provider URI>");
               kmsProviderProperties.put("kmip",  providerDetails);


   .. step:: Create an Encryption Schema For Your Collection

      Create an encryption schema that specifies how your client
      application encrypts your documents' fields:

      .. tip:: Add Your {+dek-long+} Base64 ID

         Make sure to update the following code to include your Base64
         {+dek-abbr+} ID. You recieved this value in the
         :ref:`Generate your {+dek-long+} <csfle-kmip-create-dek>` step of this
         guide.

      .. tabs-drivers::

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/tutorials/automatic/kmip/schema.java
               :language: java
      
      .. include:: /includes/quick-start/schema/further-reading-note.rst

   .. step:: Specify the Location of the Encryption Binary

      Configure the client to spawn the ``mongocryptd`` process by specifying the
      path to the binary using the following configuration options:

      .. tabs-drivers::

         .. tab::
            :tabid: java-sync

            .. code-block:: java
               :emphasize-lines: 2

               Map<String, Object> extraOptions = new HashMap<String, Object>();
               extraOptions.put("mongocryptdSpawnPath", "/usr/local/bin/mongocryptd");

            .. note:: Encryption Binary Daemon

               If the ``mongocryptd`` daemon is already running, you can
               configure the client to skip starting it by passing the
               following option:

               .. code-block:: java
                  :emphasize-lines: 1

                  extraOptions.put("mongocryptdBypassSpawn", true);

   .. step:: Create the MongoClient

      Instantiate a MongoDB client object with the following
      automatic encryption settings:

      .. tabs-drivers::

         .. tab::
            :tabid: java-sync

            .. code-block:: java
               :emphasize-lines: 3-8

               MongoClientSettings clientSettings = MongoClientSettings.builder()
                   .applyConnectionString(new ConnectionString("mongodb://localhost:27017"))
                   .autoEncryptionSettings(AutoEncryptionSettings.builder()
                       .keyVaultNamespace(keyVaultNamespace)
                       .kmsProviders(kmsProviders)
                       .schemaMap(schemaMap)
                       .extraOptions(extraOptions)
                       .build())
                   .build();

               MongoClient mongoClient = MongoClients.create(clientSettings);
