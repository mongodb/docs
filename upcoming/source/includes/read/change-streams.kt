import com.mongodb.ConnectionString
import com.mongodb.MongoClientSettings
import com.mongodb.client.model.Aggregates
import com.mongodb.client.model.Filters
import com.mongodb.client.model.Updates
import com.mongodb.client.model.changestream.FullDocument
import com.mongodb.kotlin.client.MongoClient

// start-data-class
data class Restaurant(
    val name: String,
    val cuisine: String,
)
// end-data-class

fun main() {
    val uri = "<connection string URI>"

    val settings = MongoClientSettings.builder()
        .applyConnectionString(ConnectionString(uri))
        .build()

    val mongoClient = MongoClient.create(settings)
    val database = mongoClient.getDatabase("sample_restaurants")
    val collection = database.getCollection<Restaurant>("restaurants")

    // start-open-change-stream
    collection.watch().forEach { change ->
        println(change)
    }
    // end-open-change-stream

    // start-update-for-change-stream
    val filter = Filters.eq(Restaurant::name.name, "Blarney Castle")
    val update = Updates.set(Restaurant::cuisine.name, "Irish")

    val result = collection.updateOne(filter, update)
    // end-update-for-change-stream

    // start-change-stream-pipeline
    val pipeline = listOf(
        Aggregates.match(Filters.eq("operationType", "update"))
    )

    collection.watch(pipeline).forEach { change ->
        println(change)
    }
    // end-change-stream-pipeline

    // start-change-stream-post-image
    collection.watch().fullDocument(FullDocument.UPDATE_LOOKUP).forEach { change ->
        println("Received a change: $change")
    }
    // end-change-stream-post-image
}

