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
        val indexName = "default"
        
        val titleField = Document("analyzer", "lucene.english")
            .append("type", "string")
        
        val synonymSource = Document("collection", "transport_synonyms")
        
        val synonym = Document("analyzer", "lucene.english")
            .append("name", "transportSynonyms")
            .append("source", synonymSource)
        
        val index = Document("mappings", 
            Document("dynamic", false)
                .append("fields", Document("title", titleField)))
            .append("synonyms", listOf(synonym))
        
        val result = collection.createSearchIndex(indexName, index)
        println("New index name: $result")
    } finally {
        mongoClient.close()
    }
}