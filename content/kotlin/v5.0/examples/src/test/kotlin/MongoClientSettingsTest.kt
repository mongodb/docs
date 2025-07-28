import com.mongodb.ConnectionString
import com.mongodb.MongoClientSettings
import com.mongodb.MongoException
import com.mongodb.connection.ClusterConnectionMode
import com.mongodb.kotlin.client.coroutine.MongoClient
import config.getConfig
import kotlinx.coroutines.runBlocking
import org.bson.BsonInt64
import org.bson.Document
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.Assertions.assertEquals
import java.util.concurrent.TimeUnit
import kotlin.test.Ignore


// :replace-start: {
//    "terms": {
//       "uri": "\"<your connection string>\"",
//       "uriString": "\"mongodb+srv:/<username>:<password>@<hostname>:<port>?connectTimeoutMS(2000)\"",
//       "uriAcmeString": "\"mongodb+srv://host1.acme.com\""
//    }
// }

/* NOTE: These tests are not run by default because they require a MongoDB deployment
with a username and password. To run these tests locally, you need to set up your .env
and replace the @Ignore annotation with @Test on the tests you want to run.
 */
class MongoClientSettingsTest {

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

    @Ignore
    fun exampleConnectionString() = runBlocking {
        val uri = CONNECTION_URI_PLACEHOLDER
        // :snippet-start: example-connection-string
        val mongoClient = MongoClient.create(
            MongoClientSettings.builder()
                .applyConnectionString(ConnectionString(uri))
                .build()
        )
        // :snippet-end:
        lateinit var higherScopedCommandResult: Document
        val database = mongoClient.getDatabase("admin")
        try {
            // Send a ping to confirm a successful connection
            val command = Document("ping", BsonInt64(1))
            val commandResult = database.runCommand(command)
            println("Pinged your deployment. You successfully connected to MongoDB!")
            higherScopedCommandResult = commandResult
        } catch (me: MongoException) {
            System.err.println(me)
        }
        higherScopedClient = mongoClient
        assertEquals(1.0, higherScopedCommandResult["ok"].toString().toDouble())
    }

    @Ignore
    fun chainOrderConnectionString() = runBlocking {
        val uriString = CONNECTION_URI_PLACEHOLDER
        // :snippet-start: chain-order-connection-string
        val mongoClient = MongoClient.create(
            MongoClientSettings.builder()
                .applyConnectionString(ConnectionString(uriString))
                .applyToSocketSettings{ builder ->
                    builder.connectTimeout(5, TimeUnit.SECONDS)
                }
                .build()
        )
        // :snippet-end:
        lateinit var higherScopedCommandResult: Document
        val database = mongoClient.getDatabase("admin")
        try {
            // Send a ping to confirm a successful connection
            val command = Document("ping", BsonInt64(1))
            val commandResult = database.runCommand(command)
            println("Pinged your deployment. You successfully connected to MongoDB!")
            higherScopedCommandResult = commandResult
        } catch (me: MongoException) {
            System.err.println(me)
        }
        higherScopedClient = mongoClient
        assertEquals(1.0, higherScopedCommandResult["ok"].toString().toDouble())
    }

    @Ignore
    fun srvHostString() = runBlocking {
        val uriAcmeString = CONNECTION_URI_PLACEHOLDER
        // :snippet-start: srv-host-connection-string
        val mongoClient = MongoClient.create(
            MongoClientSettings.builder()
                .applyConnectionString(ConnectionString(uriAcmeString))
                .build()
        )
        // :snippet-end:
        lateinit var higherScopedCommandResult: Document
        val database = mongoClient.getDatabase("admin")
        try {
            // Send a ping to confirm a successful connection
            val command = Document("ping", BsonInt64(1))
            val commandResult = database.runCommand(command)
            println("Pinged your deployment. You successfully connected to MongoDB!")
            higherScopedCommandResult = commandResult
        } catch (me: MongoException) {
            System.err.println(me)
        }
        higherScopedClient = mongoClient
        assertEquals(1.0, higherScopedCommandResult["ok"].toString().toDouble())
    }

    @Ignore
    fun exampleClusterSettingsString() = runBlocking {
        // :snippet-start: cluster-settings-connection-string
        val mongoClient = MongoClient.create(
            MongoClientSettings.builder()
                .applyToClusterSettings{ builder ->
                    builder.mode(ClusterConnectionMode.SINGLE)
                }
                .build()
        )
        // :snippet-end:
        lateinit var higherScopedCommandResult: Document
        val database = mongoClient.getDatabase("admin")
        try {
            // Send a ping to confirm a successful connection
            val command = Document("ping", BsonInt64(1))
            val commandResult = database.runCommand(command)
            println("Pinged your deployment. You successfully connected to MongoDB!")
            higherScopedCommandResult = commandResult
        } catch (me: MongoException) {
            System.err.println(me)
        }
        higherScopedClient = mongoClient
        assertEquals(1.0, higherScopedCommandResult["ok"].toString().toDouble())
    }

    @Ignore
    fun exampleSocketSettingsString() = runBlocking {
        val uri = CONNECTION_URI_PLACEHOLDER
        // :snippet-start: socket-settings-connection-string
        val mongoClient = MongoClient.create(
            MongoClientSettings.builder()
                .applyConnectionString(ConnectionString(uri))
                .applyToSocketSettings{ builder ->
                    builder
                        .connectTimeout(10, TimeUnit.SECONDS)
                        .readTimeout(15, TimeUnit.SECONDS)
                }
                .build()
        )
        // :snippet-end:
        lateinit var higherScopedCommandResult: Document
        val database = mongoClient.getDatabase("admin")
        try {
            // Send a ping to confirm a successful connection
            val command = Document("ping", BsonInt64(1))
            val commandResult = database.runCommand(command)
            println("Pinged your deployment. You successfully connected to MongoDB!")
            higherScopedCommandResult = commandResult
        } catch (me: MongoException) {
            System.err.println(me)
        }
        higherScopedClient = mongoClient
        assertEquals(1.0, higherScopedCommandResult["ok"].toString().toDouble())
    }

    @Ignore
    fun connectionPoolSettingsString() = runBlocking {
        val uri = CONNECTION_URI_PLACEHOLDER
        // :snippet-start: connection-pool-connection-string
        val mongoClient = MongoClient.create(
            MongoClientSettings.builder()
                .applyConnectionString(ConnectionString(uri))
                .applyToConnectionPoolSettings{ builder ->
                    builder
                        .maxWaitTime(10, TimeUnit.SECONDS)
                        .maxSize(200)
                }
                .build()
        )
        // :snippet-end:
        lateinit var higherScopedCommandResult: Document
        val database = mongoClient.getDatabase("admin")
        try {
            // Send a ping to confirm a successful connection
            val command = Document("ping", BsonInt64(1))
            val commandResult = database.runCommand(command)
            println("Pinged your deployment. You successfully connected to MongoDB!")
            higherScopedCommandResult = commandResult
        } catch (me: MongoException) {
            System.err.println(me)
        }
        higherScopedClient = mongoClient
        assertEquals(1.0, higherScopedCommandResult["ok"].toString().toDouble())
    }

    @Ignore
    fun serverSettingsString() = runBlocking {
        val uri = CONNECTION_URI_PLACEHOLDER
        // :snippet-start: server-settings-connection-string
        val mongoClient = MongoClient.create(
            MongoClientSettings.builder()
                .applyConnectionString(ConnectionString(uri))
                .applyToServerSettings{ builder ->
                    builder
                        .minHeartbeatFrequency(700, TimeUnit.MILLISECONDS)
                        .heartbeatFrequency(15, TimeUnit.SECONDS)
                }
                .build()
        )
        // :snippet-end:
        lateinit var higherScopedCommandResult: Document
        val database = mongoClient.getDatabase("admin")
        try {
            // Send a ping to confirm a successful connection
            val command = Document("ping", BsonInt64(1))
            val commandResult = database.runCommand(command)
            println("Pinged your deployment. You successfully connected to MongoDB!")
            higherScopedCommandResult = commandResult
        } catch (me: MongoException) {
            System.err.println(me)
        }
        higherScopedClient = mongoClient
        assertEquals(1.0, higherScopedCommandResult["ok"].toString().toDouble())
    }

    @Ignore
    fun tlsSslString() = runBlocking {
        val uri = CONNECTION_URI_PLACEHOLDER
        // :snippet-start: tls-ssl-connection-string
        val mongoClient = MongoClient.create(
            MongoClientSettings.builder()
                .applyConnectionString(ConnectionString(uri))
                .applyToSslSettings{ builder ->
                    builder.enabled(true)
                }
                .build()
        )
        // :snippet-end:
        lateinit var higherScopedCommandResult: Document
        val database = mongoClient.getDatabase("admin")
        try {
            // Send a ping to confirm a successful connection
            val command = Document("ping", BsonInt64(1))
            val commandResult = database.runCommand(command)
            println("Pinged your deployment. You successfully connected to MongoDB!")
            higherScopedCommandResult = commandResult
        } catch (me: MongoException) {
            System.err.println(me)
        }
        higherScopedClient = mongoClient
        assertEquals(1.0, higherScopedCommandResult["ok"].toString().toDouble())
    }

}

// :replace-end: