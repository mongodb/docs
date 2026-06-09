import com.mongodb.kotlin.client.coroutine.MongoClient
import com.mongodb.kotlin.client.coroutine.MongoCollection
import kotlinx.coroutines.*
import org.bson.Document
import java.text.SimpleDateFormat
import java.util.*
import com.mongodb.client.model.ReplaceOptions

class CreateUpdateView {

    companion object {
        private suspend fun updateMonthlyPhoneTransactions(client: MongoClient, collection: MongoCollection<Document>) {
            // Create the aggregation pipeline
            val pipeline = listOf(
                Document("\$match", Document("purchaseMethod", "Phone")),
                Document("\$unwind", Document("path", "\$items")),
                Document("\$group", Document("_id", Document("\$dateToString",
                    Document("format", "%Y-%m")
                        .append("date", "\$saleDate")))
                    .append("sales_quantity", Document("\$sum", "\$items.quantity"))
                    .append("sales_price", Document("\$sum", "\$items.price"))
                ),
                Document("\$set", Document("sales_price", Document("\$toDouble", "\$sales_price"))),
                Document("\$merge", Document("into", "monthlyPhoneTransactions")
                    .append("whenMatched", "replace"))
            )

            // Run the aggregation
            val results = collection.aggregate<Document>(pipeline)
            results.toCollection()
        }

        @JvmStatic
        fun main(args: Array<String>) = runBlocking {
            // Connect to MongoDB
            val client = MongoClient.create("<connection-string>")
            val database = client.getDatabase("sample_supplies")
            val sales = database.getCollection<Document>("sales")
            val purchaseOrders = database.getCollection<Document>("purchaseOrders")

            // Update immediately on startup
            updateMonthlyPhoneTransactions(client, sales)
            updateMonthlyPhoneTransactions(client, purchaseOrders)
            println("Initial update completed. Materialized view is ready.")

            // Example of a simple scheduler that updates monthly
            val dayOfMonth = 1 // Update on the 1st of each month
            val dateFormat = SimpleDateFormat("yyyy-MM-dd HH:mm:ss")

            // Create a coroutine scope for our periodic updates
            val scope = CoroutineScope(Dispatchers.Default)

            // Launch a coroutine for periodic updates
            scope.launch {
                while (isActive) {
                    val calendar = Calendar.getInstance()
                    val now = calendar.time

                    if (calendar.get(Calendar.DAY_OF_MONTH) == dayOfMonth &&
                        calendar.get(Calendar.HOUR_OF_DAY) == 0 &&
                        calendar.get(Calendar.MINUTE) == 0) {

                        // It's midnight on the 1st of the month - update the view
                        updateMonthlyPhoneTransactions(client, sales)
                        updateMonthlyPhoneTransactions(client, purchaseOrders)
                        println("Scheduled update completed at ${dateFormat.format(now)}")

                        // Delay for an hour to avoid multiple updates
                        delay(3600000) // 1 hour in milliseconds
                    } else {
                        // Check again in a minute
                        delay(60000) // 60000ms = 1 minute
                    }
                }
            }

            // Keep the application running
            while(true) {
                delay(1000)
            }
        }
    }
}
