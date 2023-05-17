
import com.mongodb.client.model.*
import com.mongodb.kotlin.client.coroutine.MongoClient
import io.github.cdimascio.dotenv.dotenv
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.count
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals
import kotlin.test.assertIs

class QuickReferenceTest {

    // :snippet-start: data-model
    data class Movie(
        val title: String,
        val year: Int,
        val rated: String? = "Not Rated",
        val genres: List<String>? = listOf()
    )
    // :snippet-end:

    companion object {
        val dotenv = dotenv()
        val client = MongoClient.create(dotenv["MONGODB_CONNECTION_URI"])
        val database = client.getDatabase("sample_mflix")
        val collection = database.getCollection<Movie>("movies")

        @AfterAll
        @JvmStatic
        fun afterAll() {
            client.close()
        }
    }

    @BeforeEach
    fun beforeEach() {
        runBlocking {
            collection.insertMany(
                listOf(
                    Movie("Shrek", 2001),
                    Movie("Shrek 2", 2004),
                    Movie("Shrek the Third", 2007),
                    Movie("Shrek Forever After", 2010),
                )
            )
        }
    }

    @AfterEach
    fun afterEach() {
        runBlocking {
            collection.dropIndexes()
            collection.drop()
        }
    }

    @Test
    fun findDocumentTestTest() = runBlocking {
        val shrek =
            // :snippet-start: find-document
            collection.find(
                Filters.eq(Movie::title.name, "Shrek")
            ).firstOrNull()
        // :snippet-end:
        println(shrek)
        assertEquals("Shrek", shrek?.title)
    }

    @Test
    fun findMultipleDocumentsTestTest() = runBlocking {
        val movies =
            // :snippet-start: find-multiple-documents
            collection.find(
                Filters.eq(Movie::year.name, 2004)
            )
        // :snippet-end:
        println(movies.toList())
        assertEquals(1, movies.count())
    }

    @Test
    fun insertDocumentTest() = runBlocking {
        collection.deleteOne(Filters.eq(Movie::title.name, "Shrek"))
        val insertResult =
            // :snippet-start: insert-document
            collection.insertOne(Movie("Shrek", 2001))
        // :snippet-end:
        assert(insertResult.wasAcknowledged())
        assertEquals(4, collection.countDocuments())
    }

    @Test
    fun insertMultipleDocumentsTest() = runBlocking {
        collection.drop()
        val insertResult =
            // :snippet-start: insert-multiple-documents
            collection.insertMany(
                listOf(
                    Movie("Shrek", 2001),
                    Movie("Shrek 2", 2004),
                    Movie("Shrek the Third", 2007),
                    Movie("Shrek Forever After", 2010),
                )
            )
        // :snippet-end:
        assert(insertResult.wasAcknowledged())
        assertEquals(4, collection.countDocuments())
    }

    @Test
    fun updateDocumentTest() = runBlocking {
        val updateResult =
            // :snippet-start: update-document
            collection.updateOne(
                Filters.eq(Movie::title.name, "Shrek"),
                Updates.set(Movie::rated.name, "PG")
            )
        // :snippet-end:
        val updatedShrek = collection.find(Filters.eq(Movie::title.name, "Shrek")).firstOrNull()
        println(updatedShrek)
        assert(updateResult.wasAcknowledged())
        assertEquals("PG", updatedShrek?.rated)
    }

    @Test
    fun updateMultipleDocumentsTest() = runBlocking {
        val updateMultipleResult =
            // :snippet-start: update-multiple-documents
            collection.updateMany(
                Filters.regex(Movie::title.name, "Shrek"),
                Updates.set(Movie::rated.name, "PG")
            )
        // :snippet-end:
        val pgMovies = collection.find(Filters.eq(Movie::rated.name, "PG")).toList()
        println(pgMovies)
        assert(updateMultipleResult.wasAcknowledged())
        assertEquals(4, pgMovies.size)
    }

    @Test
    fun updateArrayInDocumentTest() = runBlocking {
        val updateMultipleResult =
            // :snippet-start: update-array-in-document
            collection.updateOne(
                Filters.eq(Movie::title.name, "Shrek"),
                Updates.addEachToSet(Movie::genres.name, listOf("Family", "Fantasy"))
            )
        // :snippet-end:
        val updatedShrek = collection.find(Filters.eq(Movie::title.name, "Shrek")).firstOrNull()
        println(updatedShrek)
        assert(updateMultipleResult.wasAcknowledged())
        assertEquals(listOf("Family", "Fantasy"), updatedShrek?.genres)
    }

    @Test
    fun replaceDocumentTest() = runBlocking {
        val replaceResult =
            // :snippet-start: replace-document
            collection.replaceOne(
                Filters.eq(Movie::title.name, "Shrek"),
                Movie("Kersh", 1002, "GP")
            )
        // :snippet-end:
        val kersh = collection.find(Filters.eq(Movie::title.name, "Kersh")).firstOrNull()
        println(kersh)
        assert(replaceResult.wasAcknowledged())
        assertEquals("GP", kersh?.rated)
    }

    @Test
    fun deleteDocumentTest() = runBlocking {
        val deleteResult =
            // :snippet-start: delete-document
            collection.deleteOne(
                Filters.eq(Movie::title.name, "Shrek")
            )
        // :snippet-end:
        assert(deleteResult.wasAcknowledged())
        assertEquals(3, collection.countDocuments())
    }

    @Test
    fun deleteMultipleDocumentsTest() = runBlocking {
        val deleteResult =
            // :snippet-start: delete-multiple-documents
            collection.deleteMany(
                Filters.regex(Movie::title.name, "Shrek")
            )
        // :snippet-end:
        assert(deleteResult.wasAcknowledged())
        assertEquals(0, collection.countDocuments())
    }

    @Test
    fun bulkWriteTest() = runBlocking {
        collection.deleteOne(Filters.eq(Movie::title.name, "Shrek"))
        val bulkWriteResult =
            // :snippet-start: bulk-write
            collection.bulkWrite(
                listOf(
                    InsertOneModel(Movie("Shrek", 2001)),
                    DeleteManyModel(Filters.lt(Movie::year.name, 2004)),
                )
            )
        // :snippet-end:
        assert(bulkWriteResult.wasAcknowledged())
        assertEquals(3, collection.countDocuments())

    }

    @Test
    fun watchForChangesTest() = runBlocking {
        var callCount = 0
        val job = launch {
            // :snippet-start: watch-for-changes
            val changeStream = collection.watch()
            changeStream.collect {
                println("Change to ${it.fullDocument?.title}")
                callCount += 1 // :remove:
            }
            // :snippet-end:
        }
        delay(1)
        collection.insertOne(Movie("Shrek 5: Donkey's Revenge", 2024))
        delay(1000)
        job.cancel()
        assertEquals(1, callCount)
    }

    @Test
    fun accessDataFromFlowTest() = runBlocking {
        // :snippet-start: access-data-from-flow
        val flow = collection.find(
            Filters.eq(Movie::year.name, 2004)
        )
        flow.collect { println(it) }
        // :snippet-end:
        assertEquals(1, flow.count())
    }

    @Test
    fun accessResultsFromQueryAsListTest() = runBlocking {

        val movies =
            // :snippet-start: access-results-from-query-as-list
            collection.find().toList()
        // :snippet-end:
        println(movies)
        assertEquals(4, movies.size)
    }

    @Test
    fun countDocumentsTest() = runBlocking {

        val count =
            // :snippet-start: count-documents
            collection.countDocuments(Filters.eq("year", 2001))
        // :snippet-end:
        println(count)
        assertEquals(1, count)
    }

    @Test
    fun listDistinctDocumentsOrFieldValuesTest() = runBlocking {
        collection.insertMany(
            listOf(
                Movie("Shrek 5: Farquaad Strikes Back", 2026, "PG"),
                Movie("Shrek 6: Rise of the Living Dead Ogres", 2028, "PG-13")
            )
        )
        val distinctDocuments =
            // :snippet-start: list-distinct-documents-or-field-values
            collection.distinct<String>(Movie::rated.name)
        // :snippet-end:
        println(distinctDocuments.toList())
        assertEquals(setOf("PG", "PG-13", "Not Rated"), distinctDocuments.toList().toSet())
    }

    @Test
    fun limitNumberOfDocumentsTest() = runBlocking {
        val movies =
            // :snippet-start: limit-number-of-documents
            collection.find()
                .limit(2)
        // :snippet-end:
        println(movies.toList())
        assertEquals(2, movies.count())
    }

    @Test
    fun skipDocumentsTest() = runBlocking {
        val movies =
            // :snippet-start: skip-documents
            collection.find()
                .skip(2)
        // :snippet-end:
        println(movies.toList())
        assertEquals(2, movies.count())
    }

    @Test
    fun sortDocumentsTest() = runBlocking {
        val movies =
            // :snippet-start: sort-documents
            collection.find().sort(Sorts.descending(Movie::year.name))
        // :snippet-end:
        println(movies.toList())
        assertEquals(2010, movies.firstOrNull()?.year)
    }

    @Test
    fun projectTest() = runBlocking {
        // :snippet-start: project
        data class Result(val title: String)
        // :remove-start:
        val movies =
            // :remove-end:
            collection.find<Result>()
                .projection(Projections.include(Movie::title.name))
        // :snippet-end:
        val firstMovie = movies.firstOrNull()
        println(firstMovie)
        assertIs<Result>(firstMovie)
        Unit // added at the end to make the function not return internal type Result, which causes compiler to error
    }

    @Test
    fun createIndexTest() = runBlocking {
        val indexName =
            // :snippet-start: create-index
            collection.createIndex(Indexes.ascending(Movie::title.name))
        // :snippet-end:
        println(indexName)
        collection.dropIndex(indexName)
        assertEquals("title_1", indexName)
    }

    @Test
    fun searchTextTest() = runBlocking {
        collection.createIndex(Indexes.text(Movie::title.name))
        val movies =
            // :snippet-start: search-text
            collection.find(Filters.text("Forever"));
        // :snippet-end:
        println(movies.toList())
        assertEquals(1, movies.count())
    }
}