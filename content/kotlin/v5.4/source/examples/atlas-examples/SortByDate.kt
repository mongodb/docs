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
        val agg = Document(
            "\$search",
            Document("index", "sort-tutorial")
                .append(
                    "compound",
                    Document(
                        "filter", listOf(
                            Document(
                                "wildcard",
                                Document("query", "Summer*")
                                    .append("path", "title")
                            )
                        )
                    )
                        .append(
                            "must", listOf(
                                Document(
                                    "near",
                                    Document("pivot", 13149000000L)
                                        .append("path", "released")
                                        .append("origin", Date.from(Instant.parse("2014-04-18T00:00:00.000+00:00")))
                                )
                            )
                        )
                )
                .append("sort", Document("released", -1))
        )

        val resultsFlow = collection.aggregate<Document>(
            listOf(
                agg,
                limit(5),
                project(fields(
                    excludeId(),
                    include("title", "released"),
                    computed("score", Document("\$meta", "searchScore"))
                ))
            )
        )

        resultsFlow.collect { println(it) }
    }

    mongoClient.close()
}

