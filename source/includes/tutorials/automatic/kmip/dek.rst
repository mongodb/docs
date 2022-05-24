
Update and run the following code
to generate a new {+dek-long+}:
     
.. TODO: Java Tech review: does it make sense to only specify endpoint
         in order for KMS to randomly generate 96 byte DEK? Would you
         rather I specify an ID value here or have a reader use their own?

.. _csfle-kmip-create-dek:

.. tabs-drivers::

    .. tab::
       :tabid: java-sync

       .. code-block:: java

          Map<String, Map<String, Object>> kmsProviderProperties = new HashMap<>();
          Map<String, Object> providerDetails = new HashMap<>();
          providerDetails.put("endpoint", "<KMIP provider URI>");
          kmsProviderProperties.put(kmsProvider,  providerDetails);
          String keyVaultCollection = "<MongoDB namespace where you store your keys>"

          ClientEncryption clientEncryption = ClientEncryptions.create(ClientEncryptionSettings.builder()
              .keyVaultMongoClientSettings(MongoClientSettings.builder()
                  .applyConnectionString(new ConnectionString("<MongoDB connection string>"))
                  .build())
              .keyVaultNamespace(keyVaultNamespace)
              .kmsProviders(kmsProviders)
              .build());

          DataKeyOptions dataKeyOptions = new DataKeyOptions().masterKey(
              new BsonDocument()
                 .append("endpoint", new BsonString("<KMIP provider URI>")))

          BsonBinary dataKeyId = clientEncryption.createDataKey("kmip", dataKeyOptions);

          System.out.println("DataKeyId [UUID]: " + dataKeyId.asUuid().toString());

.. note:: Create {+cmk-long+}

   If you do not specify the ``keyId`` property in your ``dataKeyOpts``
   object, your client-application creates a new key on your
   {+kmip-kms+}.

   To learn more, see :ref:`csfle-reference-kms-providers-kmip-datakeyopts`.
