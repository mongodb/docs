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
mongoCollection.insertMany(
    listOf(
        Plant(
            ObjectId(),
            "venus flytrap",
            "full",
            "white",
            "perennial",
            "Store 42"
        ),
        Plant(
            ObjectId(),
            "sweet basil",
            "partial",
            "green",
            "annual",
            "Store 42"
        ),
        Plant(
            ObjectId(),
            "thai basil",
            "partial",
            "green",
            "perennial",
            "Store 42"
        ),
        Plant(
            ObjectId(),
            "helianthus",
            "full",
            "yellow",
            "annual",
            "Store 42"
        ),
        Plant(
            ObjectId(),
            "petunia",
            "full",
            "purple",
            "annual",
            "Store 47"
        )
    )
)
Log.v("EXAMPLE", "Successfully Successfully inserted the sample data.")
