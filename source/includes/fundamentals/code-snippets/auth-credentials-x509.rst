.. code-block:: java

   MongoCredential credential = MongoCredential.createMongoX509Credential(<username>);

   MongoClient mongoClient = MongoClients.create(
       MongoClientSettings.builder()
           .applyToClusterSettings(builder ->
               builder.hosts(Arrays.asList(new ServerAddress(<hostname>, <port>))))
           .applyToSslSettings(builder ->
               builder.enabled(true);
               )
           .credential(credential)
           .build());

