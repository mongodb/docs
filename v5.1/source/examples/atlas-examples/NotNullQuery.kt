import com.mongodb.client.model.Aggregates.limit
import com.mongodb.client.model.Aggregates.project
import com.mongodb.client.model.Projections.*
import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.runBlocking
import org.bson.Document

fun main() {
    val uri = "<connection string>"

    val mongoClient = MongoClient.create(uri)
    val database = mongoClient.getDatabase("sample_mflix")
    val collection = database.getCollection<Document>("users")

    runBlocking {
        val agg = Document(
            "\$search",
            Document("index", "null-check-tutorial")
                .append(
                    "compound",
                    Document(
                        "should", listOf(
                            Document(
                                "wildcard",
                                Document("path", "password")
                                    .append("query", "*")
                                    .append("allowAnalyzedField", true)
                            ),
                            Document(
                                "compound",
                                Document(
                                    "mustNot",
                                    Document(
                                        "exists",
                                        Document("path", "password")
                                    )
                                )
                                    .append(
                                        "score",
                                        Document(
                                            "constant",
                                            Document("value", 2L)
                                        )
                                    )
                            )
                        )
                    )
                )
        )

        val resultsFlow = collection.aggregate<Document>(
            listOf(
                agg,
                limit(5),
                project(fields(
                    excludeId(),
                    include("name", "password"),
                    computed("score", Document("\$meta", "searchScore"))))
            )
        )

        resultsFlow.collect { println(it) }
    }

    mongoClient.close()
}

