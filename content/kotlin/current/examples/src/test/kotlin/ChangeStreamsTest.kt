
import com.mongodb.client.model.Aggregates
import com.mongodb.client.model.ChangeStreamPreAndPostImagesOptions
import com.mongodb.client.model.CreateCollectionOptions
import com.mongodb.client.model.Filters
import com.mongodb.client.model.changestream.ChangeStreamDocument
import com.mongodb.client.model.changestream.FullDocument
import com.mongodb.client.model.changestream.FullDocumentBeforeChange
import com.mongodb.client.model.changestream.OperationType
import com.mongodb.kotlin.client.coroutine.MongoClient
import com.mongodb.kotlin.client.coroutine.MongoCollection
import config.getConfig
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
import org.bson.BsonDocument
import org.bson.Document
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import java.util.UUID
import kotlin.test.assertEquals
import kotlin.test.Ignore

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
internal class ChangeStreamsTest {

    companion object {
        private val config = getConfig()
        private val client = MongoClient.create(config.connectionUri)
        val database = client.getDatabase("censusData")

        @AfterAll
        @JvmStatic
        fun afterAll() {
            runBlocking {
                client.close()
            }
        }
    }

    private lateinit var collection: MongoCollection<Document>

    @BeforeEach
    fun beforeEach() {
        runBlocking {
            // For some reason, if I don't create a new collection for each test,
            // only the first test to execute passes.
            val collectionName = "cities_${UUID.randomUUID()}"
            collection = database.getCollection<Document>(collectionName)
        }
    }

    @AfterEach
    fun afterEach() {
        runBlocking {
            if(collection.countDocuments() > 0) {
                collection.drop()
            }
        }
    }

    @Test
    fun openChangeStreamTest() = runBlocking {

        val changeEvents = mutableListOf<ChangeStreamDocument<Document>>()
        // :snippet-start: open-change-stream

        // Launch the change stream in a separate coroutine,
        // so you can cancel it later.
        val job = launch {
            val changeStream = collection.watch()
            changeStream.collect {
                println("Received a change event: $it")
                changeEvents.add(it) // :remove:
            }
        }

        // Perform MongoDB operations that trigger change events...
        // :remove-start:
        delay(1)
        val testData = Document("city", "Sao Paulo")
        collection.insertOne(testData)

        // Wait for change events
        delay(1000)
        // :remove-end:

        // Cancel the change stream when you're done listening for events.
        job.cancel()
        // :snippet-end:

        assertEquals(1, changeEvents.size)
        assertEquals(OperationType.INSERT, changeEvents[0].operationType)
        assertEquals(testData, changeEvents[0].fullDocument)
    }

    @Test
    fun applyAggregationOperationsToChangeStreamTest() = runBlocking {
        val changeEvents = mutableListOf<ChangeStreamDocument<Document>>()
        // :snippet-start: apply-aggregation-operations-to-change-stream
        val pipeline = listOf(
            Aggregates.match(Filters.`in`("operationType",
                listOf("insert", "update")))
        )

        // Launch the change stream in a separate coroutine,
        // so you can cancel it later.
        val job = launch {
            val changeStream = collection.watch(pipeline)
            changeStream.collect {
                println("Received a change event: $it")
                changeEvents.add(it) // :remove:
            }
        }

        // Perform MongoDB operations that trigger change events...
        // :remove-start:
        delay(1)
        val testData = Document("city", "Rio de Janeiro")
        collection.insertOne(testData)
        collection.deleteOne(testData)

        // Wait for change events
        delay(1000)
        // :remove-end:

        // Cancel the change stream when you're done listening for events.
        job.cancel()
        // :snippet-end:
        // Change stream only captures the insert event, not the delete event.
        assertEquals(1, changeEvents.size)
        assertEquals(OperationType.INSERT, changeEvents[0].operationType)
        assertEquals(testData, changeEvents[0].fullDocument)

    }

    // Ignore annotation added because this test requires a MongoDB 7.0 deployment
    @Ignore
    fun splitLargeChangeStreamTest() = runBlocking {
        val changeEvents = mutableListOf<ChangeStreamDocument<Document>>()
        // :snippet-start: split-large-change-stream
        val pipeline = listOf(BsonDocument().append("\$changeStreamSplitLargeEvent", BsonDocument()))

        val job = launch {
            val changeStream = collection.watch(pipeline)
            changeStream.collect {
                println("Received a change event: $it")
                changeEvents.add(it) // :remove:
            }
        }
        // :snippet-end:

        // Perform MongoDB operations that trigger change events...
        delay(1)
        val testData = Document("city", "Rio de Janeiro")
        collection.insertOne(testData)

        // Wait for change events
        delay(1000)

        // Cancel the change stream when you're done listening for events.
        job.cancel()

        // Change stream only captures the insert event, not the delete event.
        assertEquals(1, changeEvents.size)
    }

    // NOTE: Test is being ignored because it will not work with a shared M0 cluster.
    // Must have a local cluster with a replica set or >=M10 on Atlas to successfully run.
    @Ignore
    fun createCollectionWithPreAndPostImagesTest() = runBlocking {
        val collectionName = "myChangeStreamCollection"
        // :snippet-start: create-collection-with-pre-and-post-images
        val collectionOptions = CreateCollectionOptions()
        collectionOptions.changeStreamPreAndPostImagesOptions(ChangeStreamPreAndPostImagesOptions(true))
        database.createCollection("myChangeStreamCollection", collectionOptions)
        // :snippet-end:
        val collection = database.getCollection<Document>(collectionName)
        val changeEvents = mutableListOf<ChangeStreamDocument<Document>>()
        val job = launch {
            val changeStream = collection.watch()
                .fullDocumentBeforeChange(FullDocumentBeforeChange.WHEN_AVAILABLE)
                .fullDocument(FullDocument.REQUIRED)
            changeStream.collect {
                println("change event: $it")
                changeEvents.add(it)
            }
        }
        delay(1) // must have to make sure the change stream is ready to receive events

        val testData = Document("city", "Rio de Janeiro")
        collection.insertOne(testData)
        collection.updateOne(Filters.eq("city", "Rio de Janeiro"),
            Document("\$set", Document("city", "Sao Paulo")))
        delay(1000)

        job.cancel()
        collection.drop()

        assertEquals(2, changeEvents.size)
        assertEquals(OperationType.UPDATE, changeEvents[1].operationType)
        assertEquals("Sao Paulo", changeEvents[1].fullDocument?.getString("city"))
        assertEquals("Rio de Janeiro", changeEvents[1].fullDocumentBeforeChange?.getString("city"))

    }

    // NOTE: Test is being ignored because it will not work with a shared M0 cluster.
    // Must have a local cluster with a replica set or >=M10 on Atlas to successfully run.
    @Ignore
    fun preImageConfigurationTest() = runBlocking {
        val collectionName = "myChangeStreamCollection2"
        val createdCollection = database.getCollection<Document>(collectionName)
        createdCollection.countDocuments()
        createdCollection.drop()
        val collectionOptions = CreateCollectionOptions()
        collectionOptions.changeStreamPreAndPostImagesOptions(ChangeStreamPreAndPostImagesOptions(true))

        database.createCollection(collectionName, collectionOptions)
        val collection = database.getCollection<Document>(collectionName)
        val changeEvents = mutableListOf<ChangeStreamDocument<Document>>()
        // :snippet-start: pre-image-configuration
        val job = launch {
            val changeStream = collection.watch()
                .fullDocumentBeforeChange(FullDocumentBeforeChange.REQUIRED)
            changeStream.collect {
                println(it)
                changeEvents.add(it) // :remove:
            }
        }
        // Perform MongoDB operations that trigger change events...
        // :remove-start:
        delay(1) // must have to make sure the change stream is ready to receive events
        val testData = Document("city", "Rio de Janeiro")
        collection.insertOne(testData)
        collection.updateOne(Filters.eq("city", "Rio de Janeiro"),
            Document("\$set", Document("city", "Sao Paulo")))
        delay(1000)
        // :remove-end:

        // Cancel the change stream when you're done listening for events.
        job.cancel()
        // :snippet-end:
        collection.drop()

        assertEquals(2, changeEvents.size)
        assertEquals(OperationType.UPDATE, changeEvents[1].operationType)
        assertEquals("Rio de Janeiro", changeEvents[1].fullDocumentBeforeChange?.getString("city"))
        assertEquals(null, changeEvents[1].fullDocument)
    }

    @Test
    fun postImageConfigurationTest() = runBlocking {
        val changeEvents = mutableListOf<ChangeStreamDocument<Document>>()
        // :snippet-start: post-image-configuration
        val job = launch {
            val changeStream = collection.watch()
                .fullDocument(FullDocument.UPDATE_LOOKUP)
            changeStream.collect {
                println(it)
                changeEvents.add(it) // :remove:
            }
        }

        // Perform MongoDB operations that trigger change events...
        // :remove-start:
        delay(1) // must have to make sure the change stream is ready to receive events
        val testData = Document("city", "Rio de Janeiro")
        collection.insertOne(testData)
        collection.updateOne(Filters.eq("city", "Rio de Janeiro"),
            Document("\$set", Document("city", "Sao Paulo")))

        delay(1000)
        // :remove-end:

        // Cancel the change stream when you're done listening for events.
        job.cancel()
        // :snippet-end:

        assertEquals(2, changeEvents.size)
        assertEquals(OperationType.UPDATE, changeEvents[1].operationType)
        assertEquals("Sao Paulo", changeEvents[1].fullDocument?.getString("city"))
        assertEquals("Sao Paulo",
            changeEvents[1].updateDescription?.updatedFields?.getString("city")?.value)
        assertEquals(null, changeEvents[1].fullDocumentBeforeChange)
    }
}