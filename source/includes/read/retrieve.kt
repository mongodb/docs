import com.mongodb.ConnectionString
import com.mongodb.MongoClientSettings
import com.mongodb.kotlin.client.*
import com.mongodb.client.model.Filters.*

// start-data-class
data class Restaurant(
    val name: String,
    val cuisine: String
)
// end-data-class

fun main() {
    val uri = "<connection string URI>"
    
    val settings = MongoClientSettings.builder()
        .applyConnectionString(ConnectionString(uri))
        .retryWrites(true)
        .build()

    val mongoClient = MongoClient.create(settings)
    val database = mongoClient.getDatabase("sample_restaurants")
    val collection = database.getCollection<Restaurant>("restaurants")

    // start-find
    val results = collection.find(eq(Restaurant::cuisine.name, "Spanish"))
    // end-find

    // start-find-iterate
    val results = collection.find(eq(Restaurant::cuisine.name, "Spanish"))
    results.forEach { result ->
        println(result)
    }
    // end-find-iterate

    // start-find-all
    val results = collection.find()
    // end-find-all

    // start-modified-find
    val results = collection
        .find(eq(Restaurant::cuisine.name, "Spanish"))
        .limit(10)
    // end-modified-find
}
