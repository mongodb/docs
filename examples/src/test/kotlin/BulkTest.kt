
import com.mongodb.MongoBulkWriteException
import com.mongodb.client.model.BulkWriteOptions
import com.mongodb.client.model.DeleteManyModel
import com.mongodb.client.model.DeleteOneModel
import com.mongodb.client.model.Filters
import com.mongodb.client.model.InsertOneModel
import com.mongodb.client.model.ReplaceOneModel
import com.mongodb.client.model.ReplaceOptions
import com.mongodb.client.model.Sorts
import com.mongodb.client.model.UpdateOneModel
import com.mongodb.client.model.UpdateOptions
import com.mongodb.client.model.Updates
import com.mongodb.kotlin.client.coroutine.MongoClient
import config.getConfig
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.runBlocking
import org.bson.codecs.pojo.annotations.BsonId
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance

// :snippet-start: bulk-data-model
data class Person(
    @BsonId val id: Int,
    val name: String,
    val age: Int? = null,
    val location: String? = null
)
// :snippet-end:

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
internal class BulkTest {
    companion object {
        val config = getConfig()
        val client = MongoClient.create(config.connectionUri)
        val database = client.getDatabase("sample_db")
        val collection = database.getCollection<Person>("people")

        @BeforeAll
        @JvmStatic
        fun beforeAll() {
            runBlocking {
                val sampleDocuments = listOf(
                    Person(1, "Karen Sandoval", 31),
                    Person(2, "William Chin", 54),
                    Person(8, "Shayla Ray", 20)
                )
                collection.insertMany(sampleDocuments)
            }
        }

        @AfterAll
        @JvmStatic
        fun afterAll() {
            runBlocking {
                collection.drop()
                client.close()
            }
        }
    }

    @Test
    fun insertOperationTest() = runBlocking {
        // :snippet-start: insert-one
        val juneDoc = InsertOneModel(Person(3, "June Carrie", 17))
        val kevinDoc = InsertOneModel(Person(4, "Kevin Moss", 22))
        // :snippet-end:
        // :snippet-start: bulk-write-exception
        try {
            val bulkOperations = listOf(
                (InsertOneModel(Person(1, "James Smith", 13))),
                (InsertOneModel(Person(3, "Colin Samuels")))
            )
            val bulkWrite = collection.bulkWrite(bulkOperations)
            assertFalse(bulkWrite.wasAcknowledged()) // :remove:
        } catch (e: MongoBulkWriteException) {
            println("A MongoBulkWriteException occurred with the following message: " + e.message)
        }
        // :snippet-end:
        // Junit test for the above code
        val expected = listOf(
            Person(1, "Karen Sandoval", 31),
            Person(2, "William Chin", 54),
            Person(8, "Shayla Ray", 20)
        )
        assertEquals(expected, collection.find().toList())
    }

    @Test
    fun replaceOneTest() = runBlocking {
        // :snippet-start: replace-one
        val filter = Filters.eq("_id", 1)
        val insert = Person(1, "Celine Stork", location = "San Diego, CA")
        val doc = ReplaceOneModel(filter, insert)
        // :snippet-end:

        // :snippet-start: replace-model-options
        val opts = ReplaceOptions().sort(Sorts.ascending("_id"))
        // :snippet-end:

        // Junit test for the above code
        val insertTest = collection.bulkWrite(listOf(doc))
        assertTrue(insertTest.wasAcknowledged())
    }

    @Test
    fun updateOneTest() = runBlocking {
        // :snippet-start: update-one
        val filter = Filters.eq("_id", 2)
        val update = Updates.inc(Person::age.name, 1)
        val doc = UpdateOneModel<Person>(filter, update)
        // :snippet-end:

        // :snippet-start: update-model-options
        val opts = UpdateOptions().sort(Sorts.ascending("_id"))
        // :snippet-end:

        // Junit test for the above code
        val updateTest = collection.bulkWrite(listOf(doc))
        assertTrue(updateTest.wasAcknowledged())
    }

    @Test
    fun deleteOneTest() = runBlocking {
        // :snippet-start: delete
        val deleteId1 = DeleteOneModel<Person>(Filters.eq("_id", 1))
        val deleteAgeLt30 = DeleteManyModel<Person>(Filters.lt(Person::age.name, 30))
        // :snippet-end:
        // Junit test for the above code
        val deleteTest = collection.bulkWrite(listOf(deleteId1, deleteAgeLt30))
        assertTrue(deleteTest.wasAcknowledged())
        val expected = listOf(
            Person(2, "William Chin", 54),
        )
        assertEquals(expected, collection.find().toList())
    }

    @Test
    fun orderOfOperationsTest() = runBlocking {
        // :snippet-start: ordered
        val insertMdl = InsertOneModel(Person(6, "Zaynab Omar", 37))
        val replaceMdl = ReplaceOneModel(
            Filters.eq("_id", 1),
            Person(1, "Sandy Kane", location = "Helena, MT")
        )
        val updateMdl  = UpdateOneModel<Person>(
                Filters.eq("_id", 6),
                Updates.set(Person::name.name, "Zaynab Hassan")
            )
        val deleteMdl = DeleteManyModel<Person>(Filters.gt(Person::age.name, 50))

        val bulkOperations = listOf(
            insertMdl,
            replaceMdl,
            updateMdl,
            deleteMdl
        )

        val result = collection.bulkWrite(bulkOperations)
        // :snippet-end:
        // Junit test for the above code
        assertTrue(result.wasAcknowledged())
        collection.drop()
    }

    @Test
    fun unorderedExecutionTest() = runBlocking {
        val insertMdl = InsertOneModel(Person(6, "Zaynab Omar", 37))
        val replaceMdl = ReplaceOneModel(
            Filters.eq("_id", 1),
            Person(1, "Sandy Kane", location = "Helena, MT")
        )
        val updateMdl  = UpdateOneModel<Person>(
            Filters.eq("_id", 6),
            Updates.set(Person::name.name, "Zaynab Hassan")
        )
        val deleteMdl = DeleteManyModel<Person>(Filters.gt(Person::age.name, 50))

        val bulkOperations = listOf(
            insertMdl,
            replaceMdl,
            updateMdl,
            deleteMdl
        )
        // :snippet-start: unordered
        val options = BulkWriteOptions().ordered(false)
        val unorderedResult = collection.bulkWrite(bulkOperations, options)
        // :snippet-end:
        // Junit test for the above code
        assertTrue(unorderedResult.wasAcknowledged())
        collection.drop()
    }
}