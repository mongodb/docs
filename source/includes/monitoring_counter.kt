import com.mongodb.kotlin.client.MongoClient
import org.bson.Document
import com.mongodb.event.*
import com.mongodb.MongoClientSettings
import com.mongodb.ConnectionString

class CommandCounter : CommandListener {
    private val commands = mutableMapOf<String, Int>()

    override fun commandSucceeded(event: CommandSucceededEvent) {
        val commandName = event.commandName
        val count = commands[commandName] ?: 0
        commands[commandName] = count + 1
        println(commands.toString())
    }

    override fun commandFailed(event: CommandFailedEvent) {
        println("Failed execution of command '${event.commandName}' with id ${event.requestId}")
    }
}


fun main() {
    val uri = "<connection string uri>"

// Instantiate your new listener
    val commandCounter = CommandCounter()

// Include the listener in your client settings
    val settings = MongoClientSettings.builder()
        .applyConnectionString(ConnectionString(uri))
        .addCommandListener(commandCounter)
        .build()

// Connect to your database
    val mongoClient = MongoClient.create(settings)
    val database = mongoClient.getDatabase("sample_mflix")
    val collection = database.getCollection<Document>("movies")

// Run some commands to test the counter
    collection.find().firstOrNull()
    collection.find().firstOrNull()

    mongoClient.close()
}