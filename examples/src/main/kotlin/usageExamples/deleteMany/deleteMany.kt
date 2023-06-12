package usageExamples.deleteMany

// :replace-start: {
//    "terms": {
//       "CONNECTION_URI_PLACEHOLDER": "\"<connection string uri>\"",
//       "import io.github.cdimascio.dotenv.dotenv\n": ""
//    }
// }
// :snippet-start: delete-many-usage-example

import com.mongodb.MongoException
import com.mongodb.client.model.Filters
import com.mongodb.kotlin.client.coroutine.MongoClient
import io.github.cdimascio.dotenv.dotenv
import kotlinx.coroutines.runBlocking

data class Movie(val imdb: IMDB){
    data class IMDB(val rating: Double)
}

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

    collection.insertMany(listOf(Movie(Movie.IMDB(rating = 2.1)), Movie(Movie.IMDB(rating = 2.5)), Movie(Movie.IMDB(rating = 1.9)), Movie(Movie.IMDB(rating = 1.5)))) // :remove:
    val query = Filters.lt("${Movie::imdb.name}.${Movie.IMDB::rating.name}", 2.9)
    try {
        val result = collection.deleteMany(query)
        println("Deleted document count: " + result.deletedCount)
    } catch (e: MongoException) {
        System.err.println("Unable to delete due to an error: $e")
    }
    // :remove-start:
    // clean up
    database.drop()
    // :remove-end:
    mongoClient.close()
}
// :snippet-end:
// :replace-end: