
import com.mongodb.client.model.Filters
import com.mongodb.client.model.FindOneAndUpdateOptions
import com.mongodb.client.model.ReturnDocument
import com.mongodb.client.model.Updates
import com.mongodb.kotlin.client.coroutine.MongoClient
import config.getConfig
import kotlinx.coroutines.flow.count
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.runBlocking
import org.bson.BsonType
import org.bson.codecs.pojo.annotations.BsonId
import org.bson.codecs.pojo.annotations.BsonProperty
import org.bson.codecs.pojo.annotations.BsonRepresentation
import org.bson.types.ObjectId
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import java.time.LocalDate


@TestInstance(TestInstance.Lifecycle.PER_CLASS)
internal class DataClassTest {

    companion object {
        val config = getConfig()
        val client = MongoClient.create(config.connectionUri)
        val database = client.getDatabase("storage_store")

        @AfterAll
        @JvmStatic
        fun afterAll() {
            runBlocking {
                client.close()
            }
        }
    }

    @AfterEach
    fun afterEach() {
        runBlocking {
            database.drop()
        }
    }

    // :snippet-start: data-class
    data class DataStorage(val productName: String, val capacity: Double)
    // :snippet-end:

    @Test
    fun insertDataClassTest() = runBlocking {
        // :snippet-start: insert-data-class
        val collection = database.getCollection<DataStorage>("data_storage")
        val record = DataStorage("tape", 5.0)
        collection.insertOne(record)
        // :snippet-end:
        val result = collection.find().firstOrNull()
        assertEquals(record, result)
    }

    @Test
    fun retrieveDataClassTest() = runBlocking {
        // :snippet-start: retrieve-data-class
        val collection = database.getCollection<DataStorage>("data_storage_devices")
        // :remove-start:
        val tape = DataStorage("tape", 5.0)
        collection.insertOne(tape)
        // :remove-end:

        // Retrieve and print the documents as data classes
        val resultsFlow = collection.find()
        resultsFlow.collect { println(it) }
        // :snippet-end:
        assertEquals(tape, resultsFlow.firstOrNull())

        // :snippet-start: retrieve-diff-data-class
        // Define a data class for returned documents
        data class NewDataStorage(
            val productName: String,
            val capacity: Double,
            val releaseDate: LocalDate
        )

        val filter = Filters.eq(DataStorage::productName.name, "tape")
        val update = Updates.currentDate("releaseDate")
        val options = FindOneAndUpdateOptions().returnDocument(ReturnDocument.AFTER)

        // Specify the class for returned documents as the type parameter in withDocumentClass()
        val result = collection
            .withDocumentClass<NewDataStorage>()
            .findOneAndUpdate(filter, update, options)

        println("Updated document: $result")
        // :snippet-end:
    }

    // :snippet-start: annotated-data-class
    data class NetworkDevice(
        @BsonId
        @BsonRepresentation(BsonType.OBJECT_ID)
        val deviceId: String,
        val name: String,
        @BsonProperty("type")
        val deviceType: String
    )
    // :snippet-end:

    @Test
    fun insertAnnotatedDataClassTest() = runBlocking {
        // :snippet-start: insert-annotated-data-class
        val collection = database.getCollection<NetworkDevice>("network_devices")

        // Insert the record
        val deviceId = ObjectId().toHexString()
        val device = NetworkDevice(deviceId, "Enterprise Wi-fi", "router")
        collection.insertOne(device)
        // :snippet-end:
        val result = collection.find().firstOrNull()
        assertEquals(device, result)
    }

    @Test
    fun retrieveAnnotatedDataClassTest() = runBlocking {
        // :snippet-start: retrieve-annotated-data-class
        val collection = database.getCollection<NetworkDevice>("network_devices")
        // :remove-start:
        val deviceId = ObjectId().toHexString()
        val device = NetworkDevice(deviceId, "Enterprise Wi-fi", "router")
        collection.insertOne(device)
        // :remove-end:

        // Return all documents in the collection as data classes
        val resultsFlow = collection.find()
        resultsFlow.collect { println(it) }
        // :snippet-end:
        assertEquals(device, resultsFlow.firstOrNull())
        assertEquals(1, resultsFlow.count())
    }

    @Test
    fun recursiveDataClassTypesTest() = runBlocking {
        // :snippet-start: recursive-data-class-types
        data class DataClassTree(
            val content: String,
            val left: DataClassTree?,
            val right: DataClassTree?
        )
        // :snippet-end:
        // :snippet-start: recursive-data-class-types-retrieve
        val collection = database.getCollection<DataClassTree>("myCollection")
        // :remove-start:
        val exampleTree = DataClassTree(
            "indo-european",
            DataClassTree(
                "germanic",
                DataClassTree("german", null, DataClassTree("high german", null, null)),
                DataClassTree(
                    "norse", DataClassTree("swedish", null, null),
                    DataClassTree("danish", null, null)
                )
            ),
            DataClassTree(
                "romance",
                DataClassTree("spanish", null, null),
                DataClassTree("french", null, null)
            )
        )
        collection.insertOne(exampleTree)
        // :remove-end:

        val filter = Filters.eq("left.left.right.content", "high german")
        val resultsFlow = collection.find(filter)
        resultsFlow.collect { println(it) }
        // :snippet-end:
        assertEquals(exampleTree, resultsFlow.firstOrNull())
    }
}
