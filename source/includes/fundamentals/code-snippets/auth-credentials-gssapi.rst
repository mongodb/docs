.. code-block:: java

   MongoCredential credential = MongoCredential.createGSSAPICredential(<principal_username>);

   MongoClient mongoClient = MongoClients.create(
       MongoClientSettings.builder()
           .applyToClusterSettings(builder ->
                   builder.hosts(Arrays.asList(new ServerAddress("<hostname>", <port>))))
           .credential(credential)
           .build());

