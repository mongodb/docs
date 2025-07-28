
import com.mongodb.client.model.Filters
import com.mongodb.client.model.UpdateOptions
import com.mongodb.client.model.Updates
import com.mongodb.kotlin.client.coroutine.MongoClient
import config.getConfig
import kotlinx.coroutines.runBlocking
import org.bson.codecs.pojo.annotations.BsonId
import org.bson.types.ObjectId
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import kotlin.test.assertEquals
import kotlin.test.assertTrue

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
        val config = getConfig()
        val client = MongoClient.create(config.connectionUri)
        val database = client.getDatabase("paint_store")
        val collection = database.getCollection<PaintOrder>("paint_order")

        @BeforeAll
        @JvmStatic
        fun beforeAll() {
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
        fun afterAll() {
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
