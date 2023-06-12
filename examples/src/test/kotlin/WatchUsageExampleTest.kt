
import com.mongodb.client.model.Aggregates
import com.mongodb.client.model.Filters
import com.mongodb.client.model.changestream.ChangeStreamDocument
import com.mongodb.client.model.changestream.FullDocument
import com.mongodb.kotlin.client.coroutine.MongoClient
import config.getConfig
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
import org.bson.Document
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.TestInstance
import java.util.*
import kotlin.test.*


@TestInstance(TestInstance.Lifecycle.PER_CLASS)
internal class WatchUsageExampleTest {

    companion object {
        val config = getConfig()
        val client = MongoClient.create(config.connectionUri)
        val database = client.getDatabase("censusData")
        val collection = database.getCollection<Document>("cities")

        @AfterAll
        @JvmStatic
        fun afterAll() {
            runBlocking {
                database.drop()
                client.close()
            }
        }
    }

    @Test
    fun basicWatchTest() = runBlocking {
        val changeEvents = mutableListOf<ChangeStreamDocument<Document>>()
        val job = launch {
            // :snippet-start: basic-watch
            val changeStream = collection.watch()
            // :snippet-end:
            changeStream.collect {
                changeEvents.add(it)
            }
        }
        delay(1)
        val testData = Document("city", "Sao Paulo")
        collection.insertOne(testData)

        delay(1000)
        job.cancel()

        assertEquals(1, changeEvents.size)

    }

    @Test
    fun aggregatesWatchTest() = runBlocking {
        val changeEvents = mutableListOf<ChangeStreamDocument<Document>>()
        val job = launch {
            // :snippet-start: aggregates-watch
            val pipeline = listOf(Aggregates.match(Filters.lt("fullDocument.runtime", 15)))
            val changeStream = collection.watch(pipeline)
            // :snippet-end:
            changeStream.collect {
                changeEvents.add(it)
            }
        }
        delay(1)
        val testData = Document("runtime", 2)
        collection.insertOne(testData)

        delay(1000)
        job.cancel()
        assertEquals(1, changeEvents.size)
    }

    @Test
    fun collectChangeStreamTest() = runBlocking {
        val changeEvents = mutableListOf<ChangeStreamDocument<Document>>()
        val job = launch {
            // :snippet-start: collect-change-stream
            val changeStream = collection.watch()
            changeStream.collect {
                println("Change observed: $it")
                changeEvents.add(it) // :remove:
            }
            // :snippet-end:
        }
        delay(1)
        val testData = Document("runtime", 2)
        collection.insertOne(testData)

        delay(1000)
        job.cancel()
        assertEquals(1, changeEvents.size)
    }

    @Test
    fun fullDocumentChangesTest() = runBlocking {
        val changeEvents = mutableListOf<ChangeStreamDocument<Document>>()
        val job = launch {
            // :snippet-start: full-document-changes
            val changeStream = collection.watch()
                .fullDocument(FullDocument.UPDATE_LOOKUP)
            // :snippet-end:
            changeStream.collect {
                changeEvents.add(it)
            }
        }
        delay(1)
        val testData = Document("runtime", 2)
        collection.insertOne(testData)

        delay(1000)
        job.cancel()
        assertEquals(1, changeEvents.size)
    }
}