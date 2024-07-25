import com.mongodb.client.model.Filters.eq
import com.mongodb.kotlin.client.MongoClient
import org.bson.Document

fun main() {
    // Replace the placeholder with your MongoDB deployment's connection string
    val uri = "<connection URI string>"

    val mongoClient = MongoClient.create(uri)
    val database = mongoClient.getDatabase("sample_mflix")
    val collection = database.getCollection<Document>("movies")

    // Find a document with the specified title
    val doc = collection.find(eq("title", "Before Sunrise")).firstOrNull()

    if (doc != null) {
        // Print the matching document
        println(doc)
    } else {
        println("No matching documents found.")
    }
}

