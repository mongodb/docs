package usageExamples.updateMany

// :replace-start: {
//    "terms": {
//       "CONNECTION_URI_PLACEHOLDER": "\"<connection string uri>\"",
//       "import io.github.cdimascio.dotenv.dotenv\n": ""
//    }
// }
// :snippet-start: update-many-usage-example
import com.mongodb.MongoException
import com.mongodb.client.model.Filters
import com.mongodb.client.model.Updates
import com.mongodb.kotlin.client.coroutine.MongoClient
import io.github.cdimascio.dotenv.dotenv
import kotlinx.coroutines.runBlocking
import java.time.LocalDateTime

data class Movie(
    val num_mflix_comments: Int,
    val genres: List<String>,
    val lastUpdated: LocalDateTime
)

fun main() = runBlocking {
    // :remove-start:
    val dotenv = dotenv()
    val CONNECTION_URI_PLACEHOLDER = dotenv["MONGODB_CONNECTION_URI"]
    // :remove-end:
    // Replace the uri string with your MongoDB deployment's connection string
    val uri = CONNECTION_URI_PLACEHOLDER
    val mongoClient = MongoClient.create(uri)
    val database = mongoClient.getDatabase("sample_mflix")
    val collection = database.getCollection<Movie>("movies")

    collection.insertOne(Movie(100, listOf("Adventure", "Family", "Comedy"), LocalDateTime.now())) // :remove:
    val query = Filters.gt(Movie::num_mflix_comments.name, 50)
    val updates = Updates.combine(
        Updates.addToSet(Movie::genres.name, "Frequently Discussed"),
        Updates.currentDate(Movie::lastUpdated.name)
    )
    try {
        val result = collection.updateMany(query, updates)
        println("Modified document count: " + result.modifiedCount)
    } catch (e: MongoException) {
        System.err.println("Unable to update due to an error: $e")
    }
    // :remove-start:
    // clean up
    database.drop()
    // :remove-end:
    mongoClient.close()
}
// :snippet-end:
// :replace-end: