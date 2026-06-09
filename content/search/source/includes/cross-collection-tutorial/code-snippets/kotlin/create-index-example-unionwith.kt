import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.runBlocking
import org.bson.Document

fun main() = runBlocking {
    // Replace the connection string with your MongoDB deployment's connection string
    val uri = "<connection-string>"
    
    val mongoClient = MongoClient.create(uri)
    try {
        // set namespace
        val database = mongoClient.getDatabase("sample_training")
        
        // Get collections
        val companiesCollection = database.getCollection<Document>("companies")
        val inspectionsCollection = database.getCollection<Document>("inspections")
        
        val indexName = "default"
        val index = Document("mappings", Document("dynamic", true))
        
        // Create index on companies collection
        val companiesResult = companiesCollection.createSearchIndex(indexName, index)
        println("New index name for companies: $companiesResult")
        
        // Create index on inspections collection
        val inspectionsResult = inspectionsCollection.createSearchIndex(indexName, index)
        println("New index name for inspections: $inspectionsResult")
    } finally {
        mongoClient.close()
    }
}
