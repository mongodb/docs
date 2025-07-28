import com.mongodb.MongoException
import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.runBlocking

data class Movie(val title: String)

fun main() = runBlocking {
    // Replace the uri string with your MongoDB deployment's connection string
    val uri = "<connection string uri>"
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
    mongoClient.close()
}
