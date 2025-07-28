import com.mongodb.MongoException
import com.mongodb.client.model.Filters
import com.mongodb.client.model.ReplaceOptions
import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.runBlocking

data class Movie(val title: String, val fullplot: String)

fun main() = runBlocking {
    // Replace the uri string with your MongoDB deployment's connection string
    val uri = "<connection string uri>"
    val mongoClient = MongoClient.create(uri)
    val database = mongoClient.getDatabase("sample_mflix")
    val collection = database.getCollection<Movie>("movies")

    try {
        val query = Filters.eq("title", "Music of the Heart")
        val replaceDocument = Movie( "50 Violins", " A dramatization of the true story of Roberta Guaspari who co-founded the Opus 118 Harlem School of Music")
        val options = ReplaceOptions().upsert(true)
        val result = collection.replaceOne(query, replaceDocument, options)
        println("Modified document count: " + result.modifiedCount)
        println("Upserted id: " + result.upsertedId) // only contains a non-null value when an upsert is performed
    } catch (e: MongoException) {
        System.err.println("Unable to replace due to an error: $e")
    }
    mongoClient.close()
}
