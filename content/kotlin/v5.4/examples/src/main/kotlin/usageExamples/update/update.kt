package usageExamples.update

// :replace-start: {
//    "terms": {
//       "CONNECTION_URI_PLACEHOLDER": "\"<connection string uri>\"",
//       "import io.github.cdimascio.dotenv.dotenv\n": ""
//    }
// }
// :snippet-start: update-usage-example
import com.mongodb.MongoException
import com.mongodb.client.model.Filters
import com.mongodb.client.model.UpdateOptions
import com.mongodb.client.model.Updates
import com.mongodb.kotlin.client.coroutine.MongoClient
import io.github.cdimascio.dotenv.dotenv
import kotlinx.coroutines.runBlocking
import java.time.LocalDateTime

data class Movie(
    val title: String,
    val runtime: Int,
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

    collection.insertOne(Movie("Cool Runnings 2", 90, listOf("Adventure", "Family", "Comedy"), LocalDateTime.now())) // :remove:
    val query = Filters.eq(Movie::title.name, "Cool Runnings 2")
    val updates = Updates.combine(
        Updates.set(Movie::runtime.name, 99),
        Updates.addToSet(Movie::genres.name, "Sports"),
        Updates.currentDate(Movie::lastUpdated.name)
    )
    val options = UpdateOptions().upsert(true)
    try {
        val result = collection.updateOne(query, updates, options)
        println("Modified document count: " + result.modifiedCount)
        println("Upserted id: " + result.upsertedId) // only contains a non-null value when an upsert is performed
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