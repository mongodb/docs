import com.mongodb.client.model.DeleteOptions
import com.mongodb.client.model.Filters.*
import com.mongodb.kotlin.client.MongoClient

// start-data-class
data class Restaurant(val name: String, val borough: String)
// end-data-class

fun main() {
    val uri = "<connection string>"

    val mongoClient = MongoClient.create(uri)
    val database = mongoClient.getDatabase("sample_restaurants")
    val collection = database.getCollection<Movie>("restaurants")

    // start-delete-one
    val filter = eq(Restaurant::name.name, "Happy Garden")
    val result = collection.deleteOne(filter)
    // end-delete-one

    // start-delete-many
    val filter = and(
        eq(Restaurant::borough.name, "Brooklyn"),
        eq(Restaurant::name.name, "Starbucks")
    )
    val result = collection.deleteMany(filter)
    // end-delete-many

    // start-delete-options
    val opts = DeleteOptions().comment("sample comment")
    val filter = regex(Restaurant::name.name, "Red")
    val result = collection.deleteOne(filter, opts)
    // end-delete-options

}