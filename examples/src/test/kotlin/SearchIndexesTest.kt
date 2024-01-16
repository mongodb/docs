
import com.mongodb.client.model.SearchIndexModel
import com.mongodb.kotlin.client.coroutine.MongoClient
import config.getConfig
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.runBlocking
import org.bson.Document
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import kotlin.test.Ignore
import kotlin.test.assertFalse

// :replace-start: {
//    "terms": {
//       "CONNECTION_URI_PLACEHOLDER": "\"<connection string>\""
//    }
// }
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class SearchIndexesTest {

    companion object {
        private val config = getConfig()
        private val CONNECTION_URI_PLACEHOLDER = config.connectionUri

        val mongoClient = MongoClient.create(CONNECTION_URI_PLACEHOLDER)
        val database = mongoClient.getDatabase("sample_mflix")
        val moviesCollection = database.getCollection<Document>("movies")

        @AfterAll
        @JvmStatic
        fun afterAll() {
            runBlocking {
                moviesCollection.drop()
            }
            mongoClient.close()
        }
    }

    @Ignore
    @Test
    fun singleSearchIndexTest() = runBlocking {
        // :snippet-start: single-search-index-create
        val index = Document(
            "mappings",
            Document("dynamic", true)
        )
        val resultCreateIndex = moviesCollection.createSearchIndex("myIndex", index)
        // :snippet-end:
        println("Index created: $resultCreateIndex")
        assertEquals("myIndex", resultCreateIndex)
    }

    @Ignore
    @Test
    fun multipleSearchIndexTest() = runBlocking {
        // :snippet-start: multi-search-index-create
        val indexOne = SearchIndexModel(
            "myIndex1",
            Document("analyzer", "lucene.standard").append(
                "mappings", Document("dynamic", true)
            )
        )

        val indexTwo = SearchIndexModel(
            "myIndex2",
            Document("analyzer", "lucene.simple").append(
                "mappings", Document("dynamic", true)
            )
        )

        val resultCreateIndexes = moviesCollection
            .createSearchIndexes(listOf(indexOne, indexTwo))
        // :snippet-end:
        assertEquals(listOf("myIndex1", "myIndex2"), resultCreateIndexes.toList())
    }

    @Ignore
    @Test
    fun listSearchIndexTest() = runBlocking {
        // :snippet-start: list-search-indexes
        val searchIndexesList = moviesCollection.listSearchIndexes().toList()
        // :snippet-end:

        assertFalse(searchIndexesList.isEmpty())
    }

    @Ignore
    @Test
    fun updateSearchIndexTest() = runBlocking {
        // :snippet-start: update-search-indexes
        moviesCollection.updateSearchIndex(
            "myIndex",
            Document("analyzer", "lucene.simple").append(
                "mappings",
                Document("dynamic", false)
                    .append(
                        "fields",
                        Document(
                            "title",
                            Document("type", "string")
                        )
                    )
            )
        )
        // :snippet-end:
    }

    @Ignore
    @Test
    fun dropSearchIndexTest() = runBlocking {
        // :snippet-start: drop-search-index
        moviesCollection.dropSearchIndex("myIndex");
        // :snippet-end:
    }

}
// :replace-end:
