package usageExamples.distinct

// :replace-start: {
//    "terms": {
//       "CONNECTION_URI_PLACEHOLDER": "\"<connection string uri>\"",
//       "import io.github.cdimascio.dotenv.dotenv\n": ""
//    }
// }
// :snippet-start: distinct-usage-example
import com.mongodb.MongoException
import com.mongodb.client.model.Filters
import com.mongodb.kotlin.client.coroutine.MongoClient
import io.github.cdimascio.dotenv.dotenv
import kotlinx.coroutines.runBlocking

data class Movie(val year: Int, val directors: List<String>)

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

    collection.insertMany(listOf(Movie(1992,listOf("Carl Franklin")), Movie(1995,listOf("Carl Franklin")), Movie(1998,listOf("Carl Franklin"))))// :remove:
    try {
        val resultsFlow = collection.distinct<Int>(
            Movie::year.name, Filters.eq(Movie::directors.name, "Carl Franklin")
        )
        resultsFlow.collect { println(it) }
    } catch (e: MongoException) {
        System.err.println("An error occurred: $e")
    }

    // :remove-start:
    // clean up
    database.drop()
    // :remove-end:
    mongoClient.close()
}
// :snippet-end:
// :replace-end: