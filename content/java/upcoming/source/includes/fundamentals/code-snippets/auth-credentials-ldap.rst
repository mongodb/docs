.. code-block:: java

   MongoCredential credential = MongoCredential.createPlainCredential(<username>, "$external", <db_password>);

   MongoClient mongoClient = MongoClients.create(
       MongoClientSettings.builder()
           .applyToClusterSettings(builder ->
                   builder.hosts(Arrays.asList(new ServerAddress("<hostname>", <port>))))
           .credential(credential)
           .build());

