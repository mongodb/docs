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
    val database = mongoClient.getDatabase("local_school_district")
    val collection = database.getCollection<Document>("schools")

    runBlocking {
        // define clauses
        val nestedMustClauses = listOf(
            Document("text", Document("path", "teachers.classes.grade")
                    .append("query", "12th")),
            Document("text", Document("path", "teachers.classes.subject")
                .append("query", "science"))
        )

        val mustClauses = listOf(
            Document(
                "embeddedDocument",
                Document("path", "teachers.classes")
                    .append(
                        "operator", Document(
                            "compound",
                            Document("must", nestedMustClauses)
                        )
                    )
            )
        )

        val shouldClauses = listOf(
            Document(
                "text",
                Document("path", "teachers.last")
                    .append("query", "Smith")
            )
        )

        // define query
        val agg = Document(
            "\$search",
            Document("index", "embedded-documents-tutorial")
                .append(
                    "embeddedDocument",
                    Document("path", "teachers")
                        .append(
                            "operator",
                            Document(
                                "compound",
                                Document("must", mustClauses)
                                    .append("should", shouldClauses)
                            )
                        )
                )
                .append("highlight", Document("path", "teachers.classes.subject"))
        )

        // run query and print results
        val resultsFlow = collection.aggregate<Document>(
            listOf(
                agg,
                limit(5),
                project(fields(
                    excludeId(),
                    include("teachers"),
                    computed("score", Document("\$meta", "searchScore")),
                    computed("highlights", Document("\$meta", "searchHighlights"))
                ))
            )
        )
        resultsFlow.collect { println(it) }
    }
    mongoClient.close()
}