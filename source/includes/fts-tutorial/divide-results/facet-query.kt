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
        // define pipeline
        val searchStage = Document(
            "\$search", Document("index", "pagination-tutorial")
                .append("text", Document("query", "tom hanks").append("path", "cast"))
        )

        val projectStage = Document(
            "\$project",
            Document("_id", 0)
                .append("title", 1)
                .append("cast", 1)
        )

        val setStage1 = Document(
            "\$set", Document(
                "score",
                Document("\$meta", "searchScore")
            )
        )

        val facetStage = Document(
            "\$facet",
            Document(
                "rows", listOf(
                    Document("\$skip", 10),
                    Document("\$limit", 10)
                )
            )
                .append(
                    "totalRows", listOf(
                        Document("\$replaceWith", "$\$SEARCH_META"),
                        Document("\$limit", 1)
                    )
                )
        )

        val setStage2 = Document(
            "\$set", Document(
                "totalRows",
                Document("\$arrayElemAt", listOf("\$totalRows", 0))
            )
        )

        // run pipeline and print results
        val resultsFlow = collection.aggregate<Document>(
            listOf(
                searchStage,
                projectStage,
                setStage1,
                facetStage,
                setStage2
            )
        )
        resultsFlow.collect { println(it) }
    }
    mongoClient.close()
}