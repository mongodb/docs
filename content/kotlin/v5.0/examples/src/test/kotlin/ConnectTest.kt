
import com.mongodb.ConnectionString
import com.mongodb.MongoClientSettings
import com.mongodb.MongoException
import com.mongodb.ServerAddress
import com.mongodb.ServerApi
import com.mongodb.ServerApiVersion
import com.mongodb.kotlin.client.coroutine.MongoClient
import config.getConfig
import kotlinx.coroutines.runBlocking
import org.bson.BsonInt64
import org.bson.Document
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
// :replace-start: {
//    "terms": {
//       "CONNECTION_URI_PLACEHOLDER": "\"<connection string>\""
//    }
// }

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
internal class ConnectionTest {

    companion object {
        private val config = getConfig()
        val CONNECTION_URI_PLACEHOLDER = config.connectionUri
        var higherScopedClient: MongoClient? = null

        @AfterAll
        @JvmStatic
        fun afterAll() {
            runBlocking {
                higherScopedClient?.close()
            }
        }

    }

    @Test
    fun connectionExampleTest() = runBlocking {
        // :snippet-start: connection-example
        // Replace the placeholder with your Atlas connection string
        val uri = CONNECTION_URI_PLACEHOLDER

        // Construct a ServerApi instance using the ServerApi.builder() method
        val serverApi = ServerApi.builder()
            .version(ServerApiVersion.V1)
            .build()
        val settings = MongoClientSettings.builder()
            .applyConnectionString(ConnectionString(uri))
            .serverApi(serverApi)
            .build()
        lateinit var higherScopedCommandResult: Document // :remove:
        // Create a new client and connect to the server
        val mongoClient = MongoClient.create(settings)
        val database = mongoClient.getDatabase("admin")
        try {
            // Send a ping to confirm a successful connection
            val command = Document("ping", BsonInt64(1))
            val commandResult = database.runCommand(command)
            println("Pinged your deployment. You successfully connected to MongoDB!")
            higherScopedCommandResult = commandResult // :remove:
        } catch (me: MongoException) {
            System.err.println(me)
        }
        // :snippet-end:
        higherScopedClient = mongoClient
        assertEquals(1.0, higherScopedCommandResult["ok"].toString().toDouble())
    }

    @Test
    fun connectToMultipleHostsWithString() = runBlocking {
        // :snippet-start: connect-to-multiple-hosts-with-string
        val connectionString = ConnectionString("mongodb://host1:27017,host2:27017,host3:27017/")
        val mongoClient = MongoClient.create(connectionString)
        // :snippet-end:
    }

    @Test
    fun connectToMultipleHostsWithMongoClientSettings() = runBlocking {
        // :snippet-start: connect-to-multiple-hosts-with-mongo-client-settings
        val seed1 = ServerAddress("host1", 27017)
        val seed2 = ServerAddress("host2", 27017)
        val seed3 = ServerAddress("host3", 27017)
        val settings = MongoClientSettings.builder()
            .applyToClusterSettings { builder ->
                builder.hosts(
                    listOf(seed1, seed2, seed3)
                )
            }
            .build()
        val mongoClient = MongoClient.create(settings)
        // :snippet-end:
    }


}
// :replace-end:
