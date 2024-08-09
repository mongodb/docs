import com.mongodb.ConnectionString
import com.mongodb.MongoClientSettings
import com.mongodb.client.model.Accumulators
import com.mongodb.client.model.Aggregates
import com.mongodb.client.model.Filters
import com.mongodb.kotlin.client.MongoClient
import org.bson.Document

// start-data-class
data class Restaurant(
    val name: String,
    val cuisine: String,
    val borough: String
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

    // start-aggregation-pipeline
    val pipeline = listOf(
        Aggregates.match(Filters.eq(Restaurant::cuisine.name, "Bakery")),
        Aggregates.group("\$borough", Accumulators.sum("count", 1))
    )

    val results = collection.aggregate<Document>(pipeline)

    results.forEach { result ->
        println(result)
    }
    // end-aggregation-pipeline

    // start-aggregation-explain
    print(collection.aggregate(pipeline).explain())
    // end-aggregation-explain
}

