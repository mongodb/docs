
import com.mongodb.ExplainVerbosity
import com.mongodb.client.model.Accumulators
import com.mongodb.client.model.Aggregates
import com.mongodb.client.model.Filters
import com.mongodb.client.model.Projections
import com.mongodb.client.model.search.SearchOperator
import com.mongodb.client.model.search.SearchPath.fieldPath
import com.mongodb.kotlin.client.coroutine.MongoClient
import config.getConfig
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.runBlocking
import org.bson.Document
import org.bson.codecs.pojo.annotations.BsonId
import org.bson.conversions.Bson
import org.bson.json.JsonWriterSettings
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals
import kotlin.test.Ignore


class AggregationTest {
    // :snippet-start: aggregation-data-classes
    data class Restaurant(
        val name: String,
        val contact: Contact,
        val stars: Int,
        val categories: List<String>
    ) {
        data class Contact(
            val phone: String,
            val email: String,
            val location: List<Double>
        )
    }
    // :snippet-end:

    companion object {
        val config = getConfig()
        private val mongoClient = MongoClient.create(config.connectionUri)
        private val database = mongoClient.getDatabase("aggregation")
        val collection = database.getCollection<Restaurant>("restaurants")

        @BeforeAll
        @JvmStatic
        fun beforeAll() {
            runBlocking {
                val restaurants = listOf(
                    Restaurant(
                        "Sun Bakery Trattoria",
                        Restaurant.Contact(
                            "386-555-0189",
                            "SunBakeryTrattoria@example.org",
                            listOf(-74.0056649, 40.7452371)
                        ),
                        4,
                        listOf("Pizza", "Pasta", "Italian", "Coffee", "Sandwiches")
                    ),
                    Restaurant(
                        "Blue Bagels Grill",
                        Restaurant.Contact(
                            "786-555-0102",
                            "BlueBagelsGrill@example.com",
                            listOf(-73.92506, 40.8275556)
                        ),
                        3,
                        listOf("Bagels", "Cookies", "Sandwiches")
                    ),
                    Restaurant(
                        "XYZ Bagels Restaurant",
                        Restaurant.Contact(
                            "435-555-0190",
                            "XYZBagelsRestaurant@example.net",
                            listOf(-74.0707363, 40.59321569999999)
                        ),
                        4,
                        listOf("Bagels", "Sandwiches", "Coffee")
                    ),
                    Restaurant(
                        "Hot Bakery Cafe",
                        Restaurant.Contact(
                            "264-555-0171",
                            "HotBakeryCafe@example.net",
                            listOf(-73.96485799999999, 40.761899)
                        ),
                        4,
                        listOf("Bakery", "Cafe", "Coffee", "Dessert")
                    ),
                    Restaurant(
                        "Green Feast Pizzeria",
                        Restaurant.Contact(
                            "840-555-0102",
                            "GreenFeastPizzeria@example.com",
                            listOf(-74.1220973, 40.6129407)
                        ),
                        2,
                        listOf("Pizza", "Italian")
                    ),
                    Restaurant(
                        "ZZZ Pasta Buffet",
                        Restaurant.Contact(
                            "769-555-0152",
                            "ZZZPastaBuffet@example.com",
                            listOf(-73.9446421, 40.7253944)
                        ),
                        0,
                        listOf("Pasta", "Italian", "Buffet", "Cafeteria")
                    ),
                    Restaurant(
                        "XYZ Coffee Bar",
                        Restaurant.Contact("644-555-0193", "XYZCoffeeBar@example.net", listOf(-74.0166091, 40.6284767)),
                        5,
                        listOf("Coffee", "Cafe", "Bakery", "Chocolates")
                    ),
                    Restaurant(
                        "456 Steak Restaurant",
                        Restaurant.Contact(
                            "990-555-0165",
                            "456SteakRestaurant@example.com",
                            listOf(-73.9365108, 40.8497077)
                        ),
                        0,
                        listOf("Steak", "Seafood")
                    ),
                    Restaurant(
                        "456 Cookies Shop",
                        Restaurant.Contact(
                            "604-555-0149",
                            "456CookiesShop@example.org",
                            listOf(-73.8850023, 40.7494272)
                        ),
                        4,
                        listOf("Bakery", "Cookies", "Cake", "Coffee")
                    ),
                    Restaurant(
                        "XYZ Steak Buffet",
                        Restaurant.Contact(
                            "229-555-0197",
                            "XYZSteakBuffet@example.org",
                            listOf(-73.9799932, 40.7660886)
                        ),
                        3,
                        listOf("Steak", "Salad", "Chinese")
                    )
                )
                collection.insertMany(restaurants)
            }

        }

        @AfterAll
        @JvmStatic
        fun afterAll() {
            runBlocking {
                collection.drop()
                mongoClient.close()
            }
        }
    }

    @Test
    fun basicAggregationTest() = runBlocking {
        // :snippet-start: basic-aggregation
        data class Results(@BsonId val id: Int, val count: Int)

        val resultsFlow = collection.aggregate<Results>(
            listOf(
                Aggregates.match(Filters.eq(Restaurant::categories.name, "Bakery")),
                Aggregates.group(
                    "\$${Restaurant::stars.name}",
                    Accumulators.sum("count", 1)
                )
            )
        )

        resultsFlow.collect { println(it) }
        // :snippet-end:

        val result = resultsFlow.toList().sortedBy { it.id }
        assertEquals(2, result.size)
        assertEquals(4, result.firstOrNull()?.id)
        assertEquals(2, result.firstOrNull()?.count)
    }

    @Test
    fun aggregationExpressionsTest() = runBlocking {
        // :snippet-start: aggregation-expressions
        data class Results(val name: String, val firstCategory: String)

        val resultsFlow = collection.aggregate<Results>(
            listOf(
                Aggregates.project(
                    Projections.fields(
                        Projections.excludeId(),
                        Projections.include("name"),
                        Projections.computed(
                            "firstCategory",
                            Document("\$arrayElemAt", listOf("\$categories", 0))
                        )
                    )
                )
            )
        )

        resultsFlow.collect { println(it) }
        // :snippet-end:
        val results = resultsFlow.toList()

        assertEquals(10, results.size)
        assertEquals("Sun Bakery Trattoria", results.first().name)
        assertEquals("Pizza", results.first().firstCategory)
    }

    @Test
    fun explainAggregationTest() = runBlocking {
        // :snippet-start: explain-aggregation
        data class Results(val name: String, val count: Int)

        val explanation = collection.aggregate<Results>(
            listOf(
                Aggregates.match(Filters.eq(Restaurant::categories.name, "bakery")),
                Aggregates.group("\$${Restaurant::stars.name}", Accumulators.sum("count", 1))
            )
        ).explain(ExplainVerbosity.EXECUTION_STATS)

        // Prettyprint the output
        println(explanation.toJson(JsonWriterSettings.builder().indent(true).build()))
        // :snippet-end:
        val ok = explanation["ok"]
        assertEquals(1.0, ok)
    }

    @Test
    fun buildDocumentsTipTest() {
        val method1 =
            // :snippet-start: build-documents-tip
            Document("\$arrayElemAt", listOf("\$categories", 0))
        // is equivalent to
        val method2 = // :remove:
            Document.parse("{ \$arrayElemAt: ['\$categories', 0] }")
        // :snippet-end:
        // assert to test equivalency
        assertEquals(method1, method2)

    }
}
