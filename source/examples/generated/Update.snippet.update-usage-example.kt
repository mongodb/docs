import com.mongodb.MongoException
import com.mongodb.client.model.Filters
import com.mongodb.client.model.UpdateOptions
import com.mongodb.client.model.Updates
import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.runBlocking
import java.time.LocalDateTime

data class Movie(
    val title: String,
    val runtime: Int,
    val genres: List<String>,
    val lastUpdated: LocalDateTime
)

fun main() = runBlocking {
    // Replace the uri string with your MongoDB deployment's connection string
    val uri = "<connection string uri>"
    val mongoClient = MongoClient.create(uri)
    val database = mongoClient.getDatabase("sample_mflix")
    val collection = database.getCollection<Movie>("movies")

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
    mongoClient.close()
}
