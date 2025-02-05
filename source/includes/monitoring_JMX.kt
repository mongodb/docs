import com.mongodb.kotlin.client.MongoClient
import org.bson.Document
import com.mongodb.MongoClientSettings
import com.mongodb.ConnectionString
import com.mongodb.management.JMXConnectionPoolListener

fun main() {
    val uri = "<connection string uri>"

// Instantiate your JMX listener
    val connectionPoolListener = JMXConnectionPoolListener()

// Include the listener in your client settings
    val settings = MongoClientSettings.builder()
        .applyConnectionString(ConnectionString(uri))
        .applyToConnectionPoolSettings {
            it.addConnectionPoolListener(connectionPoolListener)
        }
        .build()

    try {
// Connect to your database
        val mongoClient = MongoClient.create(settings)
        val database = mongoClient.getDatabase("sample_mflix")
        val collection = database.getCollection<Document>("movies")
        collection.find().firstOrNull()
        collection.find().firstOrNull()
        println("Navigate to JConsole to see your connection pools...")

// Pause execution
        Thread.sleep(Long.MAX_VALUE)
        mongoClient.close()
    } catch (e: Exception) {
        e.printStackTrace()
    }
}