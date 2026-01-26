import com.mongodb.client.model.Filters.lt
import com.mongodb.client.model.Projections
import com.mongodb.client.model.Sorts
import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.runBlocking

// start-movie-data-class
data class Movie(val title: String, val runtime: Int, val imdb: IMDB){
    data class IMDB(val rating: Double)
}
// end-movie-data-class

// start-results-data-class
data class Results(val title: String)
// end-results-data-class

fun main() = runBlocking {
    // Replace the uri string with your MongoDB deployment's connection string
    val uri = "<connection string uri>"
    val mongoClient = MongoClient.create(uri)
    val database = mongoClient.getDatabase("sample_mflix")
    val collection = database.getCollection<Movie>("movies")

    {
        // start-find-one
        val projectionFields= Projections.fields(
            Projections.include(Movie::title.name, Movie::imdb.name),
            Projections.excludeId()
        )
        val resultsFlow = collection.withDocumentClass<Results>()
            .find(eq(Movie::title.name, "The Room"))
            .projection(projectionFields)
            .firstOrNull()

        if (resultsFlow == null) {
            println("No results found.");
        } else {
            println(resultsFlow)
        }
        // end-find-one
    }

    {
        // start-find-all
        val resultsFlow = collection.withDocumentClass<Results>()
            .find()
        // end-find-all
    }

    {
        // start-find
        val projectionFields= Projections.fields(
            Projections.include(Movie::title.name, Movie::imdb.name),
            Projections.excludeId()
        )
        val resultsFlow = collection.withDocumentClass<Results>()
            .find(lt(Movie::runtime.name, 15))
            .projection(projectionFields)

        resultsFlow.collect { println(it) }
        // end-find
    }

    {
        // start-find-limit
        val projectionFields= Projections.fields(
            Projections.include(Movie::title.name, Movie::imdb.name),
            Projections.excludeId()
        )
        val resultsFlow = collection.withDocumentClass<Results>()
            .find()
            .projection(projectionFields)
            .limit(10)
        // end-find-limit
    }

    mongoClient.close()
}
