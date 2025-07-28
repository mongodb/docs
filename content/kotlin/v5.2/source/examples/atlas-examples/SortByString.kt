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
        val shouldClause = listOf(
            Document("wildcard", Document("query", "Prance*")
                .append("path", "title")
                .append("allowAnalyzedField", true)),
            Document("wildcard", Document("query", "Prince*")
                .append("path", "title")
                .append("allowAnalyzedField", true))
        )

        val agg = Document(
            "\$search",
            Document("index", "sort-tutorial")
                .append(
                    "compound",
                    Document("should", shouldClause)
                )
                .append("sort", Document("title", 1L))
        )

        val resultsFlow = collection.aggregate<Document>(
            listOf(
                agg,
                limit(5),
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

