import com.mongodb.kotlin.client.MongoClient
import org.bson.Document
import com.mongodb.event.*
import com.mongodb.MongoClientSettings
import com.mongodb.ConnectionString

class IsWriteable : ClusterListener {
    private var isWritable = false

    override fun clusterDescriptionChanged(event: ClusterDescriptionChangedEvent) {
        if (!isWritable) {
            if (event.newDescription.hasWritableServer()) {
                isWritable = true
                println("Able to write to cluster")
            }
        } else {
            if (!event.newDescription.hasWritableServer()) {
                isWritable = false
                println("Unable to write to cluster")
            }
        }
    }
}


fun main() {
    val uri = "<connection string uri>"

// Instantiate your new listener
    val clusterListener = IsWriteable()

// Include the listener in your client settings
    val settings = MongoClientSettings.builder()
        .applyConnectionString(ConnectionString(uri))
        .applyToClusterSettings { builder ->
            builder.addClusterListener(clusterListener)
        }
        .build()

// Connect to your database
    val mongoClient = MongoClient.create(settings)
    val database = mongoClient.getDatabase("sample_mflix")
    val collection = database.getCollection<Document>("movies")

// Run a command to trigger a ClusterDescriptionChangedEvent event
    collection.find().firstOrNull()

    mongoClient.close()
}