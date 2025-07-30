import com.mongodb.kotlin.client.MongoClient
import org.bson.Document
import com.mongodb.event.*
import com.mongodb.MongoClientSettings
import com.mongodb.ConnectionString

class ConnectionPoolLibrarian : ConnectionPoolListener {
    override fun connectionCheckedOut(event: ConnectionCheckedOutEvent) {
        println("Let me get you the connection with id ${event.connectionId.localValue}...")
    }
    override fun connectionCheckOutFailed(event: ConnectionCheckOutFailedEvent) {
        println("Something went wrong! Failed to checkout connection.")
    }
}


fun main() {
    val uri = "<connection string uri>"

// Instantiate your new listener
val cpListener = ConnectionPoolLibrarian()

// Include the listener in your client settings
    val settings = MongoClientSettings.builder()
        .applyConnectionString(ConnectionString(uri))
        .applyToConnectionPoolSettings({
            it.addConnectionPoolListener(cpListener)
            })
        .build()

// Connect to your database        
    val mongoClient = MongoClient.create(settings)
    val database = mongoClient.getDatabase("sample_mflix")
    val collection = database.getCollection<Document>("movies")

// Run some commands to test the counter
    collection.find().firstOrNull()

    mongoClient.close()
}