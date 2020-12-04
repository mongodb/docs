.. code-block:: java

   MongoCredential credential = MongoCredential.createAwsCredential("<username>", "<password>".toCharArray());
   String connectionString = "mongodb://<hostname>:<port>/?authSource=<authenticationDb>&authMechanism=MONGODB-AWS&authMechanismProperties=AWS_SESSION_TOKEN:<awsSessionToken>");

   MongoClient mongoClient = MongoClients.create(
       MongoClientSettings.builder()
           .applyConnectionString(connectionString)
           .credential(credential)
           .build());

