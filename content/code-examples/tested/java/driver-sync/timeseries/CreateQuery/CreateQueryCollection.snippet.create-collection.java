MongoDatabase timeSeriesDB = mongoClient.getDatabase("timeseries");
timeSeriesDB.createCollection("weather", collectionOptions);
