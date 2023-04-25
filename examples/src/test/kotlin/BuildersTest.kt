
import com.mongodb.*
import com.mongodb.client.model.Filters.*
import com.mongodb.client.model.Projections.*
import com.mongodb.kotlin.client.coroutine.MongoClient
import io.github.cdimascio.dotenv.dotenv
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking
import org.bson.BsonObjectId
import org.bson.Document
import org.bson.codecs.pojo.annotations.BsonId
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.TestInstance
import java.util.*
import kotlin.test.*


data class User(
    @BsonId
    val id: BsonObjectId = BsonObjectId(),
    val gender: String,
    val age: Int,
    val email: String,
)


@TestInstance(TestInstance.Lifecycle.PER_CLASS)
internal class BuildersTest {

    companion object {
        val dotenv = dotenv()
        val client = MongoClient.create(dotenv["MONGODB_CONNECTION_URI"])
        val database = client.getDatabase("marketing")
        val collection = database.getCollection<User>("users")

        @BeforeAll
        @JvmStatic
        private fun beforeAll() {
            runBlocking {
                val users = listOf(
                    User(BsonObjectId(), "female", 29, "baz@example.com"),
                    User(BsonObjectId(), "male", 92, "bar@example.com"),
                    User(BsonObjectId(), "female", 35, "foo@example.com"),
                )
                collection.insertMany(users)
            }
        }

        @AfterAll
        @JvmStatic
        private fun afterAll() {
            runBlocking {
                collection.drop()
                client.close()
            }
        }

    }

    @Test
    fun noBuildersTest() = runBlocking {
        // :snippet-start: no-builders
        data class Results(val email: String)

        val filter = Document().append("gender", "female").append("age", Document().append("\$gt", 29))
        val projection = Document().append("_id", 0).append("email", 1)
        val results = collection.find<Results>(filter).projection(projection)
        // :snippet-end:
        assertEquals("foo@example.com", results.first().email)
    }

    @Test
    fun buildersTest() = runBlocking {
        // :snippet-start: builders
        data class Results(val email: String)

        val filter = and(eq("gender", "female"), gt("age", 29))
        val projection = fields(excludeId(), include("email"))
        val results = collection.find<Results>(filter).projection(projection)
        // :snippet-end:
        assertEquals("foo@example.com", results.first().email)
    }
}