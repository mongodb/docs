import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.runBlocking
import org.bson.Document

fun main() = runBlocking {
    // Replace the connection string with your MongoDB deployment's connection string
    val uri = "<connection-string>"
    
    val mongoClient = MongoClient.create(uri)
    try {
        // set namespace
        val database = mongoClient.getDatabase("sample_supplies")
        val collection = database.getCollection<Document>("monthlyPhoneTransactions")
        val indexName = "monthlySalesIndex"
        
        val index = Document("mappings", Document("dynamic", true))
        
        val result = collection.createSearchIndex(indexName, index)
        println("New index name: $result")
    } finally {
        mongoClient.close()
    }
}
