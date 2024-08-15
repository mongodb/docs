import com.mongodb.*
import com.mongodb.kotlin.client.MongoClient

fun main() {
    
    // start-connect-to-atlas-w-uri
    // Replace the placeholder with your Atlas connection string
    val uri = "<connection string>"

    // Create a new client and connect to the server
    val mongoClient = MongoClient.create(uri)
    val database = mongoClient.getDatabase("sample_mflix")
    // end-connect-to-atlas-w-uri

    try {
        // Send a ping to confirm a successful connection
        val command = Document("ping", BsonInt64(1))
        val commandResult = database.runCommand(command)
        println("Pinged your deployment. You successfully connected to MongoDB!")
    } catch (me: MongoException) {
        System.err.println(me)
    }
}
