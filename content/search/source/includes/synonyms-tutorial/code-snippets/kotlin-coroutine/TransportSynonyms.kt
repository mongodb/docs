import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.runBlocking
import org.bson.Document

fun main() = runBlocking {
    // Replace the placeholder with your MongoDB deployment's connection string
    val uri = "<connection-string>"

    val mongoClient = MongoClient.create(uri)
    val database = mongoClient.getDatabase("sample_mflix")
    
    try {
        // Create the transport_synonyms collection
        try {
            database.createCollection("transport_synonyms")
        } catch (e: Exception) {
            // Collection may already exist, which is fine
            println("Note: ${e.message}")
        }
        
        // Get the collection
        val collection = database.getCollection<Document>("transport_synonyms")
        
        // Create and insert the first document - equivalent mapping
        val doc1 = Document("mappingType", "equivalent")
            .append("synonyms", listOf("car", "vehicle", "automobile"))
                
        collection.insertOne(doc1)
        
        // Create and insert the second document - explicit mapping
        val doc2 = Document("mappingType", "explicit")
            .append("input", listOf("boat"))
            .append("synonyms", listOf("boat", "vessel", "sail"))
                
        collection.insertOne(doc2)
        
        println("Synonyms collections successfully created and populated.")
    } catch (e: Exception) {
        System.err.println("Error: ${e.message}")
        System.exit(1)
    } finally {
        mongoClient.close()
    }
}
