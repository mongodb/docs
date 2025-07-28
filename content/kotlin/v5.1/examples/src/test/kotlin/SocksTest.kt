import com.mongodb.ConnectionString
import com.mongodb.MongoClientSettings
import com.mongodb.MongoException
import com.mongodb.kotlin.client.coroutine.MongoClient
import config.getConfig
import kotlinx.coroutines.runBlocking
import org.bson.BsonInt64
import org.bson.Document
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.TestInstance
import kotlin.test.Ignore

// :replace-start: {
//    "terms": {
//       "CONNECTION_URI_PLACEHOLDER": "\"<connection string>\"",
//       "${uri}&": "mongodb+srv://<user>:<password>@<cluster-url>/?"
//    }
// }

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
internal class SocksTest {

    /* NOTE: SOCKS5 tests are not run by default. To run these tests,
    * you need access to proxy server credentials.
    * Replace the placeholders in the test with your credentials, then replace
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
    fun mongoClientSettingsSocks() = runBlocking {
        // :snippet-start: socks-mongoclientsettings
        val uri = CONNECTION_URI_PLACEHOLDER

        val mongoClient = MongoClient.create(
            MongoClientSettings.builder()
                .applyConnectionString(ConnectionString(uri))
                .applyToSocketSettings{ builder ->
                    builder
                        .applyToProxySettings{ proxyBuilder ->
                            proxyBuilder
                                .host("<proxyHost>")
                                .port("<proxyPort>".toInt())
                                .username("<proxyUsername>")
                                .password("<proxyPassword>")
                                .build()
                        }
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
        Assertions.assertEquals(1.0, higherScopedCommandResult["ok"].toString().toDouble())
    }

    @Ignore
    fun connectionStringSocks() = runBlocking {
        val uri = CONNECTION_URI_PLACEHOLDER
        // :snippet-start: socks-connection-string
        val connectionString = ConnectionString(
            "${uri}&" +
                "proxyHost=<proxyHost>" +
                "&proxyPort=<proxyPort>" +
                "&proxyUsername=<proxyUsername>" +
                "&proxyPassword=<proxyPassword>"
        )

        val mongoClient = MongoClient.create(connectionString)
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
        Assertions.assertEquals(1.0, higherScopedCommandResult["ok"].toString().toDouble())
    }
}
// :replace-end: