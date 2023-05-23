
import com.mongodb.MongoBulkWriteException
import com.mongodb.client.model.*
import com.mongodb.kotlin.client.coroutine.MongoClient
import io.github.cdimascio.dotenv.dotenv
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.runBlocking
import org.bson.codecs.pojo.annotations.BsonId
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.TestInstance
import java.util.*
import kotlin.test.*

// :snippet-start: bulk-data-model
data class SampleDoc(
    @BsonId val id: Int,
    val x: Int? = null
)
// :snippet-end:

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
internal class BulkTest {
    companion object {
        val dotenv = dotenv()
        val client = MongoClient.create(dotenv["MONGODB_CONNECTION_URI"])
        val database = client.getDatabase("sample_db")
        val collection = database.getCollection<SampleDoc>("sample_docs")

        @BeforeAll
        @JvmStatic
        fun beforeAll() {
            runBlocking {
                val sampleDocuments = listOf(
                    SampleDoc(1),
                    SampleDoc(2)
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
        val doc3 = InsertOneModel(SampleDoc(3))
        val doc4 = InsertOneModel(SampleDoc(4))
        // :snippet-end:
        // :snippet-start: bulk-write-exception
        val doc5 = InsertOneModel(SampleDoc(1))
        val doc6 = InsertOneModel(SampleDoc(3))
        try {
            val bulkOperations = listOf(
                (doc5),
                (doc6)
            )
            val bulkWrite = collection.bulkWrite(bulkOperations)
            assertFalse(bulkWrite.wasAcknowledged()) // :remove:
        } catch (e: MongoBulkWriteException) {
            println("A MongoBulkWriteException occurred with the following message: " + e.message)
        }
        // :snippet-end:
        // Junit test for the above code
        val expected = listOf(
            SampleDoc(1),
            SampleDoc(2)
        )
        assertEquals(expected, collection.find().toList())
    }

    @Test
    fun replaceOneTest() = runBlocking {
        // :snippet-start: replace-one
        val filter = Filters.eq("_id", 1)
        val insert = SampleDoc(1, 4)
        val doc = ReplaceOneModel(filter, insert)
        // :snippet-end:
        // Junit test for the above code
        val insertTest = collection.bulkWrite(listOf(doc))
        assertTrue(insertTest.wasAcknowledged())
    }

    @Test
    fun updateOneTest() = runBlocking {
        // :snippet-start: update-one
        val filter = Filters.eq("_id", 2)
        val update = Updates.set(SampleDoc::x.name, 8)
        val doc = UpdateOneModel<SampleDoc>(filter, update)
        // :snippet-end:
        // Junit test for the above code
        val updateTest = collection.bulkWrite(listOf(doc))
        assertTrue(updateTest.wasAcknowledged())
    }

    @Test
    fun deleteOneTest() = runBlocking {
        // :snippet-start: delete
        val filter = Filters.eq("_id", 1)
        val doc = DeleteOneModel<SampleDoc>(filter)
        // :snippet-end:
        // Junit test for the above code
        val deleteTest = collection.bulkWrite(listOf(doc))
        assertTrue(deleteTest.wasAcknowledged())
        assertTrue(collection.find(filter).toList().isEmpty())
    }

    @Test
    fun orderOfOperationsTest() = runBlocking {
        // :snippet-start: ordered
        val doc1= InsertOneModel(SampleDoc(3))
        val doc2 = ReplaceOneModel(
            Filters.eq("_id", 1),
            SampleDoc(1, 2)
        )
        val doc3  = UpdateOneModel<SampleDoc>(
                Filters.eq("_id", 3),
                Updates.set(SampleDoc::x.name, 2)
            )
        val doc4 = DeleteManyModel<SampleDoc>(Filters.eq(SampleDoc::x.name, 2))

        val bulkOperations = listOf(
            doc1,
            doc2,
            doc3,
            doc4
        )

        val update = collection.bulkWrite(bulkOperations)
        // :snippet-end:
        // Junit test for the above code
        assertTrue(update.wasAcknowledged())
    }

    @Test
    fun unorderedExecutionTest() = runBlocking {
        val doc1 = InsertOneModel(SampleDoc(3))
        val doc2 = ReplaceOneModel(
            Filters.eq("_id", 1),
            SampleDoc(1, 2)
        )
        val doc3 = UpdateOneModel<SampleDoc>(
                Filters.eq("_id", 3),
                Updates.set(SampleDoc::x.name, 2)
            )
        val doc4 = DeleteManyModel<SampleDoc>(Filters.eq(SampleDoc::x.name, 2))

        val bulkOperations = listOf(
            doc1,
            doc2,
            doc3,
            doc4
        )
        // :snippet-start: unordered
        val options = BulkWriteOptions().ordered(false)
        val unorderedUpdate = collection.bulkWrite(bulkOperations, options)
        // :snippet-end:
        // Junit test for the above code
        assertTrue(unorderedUpdate.wasAcknowledged())
    }
}