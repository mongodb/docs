import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.runBlocking
import org.bson.Document

fun main() = runBlocking {
    // connect to your Atlas cluster
    val uri = "<connection-string>"
    
    val mongoClient = MongoClient.create(uri)
    try {
        // set namespace
        val database = mongoClient.getDatabase("local_school_district")
        val collection = database.getCollection<Document>("schools")
        val indexName = "embedded-documents-tutorial"
        
        val sportsField = Document("dynamic", true)
            .append("type", "embeddedDocuments")
        
        val clubsField = Document("dynamic", true)
            .append("fields", Document("sports", sportsField))
            .append("type", "document")
        
        val teachersArray = listOf(
            Document("dynamic", true)
                .append("fields", Document("classes", 
                    Document("dynamic", true)
                        .append("type", "embeddedDocuments")))
                .append("type", "embeddedDocuments"),
            Document("dynamic", true)
                .append("fields", Document("classes", 
                    Document("dynamic", true)
                        .append("fields", Document("grade", 
                            Document("type", "token")))
                        .append("type", "document")))
                .append("type", "document")
        )
        
        val index = Document("mappings", 
            Document("dynamic", true)
                .append("fields", Document("clubs", clubsField)
                    .append("teachers", teachersArray)))
        
        val result = collection.createSearchIndex(indexName, index)
        println("New index name: $result")
    } finally {
        mongoClient.close()
    }
}