fun main() = runBlocking {
    val mongoClient = MongoClient.create("<connection string uri>")
    val codecRegistry = CodecRegistries.fromRegistries(
        CodecRegistries.fromCodecs(IntegerCodec(), PowerStatusCodec()),
        CodecRegistries.fromProviders(MonolightCodecProvider()),
        MongoClientSettings.getDefaultCodecRegistry()
    )
    val database = mongoClient.getDatabase("codecs_example_products")
    val collection = database.getCollection<Monolight>("monolights")
        .withCodecRegistry(codecRegistry)

    // Construct and insert an instance of Monolight
    val myMonolight = Monolight(PowerStatus.ON, 5200)
    collection.insertOne(myMonolight)

    // Retrieve one or more instances of Monolight
    val lights =  collection.find().toList()
    println(lights)
}
