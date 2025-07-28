
import com.mongodb.client.model.Filters
import com.mongodb.client.model.Indexes
import com.mongodb.client.model.Projections
import com.mongodb.kotlin.client.coroutine.MongoClient
import config.getConfig
import kotlinx.coroutines.flow.drop
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.runBlocking
import org.bson.codecs.pojo.annotations.BsonId
import org.bson.types.ObjectId
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertNull


class ProjectionsBuildersTest {
    // :snippet-start: example-data-class
    data class YearlyTemperature(
        @BsonId val id: ObjectId,
        val year: Int,
        val type: String,
        val temperatures: List<MonthlyTemperature>
    ) {
        data class MonthlyTemperature(
            val month: String,
            val avg: Double
        )
    }
    // :snippet-end:

    companion object {
        val config = getConfig()
        val client = MongoClient.create(config.connectionUri)
        val database = client.getDatabase("weather")
        val collection = database.getCollection<YearlyTemperature>("temperatures")

        @BeforeAll
        @JvmStatic
        fun beforeAll() {
            runBlocking {
                val temperatures = listOf(
                    YearlyTemperature(
                        id = ObjectId(),
                        year = 2018,
                        type = "even number but not a leap year",
                        temperatures = listOf(
                            YearlyTemperature.MonthlyTemperature("January", 9.765),
                            YearlyTemperature.MonthlyTemperature("February", 9.675),
                            YearlyTemperature.MonthlyTemperature("March", 10.004),
                            YearlyTemperature.MonthlyTemperature("April", 9.983),
                            YearlyTemperature.MonthlyTemperature("May", 9.747),
                            YearlyTemperature.MonthlyTemperature("June", 9.65),
                            YearlyTemperature.MonthlyTemperature("July", 9.786),
                            YearlyTemperature.MonthlyTemperature("August", 9.617),
                            YearlyTemperature.MonthlyTemperature("September", 9.51),
                            YearlyTemperature.MonthlyTemperature("October", 10.042),
                            YearlyTemperature.MonthlyTemperature("November", 9.452),
                            YearlyTemperature.MonthlyTemperature("December", 9.86)
                        )
                    ),
                    YearlyTemperature(
                        id = ObjectId(),
                        year = 2019,
                        type = "odd number, can't be a leap year",
                        temperatures = listOf(
                            YearlyTemperature.MonthlyTemperature("January", 10.023),
                            YearlyTemperature.MonthlyTemperature("February", 9.808),
                            YearlyTemperature.MonthlyTemperature("March", 10.43),
                            YearlyTemperature.MonthlyTemperature("April", 10.175),
                            YearlyTemperature.MonthlyTemperature("May", 9.648),
                            YearlyTemperature.MonthlyTemperature("June", 9.686),
                            YearlyTemperature.MonthlyTemperature("July", 9.794),
                            YearlyTemperature.MonthlyTemperature("August", 9.741),
                            YearlyTemperature.MonthlyTemperature("September", 9.84),
                            YearlyTemperature.MonthlyTemperature("October", 10.15),
                            YearlyTemperature.MonthlyTemperature("November", 9.84),
                            YearlyTemperature.MonthlyTemperature("December", 10.366)
                        )
                    )
                )
                collection.insertMany(temperatures)
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
    fun includeOneTest() = runBlocking {
        // :snippet-start: include-one
        data class Results(@BsonId val id: ObjectId, val year: Int)

        val filter = Filters.empty()
        val projection = Projections.include(YearlyTemperature::year.name)
        val resultsFlow = collection.find<Results>(filter).projection(projection)
        resultsFlow.collect { println(it) }
        // :snippet-end:
        assertEquals(2018, resultsFlow.first().year)
        assertEquals(2019, resultsFlow.drop(1).first().year)
    }

    @Test
    fun includeManyTest() = runBlocking {
        // :snippet-start: include-many
        data class Results(@BsonId val id: ObjectId, val year: Int, val type: String)

        val filter = Filters.empty()
        val projection = Projections.include(YearlyTemperature::year.name, YearlyTemperature::type.name)
        val resultsFlow = collection.find<Results>(filter).projection(projection)
        resultsFlow.collect { println(it) }
        // :snippet-end:
        assertEquals(2018, resultsFlow.first().year)
        assertEquals(2019, resultsFlow.drop(1).first().year)
    }

    @Test
    fun excludeOneTest() = runBlocking {
        // :snippet-start: exclude-one
        data class Results(@BsonId val id: ObjectId, val year: Int, val type: String)
        val filter = Filters.empty()
        val projection = Projections.exclude(YearlyTemperature::temperatures.name)
        val resultsFlow = collection.find<Results>(filter).projection(projection)
        resultsFlow.collect { println(it) }
        // :snippet-end:
        assertEquals(2018, resultsFlow.first().year)
        assertEquals(2019, resultsFlow.drop(1).first().year)
        assertEquals(ObjectId::class, resultsFlow.first().id::class)
    }

    @Test
    fun excludeManyTest() = runBlocking {
        // :snippet-start: exclude-many
        data class Results(@BsonId val id: ObjectId, val year: Int)

        val filter = Filters.empty()
        val projection = Projections.exclude(YearlyTemperature::temperatures.name, YearlyTemperature::type.name)
        val resultsFlow = collection.find<Results>(filter).projection(projection)
        resultsFlow.collect { println(it) }
        // :snippet-end:
        assertEquals(2018, resultsFlow.first().year)
        assertEquals(2019, resultsFlow.drop(1).first().year)
    }

    @Test
    fun combineProjectionsTest() = runBlocking {
        // :snippet-start: combine-projections
        data class Results(val year: Int, val type: String)

        val filter = Filters.empty()
        val projection = Projections.fields(
            Projections.include(YearlyTemperature::year.name, YearlyTemperature::type.name),
            Projections.excludeId()
        )
        val resultsFlow = collection.find<Results>(filter).projection(projection)
        resultsFlow.collect { println(it) }
        // :snippet-end:
        assertEquals(2018, resultsFlow.first().year)
        assertEquals(2019, resultsFlow.drop(1).first().year)
    }

    @Test
    fun excludeIdTest() = runBlocking {
        // :snippet-start: exclude-id
        data class Results(val year: Int, val type: String, val temperatures: List<YearlyTemperature.MonthlyTemperature>)
        val filter = Filters.empty()
        val projection = Projections.excludeId()
        val resultsFlow = collection.find<Results>(filter).projection(projection)
        resultsFlow.collect { println(it) }
        // :snippet-end:
        assertEquals(2018, resultsFlow.first().year)
        assertEquals(2019, resultsFlow.drop(1).first().year)
    }

    @Test
    fun projectArrayElementMatchTest() = runBlocking {
        // :snippet-start: project-array-element-match
        data class Results(
            val year: Int,
            val temperatures: List<YearlyTemperature.MonthlyTemperature>?
        )

        val filter = Filters.empty()
        val projection = Projections.fields(
            Projections.include(YearlyTemperature::year.name),
            Projections.elemMatch(
                YearlyTemperature::temperatures.name,
                Filters.gt(YearlyTemperature.MonthlyTemperature::avg.name, 10.1)
            )
        )
        val resultsFlow = collection.find<Results>(filter).projection(projection)
        resultsFlow.collect { println(it) }
        // :snippet-end:
        assertNull(resultsFlow.first().temperatures)
        assertNotNull(resultsFlow.drop(1).first().temperatures)
        Unit
    }

    @Test
    fun elemMatchStringTest() = runBlocking {
        // :snippet-start: elem-match-string
        data class Results(
            val year: Int,
            val temperatures: List<YearlyTemperature.MonthlyTemperature>
        )

        val filter = Filters.gt(
            "${YearlyTemperature::temperatures.name}.${YearlyTemperature.MonthlyTemperature::avg.name}",
            10.1
        )
        val projection = Projections.fields(
            Projections.include(YearlyTemperature::year.name),
            Projections.elemMatch(YearlyTemperature::temperatures.name)
        )
        val resultsFlow = collection.find<Results>(filter).projection(projection)
        resultsFlow.collect { println(it) }
        // :snippet-end:
        assertNotNull(resultsFlow.first().temperatures)
        assertEquals(1, resultsFlow.toList().size)
    }

    @Test
    fun projectArraySliceTest() = runBlocking {
        // :snippet-start: project-array-slice
        data class Results(val temperatures: List<YearlyTemperature.MonthlyTemperature>)

        val filter = Filters.empty()
        // First half of the year
        val projection = Projections.fields(
            Projections.slice(YearlyTemperature::temperatures.name, 6),
            Projections.excludeId()
        )
        val resultsFlow = collection.find<Results>(filter)
            .projection(projection)
        resultsFlow.collect { println(it) }
        // :snippet-end:
        assertEquals(6, resultsFlow.first().temperatures.size)
        assertEquals(6, resultsFlow.drop(1).first().temperatures.size)
        assertEquals("January", resultsFlow.first().temperatures.first().month)
        assertEquals("June", resultsFlow.first().temperatures.last().month)
    }

    @Test
    fun projectArraySliceWithSkipTest() = runBlocking {
        // :snippet-start: project-array-slice-with-skip
        data class Results(val temperatures: List<YearlyTemperature.MonthlyTemperature>)

        val filter = Filters.empty()
        // Second half of the year
        val projection = Projections.fields(
            Projections.slice(YearlyTemperature::temperatures.name, 6, 6),
            Projections.excludeId()
        )
        val resultsFlow = collection.find<Results>(filter)
            .projection(projection)
        resultsFlow.collect { println(it) }
        // :snippet-end:
        assertEquals(6, resultsFlow.first().temperatures.size)
        assertEquals(6, resultsFlow.drop(1).first().temperatures.size)
        assertEquals("July", resultsFlow.first().temperatures.first().month)
        assertEquals("December", resultsFlow.first().temperatures.last().month)
    }

    @Test
    fun projectWithTextScoreTest() = runBlocking {
        collection.createIndex(Indexes.text("type"))
        // :snippet-start: project-with-text-score
        data class Results(val year: Int, val score: Double)

        val filter = Filters.text("even number")
        val projection = Projections.fields(
            Projections.include(YearlyTemperature::year.name),
            Projections.metaTextScore("score")
        )
        val resultsFlow = collection.find<Results>(filter).projection(projection)
        resultsFlow.collect { println(it) }
        // :snippet-end:
        val sortedResults = resultsFlow.toList().sortedBy { it.year }
        assertEquals(1.25, sortedResults.first().score)
        assertEquals(2018, sortedResults.first().year)
        assertEquals(0.625, sortedResults.drop(1).first().score)
        assertEquals(2019, sortedResults.drop(1).first().year)
    }
}