import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking
import org.bson.Document
import com.mongodb.client.model.Filters.eq

fun main() {

    // Replace the placeholder with your MongoDB deployment's connection string
    val uri = CONNECTION_STRING_URI_PLACEHOLDER

    val mongoClient = MongoClient.create(uri)
    val database = mongoClient.getDatabase("sample_mflix")
    val collection = database.getCollection<Document>("movies")

    runBlocking {
        val doc = collection.find(eq("title", "Back to the Future")).first()
        if (doc != null) {
            println(doc.toJson())
        } else {
            println("No matching documents found.")
        }
    }

    mongoClient.close()
}

