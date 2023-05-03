
import com.mongodb.client.model.Filters
import com.mongodb.client.model.UpdateOptions
import com.mongodb.client.model.Updates
import com.mongodb.kotlin.client.coroutine.MongoClient
import io.github.cdimascio.dotenv.dotenv
import kotlinx.coroutines.runBlocking
import org.bson.codecs.pojo.annotations.BsonId
import org.bson.types.ObjectId
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.TestInstance
import java.util.*
import kotlin.test.*

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
internal class UpsertTest {

    // :snippet-start: upsert-data-model
    data class PaintOrder(
        @BsonId val id: ObjectId = ObjectId(),
        val qty: Int,
        val color: String
    )
    // :snippet-end:

    companion object {
        val dotenv = dotenv()
        val client = MongoClient.create(dotenv["MONGODB_CONNECTION_URI"])
        val database = client.getDatabase("paint_store")
        val collection = database.getCollection<PaintOrder>("paint_order")

        @BeforeAll
        @JvmStatic
        private fun beforeAll() {
            runBlocking {
                val paintOrders = listOf(
                    PaintOrder(ObjectId(), 5, "red"),
                    PaintOrder(ObjectId(), 8, "purple"),
                    PaintOrder(ObjectId(), 0,  "blue"),
                    PaintOrder(ObjectId(), 0,  "white"),
                    PaintOrder(ObjectId(), 6,  "yellow"),
                    PaintOrder(ObjectId(), 0,  "pink"),
                    PaintOrder(ObjectId(), 0,  "green"),
                    PaintOrder(ObjectId(), 8,  "black")
                )
                collection.insertMany(paintOrders)
            }
        }

        @AfterAll
        @JvmStatic
        private fun afterAll() {
            runBlocking {
                collection.drop()
                client.close()
            }
        }
    }

    @Test
    fun insertUpdateTest() = runBlocking {
        // :snippet-start: upsert-update
        val filter = Filters.eq(PaintOrder::color.name, "orange")
        val update = Updates.inc(PaintOrder::qty.name, 10)
        val options = UpdateOptions().upsert(true)

        val results = collection.updateOne(filter, update, options)

        println(results)
        // :snippet-end:
        // Junit test for the above code
        assertTrue(results.wasAcknowledged())
        assertEquals(0, results.modifiedCount)
    }

    @Test
    fun updateOptionsTest() = runBlocking {
        // :snippet-start: no-options
        val filter = Filters.eq(PaintOrder::color.name, "orange")
        val update = Updates.inc(PaintOrder::qty.name, 10)

        val results = collection.updateOne(filter, update)

        println(results)
        // :snippet-end:
        assertTrue(results.wasAcknowledged())
        assertEquals(0, results.modifiedCount)
    }
}
