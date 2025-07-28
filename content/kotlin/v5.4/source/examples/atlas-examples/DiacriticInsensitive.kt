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
        val mustClauses = listOf(
            Document(
                "wildcard",
                Document("path", "title")
                    .append("query", "alle*")
                    .append("allowAnalyzedField", true)
            )
        )

        val shouldClauses = listOf(
            Document(
                "text",
                Document("query", "Drama")
                    .append("path", "genres")
            )
        )

        val agg = Document( "\$search",
            Document("index", "diacritic-insensitive-tutorial")
                .append("compound", Document("must", mustClauses)
                    .append("should", shouldClauses)
                )
        )

        val resultsFlow = collection.aggregate<Document>(
            listOf(
                agg,
                project(fields(
                    excludeId(),
                    include("title", "genres"),
                    computed("score", Document("\$meta", "searchScore"))))
            )
        )

        resultsFlow.collect { println(it) }
    }

    mongoClient.close()
}

