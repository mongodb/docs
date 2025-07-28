import com.mongodb.client.model.Aggregates.limit
import com.mongodb.client.model.Aggregates.project
import com.mongodb.client.model.Projections.*
import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.runBlocking
import org.bson.Document

fun main() {
    val uri = "<connection string>"

    val mongoClient = MongoClient.create(uri)
    val database = mongoClient.getDatabase("local_school_district")
    val collection = database.getCollection<Document>("schools")

    runBlocking {
        val agg = Document(
            "\$search",
            Document("index", "embedded-documents-tutorial")
                .append("embeddedDocument", Document("path", "clubs.sports")
                    .append(
                        "operator",
                        Document(
                            "queryString",
                            Document("defaultPath", "clubs.sports.club_name")
                                .append("query", "dodgeball OR frisbee")
                        )
                    )
            )
        )

        val resultsFlow = collection.aggregate<Document>(
            listOf(
                agg,
                limit(5),
                project(
                    fields(
                        include("name", "clubs.sports"),
                        computed("score", Document("\$meta", "searchScore"))
                    )
                )
            )
        )

        resultsFlow.collect { println(it) }
    }

    mongoClient.close()
}

