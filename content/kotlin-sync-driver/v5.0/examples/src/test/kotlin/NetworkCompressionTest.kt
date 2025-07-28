import com.mongodb.ConnectionString
import com.mongodb.MongoClientSettings
import com.mongodb.MongoCompressor
import com.mongodb.MongoException
import com.mongodb.kotlin.client.coroutine.MongoClient
import config.getConfig
import kotlinx.coroutines.runBlocking
import org.bson.BsonInt64
import org.bson.Document
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.TestInstance
import kotlin.test.Ignore
import kotlin.test.assertEquals


// :replace-start: {
//    "terms": {
//       "CONNECTION_URI_PLACEHOLDER": "\"<connection string>\"",
//       "${uri}&": "mongodb+srv://<user>:<password>@<cluster-url>/?"
//    }
// }

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
internal class NetworkCompressionTest {

    /* NOTE: Network compression tests are not run by default. To run these tests,
    * you need access to a deployment that has a username and password.
    * Set up your .env variable with this connection string, then replace
    * the @Ignore annotation with @Test on the tests you want to run.
    */

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
    fun connectionStringCompressionTest() = runBlocking {

        val uri = CONNECTION_URI_PLACEHOLDER
        // :snippet-start: connection-string-compression-example
        // Replace the placeholders with values from your MongoDB deployment's connection string
        val connectionString = ConnectionString("${uri}&compressors=snappy,zlib,zstd")

        lateinit var higherScopedCommandResult: Document // :remove:
        // Create a new client with your settings
        val mongoClient = MongoClient.create(connectionString)
        // :snippet-end:
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
        assertEquals(1, higherScopedCommandResult["ok"].toString().toInt())
    }

    @Ignore
    fun mongoClientSettingsCompressionTest() = runBlocking {

        // :snippet-start: mongoclientsettings-compression-example
        // Replace the placeholder with your MongoDB deployment's connection string
        val uri = CONNECTION_URI_PLACEHOLDER

        val settings = MongoClientSettings.builder()
            .applyConnectionString(ConnectionString(uri))
            .compressorList(
                listOf(
                    MongoCompressor.createSnappyCompressor(),
                    MongoCompressor.createZlibCompressor(),
                    MongoCompressor.createZstdCompressor())
            )
            .build()

        lateinit var higherScopedCommandResult: Document // :remove:
        // Create a new client with your settings
        val mongoClient = MongoClient.create(settings)
        // :snippet-end:
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
        assertEquals(1, higherScopedCommandResult["ok"].toString().toInt())
    }
}
// :replace-end: