
import com.mongodb.client.model.Aggregates
import com.mongodb.client.model.Filters
import com.mongodb.client.model.Updates
import com.mongodb.client.model.changestream.FullDocument
import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
import java.lang.Thread.sleep

data class Movie(val title: String, val year: Int)

fun main() = runBlocking {
    // Replace the uri string with your MongoDB deployment's connection string
    val uri = "<connection string uri>"
    val mongoClient = MongoClient.create(uri)
    val database = mongoClient.getDatabase("sample_mflix")
    val collection = database.getCollection<Movie>("movies")



    val job = launch {
        val pipeline = listOf(
            Aggregates.match(
                Filters.`in`("operationType", mutableListOf("insert", "update"))
            )
        )
        val changeStreamFlow = collection.watch(pipeline)
            .fullDocument(FullDocument.DEFAULT)
        changeStreamFlow.collect { event ->
            println("Received a change to the collection: $event")
        }
    }

    // Insert events captured by the change stream watcher
    collection.insertOne(Movie("Back to the Future", 1985))
    collection.insertOne(Movie("Freaky Friday", 2003))

    // Update event captured by the change stream watcher
    collection.updateOne(
        Filters.eq(Movie::title.name, "Back to the Future"),
        Updates.set(Movie::year.name, 1986)
    )

    // Delete event not captured by the change stream watcher
    collection.deleteOne(Filters.eq(Movie::title.name, "Freaky Friday"))

    sleep(1000) // Give time for the change stream watcher to process all events

    // Cancel coroutine job to stop the change stream watcher
    job.cancel()
    mongoClient.close()
}
