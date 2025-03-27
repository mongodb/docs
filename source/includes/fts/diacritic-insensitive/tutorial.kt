import com.mongodb.client.model.Aggregates.project
import com.mongodb.client.model.Projections.*
import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.runBlocking
import org.bson.Document

fun main() {
    // connect to your Atlas cluster
    val uri = "<connection-string>"
    val mongoClient = MongoClient.create(uri)

    // set namespace
    val database = mongoClient.getDatabase("sample_mflix")
    val collection = database.getCollection<Document>("movies")

    runBlocking {
        // define clauses
        val mustClauses = listOf(
            Document(
                "wildcard",
                Document("path", "title")
                    .append("query", "allè*")
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

        // define pipeline
        val agg = Document( "\$search",
            Document("index", "diacritic-insensitive-tutorial")
                .append("compound", Document("must", mustClauses)
                    .append("should", shouldClauses)
                )
        )

        // run pipeline and print results
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
