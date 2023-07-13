
import com.mongodb.client.model.Filters
import com.mongodb.client.model.Indexes
import com.mongodb.client.model.Sorts.ascending
import com.mongodb.client.model.TextSearchOptions
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
import kotlin.test.assertTrue

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
internal class SearchTextTest {
    // :snippet-start: search-data-model
    data class Movies(
        @BsonId val id: Int,
        val title: String,
        val tags: List<String>
    )
// :snippet-end:

    companion object {
        val config = getConfig()
        val client = MongoClient.create(config.connectionUri)
        val database = client.getDatabase("movies")
        val collection = database.getCollection<Movies>("fast_and_furious_movies")

        @BeforeAll
        @JvmStatic
        fun beforeAll() {
            runBlocking {
                val fastAndFuriousMovies = listOf(
                    Movies(1, "2 Fast 2 Furious", listOf("undercover", "drug dealer")),
                    Movies(2, "Fast 5", listOf("bank robbery", "full team")),
                    Movies(3, "Furious 7", listOf("emotional")),
                    Movies(4, "The Fate of the Furious", listOf("betrayal"))
                )
                collection.insertMany(fastAndFuriousMovies)
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
    fun createIndexTest() = runBlocking {
        // :snippet-start: text-index
        collection.createIndex(Indexes.text("title"))
        // :snippet-end:
        // Junit test for the above code
        val testFilter = Filters.text("Furious")
        val findFlow = collection.find(testFilter)
        findFlow.collect { println(it) }
        val expected = listOf(
            Movies(1, "2 Fast 2 Furious", listOf("undercover", "drug dealer")),
            Movies(3, "Furious 7", listOf("emotional")),
            Movies(4, "The Fate of the Furious", listOf("betrayal"))
        )
        assertEquals(expected, findFlow.sort(ascending("_id")).toList() )
    }

    @Test
    fun specifyOptionsTest() = runBlocking {
        collection.createIndex(Indexes.text("title"))
        // :snippet-start: specify-options
        val options: TextSearchOptions = TextSearchOptions().caseSensitive(true)
        val filter = Filters.text("SomeText", options)
        // :snippet-end:
        // Junit test for the above code
        assertTrue(collection.find(filter).toList().isEmpty() )
    }

    @Test
    fun searchTermTest() = runBlocking {
        collection.createIndex(Indexes.text("title"))
        // :snippet-start: search-term
        val filter = Filters.text("fast")
        val findFlow = collection.find(filter)
        findFlow.collect { println(it) }
        // :snippet-end:
        // Junit test for the above code
        val expected = listOf(
            Movies(1, "2 Fast 2 Furious", listOf("undercover", "drug dealer")),
            Movies(2, "Fast 5", listOf("bank robbery", "full team"))
        )
        assertEquals(expected, findFlow.sort(ascending("_id")).toList() )
    }

    @Test
    fun searchMultipleTermsTest() = runBlocking {
        collection.createIndex(Indexes.text("title"))
        // :snippet-start: search-multiple-terms
        val filter = Filters.text("fate 7")
        val findFlow = collection.find(filter)
        findFlow.collect { println(it) }
        // :snippet-end:
        // Junit test for the above code
        val expected = listOf(
            Movies(3, "Furious 7", listOf("emotional")),
            Movies(4, "The Fate of the Furious", listOf("betrayal"))
        )
        assertEquals(expected, findFlow.toList() )
    }

    @Test
    fun searchPhraseTest() = runBlocking {
        collection.createIndex(Indexes.text("title"))
        // :snippet-start: search-phrase
        val filter = Filters.text("\"fate of the furious\"")
        val findFlow = collection.find(filter)
        findFlow.collect { println(it) }
        // :snippet-end:
        // Junit test for the above code
        val expected = listOf(
            Movies(4, "The Fate of the Furious", listOf("betrayal"))
        )
        assertEquals(expected, findFlow.toList() )
    }

    @Test
    fun excludeTermTest() = runBlocking {
        collection.createIndex(Indexes.text("title"))
        // :snippet-start: exclude-term
        val filter = Filters.text("furious -fast")
        val findFlow = collection.find(filter)
        findFlow.collect { println(it) }
        // :snippet-end:
        // Junit test for the above code
        val expected = listOf(
            Movies(3, "Furious 7", listOf("emotional")),
            Movies(4, "The Fate of the Furious", listOf("betrayal"))
        )
        assertEquals(expected, findFlow.sort(ascending("_id")).toList() )
    }
}