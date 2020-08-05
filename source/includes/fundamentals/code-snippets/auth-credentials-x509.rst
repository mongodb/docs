.. code-block:: java

   MongoCredential credential = MongoCredential.createMongoX509Credential(<username>);

   MongoClient mongoClient = MongoClients.create(
       MongoClientSettings.builder()
           .applyToSslSettings(builder -> {
               builder.enabled(true));
               })
           .credential(credential)
           .build());

