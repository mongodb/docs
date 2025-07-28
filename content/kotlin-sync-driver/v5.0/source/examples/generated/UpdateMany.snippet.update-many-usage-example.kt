import com.mongodb.MongoException
import com.mongodb.client.model.Filters
import com.mongodb.client.model.Updates
import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.runBlocking
import java.time.LocalDateTime

data class Movie(
    val num_mflix_comments: Int,
    val genres: List<String>,
    val lastUpdated: LocalDateTime
)

fun main() = runBlocking {
    // Replace the uri string with your MongoDB deployment's connection string
    val uri = "<connection string uri>"
    val mongoClient = MongoClient.create(uri)
    val database = mongoClient.getDatabase("sample_mflix")
    val collection = database.getCollection<Movie>("movies")

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
    mongoClient.close()
}
