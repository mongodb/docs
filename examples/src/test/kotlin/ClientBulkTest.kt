import com.mongodb.MongoNamespace
import com.mongodb.client.model.Filters
import com.mongodb.client.model.bulk.ClientBulkWriteOptions
import com.mongodb.client.model.bulk.ClientNamespacedWriteModel
import com.mongodb.kotlin.client.coroutine.MongoClient
import config.getConfig
import kotlinx.coroutines.runBlocking
import org.bson.codecs.pojo.annotations.BsonId
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.TestInstance
import kotlin.test.Ignore

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
internal class ClientBulkTest {

    // :snippet-start: data-classes
    data class Person(
        @BsonId val id: Int,
        val name: String,
    )

    data class Object(
        @BsonId val id: Int,
        val type: String,
    )
    // :snippet-end:


    companion object {
        val config = getConfig()
        val client = MongoClient.create(config.connectionUri)
        val database = client.getDatabase("sample_db")
        val personCollection = database.getCollection<Person>("people")
        val objectCollection = database.getCollection<Object>("objects")

        @BeforeAll
        @JvmStatic
        fun beforeAll() {
            runBlocking {
                personCollection.insertOne(Person(1, "Sandy King"))
                objectCollection.insertOne(Object(1, "artist easel"))
            }
        }

        @AfterAll
        @JvmStatic
        fun afterAll() {
            runBlocking {
                personCollection.drop()
                objectCollection.drop()
                client.close()
            }
        }
    }

    // Ignoring tests because successful completion of
    // writes is blocked on https://jira.mongodb.org/browse/CLOUDP-288992
    @Ignore
    fun insertOperationTest() = runBlocking {
        // :snippet-start: insert-models
        val docsToInsert = mutableListOf<ClientNamespacedWriteModel>()

        docsToInsert.add(ClientNamespacedWriteModel
            .insertOne(
                MongoNamespace("sample_db", "people"),
                Person(2, "Julia Smith")
            )
        )

        docsToInsert.add(ClientNamespacedWriteModel
            .insertOne(
                MongoNamespace("sample_db", "objects"),
                Object(2, "washing machine")
            )
        )

        val clientBulkResult = client.bulkWrite(docsToInsert)
        // :snippet-end:

        // Junit test for the above code
        assertEquals(2, objectCollection.countDocuments())
        assertEquals(2, personCollection.countDocuments())
    }

    @Ignore
    fun replaceOperationTest() = runBlocking {
        // :snippet-start: replace-models
        val docsReplacements = mutableListOf<ClientNamespacedWriteModel>()

        docsReplacements.add(ClientNamespacedWriteModel
            .replaceOne(
                MongoNamespace("sample_db", "people"),
                Filters.eq(Person::id.name, 1),
                Person(1, "Frederic Hilbert")
            )
        )

        docsReplacements.add(ClientNamespacedWriteModel
            .replaceOne(
                MongoNamespace("sample_db", "objects"),
                Filters.eq(Object::id.name, 1),
                Object(1, "ironing board")
            )
        )

        val clientBulkResult = client.bulkWrite(docsReplacements)
        // :snippet-end:

        // Junit test for the above code
        assertEquals(1, objectCollection.countDocuments())
    }

    @Ignore
    fun orderOfOperationsTest() = runBlocking {
        // :snippet-start: options
        val namespace = MongoNamespace("sample_db", "people")

        val options = ClientBulkWriteOptions
            .clientBulkWriteOptions()
            .ordered(false)

        val bulkOperations = listOf(
            ClientNamespacedWriteModel.insertOne(
                namespace,
                Person(2, "Rudra Suraj")
            ),
            // Causes duplicate key error
            ClientNamespacedWriteModel.insertOne(
                namespace,
                Person(2, "Wendy Zhang")
            ),
            ClientNamespacedWriteModel.insertOne(
                namespace,
                Person(4, "Mario Bianchi")
            )
        )

        val result = client.bulkWrite(bulkOperations, options)
        // :snippet-end:

        // Junit test for the above code
        assertEquals(3, personCollection.countDocuments())
    }
}