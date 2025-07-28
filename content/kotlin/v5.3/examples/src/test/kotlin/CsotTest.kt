
import com.mongodb.ClientSessionOptions
import com.mongodb.ConnectionString
import com.mongodb.MongoClientSettings
import com.mongodb.TransactionOptions
import com.mongodb.client.cursor.TimeoutMode
import com.mongodb.client.model.Filters
import com.mongodb.kotlin.client.coroutine.MongoClient
import config.getConfig
import kotlinx.coroutines.runBlocking
import org.bson.Document
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import java.util.concurrent.TimeUnit
import kotlin.test.Ignore

class CsotTest {

    companion object {
        val config = getConfig()
        val CONNECTION_URI_PLACEHOLDER = config.connectionUri
        val client = MongoClient.create(CONNECTION_URI_PLACEHOLDER)
        val database = client.getDatabase("db")
        val collection = database.getCollection<Document>("people")

        @BeforeAll
        @JvmStatic
        fun beforeAll() {
            runBlocking {
                val people = listOf(
                    Document("name", "Shelley Price").append("age", 56),
                    Document("name", "Garrett John").append("age", 39),
                    Document("name", "Kalima Sheik").append("age", 26)
                )
                collection.insertMany(people)
            }
        }

        @AfterAll
        @JvmStatic
        fun afterAll() {
            runBlocking {
                database.drop()
                client.close()
            }
        }
    }

    @Ignore
    fun connectionStringTest() = runBlocking {
        // :snippet-start: connection-string-timeout
        val uri = "<connection string>/?timeoutMS=200"
        val client = MongoClient.create(uri)
        // :snippet-end:
    }

    // :replace-start: {
    //    "terms": {
    //       "uri": "\"<connection string>\""
    //    }
    // }

    @Test
    fun mongoClientSettingsTest() = runBlocking {
        val uri = CONNECTION_URI_PLACEHOLDER
        // :snippet-start: mongoclientsettings-timeout
        val settings = MongoClientSettings.builder()
            .applyConnectionString(ConnectionString(uri))
            .timeout(200L, TimeUnit.MILLISECONDS)
            .build()

        val client = MongoClient.create(settings)
        // :snippet-end:
    }

    @Test
    fun operationTimeoutTest() = runBlocking {
        val uri = CONNECTION_URI_PLACEHOLDER
        // :snippet-start: operation
        val settings = MongoClientSettings.builder()
            .applyConnectionString(ConnectionString(uri))
            .timeout(200L, TimeUnit.MILLISECONDS)
            .build()

        val client = MongoClient.create(settings)
        val collection = client
            .getDatabase("db")
            .getCollection<Document>("people")

        collection.insertOne(Document("name", "Francine Loews"))
        // :snippet-end:
    }

    @Test
    fun overrideTimeoutTest() = runBlocking {
        val uri = CONNECTION_URI_PLACEHOLDER
        // :snippet-start: override
        val settings = MongoClientSettings.builder()
            .applyConnectionString(ConnectionString(uri))
            .timeout(200L, TimeUnit.MILLISECONDS)
            .build()

        val client = MongoClient.create(settings)
        val database = client.getDatabase("db")
        val collection = database
            .getCollection<Document>("people")
            .withTimeout(300L, TimeUnit.MILLISECONDS)
        // :snippet-end:
    }

    @Test
    fun transactionTimeoutTest() = runBlocking {
        // :snippet-start: session
        val opts = ClientSessionOptions.builder()
            .defaultTimeout(200L, TimeUnit.MILLISECONDS)
            .build()

        val session = client.startSession(opts)
        // ... perform operations on ClientSession
        // :snippet-end:

        // :snippet-start: transaction
        val transactionOptions = TransactionOptions.builder()
            .timeout(200L, TimeUnit.MILLISECONDS)
            .build()
        // :snippet-end:
    }

    @Test
    fun cursorTimeoutTest() = runBlocking {
        val collection = database
            .getCollection<Document>("people")
            .withTimeout(200L, TimeUnit.MILLISECONDS)

        // :snippet-start: cursor-lifetime
        val flowWithLifetimeTimeout = collection
            .find(Filters.gte("age", 40))
            .timeoutMode(TimeoutMode.CURSOR_LIFETIME)
        // :snippet-end:
    }
}

// :replace-end: