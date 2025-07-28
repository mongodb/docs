package usageExamples.find

// :replace-start: {
//    "terms": {
//       "CONNECTION_URI_PLACEHOLDER": "\"<connection string uri>\"",
//       "import io.github.cdimascio.dotenv.dotenv\n": ""
//    }
// }
// :snippet-start: find-usage-example
import com.mongodb.client.model.Filters.lt
import com.mongodb.client.model.Projections
import com.mongodb.client.model.Sorts
import com.mongodb.kotlin.client.coroutine.MongoClient
import io.github.cdimascio.dotenv.dotenv
import kotlinx.coroutines.runBlocking

data class Movie(val title: String, val runtime: Int, val imdb: IMDB){
    data class IMDB(val rating: Double)
}

data class Results(val title: String)

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
    // :remove-start:
    val movies = listOf(Movie("A Movie", 10, Movie.IMDB(8.5)), Movie("Movie 2", 10, Movie.IMDB(6.9)), Movie("Long Movie", 55, Movie.IMDB(8.0)), Movie("Z Movie", 10, Movie.IMDB(8.6)))
    collection.insertMany(movies)
    // :remove-end:

    val projectionFields= Projections.fields(
        Projections.include(Movie::title.name, Movie::imdb.name),
        Projections.excludeId()
    )
    val resultsFlow = collection.withDocumentClass<Results>()
        .find(lt(Movie::runtime.name, 15))
        .projection(projectionFields)
        .sort(Sorts.descending(Movie::title.name))

    resultsFlow.collect { println(it) }

    // :remove-start:
    // clean up
    database.drop()
    // :remove-end:
    mongoClient.close()
}
// :snippet-end:
// :replace-end: