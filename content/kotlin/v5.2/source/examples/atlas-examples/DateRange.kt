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
                "range", Document("path", "released")
                    .append("gt", Date.from(Instant.parse("2015-01-01T00:00:00.000Z")))
                    .append("lt", Date.from(Instant.parse("2015-12-31T00:00:00.000Z")))
            )
        )

        val shouldClauses = listOf(
            Document(
                "near",
                Document("pivot", 2629800000L)
                    .append("path", "released")
                    .append("origin", Date.from(Instant.parse("2015-07-01T00:00:00.000+00:00")))
            )
        )

        val agg = Document(
            "\$search",
            Document("index", "date-range-tutorial")
                .append(
                    "compound",
                    Document().append("must", mustClauses)
                        .append("should", shouldClauses)
                )
        )

        val resultsFlow = collection.aggregate<Document>(
            listOf(
                agg,
                limit(6),
                project(fields(
                    excludeId(),
                    include("title", "released", "genres"),
                    computed("score", Document("\$meta", "searchScore"))
                ))
            )
        )

        resultsFlow.collect { println(it) }
    }

    mongoClient.close()
}

