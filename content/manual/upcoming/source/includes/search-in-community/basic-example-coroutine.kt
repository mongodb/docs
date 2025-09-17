import com.mongodb.MongoException
import com.mongodb.client.model.SearchIndexModel
import com.mongodb.client.model.SearchIndexType
import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.toList
import org.bson.Document
import kotlinx.coroutines.runBlocking

fun main() {
    // Replace the placeholder with your MongoDB deployment's connection string
    val uri = "<connection-string>"
    val mongoClient = MongoClient.create(uri)
    val database = mongoClient.getDatabase("sample_mflix")
    val collection = database.getCollection<Document>("embedded_movies")
    val indexName = "vector_index"
    val searchIndexModel = SearchIndexModel(
        indexName,
        Document(
            "fields",
            listOf(
                Document("type", "vector")
                    .append("path", "plot_embedding")
                    .append("numDimensions", 1536)
                    .append("similarity", "dotProduct")
                    .append("quantization", "scalar")
            )
        ),
        SearchIndexType.vectorSearch()
    )

    runBlocking {
        try {
            collection.createSearchIndexes(listOf(searchIndexModel))
                .collect { result ->
                    println("New search index named $result is building.")
                }

            // Polling to check if the index is queryable
            println("Polling to check if the index is ready. This may take up to a minute.")
            var isQueryable = false
            while (!isQueryable) {
                delay(5000L) // Poll every 5 seconds

                val indexes = collection.listSearchIndexes().toList()
                isQueryable = indexes.any { index ->
                    index.getString("name") == indexName && index.getBoolean("queryable")
                }
                if (isQueryable) {
                    println("$indexName is ready for querying.")
                }
            }
        } catch (me: MongoException) {
            System.err.println("An error occurred: $me")
        }
    }
    mongoClient.close()
}