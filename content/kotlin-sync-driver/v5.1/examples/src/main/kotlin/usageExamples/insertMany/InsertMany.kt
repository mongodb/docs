package usageExamples.insertMany

// :replace-start: {
//    "terms": {
//       "CONNECTION_URI_PLACEHOLDER": "\"<connection string uri>\"",
//       "import io.github.cdimascio.dotenv.dotenv\n": ""
//    }
// }
// :snippet-start: insert-many-usage-example
import com.mongodb.MongoException
import com.mongodb.kotlin.client.coroutine.MongoClient
import io.github.cdimascio.dotenv.dotenv
import kotlinx.coroutines.runBlocking

data class Movie(val title: String)

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

    val movieList = listOf(
        Movie("Short Circuit 3"),
        Movie("The Lego Frozen Movie")
    )

    try {
        val result = collection.insertMany(movieList)
        println("Success! Inserted document ids: " + result.insertedIds)
    } catch (e: MongoException) {
        System.err.println("Unable to insert due to an error: $e")
    }
    // :remove-start:
    // clean up
    database.drop()
    // :remove-end:
    mongoClient.close()
}
// :snippet-end:
// :replace-end: