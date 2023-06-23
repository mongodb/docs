
import com.mongodb.client.model.Aggregates
import com.mongodb.client.model.Filters
import com.mongodb.client.model.Sorts.descending
import com.mongodb.kotlin.client.coroutine.MongoClient
import config.getConfig
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
internal class SkipTest {
    // :snippet-start: skip-data-model
    data class PaintOrder(
        @BsonId val id: Int,
        val qty: Int,
        val color: String
    )
    // :snippet-end:
    companion object {
        val config = getConfig()
        val client = MongoClient.create(config.connectionUri)
        val database = client.getDatabase("skip")
        val collection = database.getCollection<PaintOrder>("paint_order")

        @BeforeAll
        @JvmStatic
        fun beforeAll() {
            runBlocking {

                val paintOrders = listOf(
                    PaintOrder(1, 5, "red"),
                    PaintOrder(2, 10, "purple"),
                    PaintOrder(3, 9, "blue"),
                    PaintOrder(4, 6, "white"),
                    PaintOrder(5, 11, "yellow"),
                    PaintOrder(6, 3, "pink"),
                    PaintOrder(7, 8, "green"),
                    PaintOrder(8, 7, "orange")
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
    fun basicSkipTest() = runBlocking {
        // :snippet-start: basic-skip
        collection.find().skip(2)
        // :snippet-end:

        // :snippet-start: aggregates-skip
        val filter = Filters.empty()
        val results = collection.aggregate(listOf(
            Aggregates.match(filter),
            Aggregates.skip(2))
        )
        // :snippet-end:

        // Junit test for the above code
        val expected = listOf(
            PaintOrder(3, 9, "blue"),
            PaintOrder(4, 6, "white"),
            PaintOrder(5, 11, "yellow"),
            PaintOrder(6, 3, "pink"),
            PaintOrder(7, 8, "green"),
            PaintOrder(8, 7, "orange")
        )
        assertEquals(expected, results.toList())
    }

    @Test
    fun findIterableTest() = runBlocking {
        // :snippet-start: find-iterable
        val filter = Filters.empty()
        val results = collection.find(filter)
            .sort(descending(PaintOrder::qty.name))
            .skip(5)
        results.collect { println(it) }
        // :snippet-end:
        // Junit test for the above code
        val expected = listOf(
            PaintOrder(4, 6, "white"),
            PaintOrder(1, 5, "red"),
            PaintOrder(6, 3, "pink")
        )
        assertEquals(expected, results.toList() )
    }

    @Test
    fun basicAggregationTest() = runBlocking {
        // :snippet-start: aggregation
        val filter = Filters.empty()
        val aggregate = listOf(
            Aggregates.match(filter),
            Aggregates.sort(descending(PaintOrder::qty.name)),
            Aggregates.skip(5)
        )
        val findFlow = collection.aggregate(aggregate)
        findFlow.collect { println(it) }
        // :snippet-end:

        // Junit test for the above code
        val expected = listOf(
            PaintOrder(4, 6, "white"),
            PaintOrder(1, 5, "red"),
            PaintOrder(6, 3, "pink")
        )
        assertEquals(expected, findFlow.toList())
    }

    @Test
    fun noResultsTest() = runBlocking {
        // :snippet-start: no-results
        val filter = Filters.empty()
        val emptyQuery = listOf(
            Aggregates.match(filter),
            Aggregates.sort(descending(PaintOrder::qty.name)),
            Aggregates.skip(9)
        )
        val findFlow = collection.aggregate(emptyQuery)
        findFlow.collect { println(it) }
        // :snippet-end:
        // Junit test for the above code
        assertTrue(findFlow.toList().isEmpty())
    }
}
