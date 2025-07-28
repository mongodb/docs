// Replace the placeholder with your Atlas connection string
val uri = "<connection string>"

// Construct a ServerApi instance using the ServerApi.builder() method
val serverApi = ServerApi.builder()
    .version(ServerApiVersion.V1)
    .build()
val settings = MongoClientSettings.builder()
    .applyConnectionString(ConnectionString(uri))
    .serverApi(serverApi)
    .build()
// Create a new client and connect to the server
val mongoClient = MongoClient.create(settings)
val database = mongoClient.getDatabase("admin")
try {
    // Send a ping to confirm a successful connection
    val command = Document("ping", BsonInt64(1))
    val commandResult = database.runCommand(command)
    println("Pinged your deployment. You successfully connected to MongoDB!")
} catch (me: MongoException) {
    System.err.println(me)
}
