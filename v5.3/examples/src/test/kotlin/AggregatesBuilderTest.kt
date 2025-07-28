
import com.mongodb.MongoNamespace
import com.mongodb.client.model.Accumulators
import com.mongodb.client.model.Aggregates
import com.mongodb.client.model.BucketAutoOptions
import com.mongodb.client.model.BucketGranularity
import com.mongodb.client.model.BucketOptions
import com.mongodb.client.model.Facet
import com.mongodb.client.model.Field
import com.mongodb.client.model.Filters
import com.mongodb.client.model.GraphLookupOptions
import com.mongodb.client.model.IndexOptions
import com.mongodb.client.model.Indexes
import com.mongodb.client.model.MergeOptions
import com.mongodb.client.model.MongoTimeUnit
import com.mongodb.client.model.Projections
import com.mongodb.client.model.Sorts
import com.mongodb.client.model.UnwindOptions
import com.mongodb.client.model.Variable
import com.mongodb.client.model.WindowOutputFields
import com.mongodb.client.model.Windows
import com.mongodb.client.model.densify.DensifyOptions
import com.mongodb.client.model.densify.DensifyRange
import com.mongodb.client.model.fill.FillOptions
import com.mongodb.client.model.fill.FillOutputField
import com.mongodb.client.model.geojson.Point
import com.mongodb.client.model.geojson.Position
import com.mongodb.client.model.search.SearchOperator
import com.mongodb.client.model.search.SearchOptions
import com.mongodb.client.model.search.SearchPath
import com.mongodb.client.model.search.VectorSearchOptions.exactVectorSearchOptions
import com.mongodb.kotlin.client.coroutine.MongoClient
import config.getConfig
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.runBlocking
import org.bson.BinaryVector
import org.bson.Document
import org.bson.codecs.pojo.annotations.BsonId
import org.bson.types.ObjectId
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import java.time.LocalDateTime
import kotlin.test.Ignore
import kotlin.test.assertEquals

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class AggregatesBuilderTest {

    // :snippet-start: movie-data-class
    data class Movie(
        val title: String,
        val year: Int,
        val genres: List<String>,
        val rated: String,
        val plot: String,
        val runtime: Int,
        val imdb: IMDB
    ){
        data class IMDB(
            val rating: Double
        )
    }
    // :snippet-end:

    // :snippet-start: graph-data-class
    data class Users(
        val name: String,
        val friends: List<String>?,
        val hobbies: List<String>?
    )
    // :snippet-end:

    // :snippet-start: bucket-data-class
    data class Screen(
        val id: String,
        val screenSize: Int,
        val manufacturer: String,
        val price: Double
    )
    // :snippet-end:

    // :snippet-start: vector-search-data-class
    data class MovieAlt(
        val title: String,
        val year: Int,
        val plot: String,
        val plotEmbedding: List<Double>
    )
    // :snippet-end:

    companion object {
        val config = getConfig()
        private val client = MongoClient.create(config.connectionUri)
        private val database = client.getDatabase("aggregation")
        val movieCollection = database.getCollection<Movie>("movies")
        val contactsCollection = database.getCollection<Users>("contacts")
        val screenCollection = database.getCollection<Screen>("screens")

        // Notes about this collection:
        // It uses Atlas Search, configured through the Atlas UI. It has 2 standard indexes, named "title" and "year",
        // which are used the examples below.
        // There's some funkiness with adding data in the unit test file before it's been indexed.
        // If you add the data in the @BeforeAll block right before running the tests, the data doesn't get indexed in time.
        // This even occurs with a 5-second delay between adding the data and querying the index.
        // The solution is to add the data beforehand and just query it in this file.
        private val ftsDatabase = client.getDatabase("sample_mflix")
        val ftsCollection = ftsDatabase.getCollection<Movie>("movies")


        @BeforeAll
        @JvmStatic
        fun beforeAll() {
            runBlocking {
                val movies = listOf(Movie(title = "The Shawshank Redemption", year = 1994, genres = listOf("Drama"), rated = "R", plot = "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.", runtime = 142, imdb = Movie.IMDB(rating = 7.1)), Movie(title = "The Godfather", year = 1972, genres = listOf("Crime", "Drama"), rated = "R", plot = "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.", runtime = 175, imdb = Movie.IMDB(rating = 8.9)), Movie(title = "Pulp Fiction", year = 1994, genres = listOf("Crime", "Drama"), rated = "R", plot = "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.", runtime = 154, imdb = Movie.IMDB(rating = 5.3)), Movie(title = "The Dark Knight", year = 2008, genres = listOf("Action", "Crime", "Drama"), rated = "PG-13", plot = "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.", runtime = 154, imdb = Movie.IMDB(rating = 5.2)), Movie(title = "Forrest Gump", year = 1994, genres = listOf("Drama", "Romance"), rated = "PG-13", plot = "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.", runtime = 142, imdb = Movie.IMDB(rating = 6.1)), Movie(title = "The Matrix", year = 1999, genres = listOf("Action", "Sci-Fi"), rated = "R", plot = "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.", runtime = 136, imdb = Movie.IMDB(rating = 8.7)), Movie(title = "Fight Club", year = 1999, genres = listOf("Drama"), rated = "R", plot = "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.", runtime = 139, imdb = Movie.IMDB(rating = 8.8)), Movie(title = "The Sixth Sense", year = 1999, genres = listOf("Drama", "Mystery", "Thriller"), rated = "PG-13", plot = "A boy who communicates with spirits seeks the help of a disheartened child psychologist.", runtime = 107, imdb = Movie.IMDB(rating = 8.1)), Movie(title = "One Flew Over the Cuckoo's Nest", year = 1975, genres = listOf("Drama"), rated = "R", plot = "A criminal pleads insanity and is admitted to a mental institution, where he rebels against the oppressive nurse and rallies up the scared patients.", runtime = 133, imdb = Movie.IMDB(rating = 8.7)))
                movieCollection.insertMany(movies)

                val users = listOf(Users("Name1", listOf("Name2", "Name3"), listOf("golf", "reading")), Users("Name2", listOf("Name3", "Name4"), listOf("reading")), Users("Name3", listOf("Name1", "Name2"), listOf("golf", "reading")), Users("Name4", listOf("Name2"), listOf("reading")), Users("Name5", listOf("Name2", "Name3"), listOf("golf", "reading")), Users("Name6", listOf("Name4", "Name5"), listOf("reading")))
                contactsCollection.insertMany(users)

                val screens = listOf(Screen("1", 15,  "Manufacturer A", 100.00), Screen("2", 27,  "Manufacturer B", 250.00), Screen("3", 45,  "Manufacturer C", 750.00), Screen("4", 72,  "Manufacturer D", 1950.00), Screen("5", 500,  "Manufacturer E", 5000.00))
                screenCollection.insertMany(screens)

                // Note that this collection and DB aren't dropped. It seems when they're dropped, it also drops the Atlas Search index.
                val backToTheFuture = ftsCollection.find(Filters.eq(Movie::title.name, "Back to the Future")).firstOrNull()
                if(backToTheFuture == null)
                    ftsCollection.insertOne(Movie(title = "Back to the Future", year = 1985, genres = listOf("Adventure", "Comedy", "Sci-Fi"), rated = "PG", plot = "Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean.", runtime = 116, imdb = Movie.IMDB(rating = 8.5)))
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
    fun methodsTest() = runBlocking {
        val collection = database.getCollection<Document>("someCollection")
        collection.insertOne(Document("someField", "someCriteria"))
        // :snippet-start: methods-example
        val matchStage = Aggregates.match(Filters.eq("someField", "someCriteria"))
        val sortByCountStage = Aggregates.sortByCount("\$someField")
        val results = collection.aggregate(
            listOf(matchStage, sortByCountStage)).toList()
        // :snippet-end:
        assertEquals(1, results.size)
    }

    @Test
    fun matchTest()  = runBlocking {
         val match = movieCollection.aggregate<Movie>(listOf(
             // :snippet-start: match
            Aggregates.match(Filters.eq(Movie::title.name, "The Shawshank Redemption"))
             // :snippet-end:
        ))
        assertEquals("The Shawshank Redemption", match.toList().first().title)
    }

    @Test
    fun projectTest()  = runBlocking {
        data class Results(val title: String, val plot: String)
        val project = movieCollection.aggregate<Results>(
            listOf(
                // :snippet-start: project
                Aggregates.project(
                    Projections.fields(
                        Projections.include(Movie::title.name, Movie::plot.name),
                        Projections.excludeId())
                )
                // :snippet-end:
            ))
        assertEquals("The Shawshank Redemption", project.toList().first().title)
    }

    @Test
    fun projectComputeTest()  = runBlocking {
        data class Results(val rating: String)
        val compute = movieCollection.aggregate<Results>(
            listOf(
                // :snippet-start: project-computed
                Aggregates.project(
                    Projections.fields(
                        Projections.computed("rating", "\$${Movie::rated.name}"),
                        Projections.excludeId()
                    )
                )
                // :snippet-end:
            ))
        assertEquals(9, compute.toList().size)
    }

    @Test
    fun documentsTest() = runBlocking {
        // :snippet-start: doc-important
        val docsStage = database.aggregate<Document>( // ... )
            // :snippet-end:
            listOf(
                // :snippet-start: documents
                Aggregates.documents(
                    listOf(
                        Document(Movie::title.name, "Steel Magnolias"),
                        Document(Movie::title.name, "Back to the Future"),
                        Document(Movie::title.name, "Jurassic Park")
                    )
                )
                // :snippet-end:
        ))
        assertEquals(3, docsStage.toList().size)
    }

    @Test
    fun sampleTest() = runBlocking {
        val sample = movieCollection.aggregate<Movie>(
            listOf(
                // :snippet-start: sample
                Aggregates.sample(5)
                // :snippet-end:
            ))
        assertEquals(5, sample.toList().size)
    }

    @Test
    fun sortTest() = runBlocking {
        val sort = movieCollection.aggregate<Movie>(
            listOf(
                // :snippet-start: sort
                Aggregates.sort(
                    Sorts.orderBy(
                        Sorts.descending(Movie::year.name),
                        Sorts.ascending(Movie::title.name)
                    )
                )
                // :snippet-end:
            )
        )
        assertEquals("The Dark Knight", sort.toList().first().title)
    }

    @Test
    fun skipTest() = runBlocking {
        val skip = movieCollection.aggregate<Movie>(listOf(
            // :snippet-start: skip
            Aggregates.skip(5)
            // :snippet-end:
        ))
        assertEquals(4, skip.toList().size)
    }

    @Test
    fun limitTest() = runBlocking {
        val limit = movieCollection.aggregate<Movie>(listOf(
            // :snippet-start: limit
            Aggregates.limit(4)
            // :snippet-end:
        ))
        assertEquals(4, limit.toList().size)
    }

    @Test
    fun lookupTest() = runBlocking {
        data class Comment(@BsonId val id: ObjectId, val name: String, val movie_id: Int, val text: String)
        data class Results(@BsonId val id: Int, val title: String, val year: Int, val cast: List<String>, val genres: List<String>, val type: String, val rated: String, val plot: String, val fullplot: String, val runtime: Int, val imdb: Movie.IMDB, val joined_comments: List<Comment>)
        val commentCollection = database.getCollection<Comment>("comments")

        val comments = listOf(
            Comment(id = ObjectId(), name = "John Doe", movie_id = 1, text = "This is a great movie. I enjoyed it a lot."),
            Comment(id = ObjectId(), name = "Andrea Le", movie_id = 1, text = "Rem officiis eaque repellendus amet eos doloribus."),
            Comment(id = ObjectId(), name = "Jane Doe", movie_id = 2, text = "I didn't like this movie. It was boring and predictable."),
            Comment(id = ObjectId(), name = "Bob Smith", movie_id = 3, text = "This movie is a masterpiece. Highly recommended."))
        commentCollection.insertMany(comments)

        val lookup = movieCollection.aggregate<Document>(listOf(
            // :snippet-start: lookup
            Aggregates.lookup(
                "comments",
                "_id",
                "movie_id",
                "joined_comments"
            )
            // :snippet-end:
        ))
        assertEquals(9, lookup.toList().size)
        assertEquals("The Shawshank Redemption", lookup.toList().first()["title"])
    }

    @Test
    fun lookupFullJoinTest() = runBlocking {
        // :snippet-start: lookup-data-classes
        data class Order(
            @BsonId val id: Int,
            val customerId: Int,
            val item: String,
            val ordered: Int
        )
        data class Inventory(
            @BsonId val id: Int,
            val stockItem: String,
            val inStock: Int
        )
        // :snippet-end:
        data class StockData(val inStock: Int)
        data class Results(val item: String, val ordered: Int, val stockData: List<StockData>)

        val orderCollection = database.getCollection<Order>("orders")
        val warehouseCollection = database.getCollection<Inventory>("warehouses")

        val orders = listOf(Order(1, 1, "item1", 5), Order(2, 1, "item2", 5), Order(3, 1, "item3", 5))
        val inventory= listOf(Inventory(1, "item1", 10), Inventory(2, "item2", 20), Inventory(3, "item3", 30))

        orderCollection.insertMany(orders)
        warehouseCollection.insertMany(inventory)
        // :snippet-start: lookup-full-join
        val variables = listOf(
            Variable("order_item", "\$item"),
            Variable("order_qty", "\$ordered")
        )
        val pipeline = listOf(
            Aggregates.match(
                Filters.expr(
                    Document("\$and", listOf(
                        Document("\$eq", listOf("$\$order_item", "\$${Inventory::stockItem.name}")),
                        Document("\$gte", listOf("\$${Inventory::inStock.name}", "$\$order_qty"))
                    ))
                )
            ),
            Aggregates.project(
                Projections.fields(
                    Projections.exclude(Order::customerId.name, Inventory::stockItem.name),
                    Projections.excludeId()
                )
            )
        )
        val innerJoinLookup =
            Aggregates.lookup("warehouses", variables, pipeline, "stockData")
        // :snippet-end:
        val resultsCollection = database.getCollection<Results>("orders")
        val result = resultsCollection.aggregate<Results>(listOf(innerJoinLookup)).toList()
        val expected = listOf(
            Results("item1", 5, listOf(StockData(10))),
            Results("item2", 5, listOf(StockData(20))),
            Results("item3", 5, listOf(StockData(30)))
        )
        assertEquals(expected, result)

        // cleanup
        warehouseCollection.drop()
        orderCollection.drop()
    }

    @Test
    fun groupTest() = runBlocking {
        data class Order(@BsonId val id: Int, val customerId: Int, val item: String, val ordered: Int)

        val orderCollection = database.getCollection<Order>("orders")
        val orders = listOf(Order(1, 1, "Item1", 1), Order(2, 1, "Item2", 10), Order(3, 2, "Item3", 5), Order(4, 2, "Item4" , 50))
        orderCollection.insertMany(orders)

        data class Results(val totalQuantity: Int, val averageQuantity: Double)

        val grouping = orderCollection.aggregate<Results>(listOf(
            // :snippet-start: group
            Aggregates.group("\$${Order::customerId.name}",
                Accumulators.sum("totalQuantity", "\$${Order::ordered.name}"),
                Accumulators.avg("averageQuantity", "\$${Order::ordered.name}")
            )
            // :snippet-end:
        ))
        val expected = listOf(
            Results(55, 27.5),
            Results(11, 5.5)
        )
        assertEquals(expected, grouping.toList().sortedByDescending { it.totalQuantity })
        orderCollection.drop()
    }

    @Test
    fun minNTest() = runBlocking {
        data class Results(val lowestThreeRatings: List<Double>)

        val resultsFlow = movieCollection.aggregate<Results>(listOf(
                // :snippet-start: minN
                Aggregates.group(
                    "\$${Movie::year.name}",
                    Accumulators.minN(
                        "lowestThreeRatings",
                        "\$${Movie::imdb.name}.${Movie.IMDB::rating.name}",
                        3
                    )
                )
                // :snippet-end:
        ))
        assertEquals(5, resultsFlow.toList().size)
    }

    @Test
    fun maxNTest() = runBlocking {
        data class Results(val highestTwoRatings: List<Double>)

        val resultsFlow = movieCollection.aggregate<Results>(listOf(
                // :snippet-start: maxN
                Aggregates.group(
                    "\$${Movie::year.name}",
                    Accumulators.maxN(
                        "highestTwoRatings",
                        "\$${Movie::imdb.name}.${Movie.IMDB::rating.name}",
                        2
                    )
                )
                // :snippet-end:
        ))
        assertEquals(5, resultsFlow.toList().size)
    }

    @Test
    fun firstNTest() = runBlocking {
        data class Results(val firstTwoMovies: List<String>)

        val resultsFlow = movieCollection.aggregate<Results>(listOf(
                // :snippet-start: firstN
                Aggregates.group(
                    "\$${Movie::year.name}",
                    Accumulators.firstN(
                        "firstTwoMovies",
                        "\$${Movie::title.name}",
                        2
                    )
                )
                // :snippet-end:
            ))
        println(resultsFlow.toList())
        assertEquals(5, resultsFlow.toList().size)

    }

    @Test
    fun lastNTest() = runBlocking {
        data class Results(val lastThreeMovies: List<String>)

        val resultsFlow = movieCollection.aggregate<Results>(listOf(
                // :snippet-start: lastN
                Aggregates.group(
                    "\$${Movie::year.name}",
                    Accumulators.lastN(
                        "lastThreeMovies",
                        "\$${Movie::title.name}",
                        3
                    )
                )
                // :snippet-end:
            )
        )
        assertEquals(5, resultsFlow.toList().size)
    }

    @Test
    fun topTest() = runBlocking {
        data class LowestRated(val title: String, val runtime: Int)
        data class Results(val lowestRatedTwoMovies: List<LowestRated>)
        // TODO ERROR: Unable to decode lowestRatedTwoMovies for Results data class -- using Document for this and subsequent top tests
        val resultsFlow = movieCollection.aggregate<Document>(listOf(
                // :snippet-start: top
                Aggregates.group(
                    "\$${Movie::year.name}",
                    Accumulators.top(
                        "topRatedMovie",
                        Sorts.descending("${Movie::imdb.name}.${Movie.IMDB::rating.name}"),
                        listOf("\$${Movie::title.name}", "\$${Movie::imdb.name}.${Movie.IMDB::rating.name}")
                    )
                )
                // :snippet-end:
            ))
        assertEquals(5, resultsFlow.toList().size)
    }

    @Test
    fun topNTest() = runBlocking {
        val resultsFlow = movieCollection.aggregate<Document>(listOf(
                // :snippet-start: topN
                Aggregates.group(
                    "\$${Movie::year.name}",
                    Accumulators.topN(
                        "longestThreeMovies",
                        Sorts.descending(Movie::runtime.name),
                        listOf("\$${Movie::title.name}", "\$${Movie::runtime.name}"),
                        3
                    )
                )
                // :snippet-end:
            ))
        assertEquals(5, resultsFlow.toList().size)
    }

    @Test
    fun bottomTest() = runBlocking {
        val resultsFlow = movieCollection.aggregate<Document>(listOf(
                // :snippet-start: bottom
                Aggregates.group(
                    "\$${Movie::year.name}",
                    Accumulators.bottom(
                        "shortestMovies",
                        Sorts.descending(Movie::runtime.name),
                        listOf("\$${Movie::title.name}", "\$${Movie::runtime.name}")
                    )
                )
                // :snippet-end:
            ))
        assertEquals(5, resultsFlow.toList().size)
    }

    @Test
    fun bottomNTest() = runBlocking {
        val resultsFlow = movieCollection.aggregate<Document>(listOf(
                // :snippet-start: bottomN
                Aggregates.group(
                    "\$${Movie::year.name}",
                    Accumulators.bottom(
                        "lowestRatedTwoMovies",
                        Sorts.descending("${Movie::imdb.name}.${Movie.IMDB::rating.name}"),
                        listOf("\$${Movie::title.name}", "\$${Movie::imdb.name}.${Movie.IMDB::rating.name}"),
                    )
                )
                // :snippet-end:
            ))
        assertEquals(5, resultsFlow.toList().size)
    }

    @Test
    fun unwindTest() = runBlocking {
        val resultsFlow = movieCollection.aggregate<Document>(listOf(
            // aggregate content to unwind
            Aggregates.group("\$${Movie::year.name}", Accumulators.bottom("lowestRatedTwoMovies", Sorts.descending("${Movie::imdb.name}.${Movie.IMDB::rating.name}"), listOf("\$${Movie::title.name}", "\$${Movie::imdb.name}.${Movie.IMDB::rating.name}"))),
                // :snippet-start: unwind
                Aggregates.unwind("\$${"lowestRatedTwoMovies"}")
                // :snippet-end:
            ))
        assertEquals(10, resultsFlow.toList().size)
    }

    @Test
    fun unwindOptionsTest() = runBlocking {
        val resultsFlow = movieCollection.aggregate<Document>(listOf(
            // aggregate content to unwind
            Aggregates.group("\$${Movie::year.name}", Accumulators.bottom("lowestRatedTwoMovies", Sorts.descending("${Movie::imdb.name}.${Movie.IMDB::rating.name}"), listOf("\$${Movie::title.name}", "\$${Movie::imdb.name}.${Movie.IMDB::rating.name}"))),
                // :snippet-start: unwind-options
                Aggregates.unwind(
                    "\$${"lowestRatedTwoMovies"}",
                    UnwindOptions().preserveNullAndEmptyArrays(true)
                )
                // :snippet-end:
            ))
        assertEquals(10, resultsFlow.toList().size)
    }

    @Test
    fun unwindOptionsArrayTest() = runBlocking {
        val resultsFlow = movieCollection.aggregate<Document>(listOf(
            // aggregate content to unwind
            Aggregates.group("\$${Movie::year.name}", Accumulators.bottom("lowestRatedTwoMovies", Sorts.descending("${Movie::imdb.name}.${Movie.IMDB::rating.name}"), listOf("\$${Movie::title.name}", "\$${Movie::imdb.name}.${Movie.IMDB::rating.name}"))),
            // :snippet-start: unwind-options-array
                Aggregates.unwind(
                    "\$${"lowestRatedTwoMovies"}",
                    UnwindOptions().includeArrayIndex("position")
                )
                // :snippet-end:
            ))
        assertEquals(10, resultsFlow.toList().size)
    }

    @Test
    fun outTest() = runBlocking {
        val resultsFlow = movieCollection.aggregate<Document>(listOf(
            // aggregate content to push out
            Aggregates.group("\$${Movie::year.name}", Accumulators.bottom("lowestRatedTwoMovies", Sorts.descending("${Movie::imdb.name}.${Movie.IMDB::rating.name}"), listOf("\$${Movie::title.name}", "\$${Movie::imdb.name}.${Movie.IMDB::rating.name}"))),
                // :snippet-start: out
                Aggregates.out("classic_movies")
                // :snippet-end:
            ))
        assertEquals(5, resultsFlow.toList().size)
    }

    @Test
    fun mergeTest() = runBlocking {
        val resultsFlow = movieCollection.aggregate<Document>(listOf(Aggregates.match(Filters.and(Filters.gte(Movie::year.name, 1990), Filters.lt(Movie::year.name, 2000))),
                // :snippet-start: merge
                Aggregates.merge("nineties_movies")
                // :snippet-end:
            ))
        val results = resultsFlow.toList()
        assertEquals(6, resultsFlow.toList().size)
        assertEquals(6, results.filter { it.getInteger(Movie::year.name) in (1990..1999) }.size)
    }

    @Test
    fun mergeOptionsTest() = runBlocking {
        val uniqueIndexOption = IndexOptions().unique(true)
        val movieRatings = database.getCollection<Document>("movie_ratings")
        movieRatings.createIndex(Indexes.ascending("year", "title"), uniqueIndexOption)

        val resultsFlow = movieCollection.aggregate<Document>(listOf(
            Aggregates.match(Filters.eq(Movie::title.name, "The Sixth Sense")),
            Aggregates.project(Projections.fields(Projections.computed("rating", "\$imdb.rating"), Projections.include("title", "year"))),
            // :snippet-start: merge-options
            Aggregates.merge(
                MongoNamespace("aggregation", "movie_ratings"),
                MergeOptions().uniqueIdentifier(listOf("year", "title"))
                        .whenMatched(MergeOptions.WhenMatched.REPLACE)
                    .whenNotMatched(MergeOptions.WhenNotMatched.INSERT)
            )
            // :snippet-end:
        )
        )
        val results = resultsFlow.toList()
        assertEquals(1, results.size)
        assertEquals(results, movieRatings.find().toList())
        movieRatings.dropIndexes()
        movieRatings.drop()
    }

    @Test
    fun graphLookupTest() = runBlocking {
        data class Results(val name: String, val friends: List<String>, val socialNetwork: List<Users>)
        val resultsFlow = contactsCollection.aggregate<Results>(listOf(
                // :snippet-start: graph-lookup
                Aggregates.graphLookup(
                    "contacts",
                    "\$${Users::friends.name}", Users::friends.name, Users::name.name,
                    "socialNetwork"
                )
                // :snippet-end:
        ))
        assertEquals("Name1", resultsFlow.toList()[0].name)
    }

    @Test
    fun graphLookupDepthTest() = runBlocking {
        data class Depth(val name: String, val degrees: Int)
        data class Results(val name: String, val friends: List<String>, val socialNetwork: List<Depth>)
        val resultsFlow = contactsCollection.aggregate<Results>(listOf(
                // :snippet-start: graph-lookup-depth
                Aggregates.graphLookup(
                    "contacts",
                    "\$${Users::friends.name}", Users::friends.name, Users::name.name,
                    "socialNetwork",
                    GraphLookupOptions().maxDepth(2).depthField("degrees")
                )
                // :snippet-end:
        ))
        println(resultsFlow.toList())
        assertEquals("Name1", resultsFlow.toList()[0].name)
        assertEquals(4, resultsFlow.toList()[0].socialNetwork.size)
    }

    @Test
    fun graphLookupOptionsTest() = runBlocking {
        data class Results(val name: String, val friends: List<String>, val hobbies: List<String>, val socialNetwork: List<Users>)
        val resultsFlow = contactsCollection.aggregate<Results>(listOf(
                // :snippet-start: graph-lookup-options
                Aggregates.graphLookup(
                    "contacts",
                    "\$${Users::friends.name}", Users::friends.name, Users::name.name, "socialNetwork",
                    GraphLookupOptions().maxDepth(1).restrictSearchWithMatch(
                        Filters.eq(Users::hobbies.name, "golf")
                    )
                )
                // :snippet-end:
            ))
        assertEquals("Name1", resultsFlow.toList()[0].name)
        assertEquals(2, resultsFlow.toList()[0].socialNetwork.size)
    }

    @Test
    fun sortByCount() = runBlocking {
        data class Results(@BsonId val id: String, val count: Int)

        val resultsFlow = movieCollection.aggregate<Results>(listOf(Aggregates.unwind("\$${Movie::genres.name}"),
            // :snippet-start: sort-by-count
            Aggregates.sortByCount("\$${Movie::genres.name}"),
            // :snippet-end:
            Aggregates.sort(Sorts.descending(Results::count.name, "_id"))))
        val results = resultsFlow.toList()
        val actual = listOf(
            Results("Drama", 8),
            Results("Crime", 3),
            Results("Action", 2),
            Results("Thriller", 1),
            Results("Sci-Fi", 1),
            Results("Romance", 1),
            Results("Mystery", 1)
        )
        assertEquals(results, actual)
    }

    @Test
    fun replaceRootTest() = runBlocking {
        // :snippet-start: replace-root-data-class
        data class Libro(val titulo: String)
        data class Book(val title: String, val spanishTranslation: Libro)
        // :snippet-end:
        data class Results(val titulo: String)
        val translateCollection = database.getCollection<Book>("books_translate")
        val books = listOf(Book("Movie1", Libro("Libro1")), Book("Book2", Libro("Libro2")), Book("Movie3", Libro("Libro3")))
        translateCollection.insertMany(books)

        val resultsFlow = translateCollection.aggregate<Results>(listOf(
            // :snippet-start: replace-root
            Aggregates.replaceRoot("\$${Book::spanishTranslation.name}")
            //  :snippet-end:

        ))
        assertEquals("Libro1", resultsFlow.toList()[0].titulo)
        translateCollection.drop()
    }

    @Test
    fun addFieldsTest() = runBlocking {
        data class Results (val watched: Boolean, val type: String)
        val resultsFlow = movieCollection.aggregate<Results>(listOf(
            // :snippet-start: add-fields
            Aggregates.addFields(
                Field("watched", false),
                Field("type", "movie")
            )
            // :snippet-end:
        ))
        assertEquals("movie", resultsFlow.toList()[0].type)
        assertEquals(false, resultsFlow.toList()[0].watched)
    }

    @Test
    fun countTest() = runBlocking {
        data class Results(val total: Int)
        val resultsFlow = movieCollection.aggregate<Results>(listOf(
                // :snippet-start: count
                Aggregates.count("total")
                // :snippet-end:
            ))
        assertEquals(9, movieCollection.countDocuments())
    }

    @Test
    fun bucketTest() = runBlocking {
        val resultsFlow = screenCollection.aggregate<Document>(listOf(
            // :snippet-start: bucket
            Aggregates.bucket("\$${Screen::screenSize.name}", listOf(0, 24, 32, 50, 70, 1000))
            // :snippet-end:
        ))
        assertEquals(4, resultsFlow.toList().size)
    }

    @Test
    fun bucketOptionsTest() = runBlocking {
        data class Results(val count: Int, val matches: List<Int>)
        val resultsFlow = screenCollection.aggregate<Results>(listOf(
            // :snippet-start: bucket-options
            Aggregates.bucket("\$${Screen::screenSize.name}", listOf(0, 24, 32, 50, 70),
                BucketOptions()
                    .defaultBucket("monster")
                    .output(
                        Accumulators.sum("count", 1),
                        Accumulators.push("matches", "\$${Screen::screenSize.name}")
                    )
            )
            // :snippet-end:
        ))
        assertEquals(4, resultsFlow.toList().size)
    }

    @Test
    fun bucketAutoTest() = runBlocking {
        data class MinMax(val min: Int, val max: Int)
        data class Results(@BsonId val id: MinMax, val count: Int)
        val resultsFlow = screenCollection.aggregate<Results>(listOf(
            // :snippet-start: bucket-auto
            Aggregates.bucketAuto("\$${Screen::screenSize.name}", 5)
            // :snippet-end:
        ))
        assertEquals(5, resultsFlow.toList().size)
    }

    @Test
    fun bucketAutoOptionsTest() = runBlocking {
        data class MinMax(val min: Int, val max: Int)
        data class Results(@BsonId val id: MinMax, val count: Int, val avgPrice: Double)

        // example kotlin nested data classes
        val resultsFlow = screenCollection.aggregate<Results>(listOf(
            // :snippet-start: bucket-auto-options
            Aggregates.bucketAuto(
                "\$${Screen::price.name}", 5,
                BucketAutoOptions()
                    .granularity(BucketGranularity.POWERSOF2)
                    .output(Accumulators.sum("count", 1), Accumulators.avg("avgPrice", "\$${Screen::price.name}"))
                    )
            // :snippet-end:
        ))
        println(resultsFlow.toList().first())
        assertEquals(5, resultsFlow.toList().size)
    }

    @Test
    fun facetTest() = runBlocking {
        data class MinMax(val min: Int, val max: Int)
        data class ScreenSize(@BsonId val id: MinMax, val count: Int)
        data class Results(val `Screen Sizes`: List<ScreenSize>)
        val resultsFlow = screenCollection.aggregate<Results>(listOf(
            // :snippet-start: facet
            Aggregates.facet(
                Facet(
                    "Screen Sizes",
                    Aggregates.bucketAuto(
                        "\$${Screen::screenSize.name}",
                        5,
                        BucketAutoOptions().output(Accumulators.sum("count", 1))
                    )
                ),
                Facet(
                    "Manufacturer",
                    Aggregates.sortByCount("\$${Screen::manufacturer.name}"),
                    Aggregates.limit(5)
                )
            )
            // :snippet-end:
        ))
        println(resultsFlow.toList().first())
        assertEquals(1, resultsFlow.toList().size)
    }

    @Test
    fun windowTest() = runBlocking {
        // :snippet-start: window-data-class
        data class Weather(
            val localityId: String,
            val measurementDateTime: LocalDateTime,
            val rainfall: Double,
            val temperature: Double
        )
        // :snippet-end:
        val weatherCollection = database.getCollection<Weather>("weather")
        val weather = listOf(Weather("1", LocalDateTime.now(), 50.2, 25.6), Weather("1", LocalDateTime.now(), 40.5, 28.3), Weather("1", LocalDateTime.now(), 60.1, 23.8), Weather("2", LocalDateTime.now(), 45.7, 26.4), Weather("2", LocalDateTime.now(), 55.9, 24.9))
        weatherCollection.insertMany(weather)

        // :snippet-start: window
        val pastMonth = Windows.timeRange(-1, MongoTimeUnit.MONTH, Windows.Bound.CURRENT)

        val resultsFlow = weatherCollection.aggregate<Document>(
            listOf(
               Aggregates.setWindowFields("\$${Weather::localityId.name}",
                   Sorts.ascending(Weather::measurementDateTime.name),
                   WindowOutputFields.sum(
                       "monthlyRainfall",
                       "\$${Weather::rainfall.name}",
                       pastMonth
                   ),
                   WindowOutputFields.avg(
                       "monthlyAvgTemp",
                       "\$${Weather::temperature.name}",
                       pastMonth
                   )
               )
            )
        // :snippet-end:
        )
        println(resultsFlow.toList())
        assertEquals(5, resultsFlow.toList().size)
        weatherCollection.drop()
    }

    @Test
    fun fillTest() = runBlocking {
        // :snippet-start: fill-data-class
        data class Weather(
            @BsonId val id: ObjectId = ObjectId(),
            val hour: Int,
            val temperature: String?,
            val air_pressure: Double?
        )
        // :snippet-end:
        val weatherCollection = database.getCollection<Weather>("weather")
        val weather = listOf(Weather(ObjectId(), 1, "23C", 29.74), Weather(ObjectId(), 2, "23.5C", null), Weather(ObjectId(), 3, null, 29.76))
        weatherCollection.insertMany(weather)
        // :snippet-start: fill
        val resultsFlow = weatherCollection.aggregate<Weather>(
            listOf(
                Aggregates.fill(
                    FillOptions.fillOptions().sortBy(Sorts.ascending(Weather::hour.name)),
                    FillOutputField.value(Weather::temperature.name, "23.6C"),
                    FillOutputField.linear(Weather::air_pressure.name)
                )
            )
        )
        resultsFlow.collect { println(it) }
        // :snippet-end:
        assertEquals(29.75, resultsFlow.toList()[1].air_pressure)
    }

    @Test
    fun densifyTest() = runBlocking {
        // :snippet-start: densify-data-class
        data class Weather(
            @BsonId val id: ObjectId = ObjectId(),
            val position: Point,
            val ts: LocalDateTime
        )
        // :snippet-end:

        val weatherCollection = database.getCollection<Weather>("weather")
        val weather = listOf(
            Weather(ObjectId(), Point(Position(-47.9, 47.6)), LocalDateTime.of(1984, 3 ,5, 8 ,0)),
            Weather(ObjectId(), Point(Position(-47.9, 47.6)), LocalDateTime.of(1984, 3 ,5, 9 ,0)),
        )
        weatherCollection.insertMany(weather)
        val resultsFlow = weatherCollection.aggregate<Document>(listOf(
            // :snippet-start: densify
            Aggregates.densify(
                "ts",
                DensifyRange.partitionRangeWithStep(15, MongoTimeUnit.MINUTE),
                DensifyOptions.densifyOptions().partitionByFields("Position.coordinates")
            )
            // :snippet-end:
        ))
        resultsFlow.collect{println(it)}
        weatherCollection.drop()
    }

    /* NOTE: Test is not run by default. FTS requires the creation of a text index on the collection before running
    (see note at top of file for additional setup requirements for FTS).
     */
    @Ignore
    fun fullTextSearchTest(): Unit = runBlocking {
        val resultsFlow = ftsCollection.aggregate<Movie>(
            listOf(
                // :snippet-start: full-text-search
                Aggregates.search(
                    SearchOperator.text(
                        SearchPath.fieldPath(Movie::title.name), "Future"
                    ),
                    SearchOptions.searchOptions().index("title")
                )
                // :snippet-end:
            )
        )
        val results = resultsFlow.toList()
        assertEquals(1, results.size)
        assertEquals("Back to the Future", results.first().title)
    }

    /* NOTE: Test is not run by default. FTS requires the creation of a text index on the collection before running
    (see note at top of file for additional setup requirements for FTS).
     */
    @Ignore
    fun searchMetadataTest() = runBlocking {
        val resultsFlow = ftsCollection.aggregate<Document>(
            listOf(
                // :snippet-start: search-meta
                Aggregates.searchMeta(
                    SearchOperator.near(1985, 2, SearchPath.fieldPath(Movie::year.name)),
                    SearchOptions.searchOptions().index("year")
                )
                // :snippet-end:
            )
        )
        val results = resultsFlow.toList()
        assertEquals(1, resultsFlow.toList().size)
        assertEquals(1, results.first().get("count", Document::class.java).get("lowerBound", java.lang.Long::class.java)?.toInt())
    }

    /* NOTE: Test is not run by default. Vector search requires the creation of
    a vector search index on the collection before running.
    */
    @Ignore
    fun vectorSearchTest() = runBlocking {
        val resultsFlow = movieCollection.aggregate<Document>(
            listOf(
                // :snippet-start: vector-search
                Aggregates.vectorSearch(
                    SearchPath.fieldPath(MovieAlt::plotEmbedding.name),
                    BinaryVector.floatVector(floatArrayOf(0.0001f, 1.12345f, 2.23456f, 3.34567f, 4.45678f)),
                    "mflix_movies_embedding_index",
                    1.toLong(),
                    exactVectorSearchOptions().filter(Filters.gte(MovieAlt::year.name, 2016))
                )
                // :snippet-end:
            )
        )

        val results = resultsFlow.toList()
        assertEquals(1, resultsFlow.toList().size)
        assertEquals(1, results.first().get("count", Document::class.java).get("lowerBound", java.lang.Long::class.java)?.toInt())
    }
}