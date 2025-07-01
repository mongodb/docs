import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.runBlocking
import org.bson.Document

fun main() {
    // connect to your Atlas cluster
    val uri = "<connection-string>"
    val mongoClient = MongoClient.create(uri)

    // set namespace
    val database = mongoClient.getDatabase("sample_mflix")
    val collection = database.getCollection<Document>("users")

    runBlocking {
        // define pipeline
        val agg = Document(
            "\$search",
            Document("index", "null-check-tutorial")
                .append(
                    "compound",
                    Document(
                        "must",
                        Document(
                            "exists",
                            Document("path", "password")
                        )
                    )
                        .append(
                            "mustNot",
                            Document(
                                "wildcard",
                                Document("path", "password")
                                    .append("query", "*")
                                    .append("allowAnalyzedField", true)
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
