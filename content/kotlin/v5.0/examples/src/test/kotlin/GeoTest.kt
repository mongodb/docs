
import com.mongodb.client.model.Filters
import com.mongodb.client.model.Indexes
import com.mongodb.client.model.Projections
import com.mongodb.client.model.geojson.Point
import com.mongodb.client.model.geojson.Polygon
import com.mongodb.client.model.geojson.Position
import com.mongodb.kotlin.client.coroutine.MongoClient
import config.getConfig
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.runBlocking
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
internal class SearchGeospatialTest {

    // :snippet-start: theater-data-class
    data class Theater(
        val theaterId: Int,
        val location: Location
    ) {
        data class Location(
            val address: Address,
            val geo: Point
        ) {
            data class Address(
                val street1: String,
                val street2: String? = null,
                val city: String,
                val state: String,
                val zipcode: String
            )
        }
    }
    // :snippet-end:

    // :snippet-start: results-data-class
    data class TheaterResults(
        val location: Location
    ) {
        data class Location(
            val address: Address
        ) {
            data class Address(
                val city: String
            )
        }
    }

    // :snippet-end:

    companion object {
        val config = getConfig()
        val client = MongoClient.create(config.connectionUri)
        val database = client.getDatabase("sample_mflix")
        val collection = database.getCollection<Theater>("theaters")


        @BeforeAll
        @JvmStatic
        fun beforeAll() {
            runBlocking {
                collection.insertMany(
                    listOf(
                        Theater(
                            theaterId = 1467,
                            location = Theater.Location(
                                address = Theater.Location.Address(
                                    street1 = "660 Sunrise Hwy",
                                    city = "Baldwin",
                                    state = "NY",
                                    zipcode = "11510"
                                ),
                                geo = Point(
                                    Position(-73.612717, 40.65556)
                                )
                            )
                        ),
                        Theater(
                            theaterId = 1940,
                            location = Theater.Location(
                                address = Theater.Location.Address(
                                    street1 = "One Sunrise Mall",
                                    street2 = "#2090",
                                    city = "Massapequa",
                                    state = "NY",
                                    zipcode = "11758"
                                ),
                                geo = Point(
                                    Position(-73.436827, 40.679252)
                                )
                            )
                        ),
                        Theater(
                            theaterId = 1172,
                            location = Theater.Location(
                                address = Theater.Location.Address(
                                    street1 = "610 Exterior Street",
                                    city = "Bronx",
                                    state = "NY",
                                    zipcode = "10451"
                                ),
                                geo = Point(
                                    Position(-73.9310055, 40.8172327)
                                )
                            )
                        ),
                        Theater(
                            theaterId = 1448,
                            location = Theater.Location(
                                address = Theater.Location.Address(
                                    street1 = "1880 Broadway",
                                    city = "New York",
                                    state = "NY",
                                    zipcode = "10023"
                                ),
                                geo = Point(
                                    Position(-73.982094, 40.769882)
                                )
                            )
                        ),
                        Theater(
                            theaterId = 1531,
                            location = Theater.Location(
                                address = Theater.Location.Address(
                                    street1 = "52 E 14th St",
                                    street2 = "#64",
                                    city = "New York",
                                    state = "NY",
                                    zipcode = "10003"
                                ),
                                geo = Point(
                                    Position(-73.9905737, 40.7349109)
                                )
                            )
                        ),
                        Theater(
                            theaterId = 1267,
                            location = Theater.Location(
                                address = Theater.Location.Address(
                                    street1 = "52 E 14th St",
                                    city = "Jersey City",
                                    state = "NJ",
                                    zipcode = "10003"
                                ),
                                geo = Point(
                                    Position(-73.9905737, 40.7349109)
                                )
                            )
                        ),
                        Theater(
                            theaterId = 1005,
                            location = Theater.Location(
                                address = Theater.Location.Address(
                                    street1 = "52 E 14th St",
                                    city = "Levittown",
                                    state = "NY",
                                    zipcode = "10003"
                                ),
                                geo = Point(
                                    Position(-73.9905737, 40.7349109)
                                )
                            )
                        ),
                        Theater(
                            theaterId = 1538,
                            location = Theater.Location(
                                address = Theater.Location.Address(
                                    street1 = "52 E 14th St",
                                    city = "Secaucus",
                                    state = "NY",
                                    zipcode = "10003"
                                ),
                                geo = Point(
                                    Position(-73.9905737, 40.7349109)
                                )
                            )
                        ),
                        Theater(
                            theaterId = 1250,
                            location = Theater.Location(
                                address = Theater.Location.Address(
                                    street1 = "52 E 14th St",
                                    city = "New York",
                                    state = "NY",
                                    zipcode = "10003"
                                ),
                                geo = Point(
                                    Position(-73.9905737, 40.7349109)
                                )
                            )
                        ),
                        Theater(
                            theaterId = 1081,
                            location = Theater.Location(
                                address = Theater.Location.Address(
                                    street1 = "52 E 14th St",
                                    city = "Long Island City",
                                    state = "NY",
                                    zipcode = "10003"
                                ),
                                geo = Point(
                                    Position(-73.9905737, 40.7349109)
                                )
                            )
                        ),
                        Theater(
                            theaterId = 1221,
                            location = Theater.Location(
                                address = Theater.Location.Address(
                                    street1 = "52 E 14th St",
                                    city = "Westbury",
                                    state = "NY",
                                    zipcode = "10003"
                                ),
                                geo = Point(
                                    Position(-73.9905737, 40.7349109)
                                )
                            )
                        ),
                        Theater(
                            theaterId = 1535,
                            location = Theater.Location(
                                address = Theater.Location.Address(
                                    street1 = "52 E 14th St",
                                    city = "Mount Vernon",
                                    state = "NY",
                                    zipcode = "10550"
                                ),
                                geo = Point(
                                    Position(-73.9905737, 40.7349109)
                                )
                            )
                        ),
                        Theater(
                            theaterId = 1581,
                            location = Theater.Location(
                                address = Theater.Location.Address(
                                    street1 = "52 E 14th St",
                                    street2 = "#22",
                                    city = "Elmhurst",
                                    state = "NY",
                                    zipcode = "11375"
                                ),
                                geo = Point(
                                    Position(-73.9875737, 40.7349109)
                                )
                            )
                        ),
                        Theater(
                            theaterId = 1098,
                            location = Theater.Location(
                                address = Theater.Location.Address(
                                    street1 = "108 Queens Blvd",
                                    city = "Elmhurst",
                                    state = "NY",
                                    zipcode = "11375"
                                ),
                                geo = Point(
                                    Position(-73.9905737, 40.73492209)
                                )
                            )
                        ),
                        Theater(
                            theaterId = 1012,
                            location = Theater.Location(
                                address = Theater.Location.Address(
                                    street1 = "28 Ulmer St",
                                    city = "Flushing",
                                    state = "NY",
                                    zipcode = "11354"
                                ),
                                geo = Point(
                                    Position(-73.95505737, 40.7349109)
                                )
                            )
                        ),
                        Theater(
                            theaterId = 1555,
                            location = Theater.Location(
                                address = Theater.Location.Address(
                                    street1 = "190 Horace Harding Expy",
                                    city = "Flushing",
                                    state = "NY",
                                    zipcode = "11365"
                                ),
                                geo = Point(
                                    Position(-73.9922737, 40.7349109)
                                )
                            )
                        ),
                        Theater(
                            theaterId = 1532,
                            location = Theater.Location(
                                address = Theater.Location.Address(
                                    street1 = "72 Main St",
                                    city = "Flushing",
                                    state = "NY",
                                    zipcode = "11367"
                                ),
                                geo = Point(
                                    Position(-73.9905717, 40.7349109)
                                )
                            )
                        )
                    )
                )
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

    @BeforeEach
    fun beforeEach() { runBlocking {
        collection.createIndex((Indexes.geo2dsphere("${Theater::location.name}.${Theater.Location::geo.name}")))
        collection.createIndex((Indexes.geo2d("coordinates")))
    }}

    @AfterEach
    fun afterEach() {
    runBlocking {
        collection.dropIndexes()
    }}

    @Test
    fun indexTest() = runBlocking {
        collection.dropIndexes()
        // :snippet-start: geo2dsphere-index
        collection.createIndex((Indexes.geo2dsphere("location.geo")))
        // :snippet-end:
        // :snippet-start: geo2d-index
        collection.createIndex((Indexes.geo2d("coordinates")))
        // :snippet-end:
        val results = collection.listIndexes().toList()
        assertTrue(results.isNotEmpty())
    }

    @Test
    fun geospatialQueryTest() = runBlocking {
        // :snippet-start: proximity-query
        val database = client.getDatabase("sample_mflix")
        val collection = database.getCollection<TheaterResults>("theaters")
        val centralPark = Point(Position(-73.9667, 40.78))
        val query = Filters.near(
            "${Theater::location.name}.${Theater.Location::geo.name}", centralPark, 10000.0, 5000.0
        )
        val projection = Projections.fields(
            Projections.include(
                "${Theater::location.name}.${Theater.Location::address.name}.${Theater.Location.Address::city.name}"),
            Projections.excludeId()
        )
        val resultsFlow = collection.find(query).projection(projection)

        resultsFlow.collect { println(it) }
        // :snippet-end:
        val results = resultsFlow.toList()
        assertTrue(results.any { it.location.address.city == "Bronx" })
    }

    @Test
    fun queryRangeTest() = runBlocking {
        // :snippet-start: query-range
        val longIslandTriangle = Polygon(
            listOf(
                Position(-72.0, 40.0),
                Position(-74.0, 41.0),
                Position(-72.0, 39.0),
                Position(-72.0, 40.0)
            )
        )
        val projection = Projections.fields(
            Projections.include(
                "${Theater::location.name}.${Theater.Location::address.name}.${Theater.Location.Address::city.name}"),
            Projections.excludeId()
        )
        val geoWithinComparison = Filters.geoWithin(
            "${Theater::location.name}.${Theater.Location::geo.name}", longIslandTriangle
        )
        val resultsFlow = collection.find<TheaterResults>(geoWithinComparison)
            .projection(projection)

        resultsFlow.collect { println(it) }
        // :snippet-end:
        val results = resultsFlow.toList()
        assertTrue(results.any { it.location.address.city == "Massapequa" })
    }
}