import com.mongodb.client.model.Aggregates.limit
import com.mongodb.client.model.Aggregates.project
import com.mongodb.client.model.Filters.eq
import com.mongodb.client.model.Projections.*
import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.runBlocking
import org.bson.Document

fun main() {
    val uri = "<connection-string>"
    val mongoClient = MongoClient.create(uri)
    val database = mongoClient.getDatabase("sample_mflix")
    val collection = database.getCollection<Document>("movies")

    runBlocking {
        val agg = Document(
            "\$searchMeta", Document(
                "facet",
                Document(
                    "operator",
                    Document(
                        "autocomplete",
                        Document("path", "title")
                            .append("query", "Gravity")
                    )
                )
                    .append(
                        "facets",
                        Document(
                            "titleFacet",
                            Document("type", "string").append("path", "title")
                        )
                    )
            )
        )

        val resultsFlow = collection.aggregate<Document>(listOf(agg))
        resultsFlow.collect { println(it) }
    }
    mongoClient.close()
}