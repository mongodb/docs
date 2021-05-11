.. code-block:: java

   MongoClient mongoClient = MongoClients.create(<my uri>);
   MongoDatabase database = mongoClient.getDatabase(<my database>);
   MongoCollection<Document> collection = database.getCollection(<my collection>);
   collection.find().first();
