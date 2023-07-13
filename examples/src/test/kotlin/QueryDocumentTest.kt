
import com.mongodb.client.model.Filters
import com.mongodb.kotlin.client.coroutine.MongoClient
import config.getConfig
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.runBlocking
import org.bson.codecs.pojo.annotations.BsonId
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import kotlin.test.assertEquals

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
        val config = getConfig()
        val client = MongoClient.create(config.connectionUri)
        val database = client.getDatabase("query_document")
        val collection = database.getCollection<PaintOrder>("paint_order")

        @BeforeAll
        @JvmStatic
        fun beforeAll() {
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
        fun afterAll() {
            runBlocking {
                collection.drop()
                client.close()
            }
        }
    }


    @Test
    fun comparisonQueryTest() = runBlocking {
        // :snippet-start: comparison-filter
        val filter = Filters.gt("qty", 7)
        val findFlow = collection.find(filter)
        findFlow.collect { println(it) }
        // :snippet-end:
        // Junit test for the above code
        val expected = listOf(
            PaintOrder(1, 9, "red", listOf("A", "E")),
            PaintOrder(2, 8, "purple", listOf("B", "D", "F"), 5),
            PaintOrder(7, 8, "green", listOf("C", "E"), 7)
        )
        assertEquals(expected, findFlow.toList() )
    }

    @Test
    fun logicalQueryTest() = runBlocking {
        // :snippet-start: logical-filter
        val filter = Filters.and(Filters.lte("qty", 5), Filters.ne("color", "pink"))
        val findFlow = collection.find(filter)
        findFlow.collect { println(it) }
        // :snippet-end:
        // Junit test for the above code
        val expected = listOf(
            PaintOrder(3, 5, "blue", listOf("A", "E")),
            PaintOrder(5, 4, "yellow", listOf("A", "B"))
        )
        assertEquals(expected, collection.find(filter).toList() )
    }

    @Test
    fun arrayQueryTest() = runBlocking {
        // :snippet-start: array-filter
        val filter = Filters.size("vendor", 3)
        val findFlow = collection.find(filter)
        findFlow.collect { println(it) }
        // :snippet-end:
        // Junit test for the above code
        val expected = listOf(
            PaintOrder(2, 8, "purple", listOf("B", "D", "F"), 5),
            PaintOrder(8, 7, "black", listOf("A", "C", "D"))
        )
        assertEquals(expected, findFlow.toList() )
    }

    @Test
    fun elementQueryTest() = runBlocking {
        // :snippet-start: element-filter
        val filter = Filters.exists("rating")
        val findFlow = collection.find(filter)
        findFlow.collect { println(it) }
        // :snippet-end:
        // Junit test for the above code
        val expected = listOf(
            PaintOrder(2, 8, "purple", listOf("B", "D", "F"), 5),
            PaintOrder(4, 6, "white", listOf("D"), 9),
            PaintOrder(7, 8, "green", listOf("C", "E"), 7)
        )
        assertEquals(expected, findFlow.toList() )
    }

    @Test
    fun evaluationQueryTest() = runBlocking {
        // :snippet-start: evaluation-filter
        val filter = Filters.regex("color", "k$")
        val findFlow = collection.find(filter)
        findFlow.collect { println(it) }
        // :snippet-end:
        // Junit test for the above code
        val expected = listOf(
            PaintOrder(6, 3, "pink", listOf("C")),
            PaintOrder(8, 7, "black", listOf("A", "C", "D"))
        )
        assertEquals(expected, findFlow.toList() )
    }
}