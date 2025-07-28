import com.mongodb.MongoException
import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.runBlocking
import org.bson.codecs.pojo.annotations.BsonId
import org.bson.types.ObjectId

data class Movie(@BsonId val id: ObjectId, val title: String, val genres: List<String>)

fun main() = runBlocking {
    // Replace the uri string with your MongoDB deployment's connection string
    val uri = "<connection string uri>"
    val mongoClient = MongoClient.create(uri)
    val database = mongoClient.getDatabase("sample_mflix")
    val collection = database.getCollection<Movie>("movies")

    try {
        val result = collection.insertOne(
            Movie(ObjectId(), "Ski Bloopers", listOf("Documentary", "Comedy"))
        )
        println("Success! Inserted document id: " + result.insertedId)
    } catch (e: MongoException) {
        System.err.println("Unable to insert due to an error: $e")
    }
    mongoClient.close()
}
