.. code-block:: java

   MongoClient mongoClient = MongoClients.create(<connection uri>);
   MongoDatabase database = mongoClient.getDatabase(<database>);
   MongoCollection<Document> collection = database.getCollection(<collection>);
   collection.find().first();
