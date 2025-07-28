
import com.mongodb.client.model.Sorts.descending
import com.mongodb.kotlin.client.coroutine.MongoClient
import config.getConfig
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.runBlocking
import org.bson.codecs.pojo.annotations.BsonId
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
internal class LimitTest {

    // :snippet-start: data-model
    data class Book(
        @BsonId val id: Int,
        val title: String,
        val author: String,
        val length: Int
    )
    // :snippet-end:

    companion object {
        val config = getConfig()
        val client = MongoClient.create(config.connectionUri)
        val database = client.getDatabase("library")
        val collection = database.getCollection<Book>("books")

        @BeforeAll
        @JvmStatic
        fun beforeAll() {
            runBlocking {
                val books = listOf(
                    Book(1, "The Brothers Karamazov", "Dostoyevsky", 824),
                    Book(2, "Les Misérables", "Hugo", 1462),
                    Book(3, "Atlas Shrugged", "Rand", 1088),
                    Book(4,"Infinite Jest", "Wallace", 1104),
                    Book(5, "Cryptonomicon", "Stephenson", 918),
                    Book(6, "A Dance with Dragons", "Martin", 1104)
                )
                collection.insertMany(books)
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
    fun specifyLimitTest() = runBlocking {
        // :snippet-start: specify-limit
        val results = collection.find()
            .sort(descending("length"))
            .limit(3)

        results.collect { println(it) }
        // :snippet-end:
        // Junit test for the above code
        val expectation = listOf(
            Book(2, "Les Misérables", "Hugo", 1462),
            Book(6, "A Dance with Dragons", "Martin", 1104),
            Book(4, "Infinite Jest", "Wallace", 1104)
        )
        assertEquals(expectation, results.toList())
    }

    @Test
    fun combineSkipLimitTest() = runBlocking {
        // :snippet-start: skip-limit
        val results = collection.find()
            .sort(descending("length"))
            .skip(3)
            .limit(3)

        results.collect { println(it) }
        // :snippet-end:
        // Junit test for the above code
        val expectation = listOf(
            Book(3, "Atlas Shrugged", "Rand", 1088),
            Book(5, "Cryptonomicon", "Stephenson", 918),
            Book(1, "The Brothers Karamazov", "Dostoyevsky", 824)
        )
        assertEquals(expectation, results.toList())
    }

    @Test
    fun equivalenceTest() = runBlocking {
        // :snippet-start: equivalent
        val results = // :remove:
            collection.find().sort(descending("length")).limit(3)
                .toList() // :remove:
        val results2 = // :remove:
            collection.find().limit(3).sort(descending("length"))
                // :snippet-end:
                .toList()
        assertEquals(results,results2)

    }
}