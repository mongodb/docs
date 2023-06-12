import com.mongodb.MongoException
import com.mongodb.client.model.DeleteOneModel
import com.mongodb.client.model.Filters
import com.mongodb.client.model.InsertOneModel
import com.mongodb.client.model.ReplaceOneModel
import com.mongodb.client.model.UpdateOneModel
import com.mongodb.client.model.UpdateOptions
import com.mongodb.client.model.Updates
import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.runBlocking

data class Movie(val title: String, val runtime: Int? = null)

fun main() = runBlocking {
    // Replace the uri string with your MongoDB deployment's connection string
    val uri = "<connection string uri>"
    val mongoClient = MongoClient.create(uri)
    val database = mongoClient.getDatabase("sample_mflix")
    val collection = database.getCollection<Movie>("movies")

    try {
        val result = collection.bulkWrite(
            listOf(
                InsertOneModel(Movie("A Sample Movie")),
                InsertOneModel(Movie("Another Sample Movie")),
                InsertOneModel(Movie("Yet Another Sample Movie")),
                UpdateOneModel(
                    Filters.eq(Movie::title.name,"A Sample Movie"),
                    Updates.set(Movie::title.name, "An Old Sample Movie"),
                    UpdateOptions().upsert(true)
                ),
                DeleteOneModel(Filters.eq("title", "Another Sample Movie")),
                ReplaceOneModel(
                    Filters.eq(Movie::title.name, "Yet Another Sample Movie"),
                    Movie("The Other Sample Movie", 42)
                )
            )
        )
        println(
            """
            Result statistics:
            inserted: ${result.insertedCount}
            updated: ${result.modifiedCount}
            deleted: ${result.deletedCount}
            """.trimIndent()
        )
    } catch (e: MongoException) {
        System.err.println("The bulk write operation failed due to an error: $e")
    }
    mongoClient.close()
}
