.. code-block:: kotlin

   val mongoClient = MongoClient.create(<connection uri>);
   val database = mongoClient.getDatabase(<database>);
   val collection = database.getCollection<Document>(<collection>);
   collection.find().first();
