import com.mongodb.client.model.Aggregates.limit
import com.mongodb.client.model.Aggregates.project
import com.mongodb.client.model.Projections.*
import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.runBlocking
import org.bson.Document
import java.time.Instant
import java.util.*

fun main() {
    val uri = "<connection string>"

    val mongoClient = MongoClient.create(uri)
    val database = mongoClient.getDatabase("sample_mflix")
    val collection = database.getCollection<Document>("movies")

    runBlocking {
        val mustClauses = listOf(
            Document(
                "text", Document("path", "fullplot")
                    .append("query", "coppia")
            )
        )

        val mustNotClauses = listOf(
                Document(
                    "range",
                    Document("path", "released")
                        .append("gt", Date.from(Instant.parse("2000-01-01T00:00:00.000Z")))
                        .append("lt", Date.from(Instant.parse("2009-01-01T00:00:00.000Z")))
                )
        )

        val shouldClauses = listOf(
            Document(
                "text",
                Document("query", "Drama")
                    .append("path", "genres")
            )
        )

        val agg = Document(
            "\$search",
            Document("index", "multilingual-tutorial")
                .append(
                    "compound",
                    Document().append("must", mustClauses)
                        .append("mustNot", mustNotClauses)
                        .append("should", shouldClauses)
                )
        )

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