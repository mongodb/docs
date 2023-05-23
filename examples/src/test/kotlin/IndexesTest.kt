
import com.mongodb.DuplicateKeyException
import com.mongodb.MongoCommandException
import com.mongodb.client.model.*
import com.mongodb.client.model.geojson.Point
import com.mongodb.client.model.geojson.Position
import com.mongodb.kotlin.client.coroutine.MongoClient
import io.github.cdimascio.dotenv.dotenv
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.runBlocking
import org.bson.Document
import org.junit.jupiter.api.*
import org.junit.jupiter.api.Assertions.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertNotNull
import kotlin.test.assertTrue

// :replace-start: {
//    "terms": {
//       "CONNECTION_URI_PLACEHOLDER": "\"<connection string>\""
//    }
// }
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class IndexesTest {

    // :snippet-start: data-classes
    // Data class for the movies collection
    data class Movie(
        val title: String,
        val year: Int,
        val cast: List<String>,
        val genres: List<String>,
        val type: String,
        val rated: String,
        val plot: String,
        val fullplot: String,
    )

    // Data class for the theaters collection
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
                val city: String,
                val state: String,
                val zipcode: String
            )
        }
    }
    // :snippet-end:

    companion object {
        private val dotenv = dotenv()
        private val CONNECTION_URI_PLACEHOLDER = dotenv["MONGODB_CONNECTION_URI"]

        // :snippet-start: set-up
        val mongoClient = MongoClient.create(CONNECTION_URI_PLACEHOLDER)
        val database = mongoClient.getDatabase("sample_mflix")
        val moviesCollection = database.getCollection<Movie>("movies")
        val theatersCollection = database.getCollection<Theater>("theaters")
        // :snippet-end:

        @BeforeAll
        @JvmStatic
        fun beforeAll() {
            runBlocking {
                moviesCollection.insertMany(
                    listOf(
                        Movie(
                            title = "The Shawshank Redemption",
                            year = 1994,
                            cast = listOf("Tim Robbins", "Morgan Freeman", "Bob Gunton"),
                            genres = listOf("Drama"),
                            type = "movie",
                            rated = "R",
                            plot = "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
                            fullplot = "Andy Dufresne is sent to Shawshank Prison for the murder of his wife and her secret lover. He is very isolated and lonely at first, but realizes there is something deep inside your body that people can't touch or get to....'HOPE'. Andy becomes friends with prison 'fixer' Red, and Andy epitomizes why it is crucial to have dreams. His spirit and determination lead us into a world full of imagination, one filled with courage and desire. Will Andy ever realize his dreams?"
                        ),
                        Movie(
                            title = "The Godfather",
                            year = 1972,
                            cast = listOf("Marlon Brando", "Al Pacino", "James Caan"),
                            genres = listOf("Crime", "Drama"),
                            type = "movie",
                            rated = "R",
                            plot = "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
                            fullplot = "When the aging head of a famous crime family decides to transfer his position to one of his subalterns, a series of unfortunate events start happening to the family, and a war begins between all the well-known families leading to insolence, deportation, murder and revenge, and ends with the favorable successor being finally chosen."
                        ),
                        Movie(
                            title = "Pulp Fiction",
                            year = 1994,
                            cast = listOf("John Travolta", "Samuel L. Jackson", "Uma Thurman"),
                            genres = listOf("Crime", "Drama"),
                            type = "movie",
                            rated = "R",
                            plot = "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
                            fullplot = "Jules Winnfield and Vincent Vega are two hitmen who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace. Wallace has also asked Vincent to take his wife Mia out a few days later when Wallace himself will be out of town. Butch Coolidge is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents."
                        ),

                        Movie(
                            title = "The Dark Knight",
                            year = 2008,
                            cast = listOf("Christian Bale", "Heath Ledger", "Aaron Eckhart"),
                            genres = listOf("Action", "Crime", "Drama"),
                            type = "movie",
                            rated = "PG-13",
                            plot = "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
                            fullplot = "Set within a year after the events of Batman Begins, Batman, Lieutenant James Gordon, and new district attorney Harvey Dent successfully begin to round up the criminals that plague Gotham City until a mysterious and sadistic criminal mastermind known only as the Joker appears in Gotham, creating a new wave of chaos. Batman's struggle against the Joker becomes deeply personal, forcing him to 'confront everything he believes' and improve his technology to stop him. A love triangle develops between Bruce Wayne, Dent, and Rachel Dawes."
                        ),
                        Movie(
                            title = "Forrest Gump",
                            year = 1994,
                            cast = listOf("Tom Hanks", "Robin Wright", "Gary Sinise"),
                            genres = listOf("Drama", "Romance"),
                            type = "movie",
                            rated = "PG-13",
                            plot = "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
                            fullplot = "Forrest Gump is a simple man with a low IQ but good intentions. He is running through childhood with his best and only friend Jenny. His 'mama' teaches him the ways of life and leaves him to choose his destiny. Forrest joins the army for service in Vietnam, finding new friends called Dan and Bubba, he wins medals, creates a famous shrimp fishing fleet, inspires people to jog, starts a ping-pong craze, creates the smiley, writes bumper stickers and songs, donates to people and meets the president several times. However, this is all irrelevant to Forrest who can only think of his childhood sweetheart Jenny. Who has messed up her life. Although in the end, all he wants to prove is that anyone can love anyone."
                        )
                    )
                )
                theatersCollection.insertMany(
                    listOf(
                        Theater(
                            theaterId = 101,
                            location = Theater.Location(
                                address = Theater.Location.Address(
                                    street1 = "123 Broadway",
                                    city = "New York",
                                    state = "NY",
                                    zipcode = "10001"
                                ),
                                geo = Point(
                                    Position(
                                        -73.98500,
                                        40.7610
                                    )
                                )
                            )
                        ),
                        Theater(
                            theaterId = 102,
                            location = Theater.Location(
                                address = Theater.Location.Address(
                                    street1 = "456 Main Street",
                                    city = "Los Angeles",
                                    state = "CA",
                                    zipcode = "90001"
                                ),
                                geo = Point(
                                    Position(
                                        -118.24368,
                                        34.05223
                                    )
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
                moviesCollection.drop()
                theatersCollection.drop()
            }
            mongoClient.close()
        }
    }

    @AfterEach
    fun afterEach() {
        runBlocking {
            moviesCollection.dropIndexes()
            theatersCollection.dropIndexes()
        }
    }


    @Test
    fun singleIndexTest() = runBlocking {
        // :snippet-start: single-index-setup
        val resultCreateIndex = moviesCollection.createIndex(Indexes.ascending(Movie::title.name))
        println("Index created: $resultCreateIndex")
        // :snippet-end:
        assertEquals("title_1", resultCreateIndex)
        // :snippet-start: single-index-query
        val filter = Filters.eq(Movie::title.name, "The Dark Knight")
        val sort = Sorts.ascending(Movie::title.name)
        val projection = Projections.fields(
            Projections.include(Movie::title.name),
            Projections.excludeId()
        )

        data class Results(val title: String)

        val resultsFlow = moviesCollection.find<Results>(filter).sort(sort).projection(projection)

        resultsFlow.collect { println(it) }
        // :snippet-end:
        val results = resultsFlow.toList()
        assertTrue(results.any { it.title == "The Dark Knight" })
    }

    @Test
    fun compoundIndexTest() = runBlocking {
        // :snippet-start: compound-index-setup
        val resultCreateIndex = moviesCollection.createIndex(Indexes.ascending(Movie::type.name, Movie::rated.name))

        println("Index created: $resultCreateIndex")
        // :snippet-end:
        assertEquals("type_1_rated_1", resultCreateIndex)
        // :snippet-start: compound-index-query
        val filter = Filters.and(
            Filters.eq(Movie::type.name, "movie"),
            Filters.eq(Movie::rated.name, "G")
        )
        val sort = Sorts.ascending(Movie::type.name, Movie::rated.name)
        val projection = Projections.fields(
            Projections.include(Movie::type.name, Movie::rated.name),
            Projections.excludeId()
        )
        val resultsFlow = moviesCollection.find(filter).sort(sort).projection(projection)

        resultsFlow.collect { println(it) }
        // :snippet-end:
        val results = resultsFlow.toList()
        assertTrue(results.all { it.title == "Saving Private Ryan" })
    }

    @Test
    fun multiKeyIndexTest() = runBlocking {
        // :snippet-start: multikey-index-setup
        val resultCreateIndex =
            moviesCollection.createIndex(Indexes.ascending(Movie::rated.name, Movie::genres.name, Movie::title.name))

        println("Index created: $resultCreateIndex")
        // :snippet-end:
        assertEquals("rated_1_genres_1_title_1", resultCreateIndex)
        // :snippet-start: multikey-index-query
        val filter = Filters.and(
            Filters.eq(Movie::genres.name, "Animation"),
            Filters.eq(Movie::rated.name, "G")
        )
        val sort = Sorts.ascending(Movie::title.name)
        val projection = Projections.fields(
            Projections.include(Movie::title.name, Movie::rated.name),
            Projections.excludeId()
        )
        val resultsFlow = moviesCollection.find(filter).sort(sort).projection(projection)

        resultsFlow.collect { println(it) }
        // :snippet-end:
        val results = resultsFlow.toList()
        assertTrue(results.all { it.rated == "G" && it.genres.contains("Animation") })

    }

    @Test
    fun textIndexTest() = runBlocking {
        suspend fun generateTextIndex(): String {
            return (
                // :snippet-start: text-index-setup
                try {
                    val resultCreateIndex = moviesCollection.createIndex(Indexes.text(Movie::plot.name))
                    println("Index created: $resultCreateIndex")
                    resultCreateIndex // :remove:
                } catch (e: MongoCommandException) {
                    if (e.errorCodeName == "IndexOptionsConflict") {
                        println("there's an existing text index with different options")
                        return "EXPECTED_EXCEPTION" // :remove:
                    }
                    "UNEXPECTED_EXCEPTION" // :remove:
                }
                // :snippet-end:
            )

        }
        // Test successful index generation
        assertEquals("plot_text", generateTextIndex())
        // :snippet-start: text-index-query
        val filter = Filters.text("Batman")
        val projection = Projections.fields(
            Projections.include(Movie::fullplot.name),
            Projections.excludeId()
        )

        data class Results(val fullplot: String)

        val resultsFlow = moviesCollection.find<Results>(filter).projection(projection)

        resultsFlow.collect { println(it) }
        // :snippet-end:
        val results = resultsFlow.toList()
        assertTrue(results.any { it.fullplot.contains("district attorney Harvey Dent") })
        // Test duplicate index generation error
        moviesCollection.dropIndex("plot_text")
        moviesCollection.createIndex(Indexes.text(Movie::plot.name), IndexOptions().name("plot_text_1"))
        assertEquals("EXPECTED_EXCEPTION", generateTextIndex())
    }

    @Test
    fun textMultipleIndex() = runBlocking {
        suspend fun generateTextMultipleIndex(): String {
            return (
                // :snippet-start: text-multiple-index
                try {
                    val resultCreateIndex = moviesCollection.createIndex(
                        Indexes.compoundIndex(
                            Indexes.text(Movie::title.name), Indexes.text(Movie::genres.name)
                        )
                    )
                    println("Index created: $resultCreateIndex")
                    resultCreateIndex // :remove:
                } catch (e: MongoCommandException) {
                    if (e.errorCodeName == "IndexOptionsConflict") {
                        println("there's an existing text index with different options")
                        return "EXPECTED_EXCEPTION" // :remove:
                    }
                    "UNEXPECTED_EXCEPTION" // :remove:
                }
                // :snippet-end:
           )
        }
        // Test successful index generation
        assertEquals("title_text_genres_text", generateTextMultipleIndex())
        // Test duplicate index generation error
        moviesCollection.dropIndex("title_text_genres_text")
        moviesCollection.createIndex(Indexes.text(Movie::genres.name))
        assertEquals("EXPECTED_EXCEPTION", generateTextMultipleIndex())
    }

    @Test
    fun geoSpatialIndexTest() = runBlocking {
        // :snippet-start: geospatial-index-setup
        val resultCreateIndex = theatersCollection.createIndex(
            Indexes.geo2dsphere("${Theater::location.name}.${Theater.Location::geo.name}")
        )

        println("Index created: $resultCreateIndex")
        // :snippet-end:
        // Test that the index was created
        assertEquals("location.geo_2dsphere", resultCreateIndex)
        // :snippet-start: geospatial-index-query
        // MongoDB Headquarters in New York, NY.
        val refPoint = Point(Position(-73.98456, 40.7612))
        val filter = Filters.near(
            "${Theater::location.name}.${Theater.Location::geo.name}",
            refPoint, 1000.0, 0.0
        )
        val resultsFlow = theatersCollection.find(filter)

        resultsFlow.collect { println(it) }
        // :snippet-end:
        val results = resultsFlow.toList()
        assertTrue(results.isNotEmpty())
    }

    @Test
    fun uniqueIndex() = runBlocking {
        suspend fun executeCreateUniqueIndex(): String {
            return (
                // :snippet-start: unique-index
                try {
                    val indexOptions = IndexOptions().unique(true)
                    val resultCreateIndex = theatersCollection.createIndex(
                        Indexes.descending(Theater::theaterId.name), indexOptions
                    )
                    println("Index created: $resultCreateIndex")
                    resultCreateIndex // :remove:
                } catch (e: DuplicateKeyException) {
                    println("duplicate field values encountered, couldn't create index: \t${e.message}")
                    "EXCEPTION" // :remove:
                }
                // :snippet-end:
            )
        }

        // Test that the index was created successfully
        assertEquals("theaterId_-1", executeCreateUniqueIndex())
        val results = theatersCollection.find().toList()
        val theaterIds = results.map { it.theaterId }
        assertEquals(theaterIds.size, theaterIds.distinct().size)

        // Clear previous test's index
        theatersCollection.dropIndex("theaterId_-1")

        // Test that index creation fails when there are duplicate values
        val duplicateTheater = Theater(
            theaterId = 101,
            location = Theater.Location(
                address = Theater.Location.Address(
                    street1 = "123 Broadway",
                    city = "New York",
                    state = "NY",
                    zipcode = "10001"
                ),
                geo = Point(
                    Position(
                        -73.98500,
                        40.7610
                    )
                )
            )
        )
        theatersCollection.insertOne(duplicateTheater)
        assertEquals("EXCEPTION", executeCreateUniqueIndex())
    }

    @Test
    fun clusteredIndexesTest() = runBlocking {
        var vendorsCollection = database.getCollection<Document>("vendors")
        vendorsCollection.drop()
        // :snippet-start: clustered-indexes
        val clusteredIndexOptions = ClusteredIndexOptions(Document("_id", 1), true)
        val createCollectionOptions = CreateCollectionOptions().clusteredIndexOptions(clusteredIndexOptions)

        database.createCollection("vendors", createCollectionOptions)
        // :snippet-end:
        vendorsCollection = database.getCollection<Document>("vendors")
        val indexes = vendorsCollection.listIndexes().toList()
        println("INDEXES:: $indexes")
        val clusteredIndex = indexes.find { it.getString("name") == "_id_" }
        assertNotNull(clusteredIndex)
        assertEquals(Document("_id", 1), clusteredIndex["key"])
    }

    @Test
    fun dropIndexWithSpecificationDocumentTest() = runBlocking {
        moviesCollection.createIndex(Indexes.ascending(Movie::title.name))
        // :snippet-start: drop-index-with-specification-document
        moviesCollection.dropIndex(Indexes.ascending(Movie::title.name));
        // :snippet-end:
        val indexes = moviesCollection.listIndexes().toList()
        assertFalse(indexes.any { it.getString("name") == "title_1" })
    }

    @Test
    fun dropIndexWithNameTest() = runBlocking {
        moviesCollection.createIndex(Indexes.text("title"), IndexOptions().name("title_text"))
        // :snippet-start: list-indexes
        val indexes = moviesCollection.listIndexes()

        indexes.collect { println(it.toJson()) }
        // :snippet-end:
        // :snippet-start: drop-index-with-name
        moviesCollection.dropIndex("title_text")
        // :snippet-end:
        val indexesAfterDrop = moviesCollection.listIndexes().toList()
        assertFalse(indexesAfterDrop.any { it.getString("name") == "title_text" })
    }

    @Test
    fun dropAllIndexesTest() = runBlocking {
        moviesCollection.createIndex(Indexes.ascending("title"))
        moviesCollection.createIndex(Indexes.ascending("year"))
        // :snippet-start: drop-all-indexes
        moviesCollection.dropIndexes()
        // :snippet-end:
        // :snippet-start: drop-all-indexes-wildcard
        moviesCollection.dropIndex("*")
        // :snippet-end:
        val indexes = moviesCollection.listIndexes().toList()
        assertEquals(1, indexes.size)
        assertEquals("_id_", indexes.first().getString("name"))
    }
}
// :replace-end:
