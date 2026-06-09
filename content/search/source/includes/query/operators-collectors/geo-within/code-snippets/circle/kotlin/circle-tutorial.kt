import com.mongodb.client.model.Aggregates.limit
import com.mongodb.client.model.Aggregates.project
import com.mongodb.client.model.Projections.*
import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.runBlocking
import org.bson.Document

fun main() {
    // establish connection and set namespace
    val uri = "<connection-string>"
    val mongoClient = MongoClient.create(uri)
    val database = mongoClient.getDatabase("sample_airbnb")
    val collection = database.getCollection<Document>("listingsAndReviews")

    runBlocking {
        // define query
        val agg = Document(
            "\$search",
            Document("geoWithin",
                Document("circle",
                    Document("center",
                        Document("type", "Point")
                            .append("coordinates", listOf(-73.54, 45.54)))
                    .append("radius", 1600))
                .append("path", "address.location"))
        )

        // run query and print results
        val resultsFlow = collection.aggregate<Document>(
            listOf(
                agg,
                limit(3),
                project(fields(excludeId(), include("name", "address")))
            )
        )
        resultsFlow.collect { println(it) }
    }
    mongoClient.close()
}
