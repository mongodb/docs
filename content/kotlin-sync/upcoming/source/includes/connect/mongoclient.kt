import com.mongodb.*
import com.mongodb.kotlin.client.MongoClient
import org.bson.BsonInt64
import org.bson.Document

fun main() {
    
    // start-connect-to-atlas
    // Replace the placeholder with your Atlas connection string
    val uri = "<connection string>"
    val mongoClient1 = MongoClient.create(uri)
    // end-connect-to-atlas-w-uri
    
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
    val database = mongoClient.getDatabase("sample_mflix")

    try {
        // Send a ping to confirm a successful connection
        val command = Document("ping", BsonInt64(1))
        val commandResult = database.runCommand(command)
        println("Pinged your deployment. You successfully connected to MongoDB!")
    } catch (me: MongoException) {
        System.err.println(me)
    }
    // end-connect-to-atlas
}
