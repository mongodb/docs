import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.runBlocking
import org.bson.Document

fun main() = runBlocking {
    // connect to your Atlas cluster
    val uri = "<connection-string>"
    
    val mongoClient = MongoClient.create(uri)
    try {
        // set namespace
        val database = mongoClient.getDatabase("sample_mflix")
        val collection = database.getCollection<Document>("movies")
        val indexName = "facet-tutorial"
        
        val genresField = Document("type", "token")
        
        val index = Document("mappings", 
            Document("dynamic", true)
                .append("fields", Document("genres", genresField)))
        
        val result = collection.createSearchIndex(indexName, index)
        println("New index name: $result")
    } finally {
        mongoClient.close()
    }
}