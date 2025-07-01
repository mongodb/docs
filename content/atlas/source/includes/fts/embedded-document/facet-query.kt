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

        // define query
        val agg = Document(
            "\$searchMeta",
                Document("index", "embedded-documents-tutorial")
                .append("facet",
                    Document(
                        "operator",
                        Document(
                            "text",
                            Document("path", "name")
                                .append("query", "High")
                        )
                    )
                    .append(
                        "facets",
                        Document(
                            "gradeFacet",
                            Document("type", "string").append("path", "teachers.classes.grade")
                        )
                    )
            )
        )

        // run query and print results
        val resultsFlow = collection.aggregate<Document>(listOf(agg))
        resultsFlow.collect { println(it) }
    }
    mongoClient.close()
}
