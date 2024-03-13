import com.mongodb.client.model.Aggregates.limit
import com.mongodb.client.model.Aggregates.project
import com.mongodb.client.model.Filters.eq
import com.mongodb.client.model.Projections.*
import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.runBlocking
import org.bson.Document

fun main() {
    // establish connection and set namespace
    val uri = "<connection-string>"
    val mongoClient = MongoClient.create(uri)
    val database = mongoClient.getDatabase("sample_mflix")
    val collection = database.getCollection<Document>("movies")

    runBlocking {
        // define query
        val agg = Document(
            "must", listOf(
                Document("text", Document("query", listOf("Hawaii", "Alaska"))
                    .append("path", "plot")),
                Document(
                    "regex",
                    Document("query", "([0-9]{4})")
                        .append("path", "plot")
                        .append("allowAnalyzedField", true)
                )
            )
        )
            .append(
                "mustNot", listOf(
                    Document("text", Document("query", listOf("Comedy", "Romance"))
                        .append("path", "genres")),
                    Document("text", Document("query", listOf("Beach", "Snow"))
                        .append("path", "title"))
                )
            )

        // run query and print results
        val resultsFlow = collection.aggregate<Document>(
            listOf(
                eq("\$search", eq("compound", agg)),
                project(fields(
                    excludeId(),
                    include("title", "plot", "genres")
                ))
            )
        )
        resultsFlow.collect { println(it) }
    }
    mongoClient.close()
}
