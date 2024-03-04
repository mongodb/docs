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
            Document("index", "autocomplete-tutorial")
                .append(
                    "compound",
                    Document(
                        "should", listOf(
                            Document(
                                "autocomplete",
                                Document("query", "pri")
                                    .append("path", "title")
                            ),
                            Document(
                                "autocomplete",
                                Document("query", "pri")
                                    .append("path", "plot")
                            )
                        )
                    )
                        .append("minimumShouldMatch", 1L)
                )
        )

        val resultsFlow = collection.aggregate<Document>(
            listOf(
                agg,
                limit(5),
                project(fields(excludeId(), include("title")))
            )
        )

        resultsFlow.collect { println(it) }
    }

    mongoClient.close()
}

