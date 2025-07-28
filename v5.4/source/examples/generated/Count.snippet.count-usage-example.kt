
import com.mongodb.MongoException
import com.mongodb.client.model.Filters
import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.runBlocking


data class Movie(val countries: List<String>)

fun main() = runBlocking {
    // Replace the uri string with your MongoDB deployment's connection string
    val uri = "<connection string uri>"
    val mongoClient = MongoClient.create(uri)
    val database = mongoClient.getDatabase("sample_mflix")
    val collection = database.getCollection<Movie>("movies")


    val query = Filters.eq(Movie::countries.name, "Spain")
    try {
        val estimatedCount = collection.estimatedDocumentCount()
        println("Estimated number of documents in the movies collection: $estimatedCount")
        val matchingCount = collection.countDocuments(query)
        println("Number of movies from Spain: $matchingCount")
    } catch (e: MongoException) {
        System.err.println("An error occurred: $e")
    }

    mongoClient.close()
}
