import com.mongodb.client.model.Aggregates.limit
import com.mongodb.client.model.Aggregates.project
import com.mongodb.client.model.Projections.*
import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.runBlocking
import org.bson.Document

fun main() {
    // establish connection and set namespace
    val uri = "<connection-string>"
    val mongoClient = MongoClient.create(uri)
    val database = mongoClient.getDatabase("sample_mflix")
    val collection = database.getCollection<Document>("movies")

    runBlocking {
        // define clauses
        val mustClause = listOf(
            Document("text",
                Document("query", "ghost")
                    .append("path", listOf("plot","title"))
            )
        )

        val mustNotClauseAndFilterClause = listOf(
            Document("text",
                Document("query", "Comedy")
                    .append("path", listOf("genres"))
            )
        )

        val compound1 = Document("must", mustClause)
            .append("mustNot", mustNotClauseAndFilterClause)

        val compound2 = Document("must", mustClause)
            .append("filter", mustNotClauseAndFilterClause)
            .append("score",
                Document("boost",
                    Document("value", 0.5)
                )
            )

        val agg = Document("\$search",
            Document("index", "compound-query-custom-score-tutorial")
                .append("compound", Document("should", listOf(
                    Document("compound", compound1),
                    Document("compound", compound2)
                )))
        )

        val resultsFlow = collection.aggregate<Document>(
            listOf(
                agg,
                limit(10),
                project(fields(
                    include("title", "plot", "genres"),
                    computed("score", Document("\$meta", "searchScore"))
                ))
            )
        )
        resultsFlow.collect { println(it) }
    }
    mongoClient.close()
}