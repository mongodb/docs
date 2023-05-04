
import com.mongodb.client.model.Filters
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

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
internal class QueryDocumentTest {
    // :snippet-start: query-data-model
    data class PaintOrder(
        @BsonId val id: Int,
        val qty: Int,
        val color: String,
        val vendor: List<String>,
        val rating: Int? = null
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
                    PaintOrder(1, 9, "red", listOf("A", "E")),
                    PaintOrder(2, 8, "purple", listOf("B", "D", "F"), 5),
                    PaintOrder(3, 5, "blue", listOf("A", "E")),
                    PaintOrder(4, 6, "white", listOf("D"), 9),
                    PaintOrder(5, 4, "yellow", listOf("A", "B")),
                    PaintOrder(6, 3, "pink", listOf("C")),
                    PaintOrder(7, 8, "green", listOf("C", "E"), 7),
                    PaintOrder(8, 7, "black", listOf("A", "C", "D"))
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
    fun comparisonTest() = runBlocking {
        // :snippet-start: comparison-filter
        val filter = Filters.gt("qty", 7)
        collection.find(filter).collect { println(it) }
        // :snippet-end:
        // Junit test for the above code
        val expected = listOf(
            PaintOrder(1, 9, "red", listOf("A", "E")),
            PaintOrder(2, 8, "purple", listOf("B", "D", "F"), 5),
            PaintOrder(7, 8, "green", listOf("C", "E"), 7)
        )
        assertEquals(expected, collection.find(filter).toList() )
    }

    @Test
    fun logicalTest() = runBlocking {
        // :snippet-start: logical-filter
        val filter = Filters.and(Filters.lte("qty", 5), Filters.ne("color", "pink"))
        collection.find(filter).collect { println(it) }
        // :snippet-end:
        // Junit test for the above code
        val expected = listOf(
            PaintOrder(3, 5, "blue", listOf("A", "E")),
            PaintOrder(5, 4, "yellow", listOf("A", "B"))
        )
        assertEquals(expected, collection.find(filter).toList() )
    }

    @Test
    fun arrayTest() = runBlocking {
        // :snippet-start: array-filter
        val filter = Filters.size("vendor", 3)
        collection.find(filter).collect { println(it) }
        // :snippet-end:
        // Junit test for the above code
        val expected = listOf(
            PaintOrder(2, 8, "purple", listOf("B", "D", "F"), 5),
            PaintOrder(8, 7, "black", listOf("A", "C", "D"))
        )
        assertEquals(expected, collection.find(filter).toList() )
    }

    @Test
    fun elementTest() = runBlocking {
        // :snippet-start: element-filter
        val filter = Filters.exists("rating")
        collection.find(filter).collect { println(it) }
        // :snippet-end:
        // Junit test for the above code
        val expected = listOf(
            PaintOrder(2, 8, "purple", listOf("B", "D", "F"), 5),
            PaintOrder(4, 6, "white", listOf("D"), 9),
            PaintOrder(7, 8, "green", listOf("C", "E"), 7)
        )
        assertEquals(expected, collection.find(filter).toList() )
    }

    @Test
    fun evaluationTest() = runBlocking {
        // :snippet-start: evaluation-filter
        val filter = Filters.regex("color", "k$")
        collection.find(filter).collect { println(it) }
        // :snippet-end:
        // Junit test for the above code
        val expected = listOf(
            PaintOrder(6, 3, "pink", listOf("C")),
            PaintOrder(8, 7, "black", listOf("A", "C", "D"))
        )
        assertEquals(expected, collection.find(filter).toList() )
    }
}