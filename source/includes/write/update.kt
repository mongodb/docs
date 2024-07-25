import com.mongodb.client.model.Filters.*
import com.mongodb.client.model.UpdateOptions
import com.mongodb.client.model.Updates.*
import com.mongodb.kotlin.client.MongoClient
import org.bson.Document

// start-data-class
data class Restaurant(
    val name: String,
    val borough: String,
    val cuisine: String,
    val address: Document
)
// end-data-class

fun main() {
    val uri = "<connection string>"

    val mongoClient = MongoClient.create(uri)
    val database = mongoClient.getDatabase("sample_restaurants")
    val collection = database.getCollection<Restaurant>("restaurants")

    // start-update-one
    val filter = eq(Restaurant::name.name, "Happy Garden")
    val update = set(Restaurant::name.name, "Mountain House")
    val result = collection.updateOne(filter, update)
    // end-update-one

    // start-update-many
    val filter = eq(Restaurant::name.name, "Starbucks")
    val update = rename(Restaurant::address.name, "location")
    val result = collection.updateMany(filter, update)
    // end-update-many

    // start-update-options
    val opts = UpdateOptions().upsert(true)
    val filter = eq(Restaurant::name.name, "Sunrise Pizzeria")
    val update = combine(
        set(Restaurant::borough.name, "Queens"),
        set(Restaurant::cuisine.name, "Italian")
    )

    collection.updateOne(filter, update, opts)
    // end-update-options
}