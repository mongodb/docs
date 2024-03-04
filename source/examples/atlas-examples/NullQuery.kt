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

        val resultsFlow = collection.aggregate<Document>(
            listOf(agg)
        )

        resultsFlow.collect { println(it) }
    }

    mongoClient.close()
}

