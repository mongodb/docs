
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
        val searchIdx = Document(
            "mappings",
            Document("dynamic", true)
        )
        val resultCreateIndex = moviesCollection.createSearchIndex("myIndex", searchIdx)
        // :snippet-end:
        println("Index created: $resultCreateIndex")
        assertEquals("myIndex", resultCreateIndex)
    }

    @Ignore
    fun multipleSearchIndexTest() = runBlocking {
        // :snippet-start: multi-search-index-create
        val searchIdxMdl = SearchIndexModel(
            "searchIdx",
            Document("analyzer", "lucene.standard").append(
                "mappings", Document("dynamic", true)
            ),
            SearchIndexType.search()
        )

        val vectorSearchIdxMdl = SearchIndexModel(
            "vsIdx",
            Document(
                "fields",
                listOf(
                    Document("type", "vector")
                        .append("path", "embeddings")
                        .append("numDimensions", 1536)
                        .append("similarity", "dotProduct")
                )
            ),
            SearchIndexType.vectorSearch()
        )

        val resultCreateIndexes = moviesCollection.createSearchIndexes(
            listOf(searchIdxMdl, vectorSearchIdxMdl)
        )
        // :snippet-end:
        assertEquals(listOf("searchIdx", "vsIdx"), resultCreateIndexes.toList())
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
