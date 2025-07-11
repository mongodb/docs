// database and collection code goes here
MongoDatabase db = mongoClient.getDatabase("sample_guides");
MongoCollection<Document> coll = db.getCollection("planets");
