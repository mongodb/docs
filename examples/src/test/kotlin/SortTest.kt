
import com.mongodb.client.model.*
import com.mongodb.client.model.Sorts.*
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
internal class SortTest {

    companion object {
        // :snippet-start: sort-data-model
        data class FoodOrder(
            @BsonId val id: Int,
            val letter: String,
            val food: String
        )
        // :snippet-end:

        val dotenv = dotenv()
        val client = MongoClient.create(dotenv["MONGODB_CONNECTION_URI"])
        val database = client.getDatabase("cafe")
        val collection = database.getCollection<FoodOrder>("food_order")

        @BeforeAll
        @JvmStatic
        fun beforeAll() {
            runBlocking {
                val foodOrders = listOf(
                    FoodOrder(1, "c", "coffee with milk"),
                    FoodOrder(3, "a", "maple syrup"),
                    FoodOrder(4, "b", "coffee with sugar"),
                    FoodOrder(5, "a", "milk and cookies"),
                    FoodOrder(2, "a", "donuts and coffee"),
                    FoodOrder(6, "c", "maple donut")
                )
                collection.insertMany(foodOrders)
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
    fun basicSortTest() = runBlocking {
        // :snippet-start: basic-sort
        collection.find().sort(Sorts.ascending("_id"))
        // :snippet-end:
        // Junit test for the above code
        val filter = Filters.empty()
        val expected = listOf(
            FoodOrder(1, "c", "coffee with milk"),
            FoodOrder(2, "a", "donuts and coffee"),
            FoodOrder(3, "a", "maple syrup"),
            FoodOrder(4, "b", "coffee with sugar"),
            FoodOrder(5, "a", "milk and cookies"),
            FoodOrder(6, "c", "maple donut")

        )
        assertEquals(expected, collection.find(filter).sort((ascending("_id"))).toList() )
    }

    @Test
    fun aggregationSortTest() = runBlocking {
        // :snippet-start: aggregation-sort
        val resultsFlow = collection.aggregate(listOf(
            Aggregates.sort(Sorts.ascending("_id"))
        ))

        resultsFlow.collect { println(it) }
        // :snippet-end:
        // Junit test for the above code
        val expected = listOf(
            FoodOrder(1, "c", "coffee with milk"),
            FoodOrder(2, "a", "donuts and coffee"),
            FoodOrder(3, "a", "maple syrup"),
            FoodOrder(4, "b", "coffee with sugar"),
            FoodOrder(5, "a", "milk and cookies"),
            FoodOrder(6, "c", "maple donut")
        )
        assertEquals(expected, resultsFlow.toList())
    }

    @Test
    fun ascendingSortTest() = runBlocking {
        // :snippet-start: ascending-sort
        val resultsFlow = collection.find()
            .sort(Sorts.ascending("_id"))

        resultsFlow.collect { println(it) }
        // :snippet-end:
        // Junit test for the above code
        val expected = listOf(
            FoodOrder(1, "c", "coffee with milk"),
            FoodOrder(2, "a", "donuts and coffee"),
            FoodOrder(3, "a", "maple syrup"),
            FoodOrder(4, "b", "coffee with sugar"),
            FoodOrder(5, "a", "milk and cookies"),
            FoodOrder(6, "c", "maple donut")
        )
        assertEquals(expected, resultsFlow.toList())
    }

    @Test
    fun descendingSortTest() = runBlocking {
        // :snippet-start: descending-sort
        val resultsFlow = collection.find()
            .sort(Sorts.descending("_id"))

        resultsFlow.collect { println(it) }
        // :snippet-end:
        // Junit test for the above code
        val expected = listOf(
            FoodOrder(6, "c", "maple donut"),
            FoodOrder(5, "a", "milk and cookies"),
            FoodOrder(4, "b", "coffee with sugar"),
            FoodOrder(3, "a", "maple syrup"),
            FoodOrder(2, "a", "donuts and coffee"),
            FoodOrder(1, "c", "coffee with milk")
            )
        assertEquals(expected, resultsFlow.toList())
    }

    @Test
    fun handleTiesTest() = runBlocking {
        // :snippet-start: handle-ties-1
        collection.find().sort(Sorts.ascending(FoodOrder::letter.name))
        // :snippet-end:
        val results =
        // :snippet-start: handle-ties-2
        collection.find().sort(Sorts.ascending(FoodOrder::letter.name, "_id"))
        // :snippet-end:
        // Junit test for the above code
        val filter = Filters.empty()
        val expected = listOf(
            FoodOrder(2, "a", "donuts and coffee"),
            FoodOrder(3, "a", "maple syrup"),
            FoodOrder(5, "a", "milk and cookies"),
            FoodOrder(4, "b", "coffee with sugar"),
            FoodOrder(1, "c", "coffee with milk"),
            FoodOrder(6, "c", "maple donut")
        )
        assertEquals(expected, results.toList() )
    }

    @Test
    fun combineSortTest() = runBlocking {
        // :snippet-start: combine-sort
        val orderBySort = Sorts.orderBy(
            Sorts.descending(FoodOrder::letter.name), ascending("_id")
        )
        val results = collection.find().sort(orderBySort)

        results.collect {println(it) }
        // :snippet-end:
        // Junit test for the above code
        val filter = Filters.empty()
        val expected = listOf(
            FoodOrder(1, "c", "coffee with milk"),
            FoodOrder(6, "c", "maple donut"),
            FoodOrder(4, "b", "coffee with sugar"),
            FoodOrder(2, "a", "donuts and coffee"),
            FoodOrder(3, "a", "maple syrup"),
            FoodOrder(5, "a", "milk and cookies")
        )
        assertEquals(expected, results.toList() )
    }

    @Test
    fun textSearchTest() = runBlocking {
        // :snippet-start: food-order-score
        data class FoodOrderScore(
           @BsonId val id: Int,
            val letter: String,
            val food: String,
            val score: Double
        )
        // :snippet-end:
        // :snippet-start: text-search
        collection.createIndex(Indexes.text(FoodOrderScore::food.name))
        val metaTextScoreSort = Sorts.orderBy(
            Sorts.metaTextScore(FoodOrderScore::score.name),
            Sorts.descending("_id")
        )
        val metaTextScoreProj = Projections.metaTextScore(FoodOrderScore::score.name)
        val searchTerm = "maple donut"
        val searchQuery = Filters.text(searchTerm)

        val results = collection.find<FoodOrderScore>(searchQuery)
            .projection(metaTextScoreProj)
            .sort(metaTextScoreSort)

        results.collect { println(it) }
        // :snippet-end:
        // Junit test for the above code
        val expected = listOf(
            FoodOrderScore(6, "c", "maple donut",1.5),
            FoodOrderScore(3, "a", "maple syrup", 0.75),
            FoodOrderScore(2, "a", "donuts and coffee", 0.75),
            )
        assertEquals(expected, results.toList())
    }
}