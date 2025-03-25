import com.mongodb.MongoException
import com.mongodb.client.model.SearchIndexModel
import com.mongodb.client.model.SearchIndexType
import com.mongodb.kotlin.client.MongoClient
import org.bson.Document

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
            )
        ),
        SearchIndexType.vectorSearch()
    )

    try {
        val result = collection.createSearchIndexes(
            listOf(searchIndexModel)
        )
        println("New search index named ${result.get(0)} is building.")

        // Polling to check if the index is queryable
        println("Polling to check if the index is ready. This may take up to a minute.")
        var isQueryable = false
        while (!isQueryable) {
            val results = collection.listSearchIndexes()
            results.forEach { result ->
                if (result.getString("name") == indexName && result.getBoolean("queryable")) {
                    println("$indexName is ready for querying.")
                    isQueryable = true
                } else {
                    Thread.sleep(5000) // Poll every 5 seconds
                }
            }
        }
    } catch (me: MongoException) {
        System.err.println("An error occurred: $me")
    }
    mongoClient.close()
}
