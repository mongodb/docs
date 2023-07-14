import com.mongodb.client.model.Aggregates
import com.mongodb.client.model.Filters
import com.mongodb.client.model.Indexes
import com.mongodb.client.model.Projections
import com.mongodb.client.model.Sorts
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
internal class SortTest {

    companion object {
        // :snippet-start: sort-data-model
        data class Order(
            @BsonId val id: Int,
            val date: String,
            val orderTotal: Double,
            val description: String,
        )
        // :snippet-end:

        val config = getConfig()
        val client = MongoClient.create(config.connectionUri)
        val database = client.getDatabase("testDB")
        val collection = database.getCollection<Order>("orders")

        @BeforeAll
        @JvmStatic
        fun beforeAll() {
            runBlocking {
                val orders = listOf(
                    Order(1, "2022-01-03", 17.86, "1/2 lb cream cheese and 1 dozen bagels"),
                    Order(2, "2022-01-11", 83.87, "two medium vanilla birthday cakes"),
                    Order(3, "2022-01-11",  19.49, "1 dozen vanilla cupcakes"),
                    Order(4, "2022-01-15", 43.62, "2 chicken lunches and a diet coke"),
                    Order(5, "2022-01-23", 60.31, "one large vanilla and chocolate cake"),
                    Order(6, "2022-01-23", 10.99, "1 bagel, 1 orange juice, 1 muffin")
                )
                collection.insertMany(orders)
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
        val resultsFlow = collection.find().sort(Sorts.ascending(Order::orderTotal.name))
        // :snippet-end:
        // Junit test for the above code
        val filter = Filters.empty()
        val expected = listOf(
            Order(6, "2022-01-23", 10.99, "1 bagel, 1 orange juice, 1 muffin"),
            Order(1, "2022-01-03", 17.86, "1/2 lb cream cheese and 1 dozen bagels"),
            Order(3, "2022-01-11",  19.49, "1 dozen vanilla cupcakes"),
            Order(4, "2022-01-15", 43.62, "2 chicken lunches and a diet coke"),
            Order(5, "2022-01-23", 60.31, "one large vanilla and chocolate cake"),
            Order(2, "2022-01-11", 83.87, "two medium vanilla birthday cakes")
        )

        assertEquals(expected, resultsFlow.toList() )
    }

    @Test
    fun aggregationSortTest() = runBlocking {
        // :snippet-start: aggregation-sort
        val resultsFlow = collection.aggregate(listOf(
            Aggregates.sort(Sorts.ascending(Order::orderTotal.name))
        ))

        resultsFlow.collect { println(it) }
        // :snippet-end:
        // Junit test for the above code
        val expected = listOf(
            Order(6, "2022-01-23", 10.99, "1 bagel, 1 orange juice, 1 muffin"),
            Order(1, "2022-01-03", 17.86, "1/2 lb cream cheese and 1 dozen bagels"),
            Order(3, "2022-01-11",  19.49, "1 dozen vanilla cupcakes"),
            Order(4, "2022-01-15", 43.62, "2 chicken lunches and a diet coke"),
            Order(5, "2022-01-23", 60.31, "one large vanilla and chocolate cake"),
            Order(2, "2022-01-11", 83.87, "two medium vanilla birthday cakes")
        )
        assertEquals(expected, resultsFlow.toList())
    }

    @Test
    fun ascendingSortTest() = runBlocking {
        // :snippet-start: ascending-sort
        val resultsFlow = collection.find()
            .sort(Sorts.ascending(Order::orderTotal.name))

        resultsFlow.collect { println(it) }
        // :snippet-end:
        // Junit test for the above code
        val expected = listOf(
            Order(6, "2022-01-23", 10.99, "1 bagel, 1 orange juice, 1 muffin"),
            Order(1, "2022-01-03", 17.86, "1/2 lb cream cheese and 1 dozen bagels"),
            Order(3, "2022-01-11",  19.49, "1 dozen vanilla cupcakes"),
            Order(4, "2022-01-15", 43.62, "2 chicken lunches and a diet coke"),
            Order(5, "2022-01-23", 60.31, "one large vanilla and chocolate cake"),
            Order(2, "2022-01-11", 83.87, "two medium vanilla birthday cakes")
        )
        assertEquals(expected, resultsFlow.toList())
    }

    @Test
    fun descendingSortTest() = runBlocking {
        // :snippet-start: descending-sort
        val resultsFlow = collection.find()
            .sort(Sorts.descending(Order::orderTotal.name))

        resultsFlow.collect { println(it) }
        // :snippet-end:
        // Junit test for the above code
        val expected = listOf(
            Order(2, "2022-01-11", 83.87, "two medium vanilla birthday cakes"),
            Order(5, "2022-01-23", 60.31, "one large vanilla and chocolate cake"),
            Order(4, "2022-01-15", 43.62, "2 chicken lunches and a diet coke"),
            Order(3, "2022-01-11",  19.49, "1 dozen vanilla cupcakes"),
            Order(1, "2022-01-03", 17.86, "1/2 lb cream cheese and 1 dozen bagels"),
            Order(6, "2022-01-23", 10.99, "1 bagel, 1 orange juice, 1 muffin")
        )
        assertEquals(expected, resultsFlow.toList())
    }

    @Test
    fun handleTiesTest() = runBlocking {
        // :snippet-start: handle-ties-1
        collection.find().sort(Sorts.ascending(Order::date.name))
        // :snippet-end:
        val results =
        // :snippet-start: handle-ties-2
        collection.find().sort(Sorts.ascending(Order::date.name, Order::orderTotal.name))
        // :snippet-end:
        // Junit test for the above code
        val filter = Filters.empty()
        val expected = listOf(
            Order(1, "2022-01-03", 17.86, "1/2 lb cream cheese and 1 dozen bagels"),
            Order(3, "2022-01-11",  19.49, "1 dozen vanilla cupcakes"),
            Order(2, "2022-01-11", 83.87, "two medium vanilla birthday cakes"),
            Order(4, "2022-01-15", 43.62, "2 chicken lunches and a diet coke"),
            Order(6, "2022-01-23", 10.99, "1 bagel, 1 orange juice, 1 muffin"),
            Order(5, "2022-01-23", 60.31, "one large vanilla and chocolate cake")
            )
        assertEquals(expected, results.toList() )
    }

    @Test
    fun combineSortTest() = runBlocking {
        // :snippet-start: combine-sort
        val orderBySort = Sorts.orderBy(
            Sorts.descending(Order::date.name), Sorts.ascending(Order::orderTotal.name)
        )
        val results = collection.find().sort(orderBySort)

        results.collect {println(it) }
        // :snippet-end:
        // Junit test for the above code
        val filter = Filters.empty()
        val expected = listOf(
            Order(6, "2022-01-23", 10.99, "1 bagel, 1 orange juice, 1 muffin"),
            Order(5, "2022-01-23", 60.31, "one large vanilla and chocolate cake"),
            Order(4, "2022-01-15", 43.62, "2 chicken lunches and a diet coke"),
            Order(3, "2022-01-11",  19.49, "1 dozen vanilla cupcakes"),
            Order(2, "2022-01-11", 83.87, "two medium vanilla birthday cakes"),
            Order(1, "2022-01-03", 17.86, "1/2 lb cream cheese and 1 dozen bagels"),
        )
        assertEquals(expected, results.toList() )
    }

    @Test
    fun textSearchTest() = runBlocking {
        // :snippet-start: food-order-score
        data class OrderScore(
           @BsonId val id: Int,
           val description: String,
           val score: Double
        )
        // :snippet-end:
        // :snippet-start: text-search
        collection.createIndex(Indexes.text(Order::description.name))
        val metaTextScoreSort = Sorts.orderBy(
            Sorts.metaTextScore(OrderScore::score.name),
            Sorts.descending("_id")
        )
        val metaTextScoreProj = Projections.metaTextScore(OrderScore::score.name)
        val searchTerm = "vanilla"
        val searchQuery = Filters.text(searchTerm)

        val results = collection.find<OrderScore>(searchQuery)
            .projection(metaTextScoreProj)
            .sort(metaTextScoreSort)

        results.collect { println(it) }
        // :snippet-end:
        // Junit test for the above code
        val expected = listOf(
            OrderScore(3, "1 dozen vanilla cupcakes", 0.625),
            OrderScore(5, "one large vanilla and chocolate cake", 0.6),
            OrderScore(2, "two medium vanilla birthday cakes", 0.6)
        )
        assertEquals(expected, results.toList())
    }
}