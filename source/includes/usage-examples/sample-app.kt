import com.mongodb.ConnectionString
import com.mongodb.MongoClientSettings
import com.mongodb.kotlin.client.*
import com.mongodb.client.model.Filters.*
import org.bson.Document

fun main() {
    val uri = "<connection string URI>"
    
    val settings = MongoClientSettings.builder()
        .applyConnectionString(ConnectionString(uri))
        .retryWrites(true)
        .build()

    // Create a new client and connect to the server
    val mongoClient = MongoClient.create(settings)
    val database = mongoClient.getDatabase("<database name>")
    val collection = database.getCollection<Document>("<collection name>")

    // Start example code here

    // End example code here
}
