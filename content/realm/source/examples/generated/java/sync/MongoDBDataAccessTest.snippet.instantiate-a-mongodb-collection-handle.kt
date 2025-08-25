val user = app.currentUser()
val mongoClient =
    user!!.getMongoClient("mongodb-atlas")
val mongoDatabase =
    mongoClient.getDatabase("plant-data-database")
// registry to handle POJOs (Plain Old Java Objects)
val pojoCodecRegistry = CodecRegistries.fromRegistries(
    AppConfiguration.DEFAULT_BSON_CODEC_REGISTRY,
    CodecRegistries.fromProviders(
        PojoCodecProvider.builder().automatic(true).build()))
val mongoCollection =
    mongoDatabase.getCollection(
        "plant-data-collection",
        Plant::class.java).withCodecRegistry(pojoCodecRegistry)
Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle")
