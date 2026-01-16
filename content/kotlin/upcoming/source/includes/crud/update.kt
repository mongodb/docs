import com.mongodb.MongoException
import com.mongodb.client.model.Filters
import com.mongodb.client.model.UpdateOptions
import com.mongodb.client.model.Updates
import com.mongodb.kotlin.client.coroutine.MongoClient
import io.github.cdimascio.dotenv.dotenv
import kotlinx.coroutines.runBlocking
import java.time.LocalDateTime
import org.bson.codecs.pojo.annotations.BsonId
import org.bson.Document

// start-data-class
data class PaintOrder(
    @BsonId val id: Int,
    val color: String,
    val qty: Int,
    val prices: List<Double>
)
// end-data-class

fun main() = runBlocking {
    val dotenv = dotenv()
    val CONNECTION_URI_PLACEHOLDER = dotenv["MONGODB_CONNECTION_URI"]
    val uri = CONNECTION_URI_PLACEHOLDER
    val mongoClient = MongoClient.create(uri)
    val database = mongoClient.getDatabase("db")
    val collection = database.getCollection<PaintOrder>("paint_inventory")

    // Insert sample data with price arrays instead of shade arrays
    val paintOrders = listOf(
        PaintOrder(1, "red", 5, listOf(15.99, 19.99)),
        PaintOrder(2, "purple", 8, listOf(18.99, 22.99)),
        PaintOrder(3, "yellow", 0, listOf(14.99, 17.99)),
        PaintOrder(4, "green", 6, listOf(19.99, 24.99)),
        PaintOrder(5, "blue", 3, listOf(17.99, 21.99))
    )

    // Insert them
    collection.insertMany(paintOrders)

    // start-update-one
    val filter = Filters.eq(PaintOrder::color.name, "yellow")
    val update = Updates.inc(PaintOrder::qty.name, 1)
    val result = collection.updateOne(filter, update)
    println("Matched document count: ${result.matchedCount}")
    println("Modified document count: ${result.modifiedCount}")
    // end-update-one

    // start-update-many
    val filterMany = Filters.empty()
    val updateMany = Updates.inc(PaintOrder::qty.name, 20)
    val resultMany = collection.updateMany(filterMany, updateMany)
    println("Matched document count: ${resultMany.matchedCount}")
    println("Modified document count: ${resultMany.modifiedCount}")
    // end-update-many

    // start-array-first
    val filterArrayFirst = Filters.eq(PaintOrder::prices.name, 15.99)
    val updateArrayFirst = Updates.inc("${PaintOrder::prices.name}.$", 2)
    val resultArrayFirst = collection.updateOne(filterArrayFirst, updateArrayFirst)
    println("Modified document count: ${resultArrayFirst.modifiedCount}")
    // end-array-first

    // start-array-all
    val filterArrayAll = Filters.eq(PaintOrder::color.name, "green")
    val update = Updates.mul("${PaintOrder::prices.name}.$[]", 1.1)
    val resultArrayAll = collection.updateOne(filterArrayAll, update)
    println("Modified document count: ${resultArrayAll.modifiedCount}")
    // end-array-all

    // start-array-match
    val filterArrayMatch = Filters.eq(PaintOrder::color.name, "blue")
    val priceFilter = Filters.gt("higherPrice", 20.0)
    val options = UpdateOptions()
        .arrayFilters(listOf(priceFilter))
    val updateArrayMatch = Updates.mul("${PaintOrder::prices.name}.$[higherPrice]", 0.9)
    val resultArrayMatch = collection.updateOne(filterArrayMatch, updateArrayMatch, options)
    println("Modified document count: ${resultArrayMatch.modifiedCount}")
    // end-array-match

    // start-update-options
    val filterUpsert = Filters.eq(PaintOrder::color.name, "orange")
    val updateUpsert = Updates.inc(PaintOrder::qty.name, 10)
    val optionsUpsert = UpdateOptions().upsert(true)
    val resultUpsert = collection.updateOne(filterUpsert, updateUpsert, optionsUpsert)
    println("Matched document count: ${resultUpsert.matchedCount}")
    println("Modified document count: ${resultUpsert.modifiedCount}")
    println("Upserted id: ${resultUpsert.upsertedId}")
    // end-update-options
    
    // clean up
    database.drop()
    mongoClient.close()
}