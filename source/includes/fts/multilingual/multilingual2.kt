import com.mongodb.client.model.Aggregates.project
import com.mongodb.client.model.Projections.*
import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.runBlocking
import org.bson.Document
import java.time.Instant
import java.util.*

fun main() {
    // establish connection and set namespace
    val uri = "<connection-string>"
    val mongoClient = MongoClient.create(uri)
    
    val database = mongoClient.getDatabase("sample_mflix")
    val collection = database.getCollection<Document>("movies")

    runBlocking {
        // define clauses
        val mustClauses = listOf(
            Document(
                "text",
                Document("path", Document("value", "fullplot")
                    .append("multi", "fullplot_english"))
                    .append("query", "Bella")
            )
        )

        val mustNotClauses = listOf(
            Document(
                "range", Document("path", "released")
                    .append("gt", Date.from(Instant.parse("1984-01-01T00:00:00.000Z")))
                    .append("lt", Date.from(Instant.parse("2016-01-01T00:00:00.000Z")))
            )
        )

        val shouldClauses = listOf(
            Document(
                "text",
                Document("query", "Comedy")
                    .append("path", "genres")
            )
        )

        // define query
        val agg = Document(
            "\$search", Document( "index", "multilingual-tutorial")
            .append("compound",
                Document().append("must", mustClauses)
                    .append("mustNot", mustNotClauses)
                    .append("should", shouldClauses)
            )
        )

        // run query and print results
        val resultsFlow = collection.aggregate<Document>(
            listOf(
                agg,
                project(fields(
                    excludeId(),
                    include("title", "fullplot", "released", "genres"),
                    computed("score", Document("\$meta", "searchScore"))
                ))
            )
        )
        resultsFlow.collect { println(it) }
    }
    mongoClient.close()
}