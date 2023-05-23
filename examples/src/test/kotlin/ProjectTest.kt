
import com.mongodb.*
import com.mongodb.client.model.Filters
import com.mongodb.client.model.Filters.*
import com.mongodb.client.model.Projections
import com.mongodb.client.model.Projections.*
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
internal class ProjectTest {
    // :snippet-start: fruit-data-class
    data class Fruit(
        @BsonId val id: Int,
        val name: String,
        val qty: Int,
        val rating: Int
    )
    // :snippet-end:

    companion object {

        val dotenv = dotenv()
        val client = MongoClient.create(dotenv["MONGODB_CONNECTION_URI"])
        val database = client.getDatabase("grocery_store")
        val collection = database.getCollection<Fruit>("fruits")

        @BeforeAll
        @JvmStatic
        fun beforeAll() {
            runBlocking {
                collection.insertMany(
                    listOf(
                        Fruit(1, "apples", 5, 3),
                        Fruit(2, "bananas", 6, 1),
                        Fruit(3, "oranges", 7, 2),
                        Fruit(4, "avocados", 3, 5)
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

    @Test
    fun projectTest() = runBlocking {
        // :snippet-start: project-name
        data class FruitName(
            @BsonId val id: Int? = null,
            val name: String
        )

        // Return all documents with only the name field
        val filter = Filters.empty()
        val projection = Projections.fields(
            Projections.include(FruitName::name.name)
        )
        val flowResults = collection.find<FruitName>(filter).projection(projection)

        flowResults.collect { println(it)}
        // :snippet-end:
        val resultList = listOf(
            FruitName(1, "apples"),
            FruitName(2, "bananas"),
            FruitName(3, "oranges"),
            FruitName(4, "avocados")
        )
        assertEquals(flowResults.toList(), resultList)
    }

    @Test
    fun excludeIdProjectTest() {
        runBlocking {
            // :snippet-start: exclude-id
            data class FruitName(
                @BsonId val id: Int? = null,
                val name: String
            )

            // Return all documents with *only* the name field
            // excludes the id
            val filter = Filters.empty()
            val projection = Projections.fields(
                Projections.include(FruitName::name.name),
                Projections.excludeId()
            )
            val flowResults = collection.find<FruitName>(filter).projection(projection)

            flowResults.collect { println(it)}
            // :snippet-end:
            val resultList = listOf(
                FruitName(name = "apples"),
                FruitName(name = "bananas"),
                FruitName(name = "oranges"),
                FruitName(name = "avocados")
            )
            assertEquals(flowResults.toList(), resultList)
        }
    }
    @Test
    fun multipleFieldsProjectTest() {
        runBlocking {
            // :snippet-start: multiple-fields
            data class FruitRating(
                val name: String,
                val rating: Int
            )

            val filter = Filters.empty()
            val projection = Projections.fields(
                Projections.include(FruitRating::name.name, FruitRating::rating.name),
                Projections.excludeId()
            )
            val flowResults = collection.find<FruitRating>(filter).projection(projection)

            flowResults.collect { println(it)}
            // :snippet-end:
            val resultList = listOf(
                FruitRating(name = "apples", rating = 3),
                FruitRating(name = "bananas", rating = 1),
                FruitRating(name = "oranges", rating = 2),
                FruitRating(name = "avocados", rating = 5)
            )
            assertEquals(flowResults.toList(), resultList)
        }
    }
}
