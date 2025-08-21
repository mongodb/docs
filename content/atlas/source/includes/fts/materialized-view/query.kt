import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.runBlocking
import org.bson.Document
import java.util.*

fun main() {
    // connect to your MongoDB deployment
    val uri = "<connection-string>"
    val mongoClient = MongoClient.create(uri)

    // set namespace
    val database = mongoClient.getDatabase("sample_supplies")
    val collection = database.getCollection<Document>("monthlyPhoneTransactions")

    runBlocking {
        // define pipeline
        val searchStage = Document(
            "\$search",
            Document("index", "monthlySalesIndex")
                .append(
                    "range",
                    Document("gt", 10000)
                        .append("path", Arrays.asList("sales_price"))
                )
        )

        val countStage = Document("\$count", "months_w_over_10000")

        // run pipeline and print results
        val resultsFlow = collection.aggregate<Document>(
            listOf(searchStage, countStage)
        )
        
        resultsFlow.collect { println(it) }
    }
    
    mongoClient.close()
}
