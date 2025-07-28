package usageExamples.command
// :replace-start: {
//    "terms": {
//       "CONNECTION_URI_PLACEHOLDER": "\"<connection string uri>\"",
//       "import io.github.cdimascio.dotenv.dotenv\n": ""
//    }
// }
// :snippet-start: command-usage-example

import com.mongodb.MongoException
import com.mongodb.kotlin.client.coroutine.MongoClient
import io.github.cdimascio.dotenv.dotenv
import kotlinx.coroutines.runBlocking
import org.bson.BsonDocument
import org.bson.BsonInt64
import org.bson.json.JsonWriterSettings

fun main() = runBlocking {
    // :remove-start:
    val dotenv = dotenv()
    val CONNECTION_URI_PLACEHOLDER = dotenv["MONGODB_CONNECTION_URI"]
    // :remove-end:
    // Replace the uri string with your MongoDB deployment's connection string
    val uri = CONNECTION_URI_PLACEHOLDER
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
// :snippet-end:
// :replace-end: