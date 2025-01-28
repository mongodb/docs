//start-full-example
import com.mongodb.MongoException
import com.mongodb.kotlin.client.MongoClient
import org.bson.Document
import org.bson.BsonInt64
import org.bson.json.JsonWriterSettings


fun main() {
    // Replace the placeholder with your MongoDB deployment's connection string
    val uri = "<connection string uri>"

    val mongoClient = MongoClient.create(uri)
    val database = mongoClient.getDatabase("sample_mflix")
    try {
        val command = Document("buildInfo", BsonInt64(1))
        val commandResult = database.runCommand(command)
        println(commandResult.toJson(JsonWriterSettings.builder().indent(true).build()))
    } catch (me: MongoException) {
        System.err.println("An error occurred: $me")
    }
    mongoClient.close()
}
//end-full-example

fun command_examples() {
    //start-execute
    val commandToExplain = Document("find", "restaurants")
    val explanation = database.runCommand(Document("explain", commandToExplain))
    //end-execute

    //start-read-preference
    val command = Document("hello", 1)
    val commandReadPreference = Document("readPreference", "secondary")

    val commandResult = database.runCommand(command, commandReadPreference)
    //end-read-preference

    //start-build-info
    println(database.runCommand(Document("buildInfo", 1));
    //end-build-info
}