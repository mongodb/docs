import com.mongodb.client.model.Aggregates.limit
import com.mongodb.client.model.Aggregates.project
import com.mongodb.client.model.Filters.eq
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
        val agg = Document("query", "baseball").append("path","plot")

        val resultsFlow = collection.aggregate<Document>(
            listOf(
                eq("\$search", eq("text", agg)),
                limit(5),
                project(fields(excludeId(), include("title", "plot")))
            )
        )

        resultsFlow.collect { println(it) }
    }

    mongoClient.close()
}

