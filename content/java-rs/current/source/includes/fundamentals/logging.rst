.. code-block:: java

   MongoClient mongoClient = MongoClients.create("<connection URI>");
   MongoDatabase database = mongoClient.getDatabase("<database>");
   MongoCollection<Document> collection = database.getCollection("<collection>");
   Flux.from(collection.find()).blockFirst();
