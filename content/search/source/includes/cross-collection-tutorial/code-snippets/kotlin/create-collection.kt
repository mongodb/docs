import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.runBlocking
import org.bson.Document
import java.text.SimpleDateFormat
import java.util.*

fun main() = runBlocking {
    // Connect to your MongoDB deployment
    val uri = "<connection-string>"
    val mongoClient = MongoClient.create(uri)
    
    try {
        // Set namespace
        val database = mongoClient.getDatabase("sample_supplies")
        val collection = database.getCollection<Document>("purchaseOrders")
        
        // Parse dates
        val dateFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
        dateFormat.timeZone = TimeZone.getTimeZone("UTC")
        val date1 = dateFormat.parse("2018-01-23T21:06:49.506Z")
        val date2 = dateFormat.parse("2018-01-25T10:01:02.918Z")
        
        // Create first document
        val purchaseOrder1 = Document("saleDate", date1)
            .append("items", listOf(
                Document()
                    .append("name", "printer paper")
                    .append("tags", listOf("office", "stationary"))
                    .append("price", 40.01)
                    .append("quantity", 2),
                Document()
                    .append("name", "notepad")
                    .append("tags", listOf("office", "writing", "school"))
                    .append("price", 35.29)
                    .append("quantity", 2),
                Document()
                    .append("name", "pens")
                    .append("tags", listOf("writing", "office", "school", "stationary"))
                    .append("price", 56.12)
                    .append("quantity", 5),
                Document()
                    .append("name", "backpack")
                    .append("tags", listOf("school", "travel", "kids"))
                    .append("price", 77.71)
                    .append("quantity", 2),
                Document()
                    .append("name", "notepad")
                    .append("tags", listOf("office", "writing", "school"))
                    .append("price", 18.47)
                    .append("quantity", 2),
                Document()
                    .append("name", "envelopes")
                    .append("tags", listOf("stationary", "office", "general"))
                    .append("price", 19.95)
                    .append("quantity", 8),
                Document()
                    .append("name", "envelopes")
                    .append("tags", listOf("stationary", "office", "general"))
                    .append("price", 8.08)
                    .append("quantity", 3),
                Document()
                    .append("name", "binder")
                    .append("tags", listOf("school", "general", "organization"))
                    .append("price", 14.16)
                    .append("quantity", 3)
            ))
            .append("storeLocation", "Denver")
            .append("customer", Document()
                .append("gender", "M")
                .append("age", 42)
                .append("email", "cauho@witwuta.sv")
                .append("satisfaction", 4)
            )
            .append("couponUsed", true)
            .append("purchaseMethod", "Phone")
        
        // Create second document
        val purchaseOrder2 = Document("saleDate", date2)
            .append("items", listOf(
                Document()
                    .append("name", "envelopes")
                    .append("tags", listOf("stationary", "office", "general"))
                    .append("price", 8.05)
                    .append("quantity", 10),
                Document()
                    .append("name", "binder")
                    .append("tags", listOf("school", "general", "organization"))
                    .append("price", 28.31)
                    .append("quantity", 9),
                Document()
                    .append("name", "notepad")
                    .append("tags", listOf("office", "writing", "school"))
                    .append("price", 20.95)
                    .append("quantity", 3),
                Document()
                    .append("name", "laptop")
                    .append("tags", listOf("electronics", "school", "office"))
                    .append("price", 866.5)
                    .append("quantity", 4),
                Document()
                    .append("name", "notepad")
                    .append("tags", listOf("office", "writing", "school"))
                    .append("price", 33.09)
                    .append("quantity", 4),
                Document()
                    .append("name", "printer paper")
                    .append("tags", listOf("office", "stationary"))
                    .append("price", 37.55)
                    .append("quantity", 1),
                Document()
                    .append("name", "backpack")
                    .append("tags", listOf("school", "travel", "kids"))
                    .append("price", 83.28)
                    .append("quantity", 2),
                Document()
                    .append("name", "pens")
                    .append("tags", listOf("writing", "office", "school", "stationary"))
                    .append("price", 42.9)
                    .append("quantity", 4),
                Document()
                    .append("name", "envelopes")
                    .append("tags", listOf("stationary", "office", "general"))
                    .append("price", 16.68)
                    .append("quantity", 2)
            ))
            .append("storeLocation", "Seattle")
            .append("customer", Document()
                .append("gender", "M")
                .append("age", 50)
                .append("email", "keecade@hem.uy")
                .append("satisfaction", 5)
            )
            .append("couponUsed", false)
            .append("purchaseMethod", "Phone")
        
        // Insert the documents
        collection.insertOne(purchaseOrder1)
        collection.insertOne(purchaseOrder2)
        
        println("Successfully inserted purchase order documents.")
        
        // Query the new collection
        val sort = Document("saleDate", -1)
        val results = collection.find().sort(sort).toList()
        
        println("\nQuery results:")
        results.forEach { println(it) }
    } finally {
        mongoClient.close()
    }
}
