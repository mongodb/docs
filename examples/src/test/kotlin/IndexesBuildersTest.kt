
import com.mongodb.client.model.Indexes
import com.mongodb.kotlin.client.coroutine.MongoClient
import config.getConfig
import kotlinx.coroutines.runBlocking
import org.bson.Document
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

class IndexesBuildersTest {

    companion object {
        val config = getConfig()
        val client = MongoClient.create(config.connectionUri)
        val database = client.getDatabase("marketing")
        val collection = database.getCollection<Document>("users")

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
    fun ascendingIndexTest() = runBlocking {
        // :snippet-start: ascending-index
        val ascendingIndex = Indexes.ascending("name")
        val indexName = collection.createIndex(ascendingIndex)
        println(indexName)
        // :snippet-end:
        assertEquals("name_1", indexName)
    }

    @Test
    fun descendingIndexTest() = runBlocking {
        // :snippet-start: descending-index
        val descendingIndex = Indexes.descending("capacity")
        val indexName = collection.createIndex(descendingIndex)
        println(indexName)
        // :snippet-end:
        assertEquals("capacity_-1", indexName)
    }

    @Test
    fun compoundIndexExampleTest() = runBlocking {
        // :snippet-start: compound-index
        val compoundIndexExample = Indexes.compoundIndex(
            Indexes.descending("capacity", "year"),
            Indexes.ascending("name")
        )
        val indexName = collection.createIndex(compoundIndexExample)
        println(indexName)
        // :snippet-end:
        assertEquals("capacity_-1_year_-1_name_1", indexName)
    }

    @Test
    fun textIndexTest() = runBlocking {
        // :snippet-start: text-index
        val textIndex = Indexes.text("theaters")
        val indexName = collection.createIndex(textIndex)
        println(indexName)
        // :snippet-end:
        assertEquals("theaters_text", indexName)
    }

    @Test
    fun hashedIndexTest() = runBlocking {
        // :snippet-start: hashed-index
        val hashedIndex = Indexes.hashed("capacity")
        val indexName = collection.createIndex(hashedIndex)
        println(indexName)
        // :snippet-end:
        assertEquals("capacity_hashed", indexName)
    }

    @Test
    fun geo2dsphereIndexTest() = runBlocking {
        // :snippet-start: geo2dsphere-index
        val geo2dsphereIndex = Indexes.geo2dsphere("location")
        val indexName = collection.createIndex(geo2dsphereIndex)
        println(indexName)
        // :snippet-end:
        assertEquals("location_2dsphere", indexName)
    }
}