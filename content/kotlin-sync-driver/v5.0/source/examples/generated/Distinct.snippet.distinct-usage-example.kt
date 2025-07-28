import com.mongodb.MongoException
import com.mongodb.client.model.Filters
import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.runBlocking

data class Movie(val year: Int, val directors: List<String>)

fun main() = runBlocking {
    // Replace the uri string with your MongoDB deployment's connection string
    val uri = "<connection string uri>"
    val mongoClient = MongoClient.create(uri)
    val database = mongoClient.getDatabase("sample_mflix")
    val collection = database.getCollection<Movie>("movies")

    try {
        val resultsFlow = collection.distinct<Int>(
            Movie::year.name, Filters.eq(Movie::directors.name, "Carl Franklin")
        )
        resultsFlow.collect { println(it) }
    } catch (e: MongoException) {
        System.err.println("An error occurred: $e")
    }

    mongoClient.close()
}
