package usageExamples.count
// :replace-start: {
//    "terms": {
//       "CONNECTION_URI_PLACEHOLDER": "\"<connection string uri>\"",
//       "import io.github.cdimascio.dotenv.dotenv\n": ""
//    }
// }
// :snippet-start: count-usage-example

import com.mongodb.MongoException
import com.mongodb.client.model.Filters
import com.mongodb.kotlin.client.coroutine.MongoClient
import io.github.cdimascio.dotenv.dotenv
import kotlinx.coroutines.runBlocking


data class Movie(val countries: List<String>)

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


    collection.insertOne(Movie(listOf("Spain", "USA"))) // :remove:
    val query = Filters.eq(Movie::countries.name, "Spain")
    try {
        val estimatedCount = collection.estimatedDocumentCount()
        println("Estimated number of documents in the movies collection: $estimatedCount")
        val matchingCount = collection.countDocuments(query)
        println("Number of movies from Spain: $matchingCount")
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