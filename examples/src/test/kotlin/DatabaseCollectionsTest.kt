
import com.mongodb.client.model.CreateCollectionOptions
import com.mongodb.client.model.Filters
import com.mongodb.client.model.ValidationOptions
import com.mongodb.kotlin.client.coroutine.MongoClient
import config.getConfig
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.runBlocking
import org.bson.codecs.pojo.annotations.BsonId
import org.bson.types.ObjectId
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import kotlin.test.assertTrue


@TestInstance(TestInstance.Lifecycle.PER_CLASS)
internal class DatabaseCollectionsTest {
    // :snippet-start: test-data-class
    data class ExampleDataClass(
        @BsonId val id: ObjectId = ObjectId(),
        val exampleProperty: String,
    )
    // :snippet-end:
    companion object {
        val config = getConfig()
        val client = MongoClient.create(config.connectionUri)
        // :snippet-start: access-database
        val database = client.getDatabase("testDatabase")
        // :snippet-end:
        // :snippet-start: access-collection
        val collection = database.getCollection<ExampleDataClass>("testCollection")
        // :snippet-end:

        @JvmStatic
        @AfterAll
        fun afterAll(): Unit = runBlocking {
            database.drop()
            client.close()
        }
    }

    @Test
    fun createExampleCollectionTest() = runBlocking {
        // :snippet-start: create-collection
        database.createCollection("exampleCollection")
        // :snippet-end:
        // Junit test for the above code
        val collectionList = database.listCollectionNames().toList()
        assertTrue(collectionList.contains("exampleCollection"))
    }

    @Test
    fun listCollectionTest() = runBlocking {
        database.createCollection("movies")
        // :snippet-start: get-collections
        val collectionList = database.listCollectionNames().toList()

        println(collectionList)
        // :snippet-end:
        // :snippet-start: drop-collections
        val collection =
            database.getCollection<ExampleDataClass>("movies")
        collection.drop()
        // :snippet-end:
        // Junit test for the above code
        assertTrue(collectionList.contains("exampleCollection"))

    }

    @Test
    fun validationTest() = runBlocking {
        // :snippet-start: validation
        val collOptions: ValidationOptions = ValidationOptions().validator(
            Filters.or(
                Filters.exists("title"),
                Filters.exists("name")
            )
        )
        database.createCollection(
            "movies",
            CreateCollectionOptions().validationOptions(collOptions)
        )
        // :snippet-end:
        // Junit test for the above code
        val collectionList = database.listCollectionNames().toList()
        assertTrue(collectionList.contains("movies"))
    }
}
