.. code-block:: java

   MongoCredential credential = MongoCredential.createAwsCredential(<username>, <password>);
   String connectionString = "mongodb://<hostname>:<port>/?authSource=<authenticationDb>&authMechanism=MONGODB-AWS&AWS_SESSION_TOKEN:<awsSessionToken>");

   MongoClient mongoClient = MongoClients.create(
       MongoClientSettings.builder()
           .applyConnectionString(connectionString)
           .credential(credential)
           .applyToSslSettings(builder -> {
               builder.enabled(true));
               })
           .build());

