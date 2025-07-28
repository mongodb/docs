import com.mongodb.client.model.Filters.eq
import com.mongodb.client.model.Filters.lt
import com.mongodb.client.model.Projections
import com.mongodb.client.model.Sorts
import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.runBlocking
import usageExamples.find.Results

data class Movie(val title: String, val runtime: Int, val imdb: IMDB) {
    data class IMDB(val rating: Double)
}

data class Results(val title: String, val imdb: Movie.IMDB)

fun main() = runBlocking {
    // Replace the uri string with your MongoDB deployment's connection string
    val uri = "<connection string uri>"
    val mongoClient = MongoClient.create(uri)
    val database = mongoClient.getDatabase("sample_mflix")
    val collection = database.getCollection<Movie>("movies")

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

    mongoClient.close()
}
