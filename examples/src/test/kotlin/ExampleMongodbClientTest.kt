
import io.github.cdimascio.dotenv.dotenv
import kotlinx.coroutines.runBlocking
import org.bson.BsonObjectId
import org.bson.Document
import org.bson.codecs.pojo.annotations.BsonExtraElements
import org.bson.codecs.pojo.annotations.BsonId
import org.bson.codecs.pojo.annotations.BsonIgnore
import org.bson.codecs.pojo.annotations.BsonProperty
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.TestInstance
import kotlin.test.*

val dotenv = dotenv()

data class TestClassWithAnnotations(
    @BsonId
    val id: BsonObjectId = BsonObjectId(),
    // add annotation to rename to camelCase
    @BsonProperty("snake_case_field")
    val camelCaseField: String,
    @BsonIgnore
    val notInMongo: String,
    @BsonExtraElements
    val extraElements: Document = Document()
)


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

    // TODO: Test insert operation using data class serialization
    @Test
    fun testAddAnnotatedDataClass() = runBlocking {
        val res = client.database.getCollection<TestClassWithAnnotations>("test-with-annotations")
            .insertOne(TestClassWithAnnotations(
                camelCaseField = "camelCaseField",
                notInMongo = "notInMongo"
            ))
        assertEquals(res.wasAcknowledged(), true)
    }

    // TODO

    @AfterAll
    private fun afterAll() = runBlocking {
        client.database.getCollection<Document>("test").deleteMany(Document())
        client.close()
    }

}

// convert string to hex string


