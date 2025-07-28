package usageExamples.findOne

// :replace-start: {
//    "terms": {
//       "CONNECTION_URI_PLACEHOLDER": "\"<connection string uri>\"",
//       "import io.github.cdimascio.dotenv.dotenv\n": ""
//    }
// }
// :snippet-start: find-one-usage-example
import com.mongodb.client.model.Filters.eq
import com.mongodb.client.model.Filters.lt
import com.mongodb.client.model.Projections
import com.mongodb.client.model.Sorts
import com.mongodb.kotlin.client.coroutine.MongoClient
import io.github.cdimascio.dotenv.dotenv
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.runBlocking
import usageExamples.find.Results

data class Movie(val title: String, val runtime: Int, val imdb: IMDB) {
    data class IMDB(val rating: Double)
}

data class Results(val title: String, val imdb: Movie.IMDB)

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
    collection.insertOne(Movie("The Room", 130, Movie.IMDB(8.5))) // :remove:

    val projectionFields= Projections.fields(
        Projections.include(Movie::title.name, Movie::imdb.name),
        Projections.excludeId()
    )
    val resultsFlow = collection.withDocumentClass<Results>()
        .find(eq(Movie::title.name, "The Room"))
        .projection(projectionFields)
        .sort(Sorts.descending("${Movie::imdb.name}.${Movie.IMDB::rating.name}"))
        .firstOrNull()

    if (resultsFlow == null) {
        println("No results found.");
    } else {
        println(resultsFlow)
    }

    // :remove-start:
    // clean up
    database.drop()
    // :remove-end:
    mongoClient.close()
}
// :snippet-end:
// :replace-end: