
import com.mongodb.MongoException
import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.runBlocking
import org.bson.BsonDocument
import org.bson.BsonInt64
import org.bson.json.JsonWriterSettings

fun main() = runBlocking {
    // Replace the uri string with your MongoDB deployment's connection string
    val uri = "<connection string uri>"
    val mongoClient = MongoClient.create(uri)
    val database = mongoClient.getDatabase("sample_mflix")
    try {
        val command = BsonDocument("dbStats", BsonInt64(1))
        val commandResult = database.runCommand(command)
        println(commandResult.toJson(JsonWriterSettings.builder().indent(true).build()))
    } catch (me: MongoException) {
        System.err.println("An error occurred: $me")
    }
    mongoClient.close()
}
