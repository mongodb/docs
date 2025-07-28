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
        val mustClauses = listOf(
            Document(
                "range", Document("path", "year")
                    .append("gte", 2013)
                    .append("lte", 2015)
            )
        )

        val shouldClauses = listOf(
            Document("text", Document("query", "snow")
                .append("path", "title")
                .append("score",
                    Document("function", Document("add", listOf(
                        Document("path", Document("value", "imdb.rating").append("undefined", 2)),
                        Document("score", "relevance")
                    )))
                )
            )
        )

        val highlightOption = Document("path", "title")

        val agg = Document(
            "\$search",
            Document("index", "compound-query-custom-score-tutorial")
                .append(
                    "compound",
                    Document("must", mustClauses).append("should", shouldClauses)
                )
                .append("highlight", highlightOption)
        )

        val resultsFlow = collection.aggregate<Document>(
            listOf(
                agg,
                limit(10),
                project(fields(
                    excludeId(),
                    include("title", "year"),
                    computed("score", Document("\$meta", "searchScore")),
                    computed("highlights", Document("\$meta", "searchHighlights"))
                ))
            )
        )

        resultsFlow.collect { println(it) }
    }

    mongoClient.close()
}