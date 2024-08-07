import com.mongodb.client.model.Filters
import com.mongodb.client.model.ReplaceOptions
import com.mongodb.kotlin.client.MongoClient

// start-data-class
data class Restaurant(
    val name: String,
    val borough: String,
    val cuisine: String,
    val owner: String?,
)
// end-data-class

fun main() {
    val uri = "<connection string>"

    val mongoClient = MongoClient.create(uri)
    val database = mongoClient.getDatabase("sample_restaurants")
    val collection = database.getCollection<Restaurant>("restaurants")

    // start-replace-one
    val filter = Filters.eq(Restaurant::name.name, "Primola Restaurant")
    val replacement = Restaurant(
        "Frutti Di Mare",
        "Queens",
        "Seafood",
        owner = "Sal Thomas"
    )
    val result = collection.replaceOne(filter, replacement)
    // end-replace-one

    // start-replace-options
    val opts = ReplaceOptions().upsert(true)
    val result = collection.replaceOne(filter, replacement, opts)
    // end-replace-options

}

