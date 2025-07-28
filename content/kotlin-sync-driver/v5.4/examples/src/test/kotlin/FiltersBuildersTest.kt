
import com.mongodb.client.model.Filters
import com.mongodb.client.model.geojson.Point
import com.mongodb.client.model.geojson.Polygon
import com.mongodb.client.model.geojson.Position
import com.mongodb.kotlin.client.coroutine.MongoClient
import config.getConfig
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.runBlocking
import org.bson.codecs.pojo.annotations.BsonId
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test

class FiltersBuildersTest {
    // :snippet-start: paint-order-data-class
    data class PaintOrder(
        @BsonId val id: Int,
        val qty: Int,
        val color: String,
        val vendors: List<String> = mutableListOf()
    )
    // :snippet-end:

    companion object {
        val config = getConfig()
        val client = MongoClient.create(config.connectionUri)
        val database = client.getDatabase("paints_r_us")
        val collection = database.getCollection<PaintOrder>("paints")

        @BeforeAll
        @JvmStatic
        fun beforeAll() {
            runBlocking {
                val paintOrders = listOf(
                    PaintOrder(1, 5, "red", listOf("A")),
                    PaintOrder(2, 10, "purple", listOf("C", "D")),
                    PaintOrder(3, 8, "blue", listOf("B", "A")),
                    PaintOrder(4, 6, "white", listOf("D")),
                    PaintOrder(5, 11, "yellow", listOf("A", "B")),
                    PaintOrder(6, 5, "pink", listOf("C")),
                    PaintOrder(7, 8, "green", listOf("B", "C")),
                    PaintOrder(8, 7, "orange", listOf("A", "D"))
                )
                collection.insertMany(paintOrders)
            }
        }

        @AfterAll
        @JvmStatic
        fun afterAll() {
            runBlocking {
                database.drop()
                client.close()
            }
        }
    }

    @Test
    fun equalComparisonTest() = runBlocking {
        // :snippet-start: equalComparison
        val equalComparison = Filters.eq(PaintOrder::qty.name, 5)
        val resultsFlow = collection.find(equalComparison)
        resultsFlow.collect { println(it) }
        // :snippet-end:
        assertEquals(2, resultsFlow.toList().size)
    }

    @Test
    fun gteComparisonTest() = runBlocking {
        // :snippet-start: gteComparison
        val gteComparison = Filters.gte(PaintOrder::qty.name, 10)
        val resultsFlow = collection.find(gteComparison)
        resultsFlow.collect { println(it) }
        // :snippet-end:
        assertEquals(2, resultsFlow.toList().size)
    }

    @Test
    fun emptyComparisonTest() = runBlocking {
        // :snippet-start: emptyComparison
        val emptyComparison = Filters.empty()
        val resultsFlow = collection.find(emptyComparison)
        resultsFlow.collect { println(it) }
        // :snippet-end:
        assertEquals(8, resultsFlow.toList().size)
    }

    @Test
    fun orComparisonTest() = runBlocking {
        // :snippet-start: orComparison
        val orComparison = Filters.or(
            Filters.gt(PaintOrder::qty.name, 8),
            Filters.eq(PaintOrder::color.name, "pink")
        )
        val resultsFlow = collection.find(orComparison)
        resultsFlow.collect { println(it) }
        // :snippet-end:
        assertEquals(3, resultsFlow.toList().size)
    }

    @Test
    fun allComparisonTest() = runBlocking {
        // :snippet-start: allComparison
        val search = listOf("A", "D")
        val allComparison = Filters.all(PaintOrder::vendors.name, search)
        val resultsFlow = collection.find(allComparison)
        resultsFlow.collect { println(it) }
        // :snippet-end:
        assertEquals(1, resultsFlow.toList().size)
    }

    @Test
    fun existsComparisonTest() = runBlocking {
        // :snippet-start: existsComparison
        val existsComparison = Filters.and(Filters.exists(PaintOrder::qty.name), Filters.nin("qty", 5, 8))
        val resultsFlow = collection.find(existsComparison)
        resultsFlow.collect { println(it) }
        // :snippet-end:
        assertEquals(4, resultsFlow.toList().size)
    }

    @Test
    fun regexComparisonTest() = runBlocking {
        // :snippet-start: regexComparison
        val regexComparison = Filters.regex(PaintOrder::color.name, "^p")
        val resultsFlow = collection.find(regexComparison)
        resultsFlow.collect { println(it) }
        // :snippet-end:
        assertEquals(2, resultsFlow.toList().size)
    }

    @Test
    fun bitsComparisonTest() = runBlocking {
        // :snippet-start: bitsComparison
        data class BinaryNumber(
            @BsonId val id: Int,
            val decimalValue: Int,
            val binaryValue: String
        )
        val binaryCollection = database.getCollection<BinaryNumber>("binary_numbers")
        // :remove-start:
        val binaryNumbers = listOf(
            BinaryNumber(1, 54, "00110110"),
            BinaryNumber(2, 20, "00010100"),
            BinaryNumber(3, 68, "1000100"),
            BinaryNumber(4, 102, "01100110")
        )
        binaryCollection.insertMany(binaryNumbers)
        // :remove-end:

        val bitmask = 34.toLong() // 00100010 in binary
        val bitsComparison = Filters.bitsAllSet(BinaryNumber::decimalValue.name, bitmask)
        val resultsFlow = binaryCollection.find(bitsComparison)
        resultsFlow.collect { println(it) }
        // :snippet-end:
        val expected = listOf(
            BinaryNumber(1, 54, "00110110"),
            BinaryNumber(4, 102, "01100110")
        )
        assertEquals(expected, resultsFlow.toList())
    }

    @Test
    fun geoWithinComparisonTest() = runBlocking {
        // :snippet-start: geoWithinComparison
        data class Store(
            @BsonId val id: Int,
            val name: String,
            val coordinates: Point
        )
        val collection = database.getCollection<Store>("stores")
        // :remove-start:
        val stores = listOf(
            Store(
                13,
                "Store 13",
                Point(Position(2.0, 2.0))
            ),
            Store(
                14,
                "Store 14",
                Point(Position(5.0, 6.0))
            ),
            Store(
                15,
                "Store 15",
                Point(Position(1.0, 3.0))
            ),
            Store(
                16,
                "Store 16",
                Point(Position(4.0, 7.0))
            )
        )
        collection.insertMany(stores)
        // :remove-end:

        val square = Polygon(listOf(
            Position(0.0, 0.0),
            Position(4.0, 0.0),
            Position(4.0, 4.0),
            Position(0.0, 4.0),
            Position(0.0, 0.0)))
        val geoWithinComparison = Filters.geoWithin(Store::coordinates.name, square)

        val resultsFlow = collection.find(geoWithinComparison)
        resultsFlow.collect { println(it) }
        // :snippet-end:
        assertEquals(2, resultsFlow.toList().size)
        assertEquals("Store 13", resultsFlow.firstOrNull()?.name)
    }
}