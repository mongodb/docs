import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.runBlocking
import org.bson.Document
import java.time.Instant
import java.util.*

fun main() {
    // connect to your Atlas cluster
    val uri = "<connection-string>"
    val mongoClient = MongoClient.create(uri)
    
    // set namespace
    val database = mongoClient.getDatabase("sample_mflix")
    val collection = database.getCollection<Document>("movies")

    runBlocking {
        // define pipeline
        val agg = Document(
            "\$searchMeta",
            Document("index", "facet-tutorial")
                .append(
                    "facet",
                    Document(
                        "operator",
                        Document(
                            "near",
                            Document("path", "released")
                                .append("origin", Date.from(Instant.parse("1921-11-01T00:00:00.000+00:00")))
                                .append("pivot", 7776000000L)
                        )
                    )
                        .append(
                            "facets",
                            Document(
                                "genresFacet",
                                Document("type", "string").append("path", "genres")
                            )
                                .append(
                                    "yearFacet",
                                    Document("type", "number").append("path", "year")
                                        .append("boundaries", listOf(1910, 1920, 1930, 1940))
                                )
                        )
                )
        )

        // run pipeline and print results
        val resultsFlow = collection.aggregate<Document>(
            listOf(agg)
        )
        resultsFlow.collect { println(it) }
    }
    mongoClient.close()
}

