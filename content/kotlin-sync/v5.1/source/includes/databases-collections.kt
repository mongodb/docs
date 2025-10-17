import com.mongodb.ConnectionString
import com.mongodb.MongoClientSettings
import com.mongodb.kotlin.client.MongoClient
import org.bson.Document
import org.bson.json.JsonWriterSettings

fun main() {
    val uri = "<connection string URI>"
    
    val settings = MongoClientSettings.builder()
        .applyConnectionString(ConnectionString(uri))
        .retryWrites(true)
        .build()

    val client = MongoClient.create(settings)

    // Accesses the "test_database" database
    // start-access-database
    val db = client.getDatabase("test_database")
    // end-access-database

    // Accesses the "test_collection" collection
    // start-access-collection
    val collection = db.getCollection("test_collection")
    // end-access-collection

    // Explicitly creates the "example_collection" collection
    // start-create-collection
    db.createCollection("example_collection")
    // end-create-collection

    // Lists the collections in the "test_database" database
    // start-find-collections
    val results = db.listCollections()
    val jsonSettings = JsonWriterSettings.builder().indent(true).build()

    results.forEach { result ->
        println(result.toJson(jsonSettings))
    }
    // end-find-collections


    // Deletes the "test_collection" collection
    // start-drop-collection
    db.getCollection("test_collection").drop()
    // end-drop-collection
    
    // Deletes the "test_database" database
    // start-delete-database
    client.getDatabase("test_database").drop()
    // end-delete-database
}
