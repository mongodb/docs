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
            Document(
                "should", listOf(
                    Document(
                        "autocomplete",
                        Document("path", "title")
                            .append("query", "inter")
                    ),
                    Document(
                        "text",
                        Document("path", "plot")
                            .append("query", "inter")
                    )
                )
            ).append("minimumShouldMatch", 1L)
        )

        val resultsFlow = collection.aggregate<Document>(
            listOf(
                eq("\$search", eq("compound", agg)),
                limit(10),
                project(fields(excludeId(), include("title", "plot")))
            )
        )
        resultsFlow.collect { println(it) }
    }
    mongoClient.close()
}