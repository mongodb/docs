import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.runBlocking
import org.bson.Document
import java.time.Instant
import java.util.Date

fun main() {
    // Connection URI for your MongoDB Atlas cluster
    val uri = "<connection-string>"
    val mongoClient = MongoClient.create(uri)

    // Set namespace (database and collection)
    val database = mongoClient.getDatabase("sample_mflix")
    val collection = database.getCollection<Document>("movies")

    runBlocking {
        // Define the aggregation pipeline
        val searchStage = Document("\$search", Document("index", "facet-tutorial")
            .append("facet", Document("operator", Document("near", Document("path", "released")
                // Replace +00:00 with Z
                .append("origin", Date.from(Instant.parse("1921-11-01T00:00:00.000Z"))) 
                .append("pivot", 7776000000L)))
                .append("facets", Document("genresFacet", Document("type", "string")
                    .append("path", "genres"))
                    .append("yearFacet", Document("type", "number").append("path", "year")
                        .append("boundaries", listOf(1910, 1920, 1930, 1940))))))

        val facetStage = Document("\$facet", Document("meta", listOf(
            Document("\$replaceWith", "\$\$SEARCH_META"),
            Document("\$limit", 1)
        )))

        val setStage = Document("\$set", Document("meta", Document("\$arrayElemAt", listOf("\$meta", 0))))

        // Run the aggregation pipeline and print results
        val resultsFlow = collection.aggregate<Document>(
            listOf(searchStage, facetStage, setStage)
        )

        resultsFlow.collect { println(it.toJson()) } // Convert each result to JSON and print
    }

    // Close the MongoDB client
    mongoClient.close()
}
