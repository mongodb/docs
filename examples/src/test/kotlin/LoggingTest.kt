

// :snippet-start: slf4j-import
// :snippet-end:
import InsertTest.Companion.client
import com.mongodb.kotlin.client.coroutine.MongoClient
import config.getConfig
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.runBlocking
import org.bson.Document
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.TestInstance
import org.slf4j.LoggerFactory
import java.util.*
import kotlin.test.*

// :replace-start: {
//    "terms": {
//       "CONNECTION_URI_PLACEHOLDER": "\"<connection string>\""
//    }
// }
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
internal class LoggingTest {

    companion object {
        val config = getConfig()
        val CONNECTION_URI_PLACEHOLDER = config.connectionUri
        val DB_NAME_PLACEHOLDER = "logging"
        val COLLECTION_NAME_PLACEHOLDER = "logging"

        @AfterAll
        @JvmStatic
        fun afterAll() {
            runBlocking {
                client.close()
            }
        }
    }
    @Test
    fun triggerLogging() = runBlocking {
        // :snippet-start: trigger-logging
        val mongoClient = MongoClient.create(CONNECTION_URI_PLACEHOLDER);
        val database = mongoClient.getDatabase(DB_NAME_PLACEHOLDER);
        val collection = database.getCollection<Document>(COLLECTION_NAME_PLACEHOLDER);
        collection.find().firstOrNull()
        // :snippet-end:
        assertEquals(null, collection.find().firstOrNull())

        // clean up
        if(collection.countDocuments() > 0){
            collection.drop()
        }
    }

    @Test
    fun slf4jTest() {
        // :snippet-start: slf4j
        val loggerParent = LoggerFactory.getLogger("parent")
        val loggerChild = LoggerFactory.getLogger("parent.child")
        // :snippet-end:
        assertEquals("parent", loggerParent.name)
        assertEquals("parent.child", loggerChild.name)
    }

}

// :replace-end:
