.. code-block:: java

   MongoCredential credential = MongoCredential.createScramSha1Credential("<db_username>", "<authenticationDb>", "<db_password>");

   MongoClient mongoClient = MongoClients.create(
       MongoClientSettings.builder()
           .applyToClusterSettings(builder ->
                   builder.hosts(Arrays.asList(new ServerAddress("<hostname>", <port>))))
           .credential(credential)
           .build());

