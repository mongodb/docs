import com.mongodb.client.model.Accumulators
import com.mongodb.client.model.Aggregates
import com.mongodb.client.model.Filters
import com.mongodb.client.model.Sorts
import com.mongodb.kotlin.client.coroutine.MongoClient
import io.github.cdimascio.dotenv.dotenv
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.runBlocking
import org.bson.Document
import org.bson.codecs.pojo.annotations.BsonId
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.TestInstance
import java.util.*
import kotlin.test.*

// :snippet-start: retrieve-data-model
data class PaintOrder(
    @BsonId val id: Int,
    val qty: Int,
    val color: String
)
// :snippet-end:

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
internal class RetrieveDataTest {

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
                    PaintOrder(1, 10, "purple"),
                    PaintOrder(2, 8, "green"),
                    PaintOrder(3, 4, "purple"),
                    PaintOrder(4, 11, "green")
                )
                collection.insertMany(paintOrders)

            }
        }


        @AfterAll
        @JvmStatic
        private fun afterAll() {
            runBlocking {
                collection.deleteMany(Filters.empty())
                client.close()

            }
        }

    }


    @Test
    fun basicFindTest() = runBlocking {
        // :snippet-start: basic-find
        val filter = Filters.and(Filters.gt("qty", 3), Filters.lt("qty", 9))
        collection.find(filter).toList().forEach { println(it) }
        // :snippet-end:
        // Junit test for the above code
        val expected = listOf(
            PaintOrder(2, 8, "green"),
            PaintOrder(3, 4, "purple"),
        )
        assertEquals(expected, collection.find(filter).toList() )
    }

    @Test
    fun aggregationFindTest() = runBlocking {
        // :snippet-start: aggregation-find
        val filter = Filters.empty()
        val pipeline = listOf(
            Aggregates.match(filter),
            Aggregates.group("\$color", Accumulators.sum("qty", "\$qty")),
            Aggregates.sort(Sorts.descending("qty"))
        )
        collection.aggregate<Document>(pipeline).toList().forEach { println(it.toJson()) }
        // :snippet-end:
        // Junit test for the above code
        val expected = listOf(
            Document("_id", "green").append("qty", 19),
            Document("_id", "purple").append("qty", 14)
        )
        assertEquals(expected, collection.aggregate<Document>(pipeline).toList())
    }
}
