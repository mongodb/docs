import com.mongodb.client.model.Filters
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.Assertions.*
import kotlin.test.*
import io.github.cdimascio.dotenv.dotenv
import kotlinx.coroutines.runBlocking
import org.bson.BsonDocument
import org.bson.Document
import org.junit.jupiter.api.TestInstance

val dotenv = dotenv()

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
internal class ExampleMongodbClientTest {
    val client = ExampleMongodbClient(dotenv["MONGODB_CONNECTION_URI"], dotenv["MONGODB_DATABASE_NAME"])
    @Test
    fun testAddDocument() = runBlocking {
        val res = client.insertOne("test", Document().append("name", "test"))
        assertEquals(res.wasAcknowledged(), true)
    }

    @Test
    fun testAddDataClass() = runBlocking {
        val res = client.insertOneDataClass("test", TestDataClass( "test-data-class"))
        assertEquals(res.wasAcknowledged(), true)
    }

    @AfterAll
    private fun afterAll() = runBlocking {
        client.database.getCollection<Document>("test").deleteMany(Document())
        client.close()
    }
}

