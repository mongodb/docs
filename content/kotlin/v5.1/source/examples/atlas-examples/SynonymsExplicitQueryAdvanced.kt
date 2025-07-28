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
    val collection = database.getCollection<Document>("movies")

    runBlocking {
        val agg = Document(
            "\$search",
            Document("index", "synonyms-tutorial")
                .append(
                    "compound",
                    Document(
                        "should", listOf(
                            Document(
                                "text",
                                Document("path", "title")
                                    .append("query", "boat")
                                    .append("synonyms", "transportSynonyms")
                            ),
                            Document(
                                "text",
                                Document("path", "title")
                                    .append("query", "hat")
                                    .append("synonyms", "attireSynonyms")
                            )
                        )
                    )
                )
        )

        val resultsFlow = collection.aggregate<Document>(
            listOf(
                agg,
                limit(10),
                project(fields(
                    excludeId(),
                    include("title"),
                    computed("score", Document("\$meta", "searchScore"))
                ))
            )
        )

        resultsFlow.collect { println(it) }
    }

    mongoClient.close()
}

