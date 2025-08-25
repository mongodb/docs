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
mongoCollection.insertMany(Arrays.asList(
        new Plant(new ObjectId(),
                "venus flytrap",
                "full",
                "white",
                "perennial",
                "Store 42"),
        new Plant(new ObjectId(),
                "sweet basil",
                "partial",
                "green",
                "annual",
                "Store 42"),
        new Plant(new ObjectId(),
                "thai basil",
                "partial",
                "green",
                "perennial",
                "Store 42"),
        new Plant(new ObjectId(),
                "helianthus",
                "full",
                "yellow",
                "annual",
                "Store 42"),
        new Plant(new ObjectId(),
                "petunia",
                "full",
                "purple",
                "annual",
                "Store 47")));
Log.v("EXAMPLE", "Successfully inserted the sample data.");
