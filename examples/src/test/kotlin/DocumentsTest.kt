
import com.mongodb.client.model.Filters
import com.mongodb.client.result.InsertOneResult
import com.mongodb.kotlin.client.coroutine.MongoClient
import io.github.cdimascio.dotenv.dotenv
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.runBlocking
import org.bson.*
import org.bson.json.JsonObject
import org.bson.types.ObjectId
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.TestInstance
import java.time.LocalDate
import java.time.ZoneId
import java.util.*
import kotlin.test.*


@TestInstance(TestInstance.Lifecycle.PER_CLASS)
internal class DocumentsTest {

    companion object {
        private val dotenv = dotenv()
        val mongoClient = MongoClient.create(dotenv["MONGODB_CONNECTION_URI"])

        @AfterAll
        @JvmStatic
        fun afterAll() {
            runBlocking {
                mongoClient.close()
            }
        }
    }

    @Test
    fun documentTest() = runBlocking {
        // :snippet-start: create-document
        val author = Document("_id", ObjectId())
            .append("name", "Gabriel García Márquez")
            .append(
                "dateOfDeath",
                Date.from(
                    LocalDate.of(2014, 4, 17)
                        .atStartOfDay(ZoneId.systemDefault()).toInstant()
                )
            )
            .append(
                "novels", listOf(
                    Document("title", "One Hundred Years of Solitude").append("yearPublished", 1967),
                    Document("title", "Chronicle of a Death Foretold").append("yearPublished", 1981),
                    Document("title", "Love in the Time of Cholera").append("yearPublished", 1985)
                )
            )
        // :snippet-end:

        assertNotNull(author)
        assertEquals("Gabriel García Márquez", author.getString("name"))

        // :snippet-start: insert-document
        // val mongoClient = <code to instantiate your client>

        val database = mongoClient.getDatabase("fundamentals_data")
        val collection = database.getCollection<Document>("authors")
        val result = collection.insertOne(author)
        // :snippet-end:

        assertNotNull(result)
        assertEquals(true, result.wasAcknowledged())

        // :snippet-start: retrieve-document
        val doc = collection.find(Filters.eq("name", "Gabriel García Márquez")).firstOrNull()
        doc?.let {
            println("_id: ${it.getObjectId("_id")}, name: ${it.getString("name")}, dateOfDeath: ${it.getDate("dateOfDeath")}")

            it.getList("novels", Document::class.java).forEach { novel ->
                println("title: ${novel.getString("title")}, yearPublished: ${novel.getInteger("yearPublished")}")
            }
        }
        // :snippet-end:

        assertNotNull(doc)
        assertEquals("Gabriel García Márquez", doc?.getString("name"))
        assertEquals(3, doc?.getList("novels", Document::class.java)?.size)

        // clean up
        collection.drop()
    }

    @Test
    fun bsonDocumentTest() = runBlocking {
        // :snippet-start: create-bson-document
        val author = BsonDocument()
            .append("_id", BsonObjectId())
            .append("name", BsonString("Gabriel García Márquez"))
            .append(
                "dateOfDeath",
                BsonDateTime(
                    LocalDate.of(2014, 4, 17)
                        .atStartOfDay(ZoneId.systemDefault()).toInstant().toEpochMilli()
                )
            )
            .append(
                "novels", BsonArray(
                    listOf(
                        BsonDocument().append("title", BsonString("One Hundred Years of Solitude"))
                            .append("yearPublished", BsonInt32(1967)),
                        BsonDocument().append("title", BsonString("Chronicle of a Death Foretold"))
                            .append("yearPublished", BsonInt32(1981)),
                        BsonDocument().append("title", BsonString("Love in the Time of Cholera"))
                            .append("yearPublished", BsonInt32(1985))
                    )
                )
            )
        // :snippet-end:

        assertNotNull(author)
        assertEquals("Gabriel García Márquez", author.getString("name").value)
        assertEquals(3, author.getArray("novels").size)

        // :snippet-start: insert-bson-document
        // val mongoClient = <code to instantiate your client>

        val database = mongoClient.getDatabase("fundamentals_data")
        val collection = database.getCollection<BsonDocument>("authors")

        val result: InsertOneResult = collection.insertOne(author)
        // :snippet-end:

        assertNotNull(result)
        assertEquals(true, result.wasAcknowledged())

        // :snippet-start: retrieve-bson-document
        // <MongoCollection setup code here>

        val doc = collection.find(Filters.eq("name", "Gabriel García Márquez")).firstOrNull()
        doc?.let {
            println("_id: ${it.getObjectId("_id").value}, name: ${it.getString("name").value}, dateOfDeath: ${Date(it.getDateTime("dateOfDeath").value)}")

            it.getArray("novels").forEach { novel ->
                val novelDocument = novel.asDocument()
                println("title: ${novelDocument.getString("title").value}, yearPublished: ${novelDocument.getInt32("yearPublished").value}")
            }
        }
        // :snippet-end:

        assertNotNull(doc)
        assertEquals("Gabriel García Márquez", doc?.getString("name")?.value)
        assertEquals(3, doc?.getArray("novels")?.size)

        // clean up
        collection.drop()
    }

    @Test
    fun jsonObjectTest() = runBlocking {
        // :snippet-start: create-json-object
        val ejsonStr = """
            {"_id": {"${"$"}oid": "6035210f35bd203721c3eab8"},
            "name": "Gabriel García Márquez",
            "dateOfDeath": {"${"$"}date": "2014-04-17T04:00:00Z"},
            "novels": [
                {"title": "One Hundred Years of Solitude","yearPublished": 1967},
                {"title": "Chronicle of a Death Foretold","yearPublished": 1981},
                {"title": "Love in the Time of Cholera","yearPublished": 1985}]}
            """.trimIndent()

        val author = JsonObject(ejsonStr)
        // :snippet-end:

        assertNotNull(author)
        assertEquals("Gabriel García Márquez", author.toBsonDocument().getString("name")?.value)

        // :snippet-start: insert-json-object
        // val mongoClient = <code to instantiate your client>;

        val database = mongoClient.getDatabase("fundamentals_data")
        val collection= database.getCollection<JsonObject>("authors")

        val result = collection.insertOne(author)
        // :snippet-end:
        assertNotNull(result)
        assertEquals(true, result.wasAcknowledged())

        // :snippet-start: retrieve-json-object
        // val mongoClient = <code to instantiate your client>;

        val query = JsonObject("{\"name\": \"Gabriel Garc\\u00eda M\\u00e1rquez\"}")
        val jsonResult = collection.find(query).firstOrNull()
        jsonResult?.let {
            println("query result in extended json format: " + jsonResult.json)
        }
        // :snippet-end:
        assertNotNull(jsonResult)
        assertEquals("Gabriel García Márquez", jsonResult?.toBsonDocument()?.getString("name")?.value)

        // clean up
        collection.drop()
    }
}
