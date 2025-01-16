
import com.mongodb.client.model.Filters
import com.mongodb.client.model.ReplaceOptions
import com.mongodb.client.model.Sorts
import com.mongodb.client.model.UpdateOptions
import com.mongodb.client.model.Updates
import com.mongodb.kotlin.client.coroutine.MongoClient
import config.getConfig
import kotlinx.coroutines.runBlocking
import org.bson.codecs.pojo.annotations.BsonId
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
internal class ChangeTest {
    // :snippet-start: data-model
    data class PaintOrder(
        @BsonId val id: Int,
        val color: String,
        val qty: Int
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
                    PaintOrder(1, "red", 5),
                    PaintOrder(2, "purple", 8),
                    PaintOrder(3, "yellow", 0),
                    PaintOrder(4, "green", 6),
                    PaintOrder(5, "pink", 0)
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
    fun updateOneTest() = runBlocking {
        // :snippet-start: update-one
        val filter = Filters.eq(PaintOrder::color.name, "yellow")
        val update = Updates.inc(PaintOrder::qty.name, 1)
        val result = collection.updateOne(filter, update)

        println("Matched document count: $result.matchedCount")
        println("Modified document count: $result.modifiedCount")
        // :snippet-end:

        // :snippet-start: update-one-options
        val opts = UpdateOptions().sort(Sorts.ascending(PaintOrder::color.name))
        // :snippet-end:

        // Junit test for the above code
        assertEquals(1, result.modifiedCount)
    }
    @Test
    fun updateManyTest() = runBlocking {
        // :snippet-start: update-many
        val filter = Filters.empty()
        val update = Updates.inc(PaintOrder::qty.name, 20)
        val result = collection.updateMany(filter, update)

        println("Matched document count: $result.matchedCount")
        println("Modified document count: $result.modifiedCount")
        // :snippet-end:
        // Junit test for the above code
        assertEquals(5, result.modifiedCount)
    }

    @Test
    fun replaceOneTest() = runBlocking {
        // :snippet-start: replace-one
        val filter = Filters.eq(PaintOrder::color.name, "pink")
        val update = PaintOrder(5, "orange", 25)
        val result = collection.replaceOne(filter, update)

        println("Matched document count: $result.matchedCount")
        println("Modified document count: $result.modifiedCount")
        // :snippet-end:

        // :snippet-start: replace-one-options
        val opts = ReplaceOptions().sort(Sorts.ascending(PaintOrder::color.name))
        // :snippet-end:

        // Junit test for the above code
        assertEquals(1, result.modifiedCount)
    }
}
