MongoCollection<Document> weatherNewColl = timeseriesDb.getCollection("weather_new");
Document result = weatherNewColl.find().first();
