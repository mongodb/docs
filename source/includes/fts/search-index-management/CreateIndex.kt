import com.mongodb.MongoException
import com.mongodb.client.model.SearchIndexModel
import com.mongodb.client.model.SearchIndexType
import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.runBlocking
import org.bson.Document

fun main() {
    // Replace the placeholder with your MongoDB deployment's connection string
    val uri = "<connection-string>"
    val mongoClient = MongoClient.create(uri)
    val database = mongoClient.getDatabase("sample_mflix")
    val collection = database.getCollection<Document>("movies")
    val searchIdx = Document(
        "mappings",
        Document("dynamic", true)
    )
    runBlocking {
        try {
            val result = collection.createSearchIndex("default", searchIdx)
            println("Index created: $result")
        } catch (e: MongoException) {
            println("Failed to create search index: ${e.message}")
        } finally {
            mongoClient.close()
        }
    }
}