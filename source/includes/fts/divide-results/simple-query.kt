import com.mongodb.client.model.Aggregates.*
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
        // define pipeline
        val agg = Document(
            "\$search", Document("index", "pagination-tutorial")
                .append("text", Document("query", "tom hanks").append("path", "cast"))
        )

        // run pipeline and print results
        val resultsFlow = collection.aggregate<Document>(
            listOf(
                agg,
                skip(10),
                limit(10),
                project(fields(
                    excludeId(),
                    include("title","cast")
                ))
            )
        )
        resultsFlow.collect { println(it) }
    }
    mongoClient.close()
}