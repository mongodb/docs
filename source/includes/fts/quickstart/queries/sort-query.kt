import com.mongodb.client.model.Aggregates.limit
import com.mongodb.client.model.Aggregates.project
import com.mongodb.client.model.Filters.eq
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
        // define query
        val compoundQuery = Document(
            "must", listOf(
                Document("text", Document("query", "baseball")
                    .append("path", "plot"))
            )
        )
            .append(
                "mustNot", listOf(
                    Document("text", Document("query", listOf("Comedy", "Romance"))
                        .append("path", "genres"))
                )
            )
        
        // sort configuration
        val sortConfig = Document("released", -1)

        // run query and print results
        val resultsFlow = collection.aggregate<Document>(
            listOf(
                Document("\$search", Document("compound", compoundQuery).append("sort", sortConfig)),
                limit(3),
                project(fields(
                    excludeId(),
                    include("title", "plot", "genres", "released")
                ))
            )
        )
        resultsFlow.collect { println(it) }
    }
    mongoClient.close()
}
