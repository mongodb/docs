User user = app.currentUser();
MongoClient mongoClient =
        user.getMongoClient("mongodb-atlas");
MongoDatabase mongoDatabase =
        mongoClient.getDatabase("plant-data-database");
// registry to handle POJOs (Plain Old Java Objects)
CodecRegistry pojoCodecRegistry = fromRegistries(AppConfiguration.DEFAULT_BSON_CODEC_REGISTRY,
        fromProviders(PojoCodecProvider.builder().automatic(true).build()));
MongoCollection<Plant> mongoCollection =
        mongoDatabase.getCollection(
                "plant-data-collection",
                Plant.class).withCodecRegistry(pojoCodecRegistry);
Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle");
